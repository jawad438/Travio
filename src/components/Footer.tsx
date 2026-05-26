interface FooterProps {
  onContactsClick: () => void;
}

export default function Footer({ onContactsClick }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-[#090C0E] text-gray-500 dark:text-gray-450 py-16 sm:py-20 border-t border-gray-150 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo + Tagline */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 text-2xl font-serif font-black tracking-wider text-gray-900 dark:text-white group cursor-pointer"
            >
              <span>Travio</span>
              <span className="h-2 w-2 rounded-full bg-primary inline-block transition-transform group-hover:scale-135" />
            </button>
            <p className="font-sans text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              Teach what you know. Learn what you don't. Exchange skills directly with people worldwide, with no fees or courses.
            </p>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold text-gray-900 dark:text-gray-200 uppercase tracking-widest">
              Platform
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <button
                  onClick={() => scrollToSection('categories')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Browse Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('why-us')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Why Travio
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold text-gray-900 dark:text-gray-200 uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  About us
                </button>
              </li>
              <li>
                <button
                  onClick={onContactsClick}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer text-left focus:outline-hidden"
                >
                  Contact
                </button>
              </li>
              <li>
                <span className="text-gray-400 dark:text-gray-600 cursor-not-allowed">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-gray-200 dark:border-slate-800/80 my-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-500 gap-4">
          <p>© 2026 Travio. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-default">Terms of reciprocal agreement</span>
            <span className="hover:text-gray-300 dark:hover:text-gray-300 transition-colors cursor-default">Global Co-op</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
