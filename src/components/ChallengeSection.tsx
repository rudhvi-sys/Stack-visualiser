import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Plus, Trash2, RotateCcw, Lightbulb, CheckCircle2, ArrowRight, Award, Sparkles } from 'lucide-react';
import { CHALLENGES } from '../data/challengeData';
import { Challenge } from '../types';
import { soundFx } from '../utils/sound';

interface ChallengeSectionProps {
  isDark: boolean;
}

export const ChallengeSection: React.FC<ChallengeSectionProps> = ({ isDark }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(CHALLENGES[0]);
  const [currentStack, setCurrentStack] = useState<(string | number)[]>(CHALLENGES[0].initialStack);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Reset challenge
  const handleSelectChallenge = (c: Challenge) => {
    setSelectedChallenge(c);
    setCurrentStack([...c.initialStack]);
    setMovesCount(0);
    setInputValue('');
    setShowHint(false);
    setIsCompleted(false);
  };

  const handleReset = () => {
    setCurrentStack([...selectedChallenge.initialStack]);
    setMovesCount(0);
    setInputValue('');
    setIsCompleted(false);
  };

  // Push in challenge
  const handlePush = () => {
    if (!inputValue.trim() || isCompleted) return;
    if (currentStack.length >= selectedChallenge.capacity) {
      soundFx.playError();
      alert(`Stack capacity limit (${selectedChallenge.capacity}) reached!`);
      return;
    }

    soundFx.playPush();
    const val = isNaN(Number(inputValue.trim())) ? inputValue.trim() : Number(inputValue.trim());
    const nextStack = [...currentStack, val];
    setCurrentStack(nextStack);
    setMovesCount((m) => m + 1);
    setInputValue('');

    checkGoal(nextStack);
  };

  // Pop in challenge
  const handlePop = () => {
    if (currentStack.length === 0 || isCompleted) return;
    soundFx.playPop();
    const nextStack = currentStack.slice(0, currentStack.length - 1);
    setCurrentStack(nextStack);
    setMovesCount((m) => m + 1);

    checkGoal(nextStack);
  };

  // Check if currentStack matches targetStack
  const checkGoal = (stackState: (string | number)[]) => {
    const target = selectedChallenge.targetStack;
    if (stackState.length === target.length) {
      const match = stackState.every((val, idx) => String(val) === String(target[idx]));
      if (match) {
        setIsCompleted(true);
        soundFx.playSuccess();
      }
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-400/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20 backdrop-blur-md">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Stack Practice Challenges
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Apply push and pop operations to solve stack manipulation puzzles.
            </p>
          </div>
        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {CHALLENGES.map((c) => (
          <button
            key={c.id}
            onClick={() => handleSelectChallenge(c)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedChallenge.id === c.id
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20'
                : 'glass-button text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Level {c.id}: {c.title}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-lg bg-black/20 text-white backdrop-blur-sm">
              {c.difficulty}
            </span>
          </button>
        ))}
      </div>

      {/* Challenge Playground Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Challenge Instructions & Target Goal (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                Level {selectedChallenge.id} Objective
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Moves: {movesCount} / {selectedChallenge.maxMoves || '∞'}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {selectedChallenge.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {selectedChallenge.instructions}
            </p>
          </div>

          {/* Target Stack Visual Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-md space-y-2">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase block">
              Goal Target Stack
            </span>
            <div className="flex flex-col-reverse gap-1.5">
              {selectedChallenge.targetStack.map((val, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-mono text-xs font-bold flex items-center justify-between shadow-sm border border-amber-400/30">
                  <span>{val}</span>
                  {idx === selectedChallenge.targetStack.length - 1 && (
                    <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-lg font-sans uppercase backdrop-blur-sm">Top</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hint Toggle */}
          <div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1.5"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
            </button>
            {showHint && (
              <p className="mt-2 p-3.5 rounded-2xl bg-white/40 dark:bg-slate-950/60 border border-white/60 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 italic backdrop-blur-md">
                {selectedChallenge.hint}
              </p>
            )}
          </div>
        </div>

        {/* Interactive Stack Canvas for Challenge (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl flex flex-col justify-between space-y-6">
          {/* Success Celebration Popup */}
          {isCompleted && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 flex items-center justify-between animate-bounce backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                <span className="font-extrabold text-sm">Challenge Solved Successfully!</span>
              </div>
              <button
                onClick={handleReset}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm hover:bg-emerald-500 transition-all"
              >
                Replay
              </button>
            </div>
          )}

          {/* Push Input Controls */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isCompleted}
              placeholder="Enter value e.g. 40"
              className="flex-1 px-4 py-2.5 rounded-2xl glass-input text-sm font-mono"
            />
            <button
              onClick={handlePush}
              disabled={isCompleted}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs inline-flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Push</span>
            </button>
            <button
              onClick={handlePop}
              disabled={isCompleted || currentStack.length === 0}
              className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs inline-flex items-center gap-1 shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>Pop</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-2xl glass-button text-slate-500 hover:text-slate-900 dark:hover:text-white"
              title="Reset Stack"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Active Stack Container */}
          <div className="p-6 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex flex-col items-center min-h-[220px] justify-end shadow-inner">
            <div className="w-64 border-x-2 border-b-2 border-amber-500/60 rounded-b-2xl p-2 flex flex-col-reverse gap-2 min-h-[160px] justify-start bg-amber-950/20 backdrop-blur-sm">
              <AnimatePresence>
                {currentStack.map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-mono text-xs font-bold flex items-center justify-between shadow-md border border-indigo-400/30"
                  >
                    <span>{val}</span>
                    {idx === currentStack.length - 1 && (
                      <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-lg font-sans uppercase backdrop-blur-sm">Top</span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {currentStack.length === 0 && (
                <p className="text-xs text-slate-500 italic text-center my-auto">Stack is empty</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
