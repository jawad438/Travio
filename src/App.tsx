import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageSquare, Send, X, CheckCircle, Sparkles, LogIn, Heart } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Categories from './components/Categories';
import WhyUs from './components/WhyUs';
import Footer from './components/Footer';

// Premium Early Access Waitlist component
import WaitlistPage from './components/WaitlistPage';
import WaitlistEntriesPage from './components/WaitlistEntriesPage';

export default function App() {
  // Navigation View Status: 'landing' | 'waitlist' | 'waitlist-entries'
  const [view, setView] = useState<'landing' | 'waitlist' | 'waitlist-entries'>('landing');

  const [preselectedLearnSkill, setPreselectedLearnSkill] = useState('');
  const [userIp, setUserIp] = useState<string>('');

  
  // Footer / General Contact Modal state
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Theme support state
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    try {
      return (localStorage.getItem('travio_theme') as 'light' | 'dark' | 'system') || 'system';
    } catch {
      return 'system';
    }
  });

  // Watch and apply theme selection
  useEffect(() => {
    const root = window.document.documentElement;
    localStorage.setItem('travio_theme', theme);

    const applyThemeClasses = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    };

    if (theme === 'system') {
      const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyThemeClasses(systemQuery.matches);
      
      const listener = (e: MediaQueryListEvent) => applyThemeClasses(e.matches);
      systemQuery.addEventListener('change', listener);
      return () => systemQuery.removeEventListener('change', listener);
    } else {
      applyThemeClasses(theme === 'dark');
    }
  }, [theme]);

  // Synchronously evaluate whitelist simulated or connection IP address
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryIp = urlParams.get('ip');
    if (queryIp) {
      setUserIp(queryIp);
      localStorage.setItem('travio_simulated_ip', queryIp);
      return;
    }

    const cachedSimulated = localStorage.getItem('travio_simulated_ip');
    if (cachedSimulated) {
      setUserIp(cachedSimulated);
      return;
    }

    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.ip) {
          setUserIp(data.ip);
        }
      })
      .catch((err) => {
        console.warn('Network environment restriction or delay on client IP fetch:', err);
      });
  }, []);

  const isAdminMatched = userIp === '105.110.147.51';

  const handleCategorySelected = (categoryName: string) => {
    setPreselectedLearnSkill(categoryName);
    setView('waitlist');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactMessage.trim()) return;

    try {
      const currentMsgs = JSON.parse(localStorage.getItem('travio_messages') || '[]');
      const newMsg = {
        email: contactEmail.trim(),
        message: contactMessage.trim(),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('travio_messages', JSON.stringify([newMsg, ...currentMsgs]));
      
      setContactSuccess(true);
      setTimeout(() => {
        setIsContactOpen(false);
        setContactSuccess(false);
        setContactEmail('');
        setContactMessage('');
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Log in actions map to Waitlist sign up
  const handleStartListing = () => {
    setView('waitlist');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F12] text-gray-800 dark:text-gray-200 font-sans antialiased selection:bg-primary/10 selection:text-primary transition-colors duration-300">
      
      {/* Dynamic Sticky Navbar */}
      <Navbar 
        onNavigateToAuth={() => setView('waitlist')}
        currentUser={null}
        onLogout={() => {}}
        theme={theme}
        setTheme={setTheme}
        isDashboardActive={false}
        onNavigateToDashboard={() => {}}
        onNavigateToHome={() => setView('landing')}
        isAdminMatched={isAdminMatched}
        onNavigateToAdminEntries={() => setView('waitlist-entries')}
        isAdminActive={view === 'waitlist-entries'}
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="relative"
        >
          {view === 'landing' && (
            <>
              {/* Hero Presentation */}
              <Hero
                onListSkillsClick={handleStartListing}
                onBrowseSkillsClick={() => {
                  const element = document.getElementById('categories');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              />

              {/* How It Works steps */}
              <HowItWorks />

              {/* Browse Specializations grid */}
              <Categories onCategorySelected={handleCategorySelected} />

              {/* Why Travio Benefits */}
              <WhyUs />
            </>
          )}

          {view === 'waitlist' && (
            <WaitlistPage
              initialLearnSkill={preselectedLearnSkill}
              onBackToLanding={() => {
                setPreselectedLearnSkill('');
                setView('landing');
              }}
            />
          )}

          {view === 'waitlist-entries' && (
            <WaitlistEntriesPage
              onBackToLanding={() => setView('landing')}
              userIp={userIp}
            />
          )}
        </motion.main>
      </AnimatePresence>

      {/* Footer copyright and contact triggers */}
      <Footer onContactsClick={() => setIsContactOpen(true)} />

      {/* Contact Team Popup Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-gray-950/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative w-full max-w-md z-10 text-left"
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-[#1D9E75] transition-colors p-1 rounded-md"
                aria-label="Close details popup"
              >
                <X className="h-5 w-5" />
              </button>

              {!contactSuccess ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 text-primary">
                    <MessageSquare className="h-6 w-6" />
                    <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
                      Contact Team Travio
                    </h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Have questions for early partnerships, feedback, or suggestions? Submit a direct ping to our internal local spooling registry.
                  </p>

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="font-sans text-xs font-bold text-gray-500 dark:text-gray-450 uppercase tracking-wider block">
                        Your Contact Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs focus:outline-hidden focus:border-primary font-sans font-medium text-gray-800 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-sans text-xs font-bold text-gray-500 dark:text-gray-450 uppercase tracking-wider block">
                        How can we help?
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="State your match suggestions or partnership ideas..."
                        className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs focus:outline-hidden focus:border-primary font-sans font-medium resize-none text-gray-800 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-[#15805d] text-white py-3 px-4 rounded-xl font-sans font-bold text-sm transition-colors duration-250 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Transmit Message</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="flex justify-center">
                    <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
                    Message Dispatched!
                  </h3>
                  <p className="font-sans text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                    We've registered your message under <strong className="text-gray-800 dark:text-gray-200">{contactEmail}</strong>. We'll reach out within 24 hours.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Client Demo Utility: IP Simulation Bypass Control */}
      <div className="fixed bottom-4 left-4 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-gray-150 dark:border-slate-800/80 px-3.5 py-2.5 shadow-xl flex items-center gap-3 text-xs font-sans font-medium">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${isAdminMatched ? 'bg-amber-400 animate-pulse' : 'bg-gray-300 dark:bg-slate-700'}`} />
          <span className="text-gray-500 max-w-[130px] truncate" title={userIp || 'Detecting...'}>IP: {userIp || 'detecting...'}</span>
        </div>
        {!isAdminMatched ? (
          <button
            onClick={() => {
              setUserIp('105.110.147.51');
              localStorage.setItem('travio_simulated_ip', '105.110.147.51');
            }}
            className="px-2.5 py-1 bg-amber-500/10 text-amber-500 dark:text-emerald-400 hover:bg-amber-500/20 rounded-lg text-[10px] font-bold transition-all cursor-pointer leading-none"
          >
            Simulate Admin IP
          </button>
        ) : (
          <button
            onClick={() => {
              setUserIp('');
              localStorage.removeItem('travio_simulated_ip');
              if (view === 'waitlist-entries') {
                setView('landing');
              }
            }}
            className="px-2.5 py-1 bg-gray-100 dark:bg-slate-850 text-gray-750 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg text-[10px] font-bold transition-all cursor-pointer leading-none"
          >
            Reset IP
          </button>
        )}
      </div>
    </div>
  );
}
