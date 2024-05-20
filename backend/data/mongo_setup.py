"""This module initializes the connection to the MongoDB database."""

import mongoengine


def global_init():
    """Initialize the connection to the MongoDB database."""
    mongoengine.connect(db="qesa", alias="default")
