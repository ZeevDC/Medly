import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, CheckCircle, Plus, BookOpen, Smile, Clock, Trash2, CalendarDays, RefreshCw, Zap, Star } from 'lucide-react';

interface StudyPlannerCalendarProps {
  habitTracker: Record<string, boolean>;
  setHabitTracker: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  studyLogs: Array<{ id: string; subject: string; hours: number; date: string }>;
  setStudyLogs: React.Dispatch<React.SetStateAction<Array<{ id: string; subject: string; hours: number; date: string }>>>;
  moodLogs: Array<{ id: string; mood: string; date: string; note: string }>;
  setMoodLogs: React.Dispatch<React.SetStateAction<Array<{ id: string; mood: string; date: string; note: string }>>>;
  currentUserEmail?: string;
  key?: React.Key;
}

interface NmatEvent {
  id: string;
  title: string;
  date: string;
  type: 'milestone' | 'exam' | 'cohort' | 'personal';
}

export default function StudyPlannerCalendar({
  habitTracker,
  setHabitTracker,
  studyLogs,
  setStudyLogs,
  moodLogs,
  setMoodLogs,
  currentUserEmail,
}: StudyPlannerCalendarProps) {
  
  // Custom habits state
  const [newHabit, setNewHabit] = useState('');
  const [customHabits, setCustomHabits] = useState<string[]>(() => {
    try {
      const emailKey = (currentUserEmail ?? 'studyfilesbyz@gmail.com').trim().toLowerCase();
      const stored = localStorage.getItem(`medly_custom_habits_list_${emailKey}`);
      if (stored) return JSON.parse(stored);
      if (emailKey !== 'studyfilesbyz@gmail.com') return [];
      return ['Active Recall Spacing', 'Physics Formulas Revision', 'Anki Loop Queue'];
    } catch {
      return (currentUserEmail?.trim().toLowerCase() !== 'studyfilesbyz@gmail.com') ? [] : ['Active Recall Spacing', 'Physics Formulas Revision', 'Anki Loop Queue'];
    }
  });

  // Save custom habit names
  useEffect(() => {
    try {
      const emailKey = (currentUserEmail ?? 'studyfilesbyz@gmail.com').trim().toLowerCase();
      localStorage.setItem(`medly_custom_habits_list_${emailKey}`, JSON.stringify(customHabits));
    } catch {}
  }, [customHabits, currentUserEmail]);

  // Customizable NMAT Calendar events state
  const [nmatEvents, setNmatEvents] = useState<NmatEvent[]>(() => {
    try {
      const emailKey = (currentUserEmail ?? 'studyfilesbyz@gmail.com').trim().toLowerCase();
      const stored = localStorage.getItem(`medly_nmat_events_${emailKey}`);
      if (stored) return JSON.parse(stored);
      if (emailKey !== 'studyfilesbyz@gmail.com') return [];
      return [
        { id: '1', title: 'CEM Registration Closes', date: '2026-06-30', type: 'milestone' },
        { id: '2', title: 'Part 1 Mock Simulator cohort', date: '2026-07-05', type: 'cohort' },
        { id: '3', title: 'National Exam Cycle Starts', date: '2026-11-15', type: 'exam' },
        { id: '4', title: 'Chemistry Volumetrics Group Session', date: '2026-06-25', type: 'personal' },
        { id: '5', title: 'Pre-Med Admissions open UPCM', date: '2026-06-15', type: 'milestone' }
      ];
    } catch {
      return (currentUserEmail?.trim().toLowerCase() !== 'studyfilesbyz@gmail.com') ? [] : [
        { id: '1', title: 'CEM Registration Closes', date: '2026-06-30', type: 'milestone' },
        { id: '2', title: 'Part 1 Mock Simulator cohort', date: '2026-07-05', type: 'cohort' },
        { id: '3', title: 'National Exam Cycle Starts', date: '2026-11-15', type: 'exam' },
        { id: '4', title: 'Chemistry Volumetrics Group Session', date: '2026-06-25', type: 'personal' },
        { id: '5', title: 'Pre-Med Admissions open UPCM', date: '2026-06-15', type: 'milestone' }
      ];
    }
  });

  useEffect(() => {
    try {
      const emailKey = (currentUserEmail ?? 'studyfilesbyz@gmail.com').trim().toLowerCase();
      localStorage.setItem(`medly_nmat_events_${emailKey}`, JSON.stringify(nmatEvents));
    } catch {}
  }, [nmatEvents, currentUserEmail]);

  // Selected calendar cell for detail view/quick logs
  const [selectedDay, setSelectedDay] = useState<number>(20); // Default highlighting June 20, 2026
  const selectedDateStr = `2026-06-${selectedDay < 10 ? '0' : ''}${selectedDay}`;

  // Log forms values
  const [logSubject, setLogSubject] = useState('Biology');
  const [logHours, setLogHours] = useState('2');
  const [activeMood, setActiveMood] = useState('Focused 🧠');
  const [moodNote, setMoodNote] = useState('');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState<'milestone' | 'exam' | 'cohort' | 'personal'>('personal');

  // Interactive notifications state
  const [uiToast, setUiToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setUiToast(msg);
    setTimeout(() => setUiToast(null), 3000);
  };

  // Habit toggling and adding
  const toggleHabit = (habitName: string) => {
    setHabitTracker(prev => {
      const updated = { ...prev, [habitName]: !prev[habitName] };
      try {
        localStorage.setItem('medly_habit_tracker', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast(`Updated "${habitName}" compliance!`);
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    const trimmed = newHabit.trim();
    if (!trimmed) return;
    setCustomHabits(prev => [...prev, trimmed]);
    setHabitTracker(prev => ({ ...prev, [trimmed]: false }));
    setNewHabit('');
    showToast(`Added custom habit: "${trimmed}"`);
  };

  const handleDeleteHabit = (habitName: string) => {
    setCustomHabits(prev => prev.filter(h => h !== habitName));
    setHabitTracker(prev => {
      const copy = { ...prev };
      delete copy[habitName];
      try {
        localStorage.setItem('medly_habit_tracker', JSON.stringify(copy));
      } catch {}
      return copy;
    });
    showToast(`Removed habit: "${habitName}"`);
  };

  // Study hours logger for selected calendar date
  const handleHoursSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logHours || Number(logHours) <= 0) return;
    const newLog = {
      id: `log-${Date.now()}`,
      subject: logSubject,
      hours: Number(logHours),
      date: selectedDateStr
    };
    setStudyLogs(prev => {
      const updated = [newLog, ...prev];
      try {
        localStorage.setItem('medly_study_logs', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast(`Logged ${logHours} hours study for ${logSubject}!`);
  };

  // Mood Tracker for selected calendar date
  const handleMoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMood = {
      id: `mood-${Date.now()}`,
      mood: activeMood,
      date: selectedDateStr,
      note: moodNote.trim() || 'Stable pre-med mind status'
    };
    setMoodLogs(prev => {
      const updated = [newMood, ...prev];
      try {
        localStorage.setItem('medly_mood_logs', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setMoodNote('');
    showToast(`Mood feedback logged successfully for June ${selectedDay}!`);
  };

  // Calendar Event Adds for selected calendar date
  const handleAddCalendarEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    const ev: NmatEvent = {
      id: `ev-${Date.now()}`,
      title: newEventTitle.trim(),
      date: selectedDateStr,
      type: newEventType
    };
    setNmatEvents(prev => [...prev, ev]);
    setNewEventTitle('');
    showToast(`Scheduled "${ev.title}"!`);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    setNmatEvents(prev => prev.filter(e => e.id !== id));
    showToast(`Removed event: "${title}"`);
  };

  const moodEmojis = [
    { name: 'Focused 🧠', color: 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100' },
    { name: 'Happy 🐻', color: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' },
    { name: 'Stressed ⚠️', color: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' },
    { name: 'Exhausted 💤', color: 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100' },
    { name: 'Confident 🏅', color: 'bg-purple-50 border-purple-200 text-purple-750 hover:bg-purple-100' }
  ];

  // June 2026 statistics
  const juneStudyLogs = studyLogs.filter(l => l.date.startsWith('2026-06'));
  const totalJuneHours = juneStudyLogs.reduce((acc, curr) => acc + curr.hours, 0);

  // Generate standard June 2026 week rows (June 1st is a Monday. 30 days total)
  // We offset by 1 day so Sunday column (day index 0) is May 31st (empty)
  const calendarCells = Array.from({ length: 35 }, (_, index) => {
    const gridIndex = index;
    // June 1st corresponds to grid index 1 (Monday)
    const dayValue = gridIndex; // Since Monday is gridIndex 1, dayValue matches June date exactly!
    const isValidDay = dayValue >= 1 && dayValue <= 30;

    const dateStr = `2026-06-${dayValue < 10 ? '0' : ''}${dayValue}`;
    const dayEvents = isValidDay ? nmatEvents.filter(e => e.date === dateStr) : [];
    const dayStudy = isValidDay ? studyLogs.filter(l => l.date === dateStr) : [];
    const dayMoods = isValidDay ? moodLogs.filter(m => m.date === dateStr) : [];

    return {
      isValidDay,
      dayNum: dayValue,
      dateStr,
      events: dayEvents,
      study: dayStudy,
      moods: dayMoods
    };
  });

  const selectedDayData = calendarCells.find(c => c.dayNum === selectedDay);

  return (
    <div className="space-y-8 animate-fade-in" id="planner-calendar-view">
      
      {/* Toast Alert Feedback */}
      {uiToast && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-slate-100 border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 z-55 animate-fade-in text-xs font-bold">
          <Zap className="w-4 h-4 text-sky-400 animate-bounce" />
          <span>{uiToast}</span>
        </div>
      )}

      {/* Header element */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[24px] border border-slate-100 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-850 tracking-tight flex items-center gap-2">
            <CalendarIcon className="text-indigo-600 w-6 h-6 shrink-0" /> Pre-Med Calendar
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Plan board registration deadlines, log focus hours, and manage cognitive wellness parameters.
          </p>
        </div>
        <div className="flex items-center gap-2.5 bg-indigo-50 border border-indigo-100/50 p-3 rounded-xl">
          <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
          <div className="text-xs text-indigo-950 font-semibold leading-tight">
            <span className="block text-[8px] uppercase tracking-wider text-indigo-400 font-bold">JUNE 2026 LOGGED STUDY</span>
            <strong className="text-sm font-black">{totalJuneHours} Hours Total</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* NMAT Interactive Monthly Calendar View (Col span 7) */}
        <div className="lg:col-span-7 bg-white rounded-[24px] border border-slate-100 p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-xs">
          
          <div className="flex justify-between items-center pb-2 border-b border-slate-50">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded">
                Interactive Grid View
              </span>
              <h3 className="font-extrabold text-slate-800 text-base">June 2026 Calendar</h3>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">PWA OFFLINE-SYNC</span>
            </div>
          </div>

          {/* Calendar week Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center text-[10px] font-black tracking-wider text-slate-450 uppercase pb-1 select-none">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* 35 Day cells grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {calendarCells.map((cell, index) => {
              const isSelected = cell.dayNum === selectedDay;
              
              if (!cell.isValidDay) {
                return (
                  <div 
                    key={`empty-${index}`} 
                    className="aspect-square bg-slate-50 border border-slate-100/30 rounded-xl flex items-center justify-center opacity-30 select-none text-[10px] text-slate-300"
                  >
                    <span>{cell.dayNum <= 0 ? 31 + cell.dayNum : cell.dayNum - 30}</span>
                  </div>
                );
              }

              // Calculate cell indicators variables
              const hasEvents = cell.events.length > 0;
              const cellStudyHrs = cell.study.reduce((total, l) => total + l.hours, 0);

              return (
                <div
                  key={`day-${cell.dayNum}`}
                  onClick={() => setSelectedDay(cell.dayNum)}
                  className={`aspect-square rounded-xl p-1 xs:p-1.5 border relative flex flex-col justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/20 ring-1 ring-indigo-500/20 scale-[1.03] shadow-xs'
                      : 'border-slate-100 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  {/* Day Number and Mood indicator */}
                  <div className="flex justify-between items-start select-none">
                    <span className={`text-[9.5px] xs:text-[11px] font-extrabold ${isSelected ? 'text-indigo-805 font-black' : 'text-slate-700'}`}>
                      {cell.dayNum}
                    </span>
                    
                    {cell.moods.length > 0 && (
                      <span className="text-[10px] xs:text-xs -mt-0.5" title={cell.moods[0].mood}>
                        {cell.moods[0].mood.split(' ')[1] || cell.moods[0].mood.split(' ')[0]}
                      </span>
                    )}
                  </div>

                  {/* Badges/Event indicator row inside cell */}
                  <div className="flex flex-wrap gap-0.5 justify-start items-center">
                    {cellStudyHrs > 0 && (
                      <span className="text-[7.5px] xs:text-[8px] bg-sky-100 text-sky-800 font-extrabold px-1 xs:px-1.5 py-0.2 xs:py-0.5 rounded" title={`${cellStudyHrs} study hours logged`}>
                        <span className="hidden xs:inline">📚 </span>{cellStudyHrs}h
                      </span>
                    )}
                    {hasEvents && (
                      <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 bg-indigo-500 rounded-full animate-pulse" title={`${cell.events.length} activities scheduled`} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive instruction indicator */}
          <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/55 text-[10px] text-indigo-900 font-semibold leading-relaxed">
            💡 <strong>Calendar Interaction:</strong> Click any cell to retrieve scheduled agenda guidelines, log custom hours, or submit mood parameters for that date.
          </div>
        </div>

        {/* Selected Date Focus Panel & customizable elements (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Day specific detailed focus */}
          <div className="bg-slate-900 text-slate-100 rounded-[24px] border border-slate-950 p-5 sm:p-6 space-y-3 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <span className="block text-[8px] uppercase text-indigo-300 tracking-wider font-extrabold font-mono">Selected Day Agenda Workspace</span>
                <h4 className="font-black text-white text-lg tracking-tight">June {selectedDay}, 2026</h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {selectedDay === 20 ? 'Active Focus Today' : 'Future Target'}
              </span>
            </div>

            {/* List activities for selected day */}
            <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
              {selectedDayData?.events.length === 0 && selectedDayData?.study.length === 0 && selectedDayData?.moods.length === 0 ? (
                <div className="text-center py-4 text-slate-500 font-medium text-xs leading-relaxed">
                  No registered milestones or study hours scheduled for June {selectedDay}. Keep active recall margins consistent.
                </div>
              ) : (
                <div className="space-y-1.5 text-xs">
                  {selectedDayData?.events.map(ev => (
                    <div key={ev.id} className="flex justify-between items-center p-2 rounded-xl bg-slate-800 border border-slate-700/50">
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-slate-200 block text-[11px] leading-tight">{ev.title}</span>
                        <span className="text-[8px] tracking-wide uppercase font-black px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 shrink-0 inline-block mt-0.5">
                          {ev.type}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(ev.id, ev.title)}
                        className="text-slate-500 hover:text-red-400 cursor-pointer p-0.5"
                        title="Delete scheduling"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {selectedDayData?.study.map(s => (
                    <div key={s.id} className="flex justify-between items-center p-2 rounded-xl bg-sky-950/40 border border-sky-900/30 text-sky-200">
                      <span className="font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
                        📚 {s.subject} study
                      </span>
                      <span className="text-[10px] font-black">{s.hours} Hours Session</span>
                    </div>
                  ))}

                  {selectedDayData?.moods.map(m => (
                    <div key={m.id} className="p-2 rounded-xl bg-indigo-950/40 border border-indigo-900/30 text-indigo-200 text-[10.5px]">
                      <div>
                        Status: <strong className="text-white font-extrabold">{m.mood}</strong>
                      </div>
                      <p className="text-[9.5px] italic text-indigo-300/80 mt-0.5">"{m.note}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick add event form */}
            <form onSubmit={handleAddCalendarEvent} className="border-t border-slate-800 pt-3 space-y-2">
              <p className="text-[10px] text-slate-400 font-black uppercase">Schedule customized Event Target:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Event description..."
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="bg-slate-800 hover:bg-slate-750 focus:bg-slate-850 text-white text-xs border border-slate-700 rounded-lg p-2 flex-grow outline-none placeholder-slate-500"
                />
                
                <select
                  value={newEventType}
                  onChange={(e: any) => setNewEventType(e.target.value)}
                  className="bg-slate-800 text-white border border-slate-700 text-[10px] p-2 rounded-lg outline-none font-bold"
                >
                  <option value="milestone">Milestone</option>
                  <option value="exam">Exam</option>
                  <option value="cohort">Cohort</option>
                  <option value="personal">Personal</option>
                </select>

                <button
                  type="submit"
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-lg cursor-pointer shrink-0 transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>

          {/* Study Hour Logger for selected date */}
          <div className="bg-white rounded-[24px] border border-slate-100 p-5 sm:p-6 space-y-4 shadow-xs">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
              LOG SUBJECT HOURS (TO JUNE {selectedDay})
            </span>
            
            <form onSubmit={handleHoursSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-5 space-y-1">
                <label className="text-[9px] font-bold text-slate-400 block uppercase">NMAT Core Subject</label>
                <select
                  value={logSubject}
                  onChange={(e) => setLogSubject(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none cursor-pointer"
                >
                  {['Biology', 'Physics', 'Chemistry', 'Social Science', 'Quantitative', 'Verbal'].map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="text-[9px] font-bold text-slate-400 block uppercase">Estimated Hours</label>
                <div className="flex items-center space-x-1 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-slate-400 ml-1 shrink-0" />
                  <input
                    type="number"
                    min="0.5"
                    max="12"
                    step="0.5"
                    value={logHours}
                    onChange={(e) => setLogHours(e.target.value)}
                    className="w-full text-center bg-transparent border-none text-xs font-black p-0 outline-none focus:ring-0 text-slate-800"
                  />
                  <span className="text-[10px] text-slate-450 pr-1 select-none">Hrs</span>
                </div>
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-lg cursor-pointer transition-colors"
                >
                  Log Session
                </button>
              </div>
            </form>
          </div>

          {/* Daily Mood tracker logger for selected date */}
          <div className="bg-white rounded-[24px] border border-slate-100 p-5 sm:p-6 space-y-4 shadow-xs">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
              DAILY STUDENT MOOD FEEDBACK (TO JUNE {selectedDay})
            </span>
            
            <form onSubmit={handleMoodSubmit} className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {moodEmojis.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setActiveMood(m.name)}
                    className={`px-3 py-1.5 rounded-xl border font-bold text-xs cursor-pointer transition-all ${
                      activeMood === m.name ? `${m.color} ring-1 ring-offset-1` : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Record cognitive block or mindset note..."
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  className="bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs border border-slate-200 rounded-lg p-2.5 flex-grow outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-lg cursor-pointer transition-all"
                >
                  Log Mood
                </button>
              </div>
            </form>
          </div>

          {/* Customizable Study Habit Tracker panel */}
          <div className="bg-white rounded-[24px] border border-slate-100 p-5 sm:p-6 space-y-4 shadow-xs">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
              CUSTOMIZABLE STUDY HABIT KEY LOGGER
            </span>
            
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {customHabits.map(hb => (
                <div key={hb} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/40 transition-all">
                  <div className="flex items-center space-x-3 flex-grow truncate mr-2">
                    <button
                      type="button"
                      onClick={() => toggleHabit(hb)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        habitTracker[hb] ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-350'
                      }`}
                    >
                      {habitTracker[hb] && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </button>
                    <span className={`text-xs font-semibold truncate ${habitTracker[hb] ? 'line-through text-slate-400' : 'text-slate-750'}`}>
                      {hb}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[8px] uppercase tracking-wide px-2 py-0.5 rounded font-black ${
                      habitTracker[hb] ? 'bg-emerald-50 text-emerald-705' : 'bg-amber-100 text-amber-805'
                    }`}>
                      {habitTracker[hb] ? 'Done' : 'Pending'}
                    </span>
                    <button 
                      onClick={() => handleDeleteHabit(hb)}
                      className="text-slate-350 hover:text-red-500 cursor-pointer p-0.5"
                      title="Delete custom habit"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Habit Addition Form */}
            <form onSubmit={handleAddHabit} className="flex gap-2">
              <input
                type="text"
                placeholder="Draft custom study goal (e.g. 5 anki loops)..."
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                className="bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs border border-slate-200 rounded-lg p-2 flex-grow outline-none focus:ring-1 focus:ring-indigo-500 text-slate-805 placeholder-slate-400"
              />
              <button
                type="submit"
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
