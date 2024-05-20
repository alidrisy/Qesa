"""FastAPI app entry point."""

import uvicorn

if __name__ == "__main__":

    uvicorn.run(
        "api.v1.main:app", host="localhost", port=8000, reload=True, log_level="info"
    )
