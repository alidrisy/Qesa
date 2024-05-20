import mongoengine
from models.base_model import BaseModel
from datetime import datetime
from models.video import Video

time = "%Y-%m-%dT%H:%M:%S.%f"


class User(BaseModel, mongoengine.Document):
    """User model for the application."""

    email = mongoengine.EmailField(required=True, unique=True)
    username = mongoengine.StringField(required=True, unique=True)
    password = mongoengine.StringField(required=True)
    first_name = mongoengine.StringField(required=True)
    last_name = mongoengine.StringField(required=True)
    profile_picture = mongoengine.StringField(default="")
    bio = mongoengine.StringField(default="")
    followers = mongoengine.IntField(default=0)
    following = mongoengine.IntField(default=0)
    is_validated = mongoengine.BooleanField(default=False)

    def to_dict(self, user_id: str | None = None):
        """Convert the model to a dictionary."""
        user_data = self.to_mongo().to_dict()
        user_data["id"] = str(user_data["_id"])
        user_data.pop("_id")
        if "password" in user_data:
            user_data.pop("password")

        user_data["created_date"] = user_data["created_date"].strftime(time)
        user_data["updated_date"] = user_data["updated_date"].strftime(time)
        if user_id:
            user_data["is_follow"] = self.is_follow(user_id)
        return user_data

    def update_model(self, **kwargs):
        """Update the model with the given key value pairs."""
        if "password" in kwargs:
            kwargs.pop("password")
        if "_id" in kwargs:
            kwargs.pop("_id")
        kwargs["updated_date"] = datetime.now()
        return super().update(**kwargs)

    def is_follow(self, user_id):
        """Check if the video is liked by the user."""
        from models.follow import Follow

        return Follow.objects(follower=self, following__id=user_id).count() > 0

    def delete(self):
        """Delete the user and all the related data."""
        Video.objects(user_id=self.id).delete()
        return super().delete()

    meta = {
        "collection": "users",
        "alias": "core",
        "indexes": ["email", "username"],
    }
