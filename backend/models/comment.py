#!/usr/bin/python3
"""Contains the Comment model for the application."""
import mongoengine
from models.base_model import BaseModel


class Comment(BaseModel, mongoengine.Document):
    """Comment model for the application."""

    text = mongoengine.StringField(required=True)
    user_id = mongoengine.ObjectIdField(required=True)
    video_id = mongoengine.ObjectIdField(required=True)

    def to_dict(self):
        """Convert the model to a dictionary."""
        comments_data = self.to_mongo().to_dict()
        comments_data["id"] = str(comments_data["_id"])
        comments_data.pop("_id")
        comments_data["created_date"] = comments_data["created_date"].strftime(time)
        comments_data["updated_date"] = comments_data["updated_date"].strftime(time)
        return comments_data

    meta = {"collection": "comments", "alias": "core", "indexs": ["video_id"]}
