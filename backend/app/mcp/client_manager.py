import logging
from typing import Dict, Any, Optional
from app.config import settings
from app.mcp.servicenow_adapter import ServiceNowAdapter
from app.mcp.google_workspace_adapter import GoogleWorkspaceAdapter

logger = logging.getLogger(__name__)

class MCPClientManager:
    """Manages user-scoped MCP adapter sessions and tools."""

    def __init__(self):
        self.servicenow = ServiceNowAdapter(
            mode=settings.SERVICENOW_MODE,
            instance_url=settings.SERVICENOW_INSTANCE_URL,
            username=settings.SERVICENOW_USERNAME,
            password=settings.SERVICENOW_PASSWORD
        )
        self.google_workspace = GoogleWorkspaceAdapter(
            mode=settings.GOOGLE_WORKSPACE_MODE,
            client_id=settings.GOOGLE_WORKSPACE_CLIENT_ID,
            client_secret=settings.GOOGLE_WORKSPACE_CLIENT_SECRET
        )

    def update_servicenow_config(self, mode: str, instance_url: Optional[str] = None, username: Optional[str] = None, password: Optional[str] = None):
        self.servicenow = ServiceNowAdapter(
            mode=mode,
            instance_url=instance_url,
            username=username,
            password=password
        )
        logger.info(f"ServiceNow MCP adapter reconfigured: mode={mode}")

    def update_google_workspace_config(self, mode: str, client_id: Optional[str] = None, client_secret: Optional[str] = None):
        self.google_workspace = GoogleWorkspaceAdapter(
            mode=mode,
            client_id=client_id,
            client_secret=client_secret
        )
        logger.info(f"Google Workspace MCP adapter reconfigured: mode={mode}")

mcp_manager = MCPClientManager()
