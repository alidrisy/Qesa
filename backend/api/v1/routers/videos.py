from models.video import Video
from api.v1.routers import router
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from api.v1.dependsies.videos_depends import *
from pydantic import BaseModel


class NewVideo(BaseModel):
    description: str
    video_url: str
    thumbnail_url: str
    tags: list[str]


@router.post("/videos")
def create_video(
    video: NewVideo, user_id: Annotated[str, Depends(get_current_active_user_id)]
):
    """Create a new video."""
    video_data = video.dict()
    video_data["user_id"] = user_id
    new_video = Video(**video_data)
    new_video.save()
    return JSONResponse(new_video.to_dict())


# @router.get("/videos")
# def get_videos():
#     """Logic to retrieve all videos"""
#     return {"message": "All videos retrieved successfully"}


# @router.get("/videos/{video_id}")
# def get_video(
#     video_id: int,
#     current_user: Annotated[RespondeUser, Depends(get_current_active_user)],
# ):
#     """Get a specific video."""
#     return {"message": f"Video with ID {video_id} retrieved successfully"}


# @router.put("/videos/{video_id}")
# def update_video(
#     video_id: int,
#     video: Video,
#     current_user: Annotated[RespondeUser, Depends(get_current_active_user)],
# ):
#     """Update a video."""
#     return {"message": f"Video with ID {video_id} updated successfully"}


# @router.delete("/videos/{video_id}")
# def delete_video(
#     video_id: int,
#     current_user: Annotated[RespondeUser, Depends(get_current_active_user)],
# ):
#     """Delete a video."""
#     return {"message": f"Video with ID {video_id} deleted successfully"}
