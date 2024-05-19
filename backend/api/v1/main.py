from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from api.v1.routers import router as api_v1_router
from data.mongo_setup import global_init

app = FastAPI(debug=True)

global_init()

app.router.include_router(api_v1_router, prefix="/api/v1")


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(status_code=exc.status_code, content={"message": exc.detail})


@app.exception_handler(404)
async def not_found_exception_handler(request, exc):
    return JSONResponse(status_code=404, content={"message": "Not found"})
