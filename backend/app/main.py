import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db
from app.scheduler.engine import cadence_scheduler
from app.api.routes_scopes import router as scopes_router
from app.api.routes_actions import router as actions_router
from app.api.routes_connectors import router as connectors_router
from app.api.routes_copilot import router as copilot_router
from app.api.routes_agents import router as agents_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("productos")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting ProductOS Agent Engine...")
    init_db()
    cadence_scheduler.start()
    yield
    # Shutdown
    logger.info("Shutting down ProductOS Agent Engine...")
    cadence_scheduler.shutdown()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development flexibility
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
api_v1_prefix = "/api/v1"
app.include_router(scopes_router, prefix=api_v1_prefix)
app.include_router(actions_router, prefix=api_v1_prefix)
app.include_router(connectors_router, prefix=api_v1_prefix)
app.include_router(copilot_router, prefix=api_v1_prefix)
app.include_router(agents_router, prefix=api_v1_prefix)

@app.get("/api/v1/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "scheduler_running": cadence_scheduler.is_running
    }

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to ProductOS Agent Engine API",
        "docs": "/docs",
        "health": "/api/v1/health"
    }
