import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, Shield, ShieldAlert, Award, Calendar, ChevronLeft, ChevronRight, Activity, Zap, CheckCircle2 } from 'lucide-react';

interface VocabularyTerm {
  id: string;
  term: string;
  definition: string;
  subject: string;
  spacingIntervalDays: number;
}

export default function TheorySyllabi() {
  const [activeTheoryTab, setActiveTheoryTab] = useState<'pomodoro' | 'metrics' | 'planner'>('pomodoro');

  // --- 1. POMODORO TIMER AND FOCUS SHIELD STATES ---
  const [pomoMinutes, setPomoMinutes] = useState(25);
  const [pomoSeconds, setPomoSeconds] = useState(0);
  const [pomoActive, setPomoActive] = useState(false);
  const [pomoType, setPomoType] = useState<'work' | 'short-break' | 'long-break'>('work');
  const [shieldActive, setShieldActive] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (pomoActive) {
      interval = setInterval(() => {
        if (pomoSeconds > 0) {
          setPomoSeconds(prev => prev - 1);
        } else if (pomoSeconds === 0) {
          if (pomoMinutes === 0) {
            // Timer finished
            setPomoActive(false);
            if (pomoType === 'work') {
              alert('Pomodoro work cycle finished! Take a well-deserved short break.');
              setPomoType('short-break');
              setPomoMinutes(5);
            } else {
              alert('Break cycle completed! Time to focus on pre-med curriculum.');
              setPomoType('work');
              setPomoMinutes(25);
            }
          } else {
            setPomoMinutes(prev => prev - 1);
            setPomoSeconds(59);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pomoActive, pomoMinutes, pomoSeconds, pomoType]);

  const togglePomo = () => setPomoActive(!pomoActive);
  const resetPomo = () => {
    setPomoActive(false);
    setPomoSeconds(0);
    if (pomoType === 'work') setPomoMinutes(25);
    else if (pomoType === 'short-break') setPomoMinutes(5);
    else setPomoMinutes(15);
  };

  const setPomoMode = (mode: 'work' | 'short-break' | 'long-break') => {
    setPomoType(mode);
    setPomoActive(false);
    setPomoSeconds(0);
    if (mode === 'work') setPomoMinutes(25);
    else if (mode === 'short-break') setPomoMinutes(5);
    else setPomoMinutes(15);
  };

  // --- 2. ACHIEVEMENTS & METRICS MAPPING ---
  const scoringTrends = [
    { subject: 'Biology', score: 88, avg: 72, color: 'from-green-550 to-green-600' },
    { subject: 'Chemistry', score: 85, avg: 65, color: 'from-blue-550 to-blue-600' },
    { subject: 'Physics', score: 79, avg: 59, color: 'from-indigo-550 to-indigo-600' },
    { subject: 'Perceptual Acuity', score: 94, avg: 78, color: 'from-sky-550 to-sky-650' },
    { subject: 'Social Science', score: 82, avg: 70, color: 'from-amber-550 to-amber-600' }
  ];

  // --- 3. DRAG-AND-DROP STUDY PLANNER CALENDAR ---
  const initialDays = Array.from({ length: 30 }, (_, i) => ({
    dayNumber: i + 1,
    milestone: i === 4 ? 'Register CEM NMAT' : 
               i === 11 ? 'Biology Core Mock' : 
               i === 18 ? 'Physiology Review' : 
               i === 25 ? 'Full Sample Simulator' : '',
    subjectsReviewCount: (i % 3) + 1
  }));
  const [calendarDays, setCalendarDays] = useState(initialDays);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [customMilestoneInput, setCustomMilestoneInput] = useState('');

  const handleDayClick = (idx: number) => {
    setSelectedDayIndex(idx);
    setCustomMilestoneInput(calendarDays[idx]?.milestone || '');
  };

  const saveMilestone = () => {
    if (selectedDayIndex === null) return;
    setCalendarDays(prev => prev.map((day, idx) => 
      idx === selectedDayIndex ? { ...day, milestone: customMilestoneInput } : day
    ));
    setSelectedDayIndex(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 font-sans">
      
      {/* Sidebar - controls */}
      <div className="lg:col-span-1 space-y-3">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col space-y-1.5 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Theory & Productivity</span>
          
          <button
            onClick={() => setActiveTheoryTab('pomodoro')}
            className={`flex items-center space-x-2.5 p-3 rounded-xl font-semibold text-xs text-left cursor-pointer transition-all ${
              activeTheoryTab === 'pomodoro' 
                ? 'bg-sky-500 text-white shadow-sm' 
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4.5 h-4.5" />
            <div className="leading-none">
              <span className="block">Pomodoro & Focus Shield</span>
              <span className={`text-[9px] block ${activeTheoryTab === 'pomodoro' ? 'text-sky-100' : 'text-slate-400'}`}>Work-break scheduler</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTheoryTab('metrics')}
            className={`flex items-center space-x-2.5 p-3 rounded-xl font-semibold text-xs text-left cursor-pointer transition-all ${
              activeTheoryTab === 'metrics' 
                ? 'bg-sky-500 text-white shadow-sm' 
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Award className="w-4.5 h-4.5" />
            <div className="leading-none">
              <span className="block">Achievements & Metrics</span>
              <span className={`text-[9px] block ${activeTheoryTab === 'metrics' ? 'text-sky-100' : 'text-slate-400'}`}>Strengths & focus zones</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTheoryTab('planner')}
            className={`flex items-center space-x-2.5 p-3 rounded-xl font-semibold text-xs text-left cursor-pointer transition-all ${
              activeTheoryTab === 'planner' 
                ? 'bg-sky-500 text-white shadow-sm' 
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-4.5 h-4.5" />
            <div className="leading-none">
              <span className="block">Study Planner Calendar</span>
              <span className={`text-[9px] block ${activeTheoryTab === 'planner' ? 'text-sky-100' : 'text-slate-400'}`}>Milestone planner index</span>
            </div>
          </button>
        </div>

        {/* Science quote */}
        <div className="p-4 bg-gradient-to-br from-blue-50/50 to-indigo-55/10 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-2">
          <div className="flex items-center space-x-1 font-bold text-slate-800 text-xs">
            <Zap className="w-4 h-4 text-sky-500" />
            <span>Spaced Consolidation</span>
          </div>
          <p className="leading-relaxed text-[11px] font-medium">
            Reviewing specialized metrics highlights exactly which topics need short recall intervals. Leverage focus windows of 25 minutes to retain deep details perfectly!
          </p>
        </div>
      </div>

      {/* Main Container Viewport */}
      <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-sm">
        
        {/* TAB 1: POMODORO TIMER AND SITE BLOCKER */}
        {activeTheoryTab === 'pomodoro' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="font-extrabold text-slate-805 text-base flex items-center space-x-1.5">
                  <Clock className="w-5 h-5 text-sky-500" />
                  <span>Pomodoro Focus Shield</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Use optimal interval pacing with block shields to guard against visual notifications noise.</p>
              </div>
              <span className="text-[10px] uppercase font-black tracking-wider text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                {shieldActive ? 'Focus Shield: SECURE' : 'Focus Shield: DISABLED'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Actual Timer Visual */}
              <div className="p-6 bg-slate-50 border border-slate-150 rounded-2xl text-center space-y-4">
                <div className="flex justify-center gap-1.5">
                  <button 
                    onClick={() => setPomoMode('work')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                      pomoType === 'work' ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-650'
                    }`}
                  >
                    Work (25m)
                  </button>
                  <button 
                    onClick={() => setPomoMode('short-break')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                      pomoType === 'short-break' ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-650'
                    }`}
                  >
                    Short (5m)
                  </button>
                  <button 
                    onClick={() => setPomoMode('long-break')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                      pomoType === 'long-break' ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-650'
                    }`}
                  >
                    Long (15m)
                  </button>
                </div>

                <div className="text-5xl font-black font-mono text-slate-800 tracking-tight py-4">
                  {pomoMinutes < 10 ? `0${pomoMinutes}` : pomoMinutes}:{pomoSeconds < 10 ? `0${pomoSeconds}` : pomoSeconds}
                </div>

                <div className="flex justify-center space-x-2.5">
                  <button
                    onClick={togglePomo}
                    className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs rounded-xl cursor-pointer shadow-sm shadow-sky-100 transition-all uppercase"
                  >
                    {pomoActive ? 'Suspend Interval' : 'Launch Session'}
                  </button>
                  <button
                    onClick={resetPomo}
                    className="p-2 bg-slate-200 hover:bg-slate-250 rounded-xl text-slate-650 cursor-pointer"
                    title="Reset timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Distraction Blocker Shield Form panel */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-sky-500" />
                  <span className="font-extrabold text-xs text-slate-800 uppercase tracking-wide">Shield Configuration Block</span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-4 text-xs font-medium">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-slate-800">Distraction Blocker</span>
                      <span className="text-[10px] text-slate-400">Blocks Reddit/Facebook notifications proxy</span>
                    </div>
                    <button
                      onClick={() => setShieldActive(!shieldActive)}
                      className={`w-11 h-6 rounded-full relative transition-all duration-200 ${
                        shieldActive ? 'bg-sky-500' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all ${
                        shieldActive ? 'translate-x-5' : ''
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-slate-800">In-App Notification Mute</span>
                      <span className="text-[10px] text-slate-400">Mutes chat rooms beep alerts</span>
                    </div>
                    <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-150">
                      AUTO-LOCKED
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-450 leading-relaxed">
                    🌟 <strong>NMAT Study Rule:</strong> Distraction shield routes static local frames to block active notification pings, focusing your cognitive loops.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACHIEVEMENTS & METRICS OVERVIEW */}
        {activeTheoryTab === 'metrics' && (
          <div className="space-y-6 animate-scale-up">
            <div>
              <h3 className="font-extrabold text-slate-805 text-base flex items-center space-x-1.5">
                <Award className="w-5 h-5 text-sky-500 animate-pulse" />
                <span>NMAT Subject Diagnostics Matrix</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Visualize your scoring milestones, active chemistry/biology strengths, and priority target zones.</p>
            </div>

            {/* Custom styled mock bar charts */}
            <div className="space-y-4">
              {scoringTrends.map(trend => {
                return (
                  <div key={trend.subject} className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-baseline font-bold text-slate-800">
                      <span>{trend.subject}</span>
                      <div className="space-x-2">
                        <span className="text-sky-600">Your Accuracy: {trend.score}%</span>
                        <span className="text-slate-400 font-medium">| National Average: {trend.avg}%</span>
                      </div>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative border border-slate-150/60">
                      <div 
                        className={`bg-gradient-to-r ${trend.color} h-full transition-all duration-1000`}
                        style={{ width: `${trend.score}%` }}
                      />
                      {/* Mark national average */}
                      <div 
                        className="absolute h-full top-0 w-0.5 bg-red-400/90" 
                        style={{ left: `${trend.avg}%` }}
                        title="National Average"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Strengths and Focus Zones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-xs">
              <div className="p-4 bg-emerald-50/50 border border-emerald-150 rounded-xl space-y-2">
                <span className="text-[10px] font-black uppercase text-emerald-800 block tracking-wide">🏆 ACTIVE STRENGTH ZONES</span>
                <li className="leading-relaxed text-slate-705">
                  <strong>Perceptual Acuity Figural Analysis:</strong> Running above 94% average. Folds and hidden figure selections are excellent.
                </li>
                <li className="leading-relaxed text-slate-705">
                  <strong>Cell Respiration Stoichiometry:</strong> Exceptional recall margins on glycolysis/Krebs pathways.
                </li>
              </div>

              <div className="p-4 bg-red-50/30 border border-red-150 rounded-xl space-y-2">
                <span className="text-[10px] font-black uppercase text-red-700 block tracking-wide">⚠️ CRITICAL FOCUS ZONES</span>
                <li className="leading-relaxed text-slate-705">
                  <strong>Weak Buffer Henderson pH Stoichiometry:</strong> High fail index. Spacing scheduled down to 1-day recalls.
                </li>
                <li className="leading-relaxed text-slate-705">
                  <strong>Mechanics Inclined Planes / Friction:</strong> Inefficient formula consolidation. Practice adaptive loops.
                </li>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CALENDAR STUDY PLANNER */}
        {activeTheoryTab === 'planner' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-extrabold text-slate-850 text-base flex items-center space-x-1.5">
                <Calendar className="w-5 h-5 text-sky-500" />
                <span>Study Planner Calendar Dashboard</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Click any calendar slot to map out study timelines or register major CEM testing milestones details.</p>
            </div>

            {/* Simulated interactive calendar grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-7 gap-2">
              {calendarDays.map((day, idx) => {
                const isSelected = selectedDayIndex === idx;
                return (
                  <div
                    key={day.dayNumber}
                    onClick={() => handleDayClick(idx)}
                    className={`p-2.5 rounded-xl border cursor-pointer min-h-[68px] flex flex-col justify-between transition-all ${
                      isSelected 
                        ? 'border-sky-500 bg-sky-20/40 text-slate-900 shadow-sm' 
                        : 'border-slate-150 bg-slate-50/30 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-400">Day {day.dayNumber}</span>
                      {day.subjectsReviewCount > 2 && (
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      )}
                    </div>

                    <div className="py-1">
                      {day.milestone ? (
                        <p className="text-[9px] bg-sky-100 text-sky-950 px-1 border border-sky-200 font-extrabold rounded truncate leading-relaxed">
                          {day.milestone}
                        </p>
                      ) : (
                        <div className="h-1" />
                      )}
                    </div>

                    <div className="flex justify-between items-center text-[8px] text-slate-450 uppercase font-black tracking-tight">
                      <span>{day.subjectsReviewCount} subjects</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inline Editor Form */}
            {selectedDayIndex !== null && (
              <div className="p-4 bg-slate-50 border border-sky-200 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">
                    Edit Milestone details for Day {calendarDays[selectedDayIndex]?.dayNumber}
                  </span>
                  <button 
                    onClick={() => setSelectedDayIndex(null)}
                    className="text-xs font-bold text-slate-450 hover:text-slate-650 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customMilestoneInput}
                    onChange={(e) => setCustomMilestoneInput(e.target.value)}
                    placeholder="e.g., Register CEM, Biology stoichiometry, Review physics optics..."
                    className="flex-1 p-2 bg-white text-xs border border-slate-200 focus:ring-1 focus:ring-sky-500 rounded-lg outline-none"
                  />
                  <button
                    onClick={saveMilestone}
                    className="px-4 py-2 bg-sky-550 text-white font-extrabold text-xs hover:bg-sky-600 rounded-lg cursor-pointer"
                  >
                    Save Target
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
