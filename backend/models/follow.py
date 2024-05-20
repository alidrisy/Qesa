from models.base_model import BaseModel
from datetime import datetime
import mongoengine
from models.user import User


class Follow(BaseModel, mongoengine.Document):
    """Model to represent follower-following relationships."""

    follower = mongoengine.ReferenceField(
        "User", required=True, reverse_delete_rule=mongoengine.CASCADE
    )
    following = mongoengine.ReferenceField(
        "User", required=True, reverse_delete_rule=mongoengine.CASCADE
    )

    def save(self, *args, **kwargs):
        """Save the follow and update the user models."""
        self.follower.update_model(following=self.follower.following + 1)
        self.following.update_model(followers=self.following.followers + 1)
        return super().save(*args, **kwargs)

    def to_dict(self):
        """Convert the model to a dictionary."""
        follow_data = self.to_mongo().to_dict()
        follow_data["id"] = str(follow_data["_id"])
        follow_data.pop("_id")
        return follow_data

    meta = {
        "indexes": [
            {"fields": ("follower", "following"), "unique": True},
        ],
        "collection": "follows",
        "alias": "core",
    }
