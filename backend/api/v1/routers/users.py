from api.v1.routers import router
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from api.v1.dependsies.auth_depends import *
from pydantic import BaseModel
from models.video import Video
import numpy as np


class RespondeUser(BaseModel):
    email: str
    username: str
    password: str
    first_name: str
    last_name: str | None = None
    profile_picture: str | None = None
    bio: str | None = None


@router.get("/users/me", response_model=RespondeUser)
async def read_users_me(
    current_user: Annotated[RespondeUser, Depends(get_current_active_user)],
):
    return current_user


@router.get("/users/me/videos")
async def read_own_items(
    current_user: Annotated[RespondeUser, Depends(get_current_active_user)],
):
    videos = Video.objects(user_id=current_user.id).skip(0).limit(30)
    all_videos = []
    for video in videos:
        all_videos.append(video.to_dict())
    return JSONResponse(all_videos)
