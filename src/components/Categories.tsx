import { motion } from 'motion/react';
import { 
  Code, Palette, Globe, Music, Camera, 
  Megaphone, PenTool, ChefHat, Dumbbell, Coins, ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data';

const iconMap = {
  Code,
  Palette,
  Globe,
  Music,
  Camera,
  Megaphone,
  PenTool,
  ChefHat,
  Dumbbell,
  Coins,
};

interface CategoriesProps {
  onCategorySelected: (categoryName: string) => void;
}

export default function Categories({ onCategorySelected }: CategoriesProps) {
  return (
    <section id="categories" className="py-24 sm:py-32 bg-white dark:bg-[#0B0F12] relative overflow-hidden transition-colors">
      {/* Background radial soft spots */}
      <div className="absolute top-[10%] left-[5%] w-[320px] h-[320px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[380px] h-[380px] bg-emerald-150/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <span className="font-sans text-xs text-primary font-bold uppercase tracking-widest bg-green-50 dark:bg-primary-light/5 text-[#1D9E75] px-3 py-1 rounded-full">
              Explore Disciplines
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-900 dark:text-white font-bold tracking-tight mt-4">
              Find your swap specialty
            </h2>
            <p className="font-sans text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              Whether you are an engineer seeking language immersion or a cook seeking personal finance advice, there is a complementary partner waiting.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="font-mono text-xs text-gray-405 dark:text-gray-500 font-semibold">
              Click any category card to begin registration
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((category, idx) => {
            const IconComponent = iconMap[category.iconName];
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => onCategorySelected(category.name)}
                className="flex flex-col text-left items-start p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/65 dark:border-slate-800 rounded-3xl hover:border-primary/40 hover:shadow-xl hover:shadow-primary/3 transition-all duration-300 group cursor-pointer relative"
                id={`category-card-${category.id}`}
              >
                {/* Floating corner indicator */}
                <span className="absolute top-4 right-4 text-gray-305 group-hover:text-primary transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
                  <ArrowRight className="h-4 w-4" />
                </span>

                {/* Icon wrapper */}
                <div className="h-10 w-10 bg-gray-55 dark:bg-slate-950 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-450 group-hover:bg-green-50 group-hover:text-[#1D9E75] transition-colors duration-300 mb-5">
                  <IconComponent className="h-5 w-5" />
                </div>

                {/* Category Name */}
                <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-emerald-400 transition-colors duration-305">
                  {category.name}
                </h3>

                {/* Brief description */}
                <p className="font-sans text-xs text-gray-550 dark:text-gray-400 mt-2 leading-relaxed flex-grow">
                  {category.description}
                </p>

                {/* Count badge */}
                <span className="inline-block font-mono text-[10px] bg-gray-50 dark:bg-slate-950 text-gray-450 dark:text-gray-500 group-hover:bg-primary/5 group-hover:text-primary px-2.5 py-0.5 rounded-md mt-4 font-bold">
                  {category.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
