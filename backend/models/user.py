import mongoengine
from models.base_model import BaseModel
from datetime import datetime

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

    def to_dict(self):
        """Convert the model to a dictionary."""
        user_data = self.to_mongo().to_dict()
        user_data["id"] = str(user_data["_id"])
        user_data.pop("_id")
        if "password" in user_data:
            user_data.pop("password")

        user_data["created_date"] = user_data["created_date"].strftime(time)
        user_data["updated_date"] = user_data["updated_date"].strftime(time)
        return user_data

    def to_dict_summary(self, target=None):
        """Convert the model to a dictionary."""
        user_data = self.to_mongo().to_dict()
        return {
            "id": str(user_data["_id"]),
            "username": user_data["username"],
            "profile_picture": user_data["profile_picture"],
            "is_follow": self.is_follow(target),
        }

    def update_model(self, **kwargs):
        """Update the model with the given key value pairs."""
        if "password" in kwargs:
            kwargs.pop("password")
        if "_id" in kwargs:
            kwargs.pop("_id")
        kwargs["updated_date"] = datetime.now()
        return super().update(**kwargs)

    def is_follow(self, target):
        """Check if the video is liked by the user."""
        from models.follow import Follow

        return Follow.objects(follower=self, following=target).count() > 0

    meta = {
        "collection": "users",
        "alias": "core",
        "indexes": ["email", "username"],
    }
