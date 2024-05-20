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
    creator = mongoengine.ReferenceField(
        "User", required=True, reverse_delete_rule=mongoengine.CASCADE
    )
    tags = mongoengine.ListField(mongoengine.StringField(), default=[])
    likes = mongoengine.IntField(default=0)
    bookmarks = mongoengine.IntField(default=0)
    shares = mongoengine.IntField(default=0)
    views = mongoengine.IntField(default=0)
    comments = mongoengine.IntField(default=0)

    def to_dict(self, user=None):
        """Convert the model to a dictionary."""

        video_data = self.to_mongo().to_dict()
        video_data["id"] = str(video_data["_id"])
        video_data["creator"] = self.creator.to_dict_summary(user)
        video_data.pop("_id")
        video_data["created_date"] = video_data["created_date"].strftime(time)
        video_data["updated_date"] = video_data["updated_date"].strftime(time)
        if user:
            video_data["is_liked"] = self.is_liked(video_data["creator"]["id"])
            video_data["is_bookmarked"] = self.is_bookmarked(
                video_data["creator"]["id"]
            )
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

    meta = {"collection": "videos", "alias": "core", "indexes": ["creator"]}
