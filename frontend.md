# SmartSalary — Frontend Project Structure
**Stack:** React 18 + Vite + Tailwind CSS v3 + Framer Motion  
**Style:** Glassmorphism Design System  
**Backend:** Flask/FastAPI REST API

---

## Folder Structure

```
smartsalary-frontend/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── fonts/
│       ├── Syne-Variable.woff2
│       ├── DMSans-Variable.woff2
│       └── Outfit-Variable.woff2
│
├── src/
│   ├── main.jsx                        # React entry point
│   ├── App.jsx                         # Root component + Router
│   │
│   ├── assets/
│   │   ├── icons/                      # SVG icon set (lucide-react)
│   │   ├── illustrations/              # Onboarding SVG illustrations
│   │   └── noise.png                   # Noise texture overlay
│   │
│   ├── styles/
│   │   ├── index.css                   # Tailwind base + CSS variables
│   │   ├── glassmorphism.css           # Glass card utility classes
│   │   ├── animations.css             # Keyframe animations
│   │   └── typography.css             # Font-face declarations
│   │
│   ├── design-system/
│   │   ├── tokens.js                   # Design tokens (colors, spacing, etc.)
│   │   ├── glassmorphism.json          # Full design system JSON
│   │   └── tailwind.config.js          # Tailwind theme extension
│   │
│   ├── components/
│   │   │
│   │   ├── ui/                         # Base UI primitives
│   │   │   ├── GlassCard.jsx           # Base glass panel component
│   │   │   ├── GlassCardAccent.jsx     # Teal-tinted glass card
│   │   │   ├── GlassCardViolet.jsx     # Violet-tinted glass card
│   │   │   ├── Button.jsx              # Primary / Secondary / Ghost
│   │   │   ├── Badge.jsx               # Status badges (success/warn/danger)
│   │   │   ├── ProgressBar.jsx         # Animated progress bar
│   │   │   ├── Avatar.jsx              # User avatar / initials
│   │   │   ├── Tooltip.jsx             # Glassmorphism tooltip
│   │   │   ├── Modal.jsx               # Blur overlay modal
│   │   │   ├── Input.jsx               # Glass-styled input field
│   │   │   ├── Select.jsx              # Glass-styled select
│   │   │   ├── Toggle.jsx              # On/off toggle switch
│   │   │   ├── Spinner.jsx             # Loading spinner
│   │   │   └── Divider.jsx             # Subtle glass divider
│   │   │
│   │   ├── charts/                     # Recharts wrappers
│   │   │   ├── SpendingDonut.jsx       # Budget category donut chart
│   │   │   ├── SavingsLineChart.jsx    # Monthly savings trend
│   │   │   ├── ExpenseBarChart.jsx     # ML expense forecast bars
│   │   │   ├── ScoreRadarChart.jsx     # Financial health radar
│   │   │   ├── InvestmentAreaChart.jsx # Portfolio growth area chart
│   │   │   └── TaxBreakdownPie.jsx     # Tax slab breakdown pie
│   │   │
│   │   ├── layout/                     # App shell components
│   │   │   ├── AppShell.jsx            # Root layout wrapper
│   │   │   ├── Sidebar.jsx             # Collapsible glass sidebar
│   │   │   ├── TopNav.jsx              # Sticky glass navbar
│   │   │   ├── MobileNav.jsx           # Bottom nav for mobile
│   │   │   └── PageTransition.jsx      # Framer Motion page wrapper
│   │   │
│   │   └── shared/                     # Reusable feature components
│   │       ├── AIInsightCard.jsx        # AI recommendation panel
│   │       ├── StatTile.jsx             # Metric stat card
│   │       ├── SectionHeader.jsx        # Page section title + subtitle
│   │       ├── EmptyState.jsx           # Empty data state
│   │       ├── ErrorBoundary.jsx        # Error fallback UI
│   │       ├── SkeletonLoader.jsx       # Glass skeleton shimmer
│   │       └── NotificationBell.jsx     # Alert notification icon
│   │
│   ├── pages/
│   │   │
│   │   ├── auth/
│   │   │   ├── Landing.jsx             # Marketing landing page
│   │   │   ├── Login.jsx               # Sign in screen
│   │   │   ├── Register.jsx            # Sign up screen
│   │   │   └── ForgotPassword.jsx      # Password reset
│   │   │
│   │   ├── onboarding/
│   │   │   ├── OnboardingShell.jsx     # Multi-step wizard wrapper
│   │   │   ├── Step1_Profile.jsx       # Name, age, city
│   │   │   ├── Step2_Salary.jsx        # Salary, employer, pay date
│   │   │   ├── Step3_Goals.jsx         # Financial goals selection
│   │   │   ├── Step4_Expenses.jsx      # Fixed expense entry
│   │   │   └── Step5_Complete.jsx      # Success + go to dashboard
│   │   │
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx           # Main overview dashboard
│   │   │   ├── components/
│   │   │   │   ├── WelcomeBanner.jsx   # Greeting + score summary
│   │   │   │   ├── SalaryCard.jsx      # Salary breakdown tile
│   │   │   │   ├── BudgetOverview.jsx  # Quick budget progress bars
│   │   │   │   ├── AIInsightsFeed.jsx  # Top 3 AI recommendations
│   │   │   │   ├── QuickStats.jsx      # 4-tile stat row
│   │   │   │   └── RecentActivity.jsx  # Recent transactions list
│   │   │   └── index.js
│   │   │
│   │   ├── budget/
│   │   │   ├── Budget.jsx              # Budget tracker dashboard
│   │   │   ├── components/
│   │   │   │   ├── BudgetHeader.jsx    # Month selector + total
│   │   │   │   ├── CategoryCards.jsx   # Per-category glass cards
│   │   │   │   ├── SpendingDonut.jsx   # Category donut chart
│   │   │   │   ├── ExpenseList.jsx     # Itemized expense log
│   │   │   │   ├── AddExpenseModal.jsx # Add expense modal
│   │   │   │   ├── BudgetRule.jsx      # 50/30/20 rule visual
│   │   │   │   └── ForecastAlert.jsx   # ML overspend alert
│   │   │   └── index.js
│   │   │
│   │   ├── savings/
│   │   │   ├── Savings.jsx             # Savings tracker dashboard
│   │   │   ├── components/
│   │   │   │   ├── SavingsGoals.jsx    # Goal cards with progress
│   │   │   │   ├── SavingsTimeline.jsx # Monthly savings line chart
│   │   │   │   ├── EmergencyFund.jsx   # Emergency fund tracker
│   │   │   │   ├── SIPCalculator.jsx   # Interactive SIP calculator
│   │   │   │   └── GoalAddModal.jsx    # New savings goal modal
│   │   │   └── index.js
│   │   │
│   │   ├── investments/
│   │   │   ├── Investments.jsx         # Investment guidance dashboard
│   │   │   ├── components/
│   │   │   │   ├── RiskProfile.jsx     # Risk assessment result card
│   │   │   │   ├── PortfolioSplit.jsx  # Suggested allocation donut
│   │   │   │   ├── FundCards.jsx       # Recommended mutual funds
│   │   │   │   ├── GrowthProjection.jsx# Area chart: projected growth
│   │   │   │   ├── StockWatchlist.jsx  # Basic watchlist panel
│   │   │   │   └── InvestLearnCard.jsx # "What is SIP?" info cards
│   │   │   └── index.js
│   │   │
│   │   ├── tax/
│   │   │   ├── Tax.jsx                 # Tax planning dashboard
│   │   │   ├── components/
│   │   │   │   ├── TaxSlabCard.jsx     # New vs Old regime cards
│   │   │   │   ├── TaxCalculator.jsx   # Interactive tax calculator
│   │   │   │   ├── DeductionsList.jsx  # 80C, 80D, HRA deductions
│   │   │   │   ├── TaxBreakdownPie.jsx # Tax pie chart
│   │   │   │   ├── FormGuide.jsx       # ITR form selector guide
│   │   │   │   └── TaxSavingTips.jsx   # AI tax saving tips
│   │   │   └── index.js
│   │   │
│   │   ├── credit/
│   │   │   ├── Credit.jsx              # Credit score dashboard
│   │   │   ├── components/
│   │   │   │   ├── ScoreGauge.jsx      # Animated score gauge
│   │   │   │   ├── ScoreFactors.jsx    # Score factor breakdown
│   │   │   │   ├── ScoreHistory.jsx    # Score history line chart
│   │   │   │   ├── ImprovementTips.jsx # AI-powered tips list
│   │   │   │   └── CreditCardGuide.jsx # First credit card guide
│   │   │   └── index.js
│   │   │
│   │   ├── insurance/
│   │   │   ├── Insurance.jsx           # Insurance awareness dashboard
│   │   │   ├── components/
│   │   │   │   ├── InsuranceTypes.jsx  # Health/Term/Vehicle cards
│   │   │   │   ├── CoverageCheck.jsx   # Coverage adequacy checker
│   │   │   │   ├── PremiumEstimator.jsx# Premium calculator
│   │   │   │   └── InsuranceFAQ.jsx    # Common questions
│   │   │   └── index.js
│   │   │
│   │   ├── ai-advisor/
│   │   │   ├── AIAdvisor.jsx           # Full AI chat + insights page
│   │   │   ├── components/
│   │   │   │   ├── ChatInterface.jsx   # AI chat window
│   │   │   │   ├── InsightHistory.jsx  # Past recommendations log
│   │   │   │   ├── HealthScoreCard.jsx # Full ML health score detail
│   │   │   │   └── ActionItems.jsx     # Prioritized action list
│   │   │   └── index.js
│   │   │
│   │   └── profile/
│   │       ├── Profile.jsx             # User profile & settings
│   │       ├── components/
│   │       │   ├── ProfileCard.jsx     # User info card
│   │       │   ├── SalarySettings.jsx  # Edit salary details
│   │       │   ├── GoalSettings.jsx    # Manage financial goals
│   │       │   ├── Notifications.jsx   # Notification preferences
│   │       │   └── ThemeToggle.jsx     # Dark/light mode toggle
│   │       └── index.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js                  # Auth state + login/logout
│   │   ├── useDashboard.js             # Dashboard data fetching
│   │   ├── useBudget.js                # Budget CRUD operations
│   │   ├── useSavings.js               # Savings data + goals
│   │   ├── useInvestments.js           # Investment data
│   │   ├── useTax.js                   # Tax calculation logic
│   │   ├── useCredit.js                # Credit score data
│   │   ├── useAIInsights.js            # AI recommendation fetching
│   │   ├── useMLPrediction.js          # Expense forecast ML hook
│   │   └── useTheme.js                 # Theme / glass style toggle
│   │
│   ├── store/
│   │   ├── index.js                    # Zustand store root
│   │   ├── authStore.js                # Auth state slice
│   │   ├── userStore.js                # User profile slice
│   │   ├── budgetStore.js              # Budget state slice
│   │   ├── savingsStore.js             # Savings state slice
│   │   └── notificationStore.js        # Notifications slice
│   │
│   ├── services/
│   │   ├── api.js                      # Axios instance + interceptors
│   │   ├── authService.js              # Login, register, refresh
│   │   ├── dashboardService.js         # Dashboard summary API
│   │   ├── budgetService.js            # Budget CRUD API calls
│   │   ├── savingsService.js           # Savings API calls
│   │   ├── investmentService.js        # Investment API calls
│   │   ├── taxService.js               # Tax API + Govt Slab API
│   │   ├── creditService.js            # Credit score API
│   │   ├── insuranceService.js         # Insurance API calls
│   │   └── aiService.js                # AI/ML backend endpoints
│   │
│   ├── utils/
│   │   ├── formatCurrency.js           # ₹ currency formatter
│   │   ├── formatDate.js               # Indian date formatting
│   │   ├── calculateTax.js             # Tax slab logic (client-side)
│   │   ├── budgetRules.js              # 50/30/20 rule calculator
│   │   ├── scoreColor.js               # Score → color mapping
│   │   └── validators.js               # Form validation helpers
│   │
│   └── router/
│       ├── AppRouter.jsx               # React Router v6 routes
│       ├── PrivateRoute.jsx            # Auth-protected route wrapper
│       └── routes.js                   # Route constants
│
├── .env.example                        # API base URL + keys template
├── .eslintrc.js                        # ESLint config
├── .prettierrc                         # Prettier config
├── tailwind.config.js                  # Tailwind config (design tokens)
├── vite.config.js                      # Vite + path aliases
├── package.json                        # Dependencies
└── README.md                           # Setup instructions
```

---

## Route Map

| Route | Page | Auth Required |
|---|---|---|
| `/` | Landing.jsx | No |
| `/login` | Login.jsx | No |
| `/register` | Register.jsx | No |
| `/onboarding` | OnboardingShell.jsx | Yes (new user) |
| `/dashboard` | Dashboard.jsx | Yes |
| `/budget` | Budget.jsx | Yes |
| `/savings` | Savings.jsx | Yes |
| `/investments` | Investments.jsx | Yes |
| `/tax` | Tax.jsx | Yes |
| `/credit` | Credit.jsx | Yes |
| `/insurance` | Insurance.jsx | Yes |
| `/ai-advisor` | AIAdvisor.jsx | Yes |
| `/profile` | Profile.jsx | Yes |

---

## Key Dependencies

```json
{
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "react-router-dom": "^6.26.0",
  "vite": "^5.4.0",
  "tailwindcss": "^3.4.0",
  "framer-motion": "^11.0.0",
  "recharts": "^2.12.0",
  "zustand": "^4.5.0",
  "axios": "^1.7.0",
  "lucide-react": "^0.383.0",
  "@tanstack/react-query": "^5.0.0",
  "react-hook-form": "^7.52.0",
  "zod": "^3.23.0",
  "dayjs": "^1.11.0",
  "clsx": "^2.1.0"
}
```

---

## Component Count Summary

| Layer | Count |
|---|---|
| UI primitives (`/ui`) | 14 components |
| Chart wrappers (`/charts`) | 6 components |
| Layout (`/layout`) | 5 components |
| Shared (`/shared`) | 7 components |
| Page-level components | 38 components |
| Pages | 13 pages |
| Hooks | 10 hooks |
| Services | 9 services |
| **Total** | **102 files** |