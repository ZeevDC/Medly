import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Flame, 
  Clock, 
  AlertOctagon, 
  CheckCircle,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Maximize2,
  RefreshCw,
  Award,
  Zap
} from 'lucide-react';
import { PatternPuzzle } from '../types';

export default function DrillModes() {
  const [subTab, setSubTab] = useState<'burnout' | 'induction'>('burnout');

  // --- 1. Burnout Simulator States ---
  const [examState, setExamState] = useState<'intro' | 'active' | 'completed'>('intro');
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes for demo sprint, can adjust
  const [selectedAnswers, setSelectedAnswers] = useState<{ [id: number]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{ [id: number]: boolean }>({});
  
  // Security violations (Mettl simulation)
  const [blurredAlertCount, setBlurredAlertCount] = useState(0);
  const [showBlurredBanner, setShowBlurredBanner] = useState(false);

  // Mettl questions
  const mockBurnoutQuestions = [
    {
      id: 1,
      part: 'Mental Ability (Quantitative)',
      question: 'A pharmacist wishes to prepare 100 mL of a 10% saline solution by mixing a 5% saline solution with a 15% saline solution. How many milliliters of the 15% saline solution must be utilized?',
      options: ['25 mL', '50 mL', '75 mL', '40 mL'],
      correctAnsIdx: 1,
      explanation: 'Using the mixture formula: C1*V1 + C2*V2 = C_final * V_final.\nLet x be the volume of the 15% solution. Thus, the 5% solution volume is (100 - x).\n0.15*(x) + 0.05*(100 - x) = 0.10 * 100 => 0.15x - 0.05x + 5 = 10` => 0.10x = 5 => x = 50 mL. Option B is correct.'
    },
    {
      id: 2,
      part: 'Academic Proficiency (Chemistry)',
      question: 'Which thermodynamics variable is defined as the measure of the thermal disorder or randomness within a chemical reaction or system?',
      options: ['Enthalpy (H)', 'Gibbs Free Energy (G)', 'Entropy (S)', 'Helmholtz Free Energy (A)'],
      correctAnsIdx: 2,
      explanation: 'Entropy (S) is the standardized thermodynamic quantification of disorder and molecular microstates within a system. High disorder corresponds to high positive entropy.'
    },
    {
      id: 3,
      part: 'Mental Ability (Verbal)',
      question: 'Identify the word synonymous with "EPHEMERAL":',
      options: ['Endless', 'Transient', 'Profound', 'Meticulous'],
      correctAnsIdx: 1,
      explanation: 'Ephemeral means lasting for a very short time. Transient is an exact synonym (temporary, fleeting).'
    }
  ];

  // Monitor Window Blurs (to simulate Mettl anti-cheat browser blocks)
  useEffect(() => {
    const handleBlur = () => {
      if (examState === 'active') {
        setBlurredAlertCount(prev => prev + 1);
        setShowBlurredBanner(true);
      }
    };

    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('blur', handleBlur);
    };
  }, [examState]);

  // Exam timer
  useEffect(() => {
    if (examState !== 'active') return;
    if (timeRemaining <= 0) {
      setExamState('completed');
      return;
    }
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [examState, timeRemaining]);

  const handleStartExam = () => {
    setExamState('active');
    setTimeRemaining(150); // 2 mins 30s
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setBlurredAlertCount(0);
    setShowBlurredBanner(false);
  };

  const selectAnswer = (ansIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [activeQuestion]: ansIdx
    }));
  };

  const toggleFlagQuestion = () => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [activeQuestion]: !prev[activeQuestion]
    }));
  };

  // Score Calculations
  const calculateResultScore = () => {
    let score = 0;
    mockBurnoutQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnsIdx) {
        score += 1;
      }
    });
    return Math.floor((score / mockBurnoutQuestions.length) * 100);
  };


  // --- 2. Inductive Reasoning Sandbox States ---
  const [activePuzzleIndex, setActivePuzzleIndex] = useState(0);
  const [selectedPuzzleOption, setSelectedPuzzleOption] = useState<number | null>(null);
  const [revealedPuzzleExplanation, setRevealedPuzzleExplanation] = useState(false);

  const inductivePuzzles: PatternPuzzle[] = [
    {
      id: 'ind-1',
      instructions: 'Examine the rotating clock-hand sequence, and deduce which figure satisfies the rotating progress logic:',
      figures: [
        '▲ (Up: 0°)',
        '▶ (Right: 90°)',
        '▼ (Down: 180°)',
        '◀ (Left: 270°)',
        '?'
      ],
      options: ['◀ (Left)', '▲ (Up)', '▶ (Right)', '▼ (Down)'],
      correctOptionIndex: 1,
      explanation: 'The pattern rotates clockwise by exactly 90 degrees each transition (0° -> 90° -> 180° -> 270° -> 360°/0°). The 5th position completes the full circle, restoring the arrow to Up (Option B).'
    },
    {
      id: 'ind-2',
      instructions: 'Evaluate the dot progression in the geometric block sequence. Block contains (Rows x Columns) count. Item counts grow by odd sequences:',
      figures: [
        '● (1 dot)',
        '●●● (3 dots)',
        '●●●●● (5 dots)',
        '●●●●●●● (7 dots)',
        '?'
      ],
      options: ['●●●● (4 dots)', '●●●●●●●● (8 dots)', '●●●●●●●●● (9 dots)', '●●●●●● (6 dots)'],
      correctOptionIndex: 2,
      explanation: 'The progression consists of consecutive odd integers: 1, 3, 5, 7. The next value in this sequence is 9 dots (Option C).'
    }
  ];

  const handleNextPuzzle = () => {
    setSelectedPuzzleOption(null);
    setRevealedPuzzleExplanation(false);
    setActivePuzzleIndex(prev => (prev < inductivePuzzles.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-6 text-xs font-sans">
      
      {/* Sub menu */}
      <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 rounded-xl max-w-sm">
        <button
          onClick={() => setSubTab('burnout')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-center transition-all cursor-pointer ${
            subTab === 'burnout' ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100/50' : 'text-slate-550 hover:text-slate-700'
          }`}
        >
          Burnout Simulator
        </button>
        <button
          onClick={() => setSubTab('induction')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-center transition-all cursor-pointer ${
            subTab === 'induction' ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100/50' : 'text-slate-550 hover:text-slate-700'
          }`}
        >
          Inductive Sandbox
        </button>
      </div>

      {/* 2. TAB A: Burnout Mettl Simulator */}
      {subTab === 'burnout' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 font-sans flex items-center space-x-2">
              <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
              <span>NMAT Fatigue "Burnout" Simulator</span>
            </h2>
            <p className="text-xs text-slate-400">Lock yourself into a strict simulated testing terminal representing the extreme 4-hour fatigue structure of the Philippine online NMAT. Anti-blur triggers track if you leave the page!</p>
          </div>

          {examState === 'intro' && (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 max-w-xl mx-auto text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <AlertOctagon className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <h3 className="font-extrabold text-slate-800 text-sm">Strict Mettl Secure Browser Simulator</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  Real NMAT online checks utilize facial recognition and window locks. If you click outside the exam screen or open another tab, security alerts compile! Learn to stay completely focused under pressure.
                </p>
              </div>

              {/* Warnings and setup */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-white p-2.5 rounded-lg border text-[10px] text-slate-600">
                  🚫 <strong>Pausing Disabled:</strong> No pausing allowed once initiated.
                </div>
                <div className="bg-white p-2.5 rounded-lg border text-[10px] text-slate-600">
                  ⚠️ <strong>Window Blur Alert:</strong> Leaving the focus area increments alerts.
                </div>
              </div>

              <div>
                <button
                  onClick={handleStartExam}
                  className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-all inline-flex items-center space-x-1"
                >
                  <Maximize2 className="w-3.5 h-3.5 mr-1 text-white" />
                  <span>Start Mock Simulator</span>
                </button>
              </div>
            </div>
          )}

          {examState === 'active' && (
            <div className="space-y-4">
              {/* Security Alert Header */}
              {showBlurredBanner && (
                <div className="p-3 bg-red-100 border-l-4 border-red-650 text-red-950 rounded-lg animate-bounce flex items-start space-x-2">
                  <AlertOctagon className="w-4 h-4 text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-xs">Mettl Security Violation Triggered!</h4>
                    <p className="text-[10px] text-red-800">
                      WARNING: You clicked off this page or lost focus! CEM security tracks page blurs. Current blurs logged: <strong className="text-red-950 underline">{blurredAlertCount} times</strong>. Avoid switching tabs!
                    </p>
                  </div>
                </div>
              )}

              {/* Status information panel */}
              <div className="flex justify-between items-center p-3 bg-slate-900 text-slate-100 border border-slate-950 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400">METTL SECURE MONITOR</span>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-red-400 font-extrabold">Blurs Logged: {blurredAlertCount}</span>
                  <div className="flex items-center space-x-1 text-amber-400 font-extrabold text-xs bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Time Left: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>
              </div>

              {/* Exam active item card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-150 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 bg-slate-100 border rounded font-semibold text-[10px] text-slate-500 uppercase tracking-wider">
                    {mockBurnoutQuestions[activeQuestion].part}
                  </span>
                  
                  <button
                    onClick={toggleFlagQuestion}
                    className={`px-2.5 py-1 rounded font-bold text-[10px] border cursor-pointer ${
                      flaggedQuestions[activeQuestion] 
                        ? 'bg-amber-100 border-amber-300 text-amber-800' 
                        : 'bg-slate-50 text-slate-500'
                    }`}
                  >
                    {flaggedQuestions[activeQuestion] ? '★ Flagged' : '☆ Flag for Review'}
                  </button>
                </div>

                <div className="pt-2">
                  <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-relaxed">
                    Question #{mockBurnoutQuestions[activeQuestion].id}: {mockBurnoutQuestions[activeQuestion].question}
                  </h3>
                </div>

                {/* Options list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {mockBurnoutQuestions[activeQuestion].options.map((option, idx) => {
                    const isSelected = selectedAnswers[activeQuestion] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => selectAnswer(idx)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-rose-50 border-rose-350 text-rose-900 font-bold' 
                            : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-slate-650'
                        }`}
                      >
                        <span className="font-extrabold mr-1">{String.fromCharCode(65 + idx)})</span> {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex space-x-1.5">
                  {mockBurnoutQuestions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveQuestion(i)}
                      className={`w-7 h-7 rounded-lg font-bold border text-xs cursor-pointer ${
                        activeQuestion === i 
                          ? 'bg-slate-900 border-slate-950 text-white' 
                          : selectedAnswers[i] !== undefined 
                            ? 'bg-emerald-50 border-emerald-250 text-emerald-800' 
                            : 'bg-white text-slate-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <div className="flex space-x-2">
                  {activeQuestion > 0 && (
                    <button
                      onClick={() => setActiveQuestion(prev => prev - 1)}
                      className="px-3.5 py-1.5 border border-slate-205 rounded-lg text-slate-700 font-bold cursor-pointer"
                    >
                      Back
                    </button>
                  )}
                  {activeQuestion < mockBurnoutQuestions.length - 1 ? (
                    <button
                      onClick={() => setActiveQuestion(prev => prev + 1)}
                      className="px-3.5 py-1.5 bg-slate-900 border border-slate-950 text-white rounded-lg font-bold cursor-pointer"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={() => setExamState('completed')}
                      className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-extrabold cursor-pointer"
                    >
                      Submit Exam
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {examState === 'completed' && (
            <div className="p-6 bg-white border border-emerald-150 rounded-2xl max-w-md mx-auto text-center space-y-5 animate-scale-up">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" />
              </div>

              <div>
                <h3 className="font-extrabold text-slate-805 text-base sm:text-lg">Simulation Score Report</h3>
                <p className="text-xs text-slate-400 mt-1">Excellent focus! You finished the timed burnout sprint sprint.</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-500">Raw Performance Score:</span>
                  <span className="font-extrabold text-slate-800">{calculateResultScore()}% Correct</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-500">Mettl Security Status:</span>
                  <span className={`font-extrabold ${blurredAlertCount > 2 ? 'text-red-650' : 'text-emerald-700'}`}>
                    {blurredAlertCount} Blurs - {blurredAlertCount > 2 ? 'Disqualified' : 'Secure and Verified'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-500">Synthesized PR Percentile:</span>
                  <span className="font-bold text-slate-800">{10 * mockBurnoutQuestions.filter((q, i) => selectedAnswers[i] === q.correctAnsIdx).length + 65}+ Rank</span>
                </div>
              </div>

              {/* Explanations expander */}
              <div className="space-y-3 pt-2 text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Review incorrect questions:</span>
                {mockBurnoutQuestions.map((q, idx) => (
                  <div key={q.id} className="p-3 bg-slate-50/50 rounded-lg border border-slate-100 text-xs">
                    <p className="font-bold text-slate-800 mb-1 leading-snug">Q{idx+1}: {q.question.substring(0, 45)}...</p>
                    <p className="text-[10px] text-slate-600">{q.explanation}</p>
                  </div>
                ))}
              </div>

              <div>
                <button
                  onClick={() => setExamState('intro')}
                  className="px-5 py-2 rounded-xl bg-slate-900 border border-slate-950 text-white font-bold text-xs cursor-pointer"
                >
                  Retake Simulator
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. TAB B: Inductive Reasoning Sandbox */}
      {subTab === 'induction' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 font-sans flex items-center space-x-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              <span>Inductive Reasoning Sandbox Loops</span>
            </h2>
            <p className="text-xs text-slate-400">Practice spatial progression sequences dynamically to train abstract thinking for Part 1 of the NMAT.</p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-150 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">PATTERN MATCHING MODULE</span>
                <p className="font-bold text-slate-800 text-xs sm:text-sm mt-1 max-w-xl">
                  {inductivePuzzles[activePuzzleIndex].instructions}
                </p>
              </div>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                Puzzle {activePuzzleIndex + 1} of {inductivePuzzles.length}
              </span>
            </div>

            {/* Figures Display Stage */}
            <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto py-5 bg-white p-4 rounded-xl border border-slate-150 text-center font-sans">
              {inductivePuzzles[activePuzzleIndex].figures.map((fig, idx) => (
                <div key={idx} className="p-3 border border-slate-100 bg-slate-50/55 rounded-xl space-y-1.5 flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Box {idx + 1}</span>
                  <span className="font-extrabold text-sm sm:text-base text-slate-800">{fig}</span>
                </div>
              ))}
            </div>

            {/* Options choices */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 block">Select the logical matching option:</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {inductivePuzzles[activePuzzleIndex].options.map((opt, oIdx) => {
                  const isCorrect = oIdx === inductivePuzzles[activePuzzleIndex].correctOptionIndex;
                  const isSelected = selectedPuzzleOption === oIdx;
                  let optStyle = 'bg-white border-slate-205 hover:bg-slate-50 text-slate-700';

                  if (selectedPuzzleOption !== null) {
                    if (isCorrect) optStyle = 'bg-green-100 border-green-400 text-green-900 font-bold';
                    else if (isSelected) optStyle = 'bg-red-100 border-red-405 text-red-950 font-bold';
                    else optStyle = 'bg-white border-slate-100 opacity-60';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={selectedPuzzleOption !== null}
                      onClick={() => {
                        setSelectedPuzzleOption(oIdx);
                        setRevealedPuzzleExplanation(true);
                      }}
                      className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${optStyle}`}
                    >
                      <span className="font-extrabold block text-[10px] text-slate-400">Option {String.fromCharCode(65 + oIdx)}</span>
                      <span className="font-bold text-xs block mt-1">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation box */}
            {revealedPuzzleExplanation && (
              <div className="p-4 rounded-xl border bg-indigo-50 border-indigo-150 animate-fade-in-up">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-xs text-indigo-950">Spatial Pattern Logic</h4>
                    <p className="text-indigo-900 mt-1 leading-relaxed">
                      {inductivePuzzles[activePuzzleIndex].explanation}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleNextPuzzle}
                    className="px-4 py-2 bg-slate-900 border border-slate-950 text-white rounded-xl font-bold flex items-center space-x-1 cursor-pointer hover:bg-slate-800 transition-all text-xs"
                  >
                    <span>Try Next Pattern Loop</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
