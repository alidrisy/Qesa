from models.user import User
from api.v1.routers import router
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from api.v1.dependsies.auth_depends import *


class SginupUser(BaseModel):
    email: str
    username: str
    password: str
    first_name: str
    last_name: str | None = None
    profile_picture: str | None = None
    bio: str | None = None


@router.post("/sginup")
async def create_user(user: SginupUser) -> JSONResponse:
    try:
        user_data = user.dict()
        user_data["password"] = get_password_hash(user_data["password"])
        new_user = User(**user_data)
        validate_id = generate_verification_code()
        new_user.validated_id = validate_id
        new_user.save()
        send_verification_email(new_user.email, new_user.validated_id)
        return JSONResponse({"message": "Your account has been successfully created."})
    except Exception as e:
        if "username" in str(e):
            return JSONResponse(
                {"error": "username is already exists try to use another one"},
                status_code=400,
            )
        if "email" in str(e):
            return JSONResponse(
                {"error": "This email address is already registered"},
                status_code=400,
            )
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


class LoginUser(BaseModel):
    email: str | None = None
    username: str | None = None
    password: str


@router.post("/login")
async def login_user(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    """Login user."""
    if form_data.username:
        user = authenticate_user({"username": form_data.username}, form_data.password)
    elif form_data.email:
        user = authenticate_user({"email": form_data.email}, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@router.post("/verification")
async def verification_email(validation_id: str) -> Token:
    user = get_user({"validated_id": validation_id})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user.validated = True
    user.validated_id = ""
    user.save()
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")
