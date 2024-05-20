"""Bookmark model for the application."""

import mongoengine
from models.base_model import BaseModel

time = "%Y-%m-%dT%H:%M:%S.%f"


class Bookmark(BaseModel, mongoengine.Document):
    """BookMark model for the application."""

    user_id = mongoengine.ObjectIdField(required=True)
    video_id = mongoengine.ObjectIdField(required=True)

    def save(self, *args, **kwargs):
        """Save the bookmark and update the video model."""
        from models.video import Video

        video = Video.objects(id=self.video_id).first()
        video.update_model(bookmarks=video.bookmarks + 1)
        return super().save(*args, **kwargs)

    def to_dict(self):
        """Convert the model to a dictionary."""
        bookmark_data = self.to_mongo().to_dict()
        bookmark_data["id"] = str(bookmark_data["_id"])
        bookmark_data.pop("_id")
        bookmark_data["created_date"] = bookmark_data["created_date"].strftime(time)
        bookmark_data["updated_date"] = bookmark_data["updated_date"].strftime(time)
        return bookmark_data

    def delete(self):
        """Delete the bookmark and update the video model."""
        from models.video import Video

        video = Video.objects(id=self.video_id).first()
        video.update_model(bookmarks=video.bookmarks - 1)
        return super().delete()

    meta = {
        "collection": "bookmarks",
        "alias": "core",
        "indexes": ["video_id", "user_id"],
    }
