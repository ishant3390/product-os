from fastapi import APIRouter
from sse_starlette.sse import EventSourceResponse
import app.models.schemas as schemas
from app.agents.copilot_agent import copilot_agent

router = APIRouter(prefix="/copilot", tags=["AI Copilot"])

@router.post("/chat")
async def chat_copilot_stream(payload: schemas.CopilotChatRequest):
    """Streams conversational AI Copilot tokens via Server-Sent Events (SSE)."""
    generator = copilot_agent.stream_chat(
        message=payload.message,
        scope_id=payload.scope_id,
        card_id=payload.card_id
    )
    return EventSourceResponse(generator)
