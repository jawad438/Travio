import { motion } from 'motion/react';
import { ArrowRight, Search } from 'lucide-react';

interface HeroProps {
  onListSkillsClick: () => void;
  onBrowseSkillsClick: () => void;
}

export default function Hero({ onListSkillsClick, onBrowseSkillsClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-36 pb-20 flex flex-col justify-center overflow-hidden bg-[#FFFFFF] dark:bg-[#0B0F12] transition-colors duration-300"
    >
      {/* Decorative background glass sphere blur effects */}
      <div className="absolute top-[18%] left-[15%] w-[350px] h-[350px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d9e7506_1px,transparent_1px),linear-gradient(to_bottom,#1d9e7506_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] dark:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#fff_70%,transparent_100%)] pointer-events-none opacity-40 dark:opacity-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        {/* Headline - Instrument Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 dark:text-white font-extrabold tracking-wide leading-tight max-w-4xl"
          id="hero-headline"
        >
          Teach what you know. <br />
          <span className="text-primary italic font-normal">Learn what you don't.</span>
        </motion.h1>

        {/* Subheadline - DM Sans */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-sans text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-normal leading-relaxed max-w-2xl mt-8"
          id="hero-subheadline"
        >
          Exchange skills directly with people worldwide. No fees, no courses — just real people teaching each other.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 w-full sm:w-auto"
        >
          <button
            onClick={onListSkillsClick}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary hover:bg-[#15805d] text-white py-4 px-8 rounded-full font-sans font-bold text-base transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 outline-hidden cursor-pointer"
            id="hero-btn-list-skills"
          >
            <span>List Your Skills</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <button
            onClick={onBrowseSkillsClick}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md hover:bg-white/80 text-gray-750 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-white/60 dark:border-slate-800 font-sans font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-xs hover:shadow-md outline-hidden cursor-pointer"
            id="hero-btn-browse"
          >
            <Search className="h-4 w-4" />
            <span>Browse Skills</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
