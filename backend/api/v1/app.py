"""FastAPI app entry point."""

import uvicorn

if __name__ == "__main__":
    from pyngrok import ngrok

    uvicorn.run("api.v1.main:app", host="0.0.0.0", port=8000, reload=True)
