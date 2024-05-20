"""Videos endpoints."""

from models.video import Video
from api.v1.routers import router
from fastapi.responses import JSONResponse
from fastapi import Depends, Response, status, BackgroundTasks
from api.v1.dependencies.videos_depends import *
from pydantic import BaseModel


class NewVideo(BaseModel):
    """New video schema."""

    description: str
    video_url: str
    thumbnail_url: str
    tags: list[str]


class UpdateVideo(BaseModel):
    """Update video schema."""

    description: str
    tags: list[str]


@router.post("/videos", tags=["videos"])
async def create_video(
    video: NewVideo, user_id: Annotated[str, Depends(get_current_active_user_id)]
):
    """Create a new video."""
    try:
        video_data = video.dict()
        video_data["user_id"] = user_id
        new_video = Video(**video_data)
        new_video.save()
        return JSONResponse(new_video.to_dict(), status_code=201)
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


@router.get("/videos", tags=["videos"])
async def get_videos(page: int, limit: int, user_id: str | None = None):
    """Logic to retrieve all videos"""
    try:
        videos = Video.objects().skip(page * limit).limit(limit)
        all_videos = []
        if not videos:
            return JSONResponse({"error": "No videos found for now."}, status_code=404)
        for video in videos:
            all_videos.append(video.to_dict(user_id))
        return JSONResponse(all_videos)
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


@router.get("/videos/{username}", tags=["videos"])
def get_user_videos(username: str, page: int, limit: int, user_id: str | None = None):
    """Get a specific user videos."""
    try:
        print(username)
        user_id = get_user_id({"username": username})
        videos = Video.objects(user_id=user_id).skip(page * limit).limit(limit)
        if not videos:
            return JSONResponse(
                {"error": "No videos found for this user."}, status_code=404
            )
        all_videos = []
        for video in videos:
            all_videos.append(video.to_dict())
        return JSONResponse(all_videos)
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


@router.put("/videos/{id}", tags=["videos"])
def update_video(
    id: str,
    video: UpdateVideo,
    user_id: Annotated[str, Depends(get_current_active_user_id)],
):
    """Update a video."""
    try:
        video_data = video.dict()
        video = Video.objects(id=id, user_id=user_id).first()
        if not video:
            return JSONResponse(
                {"error": "Video not found or you are not authorized."},
                status_code=404,
            )
        video.update_model(**video_data)
        return JSONResponse({"message": "Video updated successfully"})
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )


@router.delete("/videos/{id}", tags=["videos"])
def delete_video(
    id: str,
    user_id: Annotated[str, Depends(get_current_active_user_id)],
):
    """Delete a video."""
    try:
        video = Video.objects(id=id, user_id=user_id).first()
        if not video:
            return JSONResponse(
                {"error": "Video not found or you are not authorized."},
                status_code=404,
            )
        video.delete()
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        print(e)
        return JSONResponse(
            {"error": "something went wrong try again later"},
            status_code=500,
        )
