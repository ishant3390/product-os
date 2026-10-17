from fastapi import APIRouter
import app.models.schemas as schemas
from app.scheduler.engine import cadence_scheduler

router = APIRouter(prefix="/agents", tags=["Agents"])

@router.post("/{agent_name}/run", response_model=schemas.AgentRunResponse)
async def trigger_agent(agent_name: str, payload: schemas.AgentRunRequest):
    """Triggers an agent on-demand manually."""
    res = await cadence_scheduler.run_agent_on_demand(
        agent_name=agent_name,
        scope_id=payload.scope_id or "checkout-engine"
    )
    return schemas.AgentRunResponse(
        agent_name=res["agent_name"],
        status=res["status"],
        message=res["message"],
        duration_ms=res["duration_ms"],
        artifacts_created=res.get("artifacts_created", [])
    )
