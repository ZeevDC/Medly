import React, { useState } from 'react';
import { Sparkles, Calendar, BookOpen, BrainCircuit, ShieldAlert, Check } from 'lucide-react';

interface SpacedInterval {
  week: number;
  subjectAM: string;
  topicAM: string;
  subjectPM: string;
  topicPM: string;
  recallDate1: string;
  recallDate2: string;
}

interface SpacedRepetitionCoachProps {
  userSuite?: string;
  onViewPremium?: () => void;
}

export default function SpacedRepetitionCoach({ userSuite = 'Free Student Tier', onViewPremium }: SpacedRepetitionCoachProps) {
  const [examDate, setExamDate] = useState('2026-11-15');
  const [dailyHours, setDailyHours] = useState('3');
  const [preferredDays, setPreferredDays] = useState<string[]>(['Mon', 'Wed', 'Fri', 'Sat']);
  const [schedule, setSchedule] = useState<SpacedInterval[]>([]);
  const [coachRhythm, setCoachRhythm] = useState('Interleaved Blocks');

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const isLocked = false;

  if (isLocked) {
    return (
      <div className="bg-white border border-slate-105 rounded-[24px] p-8 text-center max-w-md mx-auto my-12 space-y-5 shadow-xs animate-fade-in" id="spaced-coach-premium-barrier">
        <div className="w-16 h-16 bg-indigo-50 text-[#1b4cb4] rounded-full flex items-center justify-center mx-auto border border-indigo-100">
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#1b4cb4] bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-150">
            CLINICAL SUITE EXCLUSIVE
          </span>
          <h3 className="text-lg font-extrabold text-slate-800">Spaced Repetition Coach Locked</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Formulating dynamic, interleaved, retrieval-practice calendars is exclusive to <strong className="text-[#1b4cb4]">Clinical Suite</strong> and <strong className="text-indigo-950">Lifetime Pass</strong> candidates.
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

  const toggleDay = (day: string) => {
    setPreferredDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleGenerateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examDate) return;

    // Build spacing interval slots
    const examTargetDate = new Date(examDate);
    const currentDate = new Date();
    const daysRemaining = Math.max(14, Math.floor((examTargetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));

    const generated: SpacedInterval[] = [];
    const limitWeeks = Math.min(8, Math.ceil(daysRemaining / 7));

    const highYields = [
      { subject: 'Biology', topic: 'Genetics & Meiosis Pedigrees' },
      { subject: 'Chemistry', topic: 'Stoichiometry & ideal gas variables' },
      { subject: 'Physics', topic: 'Snells Law & refractive optic index' },
      { subject: 'Social Science', topic: 'Functionalism & sociological theories' },
      { subject: 'Quantitative', topic: 'Logarithmic exponents algebra' },
      { subject: 'Perceptual Acuity', topic: 'Isometric horizontal mirror images' },
      { subject: 'Verbal Aptitude', topic: 'Deductive reading comprehension' },
      { subject: 'Inductive Reasoning', topic: 'Matrix pattern matrices sequence' },
    ];

    for (let w = 1; w <= limitWeeks; w++) {
      const dayOffset = w * 7;
      
      const amItem = highYields[(w - 1) % highYields.length];
      const pmItem = highYields[w % highYields.length];

      const r1 = new Date();
      r1.setDate(currentDate.getDate() + dayOffset + 1);
      
      const r2 = new Date();
      r2.setDate(currentDate.getDate() + dayOffset + 5);

      generated.push({
        week: w,
        subjectAM: amItem.subject,
        topicAM: amItem.topic,
        subjectPM: pmItem.subject,
        topicPM: pmItem.topic,
        recallDate1: r1.toISOString().split('T')[0],
        recallDate2: r2.toISOString().split('T')[0]
      });
    }

    setSchedule(generated);
    alert('Rigorous Interleaved Retrieval science calendar compiled! Check the week blocks below.');
  };

  return (
    <div className="space-y-6 animate-fade-in" id="spaced-coach-canvas">
      
      {/* Configuration Header Card */}
      <div className="bg-white rounded-[24px] border border-slate-100 p-5 sm:p-6 shadow-xs">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] uppercase font-black tracking-widest text-sky-600">RETRIEVAL SCIENCE SYSTEM</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-850 tracking-tight flex items-center gap-1.5">
            <BrainCircuit className="w-5.5 h-5.5 text-indigo-500" /> Spaced Repetition schedule Coach
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Formulate a rigorously structured interleaved study calendar based on custom dates and constraints.
          </p>
        </div>

        {/* Input variables form */}
        <form onSubmit={handleGenerateSchedule} className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-6 pt-5 border-t border-slate-50 text-xs">
          <div className="md:col-span-3">
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Target Exam date</label>
            <input
              type="date"
              required
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Daily Studying Hour constraint</label>
            <input
              type="number"
              min="1"
              max="16"
              required
              value={dailyHours}
              onChange={(e) => setDailyHours(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-black outline-none"
            />
          </div>

          <div className="md:col-span-4">
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Preferred Days</label>
            <div className="flex flex-wrap gap-1">
              {daysOfWeek.map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  className={`px-2 py-1 border text-[10px] rounded font-black cursor-pointer transition-all ${
                    preferredDays.includes(d) ? 'bg-indigo-55 bg-indigo-100 border-indigo-400 text-indigo-950 text-slate-900 border-2' : 'bg-slate-50 border-slate-200 text-slate-550'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-650 hover:bg-[#1b4cb4] bg-[#1b4cb4] text-white font-black text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Build Spaced Calendar
            </button>
          </div>
        </form>
      </div>

      {schedule.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Coach Settings sidebar (Col span 1) */}
          <div className="lg:col-span-1 bg-white border border-slate-105 rounded-[24px] p-5 space-y-4">
            <span className="block text-[10px] font-black uppercase text-slate-400">COACH CONSTANTS</span>
            
            <div className="space-y-2">
              {['Interleaved Blocks', 'Topic Spiral Spacing', 'Massive Prep Recalls'].map(val => (
                <button
                  key={val}
                  onClick={() => setCoachRhythm(val)}
                  className={`w-full p-2 text-left font-bold text-xs rounded-lg border cursor-pointer transition-all ${
                    coachRhythm === val ? 'bg-indigo-50 border-indigo-200 text-indigo-900' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>

            <div className="p-3 bg-indigo-50 text-[10.5px] leading-relaxed rounded-xl text-indigo-900 font-semibold border-indigo-100 border">
              ⏰ <strong>Spacing Protocol:</strong> AM covers concept encoding. PM operates timed sprints. Recalls occur 1 and 5 days dynamically.
            </div>
          </div>

          {/* Interleaved schedule cards (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
              YOUR PERSONALIZED WEEKLY RETRIEVAL ACTION PLAN ({schedule.length} Weeks)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schedule.map((sch) => (
                <div key={sch.week} className="bg-white rounded-2xl p-5 border border-slate-105 hover:shadow-xs transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sans font-black text-xs text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-md">
                        Week Study Block {sch.week}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">3.0 Hours Restrict</span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-start gap-1">
                        <span className="font-extrabold text-indigo-600">AM:</span>
                        <p className="font-bold text-slate-800">{sch.subjectAM} <span className="text-[10.5px] font-medium text-slate-450 block">{sch.topicAM}</span></p>
                      </div>

                      <div className="flex items-start gap-1 border-t border-slate-50 pt-1.5 mt-1.5">
                        <span className="font-extrabold text-[#059669]">PM:</span>
                        <p className="font-bold text-slate-800">{sch.subjectPM} <span className="text-[10.5px] font-medium text-slate-450 block">{sch.topicPM}</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                    <span className="bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded leading-none">1st Retrieval: {sch.recallDate1}</span>
                    <span className="bg-purple-50 text-purple-800 px-1.5 py-0.5 rounded leading-none">2nd Retrieval: {sch.recallDate2}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-10 px-6 bg-white border border-slate-100 rounded-[24px] max-w-lg mx-auto space-y-3">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <BrainCircuit className="w-6 h-6 animate-pulse" />
          </div>
          <h4 className="font-black text-slate-805 text-sm">Spaced Coach Inactive</h4>
          <p className="text-xs text-slate-405 leading-relaxed">
            Provide your target Philippine medical Board NMAT dates and studying hours availability above, then trigger study-guide Spiral calculations to obtain a rigorous Spaced Repetition timetable.
          </p>
        </div>
      )}
    </div>
  );
}
