import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Laptop, LogOut, User, Sparkles, Shield } from 'lucide-react';
import { UserAccount } from '../types';

interface NavbarProps {
  onNavigateToAuth: () => void;
  currentUser: UserAccount | null;
  onLogout: () => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  isDashboardActive: boolean;
  onNavigateToDashboard: () => void;
  onNavigateToHome: () => void;
  isAdminMatched?: boolean;
  onNavigateToAdminEntries?: () => void;
  isAdminActive?: boolean;
}

export default function Navbar({
  onNavigateToAuth,
  currentUser,
  onLogout,
  theme,
  setTheme,
  isDashboardActive,
  onNavigateToDashboard,
  onNavigateToHome,
  isAdminMatched = false,
  onNavigateToAdminEntries,
  isAdminActive = false
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    onNavigateToHome();
    // Slightly delay to allow App to load landing view first if needed
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#0B0F12]/85 backdrop-blur-xl shadow-xs border-b border-gray-100/50 dark:border-slate-800/80 py-4'
          : 'bg-white/40 dark:bg-transparent backdrop-blur-md border-b border-white/20 dark:border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo - Travio with custom green dot */}
        <button
          onClick={() => {
            onNavigateToHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-2 text-2xl font-serif font-black tracking-tight text-gray-900 dark:text-white group cursor-pointer"
          id="nav-logo"
        >
          <span>Travio</span>
          <span className="h-2.5 w-2.5 rounded-full bg-primary inline-block transform transition-transform group-hover:scale-135 group-hover:bg-primary-hover animate-pulse" />
        </button>

        {/* Desktop Links & Actions */}
        <div className="hidden md:flex items-center space-x-8">
          
          {/* Landing navigation links only when not on active onboarding / dashboard, or dynamically scrollable */}
          <button
            onClick={() => scrollToSection('categories')}
            className="text-gray-650 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-sans font-semibold text-sm transition-colors cursor-pointer"
            id="nav-link-browse"
          >
            Browse Skills
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-gray-650 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-sans font-semibold text-sm transition-colors cursor-pointer"
            id="nav-link-how-it-works"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('why-us')}
            className="text-gray-650 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-sans font-semibold text-sm transition-colors cursor-pointer"
            id="nav-link-why-us"
          >
            Why Us
          </button>

          {/* Theme Cycler Button */}
          <button
            onClick={cycleTheme}
            title={`Active Theme: ${theme}`}
            className="p-2.5 rounded-xl border border-gray-250/30 bg-white/50 dark:bg-slate-900/60 dark:border-slate-800 text-gray-750 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:border-primary/30 cursor-pointer transition-all flex items-center gap-2 shadow-xs"
          >
            {theme === 'light' && <Sun className="h-4.5 w-4.5" />}
            {theme === 'dark' && <Moon className="h-4.5 w-4.5" />}
            {theme === 'system' && <Laptop className="h-4.5 w-4.5" />}
            <span className="text-[10px] font-mono font-bold capitalize hidden lg:inline">{theme}</span>
          </button>

          {isAdminMatched && onNavigateToAdminEntries && (
            <button
              onClick={onNavigateToAdminEntries}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border font-sans font-bold text-xs transition-all cursor-pointer shadow-xs ${
                isAdminActive
                  ? 'bg-primary border-primary text-white hover:bg-primary-hover shadow-sm shadow-primary/10'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/25'
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>Waitlist Entries</span>
            </button>
          )}

          {/* Early Access Join Waitlist button */}
          <button
            onClick={onNavigateToAuth}
            className="bg-primary/95 hover:bg-primary-hover text-white font-sans font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow-sm shadow-primary/10 hover:shadow-md cursor-pointer"
            id="nav-btn-signup"
          >
            Join Waitlist
          </button>

        </div>

        {/* Mobile menu controls */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Theme trigger on mobile directly */}
          <button
            onClick={cycleTheme}
            className="p-2 rounded-lg border border-gray-250/20 bg-white/40 dark:bg-slate-900/40 text-gray-700 dark:text-gray-300 cursor-pointer text-xs"
          >
            {theme === 'light' && <Sun className="h-4 w-4" />}
            {theme === 'dark' && <Moon className="h-4 w-4" />}
            {theme === 'system' && <Laptop className="h-4 w-4" />}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 dark:text-gray-200 hover:text-primary focus:outline-hidden p-2 cursor-pointer"
            id="nav-hamburger"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-[#0B0F12]/95 backdrop-blur-xl border-b border-gray-150 dark:border-slate-800 shadow-xl py-6 px-8 flex flex-col space-y-5 animate-fade-in text-left">
          <button
            onClick={() => scrollToSection('categories')}
            className="text-left text-gray-750 dark:text-gray-300 hover:text-primary font-sans font-semibold py-1 transition-colors text-base"
          >
            Browse Skills
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-left text-gray-750 dark:text-gray-300 hover:text-primary font-sans font-semibold py-1 transition-colors text-base"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('why-us')}
            className="text-left text-gray-750 dark:text-gray-300 hover:text-primary font-sans font-semibold py-1 transition-colors text-base"
          >
            Why Us
          </button>

          {isAdminMatched && onNavigateToAdminEntries && (
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigateToAdminEntries();
              }}
              className={`flex items-center gap-2 w-full text-left py-2 font-sans font-bold text-sm leading-none ${
                isAdminActive ? 'text-primary' : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>Waitlist Entries Database</span>
            </button>
          )}

          <hr className="border-gray-100 dark:border-slate-800" />

          <button
            onClick={() => {
              setIsOpen(false);
              onNavigateToAuth();
            }}
            className="bg-primary hover:bg-primary-hover text-white text-center font-sans font-bold py-3 px-4 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Join Waitlist
          </button>
        </div>
      )}
    </nav>
  );
}
