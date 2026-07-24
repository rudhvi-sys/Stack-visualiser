import React from 'react';
import { Layers, Keyboard, Heart } from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, isDark }) => {
  return (
    <footer className="border-t border-white/40 dark:border-white/10 mt-16 bg-white/20 dark:bg-slate-900/30 backdrop-blur-xl text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white font-bold shadow-sm">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-slate-900 dark:text-white">
                Stack Visualizer
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              An interactive Data Structures Laboratory project designed for students and developers to learn, simulate, and practice LIFO Stack operations.
            </p>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              <Keyboard className="w-4 h-4 text-indigo-500" />
              <span>Lab Keyboard Shortcuts</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span>Push Element:</span>
                <kbd className="px-2 py-0.5 rounded-lg bg-white/50 dark:bg-slate-800/60 border border-white/60 dark:border-white/10 font-mono text-[10px] shadow-xs">Enter</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Pop Top Item:</span>
                <kbd className="px-2 py-0.5 rounded-lg bg-white/50 dark:bg-slate-800/60 border border-white/60 dark:border-white/10 font-mono text-[10px] shadow-xs">Pop Button</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Peek Top Value:</span>
                <kbd className="px-2 py-0.5 rounded-lg bg-white/50 dark:bg-slate-800/60 border border-white/60 dark:border-white/10 font-mono text-[10px] shadow-xs">Peek Button</kbd>
              </div>
            </div>
          </div>

          {/* Lab Sections */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
              Quick Lab Links
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <button onClick={() => setActiveTab('simulator')} className="hover:text-indigo-500 transition-colors">
                Simulator
              </button>
              <span>•</span>
              <button onClick={() => setActiveTab('theory')} className="hover:text-indigo-500 transition-colors">
                Theory & Complexity
              </button>
              <span>•</span>
              <button onClick={() => setActiveTab('applications')} className="hover:text-indigo-500 transition-colors">
                Real-World Demos
              </button>
              <span>•</span>
              <button onClick={() => setActiveTab('quiz')} className="hover:text-indigo-500 transition-colors">
                Quiz Lab
              </button>
              <span>•</span>
              <button onClick={() => setActiveTab('challenges')} className="hover:text-indigo-500 transition-colors">
                Challenges
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/30 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© Data Structures Laboratory Project — Stack Visualizer</p>
          <div className="flex items-center gap-1">
            <span>Built with React 19, TypeScript, Tailwind CSS & Web Audio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
