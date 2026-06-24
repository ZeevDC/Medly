import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Shield, Clock, RotateCcw, Check, CheckCircle2, XCircle } from 'lucide-react';
import { getDrillQuestions } from '../data/drillQuestions';

interface Question {
  id: string;
  subject: string;
  remedialTopic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface WarningLog {
  id: string;
  subject: string;
  consecutiveFailCount: number;
  alertLvl: 'High Danger' | 'Moderate Warning' | 'Low Risk';
  lastFailureDate: string;
  remedialTopic: string;
}

interface ClinicalPracticeProps {
  solvedDrills: number;
  setSolvedDrills: (val: number) => void;
  failedAnswersLogs: WarningLog[];
  setFailedAnswersLogs: React.Dispatch<React.SetStateAction<WarningLog[]>>;
  userSuite?: string;
  onViewPremium?: () => void;
}

export default function ClinicalPractice({
  solvedDrills,
  setSolvedDrills,
  failedAnswersLogs,
  setFailedAnswersLogs,
  userSuite = 'Free Student Tier',
  onViewPremium,
}: ClinicalPracticeProps) {
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [timedSprint, setTimedSprint] = useState(true);
  
  // Game state
  const [sprintActive, setSprintActive] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [sprintScore, setSprintScore] = useState(0);
  const [consecutiveMisses, setConsecutiveMisses] = useState(0);

  const isLocked = userSuite === 'Free Student Tier';

  if (isLocked) {
    return (
      <div className="bg-white border border-slate-105 rounded-[24px] p-8 text-center max-w-md mx-auto my-12 space-y-5 shadow-xs animate-fade-in" id="clinical-drills-premium-barrier">
        <div className="w-16 h-16 bg-indigo-50 text-[#1b4cb4] rounded-full flex items-center justify-center mx-auto border border-indigo-100">
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#1b4cb4] bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-150">
            PRO SUITE EXCLUSIVE
          </span>
          <h3 className="text-lg font-extrabold text-slate-800">Clinical Practice Drills Locked</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Randomized, adaptive, 60-second timed clinical practice drills with socratic rationale breakdowns are exclusive to <strong className="text-[#1b4cb4]">Pro Suite</strong>, <strong className="text-[#1b4cb4]">Clinical Suite</strong>, and <strong className="text-indigo-950">Lifetime Pass</strong> candidates.
          </p>
          <p className="text-[11px] text-slate-400 italic">
            Your current level: <span className="text-rose-600 font-extrabold">{userSuite}</span>
          </p>
        </div>
        <button
          onClick={onViewPremium}
          className="w-full py-3 bg-gradient-to-r from-rose-600 to-[#1b4cb4] text-white hover:opacity-90 transition-all font-black text-xs rounded-xl shadow-xs cursor-pointer uppercase tracking-wider"
        >
          View Comparative Blueprints & Upgrade
        </button>
      </div>
    );
  }

  const subjectsList = [
    'All Subjects',
    'Biology',
    'Physics',
    'Chemistry',
    'Social Science',
    'Verbal Aptitude',
    'Inductive Reasoning',
    'Quantitative Reasoning',
    'Perceptual Acuity'
  ];

  // Generate exactly 50 high-yield, premium MCQs for the selected subject
  const currentSubjectPool = React.useMemo(() => {
    return getDrillQuestions(selectedSubject);
  }, [selectedSubject]);

  const activeQuestion: Question = currentSubjectPool[currentIdx % currentSubjectPool.length];

  // 60-seconds Timed countdown timer
  useEffect(() => {
    let interval: any = null;
    if (sprintActive && timedSprint && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setSprintActive(false);
            alert(`Timed Sprint completed! You solved ${sprintScore} items in 60 seconds.`);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sprintActive, timeLeft, timedSprint, sprintScore]);

  const startPracticeSprint = () => {
    setSprintActive(true);
    setTimeLeft(60);
    setSprintScore(0);
    setConsecutiveMisses(0);
    setSelectedAns(null);
    setShowExplanation(false);
    setCurrentIdx(0);
  };

  const handleOptionSelect = (optLetter: string) => {
    if (selectedAns !== null) return;
    setSelectedAns(optLetter);
    setShowExplanation(true);

    const isCorrect = optLetter === activeQuestion.correctAnswer;
    
    if (isCorrect) {
      setSprintScore(prev => prev + 1);
      setSolvedDrills(solvedDrills + 1);
      setConsecutiveMisses(0);
    } else {
      setConsecutiveMisses(prev => prev + 1);
      
      // Increment solved as an attempted Practice item
      setSolvedDrills(solvedDrills + 1);

      // Add a dynamic Warning Log to Diagnostic Weakspots!
      const currentConsecutiveMisses = consecutiveMisses + 1;
      const isHighDanger = currentConsecutiveMisses >= 2;

      // Add warning trigger
      const newTrigger: WarningLog = {
        id: `trig-${Date.now()}`,
        subject: activeQuestion.subject,
        consecutiveFailCount: currentConsecutiveMisses,
        alertLvl: isHighDanger ? 'High Danger' : 'Moderate Warning',
        lastFailureDate: 'Today (Just now)',
        remedialTopic: activeQuestion.remedialTopic
      };

      setFailedAnswersLogs(prev => [newTrigger, ...prev]);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAns(null);
    setShowExplanation(false);
    setCurrentIdx(prev => prev + 1);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="clinical-practice-wrapper">
      
      {/* Top Config Card */}
      <div className="bg-white rounded-[24px] border border-slate-100 p-5 sm:p-6 shadow-xs">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#1b4cb4]">MEDLY CLINICAL ENGINE</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-1.5">
              <Sparkles className="w-5.5 h-5.5 text-yellow-500 animate-pulse" /> Randomized Adaptive Practice Drills
            </h2>
            <p className="text-xs text-slate-450 font-medium">Difficulty: <strong className="text-sky-600 font-extrabold uppercase">RANDOM (Always Auto-Shunted)</strong> • Model: <strong className="text-indigo-600">GEMINI PRO SUITE</strong></p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTimedSprint(!timedSprint)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                timedSprint ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-slate-50 text-slate-650'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{timedSprint ? '60s Sprint ON' : 'Unlimited Mode'}</span>
            </button>

            {!sprintActive ? (
              <button
                onClick={startPracticeSprint}
                className="px-5 py-2 bg-[#1b4cb4] hover:bg-[#133e9d] text-white font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Sprint</span>
              </button>
            ) : (
              <button
                onClick={() => setSprintActive(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl cursor-pointer"
              >
                End Session
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50 mt-4">
          {subjectsList.map(sub => (
            <button
              key={sub}
              disabled={sprintActive}
              onClick={() => {
                setSelectedSubject(sub);
                setCurrentIdx(0);
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-black transition-all ${
                selectedSubject === sub
                  ? 'bg-sky-50 border-sky-300 text-sky-850'
                  : 'bg-white border-slate-205 text-slate-600 hover:bg-slate-50 disabled:opacity-40'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {sprintActive ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Question panel (Col span 8) */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[24px] p-5 sm:p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-[10px] uppercase font-black text-slate-450">
                ACTIVE FOCUS DRILL QUESTION {currentIdx + 1}
              </span>
              {timedSprint && (
                <div className="flex items-center gap-1 text-slate-700 bg-slate-50 px-2.5 py-1 rounded-xl font-mono text-xs">
                  <Clock className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  <span>Sprint Timer: <strong className="text-rose-600 font-bold">{timeLeft}s</strong></span>
                </div>
              )}
            </div>

            <p className="text-sm font-black text-slate-800 leading-relaxed">
              {activeQuestion.question}
            </p>

            <div className="space-y-2 pt-2">
              {activeQuestion.options.map((opt) => {
                const letter = opt.substring(0, 1);
                const isSelected = selectedAns === letter;
                const isCorrect = letter === activeQuestion.correctAnswer;
                const isWrongSelection = isSelected && !isCorrect;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleOptionSelect(letter)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition-all relative flex justify-between items-center ${
                      selectedAns !== null
                        ? isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-black'
                          : isWrongSelection
                            ? 'bg-red-50 border-red-300 text-red-950 font-black'
                            : 'bg-slate-50 border-slate-150 text-slate-400 opacity-60'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-705'
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedAns !== null && isCorrect && <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />}
                    {selectedAns !== null && isWrongSelection && <XCircle className="w-4.5 h-4.5 text-red-600" />}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="pt-4 border-t border-slate-105 space-y-2">
                <span className="text-[10px] font-black uppercase text-indigo-600 block">Socratic Rationale Breakdown</span>
                <p className="text-[11px] text-slate-655 leading-relaxed bg-[#FAF5FF] border border-purple-100 p-3 rounded-xl">
                  {activeQuestion.explanation}
                </p>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-lg cursor-pointer"
                  >
                    Load Next Active Recall Card
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stats Bar (Col span 4) */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-[24px] p-5 sm:p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="block text-[10px] font-black uppercase text-slate-400">SESSION DIAGNOSTICS</span>
              
              <div className="space-y-3 font-semibold text-xs border-b pb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Correct Sprint Answers</span>
                  <span className="font-bold text-slate-800">{sprintScore} Items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Consecutive Misses</span>
                  <span className={`font-bold ${consecutiveMisses > 0 ? 'text-red-600' : 'text-slate-850'}`}>{consecutiveMisses} Misses</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Practice Category</span>
                  <span className="font-extrabold text-sky-700 bg-sky-50 px-2 py-0.5 rounded text-[10px]">{selectedSubject}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1 border border-slate-100 text-[10px] leading-relaxed text-slate-500">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-indigo-500" /> System Warning Trigger
                </p>
                <p>Answering 2 consecutive questions incorrectly will automatically post a Red Flag Weakspot indicator log directly into your main diagnostic feed.</p>
              </div>
            </div>

            <button
              onClick={() => setSprintActive(false)}
              className="mt-6 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
            >
              Pause Practice Run
            </button>
          </div>

        </div>
      ) : (
        <div className="text-center py-10 px-6 bg-white border border-slate-100 rounded-[24px] max-w-lg mx-auto space-y-3">
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <h4 className="font-black text-slate-805 text-sm">Practice Drills Idle State</h4>
          <p className="text-xs text-slate-405 leading-relaxed">
            Choose your focus NMAT subject, toggle the timed sprint option, and click <strong>Start Sprint</strong>. Each session runs a high-integrity simulation tracking cognitive fatigue thresholds.
          </p>
          <button
            onClick={startPracticeSprint}
            className="px-6 py-2 bg-indigo-650 hover:bg-[#1b4cb4] bg-[#1b4cb4] text-white font-extrabold text-xs rounded-xl"
          >
            Launch Timing Engine
          </button>
        </div>
      )}
    </div>
  );
}
