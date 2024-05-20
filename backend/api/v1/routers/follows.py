"""This module contains the bookmarks router."""

from models.follow import Follow
from models.user import User
from api.v1.routers import router
from fastapi.responses import JSONResponse
from fastapi import Depends, Response, status, HTTPException
from api.v1.dependencies.videos_depends import get_current_active_user_id
from typing import Annotated, List
from pydantic import BaseModel


class NewFollow(BaseModel):
    """New bookmark schema."""

    target_id: str


@router.post("/follow", tags=["follows"])
def follow_user(
    new_follow: NewFollow, user_id: Annotated[str, Depends(get_current_active_user_id)]
):
    target_id = new_follow.target_id

    if user_id == target_id:
        raise HTTPException(status_code=400, detail="Users cannot follow themselves")

    user = User.objects(id=user_id).first()
    target = User.objects(id=target_id).first()

    if not user or not target:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.is_follow(target_id):
        Follow(follower=user, following=target).save()

    return {"msg": f"{user.username} is now following {target.username}"}


@router.post("/unfollow", tags=["follows"])
def unfollow_user(
    new_follow: NewFollow, user_id: Annotated[str, Depends(get_current_active_user_id)]
):
    target_id = new_follow.target_id
    if user_id == target_id:
        raise HTTPException(status_code=400, detail="Users cannot follow themselves")
    user = User.objects(id=user_id).first()
    target = User.objects(id=target_id).first()

    if not user or not target:
        raise HTTPException(status_code=404, detail="User not found")

    follow = Follow.objects(follower=user, following=target).first()
    if follow:
        follow.delete()

    return {"msg": f"{user.username} has unfollowed {target.username}"}


class UserOut(BaseModel):
    id: str
    username: str
    followers: List[dict]
    following: List[dict]


@router.get("/users/{user_id}", response_model=UserOut, tags=["follows"])
def get_user(user_id: str):

    user = User.objects(id=user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    followers = Follow.objects(following=user)
    following = Follow.objects(follower=user)

    return UserOut(
        id=str(user.id),
        username=user.username,
        followers=[f.follower.to_dict() for f in followers],
        following=[f.following.to_dict() for f in following],
    )
