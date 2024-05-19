import mongoengine
from models.base_model import BaseModel


class BookMark(BaseModel, mongoengine.Document):
    """BookMark model for the application."""

    user_id = mongoengine.ObjectIdField(required=True)
    video_id = mongoengine.ObjectIdField(required=True)

    def to_dict(self):
        """Convert the model to a dictionary."""
        book_mark_data = self.to_mongo().to_dict()
        book_mark_data["id"] = str(book_mark_data["_id"])
        book_mark_data.pop("_id")
        book_mark_data["created_date"] = book_mark_data["created_date"].strftime(time)
        book_mark_data["updated_date"] = book_mark_data["updated_date"].strftime(time)
        return book_mark_data

    meta = {
        "collection": "book_marks",
        "alias": "core",
        "indexes": ["video_id", "user_id"],
    }
