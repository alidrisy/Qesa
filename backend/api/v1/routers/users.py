"""User routes."""

from api.v1.routers import router
from fastapi.responses import JSONResponse
from fastapi import Response, status
from api.v1.dependencies.auth_depends import *
from pydantic import BaseModel
from models.video import Video
from api.v1.dependencies.videos_depends import get_current_user as get_curr_user
import numpy as np
from typing import Any


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


@router.get("/users/me", tags=["users"], response_model=RespondeUser)
async def read_users_me(
    current_user: Annotated[RespondeUser, Depends(get_current_active_user)],
):
    """Read user."""
    return JSONResponse(current_user.to_dict(current_user))


class UpdateUser(BaseModel):
    """Update user schema."""

    username: str
    first_name: str
    last_name: str | None = None
    birth_date: datetime | None = None
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
        print(user_data)
        current_user.update_model(**user_data)
        return JSONResponse(
            {
                "message": "Your account has been successfully updated.",
                "user": current_user.to_dict(current_user),
            }
        )
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


@router.get("/users/{id}", tags=["users"])
async def get_user_by_id(
    id: str,
    user: Annotated[RespondeUser, Depends(get_curr_user)],
) -> JSONResponse:
    """Get user."""
    try:
        user = get_user({"id": id})
        if user:
            return JSONResponse(user.to_dict(user))

        return JSONResponse(user.to_dict())

    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )
