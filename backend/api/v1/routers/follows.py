"""This module contains the bookmarks router."""

from models.follow import Follow
from models.user import User
from api.v1.routers import router
from fastapi.responses import JSONResponse
from fastapi import Depends, Response, status, HTTPException
from api.v1.dependencies.videos_depends import get_current_active_user
from typing import Annotated, List
from pydantic import BaseModel


class NewFollow(BaseModel):
    """New follow schema."""

    target_id: str


@router.post("/follow", tags=["follows"], status_code=201)
def follow_user(
    new_follow: NewFollow, user: Annotated[str, Depends(get_current_active_user)]
):
    """Follow a user."""
    target_id = new_follow.target_id

    if str(user.id) == target_id:
        raise HTTPException(status_code=400, detail="Users cannot follow themselves")

    target = User.objects(id=target_id).first()

    if not user or not target:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.is_follow(target):
        return {"msg": f"{user.username} is already following {target.username}"}

    Follow(follower=user, following=target).save()
    return {"msg": f"{user.username} is now following {target.username}"}


@router.delete("/unfollow/{id}", tags=["follows"])
def unfollow_user(id: str, user: Annotated[str, Depends(get_current_active_user)]):
    """Unfollow a user."""
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    follow = Follow.objects(follower=user, id=id).first()
    target = follow.follwing.username

    if not follow:
        raise HTTPException(status_code=404, detail="Follow not found")

    follow.delete()
    return {"msg": f"{user.username} has unfollowed {target}"}


class UserOut(BaseModel):
    """User out schema."""

    id: str
    username: str
    followers: List[dict]
    following: List[dict]


@router.get("/follows/{user_id}", response_model=UserOut, tags=["follows"])
def get_user_followers_followings(user_id: str):
    """Get user followers and followings."""
    user = User.objects(id=user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    followers = Follow.objects(following=user)
    following = Follow.objects(follower=user)

    return UserOut(
        id=str(user.id),
        username=user.username,
        followers=[f.follower.to_dict_summary() for f in followers],
        following=[f.following.to_dict_summary() for f in following],
    )
