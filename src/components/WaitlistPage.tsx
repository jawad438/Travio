import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageSquare, Send, CheckCircle, ArrowLeft, Sparkles, Star } from 'lucide-react';

interface WaitlistPageProps {
  onBackToLanding: () => void;
  initialLearnSkill?: string;
}

export default function WaitlistPage({ onBackToLanding, initialLearnSkill = '' }: WaitlistPageProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(initialLearnSkill ? `Interested in learning: ${initialLearnSkill}` : '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    // Simulate high-end network submission transition
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('travio_waitlist') || '[]');
        const entry = {
          email: email.trim(),
          message: message.trim(),
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem('travio_waitlist', JSON.stringify([entry, ...existing]));
      } catch (err) {
        console.error('Waitlist storage error', err);
      }
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1100);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-6 relative bg-white dark:bg-[#0B0F12] overflow-hidden transition-colors duration-300">
      
      {/* Decorative ambient blobs */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-primary/5 dark:bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        
        {/* Back navigation wire */}
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 group text-xs font-bold text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-[#1D9E75] transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Landing</span>
        </button>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="waitlist-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.45 }}
              className="bg-white/85 dark:bg-slate-900/40 backdrop-blur-xl border border-gray-150 dark:border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl relative"
            >
              {/* Top Accent Star */}
              <div className="absolute -top-4 -right-4 h-12 w-12 bg-white dark:bg-slate-800 border border-gray-150 dark:border-slate-700/80 rounded-2xl flex items-center justify-center text-primary shadow-lg">
                <Sparkles className="h-5 w-5 animate-pulse text-primary dark:text-emerald-400" />
              </div>

              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] text-primary dark:text-emerald-400 font-bold uppercase tracking-widest bg-emerald-50 dark:bg-primary-light/5 px-2.5 py-1 rounded">
                    Early Access List
                  </span>
                  <h2 className="font-serif text-3.5xl sm:text-4xl text-gray-900 dark:text-white font-extrabold tracking-wide leading-tight mt-4">
                    Join the Waitlist
                  </h2>
                  <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                    Reserve your spot on Travio today. List your expertise, explore skills matching, and be the first to know when peer swap matchmaking goes live.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Email Input row */}
                  <div className="space-y-1.5 text-left">
                    <label className="font-sans text-xs font-bold text-gray-500 dark:text-gray-450 uppercase tracking-widest block">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-gray-50 hover:bg-gray-100/50 dark:bg-slate-950 dark:hover:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary font-sans font-semibold text-gray-800 dark:text-white transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Optional Message row */}
                  <div className="space-y-1.5 text-left">
                    <label className="font-sans text-xs font-bold text-gray-500 dark:text-gray-450 uppercase tracking-widest block">
                      Optional Match Idea / Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4.5 h-4 w-4 text-gray-400" />
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What skills are you aiming to swap? (e.g. swap Spanish coaching for rust backend coding...)"
                        className="w-full bg-gray-50 hover:bg-gray-100/50 dark:bg-slate-950 dark:hover:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary font-sans font-medium text-gray-800 dark:text-white transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-[#15805d] text-white py-4 px-6 rounded-2xl font-sans font-bold text-sm transition-all duration-250 flex items-center justify-center space-x-2 shadow-lg shadow-primary/10 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="h-4.5 w-4.5" />
                        <span>Submit Registration</span>
                      </>
                    )}
                  </button>

                </form>

                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-450 dark:text-gray-500">
                  <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400 animate-pulse" />
                  <span>No credit card required. 100% free, forever.</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="waitlist-success"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/85 dark:bg-slate-900/40 backdrop-blur-xl border border-gray-150 dark:border-slate-800/80 rounded-3xl p-10 shadow-2xl text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="h-20 w-20 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center border border-emerald-100 dark:border-emerald-800/40 animate-bounce">
                  <CheckCircle className="h-10 w-10 animate-pulse" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="font-serif text-3.5xl font-black text-gray-900 dark:text-white leading-tight">
                  You're on the list!
                </h2>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                  We've successfully registered <strong className="text-gray-900 dark:text-white font-bold">{email}</strong> to our early priority queue.
                </p>
                {message && (
                  <p className="font-sans text-xs italic text-gray-400 dark:text-gray-500 max-w-sm mx-auto p-4 rounded-xl bg-gray-50 dark:bg-slate-950/40 border border-gray-200/50 dark:border-slate-800/50">
                    "{message}"
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button
                  onClick={onBackToLanding}
                  className="bg-primary hover:bg-[#15805d] text-white py-3 px-6 rounded-2xl font-sans font-bold text-xs transition-colors cursor-pointer"
                >
                  Return to Homepage
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
