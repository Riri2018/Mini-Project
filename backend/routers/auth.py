from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from database import get_db
import models
from auth_utils import hash_password, verify_password, create_access_token

router = APIRouter()

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/register", status_code=201)
def register(body: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == body.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    user = models.User(
        name=body.name,
        email=body.email,
        password_hash=hash_password(body.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer", "needs_onboarding": True, "user": {"id": str(user.id), "name": user.name, "email": user.email}}

@router.post("/login")
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == body.email).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer", "needs_onboarding": not user.has_completed_onboarding, "user": {"id": str(user.id), "name": user.name, "email": user.email}}

@router.get("/me")
def me(db: Session = Depends(get_db), current_user: models.User = Depends(__import__('auth_utils').get_current_user)):
    return {"id": str(current_user.id), "name": current_user.name, "email": current_user.email, "has_completed_onboarding": current_user.has_completed_onboarding}
