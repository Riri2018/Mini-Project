from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import date
from database import get_db
from auth_utils import get_current_user
import models

router = APIRouter()

class PolicyCreate(BaseModel):
    type: str
    provider: Optional[str] = None
    cover_amount: Optional[float] = None
    premium: Optional[float] = None
    renewal_date: Optional[date] = None

@router.get("/")
def get_policies(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    policies = db.query(models.InsurancePolicy).filter(
        models.InsurancePolicy.user_id == current_user.id,
        models.InsurancePolicy.is_active == True
    ).all()
    return [{"id": str(p.id), "type": p.type, "provider": p.provider, "cover_amount": float(p.cover_amount or 0), "premium": float(p.premium or 0), "renewal_date": str(p.renewal_date) if p.renewal_date else None} for p in policies]

@router.post("/", status_code=201)
def add_policy(body: PolicyCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    policy = models.InsurancePolicy(user_id=current_user.id, **body.dict())
    db.add(policy)
    db.commit()
    db.refresh(policy)
    return {"id": str(policy.id), "message": "Policy added"}

@router.delete("/{policy_id}")
def delete_policy(policy_id: str, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    policy = db.query(models.InsurancePolicy).filter(models.InsurancePolicy.id == policy_id, models.InsurancePolicy.user_id == current_user.id).first()
    if not policy:
        raise HTTPException(404, "Policy not found")
    policy.is_active = False
    db.commit()
    return {"message": "Policy removed"}
