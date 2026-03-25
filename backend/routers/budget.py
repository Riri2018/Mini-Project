from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from pydantic import BaseModel
from typing import Optional
from datetime import date
from database import get_db
from auth_utils import get_current_user
import models

router = APIRouter()

class TransactionCreate(BaseModel):
    category: str
    amount: float
    description: Optional[str] = None
    transaction_date: Optional[date] = None
    type: str = "expense"

class BudgetSet(BaseModel):
    month: date
    category: str
    budgeted: float

@router.get("/")
def get_budget(month: Optional[str] = None, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    today = date.today()
    m = date.fromisoformat(month) if month else date(today.year, today.month, 1)

    categories = db.query(models.BudgetCategory).filter(
        models.BudgetCategory.user_id == current_user.id,
        models.BudgetCategory.month == m,
    ).all()

    return [{"id": str(c.id), "category": c.category, "budgeted": float(c.budgeted), "spent": float(c.spent), "month": str(c.month)} for c in categories]

@router.post("/set")
def set_budget(body: BudgetSet, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.query(models.BudgetCategory).filter(
        models.BudgetCategory.user_id == current_user.id,
        models.BudgetCategory.month == body.month,
        models.BudgetCategory.category == body.category,
    ).first()
    if existing:
        existing.budgeted = body.budgeted
    else:
        db.add(models.BudgetCategory(user_id=current_user.id, month=body.month, category=body.category, budgeted=body.budgeted))
    db.commit()
    return {"message": "Budget set"}

@router.get("/transactions")
def get_transactions(month: Optional[str] = None, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    today = date.today()
    query = db.query(models.Transaction).filter(models.Transaction.user_id == current_user.id)
    if month:
        m = date.fromisoformat(month)
        query = query.filter(extract("month", models.Transaction.transaction_date) == m.month, extract("year", models.Transaction.transaction_date) == m.year)
    else:
        query = query.filter(extract("month", models.Transaction.transaction_date) == today.month, extract("year", models.Transaction.transaction_date) == today.year)
    txns = query.order_by(models.Transaction.transaction_date.desc()).all()
    return [{"id": str(t.id), "category": t.category, "amount": float(t.amount), "description": t.description, "date": str(t.transaction_date), "type": t.type} for t in txns]

@router.post("/transactions", status_code=201)
def add_transaction(body: TransactionCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    txn = models.Transaction(
        user_id=current_user.id,
        category=body.category,
        amount=body.amount,
        description=body.description,
        transaction_date=body.transaction_date or date.today(),
        type=body.type,
    )
    db.add(txn)
    # Update budget spent
    if body.type == "expense":
        today = body.transaction_date or date.today()
        month_start = date(today.year, today.month, 1)
        budget_cat = db.query(models.BudgetCategory).filter(
            models.BudgetCategory.user_id == current_user.id,
            models.BudgetCategory.month == month_start,
            models.BudgetCategory.category == body.category,
        ).first()
        if budget_cat:
            budget_cat.spent = float(budget_cat.spent) + body.amount
    db.commit()
    db.refresh(txn)
    return {"id": str(txn.id), "message": "Transaction added"}

@router.delete("/transactions/{txn_id}")
def delete_transaction(txn_id: str, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    txn = db.query(models.Transaction).filter(models.Transaction.id == txn_id, models.Transaction.user_id == current_user.id).first()
    if not txn:
        raise HTTPException(404, "Transaction not found")
    db.delete(txn)
    db.commit()
    return {"message": "Deleted"}
