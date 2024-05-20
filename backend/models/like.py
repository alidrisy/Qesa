import mongoengine
from models.base_model import BaseModel

time = "%Y-%m-%dT%H:%M:%S.%f"


class Like(BaseModel, mongoengine.Document):
    """BookMark model for the application."""

    user_id = mongoengine.ObjectIdField(required=True)
    video_id = mongoengine.ObjectIdField(required=True)

    def save(self, *args, **kwargs):
        """Save the like and update the video model."""
        from models.video import Video

        video = Video.objects(id=self.video_id).first()
        video.update_model(likes=video.likes + 1)
        return super().save(*args, **kwargs)

    def to_dict(self):
        """Convert the model to a dictionary."""
        like_data = self.to_mongo().to_dict()
        like_data["id"] = str(like_data["_id"])
        like_data["user_id"] = str(like_data["user_id"])
        like_data["video_id"] = str(like_data["video_id"])
        like_data.pop("_id")
        like_data["created_date"] = like_data["created_date"].strftime(time)
        like_data["updated_date"] = like_data["updated_date"].strftime(time)
        return like_data

    def delete(self):
        """Delete the like and update the video model."""
        from models.video import Video

        video = Video.objects(id=self.video_id).first()
        video.update_model(likes=video.likes - 1)
        return super().delete()

    meta = {
        "collection": "likes",
        "alias": "core",
        "indexes": ["video_id", "user_id"],
        "ordering": ["-created_date"],
    }
