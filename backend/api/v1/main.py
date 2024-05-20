"""Main file for the API"""

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from api.v1.routers import router
from data.mongo_setup import global_init
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(debug=True)

global_init()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.router.include_router(router, prefix="/api/v1")


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Handle HTTP exceptions."""
    return JSONResponse(status_code=exc.status_code, content={"message": exc.detail})


@app.exception_handler(404)
async def not_found_exception_handler(request, exc):
    """Handle 404 exceptions."""
    return JSONResponse(status_code=404, content={"message": "Not found"})
