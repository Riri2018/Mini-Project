from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from database import get_db
from auth_utils import get_current_user
import models

router = APIRouter()

class ProfileUpdate(BaseModel):
    age: Optional[int] = None
    city: Optional[str] = None
    employer: Optional[str] = None
    salary: Optional[float] = None
    pay_date: Optional[int] = None

class OnboardingPayload(BaseModel):
    age: int
    city: str
    employer: str
    salary: float
    pay_date: int
    goals: List[str]
    fixed_expenses: dict  # {rent, food, transport, utilities, ...}

@router.get("/profile")
def get_profile(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(models.UserProfile).filter(models.UserProfile.user_id == current_user.id).first()
    goals = db.query(models.FinancialGoal).filter(models.FinancialGoal.user_id == current_user.id, models.FinancialGoal.is_active == True).all()
    fixed = db.query(models.FixedExpense).filter(models.FixedExpense.user_id == current_user.id).all()
    return {
        "name": current_user.name,
        "email": current_user.email,
        "profile": profile,
        "goals": [{"id": str(g.id), "goal_type": g.goal_type, "target_amount": float(g.target_amount or 0), "current_amount": float(g.current_amount or 0)} for g in goals],
        "fixed_expenses": {f.category: float(f.amount) for f in fixed},
    }

@router.post("/onboarding")
def complete_onboarding(body: OnboardingPayload, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Upsert profile
    profile = db.query(models.UserProfile).filter(models.UserProfile.user_id == current_user.id).first()
    if profile:
        profile.age = body.age; profile.city = body.city; profile.employer = body.employer
        profile.salary = body.salary; profile.pay_date = body.pay_date
    else:
        db.add(models.UserProfile(user_id=current_user.id, age=body.age, city=body.city, employer=body.employer, salary=body.salary, pay_date=body.pay_date))

    # Goals
    db.query(models.FinancialGoal).filter(models.FinancialGoal.user_id == current_user.id).delete()
    for g in body.goals:
        db.add(models.FinancialGoal(user_id=current_user.id, goal_type=g))

    # Fixed expenses
    db.query(models.FixedExpense).filter(models.FixedExpense.user_id == current_user.id).delete()
    for cat, amt in body.fixed_expenses.items():
        db.add(models.FixedExpense(user_id=current_user.id, category=cat, amount=amt))

    current_user.has_completed_onboarding = True
    db.commit()
    return {"message": "Onboarding complete"}

@router.patch("/profile")
def update_profile(body: ProfileUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(models.UserProfile).filter(models.UserProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(404, "Profile not found")
    for field, val in body.dict(exclude_none=True).items():
        setattr(profile, field, val)
    db.commit()
    return {"message": "Profile updated"}
