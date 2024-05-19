"""Videos depends."""

from typing import Annotated
from models.video import Video
from fastapi import Depends, HTTPException
from pydantic import BaseModel
from api.v1.dependsies.auth_depends import (
    get_current_active_user,
)


async def get_current_active_user_id(
    current_user: Annotated[str, Depends(get_current_active_user)],
):
    """Get current active user."""
    if not current_user:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user.to_dict()["id"]
