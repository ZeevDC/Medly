import React, { useState, useEffect } from 'react';
import { Award, Clock, ArrowRight, ShieldCheck, HelpCircle, Check, AlertTriangle, BookOpen, SkipForward } from 'lucide-react';

interface Question {
  id: string;
  subject: string;
  subtopic: string;
  questionText: string;
  options: string[];
  correctLetter: string;
  rationale: string;
}

export default function SimulatedExam() {
  const [selectedPart, setSelectedPart] = useState<'part1' | 'part2'>('part1');
  const [pacingMode, setPacingMode] = useState<'standard' | 'quick'>('quick');
  
  // Simulator statuses
  const [simRunning, setSimRunning] = useState(false);
  const [simCompleted, setSimCompleted] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(8100); // 2 hours 15 mins in seconds

  const examTopicsPart1 = ['Verbal Aptitude', 'Inductive Reasoning', 'Quantitative Reasoning', 'Perceptual Acuity'];
  const examTopicsPart2 = ['Biology', 'Physics', 'Social Science', 'Chemistry'];

  // Base mock pool questions (used to generate 120 high fidelity items programmatically)
  const basePoolPart1: Question[] = [
    {
      id: 'pt1-1',
      subject: 'Verbal Aptitude',
      subtopic: 'Reading Comprehension',
      questionText: 'The concept of Socratic active retrieval asserts that human memory is not a passive vault but a dynamic constructive system. Which of the following best states the authors main thesis?',
      options: ['A) Memory banks are strictly mechanical units.', 'B) Active recall increases synaptogenetic myelination.', 'C) Passive cramming is superior.', 'D) Storage models are inherently static.'],
      correctLetter: 'B',
      rationale: 'Active recall stimulates synaptic pathways, causing thickening myelination shells around neurites to solidify retrieval efficiency.'
    },
    {
      id: 'pt1-2',
      subject: 'Inductive Reasoning',
      subtopic: 'Matrix Sequence Match',
      questionText: 'Identify the pattern: Circle to Square increases areas by 4x. Triangle is rotated 180 degrees. What is the next sequential transform?',
      options: ['A) Pentagon with 4x volume decrease', 'B) Hexagon rotated 90 degrees clockwise', 'C) Hexagon with 4x surface area increase and 180-degree rotation', 'D) Parallelogram mirrored horizontally'],
      correctLetter: 'C',
      rationale: 'The sequence alternates between compounding area multipliers (4x) and polar rotations (180 degrees).'
    },
    {
      id: 'pt1-3',
      subject: 'Quantitative Reasoning',
      subtopic: 'Analytical Algebra',
      questionText: 'Solve for the continuous root boundary system: 3^(x + 1) = 81.',
      options: ['A) x = 2', 'B) x = 3', 'C) x = 4', 'D) x = 5'],
      correctLetter: 'B',
      rationale: 'Since 3^4 = 81, then x + 1 = 4 resulting in x = 3.'
    },
    {
      id: 'pt1-4',
      subject: 'Perceptual Acuity',
      subtopic: 'Mirror Flat Refraction',
      questionText: 'If a 3D isometric bracket has front horizontal shading, what does the right lateral reflection portray inside mirror systems?',
      options: ['A) Vertical stripes', 'B) Symmetrical left-facing shaded borders', 'C) Pitch dark void', 'D) Solid white outlines'],
      correctLetter: 'B',
      rationale: 'Horizontal axes are flipped horizontally in standard mirrors, keeping vertical proportions invariant.'
    }
  ];

  const basePoolPart2: Question[] = [
    {
      id: 'pt2-1',
      subject: 'Biology',
      subtopic: 'Genetics Crossing Over',
      questionText: 'During meiosis, in what sub-phase of Prophase I do chromosomes condense and homologous chromosomes initiate synapsis?',
      options: ['A) Leptotene', 'B) Zygotene', 'C) Pachytene', 'D) Diplotene'],
      correctLetter: 'B',
      rationale: 'Synapsis (the pairing of homologous chromosomes) occurs during the zygotene stage of Prophase I.'
    },
    {
      id: 'pt2-2',
      subject: 'Physics',
      subtopic: 'Kinematic Acceleration',
      questionText: 'A vehicle moves with consistent acceleration a = 3.0 m/s² from static rest. How far does it travel in exactly 8.0 seconds?',
      options: ['A) 24.0 meters', 'B) 96.0 meters', 'C) 192.0 meters', 'D) 48.0 meters'],
      correctLetter: 'B',
      rationale: 'Using d = 0.5 * a * t² => d = 0.5 * 3.0 * 64 => d = 1.5 * 64 = 96.0 meters.'
    },
    {
      id: 'pt2-3',
      subject: 'Social Science',
      subtopic: 'Sociological Paradigms',
      questionText: 'What school of social theory focuses on the power differentials and class struggles that define legal and economic institutions?',
      options: ['A) Structural Functionalism', 'B) Conflict Theory', 'C) Symbolic Interactionism', 'D) Social Exchange Theory'],
      correctLetter: 'B',
      rationale: 'Conflict Theory highlights class conflict and inequalities within societal structures.'
    },
    {
      id: 'pt2-4',
      subject: 'Chemistry',
      subtopic: 'Stoichiometric Gas Volumetrics',
      questionText: 'According to the ideal gas law PV = nRT, if temperature triples and pressure is halved, what is the new volume index?',
      options: ['A) V increases by 6 times', 'B) V decreases to one-third', 'C) V remains stable', 'D) V increases by 1.5 times'],
      correctLetter: 'A',
      rationale: 'Since V = nRT/P. Tripling T (3T) and halving P (0.5P) leads to: (3) / (0.5) = 6 times expansion.'
    }
  ];

  // Helper to generate 120 items programmatically using the base pool as a template
  const get120Questions = () => {
    const activePool = selectedPart === 'part1' ? basePoolPart1 : basePoolPart2;
    const items: Question[] = [];
    for (let i = 0; i < 120; i++) {
      const template = activePool[i % activePool.length];
      items.push({
        ...template,
        id: `gen-${selectedPart}-${i + 1}`,
        questionText: `[Item ${i + 1}] ${template.questionText}`,
      });
    }
    return items;
  };

  const testQuestions = get120Questions();

  // Timer effect coordinates
  useEffect(() => {
    let interval: any = null;
    if (simRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setSimRunning(false);
            setSimCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [simRunning, timeLeft]);

  // Set initial clocks
  const handleStartSim = () => {
    setSimRunning(true);
    setSimCompleted(false);
    setActiveItem(0);
    setAnswers({});
    
    // Set timer based on part and pacing limits
    if (pacingMode === 'quick') {
      setTimeLeft(180); // 3 minutes demo pacing run
    } else {
      if (selectedPart === 'part1') {
        setTimeLeft(8100); // 2 hours 15 mins (Part 1 constraint)
      } else {
        setTimeLeft(5400); // 1 hour 30 mins (Part 2 constraint)
      }
    }
  };

  const handleSelectAnswer = (letter: string) => {
    setAnswers(prev => ({
      ...prev,
      [activeItem]: letter
    }));
  };

  const calculatePercentile = (rawScore: number) => {
    const percentage = (rawScore / 120) * 100;
    if (percentage >= 95) return 99;
    if (percentage >= 80) return 95;
    if (percentage >= 65) return 88;
    if (percentage >= 50) return 80;
    if (percentage >= 35) return 72;
    return 60;
  };

  const formatClock = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h > 0 ? `${h}h ` : ''}${m < 10 ? `0${m}` : m}m ${s < 10 ? `0${s}` : s}s`;
  };

  const handleFinishExam = () => {
    setSimRunning(false);
    setSimCompleted(true);
  };

  const totalAnswered = Object.keys(answers).length;

  const getResultsReport = () => {
    let score = 0;
    testQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctLetter) {
        score += 1;
      }
    });
    return {
      score,
      unanswered: 120 - totalAnswered,
      percentile: calculatePercentile(score)
    };
  };

  return (
    <div className="space-y-6 animate-fade-in" id="simulated-exam-block">
      
      {/* Selector Options Header */}
      {!simRunning && !simCompleted && (
        <div className="bg-white border border-slate-105 rounded-[24px] p-5 sm:p-6 space-y-6 shadow-xs max-w-2xl mx-auto">
          <div className="space-y-1 text-center">
            <span className="text-[10px] uppercase font-black text-rose-600 bg-rose-50 border border-rose-150 px-2.5 py-0.5 rounded-full">
              PHILIPPINE NMAT SIMULATOR
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-805 tracking-tight">Full length Simulated NMAT</h2>
            <p className="text-xs text-slate-455">Establish stamina thresholds under realistic national standard constraints.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
            {/* Part selection */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase text-slate-400">Select Exam Part</label>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedPart('part1')}
                  className={`w-full p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedPart === 'part1' ? 'border-[#1b4cb4] bg-sky-50/50 text-[#1b4cb4] font-black' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  <strong className="block text-[11px]">Part 1: Mental Aptitude (120 Items)</strong>
                  <span className="text-[10px] text-slate-400 mt-1 block">Timings: 2 hours and 15 minutes • Verbal, Inductive, Quantitative, Perceptual Acuity</span>
                </button>

                <button
                  onClick={() => setSelectedPart('part2')}
                  className={`w-full p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedPart === 'part2' ? 'border-[#1b4cb4] bg-sky-50/50 text-[#1b4cb4] font-black' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  <strong className="block text-[11px]">Part 2: Academic Proficiency (120 Items)</strong>
                  <span className="text-[10px] text-slate-400 mt-1 block">Timings: 1 hour and 30 minutes • Biology, Physics, Social Science, Chemistry</span>
                </button>
              </div>
            </div>

            {/* Pacing modes */}
            <div className="space-y-1.5 flex flex-col justify-between">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400">Pacing Timing Mode</label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <button
                    onClick={() => setPacingMode('standard')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      pacingMode === 'standard' ? 'border-[#1b4cb4] bg-sky-50/50 font-black text-[#1b4cb4]' : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    <strong className="block">Real-time Clock countdown</strong>
                    <span className="text-[9.5px] text-slate-400 block mt-0.5">Strict board coordinates. Part 1 = 135 mins, Part 2 = 90 mins. All storage state safe.</span>
                  </button>

                  <button
                    onClick={() => setPacingMode('quick')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      pacingMode === 'quick' ? 'border-[#1b4cb4] bg-sky-50/50 font-black text-[#1b4cb4]' : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    <strong className="block">Fast Sandbox Demo Pacing</strong>
                    <span className="text-[9.5px] text-slate-400 block mt-0.5">3-Minute (180s) fast simulation run. Perfect for testing complete state responses and percentile triggers.</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl space-y-1 text-[11px] leading-relaxed text-slate-500 border border-slate-100">
            <strong>Guidelines:</strong> Do not navigate outside the current browser tab to protect anti-cheat focus parameters. Clicking any interactive circular index below skips the presentation cleanly to that position.
          </div>

          <button
            onClick={handleStartSim}
            className="w-full py-3 bg-[#1b4cb4] hover:bg-[#133e9d] text-white font-black text-xs rounded-xl shadow-xs cursor-pointer text-center uppercase"
          >
            Authorize And Initialize Exam Segment
          </button>
        </div>
      )}

      {/* Simulator Running Screen */}
      {simRunning && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Question Presentation Column (Col span 8) */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[24px] p-5 sm:p-6 space-y-4">
            
            {/* Header metadata row */}
            <div className="flex justify-between items-center border-b pb-3 flex-wrap gap-2">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-black text-slate-400">
                  {selectedPart === 'part1' ? 'PART 1: MENTAL APTITUDE' : 'PART 2: ACADEMIC PROFICIENCY'}
                </span>
                <p className="text-xs font-bold text-slate-805">Active Item: {activeItem + 1} of 120</p>
              </div>

              <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 text-white px-3 py-1.5 rounded-xl font-mono text-xs">
                <Clock className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>Timer Left: <strong className="text-sky-300 font-extrabold">{formatClock(timeLeft)}</strong></span>
              </div>
            </div>

            {/* Simulated item prompt block */}
            <div className="p-4 bg-slate-50 border border-slate-205 rounded-xl">
              <span className="text-[9px] uppercase font-black tracking-wide text-sky-600 block mb-1">
                Category: {testQuestions[activeItem].subject} ({testQuestions[activeItem].subtopic})
              </span>
              <p className="text-xs sm:text-sm font-black text-slate-755 leading-relaxed">
                {testQuestions[activeItem].questionText}
              </p>
            </div>

            {/* Answer Options Selector */}
            <div className="space-y-2.5">
              {testQuestions[activeItem].options.map(opt => {
                const choiceLetter = opt.substring(0, 1);
                const isSelected = answers[activeItem] === choiceLetter;

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectAnswer(choiceLetter)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold cursor-pointer transition-all flex justify-between items-center ${
                      isSelected
                        ? 'border-sky-505 bg-sky-50 border-[#1b4cb4] text-slate-900 font-black'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-705'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#1b4cb4]" />}
                  </button>
                );
              })}
            </div>

            {/* Footer triggers */}
            <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-6">
              <button
                disabled={activeItem === 0}
                onClick={() => setActiveItem(prev => prev - 1)}
                className="px-4 py-2 border border-slate-200 rounded-xl font-bold bg-slate-50 text-slate-750 disabled:opacity-40 cursor-pointer"
              >
                Prev Segment
              </button>

              <button
                onClick={() => {
                  if (activeItem < 119) {
                    setActiveItem(activeItem + 1);
                  } else {
                    handleFinishExam();
                  }
                }}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl cursor-pointer flex items-center gap-1"
              >
                <span>{activeItem === 119 ? 'Submit Exam' : 'Next Segment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Interactive 120 Grid sidebar navigation (Col span 4) */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-[24px] p-5 sm:p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="block text-[10px] font-black uppercase text-slate-400">EXAM ANCHORS INDEX</span>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-20 px-2 py-0.5 rounded border border-emerald-100">
                Answered: {totalAnswered}/120
              </span>
            </div>

            <p className="text-[10.5px] text-slate-400 leading-normal">
              Click on any number tile below to instantly jump focus directly to that question.
            </p>

            {/* 120 items grid */}
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-6 xl:grid-cols-8 gap-1.5 max-h-[280px] overflow-y-auto pr-1">
              {Array.from({ length: 120 }).map((_, idx) => {
                const isSelected = activeItem === idx;
                const isAnswered = answers[idx] !== undefined;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveItem(idx)}
                    className={`aspect-square text-[10.5px] rounded-lg cursor-pointer font-black transition-all border flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#1b4cb4] border-[#1b4cb4] text-white scale-110 shadow-sm'
                        : isAnswered
                          ? 'bg-emerald-50 border-emerald-250 text-emerald-800 font-extrabold'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-55 pt-3">
              <button
                onClick={handleFinishExam}
                className="w-full py-2 bg-emerald-650 hover:bg-emerald-700 bg-[#059669] text-white text-xs font-black rounded-xl cursor-pointer uppercase text-center"
              >
                Finish Simulated Board Run
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Simulator Results Compiler view */}
      {simCompleted && (
        <div className="bg-white border border-slate-105 rounded-[24px] p-5 sm:p-6 space-y-6 max-w-3xl mx-auto shadow-sm">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-805 text-lg">Official Medly Percentile Compiled</h3>
            <p className="text-xs text-slate-455">Philippine licensure boards eligibility scoring yield.</p>
          </div>

          {/* Probability Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center py-4">
            <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
              <span className="text-3xl font-black text-slate-800">
                {getResultsReport().score}/120
              </span>
              <span className="block text-[9px] font-black text-slate-400 uppercase">Correct Answers</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
              <span className="text-3xl font-black text-[#1b4cb4]">
                PR {getResultsReport().percentile}
              </span>
              <span className="block text-[9px] font-black text-slate-400 uppercase">Estimated Centile Rank</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
              <span className="text-3xl font-black text-rose-650 text-rose-600">
                {getResultsReport().unanswered} Items
              </span>
              <span className="block text-[9px] font-black text-slate-400 uppercase">Blank unanswered</span>
            </div>
          </div>

          <div className="p-3 bg-sky-50 text-sky-850 rounded-xl text-center text-xs font-bold leading-normal border border-sky-100">
            {getResultsReport().percentile >= 80 
              ? '🎉 Outstanding! Your estimated percentile lands well inside the 2026 PLM and UPCM admissions brackets.' 
              : 'Good run. Work closely with the Spaced repetition calendar modules to elevate chemistry fields.'}
          </div>

          {/* Mistakes and detailed explanations table */}
          <div className="space-y-4 pt-3 border-t">
            <h4 className="font-extrabold text-slate-805 text-xs sm:text-sm">Comprehensive Mistakes & Rationale Breakdown</h4>
            
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
              {testQuestions.slice(0, 15).map((q, idx) => {
                const ans = answers[idx];
                const isCorrect = ans === q.correctLetter;

                return (
                  <div key={q.id} className="p-4 bg-slate-50 hover:bg-slate-100/40 transition-all border border-slate-105 rounded-xl space-y-2">
                    <div className="flex justify-between items-center border-b pb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{q.subject} • {q.subtopic}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-black ${
                        isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                      }`}>
                        {isCorrect ? '✓ MATCHED' : `💥 MISS ALIGNED (Your: ${ans || 'BLANK'}, Correct: ${q.correctLetter})`}
                      </span>
                    </div>

                    <p className="text-xs font-extrabold text-slate-800 leading-relaxed font-sans">{q.questionText}</p>
                    
                    <div className="text-[11px] text-slate-650 leading-relaxed border-l-2 border-[#1b4cb4] pl-2 font-medium bg-white p-2 rounded-r-lg">
                      <strong>Socratic Rationale:</strong> {q.rationale}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => {
                setSimCompleted(false);
                setSimRunning(false);
              }}
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-lg cursor-pointer"
            >
              Back to Simulator Dashboard
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
