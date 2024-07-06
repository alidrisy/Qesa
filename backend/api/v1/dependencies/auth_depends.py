"""Authentication depends."""

from datetime import datetime, timedelta, timezone
from typing import Annotated, Any
from models.user import User
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from dotenv import load_dotenv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import random
import smtplib

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))


class RespondeUser(BaseModel):
    """Response user class."""

    id: Any
    email: str
    username: str
    password: str
    first_name: str
    last_name: str | None = None
    profile_picture: str | None = None
    bio: str | None = None


class Token(BaseModel):
    """Token class"""

    access_token: str
    token_type: str


class TokenData(BaseModel):
    """Token data class."""

    username: str | None = None
    email: str | None = None


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/login")


def verify_password(plain_password, hashed_password):
    """Verify password."""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    """Get password hash."""
    return pwd_context.hash(password)


def get_user(user: dict | None):
    """Get user."""
    if user:
        return User.objects(**user).first()


def authenticate_user(data: dict, password: str):
    """Authenticate user."""
    user = get_user(data)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Create access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    """Get current user."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user({"username": token_data.username})
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[RespondeUser, Depends(get_current_user)],
):
    """Get current active user."""
    if not current_user.is_validated:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def generate_verification_code():
    """Generate verification code."""
    return str(random.randint(100000, 999999))


def send_verification_email(email: str, code: str):
    """Send verification email."""
    sender_email = os.getenv("APP_EMAIL")
    sender_password = os.getenv("APP_PASSWORD")
    subject = "Email Verification"
    body = f"Your verification code is {code}"

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = email
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, msg.as_string())
            print("email send succsussfuly")
    except Exception as e:
        print(f"Failed to send email: {e}")
