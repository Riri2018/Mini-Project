from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import date
from database import get_db
from auth_utils import get_current_user
import models

router = APIRouter()

@router.get("/summary")
def dashboard_summary(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    today = date.today()
    profile = db.query(models.UserProfile).filter(models.UserProfile.user_id == current_user.id).first()
    salary = float(profile.salary) if profile and profile.salary else 0

    # This month's spending
    total_spent = db.query(func.sum(models.Transaction.amount)).filter(
        models.Transaction.user_id == current_user.id,
        models.Transaction.type == "expense",
        extract("month", models.Transaction.transaction_date) == today.month,
        extract("year", models.Transaction.transaction_date) == today.year,
    ).scalar() or 0

    # Latest savings record
    latest_savings = db.query(models.SavingsRecord).filter(
        models.SavingsRecord.user_id == current_user.id
    ).order_by(models.SavingsRecord.month.desc()).first()

    # Latest credit score
    latest_credit = db.query(models.CreditScore).filter(
        models.CreditScore.user_id == current_user.id
    ).order_by(models.CreditScore.recorded_at.desc()).first()

    # Latest health score
    health = db.query(models.FinancialHealthScore).filter(
        models.FinancialHealthScore.user_id == current_user.id
    ).order_by(models.FinancialHealthScore.computed_at.desc()).first()

    # Recent transactions
    recent_txns = db.query(models.Transaction).filter(
        models.Transaction.user_id == current_user.id
    ).order_by(models.Transaction.transaction_date.desc()).limit(5).all()

    return {
        "salary": salary,
        "total_spent_this_month": float(total_spent),
        "savings_this_month": float(latest_savings.amount_saved) if latest_savings else 0,
        "credit_score": latest_credit.score if latest_credit else None,
        "health_score": {
            "overall": health.overall_score if health else 72,
            "budget": health.budget_score if health else 68,
            "savings": health.savings_score if health else 75,
            "investment": health.investment_score if health else 60,
        },
        "recent_transactions": [
            {"id": str(t.id), "category": t.category, "amount": float(t.amount), "date": str(t.transaction_date), "type": t.type, "description": t.description}
            for t in recent_txns
        ],
    }
