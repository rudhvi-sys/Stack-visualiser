import React, { useState } from 'react';
import { 
  BookOpen, Clock, ShieldCheck, ShieldAlert, Code, 
  Layers, CheckCircle2, AlertCircle, Copy, Check 
} from 'lucide-react';
import { Language } from '../types';
import { COMPLEXITY_TABLE, ADVANTAGES_DISADVANTAGES, CODE_SNIPPETS } from '../data/theoryData';

interface TheorySectionProps {
  isDark: boolean;
}

export const TheorySection: React.FC<TheorySectionProps> = ({ isDark }) => {
  const [selectedLang, setSelectedLang] = useState<Language>('cpp');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    const snippets = CODE_SNIPPETS[selectedLang];
    const fullCode = [
      `// === Stack Operations in ${selectedLang.toUpperCase()} ===`,
      '// 1. Push Operation',
      snippets.push.join('\n'),
      '\n// 2. Pop Operation',
      snippets.pop.join('\n'),
      '\n// 3. Peek (Top) Operation',
      snippets.peek.join('\n'),
      '\n// 4. isEmpty Check',
      snippets.isEmpty.join('\n')
    ].join('\n');

    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 py-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/15 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20 backdrop-blur-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Stack Data Structure Theory & Implementation
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comprehensive reference guide, characteristics, complexity matrix, and source implementations
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          A <strong className="font-semibold text-slate-800 dark:text-slate-100">Stack</strong> is a linear data structure that follows the <strong className="font-semibold text-indigo-600 dark:text-indigo-400">LIFO (Last In, First Out)</strong> principle. All insertions (push) and deletions (pop) take place strictly at one end called the <code className="px-2 py-0.5 rounded-lg bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-white/10 font-mono text-indigo-600 dark:text-indigo-300">top</code>.
        </p>
      </div>

      {/* Core Characteristics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-2 transition-transform duration-200 hover:-translate-y-1">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
            01
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            Single Entry/Exit Point
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Unlike double-ended queues or arbitrary linked lists, elements enter and exit strictly through the top index pointer.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-2 transition-transform duration-200 hover:-translate-y-1">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">
            02
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            Array or Linked List Backing
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Can be implemented statically via fixed arrays (subject to max capacity limits) or dynamically using linked list nodes.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-2 transition-transform duration-200 hover:-translate-y-1">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-amber-400/15 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/20">
            03
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            Reversal Property
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Because of LIFO order, pushing a sequence of items and popping them immediately reverses the order of elements.
          </p>
        </div>
      </div>

      {/* Time & Space Complexity Table */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Time & Space Complexity Table
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/40 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-white/20 dark:bg-slate-800/20 backdrop-blur-md">
                <th className="py-3 px-4">Operation</th>
                <th className="py-3 px-4">Average Time</th>
                <th className="py-3 px-4">Worst Time</th>
                <th className="py-3 px-4">Space Complexity</th>
                <th className="py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20 dark:divide-white/5 text-xs font-mono">
              {COMPLEXITY_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/30 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">
                    {row.operation}
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                    {row.average}
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                    {row.worst}
                  </td>
                  <td className="py-3 px-4 font-bold text-violet-600 dark:text-violet-400">
                    {row.space}
                  </td>
                  <td className="py-3 px-4 font-sans text-slate-600 dark:text-slate-400 max-w-xs">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Implementations Tabbed Block */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Source Code Implementation
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/40 dark:bg-slate-800/40 p-1 rounded-2xl border border-white/60 dark:border-white/10 backdrop-blur-md">
              {(['cpp', 'python', 'javascript'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    selectedLang === lang
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lang === 'cpp' ? 'C++' : lang === 'python' ? 'Python' : 'JavaScript'}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3.5 py-1.5 rounded-2xl text-xs font-semibold glass-button text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/60 transition-all inline-flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* Code Snippet Container */}
        <div className="bg-slate-950/80 backdrop-blur-md text-slate-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-white/10 space-y-4 shadow-inner">
          <div>
            <span className="text-slate-500 text-[10px] block mb-1">// 1. Push Operation</span>
            <pre className="text-emerald-400">{CODE_SNIPPETS[selectedLang].push.join('\n')}</pre>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block mb-1">// 2. Pop Operation</span>
            <pre className="text-rose-400">{CODE_SNIPPETS[selectedLang].pop.join('\n')}</pre>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block mb-1">// 3. Peek (Top) Operation</span>
            <pre className="text-amber-300">{CODE_SNIPPETS[selectedLang].peek.join('\n')}</pre>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block mb-1">// 4. isEmpty Operation</span>
            <pre className="text-sky-300">{CODE_SNIPPETS[selectedLang].isEmpty.join('\n')}</pre>
          </div>
        </div>
      </div>

      {/* Advantages vs Disadvantages Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Advantages of Stacks</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            {ADVANTAGES_DISADVANTAGES.advantages.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-sm shadow-emerald-500" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
            <AlertCircle className="w-5 h-5" />
            <span>Disadvantages & Limitations</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
            {ADVANTAGES_DISADVANTAGES.disadvantages.map((dis, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0 shadow-sm shadow-rose-500" />
                <span>{dis}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
