# 💰 UpVest - Intelligent Investment Companion

> **Hackathon Project:** Automated Wealth Building Through Spare Change & AI-Powered Recommendations

---

## 🎯 Problem Statement

Young professionals and everyday consumers struggle to invest due to:

- 📉 **Lack of initial capital** and investment knowledge
- 🚧 **Psychological friction** of taking the first investment step
- 😵 **Decision paralysis** from overwhelming market information
- 💸 **Small savings ignored** because they seem insignificant (₹50 here, ₹100 there adds up!)

---

## 💡 Solution

**UpVest** - An automated investment platform that transforms everyday spending into wealth building through intelligent round-off savings and AI-driven stock recommendations, enabling passive wealth accumulation.

---

## 🚀 Key Features

### ✨ Smart Wealth Building
- **Round-Off Automation**: Pay ₹234 → Automatic ₹266 round-off → ₹32 invested instantly
- **Multi-Wallet System**: Active Wallet (spending) → Savings Wallet → Investment Wallet  
- **Atomic Transactions**: Safe fund transfers with rollback protection
- **Zero Friction**: No manual intervention required

### 🤖 AI & Analytics
- **Smart Recommendations**: ML model suggests BUY/HOLD/SELL stocks with confidence scores
- **Real-Time Analytics**: Spending patterns, category breakdown, investment performance
- **Transaction History**: Complete audit trail with timestamps and categorization
- **Portfolio Insights**: View total invested, performance metrics, and growth trends

### 💳 User Experience
- **Intuitive Dashboard**: Portfolio overview with key metrics at a glance
- **Transaction Tracking**: Monitor every payment and investment movement
- **Quick Actions**: Transfer funds, view recommendations, check balance
- **Category Insights**: Understand spending by transport, food, shopping, etc.

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%">

### Backend
- **Express.js 5.1** - RESTful API server
- **Node.js** - JavaScript runtime
- **PostgreSQL (pg 8.16)** - Relational database
- **CORS** - Cross-origin resource sharing

### Database & Storage
- **PostgreSQL** - Persistent wallet state
- **Connection Pooling** - Optimized performance

</td>
<td width="50%">

### Frontend
- **React 19.1** - Interactive UI components
- **Vite 7.1** - Lightning-fast build tool
- **Tailwind CSS 4.1** - Utility-first styling
- **Lucide React 0.548** - Professional icons
- **ESLint** - Code quality

### AI & ML
- **Python ML Model** - Stock recommendations
- **Confidence Scoring** - Risk-adjusted suggestions

</td>
</tr>
</table>
---

## 📁 Project Structure

```
UpVest/
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── Dashboard.jsx          # 📊 Portfolio overview
│   │   │   └── Wallet.jsx             # 💳 Wallet management UI
│   │   ├── 📂 assets/                 # 🖼️ Static images & icons
│   │   ├── App.jsx                    # 🎯 Main app component
│   │   ├── App.css                    # 🎨 Styling
│   │   ├── main.jsx                   # ⚡ React entry point
│   │   └── index.css                  # 🌐 Global styles
│   ├── 📂 public/                     # 📦 Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── 📂 backend/
│   ├── server.js                      # 🚀 Express API server
│   ├── db.js                          # 🗄️ PostgreSQL connection
│   ├── package.json
│   ├── .env.example                   # 📋 Environment template
│   └── .env                           # 🔑 Database credentials
│
├── vite.config.js                     # ⚙️ Vite config
├── eslint.config.js                   # ✅ ESLint rules
├── package.json                       # 📦 Dependencies
├── .gitignore
└── README.md                          # 📖 This file
```

---

## 🎬 Demo Flow

### Scenario: Daily Investment Journey

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                   ┃
┃  💳 User Payment: "I paid ₹234 for coffee"       ┃
┃                          ↓                        ┃
┃  🔄 Round-Off Calculation: ₹266 - ₹234 = ₹32   ┃
┃                          ↓                        ┃
┃  💰 Automatic Routing:                           ┃
┃     ✓ ₹234 deducted from Active Wallet           ┃
┃     ✓ ₹32 added to Savings Wallet                ┃
┃                          ↓                        ┃
┃  📝 Transaction Recorded: Logged with timestamp  ┃
┃                          ↓                        ┃
┃  🤖 AI Analysis: ML model scans market trends   ┃
┃                          ↓                        ┃
┃  ⭐ Recommendations Generated:                   ┃
┃     • AAPL (95% confidence) - BUY                ┃
┃     • MSFT (88% confidence) - HOLD               ┃
┃     • GOOGL (75% confidence) - SELL              ┃
┃                          ↓                        ┃
┃  📊 User Action: Transfer ₹32 Savings →         ┃
┃     Investment Wallet                            ┃
┃                          ↓                        ┃
┃  📈 Portfolio Update:                            ┃
┃     • Dashboard shows +₹32 invested              ┃
┃     • Total this month: ₹1,240                   ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Business Dashboard Insights

```
✓ 5 users invested today via round-offs
✓ Average round-off per transaction: ₹28
✓ Top recommendation: AAPL (30 users buying)
✓ Revenue generated: ₹1,240 invested today
```
---

## 🚦 Getting Started

### Prerequisites

```
✓ Node.js 18.0+ and npm 9.0+
✓ PostgreSQL 12+ running locally
✓ Git
```

### Clone the Repository

```bash
git clone <repository-url>
cd UpVest
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Add your database credentials
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Database Setup

```bash
psql -U postgres
CREATE DATABASE upvest_db;
```

> ℹ️ The app automatically creates the `state` table on first run.

### Running the Application

**Terminal 1 - Backend** (http://localhost:5000):
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend** (http://localhost:5173):
```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
# Database Configuration
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=upvest_db
PGPORT=5432

# Server
PORT=5000
NODE_ENV=development
```

---

## 🏆 Hackathon Winning Features

| # | Feature | Why It Matters |
|---|---------|----------------|
| 1️⃣ | **Behavioral Economics at Scale** | Automates wealth building without user effort - the real innovation |
| 2️⃣ | **Multi-Wallet Architecture** | Smart financial isolation: spending, savings, investment wallets |
| 3️⃣ | **Atomic Transactions** | Database-level safety - no partial transfers |
| 4️⃣ | **Real-Time Dashboard** | Live portfolio metrics, spending analysis, recommendations |
| 5️⃣ | **ML-Powered Insights** | Confidence-scored stock recommendations with buy/hold/sell |
| 6️⃣ | **Zero Friction UX** | Simple interface that gets out of the way |

---

## 📊 Demo Metrics

### User Base
- ✅ 5+ User profiles with realistic transaction history
- ✅ ₹5,000+ in active wallets across test accounts

### Transaction Data
- ✅ 200+ Sample transactions with category tags
- ✅ Real-time balance updates across all wallet types

### Investment Activity
- ✅ ₹1,240 total invested via round-offs this month
- ✅ Average round-off per transaction: ₹28
- ✅ Top recommendation: AAPL (95% confidence)

### Portfolio Performance
- ✅ Total portfolio value tracking
- ✅ Monthly investment trend analysis
- ✅ Stock recommendation accuracy metrics

---

## 🏅 Competitive Advantages

- 🎯 **Not Just a Chatbot** — Full financial OS with multi-wallet system
- 🤖 **Behavioral Nudging** — Makes investing effortless through automation
- 🔐 **Database-Safe Transactions** — Atomic operations with rollback protection
- ⚡ **Real-Time Sync** — Instant balance updates across components
- 📈 **Data-Driven Insights** — ML recommendations with confidence scoring
- 📦 **Scalable Architecture** — Modular design ready for production scale

---

## 🚀 Future Enhancements

### Phase 1 (1-2 months)
- [ ] User authentication & persistent profiles
- [ ] Email notifications for milestones
- [ ] Enhanced ML model with real market data
- [ ] Unit & integration tests
- [ ] Spending category management

### Phase 2 (3-6 months)
- [ ] Mobile app (React Native)
- [ ] Real-time stock ticker integration
- [ ] Portfolio rebalancing recommendations
- [ ] Social features (share investments, leaderboards)
- [ ] Advanced analytics dashboard

### Phase 3 (6+ months)
- [ ] Real banking API integration
- [ ] Automated dividend reinvestment
- [ ] Multi-currency support
- [ ] Tax optimization insights
- [ ] AI chatbot for investment advice
- [ ] KYC & regulatory compliance
- [ ] International expansion

### Technical Improvements
- [ ] TypeScript migration for type safety
- [ ] Comprehensive error boundaries
- [ ] Monitoring & analytics (Sentry, Google Analytics)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Advanced caching strategies

---

<div align="center">



**Made with ❤️ for all**

</div>
