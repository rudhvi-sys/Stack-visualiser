import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { StackVisualizer } from './components/StackVisualizer';
import { TheorySection } from './components/TheorySection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { QuizSection } from './components/QuizSection';
import { ChallengeSection } from './components/ChallengeSection';
import { Footer } from './components/Footer';
import { NavigationTab } from './types';
import { soundFx } from './utils/sound';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('simulator');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleSound = () => {
    const nextState = soundFx.toggleSound();
    setSoundEnabled(nextState);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 relative overflow-x-hidden ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* Frosted Glass Background Ambient Lighting Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/20 dark:from-indigo-600/25 dark:to-purple-600/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-gradient-to-tl from-purple-500/25 to-pink-500/20 dark:from-purple-600/20 dark:to-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 dark:from-blue-600/20 dark:to-indigo-600/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDark={isDark}
          setIsDark={setIsDark}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
        />

        {/* Main Content Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} isDark={isDark} />}
          {activeTab === 'simulator' && <StackVisualizer isDark={isDark} />}
          {activeTab === 'theory' && <TheorySection isDark={isDark} />}
          {activeTab === 'applications' && <ApplicationsSection isDark={isDark} />}
          {activeTab === 'quiz' && <QuizSection isDark={isDark} />}
          {activeTab === 'challenges' && <ChallengeSection isDark={isDark} />}
        </main>

        {/* Lab Footer */}
        <Footer setActiveTab={setActiveTab} isDark={isDark} />
      </div>
    </div>
  );
}
