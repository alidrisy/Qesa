# #!/usr/bin/python3
import mongoengine
from datetime import datetime
import uuid

time = "%Y-%m-%dT%H:%M:%S.%f"


class BaseModel:
    """Base model for all models in the application."""

    created_date = mongoengine.DateTimeField(default=datetime.now().strftime(time))
    updated_date = mongoengine.DateTimeField(default=datetime.now().strftime(time))
