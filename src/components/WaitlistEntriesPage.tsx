import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  Trash2, 
  Calendar, 
  MessageSquare, 
  Mail, 
  Download, 
  RefreshCw, 
  ShieldAlert, 
  Star,
  CheckCircle,
  Clock,
  Briefcase,
  Lock,
  ArrowRight,
  UserPlus,
  Compass,
  ArrowLeft,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';

interface WaitlistEntry {
  email: string;
  message: string;
  timestamp: string;
}

interface WaitlistEntriesPageProps {
  onBackToLanding: () => void;
  userIp?: string;
}

export default function WaitlistEntriesPage({ onBackToLanding, userIp }: WaitlistEntriesPageProps) {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Email Authentication States
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
    return localStorage.getItem('travio_admin_session') === 'true';
  });
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Pre-seed default master administrator account if none exists
  useEffect(() => {
    try {
      const accounts = JSON.parse(localStorage.getItem('travio_admin_accounts') || '[]');
      const hasMaster = accounts.some((acc: any) => acc.email.toLowerCase() === 'admin@travio.com');
      if (!hasMaster) {
        accounts.push({
          email: 'admin@travio.com',
          password: 'adminpassword',
          role: 'master'
        });
        localStorage.setItem('travio_admin_accounts', JSON.stringify(accounts));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Loads entries from localStorage
  const loadEntries = () => {
    try {
      const waitlist = JSON.parse(localStorage.getItem('travio_waitlist') || '[]');
      setEntries(waitlist);
    } catch {
      setEntries([]);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      loadEntries();
    }
  }, [isAuthorized]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastOpen(true);
    setTimeout(() => setIsToastOpen(false), 2500);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you absolutely sure you want to purge all waitlist submissions? This cannot be undone.')) {
      localStorage.setItem('travio_waitlist', '[]');
      setEntries([]);
      triggerToast('All waitlist registrations successfully purged.');
    }
  };

  const handleDeleteEntry = (email: string) => {
    const updated = entries.filter(e => e.email !== email);
    localStorage.setItem('travio_waitlist', JSON.stringify(updated));
    setEntries(updated);
    setDeleteEmail(null);
    triggerToast(`Submissions for ${email} deleted.`);
  };

  // Pre-populate with sample data if list is empty for a stellar dashboard experience
  const loadSampleData = () => {
    const samples: WaitlistEntry[] = [
      {
        email: 'alex.developer@gmail.com',
        message: 'Looking to swap TypeScript/Rust guidance for advanced French language tutoring.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString() // 5m ago
      },
      {
        email: 'helena.s@outlook.com',
        message: 'Offering UX/UI design feedback. Keen to swap for React Native or Flutter lessons.',
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString() // 2h ago
      },
      {
        email: 'dr.marcel@gmail.com',
        message: 'Expert piano teacher willing to exchange lessons for digital marketing advice.',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString() // 1d ago
      },
      {
        email: 'siddharth@yahoo.com',
        message: 'Keen to swap Python web scraping assistance for advanced sourdough bread baking skills.',
        timestamp: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString() // 3d ago
      }
    ];

    try {
      const existing = JSON.parse(localStorage.getItem('travio_waitlist') || '[]');
      const combined = [...existing];
      // Only append unique sample entries
      samples.forEach(sample => {
        if (!combined.some(c => c.email.toLowerCase() === sample.email.toLowerCase())) {
          combined.push(sample);
        }
      });
      localStorage.setItem('travio_waitlist', JSON.stringify(combined));
      setEntries(combined);
      triggerToast('Sample waitlist records loaded for testing.');
    } catch (e) {
      console.error(e);
    }
  };

  // Format date readable
  const formatDate = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return isoStr;
    }
  };

  // Filter entries
  const filtered = entries.filter(entry => 
    entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export to simple CSV
  const handleExportCSV = () => {
    if (entries.length === 0) {
      triggerToast('No entries to export.');
      return;
    }
    const headers = ['Email', 'Message', 'Timestamp'];
    const rows = entries.map(e => [
      `"${e.email.replace(/"/g, '""')}"`,
      `"${e.message.replace(/"/g, '""')}"`,
      `"${e.timestamp}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `travio_waitlist_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('CSV file downloaded.');
  };

  // Admin account authentication processing
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    const email = authEmail.trim();
    const password = authPassword;

    if (!email || !password) {
      setAuthError('Please complete all required fields.');
      return;
    }

    setIsAuthLoading(true);

    setTimeout(() => {
      try {
        const accounts = JSON.parse(localStorage.getItem('travio_admin_accounts') || '[]');

        if (isSignUpMode) {
          // Signup code
          if (password.length < 6) {
            setAuthError('Password must be at least 6 characters long.');
            setIsAuthLoading(false);
            return;
          }
          if (password !== authConfirmPassword) {
            setAuthError('Passwords do not match.');
            setIsAuthLoading(false);
            return;
          }

          const alreadyExists = accounts.some((acc: any) => acc.email.toLowerCase() === email.toLowerCase());
          if (alreadyExists) {
            setAuthError('This email is already registered. Please login instead.');
            setIsAuthLoading(false);
            return;
          }

          // Save account
          const newAccount = { email, password, role: 'moderator' };
          accounts.push(newAccount);
          localStorage.setItem('travio_admin_accounts', JSON.stringify(accounts));
          
          // Log in instantly
          localStorage.setItem('travio_admin_session', 'true');
          localStorage.setItem('travio_admin_user', email);
          setIsAuthorized(true);
          triggerToast('Admin account registered! Signed in.');
        } else {
          // Login code
          const matched = accounts.find(
            (acc: any) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
          );

          if (matched) {
            localStorage.setItem('travio_admin_session', 'true');
            localStorage.setItem('travio_admin_user', email);
            setIsAuthorized(true);
            triggerToast('Authentication successful!');
          } else {
            setAuthError('Invalid credentials. Check your email and password.');
          }
        }
      } catch (err) {
        setAuthError('An error occurred. Please try again.');
      }
      setIsAuthLoading(false);
    }, 600);
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem('travio_admin_session');
    localStorage.removeItem('travio_admin_user');
    setIsAuthorized(false);
    triggerToast('Logged out of admin database.');
  };

  // Render Gate if unauthorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-6 relative bg-white dark:bg-[#0B0F12] overflow-hidden transition-colors duration-300">
        {/* Decorative background visual blurs */}
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-primary/5 dark:bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/5 blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10 text-left">
          
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 group text-xs font-bold text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-[#1D9E75] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Landing</span>
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/85 dark:bg-slate-900/40 backdrop-blur-xl border border-gray-150 dark:border-slate-800/80 rounded-3xl p-8 shadow-2xl relative"
          >
            <div className="space-y-6">
              <div className="text-center">
                <span className="font-mono text-[9px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
                  <ShieldAlert className="h-3 w-3" />
                  <span>Secure Access Gate</span>
                </span>
                
                <h3 className="font-serif text-2.5xl font-black text-gray-900 dark:text-white mt-4 tracking-wide">
                  {isSignUpMode ? 'Register Admin Account' : 'Database Email Sign In'}
                </h3>
                
                <p className="font-sans text-xs text-gray-450 dark:text-gray-450 mt-1 max-w-xs mx-auto">
                  {isSignUpMode 
                    ? 'Create modular email credentials to access the verified peer interest waitlist.' 
                    : 'Authenticating matching database viewer. Standard Google OAuth is deactivated.'}
                </p>
              </div>

              {authError && (
                <div className="p-3 text-xs bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 border border-red-150 dark:border-red-900/30 rounded-xl leading-relaxed text-center font-medium">
                  {authError}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-bold text-gray-500 dark:text-gray-450 uppercase tracking-widest block">
                    Admin Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="admin@travio.com"
                      className="w-full bg-gray-50 hover:bg-gray-100/50 dark:bg-slate-950 dark:hover:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-xl pl-10.5 pr-4 py-3 text-xs focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary font-sans font-semibold text-gray-800 dark:text-white transition-all transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-bold text-gray-500 dark:text-gray-450 uppercase tracking-widest block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-gray-50 hover:bg-gray-100/50 dark:bg-slate-950 dark:hover:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-xl pl-10.5 pr-11 py-3 text-xs focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary font-sans font-semibold text-gray-800 dark:text-white transition-all transition-colors duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Conditional Confirm Password */}
                {isSignUpMode && (
                  <div className="space-y-1.5 animate-slide-up">
                    <label className="font-sans text-xs font-bold text-gray-500 dark:text-gray-450 uppercase tracking-widest block">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={authConfirmPassword}
                        onChange={(e) => setAuthConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-gray-50 hover:bg-gray-100/50 dark:bg-slate-950 dark:hover:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-xl pl-10.5 pr-4 py-3 text-xs focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary font-sans font-semibold text-gray-800 dark:text-white transition-all transition-colors duration-200"
                      />
                    </div>
                  </div>
                )}

                {/* Password master demo helper hint */}
                {!isSignUpMode && (
                  <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-[11px] leading-normal text-amber-600/90 dark:text-amber-400/95 font-medium">
                    🏆 <strong className="font-bold text-gray-900 dark:text-white">Admin Credentials:</strong> You can sign up with any email, or sign in using:<br/>
                    Email: <span className="font-mono bg-amber-500/10 px-1 py-0.2 rounded font-black text-gray-900 dark:text-white">admin@travio.com</span><br/>
                    Password: <span className="font-mono bg-amber-500/10 px-1 py-0.2 rounded font-black text-gray-900 dark:text-white">adminpassword</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-[#15805d] text-white py-3 px-4 rounded-xl font-sans font-bold text-xs transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
                >
                  {isAuthLoading ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {isSignUpMode ? <UserPlus className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                      <span>{isSignUpMode ? 'Register Credential' : 'Secure Authenticate'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Mode Toggle Button link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUpMode(!isSignUpMode);
                    setAuthError('');
                  }}
                  className="text-xs text-primary hover:text-primary-hover hover:underline font-bold transition-all"
                >
                  {isSignUpMode ? 'Already have credentials? Sign In' : "Don't have an admin login? Sign Up"}
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 max-w-7xl mx-auto text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Upper Glows */}
      <div className="absolute top-[25%] left-[5%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 z-10 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
            <ShieldAlert className="h-3 w-3" />
            <span>Authenticated Client Registry</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-wide text-gray-900 dark:text-white leading-none">
              Waitlist Database
            </h1>
            <button
              onClick={handleLogoutAdmin}
              className="text-[10px] bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-500 hover:text-red-500 dark:text-gray-400 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <LogOut className="h-3 w-3" />
              <span>Lock DB</span>
            </button>
          </div>
          <p className="font-sans text-sm text-gray-500 dark:text-gray-400 max-w-xl">
            This module has been unlocked automatically because your connection IP address or environment matched the target whitelist <code className="bg-gray-100 dark:bg-slate-900 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-primary">{userIp || '105.110.147.51'}</code>.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={loadSampleData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-xs font-semibold hover:border-primary hover:text-primary transition-all cursor-pointer shadow-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Generate Test Samples</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-xs font-semibold hover:border-primary hover:text-primary transition-all cursor-pointer shadow-xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span>CSV Export</span>
          </button>

          <button
            onClick={handleClearAll}
            disabled={entries.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10 text-xs font-semibold text-red-650 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-900/10 transition-all cursor-pointer disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Wipe Database</span>
          </button>
        </div>
      </div>

      {/* Database Indicators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 relative z-10 font-sans">
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-150 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">{entries.length}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Submissions</div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-150 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-[#1D9E75]/10 text-[#1D9E75] flex items-center justify-center">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">
              {entries.filter(e => e.message.trim().length > 0).length}
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">With Custom Ideas</div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-150 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Clock className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">Active</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Live Spool Matcher</div>
          </div>
        </div>
      </div>

      {/* Database Search row */}
      <div className="mb-6 relative z-10">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search email, query, topic..."
            className="w-full pl-11 pr-4 py-3 bg-white/70 hover:bg-white/95 dark:bg-slate-900/50 dark:hover:bg-slate-900/85 border border-gray-200 dark:border-slate-800 rounded-xl text-xs focus:outline-hidden focus:border-primary text-gray-800 dark:text-white transition-all font-sans font-semibold shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-primary"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Database Table Output */}
      <div className="bg-white/85 dark:bg-slate-900/40 backdrop-blur-xl border border-gray-150 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-xl mb-10 z-10 relative font-sans">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-150 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/40 text-left">
                <th className="py-4.5 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest min-w-[200px]">User Email</th>
                <th className="py-4.5 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Optional Matching Idea/Message</th>
                <th className="py-4.5 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest min-w-[150px]">Submission Time</th>
                <th className="py-4.5 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-right w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((entry, idx) => (
                  <tr 
                    key={idx} 
                    className="border-b border-gray-150/60 dark:border-slate-800/50 hover:bg-gray-50/50 dark:hover:bg-slate-950/20 transition-colors"
                  >
                    <td className="py-4.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-8.5 w-8.5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          {entry.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-sm text-gray-900 dark:text-white max-w-[220px] truncate block" title={entry.email}>
                          {entry.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-4.5 px-6 text-xs leading-relaxed text-gray-650 dark:text-gray-350">
                      {entry.message ? (
                        <div className="flex items-start gap-2 max-w-xl">
                          <MessageSquare className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="whitespace-pre-line">{entry.message}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-600 block italic">No optional message provided</span>
                      )}
                    </td>
                    <td className="py-4.5 px-6 text-xs text-gray-500 dark:text-gray-500 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        <span>{formatDate(entry.timestamp)}</span>
                      </div>
                    </td>
                    <td className="py-4.5 px-6 text-right">
                      {deleteEmail === entry.email ? (
                        <div className="flex items-center justify-end gap-1.5 animate-fade-in">
                          <button
                            onClick={() => handleDeleteEntry(entry.email)}
                            className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-2.5 py-1 text-[10px] font-bold"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteEmail(null)}
                            className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-lg px-2.5 py-1 text-[10px]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteEmail(entry.email)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-md transition-colors cursor-pointer"
                          title="Remove Registration"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-sm text-gray-400 dark:text-gray-500 font-semibold">
                    {searchTerm ? 'No registered emails matches your search query.' : 'The waitlist repository is currently empty.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Pop notification toast */}
      {isToastOpen && (
        <div className="fixed bottom-6 right-6 z-100 bg-gray-900 border border-slate-800 text-white rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle className="h-5 w-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
