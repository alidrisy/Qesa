"""Comments API endpoints."""

from models.comment import Comment
from models.video import Video
from api.v1.routers import router
from fastapi.responses import JSONResponse
from fastapi import Depends, Response, status
from api.v1.dependencies.videos_depends import get_current_active_user_id, get_user_id
from pydantic import BaseModel
from typing import Annotated


class NewComment(BaseModel):
    """New comment schema."""

    text: str
    video_id: str


class UpdateComment(BaseModel):
    """Update comment schema."""

    text: str


@router.post("/comments", tags=["comments"])
async def create_comment(
    comment: NewComment, user_id: Annotated[str, Depends(get_current_active_user_id)]
):
    """Create a new comment."""
    try:
        comment_data = comment.dict()
        comment_data["user_id"] = user_id
        new_comment = Comment(**comment_data)
        new_comment.save()
        return JSONResponse(new_comment.to_dict(), status_code=201)
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


@router.get("/comments/{video_id}", tags=["comments"])
async def get_comments(page: int, limit: int):
    """Logic to retrieve all comments for a video."""
    try:
        comments = Comment.objects().skip(page * limit).limit(limit)
        all_comments = []
        if not comments:
            return JSONResponse({"error": "No comments found."}, status_code=404)
        for comment in comments:
            all_comments.append(comment.to_dict())
        return JSONResponse(all_comments)
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


@router.put("/comments/{id}", tags=["comments"])
def update_comment(
    comment_id: str,
    comment: UpdateComment,
    user_id: Annotated[str, Depends(get_current_active_user_id)],
):
    """Update a comment."""
    try:
        comment_data = comment.dict()
        comment = Comment.objects(id=comment_id, user_id=user_id).first()
        if not comment:
            return JSONResponse(
                {"error": "Comment not found or you are not authorized."},
                status_code=404,
            )
        comment.update_model(**comment_data)
        return JSONResponse({"message": "Comment updated successfully"})
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


@router.delete("/comments/{id}", tags=["comments"])
def delete_comment(
    id: str,
    user_id: Annotated[str, Depends(get_current_active_user_id)],
):
    """Delete a comment."""

    try:
        comment = Comment.objects(id=id, user_id=user_id).first()
        if not comment:
            return JSONResponse(
                {"error": "Comment not found or you are not authorized."},
                status_code=404,
            )
        comment.delete()
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )
