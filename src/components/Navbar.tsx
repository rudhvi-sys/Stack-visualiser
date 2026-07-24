import React from 'react';
import { Layers, Play, BookOpen, AppWindow, HelpCircle, Trophy, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { NavigationTab } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  soundEnabled,
  toggleSound
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Overview', icon: <Layers className="w-4 h-4" /> },
    { id: 'simulator', label: 'Simulator', icon: <Play className="w-4 h-4" />, badge: 'Main' },
    { id: 'theory', label: 'Theory', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'applications', label: 'Real-World Apps', icon: <AppWindow className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz Lab', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'challenges', label: 'Challenges', icon: <Trophy className="w-4 h-4" /> }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isDark
        ? 'bg-slate-900/60 border-b border-white/10 backdrop-blur-xl text-slate-100 shadow-lg shadow-black/20'
        : 'bg-white/60 border-b border-white/60 backdrop-blur-xl text-slate-800 shadow-sm shadow-indigo-500/5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600/90 to-purple-600/90 backdrop-blur-md text-white shadow-md shadow-indigo-500/30 group-hover:scale-105 group-hover:shadow-indigo-500/50 border border-white/20 transition-all duration-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                  Stack Visualizer
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-400/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-400/20 backdrop-blur-sm">
                  Data Structures Lab
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Learn & Practice Stack Operations
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/40 dark:bg-slate-800/40 p-1.5 rounded-2xl border border-white/60 dark:border-white/10 backdrop-blur-md shadow-inner">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 relative ${
                    isActive
                      ? 'bg-white/80 dark:bg-slate-900/80 text-indigo-600 dark:text-indigo-400 shadow-md border border-white dark:border-white/10 backdrop-blur-md scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-sm shadow-indigo-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Utility Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              className={`p-2.5 rounded-xl border backdrop-blur-md transition-all duration-200 shadow-sm ${
                soundEnabled
                  ? 'bg-indigo-500/10 dark:bg-indigo-400/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 dark:border-indigo-400/30 hover:bg-indigo-500/20'
                  : 'bg-white/40 dark:bg-slate-800/40 text-slate-400 border-slate-200/60 dark:border-slate-700/60 hover:bg-white/60'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-xl bg-white/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 border border-white/60 dark:border-white/10 backdrop-blur-md hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all duration-200 shadow-sm"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-between py-2 border-t border-white/40 dark:border-white/10 overflow-x-auto gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 backdrop-blur-md ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md border border-white/20'
                    : 'bg-white/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 border border-white/40 dark:border-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
