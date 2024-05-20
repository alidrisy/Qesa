from models.base_model import BaseModel
from datetime import datetime
import mongoengine


class Follow(BaseModel, mongoengine.Document):
    """Model to represent follower-following relationships."""

    follower = mongoengine.ReferenceField(
        "User", required=True, reverse_delete_rule=mongoengine.CASCADE
    )
    following = mongoengine.ReferenceField(
        "User", required=True, reverse_delete_rule=mongoengine.CASCADE
    )

    def to_dict(self):
        """Convert the model to a dictionary."""
        follow_data = self.to_mongo().to_dict()
        follow_data["id"] = str(follow_data["_id"])
        follow_data.pop("_id")
        return follow_data

    def delete(self):
        """Delete the user and all the related data."""
        return super().delete()

    meta = {
        "indexes": [
            {"fields": ("follower", "following"), "unique": True},
        ],
        "collection": "follows",
        "alias": "core",
    }
