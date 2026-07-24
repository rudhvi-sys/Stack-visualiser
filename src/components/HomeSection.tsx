import React from 'react';
import { Layers, ArrowRight, Play, BookOpen, CheckCircle, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { NavigationTab } from '../types';
import { REAL_LIFE_EXAMPLES } from '../data/theoryData';

interface HomeSectionProps {
  setActiveTab: (tab: NavigationTab) => void;
  isDark: boolean;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ setActiveTab, isDark }) => {
  return (
    <div className="space-y-12 py-6">
      {/* Hero Banner with Frosted Glass Theme */}
      <div className={`relative rounded-3xl p-8 sm:p-12 overflow-hidden border transition-all duration-300 backdrop-blur-xl ${
        isDark 
          ? 'bg-slate-900/50 border-white/10 text-slate-100 shadow-2xl shadow-indigo-950/40' 
          : 'bg-white/60 border-white/80 text-slate-900 shadow-xl shadow-indigo-500/10'
      }`}>
        {/* Background decorative glow orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-bl from-indigo-500/20 to-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-violet-500/20 to-pink-500/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 dark:bg-indigo-400/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-400/20 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Interactive Data Structure Laboratory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Master the <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">Stack Data Structure</span> with Visual Clarity
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Understand <strong className="font-semibold text-slate-800 dark:text-slate-100">LIFO (Last In, First Out)</strong> operations through animated step-by-step simulations, live algorithm execution code, interactive challenges, and real-world system applications.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('simulator')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5 border border-white/20 backdrop-blur-md transition-all duration-200"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Interactive Simulator</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => setActiveTab('theory')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 border border-white/80 dark:border-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-slate-750 transition-all shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Read Theory & Algorithms</span>
            </button>
          </div>
        </div>
      </div>

      {/* What is LIFO? Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-3 transition-transform duration-200 hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            LIFO (Last In, First Out)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            The last element pushed onto the stack is the very first one to be popped off. Insertion and deletion happen exclusively at the top pointer.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3 transition-transform duration-200 hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
            <CheckCircle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            O(1) Constant Time Ops
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Push, Pop, Peek, isEmpty, and isFull execute in strict O(1) time complexity because we only manipulate the element at index <code className="text-emerald-600 dark:text-emerald-400 font-mono">top</code>.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3 transition-transform duration-200 hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 dark:bg-rose-400/15 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Overflow & Underflow Guard
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Pushing to a full stack causes <strong className="text-rose-600 dark:text-rose-400">Overflow</strong>. Popping from an empty stack triggers <strong className="text-rose-600 dark:text-rose-400">Underflow</strong>.
          </p>
        </div>
      </div>

      {/* Core Operations Diagrammatic Overview */}
      <div className="glass-panel p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              How Stack Operations Work
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Think of a stack like a vertical cylinder or cafeteria tray dispenser. Elements enter from the top and leave from the top.
            </p>
            <div className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
                <span><strong>Push(x)</strong>: Adds element x to top; increments top pointer.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500" />
                <span><strong>Pop()</strong>: Removes top element; decrements top pointer.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500" />
                <span><strong>Peek()</strong>: Reads the current top value without removing it.</span>
              </div>
            </div>
          </div>

          {/* Visual Stack Graphic with Glass Sheen */}
          <div className="w-full md:w-72 p-6 rounded-2xl glass-card flex flex-col items-center">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Stack Container
            </div>
            <div className="w-48 border-x-4 border-b-4 border-indigo-500/80 rounded-b-2xl p-2 bg-indigo-500/5 backdrop-blur-md flex flex-col-reverse gap-1.5 min-h-[200px] justify-start shadow-inner">
              <div className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-mono text-center text-xs font-bold rounded-xl shadow-md border border-white/20 flex items-center justify-between px-3">
                <span>Value: 40</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-lg backdrop-blur-sm font-sans">← TOP</span>
              </div>
              <div className="w-full py-2.5 bg-gradient-to-r from-indigo-500/90 to-purple-500/90 text-white font-mono text-center text-xs font-bold rounded-xl shadow border border-white/10 opacity-90">
                Value: 30
              </div>
              <div className="w-full py-2.5 bg-indigo-500/70 text-white font-mono text-center text-xs font-bold rounded-xl shadow border border-white/10 opacity-80">
                Value: 20
              </div>
              <div className="w-full py-2.5 bg-indigo-500/50 text-indigo-950 dark:text-indigo-100 font-mono text-center text-xs font-bold rounded-xl shadow border border-white/10 opacity-70">
                Value: 10
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real World Applications Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Real-World Stack Applications
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Where stacks are used in actual software engines and daily tools
            </p>
          </div>
          <button
            onClick={() => setActiveTab('applications')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            <span>Explore All Demos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REAL_LIFE_EXAMPLES.map((ex, idx) => (
            <div
              key={idx}
              className="glass-card p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/15 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                  {ex.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {ex.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
