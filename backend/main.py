from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, user, budget, savings, investments, tax, credit, insurance, ai_advisor, dashboard

app = FastAPI(title="SmartSalary API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,        prefix="/api/auth",        tags=["Auth"])
app.include_router(user.router,        prefix="/api/user",        tags=["User"])
app.include_router(dashboard.router,   prefix="/api/dashboard",   tags=["Dashboard"])
app.include_router(budget.router,      prefix="/api/budget",      tags=["Budget"])
app.include_router(savings.router,     prefix="/api/savings",     tags=["Savings"])
app.include_router(investments.router, prefix="/api/investments",  tags=["Investments"])
app.include_router(tax.router,         prefix="/api/tax",         tags=["Tax"])
app.include_router(credit.router,      prefix="/api/credit",      tags=["Credit"])
app.include_router(insurance.router,   prefix="/api/insurance",   tags=["Insurance"])
app.include_router(ai_advisor.router,  prefix="/api/ai",          tags=["AI Advisor"])

@app.get("/")
def root():
    return {"status": "SmartSalary API is running"}
