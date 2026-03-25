from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date
from database import get_db
from auth_utils import get_current_user
import models

router = APIRouter()

class CreditScoreCreate(BaseModel):
    score: int
    recorded_at: date = None

@router.get("/")
def get_credit(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    scores = db.query(models.CreditScore).filter(
        models.CreditScore.user_id == current_user.id
    ).order_by(models.CreditScore.recorded_at.desc()).limit(12).all()

    latest = scores[0] if scores else None
    return {
        "current_score": latest.score if latest else None,
        "history": [{"score": s.score, "date": str(s.recorded_at)} for s in reversed(scores)],
        "rating": _rating(latest.score) if latest else None,
    }

@router.post("/", status_code=201)
def add_credit_score(body: CreditScoreCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    entry = models.CreditScore(user_id=current_user.id, score=body.score, recorded_at=body.recorded_at or date.today())
    db.add(entry)
    db.commit()
    return {"message": "Score recorded"}

def _rating(score: int) -> str:
    if score >= 750: return "Excellent"
    if score >= 700: return "Good"
    if score >= 650: return "Fair"
    return "Poor"
