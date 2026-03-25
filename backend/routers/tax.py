from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from database import get_db
from auth_utils import get_current_user
import models

router = APIRouter()

class TaxRecordCreate(BaseModel):
    financial_year: str
    regime: str
    gross_income: float
    total_deductions: float = 0

class DeductionCreate(BaseModel):
    financial_year: str
    section: str
    amount: float
    description: Optional[str] = None

def calculate_new_regime(taxable: float) -> float:
    slabs = [(300000, 0), (400000, 0.05), (300000, 0.10), (300000, 0.15), (300000, 0.20), (float('inf'), 0.30)]
    tax = 0
    remaining = taxable - 300000
    if remaining <= 0:
        return 0
    for slab, rate in slabs[1:]:
        if remaining <= 0:
            break
        taxable_in_slab = min(remaining, slab)
        tax += taxable_in_slab * rate
        remaining -= taxable_in_slab
    return tax * 1.04  # 4% cess

def calculate_old_regime(taxable: float) -> float:
    slabs = [(250000, 0), (250000, 0.05), (500000, 0.20), (float('inf'), 0.30)]
    tax = 0
    remaining = taxable
    for slab, rate in slabs:
        if remaining <= 0:
            break
        taxable_in_slab = min(remaining, slab)
        tax += taxable_in_slab * rate
        remaining -= taxable_in_slab
    return tax * 1.04

@router.get("/")
def get_tax(financial_year: Optional[str] = None, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(models.TaxRecord).filter(models.TaxRecord.user_id == current_user.id)
    if financial_year:
        query = query.filter(models.TaxRecord.financial_year == financial_year)
    records = query.order_by(models.TaxRecord.financial_year.desc()).all()
    return [{"id": str(r.id), "financial_year": r.financial_year, "regime": r.regime, "gross_income": float(r.gross_income or 0), "total_deductions": float(r.total_deductions or 0), "taxable_income": float(r.taxable_income or 0), "tax_payable": float(r.tax_payable or 0)} for r in records]

@router.post("/calculate")
def calculate_tax(body: TaxRecordCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    taxable = body.gross_income - body.total_deductions
    tax = calculate_new_regime(taxable) if body.regime == "new" else calculate_old_regime(taxable)

    existing = db.query(models.TaxRecord).filter(models.TaxRecord.user_id == current_user.id, models.TaxRecord.financial_year == body.financial_year).first()
    if existing:
        existing.regime = body.regime; existing.gross_income = body.gross_income
        existing.total_deductions = body.total_deductions; existing.taxable_income = taxable; existing.tax_payable = tax
    else:
        db.add(models.TaxRecord(user_id=current_user.id, financial_year=body.financial_year, regime=body.regime, gross_income=body.gross_income, total_deductions=body.total_deductions, taxable_income=taxable, tax_payable=tax))
    db.commit()
    return {"gross_income": body.gross_income, "total_deductions": body.total_deductions, "taxable_income": taxable, "tax_payable": round(tax, 2), "regime": body.regime}

@router.post("/deductions", status_code=201)
def add_deduction(body: DeductionCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    ded = models.TaxDeduction(user_id=current_user.id, **body.dict())
    db.add(ded)
    db.commit()
    return {"message": "Deduction added"}

@router.get("/deductions")
def get_deductions(financial_year: Optional[str] = None, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(models.TaxDeduction).filter(models.TaxDeduction.user_id == current_user.id)
    if financial_year:
        query = query.filter(models.TaxDeduction.financial_year == financial_year)
    deds = query.all()
    return [{"id": str(d.id), "section": d.section, "amount": float(d.amount), "description": d.description, "financial_year": d.financial_year} for d in deds]
