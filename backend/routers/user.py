from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from database import get_db
from auth_utils import get_current_user
import models

router = APIRouter()

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    city: Optional[str] = None
    employer: Optional[str] = None
    salary: Optional[float] = None
    pay_date: Optional[int] = None
    goals: Optional[List[str]] = None

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
        "age": profile.age if profile else None,
        "city": profile.city if profile else None,
        "employer": profile.employer if profile else None,
        "salary": float(profile.salary) if profile and profile.salary else 0,
        "pay_date": profile.pay_date if profile else 1,
        "goals": [g.goal_type for g in goals],
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
    
    # Update user name if provided
    if body.name is not None:
        current_user.name = body.name
    
    # Update profile fields
    for field, val in body.dict(exclude_none=True, exclude={'goals', 'name'}).items():
        setattr(profile, field, val)
    
    # Update goals if provided
    if body.goals is not None:
        # Deactivate all existing goals
        db.query(models.FinancialGoal).filter(
            models.FinancialGoal.user_id == current_user.id
        ).update({"is_active": False})
        
        # Add or reactivate goals
        for goal_type in body.goals:
            existing = db.query(models.FinancialGoal).filter(
                models.FinancialGoal.user_id == current_user.id,
                models.FinancialGoal.goal_type == goal_type
            ).first()
            if existing:
                existing.is_active = True
            else:
                db.add(models.FinancialGoal(user_id=current_user.id, goal_type=goal_type))
    
    db.commit()
    return {"message": "Profile updated"}
