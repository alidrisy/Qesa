"""Routes for likes."""

from models.like import Like
from models.video import Video
from api.v1.routers import router
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi import Depends, Response, status
from api.v1.dependencies.videos_depends import get_current_active_user_id
from typing import Annotated
from pydantic import BaseModel


class NewLike(BaseModel):
    """New like schema."""

    video_id: str


@router.post("/likes", tags=["likes"])
async def like(
    new_like: NewLike, user_id: Annotated[str, Depends(get_current_active_user_id)]
):
    """Create a new like or delete it."""
    try:
        video_id = new_like.video_id
        video = Video.objects(id=video_id).first()
        if video.is_liked(user_id):
            like = Like.objects(video_id=video_id, user_id=user_id).first()
            like.delete()
            return Response(status_code=status.HTTP_204_NO_CONTENT)
        new_like = Like(user_id=user_id, video_id=video_id)
        new_like.save()
        return JSONResponse(new_like.to_dict(), status_code=201)
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )
