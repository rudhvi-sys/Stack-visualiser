import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, Check } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { soundFx } from '../utils/sound';

interface QuizSectionProps {
  isDark: boolean;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ isDark }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (submitted) return;
    soundFx.playClick();
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(userAnswers).length < QUIZ_QUESTIONS.length) {
      if (!window.confirm('You have unanswered questions. Submit anyway?')) {
        return;
      }
    }

    setSubmitted(true);
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    if (correctCount >= QUIZ_QUESTIONS.length * 0.7) {
      soundFx.playSuccess();
    } else {
      soundFx.playError();
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const total = QUIZ_QUESTIONS.length;
  const score = calculateScore();
  const scorePct = Math.round((score / total) * 100);

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      {/* Quiz Header & Score Banner */}
      <div className="glass-panel p-8 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/15 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20 backdrop-blur-md">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Stack Data Structure Quiz
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Test your knowledge of LIFO principles, operations, overflow/underflow, and time complexity.
              </p>
            </div>
          </div>

          {submitted && (
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-bold uppercase tracking-wider">Score</span>
                <span className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400 font-mono">
                  {score} / {total} ({scorePct}%)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Question Cards */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selectedOption = userAnswers[q.id];
          const isCorrect = selectedOption === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="glass-card p-6 rounded-3xl space-y-4"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      Question {idx + 1} of {total}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md border ${
                      q.difficulty === 'Easy' ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/20' :
                      q.difficulty === 'Medium' ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/20' :
                      'bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/20'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    {q.question}
                  </h3>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  let optStyle = 'glass-button text-slate-700 dark:text-slate-300';

                  if (submitted) {
                    if (optIdx === q.correctAnswer) {
                      optStyle = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-900 dark:text-emerald-200 font-bold backdrop-blur-md';
                    } else if (isThisSelected && !isCorrect) {
                      optStyle = 'bg-rose-500/15 border-rose-500/40 text-rose-900 dark:text-rose-200 line-through backdrop-blur-md';
                    }
                  } else if (isThisSelected) {
                    optStyle = 'bg-indigo-500/20 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold backdrop-blur-md shadow-sm';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={submitted}
                      className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      {submitted && isThisSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submitted Explanation Box */}
              {submitted && (
                <div className="mt-4 p-4 rounded-2xl bg-white/40 dark:bg-slate-950/60 border border-white/60 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 space-y-1 backdrop-blur-md">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 block">Explanation:</span>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit / Retry Controls */}
      <div className="flex items-center justify-center gap-4 pt-4">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="px-8 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white shadow-lg shadow-indigo-600/25 transition-all"
          >
            Submit Quiz Answers
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-2xl font-bold text-xs glass-button text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-700 transition-all inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        )}
      </div>
    </div>
  );
};
