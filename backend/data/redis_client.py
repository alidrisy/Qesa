"""Module to Caching data using Redis"""

import redis
from typing import Union, Any


class Cache:
    """Class to Caching data using Redis"""

    def __init__(self):
        """Initialize data"""
        self._redis = redis.Redis()

    def store(self, data: Union[str, bytes, int, float], id: str, exp: int) -> str:
        """Set value using key in Redis"""
        self._redis.set(id, data, exp)
        return id

    def get(self, key: str) -> Any:
        """Get value using key from Redis"""

        data = self._redis.get(key)
        return data.decode("utf-8")

    def delete(self, key: str) -> None:
        """Delete value using key from Redis"""
        self._redis.delete(key)
