import mongoengine
from models.base_model import BaseModel

time = "%Y-%m-%dT%H:%M:%S.%f"


class User(BaseModel, mongoengine.Document):
    """User model for the application."""

    email = mongoengine.EmailField(required=True, unique=True)
    username = mongoengine.StringField(required=True, unique=True)
    password = mongoengine.StringField(required=True)
    first_name = mongoengine.StringField(required=True)
    last_name = mongoengine.StringField(required=True)
    profile_picture = mongoengine.StringField(default="")
    profile_picture = mongoengine.StringField(default="")
    bio = mongoengine.StringField(default="")
    followers = mongoengine.ListField(mongoengine.ObjectIdField("User"), default=[])
    following = mongoengine.ListField(mongoengine.ObjectIdField("User"), default=[])
    validated = mongoengine.BooleanField(default=False)
    validated_id = mongoengine.StringField(default="")

    def to_dict(self):
        """Convert the model to a dictionary."""
        user_data = self.to_mongo().to_dict()
        user_data["id"] = str(user_data["_id"])
        user_data.pop("_id")
        user_data.pop("password")
        user_data["created_date"] = user_data["created_date"].strftime(time)
        user_data["updated_date"] = user_data["updated_date"].strftime(time)
        return user_data

    meta = {
        "collection": "users",
        "alias": "core",
        "indexes": ["email", "username"],
    }
