import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Trash2, Eye, HelpCircle, Check, RefreshCw, 
  Code, Download, Play, FastForward, Sparkles, AlertCircle, ArrowUp
} from 'lucide-react';
import { StackElement, OperationLog, Language } from '../types';
import { CODE_SNIPPETS } from '../data/theoryData';
import { soundFx } from '../utils/sound';

interface StackVisualizerProps {
  isDark: boolean;
}

const COLOR_PALETTE = [
  'bg-gradient-to-r from-blue-600 to-indigo-600 border-indigo-400 text-white',
  'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-400 text-white',
  'bg-gradient-to-r from-violet-600 to-purple-600 border-purple-400 text-white',
  'bg-gradient-to-r from-amber-500 to-orange-600 border-amber-300 text-white',
  'bg-gradient-to-r from-rose-600 to-pink-600 border-pink-400 text-white',
  'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400 text-white',
  'bg-gradient-to-r from-fuchsia-600 to-pink-600 border-fuchsia-400 text-white'
];

export const StackVisualizer: React.FC<StackVisualizerProps> = ({ isDark }) => {
  // Stack State
  const [stack, setStack] = useState<StackElement[]>([
    { id: '1', value: 10, color: COLOR_PALETTE[0], timestamp: Date.now() - 3000 },
    { id: '2', value: 20, color: COLOR_PALETTE[1], timestamp: Date.now() - 2000 },
    { id: '3', value: 30, color: COLOR_PALETTE[2], timestamp: Date.now() - 1000 }
  ]);
  const [capacity, setCapacity] = useState<number>(6);
  const [inputValue, setInputValue] = useState<string>('');
  
  // Animation & Execution States
  const [speedMs, setSpeedMs] = useState<number>(600);
  const [language, setLanguage] = useState<Language>('cpp');
  const [activeOp, setActiveOp] = useState<'push' | 'pop' | 'peek' | 'isEmpty' | 'isFull' | 'none'>('none');
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [activeSteps, setActiveSteps] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
  const [peekHighlightId, setPeekHighlightId] = useState<string | null>(null);
  
  // Logs
  const [logs, setLogs] = useState<OperationLog[]>([
    {
      id: 'init-1',
      type: 'PUSH',
      value: 10,
      message: 'Initialized stack with element 10',
      timestamp: new Date().toLocaleTimeString(),
      success: true
    },
    {
      id: 'init-2',
      type: 'PUSH',
      value: 20,
      message: 'Initialized stack with element 20',
      timestamp: new Date().toLocaleTimeString(),
      success: true
    },
    {
      id: 'init-3',
      type: 'PUSH',
      value: 30,
      message: 'Initialized stack with element 30',
      timestamp: new Date().toLocaleTimeString(),
      success: true
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Helper log addition
  const addLog = (type: OperationLog['type'], message: string, value?: string | number, success: boolean = true) => {
    const newLog: OperationLog = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      value,
      message,
      timestamp: new Date().toLocaleTimeString(),
      success
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Automated step tracer runner
  const runSteps = async (
    op: 'push' | 'pop' | 'peek' | 'isEmpty' | 'isFull',
    steps: { line: number; text: string; action?: () => void }[]
  ) => {
    setActiveOp(op);
    setActiveSteps(steps.map((s) => s.text));

    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);
      setHighlightedLine(steps[i].line);
      if (steps[i].action) {
        steps[i].action!();
      }
      await new Promise((r) => setTimeout(r, speedMs));
    }

    setHighlightedLine(null);
    setCurrentStepIndex(null);
    setActiveOp('none');
  };

  // Push Operation
  const handlePush = async (overrideValue?: string | number) => {
    const valToPush = overrideValue !== undefined ? overrideValue : inputValue.trim();
    if (valToPush === '') {
      addLog('ERROR', 'Please enter a value to push into the stack', undefined, false);
      soundFx.playError();
      return;
    }

    if (stack.length >= capacity) {
      soundFx.playError();
      addLog('ERROR', `Stack Overflow! Cannot push ${valToPush}. Stack capacity (${capacity}) reached.`, valToPush, false);
      await runSteps('push', [
        { line: 0, text: 'Step 1: Execute push(' + valToPush + ')' },
        { line: 1, text: 'Step 2: Check overflow condition (top >= MAX_SIZE - 1)' },
        { line: 2, text: 'Step 3: Overflow detected! Abort Push operation.' }
      ]);
      return;
    }

    const randomColor = COLOR_PALETTE[stack.length % COLOR_PALETTE.length];
    const newElement: StackElement = {
      id: Math.random().toString(36).substring(2, 9),
      value: valToPush,
      color: randomColor,
      timestamp: Date.now()
    };

    soundFx.playPush();
    setInputValue('');

    await runSteps('push', [
      { line: 0, text: `Step 1: Called push(${valToPush})` },
      { line: 1, text: `Step 2: Verify top pointer (${stack.length - 1}) < MAX_SIZE - 1 (${capacity - 1})` },
      { line: 5, text: `Step 3: Increment top pointer: top = ${stack.length}` },
      {
        line: 6,
        text: `Step 4: Store value ${valToPush} at stack[${stack.length}]`,
        action: () => {
          setStack((prev) => [...prev, newElement]);
        }
      },
      { line: 7, text: `Step 5: Operation Complete. Pushed ${valToPush} successfully.` }
    ]);

    addLog('PUSH', `Pushed "${valToPush}" successfully to top of stack`, valToPush, true);
  };

  // Pop Operation
  const handlePop = async () => {
    if (stack.length === 0) {
      soundFx.playError();
      addLog('ERROR', 'Stack Underflow! Cannot pop from an empty stack.', undefined, false);
      await runSteps('pop', [
        { line: 0, text: 'Step 1: Execute pop()' },
        { line: 1, text: 'Step 2: Check underflow condition (top == -1)' },
        { line: 2, text: 'Step 3: Underflow detected! Stack is empty.' }
      ]);
      return;
    }

    const topItem = stack[stack.length - 1];
    soundFx.playPop();

    await runSteps('pop', [
      { line: 0, text: `Step 1: Execute pop()` },
      { line: 1, text: `Step 2: Check underflow condition (top == -1) -> False` },
      { line: 5, text: `Step 3: Fetch top element: value = "${topItem.value}"` },
      {
        line: 6,
        text: `Step 4: Decrement top pointer from ${stack.length - 1} to ${stack.length - 2}`,
        action: () => {
          setStack((prev) => prev.slice(0, prev.length - 1));
        }
      },
      { line: 7, text: `Step 5: Return popped element: "${topItem.value}"` }
    ]);

    addLog('POP', `Popped top element "${topItem.value}" from stack`, topItem.value, true);
  };

  // Peek Operation
  const handlePeek = async () => {
    if (stack.length === 0) {
      soundFx.playError();
      addLog('ERROR', 'Stack is empty! Nothing to peek at top.', undefined, false);
      await runSteps('peek', [
        { line: 0, text: 'Step 1: Execute peek()' },
        { line: 1, text: 'Step 2: Check if stack is empty (top == -1)' },
        { line: 2, text: 'Step 3: Stack is empty. Return null.' }
      ]);
      return;
    }

    const topItem = stack[stack.length - 1];
    setPeekHighlightId(topItem.id);
    soundFx.playPeek();

    await runSteps('peek', [
      { line: 0, text: `Step 1: Execute peek()` },
      { line: 1, text: `Step 2: Verify stack is not empty (top = ${stack.length - 1})` },
      { line: 5, text: `Step 3: Read value at top index stack[${stack.length - 1}] = "${topItem.value}"` }
    ]);

    setTimeout(() => setPeekHighlightId(null), 1200);
    addLog('PEEK', `Top element (Peek) is "${topItem.value}" at index ${stack.length - 1}`, topItem.value, true);
  };

  // Check isEmpty
  const handleCheckEmpty = async () => {
    const empty = stack.length === 0;
    soundFx.playClick();
    await runSteps('isEmpty', [
      { line: 0, text: 'Step 1: Execute isEmpty()' },
      { line: 1, text: `Step 2: Evaluate (top == -1) -> ${empty ? 'TRUE' : 'FALSE'}` }
    ]);
    addLog('ISEMPTY', `isEmpty() check returned ${empty ? 'TRUE (Stack is Empty)' : 'FALSE (Stack has elements)'}`, undefined, true);
  };

  // Check isFull
  const handleCheckFull = async () => {
    const full = stack.length >= capacity;
    soundFx.playClick();
    await runSteps('isFull', [
      { line: 0, text: 'Step 1: Execute isFull()' },
      { line: 1, text: `Step 2: Evaluate (top == MAX_SIZE - 1) -> ${full ? 'TRUE' : 'FALSE'}` }
    ]);
    addLog('ISFULL', `isFull() check returned ${full ? 'TRUE (Stack is Full)' : 'FALSE (Stack has space)'}`, undefined, true);
  };

  // Clear Stack
  const handleClear = () => {
    if (stack.length === 0) return;
    soundFx.playPop();
    setStack([]);
    addLog('CLEAR', 'Cleared all elements from the stack', undefined, true);
  };

  // Fill Random
  const handleFillRandom = () => {
    soundFx.playPush();
    const count = Math.min(4, capacity);
    const newItems: StackElement[] = [];
    for (let i = 0; i < count; i++) {
      const randomNum = Math.floor(Math.random() * 90) + 10;
      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        value: randomNum,
        color: COLOR_PALETTE[i % COLOR_PALETTE.length],
        timestamp: Date.now() + i
      });
    }
    setStack(newItems);
    addLog('PUSH', `Reset stack with ${count} random elements`, undefined, true);
  };

  // Export Log to Text File
  const handleExportLogs = () => {
    const content = logs
      .map((l) => `[${l.timestamp}] [${l.type}] ${l.message}`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stack_history_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle Enter keypress for quick push
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePush();
    }
  };

  // Calculate Capacity Percentage
  const capacityPct = Math.round((stack.length / capacity) * 100);

  return (
    <div className="space-y-6 py-4">
      {/* Top Controls & Configuration Dashboard with Frosted Glass Theme */}
      <div className="glass-panel p-6 rounded-3xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Action Input & Buttons */}
          <div className="flex-1 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Stack Operations Console</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Value Input */}
              <div className="relative flex-1 min-w-[160px] max-w-xs">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter value e.g. 50"
                  className="w-full px-4 py-2.5 rounded-2xl glass-input text-sm font-mono font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-inner"
                />
              </div>

              {/* Push Button */}
              <button
                onClick={() => handlePush()}
                disabled={activeOp !== 'none'}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 active:scale-95 disabled:opacity-50 border border-white/20 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Push</span>
              </button>

              {/* Pop Button */}
              <button
                onClick={handlePop}
                disabled={activeOp !== 'none' || stack.length === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-lg shadow-rose-600/30 active:scale-95 disabled:opacity-50 border border-white/20 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
                <span>Pop</span>
              </button>

              {/* Peek Button */}
              <button
                onClick={handlePeek}
                disabled={activeOp !== 'none' || stack.length === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-amber-500/30 active:scale-95 disabled:opacity-50 border border-white/20 transition-all duration-200"
              >
                <Eye className="w-4 h-4" />
                <span>Peek (Top)</span>
              </button>

              {/* Utility Checks */}
              <button
                onClick={handleCheckEmpty}
                disabled={activeOp !== 'none'}
                className="px-3.5 py-2.5 rounded-2xl font-semibold text-xs glass-button text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/60 transition-all"
              >
                isEmpty
              </button>

              <button
                onClick={handleCheckFull}
                disabled={activeOp !== 'none'}
                className="px-3.5 py-2.5 rounded-2xl font-semibold text-xs glass-button text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/60 transition-all"
              >
                isFull
              </button>

              <button
                onClick={handleClear}
                disabled={activeOp !== 'none' || stack.length === 0}
                className="p-2.5 rounded-2xl font-semibold text-xs glass-button text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                title="Clear Stack"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Configurations Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/40 dark:border-white/10 lg:pl-6">
            {/* Stack Capacity Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Max Capacity: {capacity}
              </label>
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/30 dark:bg-slate-800/30 border border-white/40 dark:border-white/10 backdrop-blur-md">
                {[3, 5, 6, 8, 10].map((cap) => (
                  <button
                    key={cap}
                    onClick={() => {
                      setCapacity(cap);
                      if (stack.length > cap) {
                        setStack((prev) => prev.slice(0, cap));
                      }
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 ${
                      capacity === cap
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Control */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Anim Speed
              </label>
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/30 dark:bg-slate-800/30 border border-white/40 dark:border-white/10 backdrop-blur-md">
                {[
                  { label: '0.5x', speed: 1000 },
                  { label: '1x', speed: 600 },
                  { label: '2x', speed: 300 }
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSpeedMs(s.speed)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 ${
                      speedMs === s.speed
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout: Canvas Visualizer + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Stack Stage (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel flex flex-col justify-between min-h-[480px] relative overflow-hidden">
          {/* Header Status & Capacity Meter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Visual Stack Container
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  (Size: {stack.length} / {capacity})
                </span>
              </div>

              {/* Fill Preset Button */}
              <button
                onClick={handleFillRandom}
                disabled={activeOp !== 'none'}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Random Fill</span>
              </button>
            </div>

            {/* Capacity Progress Meter */}
            <div className="w-full h-2 rounded-full bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/5 overflow-hidden relative backdrop-blur-md">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  capacityPct >= 100
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500'
                    : capacityPct >= 70
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                }`}
                style={{ width: `${capacityPct}%` }}
              />
            </div>
          </div>

          {/* Interactive Stack Visualization Tube */}
          <div className="my-6 flex-1 flex flex-col items-center justify-end relative">
            {/* Pointer Indicator on Right */}
            {stack.length > 0 && (
              <motion.div
                layout
                className="absolute right-4 sm:right-12 z-20 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs font-mono"
                style={{
                  bottom: `${(stack.length - 1) * 56 + 28}px`
                }}
              >
                <span className="animate-pulse bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-lg border border-indigo-500/30 backdrop-blur-md shadow-sm">
                  ← TOP ({stack.length - 1})
                </span>
              </motion.div>
            )}

            {/* Container Cylinder with Frosted Glass Aesthetics */}
            <div 
              className={`w-64 sm:w-80 border-x-4 border-b-4 rounded-b-3xl p-3 flex flex-col-reverse gap-2 relative transition-all duration-300 backdrop-blur-md shadow-xl ${
                capacityPct >= 100 
                  ? 'border-rose-500/80 bg-rose-500/10' 
                  : 'border-indigo-500/80 bg-white/20 dark:bg-slate-900/30'
              }`}
              style={{
                minHeight: `${capacity * 56 + 24}px`
              }}
            >
              <AnimatePresence mode="popLayout">
                {stack.map((item, index) => {
                  const isTop = index === stack.length - 1;
                  const isPeeked = peekHighlightId === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ y: -80, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -100, opacity: 0, scale: 0.8 }}
                      transition={{ duration: speedMs / 1000, ease: 'easeInOut' }}
                      className={`w-full py-3.5 px-4 rounded-2xl border font-mono font-bold text-sm flex items-center justify-between shadow-md backdrop-blur-md transition-all ${
                        item.color
                      } ${
                        isPeeked
                          ? 'ring-4 ring-amber-400 ring-offset-2 dark:ring-offset-slate-900 scale-105 shadow-amber-500/30'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] opacity-75 font-sans bg-black/20 px-1.5 py-0.5 rounded-lg">
                          [{index}]
                        </span>
                        <span>{item.value}</span>
                      </div>

                      {isTop && (
                        <span className="text-[10px] font-sans font-extrabold uppercase tracking-wider bg-white/25 text-white px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/30">
                          Top
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Empty Placeholder */}
              {stack.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-6 text-center space-y-2">
                  <ArrowUp className="w-8 h-8 animate-bounce opacity-40 text-indigo-500" />
                  <p className="text-xs font-semibold">Stack is Empty</p>
                  <p className="text-[11px] opacity-75">Click "Push" or enter a value above</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Info Footer */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-white/40 dark:border-white/10">
            <span>Index 0 = Bottom of Stack</span>
            <span>LIFO Order: Pop removes top item</span>
          </div>
        </div>

        {/* Algorithm Code & Step Tracer Side Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Code Visualization & Line Highlighter */}
          <div className="glass-card p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-500" />
                <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Algorithm Code
                </span>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-white/40 dark:bg-slate-800/40 p-1 rounded-xl border border-white/60 dark:border-white/10 backdrop-blur-md">
                {(['cpp', 'python', 'javascript'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      language === lang
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {lang === 'cpp' ? 'C++' : lang === 'python' ? 'Py' : 'JS'}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Lines Display */}
            <div className="bg-slate-950/80 backdrop-blur-md text-slate-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto border border-white/10 space-y-0.5 min-h-[180px] shadow-inner">
              {CODE_SNIPPETS[language][activeOp === 'none' ? 'push' : activeOp].map((line, idx) => {
                const isHighlighted = highlightedLine === idx;
                return (
                  <div
                    key={idx}
                    className={`flex items-center px-2 py-1 rounded-lg transition-colors ${
                      isHighlighted
                        ? 'bg-indigo-600/60 text-amber-300 font-bold border-l-2 border-amber-400 pl-2 shadow-sm'
                        : 'hover:bg-slate-900/50 text-slate-400'
                    }`}
                  >
                    <span className="w-6 text-[10px] text-slate-600 select-none">
                      {idx + 1}
                    </span>
                    <span>{line}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Step Explanation Console */}
          <div className="glass-card p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Step-by-Step Explanation
              </span>
              {activeOp !== 'none' && (
                <span className="text-[10px] font-semibold text-indigo-500 animate-pulse">
                  Executing...
                </span>
              )}
            </div>

            <div className="space-y-2 min-h-[120px]">
              {activeSteps.length === 0 ? (
                <p className="text-xs text-slate-400 italic">
                  Perform a stack operation above to view step-by-step trace execution...
                </p>
              ) : (
                activeSteps.map((stepText, idx) => {
                  const isCurrent = currentStepIndex === idx;
                  const isDone = currentStepIndex !== null && currentStepIndex > idx;

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl text-xs font-medium border transition-all flex items-start gap-2.5 backdrop-blur-md ${
                        isCurrent
                          ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-900 dark:text-indigo-200 shadow-sm'
                          : isDone
                          ? 'bg-white/20 dark:bg-slate-800/20 border-white/20 dark:border-white/5 text-slate-500 opacity-70'
                          : 'bg-transparent border-transparent text-slate-400'
                      }`}
                    >
                      {isCurrent ? (
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 animate-ping" />
                      ) : isDone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 mt-1.5 shrink-0" />
                      )}
                      <span>{stepText}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Operation History Log */}
          <div className="glass-card p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Operation History
              </span>
              <button
                onClick={handleExportLogs}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export TXT</span>
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`p-2.5 rounded-xl text-xs border font-mono flex items-center justify-between backdrop-blur-sm ${
                    !log.success
                      ? 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300'
                      : log.type === 'PUSH'
                      ? 'bg-indigo-500/10 border-indigo-500/20 text-slate-800 dark:text-slate-200'
                      : 'bg-white/30 dark:bg-slate-800/30 border-white/40 dark:border-white/5 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold ${
                      log.type === 'PUSH' ? 'bg-indigo-600 text-white' :
                      log.type === 'POP' ? 'bg-rose-600 text-white' :
                      log.type === 'PEEK' ? 'bg-amber-500 text-white' :
                      'bg-slate-600 text-white'
                    }`}>
                      {log.type}
                    </span>
                    <span className="truncate max-w-[180px] sm:max-w-[220px]">
                      {log.message}
                    </span>
                  </div>
                  <span className="text-[10px] opacity-60 text-slate-400">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
