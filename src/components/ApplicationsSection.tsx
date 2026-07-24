import React, { useState } from 'react';
import { 
  Globe, ArrowLeft, ArrowRight, RotateCcw, 
  CheckCircle2, XCircle, Play, RefreshCw, Cpu
} from 'lucide-react';
import { soundFx } from '../utils/sound';

interface ApplicationsSectionProps {
  isDark: boolean;
}

export const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<'browser' | 'undo' | 'parentheses' | 'callstack'>('browser');

  // --- 1. Browser Navigation Stacks State ---
  const [backStack, setBackStack] = useState<string[]>(['google.com', 'github.com', 'wikipedia.org']);
  const [currentPage, setCurrentPage] = useState<string>('ai.studio');
  const [forwardStack, setForwardStack] = useState<string[]>([]);
  const [newPageUrl, setNewPageUrl] = useState<string>('');

  const handleVisit = () => {
    if (!newPageUrl.trim()) return;
    soundFx.playPush();
    setBackStack((prev) => [...prev, currentPage]);
    setCurrentPage(newPageUrl.trim());
    setForwardStack([]);
    setNewPageUrl('');
  };

  const handleBrowserBack = () => {
    if (backStack.length === 0) return;
    soundFx.playPop();
    const prevPage = backStack[backStack.length - 1];
    setBackStack((prev) => prev.slice(0, prev.length - 1));
    setForwardStack((prev) => [...prev, currentPage]);
    setCurrentPage(prevPage);
  };

  const handleBrowserForward = () => {
    if (forwardStack.length === 0) return;
    soundFx.playPush();
    const nextPage = forwardStack[forwardStack.length - 1];
    setForwardStack((prev) => prev.slice(0, prev.length - 1));
    setBackStack((prev) => [...prev, currentPage]);
    setCurrentPage(nextPage);
  };

  // --- 2. Undo / Redo Stacks State ---
  const [editorText, setEditorText] = useState<string>('Hello Stack Visualizer!');
  const [undoStack, setUndoStack] = useState<string[]>(['Hello', 'Hello Stack', 'Hello Stack Visualizer!']);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const handleTextChange = (val: string) => {
    setEditorText(val);
    setUndoStack((prev) => [...prev, val]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length <= 1) return;
    soundFx.playPop();
    const current = undoStack[undoStack.length - 1];
    const prevText = undoStack[undoStack.length - 2];
    setUndoStack((prev) => prev.slice(0, prev.length - 1));
    setRedoStack((prev) => [...prev, current]);
    setEditorText(prevText);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    soundFx.playPush();
    const nextText = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, prev.length - 1));
    setUndoStack((prev) => [...prev, nextText]);
    setEditorText(nextText);
  };

  // --- 3. Parentheses Matcher State ---
  const [parenInput, setParenInput] = useState<string>('{ [ a + ( b * c ) ] }');
  const [parenSteps, setParenSteps] = useState<{ char: string; stackState: string[]; msg: string }[]>([]);
  const [parenResult, setParenResult] = useState<{ isValid: boolean; message: string } | null>(null);

  const handleCheckParentheses = () => {
    const chars = parenInput.split('');
    const tempStack: string[] = [];
    const steps: { char: string; stackState: string[]; msg: string }[] = [];
    let isBalanced = true;
    let failReason = '';

    const matchingPair: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (['(', '[', '{'].includes(ch)) {
        tempStack.push(ch);
        steps.push({
          char: ch,
          stackState: [...tempStack],
          msg: `Push opening bracket "${ch}" onto stack`
        });
      } else if ([')', ']', '}'].includes(ch)) {
        if (tempStack.length === 0) {
          isBalanced = false;
          failReason = `Unmatched closing bracket "${ch}" at index ${i}`;
          steps.push({
            char: ch,
            stackState: [...tempStack],
            msg: `Error: Stack is empty when closing bracket "${ch}" appeared!`
          });
          break;
        }

        const top = tempStack[tempStack.length - 1];
        if (top === matchingPair[ch]) {
          tempStack.pop();
          steps.push({
            char: ch,
            stackState: [...tempStack],
            msg: `Matched "${top}" with "${ch}" -> Popped "${top}" from stack`
          });
        } else {
          isBalanced = false;
          failReason = `Mismatched bracket: top "${top}" does not pair with "${ch}"`;
          steps.push({
            char: ch,
            stackState: [...tempStack],
            msg: `Error: Top "${top}" mismatch with "${ch}"!`
          });
          break;
        }
      }
    }

    if (isBalanced && tempStack.length > 0) {
      isBalanced = false;
      failReason = `Unclosed brackets remaining in stack: ${tempStack.join(', ')}`;
    }

    setParenSteps(steps);
    setParenResult({
      isValid: isBalanced,
      message: isBalanced ? 'Expression is perfectly balanced!' : failReason
    });

    if (isBalanced) {
      soundFx.playSuccess();
    } else {
      soundFx.playError();
    }
  };

  // --- 4. Call Stack Recursion Visualizer State ---
  const [numFact, setNumFact] = useState<number>(4);
  const [callStackFrames, setCallStackFrames] = useState<{ frame: string; val?: number; status: string }[]>([]);
  const [isSimulatingCall, setIsSimulatingCall] = useState(false);

  const handleSimulateFactorial = async () => {
    setIsSimulatingCall(true);
    setCallStackFrames([]);

    // Push phase
    const frames: { frame: string; val?: number; status: string }[] = [];
    for (let i = numFact; i >= 1; i--) {
      soundFx.playPush();
      frames.unshift({ frame: `factorial(${i})`, status: 'Pushed to Call Stack' });
      setCallStackFrames([...frames]);
      await new Promise((r) => setTimeout(r, 600));
    }

    // Base case frame
    soundFx.playPeek();
    frames[0].status = 'Base case reached! Returning 1';
    setCallStackFrames([...frames]);
    await new Promise((r) => setTimeout(r, 800));

    // Pop phase (Unwinding)
    let currentAns = 1;
    for (let i = 1; i <= numFact; i++) {
      soundFx.playPop();
      currentAns = currentAns * i;
      frames.shift();
      setCallStackFrames([...frames]);
      await new Promise((r) => setTimeout(r, 600));
    }

    soundFx.playSuccess();
    setIsSimulatingCall(false);
  };

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      {/* Intro Header */}
      <div className="glass-panel p-8 rounded-3xl">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
          Interactive Real-World Stack Applications
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Try live interactive demonstrations of how browsers, text editors, expression checkers, and function call stacks utilize LIFO logic.
        </p>

        {/* Demo Selector Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { id: 'browser', label: '1. Browser Navigation', icon: <Globe className="w-4 h-4" /> },
            { id: 'undo', label: '2. Undo / Redo Stacks', icon: <RotateCcw className="w-4 h-4" /> },
            { id: 'parentheses', label: '3. Balanced Parentheses', icon: <CheckCircle2 className="w-4 h-4" /> },
            { id: 'callstack', label: '4. Function Call Stack', icon: <Cpu className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20'
                  : 'glass-button text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* DEMO 1: Browser Navigation Dual Stacks */}
      {activeTab === 'browser' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Browser History Back & Forward Buttons
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Browsers maintain two stacks: <strong className="text-indigo-600 dark:text-indigo-400">Back Stack</strong> and <strong className="text-violet-600 dark:text-violet-400">Forward Stack</strong>.
            </p>
          </div>

          {/* Browser Address Bar & Controls */}
          <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/50 border border-white/60 dark:border-white/10 backdrop-blur-md flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleBrowserBack}
                disabled={backStack.length === 0}
                className="p-2.5 rounded-xl glass-button text-slate-700 dark:text-slate-200 disabled:opacity-40 hover:bg-white/80 dark:hover:bg-slate-700 transition-all"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleBrowserForward}
                disabled={forwardStack.length === 0}
                className="p-2.5 rounded-xl glass-button text-slate-700 dark:text-slate-200 disabled:opacity-40 hover:bg-white/80 dark:hover:bg-slate-700 transition-all"
                title="Go Forward"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Current Active URL display */}
            <div className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl bg-white/60 dark:bg-slate-950/60 border border-white/60 dark:border-white/10 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span className="text-slate-400">https://</span>
              <span className="text-indigo-600 dark:text-indigo-400">{currentPage}</span>
            </div>

            {/* Visit new URL input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newPageUrl}
                onChange={(e) => setNewPageUrl(e.target.value)}
                placeholder="Visit e.g. stackoverflow.com"
                className="glass-input px-3.5 py-2 rounded-xl text-xs font-mono"
              />
              <button
                onClick={handleVisit}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs hover:opacity-95 shadow-sm"
              >
                Visit
              </button>
            </div>
          </div>

          {/* Dual Stack Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Back Stack */}
            <div className="p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-950/20 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                <span>Back Stack ({backStack.length})</span>
                <span>Top = Last Visited</span>
              </div>
              <div className="space-y-1.5 min-h-[140px] flex flex-col-reverse">
                {backStack.map((url, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-xs font-mono font-semibold flex items-center justify-between shadow-sm border border-indigo-400/30">
                    <span>{url}</span>
                    <span className="text-[10px] opacity-75">[{idx}]</span>
                  </div>
                ))}
                {backStack.length === 0 && (
                  <p className="text-xs text-indigo-400 italic text-center py-8">Back Stack is Empty</p>
                )}
              </div>
            </div>

            {/* Forward Stack */}
            <div className="p-5 rounded-2xl border border-violet-500/20 bg-violet-500/5 dark:bg-violet-950/20 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider">
                <span>Forward Stack ({forwardStack.length})</span>
                <span>Top = Next Page</span>
              </div>
              <div className="space-y-1.5 min-h-[140px] flex flex-col-reverse">
                {forwardStack.map((url, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-mono font-semibold flex items-center justify-between shadow-sm border border-violet-400/30">
                    <span>{url}</span>
                    <span className="text-[10px] opacity-75">[{idx}]</span>
                  </div>
                ))}
                {forwardStack.length === 0 && (
                  <p className="text-xs text-violet-400 italic text-center py-8">Forward Stack is Empty</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEMO 2: Text Editor Undo / Redo */}
      {activeTab === 'undo' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Text Editor Undo & Redo History
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Every document snapshot is pushed onto an <strong className="text-indigo-600 dark:text-indigo-400">Undo Stack</strong>. Hitting Undo pops the state and pushes it to the <strong className="text-purple-600 dark:text-purple-400">Redo Stack</strong>.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleUndo}
                disabled={undoStack.length <= 1}
                className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs disabled:opacity-40 inline-flex items-center gap-1.5 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Undo (Pop Undo Stack)</span>
              </button>

              <button
                onClick={handleRedo}
                disabled={redoStack.length === 0}
                className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs disabled:opacity-40 inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Redo (Pop Redo Stack)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={4}
              value={editorText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Type text here to push states into the undo stack..."
              className="w-full p-4 rounded-2xl glass-input text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl glass-card space-y-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Undo Stack History ({undoStack.length})
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {undoStack.map((s, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-indigo-500/10 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 font-mono text-xs truncate border border-indigo-500/20">
                    [{idx}] "{s}"
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card space-y-2">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Redo Stack History ({redoStack.length})
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {redoStack.map((s, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-purple-500/10 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200 font-mono text-xs truncate border border-purple-500/20">
                    [{idx}] "{s}"
                  </div>
                ))}
                {redoStack.length === 0 && (
                  <p className="text-xs text-slate-400 italic">Redo stack is empty</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEMO 3: Balanced Parentheses Checker */}
      {activeTab === 'parentheses' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Compiler Syntax: Parentheses Matching
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Opening brackets <code className="text-indigo-500 font-bold">( [ {"{"}</code> are pushed onto stack; closing brackets trigger pop matching checks.
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={parenInput}
              onChange={(e) => setParenInput(e.target.value)}
              placeholder="e.g. { [ a + b ] * ( c + d ) }"
              className="flex-1 px-4 py-2.5 rounded-2xl glass-input text-sm font-mono"
            />
            <button
              onClick={handleCheckParentheses}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs shadow-sm"
            >
              Verify Parentheses
            </button>
          </div>

          {/* Result Banner */}
          {parenResult && (
            <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 backdrop-blur-md ${
              parenResult.isValid
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200'
            }`}>
              {parenResult.isValid ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-rose-500" />}
              <span>{parenResult.message}</span>
            </div>
          )}

          {/* Trace Steps */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {parenSteps.map((step, idx) => (
              <div key={idx} className="p-3 rounded-2xl glass-card text-xs flex items-center justify-between font-mono">
                <span>{step.msg}</span>
                <span className="px-2.5 py-1 rounded-xl bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-500/20">
                  Stack: [{step.stackState.join(', ')}]
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DEMO 4: Function Call Stack */}
      {activeTab === 'callstack' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Recursive Function Call Stack Execution
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Simulates calling <code className="text-indigo-500 font-bold">factorial(n)</code> recursively pushing stack frames and unwinding return values.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Factorial Number n = {numFact}
            </label>
            <input
              type="range"
              min="2"
              max="6"
              value={numFact}
              onChange={(e) => setNumFact(Number(e.target.value))}
              disabled={isSimulatingCall}
              className="accent-indigo-600"
            />
            <button
              onClick={handleSimulateFactorial}
              disabled={isSimulatingCall}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs disabled:opacity-50 inline-flex items-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Simulate Call Stack</span>
            </button>
          </div>

          {/* Call Stack Visual Tube */}
          <div className="p-6 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex flex-col items-center min-h-[220px] justify-end shadow-inner">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Engine Call Stack (Top = Active Frame)
            </div>
            <div className="w-72 border-x-2 border-b-2 border-indigo-500/60 rounded-b-2xl p-2 flex flex-col gap-2 min-h-[160px] justify-end bg-indigo-950/20 backdrop-blur-sm">
              {callStackFrames.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-mono text-xs font-bold flex items-center justify-between shadow-md border border-indigo-400/30"
                >
                  <span>{item.frame}</span>
                  <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-lg font-sans backdrop-blur-sm">
                    {item.status}
                  </span>
                </div>
              ))}
              {callStackFrames.length === 0 && (
                <p className="text-xs text-slate-500 italic text-center my-auto">Call stack is empty</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
