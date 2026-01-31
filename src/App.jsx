import React, { useState, useEffect } from 'react';
import {
  QrCode, Send, User, Clock, Award, MoveRight, ArrowLeft, Wallet, Shield, CheckCircle2, X,
  LayoutDashboard, History, Settings, LogOut, ArrowUpRight, Plus, Coffee, ShoppingCart, Car, TrendingUp,
  Gift, Laptop, PiggyBank,
  PieChart, Zap, IndianRupee, HandHeart, BrainCircuit, BookOpen, ShieldCheck, Target, Users, Code, Layers, Database, Bot, Cloud, Mail, Lock,
  Bell, Sun, Moon, Banknote, Save, HelpCircle,
  // New Icons for the light dashboard
  Newspaper, Lightbulb, Sparkles, MessageSquare, SendHorizonal, BarChart3, Receipt, Flame, ExternalLink
} from 'lucide-react';

// --- Main App Component ---
export default function App() {
  // Global App State
  const [currentPage, setCurrentPage] = useState('upiHome');
  const [userName] = useState('Diya R. Gowda');
  const [walletBalance, setWalletBalance] = useState(356.00);
  const [spareChangeBalance, setSpareChangeBalance] = useState(12.50);
  const [bankBalance, setBankBalance] = useState(5000);
  const [investmentModal, setInvestmentModal] = useState({ show: false, stock: null });
  const [totalInvested, setTotalInvested] = useState(250.00); // Track total investments
  
  // State for payment flow
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [roundOffAmount, setRoundOffAmount] = useState(0);

  // --- Global transactions state ---
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Auto Rickshaw', amount: '-₹117', date: 'Today, 10:30 AM', icon: Car, type: 'debit' },
    { id: 2, name: 'Coffee Shop', amount: '-₹230', date: 'Yesterday, 9:15 AM', icon: Coffee, type: 'debit' },
    { id: 3, name: 'Cashback', amount: '+₹5', date: 'Oct 24, 2025', icon: Award, type: 'credit' },
  ]);

  // --- Function to add a transaction ---
  const addTransaction = (paymentAmt) => {
    const newTransaction = {
      id: transactions.length + 1,
      name: 'Merchant Payment', // You could customize this more
      amount: `-₹${paymentAmt.toFixed(2)}`,
      date: new Date().toLocaleString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true }),
      icon: ShoppingCart, // Using a generic icon for new payments
      type: 'debit'
    };
    // Adds the new transaction to the top of the list
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const navigateTo = (page) => setCurrentPage(page);

  // Function to add round-off amount to both wallets
  const addRoundOffToWallets = (roundOff) => {
    setWalletBalance(prev => prev + roundOff);
    setSpareChangeBalance(prev => prev + roundOff);
  };

  // Function to handle investment
  const handleInvestment = (stock) => {
    if (walletBalance > 0) {
      setInvestmentModal({ show: true, stock });
    } else {
      alert("No savings available to invest!");
    }
  };

  // Function to confirm investment
  const confirmInvestment = () => {
    if (investmentModal.stock && walletBalance > 0) {
      const investedAmount = walletBalance;
      setTotalInvested(prev => prev + investedAmount);
      setWalletBalance(0);
      setInvestmentModal({ show: false, stock: null });
      alert(`Successfully invested ₹${investedAmount.toFixed(2)} in ${investmentModal.stock.name}!`);
    }
  };

  // This router controls the entire app
  switch (currentPage) {
    case 'upiHome':
      return <div className="dark"><UpiHomePage 
                navigateTo={navigateTo} 
                setPaymentAmount={setPaymentAmount} 
                setRoundOffAmount={setRoundOffAmount}
                transactions={transactions} // Pass transactions down
              /></div>;
    case 'payment':
      return <div className="dark"><PaymentPage navigateTo={navigateTo} paymentAmount={paymentAmount} roundOffAmount={roundOffAmount} /></div>;
    case 'pin':
      return <div className="dark"><PinPage 
                navigateTo={navigateTo} 
                paymentAmount={paymentAmount} 
                roundOffAmount={roundOffAmount}
                bankBalance={bankBalance}
                addRoundOffToWallets={addRoundOffToWallets}
                addTransaction={addTransaction} // Pass addTransaction down
              /></div>;
    case 'paymentSuccess':
      return <div className="dark"><PaymentSuccessPage navigateTo={navigateTo} paymentAmount={paymentAmount} roundOffAmount={roundOffAmount} /></div>;
    case 'dashboard':
      return (
        <>
          <DashboardPage 
            userName={userName} 
            navigateTo={navigateTo} 
            walletBalance={walletBalance}
            spareChangeBalance={spareChangeBalance}
            totalInvested={totalInvested}
            setSpareChangeBalance={setSpareChangeBalance}
            onInvest={handleInvestment}
          />
          <InvestmentModal
            show={investmentModal.show}
            onClose={() => setInvestmentModal({ show: false, stock: null })}
            onConfirm={confirmInvestment}
            stock={investmentModal.stock}
            walletBalance={walletBalance}
          />
        </>
      );
    default:
      return <div className="dark"><UpiHomePage 
                navigateTo={navigateTo} 
                transactions={transactions} 
              /></div>;
  }
}

// --- Investment Modal Component ---
function InvestmentModal({ show, onClose, onConfirm, stock, walletBalance }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Confirm Investment</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {stock && (
          <div className="mb-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">{stock.name}</h3>
              <p className="text-sm text-emerald-700">{stock.ticker}</p>
              <p className="text-xs text-emerald-600 mt-1">{stock.desc}</p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-700">Available Savings:</span>
                <span className="text-lg font-bold text-slate-900">₹{walletBalance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Risk Level:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  stock.risk === 'Low' ? 'bg-green-100 text-green-800' :
                  stock.risk === 'Low-Medium' ? 'bg-yellow-100 text-yellow-800' :
                  stock.risk === 'Medium' ? 'bg-orange-100 text-orange-800' :
                  stock.risk === 'High' ? 'bg-red-100 text-red-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {stock.risk}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-slate-700">Expected Returns:</span>
                <span className="text-lg font-bold text-emerald-600">{stock.returns}</span>
              </div>
            </div>
          </div>
        )}

        <p className="text-slate-600 mb-6 text-center">
          Do you want to invest all your savings in this stock?
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-200 text-slate-700 font-semibold py-3 rounded-lg hover:bg-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-emerald-600 text-blue font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Invest ₹{walletBalance.toFixed(2)}
          </button>
        </div>

        <p className="text-xs text-slate-500 text-center mt-4">
          Your savings balance will be reset to ₹0 after investment
        </p>
      </div>
    </div>
  );
}

// --- 1. UPI Home Page ---
function UpiHomePage({ navigateTo, setPaymentAmount, setRoundOffAmount, transactions }) {
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [inputAmount, setInputAmount] = useState('');

  const handlePayWithInput = () => {
    if (inputAmount && !isNaN(inputAmount) && parseFloat(inputAmount) > 0) {
      const paymentAmt = parseFloat(inputAmount);

      // --- UPDATED: Round-off logic now rounds to nearest ₹5 ---
      const roundOff = (Math.ceil(paymentAmt / 5) * 5) - paymentAmt;
      // Handle potential floating point inaccuracies (e.g., 2.999... -> 3)
      const finalRoundOff = parseFloat(roundOff.toFixed(2)); 

      setPaymentAmount(paymentAmt);
      setRoundOffAmount(finalRoundOff);
      setShowAmountInput(false);
      setInputAmount('');
      navigateTo('payment');
    } else {
      alert("Please enter a valid payment amount");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-900 text-blue font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          <User className="h-10 w-10 bg-gray-700 text-gray-400 rounded-full p-2" />
          <div>
            <p className="text-sm text-gray-400">Welcome Back</p>
            <h1 className="text-lg font-bold text-blue">Diya R. Gowda</h1>
          </div>
        </div>
        <button 
          onClick={() => navigateTo('dashboard')}
          className="relative p-2 bg-gray-800 rounded-full hover:bg-gray-700"
        >
          <Wallet className="h-6 w-6 text-green-400" />
        </button>
      </header>

      {/* Payment Options */}
      <section className="grid grid-cols-4 gap-4 p-4 text-center">
        <PaymentIcon icon={QrCode} label="Scan QR" />
        <PaymentIcon icon={Send} label="Pay Number" onClick={() => setShowAmountInput(true)} />
        <PaymentIcon icon={Wallet} label="Pay UPI ID" />
        <PaymentIcon icon={Banknote} label="Bank Transfer" />
      </section>

      {/* Amount Input Modal */}
      {showAmountInput && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Enter Payment Amount</h3>
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="Enter amount in ₹"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-blue mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowAmountInput(false);
                  setInputAmount('');
                }}
                className="flex-1 bg-gray-700 text-blue py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayWithInput}
                className="flex-1 bg-green-500 text-gray-900 font-bold py-3 rounded-lg hover:bg-green-400 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rewards */}
      <section className="p-4">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-lg flex justify-between items-center shadow-lg">
          <div>
            <p className="text-lg font-bold text-gray-900">Cashbacks & Rewards</p>
            <p className="text-sm text-gray-800">You've won ₹5 in cashback!</p>
          </div>
          <Award className="h-10 w-10 text-gray-900" />
        </div>
      </section>

      {/* Transaction History */}
      <section className="flex-1 p-4 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <ul className="space-y-4">
          {transactions.map((tx) => {
            const Icon = tx.icon;
            const isCredit = tx.type === 'credit';
            return (
              <li key={tx.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800 p-3 rounded-full">
                    <Icon className="h-5 w-5 text-gray-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue">{tx.name}</p>
                    <p className="text-sm text-gray-400">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${isCredit ? 'text-green-400' : 'text-blue'}`}>
                  {tx.amount}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

// --- 2. PaymentIcon Component ---
function PaymentIcon({ icon: Icon, label, onClick = () => {} }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-800 transition-colors">
      <div className="bg-green-500 text-gray-900 p-4 rounded-full">
        <Icon className="h-6 w-6" />
      </div>
      <span className="mt-2 text-xs font-medium text-gray-300">{label}</span>
    </button>
  );
}

// --- 3. Payment Page ---
function PaymentPage({ navigateTo, paymentAmount, roundOffAmount }) {
  const totalDeduction = paymentAmount + roundOffAmount;

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-900 text-blue">
      <header className="p-4 flex items-center">
        <button onClick={() => navigateTo('upiHome')} className="p-2">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold mx-auto">Confirm Payment</h1>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-gray-400">Paying to Merchant</p>
        <p className="text-7xl font-bold text-blue my-4">₹{paymentAmount.toFixed(2)}</p>
        <div className="bg-green-900/50 border border-green-500 text-green-300 p-4 rounded-lg">
          <p className="font-semibold">You can save ₹{roundOffAmount.toFixed(2)}!</p>
          <p className="text-sm">We'll round this up to ₹{totalDeduction.toFixed(2)} and add ₹{roundOffAmount.toFixed(2)} to your UpVest wallet.</p>
        </div>
      </div>
      <div className="p-4">
        <button 
          onClick={() => navigateTo('pin')}
          className="w-full bg-green-500 text-gray-900 font-bold py-4 rounded-lg hover:bg-green-400 transition-colors"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}

// --- 4. PIN Page ---
function PinPage({ navigateTo, paymentAmount, roundOffAmount, bankBalance, addRoundOffToWallets, addTransaction }) {
  const [pin, setPin] = useState('');
  const totalDeduction = paymentAmount + roundOffAmount;
  
  const handlePayment = () => {
    if (bankBalance < totalDeduction) {
      alert("Mock Error: Insufficient balance. Must have at least ₹100 more than payment amount.");
      return;
    }
    // --- Add round-off AND add the transaction to the list ---
    addRoundOffToWallets(roundOffAmount);
    addTransaction(paymentAmount); 
    
    navigateTo('paymentSuccess');
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-900 text-blue">
      <header className="p-4 flex items-center">
        <button onClick={() => navigateTo('payment')} className="p-2">
          <ArrowLeft className="h-6 w-6" />
        </button>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <Shield className="h-16 w-16 text-green-400 mb-6" />
        <h2 className="text-2xl font-semibold text-blue mb-2">Enter UPI PIN</h2>
        <p className="text-gray-400">to pay ₹{paymentAmount.toFixed(2)}</p>
        <input
          type="password"
          maxLength="6"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-32 bg-gray-800 border-b-2 border-green-500 text-center text-4xl tracking-[.5em] mt-8 text-blue focus:outline-none"
          placeholder="••••"
        />
      </div>
      <div className="p-4">
        <button 
          onClick={handlePayment}
          disabled={pin.length < 4}
          className="w-full bg-green-500 text-gray-900 font-bold py-4 rounded-lg transition-colors disabled:bg-gray-600"
        >
          Pay
        </button>
      </div>
    </div>
  );
}

// --- 5. Payment Success Page ---
function PaymentSuccessPage({ navigateTo, paymentAmount, roundOffAmount }) {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-900 text-blue">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="h-24 w-24 text-green-500 mb-8" />
        <h1 className="text-3xl font-bold text-blue mb-2">Payment Successful!</h1>
        <p className="text-5xl font-semibold text-blue mb-6">₹{paymentAmount.toFixed(2)}</p>
        <p className="text-lg text-green-400 font-semibold">
          + ₹{roundOffAmount.toFixed(2)} saved to your UpVest Wallet!
        </p>
      </div>
      <div className="p-4">
        <button 
          onClick={() => navigateTo('upiHome')}
          className="w-full bg-green-500 text-gray-900 font-bold py-4 rounded-lg hover:bg-green-400 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// --- 6. Dashboard Page ---
// --- UPDATED: 'learn' case now points to 'LearnMcqPage' ---
function DashboardPage({ userName, navigateTo, walletBalance, spareChangeBalance, totalInvested, setSpareChangeBalance, onInvest }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHomeContent 
                  userName={userName} 
                  walletBalance={walletBalance}
                  spareChangeBalance={spareChangeBalance}
                  totalInvested={totalInvested}
                  setSpareChangeBalance={setSpareChangeBalance}
                  onInvest={onInvest}
                />;
      case 'news':
        return <NewsPage />;
      case 'learn':
        return <LearnMcqPage />; // <-- UPDATED LINE
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardHomeContent 
                  userName={userName} 
                  walletBalance={walletBalance}
                  spareChangeBalance={spareChangeBalance}
                  totalInvested={totalInvested}
                  setSpareChangeBalance={setSpareChangeBalance}
                  onInvest={onInvest}
                />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      <LightSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={() => navigateTo('upiHome')}
        userName={userName}
      />
      <main className="flex-1 overflow-auto p-6 md:p-10">
        {renderContent()}
      </main>
    </div>
  );
}

// --- 7. LightSidebar Component ---
// --- UPDATED: Added "Learn" back ---
function LightSidebar({ activeTab, onTabChange, onLogout, userName }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'learn', label: 'Learn', icon: Lightbulb }, // <-- UPDATED LINE
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="w-64 bg-white p-6 flex-col flex-shrink-0 h-full hidden md:flex border-r border-slate-200">
      <div className="flex items-center space-x-3 mb-10">
        <div className="bg-emerald-600 p-2 rounded-lg">
          <Wallet className="h-6 w-6 text-blue" />
        </div>
        <span className="text-xl font-bold text-slate-900">UpVest</span>
      </div>

      <div className="flex-1 flex flex-col justify-between overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-6">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Back to UPI Home</span>
          </button>
          <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-slate-200">
            <User className="h-8 w-8 bg-slate-200 text-slate-500 rounded-full p-1" />
            <div>
              <p className="text-sm font-semibold text-slate-900">{userName}</p>
              <p className="text-xs text-slate-500">View Profile</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// --- 8. DashboardHomeContent Component ---
function DashboardHomeContent({ userName, walletBalance, spareChangeBalance, totalInvested, setSpareChangeBalance, onInvest }) {
  const [activeTab, setActiveTab] = useState('savings');

  const handleEndOfDayTransfer = () => {
    if (spareChangeBalance > 0) {
      alert(`₹${spareChangeBalance.toFixed(2)} transferred from Spare Change to Total Savings!`);
      setSpareChangeBalance(0);
    } else {
      alert("No spare change to transfer!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Dashboard</h1>
          <p className="text-slate-600">Track your spare-change savings and investments</p>
        </div>
        <button 
          onClick={handleEndOfDayTransfer}
          className="bg-white text-emerald-700 font-semibold py-2 px-4 rounded-lg border border-emerald-300 hover:bg-emerald-50 transition-colors shadow-sm"
        >
          Simulate End-of-Day Transfer
        </button>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <TopStatCard
          title="Spare Change Wallet"
          amount={spareChangeBalance}
          desc="Resets at end of day"
          icon={Receipt}
          iconColor="text-blue-500"
          bgColor="bg-blue-50"
        />
        <TopStatCard
          title="Total Savings"
          amount={walletBalance}
          desc="Progress to threshold"
          icon={Database}
          iconColor="text-emerald-500"
          bgColor="bg-emerald-50"
          hasProgress
          progress={(walletBalance / 500) * 100}
        />
        <TopStatCard
          title="Total Invested"
          amount={totalInvested}
          desc="Across all portfolios"
          icon={BarChart3}
          iconColor="text-purple-500"
          bgColor="bg-purple-50"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GamificationCard />
          
          {/* Tabs */}
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-6">
              <button
                onClick={() => setActiveTab('savings')}
                className={`py-3 px-1 font-semibold ${
                  activeTab === 'savings'
                    ? 'border-b-2 border-emerald-600 text-emerald-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Savings
              </button>
              <button
                onClick={() => setActiveTab('wallet')}
                className={`py-3 px-1 font-semibold ${
                  activeTab === 'wallet'
                    ? 'border-b-2 border-emerald-600 text-emerald-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Wallet
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'savings' && (
            <div className="space-y-6">
              <AiSmartInsights spareChangeBalance={spareChangeBalance} walletBalance={walletBalance} />
              <AiStockRecommendations onInvest={onInvest} />
            </div>
          )}
          {activeTab === 'wallet' && (
            <PlaceholderPage title="Wallet" icon={Wallet} />
          )}
        </div>

        {/* Right Side (AI Chat) */}
        <div className="lg:col-span-1">
          <AiInvestmentAdvisorChat />
        </div>
      </div>
    </div>
  );
}

// --- 9. TopStatCard Component ---
function TopStatCard({ title, amount, desc, icon: Icon, iconColor, bgColor, hasProgress, progress }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900">₹{amount.toFixed(2)}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
      <p className="text-sm text-slate-500">{desc}</p>
      {hasProgress && (
        <div className="mt-2">
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 10. GamificationCard Component ---
function GamificationCard() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="bg-orange-100 p-3 rounded-full">
          <Flame className="h-6 w-6 text-orange-500" />
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-900">8 Day Streak</p>
          <p className="text-sm text-slate-500">Keep it going!</p>
        </div>
      </div>
      <div className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold">
        Level 3 Saver
      </div>
    </div>
  );
}

// --- 11. AiSmartInsights Component ---
function AiSmartInsights({ spareChangeBalance, walletBalance }) {
  const dailyAverage = spareChangeBalance > 0 ? (spareChangeBalance / 7).toFixed(2) : "2.18";
  const yearEndProjection = spareChangeBalance > 0 ? (spareChangeBalance * 52).toFixed(2) : "143.79";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center space-x-3 mb-4">
        <Sparkles className="h-6 w-6 text-emerald-600" />
        <h3 className="text-xl font-semibold text-slate-900">AI Smart Insights</h3>
      </div>
      <p className="text-slate-600 mb-6">
        Personalized analysis of your savings behavior. {spareChangeBalance > 0 ? 
        `You have ₹${spareChangeBalance.toFixed(2)} in spare change today.` : 
        `You're averaging ₹${dailyAverage} per day in spare-change savings.`} 
        {` At this rate, you'll have an extra ₹${yearEndProjection} by Dec 31, 2025.`}
      </p>
      <div className="bg-emerald-50/50 p-4 rounded-lg flex divide-x divide-emerald-200">
        <div className="flex-1 pr-4">
          <p className="text-sm text-emerald-800">{spareChangeBalance > 0 ? "Today's Spare Change" : "Daily Average"}</p>
          <p className="text-2xl font-bold text-emerald-700">₹{spareChangeBalance > 0 ? spareChangeBalance.toFixed(2) : dailyAverage}</p>
        </div>
        <div className="flex-1 pl-4">
          <p className="text-sm text-emerald-800">Year-End Projection</p>
          <p className="text-2xl font-bold text-emerald-700">₹{yearEndProjection}</p>
        </div>
      </div>
    </div>
  );
}

// --- 12. AiStockRecommendations Component ---
function AiStockRecommendations({ onInvest }) {
  const [riskTab, setRiskTab] = useState('balanced');
  
  const stocks = {
    conservative: [
      { 
        name: 'Nifty 50 Index Fund', 
        ticker: 'NIFTY50', 
        desc: "Diversified portfolio tracking India's top 50 companies", 
        risk: 'Low-Medium', 
        returns: '10-12%' 
      },
      { 
        name: 'HDFC Bank', 
        ticker: 'HDFCBANK', 
        desc: 'India\'s largest private sector bank with consistent growth.', 
        risk: 'Low', 
        returns: '9-11%' 
      },
      { 
        name: 'Hindustan Unilever', 
        ticker: 'HINDUNILVR', 
        desc: 'FMCG giant with strong dividend history and stable returns.', 
        risk: 'Low-Medium', 
        returns: '8-10%' 
      }
    ],
    balanced: [
      { 
        name: 'Infosys Tech', 
        ticker: 'INFY', 
        desc: 'Technology leader with consistent performance and dividends', 
        risk: 'Medium', 
        returns: '12-15%' 
      },
      { 
        name: 'Reliance Industries', 
        ticker: 'RELIANCE', 
        desc: 'Blue-chip stock with strong fundamentals and steady growth', 
        risk: 'Medium', 
        returns: '12-15%' 
      },
      { 
        name: 'Tata Consultancy Services', 
        ticker: 'TCS', 
        desc: 'Global IT services leader with robust financials.', 
        risk: 'Medium', 
        returns: '11-14%' 
      }
    ],
    growth: [
      { 
        name: 'Tata Motors', 
        ticker: 'TATAMOTORS', 
        desc: 'Strong position in the growing EV market with high growth potential.', 
        risk: 'High', 
        returns: '20-30%' 
      },
      { 
        name: 'Zomato', 
        ticker: 'ZOMATO', 
        desc: 'Market leader in food delivery, high growth potential in the tech space.', 
        risk: 'High', 
        returns: '25-35%' 
      },
      { 
        name: 'Adani Green Energy', 
        ticker: 'ADANIGREEN', 
        desc: 'Aggressive expansion in the renewable energy sector.', 
        risk: 'Very High', 
        returns: '30-45%' 
      }
    ]
  };

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'bg-green-100 text-green-800';
    if (risk === 'Low-Medium') return 'bg-yellow-100 text-yellow-800';
    if (risk === 'Medium') return 'bg-orange-100 text-orange-800';
    if (risk === 'High') return 'bg-red-100 text-red-800';
    if (risk === 'Very High') return 'bg-purple-100 text-purple-800';
    return 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-900 mb-2">AI Stock Recommendations</h3>
      <p className="text-slate-600 mb-4">ML-powered suggestions based on your risk profile.</p>

      {/* Risk Tabs */}
      <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setRiskTab('conservative')}
          className={`flex-1 py-1.5 px-3 rounded-md text-sm font-semibold transition-colors ${riskTab === 'conservative' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Conservative
        </button>
        <button
          onClick={() => setRiskTab('balanced')}
          className={`flex-1 py-1.5 px-3 rounded-md text-sm font-semibold transition-colors ${riskTab === 'balanced' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Balanced
        </button>
        <button
          onClick={() => setRiskTab('growth')}
          className={`flex-1 py-1.5 px-3 rounded-md text-sm font-semibold transition-colors ${riskTab === 'growth' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Growth
        </button>
      </div>

      {/* Stock Cards */}
      <div className="space-y-4">
        {stocks[riskTab].map(stock => (
          <div key={stock.ticker} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-lg font-semibold text-slate-900">{stock.name}</p>
                <p className="text-sm font-medium text-slate-500">{stock.ticker}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getRiskColor(stock.risk)}`}>
                {stock.risk}
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-4">{stock.desc}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-slate-500">Expected Return</p>
                <p className="text-lg font-semibold text-emerald-600">{stock.returns}</p>
              </div>
              <button
                onClick={() => onInvest(stock)}
                className="bg-emerald-600 text-blue px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-sm"
              >
                Invest
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 p-4 rounded-lg mt-6">
        <p className="text-xs text-slate-600">
          <span className="font-semibold">How it works:</span> Our ML model analyzes your risk profile, investment patterns, and current market trends to recommend optimal stocks.
        </p>
      </div>
    </div>
  );
}

// --- 13. AiInvestmentAdvisorChat Component ---
function AiInvestmentAdvisorChat() {
  const quickQuestions = [
    'Should I invest now?',
    'How is my streak?',
    'What are my savings?'
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-emerald-50 p-3 rounded-full">
          <MessageSquare className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">AI Investment Advisor</h3>
      </div>
      <p className="text-slate-600 mb-6">Ask questions about your investments</p>

      <div className="space-y-3 mb-6">
        <p className="text-sm font-semibold text-slate-500">Quick questions:</p>
        {quickQuestions.map(q => (
          <button key={q} className="w-full text-left p-3 bg-slate-50 rounded-lg text-slate-700 hover:bg-slate-100 text-sm font-medium">
            {q}
          </button>
        ))}
      </div>

      <div className="mt-auto relative">
        <input
          type="text"
          placeholder="Ask me anything..."
          className="w-full bg-slate-100 border border-slate-200 rounded-lg p-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-blue p-2 rounded-md hover:bg-emerald-700">
          <SendHorizonal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// --- 14. PlaceholderPage Component ---
function PlaceholderPage({ title, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center text-slate-500">
      <Icon className="h-16 w-16 text-slate-400" />
      <h1 className="mt-6 text-3xl font-bold text-slate-700">{title}</h1>
      <p className="mt-2 text-lg text-slate-500">This page is under construction. Check back soon!</p>
    </div>
  );
}

// --- 15. SettingsPage Component ---
function SettingsPage() {
  const [roundUpMultiplier, setRoundUpMultiplier] = useState('5');
  const [threshold, setThreshold] = useState(100);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('sbi-1234');
  const [appearance, setAppearance] = useState('dark');

  const bankAccounts = [
    { id: 'sbi-1234', name: 'State Bank of India', number: '...1234' },
    { id: 'hdfc-5678', name: 'HDFC Bank', number: '...5678' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Settings</h1>
        <p className="text-slate-600">Manage your app and account preferences.</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Round-up Settings */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Round-up Settings</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="multiplier" className="block text-sm font-medium text-slate-700 mb-2">
                    Round-up Rule
                  </label>
                  <select
                    id="multiplier"
                    value={roundUpMultiplier}
                    onChange={(e) => setRoundUpMultiplier(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg text-slate-900 p-3 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="5">Round up to nearest ₹5</option>
                    <option value="10">Round up to nearest ₹10</option>
                    <option value="1">Round up to nearest ₹1</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="threshold" className="block text-sm font-medium text-slate-700 mb-2">
                    Investment Threshold
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-500">₹</span>
                    </div>
                    <input
                      type="number"
                      id="threshold"
                      value={threshold}
                      onChange={(e) => setThreshold(e.target.value)}
                      className="w-full pl-7 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="100"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notification Settings */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Notifications</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-slate-900">Push Notifications</p>
                  <LightToggleSwitch
                    enabled={pushNotifications}
                    onChange={() => setPushNotifications(!pushNotifications)}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-slate-900">Email Notifications</p>
                  <LightToggleSwitch
                    enabled={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                </div>
              </div>
            </div>

            {/* Linked Account */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Linked Account</h2>
              <div className="space-y-3">
                {bankAccounts.map((account) => (
                  <label
                    key={account.id}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedAccount === account.id
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'bg-white border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="bank-account"
                      value={account.id}
                      checked={selectedAccount === account.id}
                      onChange={(e) => setSelectedAccount(e.target.value)}
                      className="h-4 w-4 text-emerald-600 bg-slate-100 border-slate-300 focus:ring-emerald-500"
                    />
                    <div className="ml-4 flex-grow">
                      <p className="font-semibold text-slate-900">{account.name}</p>
                      <p className="text-sm text-slate-600">{account.number}</p>
                    </div>
                    <Banknote className="h-6 w-6 text-slate-500" />
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Appearance */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Appearance</h2>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-900">Dark Mode</span>
                <LightToggleSwitch
                  enabled={appearance === 'dark'}
                  onChange={() => setAppearance(prev => (prev === 'dark' ? 'light' : 'dark'))}
                />
              </div>
              <p className="text-xs text-slate-500 mt-4">
                Note: Dark mode is not yet implemented in this demo.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-emerald-600 text-blue font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 shadow-sm"
          >
            <Save className="h-5 w-5" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

// --- 16. --- NEW/RESTORED: LearnMcqPage Component ---
const quizData = [
  {
    question: "What is 'compound interest'?",
    options: [
      "Interest paid only on the principal amount.",
      "Interest paid on both the principal and the accumulated interest.",
      "A simple, one-time interest payment.",
      "The interest rate set by the Reserve Bank of India."
    ],
    correctAnswer: 1,
    explanation: "Compound interest is 'interest on interest.' It makes your savings grow faster because you earn returns on both your original money and the interest you've already earned."
  },
  {
    question: "What does 'diversification' in investing mean?",
    options: [
      "Putting all your money into one, high-performing stock.",
      "Only investing in your home country.",
      "Spreading your investments across different assets (like stocks, bonds) to reduce risk.",
      "Converting all your investments to cash."
    ],
    correctAnswer: 2,
    explanation: "Diversification is like the saying 'Don't put all your eggs in one basket.' By spreading your money around, you reduce the risk that a poor performance from one investment will significantly harm your overall portfolio."
  },
  {
    question: "What is a 'Nifty 50 Index Fund'?",
    options: [
      "A fund that invests in 50 different high-risk startups.",
      "A savings account that pays 50% interest.",
      "A type of mutual fund that buys stocks of the 50 largest companies on the National Stock Exchange (NSE).",
      "A government bond that matures in 50 years."
    ],
    correctAnswer: 2,
    explanation: "An index fund is a low-cost way to invest in the entire market. A Nifty 50 fund simply buys and holds the 50 companies in the Nifty 50 index, giving you broad diversification automatically."
  },
  {
    question: "What is the primary benefit of starting to invest early?",
    options: [
      "You can take on more risk.",
      "You get special tax breaks.",
      "You get access to exclusive investments.",
      "You give your money more time to grow, especially with compound interest."
    ],
    correctAnswer: 3,
    explanation: "Time is your greatest asset in investing. The longer your money is invested, the more time compounding has to work its magic, leading to potentially much larger growth over the long term."
  }
];

function LearnMcqPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const isQuizOver = currentQuestionIndex >= quizData.length;
  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerSelect = (index) => {
    if (showFeedback) return; // Don't allow changing answer after submission
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
  };

  const getOptionClass = (index) => {
    if (!showFeedback) {
      return selectedAnswer === index
        ? 'bg-emerald-100 border-emerald-500' // Selected but not submitted
        : 'bg-white border-slate-300 hover:bg-slate-50'; // Default
    }

    // Feedback is being shown
    if (index === currentQuestion.correctAnswer) {
      return 'bg-green-100 border-green-500'; // Correct answer
    }
    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      return 'bg-red-100 border-red-500'; // Incorrect answer selected by user
    }
    return 'bg-white border-slate-300'; // Other incorrect options
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-emerald-100 p-3 rounded-full">
          <BookOpen className="h-8 w-8 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Financial Literacy Quiz</h1>
          <p className="text-slate-600">Test your investing knowledge!</p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        {isQuizOver ? (
          // --- Quiz Over State ---
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Quiz Completed!</h2>
            <p className="text-lg text-slate-700 mb-2">Your Final Score:</p>
            <p className="text-5xl font-bold text-emerald-600 mb-8">
              {score} <span className="text-3xl text-slate-500">/ {quizData.length}</span>
            </p>
            <button
              onClick={handleRestart}
              className="bg-emerald-600 text-blue font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          // --- Quiz in Progress State ---
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-emerald-700">
                Question {currentQuestionIndex + 1} of {quizData.length}
              </p>
              <p className="text-sm font-semibold text-slate-600">Score: {score}</p>
            </div>
            
            <h2 className="text-xl font-semibold text-slate-900 mb-6">{currentQuestion.question}</h2>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border-2 font-medium transition-colors ${getOptionClass(index)} ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className={`p-4 rounded-lg mb-6 ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <h3 className="font-bold text-lg mb-2">
                  {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Not quite.'}
                </h3>
                <p className="text-slate-700">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex justify-end">
              {!showFeedback ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="bg-emerald-600 text-blue font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-slate-300"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-emerald-600 text-blue font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Next Question
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// --- 17. LightToggleSwitch Component ---
function LightToggleSwitch({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`${
        enabled ? 'bg-emerald-600' : 'bg-slate-300'
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
    >
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-0'
        } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
}

// --- 18. Old Investment Modal (Kept for reference) ---
function OldInvestmentModal({ show, onClose, walletBalance, setWalletBalance }) {
  if (!show) return null;
  const recommendedAmount = 250; 
  const handleInvest = (investmentType) => {
    if (walletBalance >= recommendedAmount) {
      setWalletBalance(prev => prev - recommendedAmount);
      onClose();
    } else {
      alert("Not enough funds in wallet to invest.");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl shadow-green-900/20 text-blue border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Ready to Invest!</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-blue">
            <X className="h-6 w-6" />
          </button>
        </div>
        <p className="text-gray-300 mb-4">
          You've reached your investment threshold. You have <span className="font-bold text-blue">₹{walletBalance.toFixed(2)}</span> in savings.
        </p>
        <div className="bg-green-900/50 border border-green-600 text-green-300 p-3 rounded-lg text-center mb-6">
          Recommended amount: <span className="font-bold text-blue">₹{recommendedAmount}</span>
        </div>
        <div className="space-y-3">
          <button 
            onClick={() => handleInvest('Stocks')}
            className="w-full bg-emerald-600 text-blue font-bold py-3.5 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Invest ₹{recommendedAmount} in Stocks
          </button>
          <button 
            onClick={() => handleInvest('Debt Repayment')}
            className="w-full bg-blue-600 text-blue font-bold py-3.5 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Invest ₹{recommendedAmount} in Debt Repayment
          </button>
          <button 
            onClick={() => handleInvest('Personalized Plan')}
            className="w-full bg-purple-600 text-blue font-bold py-3.5 rounded-lg hover:bg-purple-500 transition-colors"
          >
            Invest ₹{recommendedAmount} in Personalized Plan
          </button>
          <button className="w-full bg-gray-700 text-blue font-bold py-3.5 rounded-lg hover:bg-gray-600 transition-colors">
            Choose custom amount
          </button>
          <button 
            onClick={onClose}
            className="w-full text-gray-400 font-medium py-2 rounded-lg hover:text-blue transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 19. --- NewsPage Component ---
// Simulates fetching news articles
function NewsPage() {
  const [loading, setLoading] = useState(true);
  
  // Mock data based on your request and search results
  const mockNewsData = [
    {
      id: 1,
      headline: "Taking Stock: Market snaps six-day run; Nifty below 25,800, Sensex down 345 pts",
      source: "Moneycontrol",
      time: "2h ago",
      url: "https://www.moneycontrol.com/news/business/markets/",
      image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Market" 
    },
    {
      id: 2,
      headline: "Kotak Bank Q2 results: Net profit falls 3% to ₹3,253 cr on higher provisions",
      source: "Moneycontrol",
      time: "4h ago",
      url: "https://www.moneycontrol.com/news/business/earnings/",
      image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Bank" 
    },
    {
      id: 3,
      headline: "LIC raises stake in these 5 FMCG stocks in Q2",
      source: "Moneycontrol",
      time: "5h ago",
      url: "https://www.moneycontrol.com/news/business/companies/",
      image: "https://via.placeholder.com/150/008000/FFFFFF?text=FMCG" 
    },
    {
      id: 4,
      headline: "RBI vs SBI showdown on LinkedIn as top economist levels plagiarism accusations",
      source: "Moneycontrol",
      time: "8h ago",
      url: "https://www.moneycontrol.com/news/business/economy/",
      image: "https://via.placeholder.com/150/FFA500/FFFFFF?text=RBI" 
    },
    {
      id: 5,
      headline: "Bullish Outlook: Top expert picks for the festive season",
      source: "Moneycontrol",
      time: "1d ago",
      url: "https://www.moneycontrol.com/news/business/personal-finance/",
      image: "https://via.placeholder.com/150/800080/FFFFFF?text=Stocks" 
    }
  ];

  // Simulate a network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-emerald-100 p-3 rounded-full">
          <Newspaper className="h-8 w-8 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Financial News</h1>
          <p className="text-slate-600">Latest updates from the market (powered by Moneycontrol)</p>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-200">
          {mockNewsData.map((item) => (
            <a 
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 hover:bg-slate-50 transition-colors"
            >
              {/* Using a placeholder for the image */}
              <img 
                src={item.image} 
                alt="News" 
                className="h-20 w-20 md:h-24 md:w-24 rounded-lg object-cover bg-slate-200"
              />
              <div className="ml-4 flex-1">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {item.source}
                </span>
                <h3 className="text-md md:text-lg font-semibold text-slate-900 my-1.5 leading-snug">
                  {item.headline}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">{item.time}</span>
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}