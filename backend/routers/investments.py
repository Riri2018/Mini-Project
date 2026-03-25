from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import date
from database import get_db
from auth_utils import get_current_user
import models

router = APIRouter()

class InvestmentCreate(BaseModel):
    type: str
    name: Optional[str] = None
    invested_amount: float
    current_value: float
    risk_level: Optional[str] = None
    started_at: Optional[date] = None

class InvestmentUpdate(BaseModel):
    current_value: Optional[float] = None
    invested_amount: Optional[float] = None

class RiskProfileSet(BaseModel):
    risk_score: int
    risk_category: str

@router.get("/")
def get_investments(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    investments = db.query(models.Investment).filter(models.Investment.user_id == current_user.id).all()
    risk = db.query(models.RiskProfile).filter(models.RiskProfile.user_id == current_user.id).first()
    total_invested = sum(float(i.invested_amount) for i in investments)
    total_value = sum(float(i.current_value) for i in investments)
    return {
        "investments": [{"id": str(i.id), "type": i.type, "name": i.name, "invested_amount": float(i.invested_amount), "current_value": float(i.current_value), "risk_level": i.risk_level, "started_at": str(i.started_at) if i.started_at else None} for i in investments],
        "total_invested": total_invested,
        "total_value": total_value,
        "returns_pct": round(((total_value - total_invested) / total_invested * 100), 2) if total_invested > 0 else 0,
        "risk_profile": {"risk_score": risk.risk_score, "risk_category": risk.risk_category} if risk else None,
    }

@router.post("/", status_code=201)
def add_investment(body: InvestmentCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    inv = models.Investment(user_id=current_user.id, **body.dict())
    db.add(inv)
    db.commit()
    db.refresh(inv)
    return {"id": str(inv.id), "message": "Investment added"}

@router.patch("/{inv_id}")
def update_investment(inv_id: str, body: InvestmentUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    inv = db.query(models.Investment).filter(models.Investment.id == inv_id, models.Investment.user_id == current_user.id).first()
    if not inv:
        raise HTTPException(404, "Investment not found")
    for field, val in body.dict(exclude_none=True).items():
        setattr(inv, field, val)
    db.commit()
    return {"message": "Updated"}

@router.delete("/{inv_id}")
def delete_investment(inv_id: str, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    inv = db.query(models.Investment).filter(models.Investment.id == inv_id, models.Investment.user_id == current_user.id).first()
    if not inv:
        raise HTTPException(404, "Investment not found")
    db.delete(inv)
    db.commit()
    return {"message": "Deleted"}

@router.post("/risk-profile")
def set_risk_profile(body: RiskProfileSet, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    rp = db.query(models.RiskProfile).filter(models.RiskProfile.user_id == current_user.id).first()
    if rp:
        rp.risk_score = body.risk_score; rp.risk_category = body.risk_category
    else:
        db.add(models.RiskProfile(user_id=current_user.id, risk_score=body.risk_score, risk_category=body.risk_category))
    db.commit()
    return {"message": "Risk profile saved"}
