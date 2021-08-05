from functools import partial

import uvicorn
from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware

from app.api.errors.http_error import http_error_handler
from app.api.routes import router
from app.core.events import startup_handler, shutdown_handler
from app.core.settings import settings


def create_app() -> FastAPI:
    application = FastAPI()

    application.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=[settings.allowed_origins],
        allow_methods=["*"],
        allow_headers=["*"]
    )

    application.include_router(router)

    application.add_exception_handler(HTTPException, http_error_handler)

    application.add_event_handler('startup', partial(startup_handler, application))
    application.add_event_handler('shutdown', partial(shutdown_handler, application))

    return application


app = create_app()

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000, debug=True)
