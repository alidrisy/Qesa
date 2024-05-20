"""Pydantic models for comments."""

from pydantic import BaseModel


class NewComment(BaseModel):
    """New comment schema."""

    text: str
    video_id: str


class UpdateComment(BaseModel):
    """Update comment schema."""

    text: str


class UserSummary(BaseModel):
    """User summary class."""

    id: str
    username: str
    profile_pic: str | None = None
    is_follow: bool | None = None


class CommentOut(BaseModel):
    """Comment output class."""

    id: str
    text: str
    user: UserSummary
    video_id: str


class CommentDel(BaseModel):
    pass
