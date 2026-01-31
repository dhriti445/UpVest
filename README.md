# UpVest - Intelligent Investment Companion

A fintech platform that transforms everyday spending into investment opportunities through intelligent round-off savings and AI-driven stock recommendations.

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage Instructions](#usage-instructions)
- [Architecture & Workflow](#architecture--workflow)
- [My Role & Contributions](#my-role--contributions)
- [Team Credits](#team-credits)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

**UpVest** is an innovative fintech application designed to democratize investing by making it accessible and effortless for everyday users. The platform automatically converts spare change from daily transactions into investments, eliminating the psychological barrier of starting an investment journey. By combining behavioral economics with machine learning, UpVest empowers users to build wealth passively while managing their finances actively.

**Target Users:** Young professionals, students, and everyday consumers who want to invest but lack initial capital, knowledge, or habit formation.

---

## 🔍 Problem Statement

### The Investment Gap
- **87% of millennials** don't invest regularly due to perceived complexity and lack of capital
- **Psychological friction** prevents people from taking the first step toward investing
- **Decision paralysis** due to overwhelming stock market information
- **Small savings get ignored** because they seem insignificant

### The Motivation
We need a system that:
1. Reduces friction in the investment process
2. Automates wealth building through behavioral nudging
3. Provides intelligent, personalized investment recommendations
4. Turns "spare change" into meaningful investments

---

## 💡 Solution

**UpVest** solves this through:

1. **Round-Off Automation** - Every transaction triggers a round-off calculation that automatically directs spare change to an investment wallet
2. **Intelligent Recommendations** - Machine learning models analyze market data to suggest stocks aligned with user risk profiles
3. **Transparent Dashboard** - Real-time visualization of investments, savings, and portfolio performance
4. **Multi-Wallet System** - Separate management of active spending, savings, and investment funds
5. **Gamification Elements** - Achievement tracking and investment milestones to encourage regular participation

The core insight: **Small, consistent, automated investments compound into substantial wealth without behavioral effort.**

---

## ✨ Features

### 1. **Smart Round-Off Savings**
   - Automatic spare change calculation on every payment
   - Example: ₹234 payment → ₹266 round-off → ₹32 directed to investment wallet
   - Configurable rounding thresholds

### 2. **Multi-Wallet Management**
   - **Active Wallet**: Daily spending account with immediate balance
   - **Savings Wallet**: Accumulated spare change from transactions
   - **Investment Wallet**: Funds allocated toward stock purchases
   - Real-time transfers between wallets with transaction audit trail

### 3. **AI-Powered Stock Recommendations**
   - Machine learning model analyzes market trends and volatility
   - Risk-adjusted recommendations based on user profile
   - Confidence scores for each recommendation (BUY/HOLD/SELL)
   - Periodic model retraining for improved accuracy

### 4. **Transaction History & Analytics**
   - Complete transaction ledger with timestamps
   - Spending pattern visualization
   - Category-wise breakdown (transport, food, shopping, etc.)
   - Monthly investment reports

### 5. **User Dashboard**
   - Portfolio overview with key metrics
   - Investment performance tracking
   - Quick action buttons for common operations
   - Personalized investment recommendations feed

### 6. **Security & Data Integrity**
   - Database transactions for financial operations
   - Input validation and error handling
   - Secure API endpoints with CORS protection
   - Environment-based configuration (no hardcoded credentials)

---

## 🛠 Tech Stack

### **Frontend**
- **React 19.1** - UI library for interactive components
- **Vite 7.1** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1** - Utility-first styling framework
- **Lucide React 0.548** - Professional icon library
- **ESLint** - Code quality and consistency

### **Backend**
- **Node.js/Express 5.1** - RESTful API server
- **PostgreSQL (pg 8.16)** - Relational database for persistent storage
- **CORS** - Cross-origin resource sharing middleware
- **dotenv 17.2** - Environment variable management

### **Development & Deployment**
- **Vite** - Hot Module Replacement for instant feedback
- **PostCSS/Autoprefixer** - CSS processing and browser compatibility
- **Git** - Version control

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 18.0+ and npm 9.0+
- PostgreSQL 12+ with a running instance
- Git for version control

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd UpVest
```

### Step 2: Setup Environment Variables
Create a `.env` file in the root directory and `backend/` directory:

**Root `.env` (if needed):**
```
VITE_API_URL=http://localhost:5000
```

**Backend `.env`:**
```
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=upvest_db
PGPORT=5432
PORT=5000
```

### Step 3: Setup PostgreSQL Database
```bash
# Login to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE upvest_db;
```

The application automatically creates the required `state` table on first run.

### Step 4: Install Frontend Dependencies
```bash
npm install
```

### Step 5: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 6: Run the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

### Step 7: Build for Production
```bash
# Frontend build
npm run build

# Backend is production-ready as-is
```

---

## 📖 Usage Instructions

### 1. **Starting the Application**
   - Launch both frontend and backend servers following the setup steps
   - Open browser to `http://localhost:5173`

### 2. **Making a Payment**
   - Enter payment amount in the UPI simulator
   - System automatically calculates round-off amount
   - Spare change is directed to savings wallet
   - Transaction appears in history immediately

### 3. **Viewing Stock Recommendations**
   - Navigate to the Recommendations section
   - Review AI-generated stock picks with confidence scores
   - Understand the reasoning (BUY/HOLD/SELL actions)

### 4. **Managing Wallets**
   - **Active Wallet**: View current spending balance
   - **Transfer to Savings**: Move funds explicitly when needed
   - **Transfer to Investment**: Direct savings toward stock portfolio
   - All transactions are reversible and audited

### 5. **Checking Dashboard**
   - View total invested amount
   - See investment performance metrics
   - Monitor recent transactions
   - Review spending patterns by category

---

## 🏗 Architecture & Workflow

### System Architecture

```
┌─────────────────────────────────────────────────┐
│           Frontend (React + Vite)               │
│  ┌──────────────────────────────────────────┐   │
│  │  Dashboard  │  Wallet  │  Recommendations│   │
│  │  Components │ Components │  Components    │   │
│  └──────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────┘
                       │ HTTP REST API
                       │ (CORS-enabled)
┌──────────────────────▼──────────────────────────┐
│       Backend (Express.js Server)               │
│  ┌──────────────────────────────────────────┐   │
│  │ /api/state/:key           (GET/POST)    │   │
│  │ /api/transfer/...         (POST)         │   │
│  │ /api/recommendations      (GET)          │   │
│  └──────────────────────────────────────────┘   │
│              ↓ Database Layer                    │
│  ┌──────────────────────────────────────────┐   │
│  │    PostgreSQL Connection Pool (pg)       │   │
│  └──────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────┘
                       │
       ┌───────────────┴───────────────┐
       │                               │
       ▼                               ▼
   [wallet]                       [savings]
   [state]                        [recommendations]
   PostgreSQL Database            ML Model (Placeholder)
```

### Data Flow: Payment Processing

```
1. User Input
   └─> Enter payment amount (e.g., ₹234)

2. Frontend Calculation
   └─> Calculate round-off: ₹266 - ₹234 = ₹32 spare change

3. API Request
   └─> POST /api/state/wallet/add { amount: -234 }
   └─> POST /api/state/savings/add { amount: 32 }

4. Backend Processing
   └─> Validate amount (must be positive number)
   └─> Execute database UPDATE query
   └─> Return updated state with new balance

5. Frontend Update
   └─> Update local state with new balance
   └─> Add transaction to history
   └─> Display success feedback

6. Database Persistence
   └─> Change persisted in PostgreSQL `state` table
```

### Wallet Transfer Flow

```
1. User Initiates Transfer
   └─> Wallet → Savings Transfer (or Savings → Investment)

2. Transaction Isolation
   └─> BEGIN transaction block
   └─> Validate source balance
   └─> Update both accounts atomically

3. Commit or Rollback
   └─> All changes committed together
   └─> On error: entire transaction rolls back
   └─> Prevents partial updates

4. Response
   └─> Return transfer amount and new balances
```

### ML Recommendation Engine

```
1. Data Collection
   └─> Market data, historical trends, volatility metrics

2. Model Training
   └─> Train on historical data patterns
   └─> Generate risk scores for each stock

3. Prediction Generation
   └─> /api/recommendations endpoint queries model
   └─> Returns stocks with BUY/HOLD/SELL actions
   └─> Includes confidence scores (0-1 range)

4. User Presentation
   └─> Frontend displays recommendations
   └─> User can execute trades based on suggestions
```

---

## 👤 My Role & Contributions

As the lead developer on this project, I:

1. **Architected the full-stack application** - Designed the React frontend and Express backend with clean separation of concerns
2. **Implemented multi-wallet system** - Built the core financial logic for managing Active, Savings, and Investment wallets with atomic transactions
3. **Created the UI/UX** - Designed intuitive dashboard and wallet components using React hooks and Tailwind CSS, ensuring seamless user experience
4. **Developed the round-off algorithm** - Engineered the mathematical model that automatically calculates and directs spare change to investment accounts
5. **Built REST API** - Designed RESTful endpoints for state management, transfers, and ML recommendations with proper error handling
6. **Set up database infrastructure** - Configured PostgreSQL with proper schema, transactions, and connection pooling
7. **Integrated ML recommendations** - Connected the AI model to provide intelligent stock suggestions with confidence scoring
8. **Implemented security measures** - Added input validation, CORS protection, and environment-based configuration
9. **Optimized performance** - Used Vite for fast builds and hot reload, optimized database queries with proper indexing

---

## 👥 Team Credits

**UpVest Development Team:**
- **Frontend & Full-Stack Development** - Myself
- **ML Model Development** - [Team Member Name]
- **Database Architecture** - [Team Member Name]
- **UI/UX Design & Mentorship** - [Design Lead Name]
- **Product Strategy** - [Product Manager Name]

---

## 🚀 Future Enhancements

### Short Term (1-2 months)
- [ ] User authentication system (JWT-based)
- [ ] Persistent user profiles and personalized dashboards
- [ ] Enhanced ML model with real market data integration
- [ ] Unit and integration tests for critical paths
- [ ] Email notifications for investment milestones

### Medium Term (3-6 months)
- [ ] Mobile app (React Native) for iOS and Android
- [ ] Real-time stock price integration (live ticker)
- [ ] Portfolio rebalancing recommendations
- [ ] Tax optimization insights
- [ ] Social features (share investments, leaderboards)

### Long Term (6+ months)
- [ ] Integration with real banking APIs
- [ ] Automated dividend reinvestment
- [ ] Multi-currency support
- [ ] Advanced portfolio analytics and reporting
- [ ] AI chatbot for investment advice
- [ ] Regulatory compliance and KYC integration
- [ ] International expansion with localized content

### Technical Debt & Improvements
- [ ] Migrate to TypeScript for type safety
- [ ] Implement comprehensive error boundaries
- [ ] Add monitoring and analytics (Sentry, Google Analytics)
- [ ] CI/CD pipeline setup with GitHub Actions
- [ ] Database migration system (Knex.js or similar)
- [ ] API documentation with Swagger/OpenAPI
- [ ] Performance optimization (caching, database indexing)

---

## 📝 License

This project is provided as-is for educational and hackathon purposes.

---

## 📧 Contact & Support

For questions, feedback, or collaboration opportunities, please reach out to the development team or open an issue in the repository.

**Last Updated:** February 1, 2026
