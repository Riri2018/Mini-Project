import os
import httpx
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from database import get_db
from auth_utils import get_current_user
import models

router = APIRouter()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "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")
MODEL = "qwen/qwen-2-7b-instruct:free"

SYSTEM_PROMPT = """You are SmartSalary AI, a personal finance advisor exclusively for Indian salaried professionals.

Your ONLY purpose is to help users with:
- Budgeting and expense management (50/30/20 rule, category-wise spending)
- Savings strategies (emergency fund, SIP, recurring deposits)
- Investments (mutual funds, index funds, stocks, FD, PPF, NPS, ELSS)
- Tax planning (Old vs New regime, 80C, 80D, HRA, ITR filing)
- Credit score improvement (CIBIL, credit utilization, EMI management)
- Insurance planning (health, term, vehicle coverage)
- Salary optimization (CTC vs in-hand, allowances, reimbursements)
- Financial goal planning (house, car, travel, retirement)
- Debt management (loans, credit cards, EMIs)

STRICT RULES:
1. If a user asks anything NOT related to personal finance, money, or financial planning, respond ONLY with: "I'm your dedicated finance advisor. I can only help with financial topics like budgeting, savings, investments, tax, credit, and insurance. What financial question can I help you with?"
2. Always give specific, actionable advice with Indian context (₹, Indian tax laws, SEBI regulations).
3. Keep responses concise — max 4-5 sentences or a short numbered list.
4. Never give generic filler answers. Be direct and data-driven.
5. When the user shares their financial data, use it to personalize advice."""

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

@router.post("/chat")
async def chat(body: ChatRequest, db: Session = Depends(get_db)):
    # Mock user for demo (remove this and use get_current_user in production)
    mock_user_id = "00000000-0000-0000-0000-000000000001"
    
    # Try to get real user, fallback to mock
    user = db.query(models.User).filter(models.User.id == mock_user_id).first()
    if not user:
        # Create mock user if doesn't exist
        user = models.User(
            id=mock_user_id,
            email="demo@smartsalary.app",
            password_hash="mock",
            name="Demo User",
            has_completed_onboarding=True
        )
        db.add(user)
        profile = models.UserProfile(
            user_id=mock_user_id,
            age=23,
            city="Mumbai",
            employer="TechCorp India",
            salary=45000,
            pay_date=1
        )
        db.add(profile)
        db.commit()
        db.refresh(user)
    # Build user context from DB
    profile = db.query(models.UserProfile).filter(models.UserProfile.user_id == user.id).first()
    fixed = db.query(models.FixedExpense).filter(models.FixedExpense.user_id == user.id).all()
    goals = db.query(models.FinancialGoal).filter(models.FinancialGoal.user_id == user.id, models.FinancialGoal.is_active == True).all()
    latest_credit = db.query(models.CreditScore).filter(models.CreditScore.user_id == user.id).order_by(models.CreditScore.recorded_at.desc()).first()

    context_parts = [f"User: {user.name}"]
    if profile:
        context_parts.append(f"Salary: ₹{int(profile.salary or 0):,}/month, Age: {profile.age}, City: {profile.city}, Employer: {profile.employer}")
    if fixed:
        expenses_str = ", ".join([f"{f.category} ₹{int(f.amount):,}" for f in fixed])
        context_parts.append(f"Fixed expenses: {expenses_str}")
    if goals:
        goals_str = ", ".join([g.goal_type for g in goals])
        context_parts.append(f"Financial goals: {goals_str}")
    if latest_credit:
        context_parts.append(f"CIBIL score: {latest_credit.score}")

    context_message = {"role": "system", "content": " | ".join(context_parts)}

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            context_message,
            *[{"role": m.role, "content": m.content} for m in body.messages],
        ],
        "max_tokens": 400,
        "temperature": 0.4,
    }

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://smartsalary.app",
                "X-Title": "SmartSalary AI Advisor",
            },
            json=payload,
        )

    if resp.status_code != 200:
        raise HTTPException(502, f"AI service error: {resp.text}")

    reply = resp.json()["choices"][0]["message"]["content"].strip()

    # Persist insight to DB
    db.add(models.AIInsight(
        user_id=user.id,
        category="chat",
        title=body.messages[-1].content[:100],
        body=reply,
        priority="medium",
    ))
    db.commit()

    return {"reply": reply}

@router.get("/insights")
def get_insights(db: Session = Depends(get_db)):
    # Mock user for demo
    mock_user_id = "00000000-0000-0000-0000-000000000001"
    insights = db.query(models.AIInsight).filter(
        models.AIInsight.user_id == mock_user_id
    ).order_by(models.AIInsight.created_at.desc()).limit(20).all()
    return [{"id": str(i.id), "category": i.category, "title": i.title, "body": i.body, "priority": i.priority, "is_read": i.is_read, "created_at": str(i.created_at)} for i in insights]

@router.patch("/insights/{insight_id}/read")
def mark_read(insight_id: str, db: Session = Depends(get_db)):
    # Mock user for demo
    mock_user_id = "00000000-0000-0000-0000-000000000001"
    insight = db.query(models.AIInsight).filter(models.AIInsight.id == insight_id, models.AIInsight.user_id == mock_user_id).first()
    if not insight:
        raise HTTPException(404, "Insight not found")
    insight.is_read = True
    db.commit()
    return {"message": "Marked as read"}
