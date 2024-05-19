from fastapi import APIRouter

router = APIRouter(redirect_slashes=False)

from api.v1.routers.download import *
from api.v1.routers.auth import *
from api.v1.routers.users import *
from api.v1.routers.videos import *
