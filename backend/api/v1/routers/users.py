"""User routes."""

from api.v1.routers import router
from fastapi.responses import JSONResponse
from fastapi import Response, status
from api.v1.dependencies.auth_depends import *
from pydantic import BaseModel
from models.video import Video
import numpy as np


class RespondeUser(BaseModel):
    """Response user class."""

    email: str
    username: str
    password: str
    first_name: str
    last_name: str | None = None
    profile_picture: str | None = None
    bio: str | None = None


@router.get("/users/me", tags=["users"], response_model=RespondeUser)
async def read_users_me(
    current_user: Annotated[RespondeUser, Depends(get_current_active_user)],
):
    """Read user."""
    return current_user


class UpdateUser(BaseModel):
    """Update user schema."""

    username: str
    first_name: str
    last_name: str | None = None
    profile_picture: str | None = None
    bio: str | None = None


@router.put("/users/me/update", tags=["users"])
async def update_user(
    user: UpdateUser,
    current_user: Annotated[RespondeUser, Depends(get_current_active_user)],
) -> JSONResponse:
    """Update user."""
    try:
        user_data = user.dict()
        current_user.update_model(**user_data)
        return JSONResponse({"message": "Your account has been successfully updated."})
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


@router.get("/users/me/videos", tags=["users"])
async def read_own_videos(
    current_user: Annotated[RespondeUser, Depends(get_current_active_user)],
):
    """Read user videos."""
    videos = Video.objects(creator=current_user).skip(0).limit(30)
    all_videos = []
    for video in videos:
        all_videos.append(video.to_dict())
    return JSONResponse(all_videos)


@router.delete("/users/me", tags=["users"])
async def delete_user(
    current_user: Annotated[RespondeUser, Depends(get_current_active_user)],
) -> JSONResponse:
    """Delete user."""
    try:
        current_user.delete()

        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )
