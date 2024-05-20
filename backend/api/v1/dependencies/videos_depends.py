"""Videos depends."""

from typing import Annotated
from models.video import Video
from fastapi import Depends, HTTPException, status
from api.v1.dependencies.auth_depends import (
    get_current_active_user,
    get_user,
    RespondeUser,
    oauth2_scheme,
    TokenData,
    SECRET_KEY,
    ALGORITHM,
    jwt,
    JWTError,
)
from models.bookmark import Bookmark
from models.like import Like
from models.comment import Comment


async def get_current_active_user_id(
    current_user: Annotated[RespondeUser, Depends(get_current_active_user)],
):
    """Get current active user."""
    if not current_user:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user.to_dict()["id"]


def get_user_id(data: dict):
    """Get current active user."""
    user = get_user(data)
    if not user:
        raise HTTPException(status_code=404, detail="Not Found")
    return user.to_dict()["id"]


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    """Get current user."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return None
        token_data = TokenData(username=username)
    except JWTError:
        return None
    user = get_user({"username": token_data.username})
    if user is None:
        return None
    return user


async def delete_video_depends(id: str, user_id: str):
    """Delete video and relatied depndsies."""
    video = Video.objects(id=id, user_id=user_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found.")
    Like.objects(video_id=id).delete()
    Comment.objects(video_id=id).delete()
    Bookmark.objects(video_id=id).delete()
