#!/usr/bin/python3
"""Contains the Comment model for the application."""
import mongoengine
from models.base_model import BaseModel
from datetime import datetime

time = "%Y-%m-%dT%H:%M:%S.%f"


class Comment(BaseModel, mongoengine.Document):
    """Comment model for the application."""

    text = mongoengine.StringField(required=True)
    user_id = mongoengine.ObjectIdField(required=True)
    video_id = mongoengine.ObjectIdField(required=True)

    def save(self, *args, **kwargs):
        """Save the comment and update the video model."""
        from models.video import Video

        video = Video.objects(id=self.video_id).first()
        video.update_model(comments=video.comments + 1)
        return super().save(*args, **kwargs)

    def to_dict(self):
        """Convert the model to a dictionary."""
        from models.user import User

        comments_data = self.to_mongo().to_dict()
        comments_data["id"] = str(comments_data["_id"])
        comments_data["video_id"] = str(comments_data["video_id"])
        creator_data = User.objects(id=comments_data["user_id"]).first().to_dict()
        comments_data["creator"] = {
            "id": creator_data["id"],
            "username": creator_data["username"],
            "profile_picture": creator_data["profile_picture"],
        }
        comments_data.pop("_id")
        comments_data.pop("user_id")
        comments_data["created_date"] = comments_data["created_date"].strftime(time)
        comments_data["updated_date"] = comments_data["updated_date"].strftime(time)
        return comments_data

    def update_model(self, **kwargs):
        """Update the model with the given key value pairs."""
        kwargs["updated_date"] = datetime.now()
        return super().update(**kwargs)

    def delete(self):
        """Delete the comment and update the video model."""
        from models.video import Video

        video = Video.objects(id=self.video_id).first()
        video.update_model(comments=video.comments - 1)
        return super().delete()

    meta = {"collection": "comments", "alias": "core", "indexs": ["video_id"]}
