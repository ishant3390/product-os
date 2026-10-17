from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
import app.models.db_models as db_models
import app.models.schemas as schemas
from app.mcp.client_manager import mcp_manager

router = APIRouter(prefix="/connectors", tags=["MCP Connectors"])

@router.get("", response_model=List[schemas.ConnectorConfigSchema])
def list_connectors(db: Session = Depends(get_db)):
    """Lists configured user MCP connectors."""
    return db.query(db_models.ConnectorConfigDB).all()

@router.post("/{connector_type}/save", response_model=schemas.ConnectorConfigSchema)
def save_connector(connector_type: str, payload: schemas.ConnectorSaveRequest, db: Session = Depends(get_db)):
    """Saves user-personalized credentials for a connector."""
    conn = db.query(db_models.ConnectorConfigDB).filter_by(connector_type=connector_type).first()
    if not conn:
        raise HTTPException(status_code=404, detail="Connector not found")
    
    conn.mode = payload.mode
    conn.instance_url = payload.instance_url
    conn.username = payload.username
    conn.client_id = payload.client_id
    db.commit()
    db.refresh(conn)

    # Update active MCP client manager
    if connector_type == "servicenow":
        mcp_manager.update_servicenow_config(
            mode=payload.mode,
            instance_url=payload.instance_url,
            username=payload.username,
            password=payload.password
        )
    elif connector_type == "google_workspace":
        mcp_manager.update_google_workspace_config(
            mode=payload.mode,
            client_id=payload.client_id,
            client_secret=payload.client_secret
        )

    return conn

@router.post("/{connector_type}/test", response_model=schemas.ConnectorTestResponse)
async def test_connector(connector_type: str):
    """Tests the connection to an MCP server (ServiceNow or Google Workspace)."""
    if connector_type == "servicenow":
        res = await mcp_manager.servicenow.test_connection()
        return schemas.ConnectorTestResponse(
            connector_type="servicenow",
            status=res["status"],
            message=res["message"],
            latency_ms=res["latency_ms"],
            tables_verified=res.get("tables_verified", [])
        )
    elif connector_type == "google_workspace":
        res = await mcp_manager.google_workspace.test_connection()
        return schemas.ConnectorTestResponse(
            connector_type="google_workspace",
            status=res["status"],
            message=res["message"],
            latency_ms=res["latency_ms"],
            tables_verified=res.get("tables_verified", [])
        )
    else:
        raise HTTPException(status_code=400, detail="Unsupported connector type")
