from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict

# Scope Schemas
class ProductScopeSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    code: str
    is_default: bool
    description: Optional[str] = None
    created_at: Optional[datetime] = None

# Action Card Schemas
class ActionCardSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    scope_id: str
    source: str
    category: str
    urgency: str
    title: str
    summary: str
    best_next_step: str
    status: str
    action_type: str
    action_label: str
    target_ticket: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class ActionCardResolveRequest(BaseModel):
    resolution_note: Optional[str] = "Resolved by PM"

# Copilot Schemas
class CopilotChatRequest(BaseModel):
    message: str
    scope_id: str = "checkout-engine"
    card_id: Optional[str] = None
    stream: bool = True

class CopilotChatResponse(BaseModel):
    response: str
    sources: List[Dict[str, str]] = []
    actions_suggested: List[Dict[str, str]] = []

# Connector Schemas
class ConnectorConfigSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    connector_type: str
    name: str
    is_enabled: bool
    mode: str
    instance_url: Optional[str] = None
    username: Optional[str] = None
    client_id: Optional[str] = None
    status: str
    target_tables: Optional[str] = None
    last_tested_at: Optional[datetime] = None

class ConnectorSaveRequest(BaseModel):
    mode: str = "sandbox"  # sandbox or live
    instance_url: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    client_id: Optional[str] = None
    client_secret: Optional[str] = None

class ConnectorTestRequest(BaseModel):
    mode: Optional[str] = "sandbox"
    instance_url: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    client_id: Optional[str] = None
    client_secret: Optional[str] = None

class ConnectorTestResponse(BaseModel):
    connector_type: str
    status: str
    message: str
    latency_ms: int
    tables_verified: List[str] = []

# Agent Schemas
class AgentRunRequest(BaseModel):
    scope_id: Optional[str] = "checkout-engine"
    params: Optional[Dict[str, Any]] = None

class AgentRunResponse(BaseModel):
    agent_name: str
    status: str
    message: str
    duration_ms: int
    artifacts_created: List[str] = []
