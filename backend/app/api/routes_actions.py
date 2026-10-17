from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
import app.models.db_models as db_models
import app.models.schemas as schemas

router = APIRouter(prefix="/actions", tags=["Action Inbox"])

@router.get("", response_model=List[schemas.ActionCardSchema])
def list_actions(scope_id: Optional[str] = None, db: Session = Depends(get_db)):
    """Returns Action Inbox cards filtered by product scope."""
    query = db.query(db_models.ActionCardDB)
    if scope_id and scope_id != "all":
        query = query.filter(db_models.ActionCardDB.scope_id == scope_id)
    return query.order_by(db_models.ActionCardDB.created_at.desc()).all()

@router.post("/{action_id}/resolve", response_model=schemas.ActionCardSchema)
def resolve_action(action_id: str, payload: schemas.ActionCardResolveRequest, db: Session = Depends(get_db)):
    """Resolves an action card in-place."""
    card = db.query(db_models.ActionCardDB).filter_by(id=action_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Action card not found")
    card.status = "resolved"
    db.commit()
    db.refresh(card)
    return card
