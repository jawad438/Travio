import { motion } from 'motion/react';
import { UserPlus, ArrowLeftRight, Video, MessageSquare } from 'lucide-react';
import { STEPS } from '../data';

const iconMap = {
  UserPlus,
  ArrowLeftRight,
  Video,
  MessageSquare,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-gray-50/40 dark:bg-slate-950/25 relative border-y border-gray-100 dark:border-slate-800/80 overflow-hidden transition-colors">
      {/* Glow elements inside section */}
      <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-primary-light/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] bg-emerald-100/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-sans text-xs text-primary font-bold uppercase tracking-widest bg-green-50 dark:bg-primary-light/5 text-[#1D9E75] px-3 py-1 rounded-full">
            The Exchange Flow
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-900 dark:text-white font-bold tracking-tight mt-4">
            How Travio Works
          </h2>
          <p className="font-sans text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
            Three simple steps to connect and learn. No points, no money, absolute reciprocity.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connecting dashed line for background in desktop view */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-dashed border-t border-gray-200/60 dark:border-slate-800/60 -translate-y-12 z-0" />

          {STEPS.map((step, idx) => {
            const IconComponent = iconMap[step.iconName];
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative bg-white/55 dark:bg-slate-900/60 backdrop-blur-md border border-white/60 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-lg shadow-gray-100/30 dark:shadow-none hover:shadow-xl hover:border-primary/20 transition-all duration-300 z-10 flex flex-col items-start group"
                id={`how-step-${step.id}`}
              >
                {/* Step circle number */}
                <div className="absolute top-6 right-8 font-serif text-5xl md:text-6xl font-black text-gray-100/60 dark:text-slate-800/40 select-none group-hover:text-primary/10 transition-colors duration-300">
                  {step.number}
                </div>

                {/* Icon Wrapper */}
                <div className="h-14 w-14 rounded-xl bg-green-50 dark:bg-slate-950 text-[#1D9E75] flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Step Headline */}
                <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="font-sans text-sm sm:text-base text-gray-500 dark:text-gray-450 mt-3 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
