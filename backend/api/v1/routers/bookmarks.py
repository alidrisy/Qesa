"""This module contains the bookmarks router."""

from models.bookmark import Bookmark
from models.video import Video
from api.v1.routers import router
from fastapi.responses import JSONResponse
from fastapi import Depends, Response, status
from api.v1.dependencies.videos_depends import get_current_active_user_id
from typing import Annotated
from pydantic import BaseModel


class NewBookmark(BaseModel):
    """New bookmark schema."""

    video_id: str


@router.post("/bookmarks", tags=["bookmarks"])
async def bookmark(
    new_bookmark: NewBookmark,
    user_id: Annotated[str, Depends(get_current_active_user_id)],
):
    """Create a new bookmark or delete it."""
    try:
        video_id = new_bookmark.video_id
        video = Video.objects(id=video_id).first()
        if video.is_bookmarked(user_id):
            bookmark = Bookmark.objects(video_id=video_id, user_id=user_id).first()
            bookmark.delete()
            return Response(status_code=status.HTTP_204_NO_CONTENT)
        new_bookmark = Bookmark(user_id=user_id, video_id=video_id)
        new_bookmark.save()
        return JSONResponse(new_bookmark.to_dict(), status_code=201)
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )
