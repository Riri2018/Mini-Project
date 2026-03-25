from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import date
from database import get_db
from auth_utils import get_current_user
import models

router = APIRouter()

class SavingsRecordCreate(BaseModel):
    month: date
    amount_saved: float

class EmergencyFundUpdate(BaseModel):
    target_amount: Optional[float] = None
    current_amount: Optional[float] = None

class GoalUpdate(BaseModel):
    current_amount: float

@router.get("/")
def get_savings(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    records = db.query(models.SavingsRecord).filter(
        models.SavingsRecord.user_id == current_user.id
    ).order_by(models.SavingsRecord.month.desc()).limit(12).all()

    emergency = db.query(models.EmergencyFund).filter(models.EmergencyFund.user_id == current_user.id).first()
    goals = db.query(models.FinancialGoal).filter(models.FinancialGoal.user_id == current_user.id, models.FinancialGoal.is_active == True).all()

    return {
        "monthly_records": [{"month": str(r.month), "amount_saved": float(r.amount_saved)} for r in records],
        "emergency_fund": {"target": float(emergency.target_amount), "current": float(emergency.current_amount)} if emergency else None,
        "goals": [{"id": str(g.id), "goal_type": g.goal_type, "target_amount": float(g.target_amount or 0), "current_amount": float(g.current_amount or 0), "target_date": str(g.target_date) if g.target_date else None} for g in goals],
    }

@router.post("/record")
def add_savings_record(body: SavingsRecordCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.query(models.SavingsRecord).filter(models.SavingsRecord.user_id == current_user.id, models.SavingsRecord.month == body.month).first()
    if existing:
        existing.amount_saved = body.amount_saved
    else:
        db.add(models.SavingsRecord(user_id=current_user.id, month=body.month, amount_saved=body.amount_saved))
    db.commit()
    return {"message": "Savings record saved"}

@router.patch("/emergency-fund")
def update_emergency_fund(body: EmergencyFundUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    fund = db.query(models.EmergencyFund).filter(models.EmergencyFund.user_id == current_user.id).first()
    if not fund:
        fund = models.EmergencyFund(user_id=current_user.id, target_amount=0, current_amount=0)
        db.add(fund)
    if body.target_amount is not None:
        fund.target_amount = body.target_amount
    if body.current_amount is not None:
        fund.current_amount = body.current_amount
    db.commit()
    return {"message": "Emergency fund updated"}

@router.patch("/goals/{goal_id}")
def update_goal(goal_id: str, body: GoalUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    goal = db.query(models.FinancialGoal).filter(models.FinancialGoal.id == goal_id, models.FinancialGoal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(404, "Goal not found")
    goal.current_amount = body.current_amount
    db.commit()
    return {"message": "Goal updated"}
