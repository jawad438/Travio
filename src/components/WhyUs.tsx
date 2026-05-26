import { motion } from 'motion/react';
import { HeartHandshake, BookOpen, Clock, Globe } from 'lucide-react';
import { VALUE_PROPS } from '../data';

const iconMap = {
  HeartHandshake,
  BookOpen,
  Clock,
  Globe,
};

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 sm:py-32 bg-gray-50/40 dark:bg-slate-950/25 relative border-t border-gray-100 dark:border-slate-800/80 overflow-hidden transition-colors">
      {/* Decorative ambient spots */}
      <div className="absolute top-[20%] left-[10%] w-[320px] h-[320px] bg-primary-light/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[30%] right-[15%] w-[280px] h-[280px] bg-emerald-100/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-sans text-xs text-primary font-bold uppercase tracking-widest bg-green-50 dark:bg-primary-light/5 text-[#1D9E75] px-3 py-1 rounded-full">
            Our Philosophy
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-900 dark:text-white font-bold tracking-tight mt-4">
            Why Travio?
          </h2>
          <p className="font-sans text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
            We are stripping away subscriptions, algorithms, points, and pricing tiers. True, barrier-free cooperative knowledge sharing.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUE_PROPS.map((prop, idx) => {
            const IconComponent = iconMap[prop.iconName];
            return (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/55 dark:bg-slate-900/60 backdrop-blur-md border border-white/60 dark:border-slate-800 rounded-3xl p-8 hover:shadow-lg dark:hover:shadow-none hover:border-primary/25 transition-all duration-300 flex flex-col items-start group"
                id={`why-prop-${prop.id}`}
              >
                {/* Icon block */}
                <div className="h-12 w-12 rounded-xl bg-green-50 dark:bg-slate-950 text-[#1D9E75] flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-105">
                  <IconComponent className="h-5 w-5" />
                </div>

                {/* Card Title */}
                <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                  {prop.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans text-sm sm:text-base text-gray-500 dark:text-gray-450 mt-3 leading-relaxed">
                  {prop.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
