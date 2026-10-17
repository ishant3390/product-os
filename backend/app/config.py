from typing import List
from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    model_config = ConfigDict(env_file=".env", extra="ignore")

    PROJECT_NAME: str = "ProductOS Agent Engine"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    PORT: int = 8000
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000,http://localhost:8000"
    
    # Database
    DATABASE_URL: str = "sqlite:///./productos.db"
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    
    # LLM Settings
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    COPILOT_FAST_MODEL: str = "gemini/gemini-2.0-flash"
    COPILOT_REASONING_MODEL: str = "anthropic/claude-3-5-sonnet-20241022"
    
    # ServiceNow MCP Settings
    SERVICENOW_INSTANCE_URL: str = ""
    SERVICENOW_USERNAME: str = ""
    SERVICENOW_PASSWORD: str = ""
    SERVICENOW_MODE: str = "sandbox"  # "sandbox" or "live"
    
    # Google Workspace MCP Settings
    GOOGLE_WORKSPACE_CLIENT_ID: str = ""
    GOOGLE_WORKSPACE_CLIENT_SECRET: str = ""
    GOOGLE_WORKSPACE_MODE: str = "sandbox"  # "sandbox" or "live"

    @property
    def cors_origin_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

settings = Settings()
