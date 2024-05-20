from fastapi import APIRouter
from data.redis_client import Cache

router = APIRouter()
redis_client = Cache()

from api.v1.routers.auth import *
from api.v1.routers.users import *
from api.v1.routers.videos import *
from api.v1.routers.comments import *
from api.v1.routers.likes import *
from api.v1.routers.bookmarks import *
from api.v1.routers.follows import *
