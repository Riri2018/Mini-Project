import uuid
from sqlalchemy import Column, String, Boolean, Integer, Numeric, Date, Text, ForeignKey, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

def gen_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)
    has_completed_onboarding = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    profile = relationship("UserProfile", back_populates="user", uselist=False)
    transactions = relationship("Transaction", back_populates="user")
    goals = relationship("FinancialGoal", back_populates="user")
    budget_categories = relationship("BudgetCategory", back_populates="user")
    savings_records = relationship("SavingsRecord", back_populates="user")
    investments = relationship("Investment", back_populates="user")
    tax_records = relationship("TaxRecord", back_populates="user")
    credit_scores = relationship("CreditScore", back_populates="user")
    insurance_policies = relationship("InsurancePolicy", back_populates="user")
    ai_insights = relationship("AIInsight", back_populates="user")
    notifications = relationship("Notification", back_populates="user")

class UserProfile(Base):
    __tablename__ = "user_profiles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    age = Column(Integer)
    city = Column(String(100))
    employer = Column(String(150))
    salary = Column(Numeric(12, 2))
    pay_date = Column(Integer)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    user = relationship("User", back_populates="profile")

class FinancialGoal(Base):
    __tablename__ = "financial_goals"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    goal_type = Column(String(50), nullable=False)
    target_amount = Column(Numeric(12, 2))
    current_amount = Column(Numeric(12, 2), default=0)
    target_date = Column(Date)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    user = relationship("User", back_populates="goals")

class FixedExpense(Base):
    __tablename__ = "fixed_expenses"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    category = Column(String(50), nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    description = Column(String(255))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

class BudgetCategory(Base):
    __tablename__ = "budget_categories"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    month = Column(Date, nullable=False)
    category = Column(String(50), nullable=False)
    budgeted = Column(Numeric(12, 2), default=0)
    spent = Column(Numeric(12, 2), default=0)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    user = relationship("User", back_populates="budget_categories")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    category = Column(String(50), nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    description = Column(String(255))
    transaction_date = Column(Date, server_default=func.current_date())
    type = Column(String(10), default="expense")
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    user = relationship("User", back_populates="transactions")

class SavingsRecord(Base):
    __tablename__ = "savings_records"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    month = Column(Date, nullable=False)
    amount_saved = Column(Numeric(12, 2), default=0)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    user = relationship("User", back_populates="savings_records")

class EmergencyFund(Base):
    __tablename__ = "emergency_fund"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    target_amount = Column(Numeric(12, 2), default=0)
    current_amount = Column(Numeric(12, 2), default=0)
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

class Investment(Base):
    __tablename__ = "investments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    type = Column(String(50), nullable=False)
    name = Column(String(150))
    invested_amount = Column(Numeric(12, 2), default=0)
    current_value = Column(Numeric(12, 2), default=0)
    risk_level = Column(String(20))
    started_at = Column(Date)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    user = relationship("User", back_populates="investments")

class RiskProfile(Base):
    __tablename__ = "risk_profiles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    risk_score = Column(Integer)
    risk_category = Column(String(20))
    assessed_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

class TaxRecord(Base):
    __tablename__ = "tax_records"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    financial_year = Column(String(10), nullable=False)
    regime = Column(String(10), nullable=False)
    gross_income = Column(Numeric(12, 2))
    total_deductions = Column(Numeric(12, 2), default=0)
    taxable_income = Column(Numeric(12, 2))
    tax_payable = Column(Numeric(12, 2))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    user = relationship("User", back_populates="tax_records")

class TaxDeduction(Base):
    __tablename__ = "tax_deductions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    financial_year = Column(String(10), nullable=False)
    section = Column(String(20), nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    description = Column(String(255))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

class CreditScore(Base):
    __tablename__ = "credit_scores"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    score = Column(Integer, nullable=False)
    recorded_at = Column(Date, server_default=func.current_date())
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    user = relationship("User", back_populates="credit_scores")

class InsurancePolicy(Base):
    __tablename__ = "insurance_policies"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    type = Column(String(30), nullable=False)
    provider = Column(String(100))
    cover_amount = Column(Numeric(12, 2))
    premium = Column(Numeric(12, 2))
    renewal_date = Column(Date)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    user = relationship("User", back_populates="insurance_policies")

class FinancialHealthScore(Base):
    __tablename__ = "financial_health_scores"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    overall_score = Column(Integer)
    budget_score = Column(Integer)
    savings_score = Column(Integer)
    investment_score = Column(Integer)
    credit_score_val = Column(Integer)
    computed_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

class AIInsight(Base):
    __tablename__ = "ai_insights"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    category = Column(String(50))
    title = Column(String(255), nullable=False)
    body = Column(Text, nullable=False)
    priority = Column(String(10), default="medium")
    is_read = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    user = relationship("User", back_populates="ai_insights")

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    type = Column(String(50), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text)
    is_read = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    user = relationship("User", back_populates="notifications")
