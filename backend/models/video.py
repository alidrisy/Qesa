#!/usr/bin/python3
"""Contains the Video model for the application."""
from models.base_model import BaseModel
import mongoengine

time = "%Y-%m-%dT%H:%M:%S.%f"


class Video(BaseModel, mongoengine.Document):
    """Video model for the application."""

    video_url = mongoengine.StringField(required=True)
    thumbnail_url = mongoengine.StringField(required=True)
    description = mongoengine.StringField(required=True)
    user_id = mongoengine.ObjectIdField(required=True)
    tags = mongoengine.ListField(mongoengine.StringField(), default=[])
    likes = mongoengine.ListField(mongoengine.ObjectIdField("User"), default=[])
    book_marks = mongoengine.ListField(mongoengine.ObjectIdField("User"), default=[])
    shares = mongoengine.IntField(default=0)
    views = mongoengine.IntField(default=0)

    def to_dict(self):
        """Convert the model to a dictionary."""
        video_data = self.to_mongo().to_dict()
        video_data["id"] = str(video_data["_id"])
        video_data["user_id"] = str(video_data["user_id"])
        video_data.pop("_id")
        video_data["created_date"] = video_data["created_date"].strftime(time)
        video_data["updated_date"] = video_data["updated_date"].strftime(time)
        return video_data

    meta = {"collection": "videos", "alias": "core", "indexes": ["user_id"]}
