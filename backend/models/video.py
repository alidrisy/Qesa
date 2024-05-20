#!/usr/bin/python3
"""Contains the Video model for the application."""
from models.base_model import BaseModel
import mongoengine
from datetime import datetime

from models.bookmark import Bookmark
from models.like import Like
from models.comment import Comment

time = "%Y-%m-%dT%H:%M:%S.%f"


class Video(BaseModel, mongoengine.Document):
    """Video model for the application."""

    video_url = mongoengine.StringField(required=True)
    thumbnail_url = mongoengine.StringField(required=True)
    description = mongoengine.StringField(required=True)
    user_id = mongoengine.ObjectIdField(required=True)
    tags = mongoengine.ListField(mongoengine.StringField(), default=[])
    likes = mongoengine.IntField(default=0)
    bookmarks = mongoengine.IntField(default=0)
    shares = mongoengine.IntField(default=0)
    views = mongoengine.IntField(default=0)
    comments = mongoengine.IntField(default=0)

    def to_dict(self, user_id: str | None = None):
        """Convert the model to a dictionary."""
        from models.user import User

        video_data = self.to_mongo().to_dict()
        video_data["id"] = str(video_data["_id"])
        creator_data = (
            User.objects(id=video_data["user_id"])
            .first()
            .to_dict(video_data["user_id"])
        )
        video_data["creator"] = {
            "id": creator_data["id"],
            "username": creator_data["username"],
            "profile_picture": creator_data["profile_picture"],
            "is_follow": creator_data["is_follow"],
        }
        video_data.pop("_id")
        video_data.pop("user_id")
        video_data["created_date"] = video_data["created_date"].strftime(time)
        video_data["updated_date"] = video_data["updated_date"].strftime(time)
        if user_id:
            video_data["is_liked"] = self.is_liked(user_id)
            video_data["is_bookmarked"] = self.is_bookmarked(user_id)
        return video_data

    def update_model(self, **kwargs):
        """Update the model with the given key value pairs."""
        kwargs["updated_date"] = datetime.now()
        return super().update(**kwargs)

    def is_liked(self, user_id):
        """Check if the video is liked by the user."""
        return Like.objects(video_id=self.id, user_id=user_id).count() > 0

    def is_bookmarked(self, user_id):
        """Check if the video is bookmarked by the user."""
        return Bookmark.objects(video_id=self.id, user_id=user_id).count() > 0

    def delete(self):
        """Delete the video and all associated data."""
        Comment.objects(video_id=self.id).delete()
        Bookmark.objects(video_id=self.id).delete()
        Like.objects(video_id=self.id).delete()
        return super().delete()

    meta = {"collection": "videos", "alias": "core", "indexes": ["user_id"]}
