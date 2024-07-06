"""Authentication routes."""

from models.user import User
from api.v1.routers import router, redis_client
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi import BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from api.v1.dependencies.auth_depends import *


class SginupUser(BaseModel):
    """Signup user schema."""

    email: str
    username: str
    password: str
    first_name: str
    birth_date: datetime
    last_name: str | None = None
    profile_picture: str | None = None
    bio: str | None = None


@router.post("/signup", tags=["auth"])
def create_user(user: SginupUser, background_tasks: BackgroundTasks) -> JSONResponse:
    """Create a new user."""
    try:
        print(user)
        user_data = user.dict()
        user_data["password"] = get_password_hash(user_data["password"])
        new_user = User(**user_data)
        new_user.save()
        validate_id = generate_verification_code()
        user_id: str = new_user.to_dict()["id"]
        redis_client.store(validate_id, user_id, ACCESS_TOKEN_EXPIRE_MINUTES)
        background_tasks.add_task(send_verification_email, new_user.email, validate_id)
        return JSONResponse(
            {
                "message": "Your account has been successfully created.",
                "email": new_user.email,
            },
            status_code=201,
        )
    except Exception as e:
        print(e)
        if "username" in str(e):
            return JSONResponse(
                {"error": "username is already exists try to use another one"},
                status_code=422,
            )
        if "email" in str(e):
            raise HTTPException(status_code=422, detail="User already exists")
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


class LoginUser(BaseModel):
    """LoginUser user schema."""

    username: str
    password: str


@router.post("/login", tags=["auth"])
def login_user(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    background_tasks: BackgroundTasks,
) -> Token:
    """Login user.""" * 9
    try:
        print(form_data.__dict__)
        if form_data.username:
            user = authenticate_user(
                {"username": form_data.username}, form_data.password
            )
            if not user:
                user = authenticate_user(
                    {"email": form_data.username}, form_data.password
                )

        if not user:
            return JSONResponse(
                {
                    "message": "Incorrect username or password",
                },
                status_code=401,
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not user.is_validated:
            validate_id = generate_verification_code()
            user_id = user.to_dict()["id"]
            redis_client.store(validate_id, user_id, ACCESS_TOKEN_EXPIRE_MINUTES)
            background_tasks.add_task(send_verification_email, user.email, validate_id)
            return JSONResponse(
                {
                    "message": "We have sent you a verification email. Please check your inbox and follow the instructions to verify your email address.",
                    "email": user.email,
                    status: "unverified",
                },
            )
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
        return Token(access_token=access_token, token_type="bearer")
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


class Virifcation(BaseModel):
    """Verification schema."""

    validation_id: str


@router.post("/verification", tags=["auth"])
def verification_email(validation: Virifcation, email: str) -> Token:
    """Verify user email."""
    try:
        validation_id = validation.validation_id
        user = get_user({"email": email})
        vald_id = redis_client.get(user.to_dict()["id"])
        print(vald_id, validation_id)
        if validation_id != vald_id:
            return JSONResponse(
                {
                    "message": "The verification code is either expired or invalid. Please request a new one."
                },
                status_code=401,
            )

        redis_client.delete(user.to_dict()["id"])
        user.is_validated = True
        user.save()

        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )

        return Token(access_token=access_token, token_type="bearer")
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


@router.get("/resend-verification-email", tags=["auth"])
async def resend_verification_email(
    email: str,
    background_tasks: BackgroundTasks,
) -> JSONResponse:
    """Resend verification email."""
    try:
        user = get_user({"email": email})

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        user_id = user.to_dict()["id"]
        redis_client.delete(user_id)
        validate_id = generate_verification_code()
        redis_client.store(validate_id, user_id, ACCESS_TOKEN_EXPIRE_MINUTES)
        background_tasks.add_task(send_verification_email, user.email, validate_id)
        return JSONResponse(
            {
                "message": "Verification email sent successfuly.",
            },
        )
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


class LogoutUser(BaseModel):
    """Logout user schema."""

    password: str


@router.post("/logout", tags=["auth"])
async def logout_user(
    password: str,
    current_user: Annotated[User, Depends(get_current_active_user)],
) -> JSONResponse:
    """Logout user."""

    try:
        if not verify_password(password, current_user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        current_user.is_validated = False
        current_user.save()
        return JSONResponse({"message": "Successfully logged out."}, status_code=200)

    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "Something went wrong, try again later."},
            status_code=500,
        )


class CheckUser(BaseModel):
    """Logout user schema."""

    username: str


@router.post("/check-username", tags=["auth"])
async def check_username(
    check_data: CheckUser,
) -> JSONResponse:
    """Logout user."""

    try:
        username = check_data.username

        is_valid = User.objects(username=username).count() <= 0

        return JSONResponse({"isValid": is_valid})

    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "Something went wrong, try again later."},
            status_code=500,
        )
