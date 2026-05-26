export interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
  iconName: 'UserPlus' | 'ArrowLeftRight' | 'Video' | 'MessageSquare';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: 'Code' | 'Palette' | 'Globe' | 'Music' | 'Camera' | 'Megaphone' | 'PenTool' | 'ChefHat' | 'Dumbbell' | 'Coins';
  count: string;
}

export interface ValueProp {
  id: number;
  title: string;
  description: string;
  iconName: 'HeartHandshake' | 'BookOpen' | 'Clock' | 'Globe';
}

export const STEPS: Step[] = [
  {
    id: 1,
    number: "01",
    title: "Create your profile",
    description: "List what you can teach and what you want to learn. It takes less than two minutes.",
    iconName: "UserPlus",
  },
  {
    id: 2,
    number: "02",
    title: "Get matched",
    description: "Our platform matches you with people who need your skills and offer exactly what you want to learn.",
    iconName: "ArrowLeftRight",
  },
  {
    id: 3,
    number: "03",
    title: "Start swapping",
    description: "Connect instantly via interactive text chat, upload media and files, or launch live video sessions to share skills 1-on-1.",
    iconName: "MessageSquare",
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "programming",
    name: "Programming",
    description: "Web development, Python, mobile apps, databases, and algorithms.",
    iconName: "Code",
    count: "0 registered users",
  },
  {
    id: "design",
    name: "Design",
    description: "UI/UX, graphic design, typography, Figma, and brand illustration.",
    iconName: "Palette",
    count: "0 registered users",
  },
  {
    id: "languages",
    name: "Languages",
    description: "Spanish, French, Japanese, English conversation, and accents.",
    iconName: "Globe",
    count: "0 registered users",
  },
  {
    id: "music",
    name: "Music",
    description: "Acoustic guitar, music theory, keyboard, and vocal training.",
    iconName: "Music",
    count: "0 registered users",
  },
  {
    id: "photography",
    name: "Photography",
    description: "DSLR settings, photo editing, Lightroom, and portrait composition.",
    iconName: "Camera",
    count: "0 registered users",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Growth marketing, SEO, copywriting, and social media brand strategy.",
    iconName: "Megaphone",
    count: "0 registered users",
  },
  {
    id: "writing",
    name: "Writing",
    description: "Creative writing, blogging, technical documentation, and storytelling.",
    iconName: "PenTool",
    count: "0 registered users",
  },
  {
    id: "cooking",
    name: "Cooking & Baking",
    description: "Sourdough bread, culinary basics, knife skills, and global cuisines.",
    iconName: "ChefHat",
    count: "0 registered users",
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "Yoga poses, home workouts, nutrition guides, and strength training.",
    iconName: "Dumbbell",
    count: "0 registered users",
  },
  {
    id: "finance",
    name: "Finance",
    description: "Personal budgeting, tax strategy, Excel, and investment fundamentals.",
    iconName: "Coins",
    count: "0 registered users",
  },
];

export const VALUE_PROPS: ValueProp[] = [
  {
    id: 1,
    title: "Free forever",
    description: "No subscription fees, no platform points, no payment barriers. Just a pure community exchange of knowledge.",
    iconName: "HeartHandshake",
  },
  {
    id: 2,
    title: "Learn anything",
    description: "With over 300+ subcategories, you can find niche knowledge from native speakers and expert industry practitioners.",
    iconName: "BookOpen",
  },
  {
    id: 3,
    title: "Fully flexible",
    description: "Swap on your schedule, at your own pace. Learn once a week, or configure a casual monthly meet-up.",
    iconName: "Clock",
  },
  {
    id: 4,
    title: "Global community",
    description: "Connect with enthusiasts and professionals from all corners of the globe, gaining cultural and real-world context.",
    iconName: "Globe",
  },
];
