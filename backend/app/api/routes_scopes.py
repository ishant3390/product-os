from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
import app.models.db_models as db_models
import app.models.schemas as schemas

router = APIRouter(prefix="/scopes", tags=["Scopes"])

@router.get("", response_model=List[schemas.ProductScopeSchema])
def list_scopes(db: Session = Depends(get_db)):
    """Returns all available product and project scopes."""
    return db.query(db_models.ProductScopeDB).all()
