import mongoengine
from models.base_model import BaseModel


class Like(BaseModel, mongoengine.Document):
    """BookMark model for the application."""

    id = mongoengine.StringField(primary_key=True, default=str(uuid.uuid4()))
    user_id = mongoengine.ObjectIdField(required=True)
    video_id = mongoengine.ObjectIdField(required=True)

    def to_dict(self):
        """Convert the model to a dictionary."""
        like_data = self.to_mongo().to_dict()
        like_data["id"] = str(like_data["_id"])
        like_data.pop("_id")
        like_data["created_date"] = like_data["created_date"].strftime(time)
        like_data["updated_date"] = like_data["updated_date"].strftime(time)
        return like_data

    meta = {
        "collection": "book_marks",
        "alias": "core",
        "indexes": ["video_id", "user_id"],
    }
