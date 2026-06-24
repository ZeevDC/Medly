import React from 'react';
import { AlertCircle, TrendingUp, AlertTriangle, PlayCircle, ShieldAlert, CheckCircle } from 'lucide-react';

interface WarningLog {
  id: string;
  subject: string;
  consecutiveFailCount: number;
  alertLvl: 'High Danger' | 'Moderate Warning' | 'Low Risk';
  lastFailureDate: string;
  remedialTopic: string;
}

interface DiagnosticWeakspotsProps {
  failedAnswersLogs: WarningLog[];
  setFailedAnswersLogs: React.Dispatch<React.SetStateAction<WarningLog[]>>;
  setActiveTab: (tab: string) => void;
  currentUserEmail?: string;
  userSuite?: string;
  key?: React.Key;
}

export default function DiagnosticWeakspots({
  failedAnswersLogs,
  setFailedAnswersLogs,
  setActiveTab,
  currentUserEmail,
  userSuite = 'Free Student Tier'
}: DiagnosticWeakspotsProps) {

  const isFresh = (currentUserEmail || '').trim().toLowerCase() !== 'studyfilesbyz@gmail.com';
  const isFree = userSuite === 'Free Student Tier';
  const displayedLogs = isFree ? failedAnswersLogs.slice(0, 3) : failedAnswersLogs;

  // Subject proficiency values mapping
  const proficiencyData = [
    { subject: 'Biology', score: isFresh ? 15 : 85, trend: isFresh ? 'stable' : 'upward', color: 'bg-emerald-500' },
    { subject: 'Chemistry', score: isFresh ? 12 : 62, trend: isFresh ? 'stable' : 'downward', color: 'bg-rose-500' },
    { subject: 'Physics', score: isFresh ? 10 : 48, trend: isFresh ? 'stable' : 'consecutive-fails', color: 'bg-red-600' },
    { subject: 'Social Science', score: isFresh ? 18 : 92, trend: isFresh ? 'stable' : 'upward', color: 'bg-sky-500' },
    { subject: 'Quantitative Reasoning', score: isFresh ? 14 : 70, trend: isFresh ? 'stable' : 'stable', color: 'bg-amber-500' },
    { subject: 'Perceptual Acuity', score: isFresh ? 20 : 88, trend: isFresh ? 'stable' : 'upward', color: 'bg-teal-500' },
    { subject: 'Verbal Aptitude', score: isFresh ? 25 : 79, trend: isFresh ? 'stable' : 'stable', color: 'bg-purple-500' },
    { subject: 'Inductive Reasoning', score: isFresh ? 11 : 66, trend: isFresh ? 'stable' : 'downward', color: 'bg-orange-500' },
  ];

  const clearTrigger = (id: string) => {
    setFailedAnswersLogs(prev => prev.filter(item => item.id !== id));
    alert('Warning log cleared! Keep practicing to secure this cognitive synapse.');
  };

  return (
    <div className="space-y-8 animate-fade-in" id="weakspots-diagnostic-view">
      
      {/* Title */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-black text-slate-850 tracking-tight flex items-center gap-1.5">
            <AlertCircle className="text-rose-500 w-6 h-6 animate-pulse" /> Diagnostic Weakspots Analyzer
          </h2>
          <p className="text-xs text-slate-405 mt-1">
            Real-time cognitive error detection synchronized from mock exams and practice answers.
          </p>
        </div>
        
        <button
          onClick={() => setActiveTab('clinical-practice')}
          className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all"
        >
          <PlayCircle className="w-4 h-4" />
          <span>Launch Remedial Drills</span>
        </button>
      </div>

      {/* Performance Trends Metrics */}
      <div className="bg-white rounded-[24px] border border-slate-100 p-5 sm:p-6 space-y-4">
        <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5 border-b pb-2">
          <TrendingUp className="w-4.5 h-4.5 text-sky-550" /> Estimated Subject Proficiency Metrics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
          {proficiencyData.map((prof) => (
            <div key={prof.subject} className="space-y-1.5 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-slate-800">{prof.subject}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500">PR Yield: {prof.score}%</span>
                  <span className={`text-[8.5px] px-1.5 py-0.5 rounded-md font-black ${
                    prof.trend === 'upward' ? 'bg-emerald-50 text-emerald-800' :
                    prof.trend === 'downward' ? 'bg-rose-50 text-rose-800 animate-pulse' :
                    prof.trend === 'consecutive-fails' ? 'bg-red-50 text-red-800 font-extrabold border border-red-200' :
                    'bg-slate-100 text-slate-650'
                  }`}>
                    {prof.trend.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className={`h-full ${prof.color} rounded-full`} style={{ width: `${prof.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Warning Logs (Col span 7) */}
        <div className="lg:col-span-7 space-y-4">
          <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
            ACTIVE SYSTEM WARNING TRIGGER LOGS ({isFree ? `${displayedLogs.length} of ${failedAnswersLogs.length} Capped` : failedAnswersLogs.length})
          </span>

          {isFree && failedAnswersLogs.length > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-[11px] font-semibold leading-relaxed">
              🔒 <strong>Basic Checklist Limit:</strong> Under your Free Student Tier, diagnostic logs are capped at 3 items. Upgrade to Pro Suite, Clinical Suite or Lifetime Pass to unlock unlimited logs and the full Gaps Warning Logs tracker.
            </div>
          )}

          {displayedLogs.length === 0 ? (
            <div className="p-8 text-center bg-white border border-dashed border-slate-200 rounded-[24px]">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-slate-805 text-sm">Perfect Performance Integrity</h4>
              <p className="text-xs text-slate-405 mt-1 leading-relaxed max-w-sm mx-auto">
                No consecutive failures logged! Your mental synapses are firing cleanly. To trigger error logs, fail practice drill options.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedLogs.map((log) => (
                <div key={log.id} className={`p-4 rounded-xl border flex justify-between items-start transition-all ${
                  log.alertLvl === 'High Danger' ? 'bg-red-50 border-red-200 text-red-950' : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[8.5px] font-black uppercase px-2 py-0.5 rounded-md ${
                        log.alertLvl === 'High Danger' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {log.alertLvl}
                      </span>
                      <strong className="text-xs font-black text-slate-800">{log.subject} Topic Deficiency</strong>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">
                      Weakness Area: <strong className="text-rose-700">{log.remedialTopic}</strong>
                    </p>
                    <p className="text-[10px] text-slate-450 leading-relaxed font-semibold">
                      Consecutive Errors: {log.consecutiveFailCount} misses logged. Latest failure recorded: {log.lastFailureDate}.
                    </p>
                  </div>
                  
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => clearTrigger(log.id)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-208 rounded text-[9.5px] font-black text-slate-700 cursor-pointer"
                    >
                      Clear Log
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Track Diagnostic Mistakes Area (Col span 5) */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-[24px] p-5 space-y-4">
          <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> RECENTLY ACCUMULATED MISTAKES LOG
          </span>
          
          <div className="space-y-3 text-xs divide-y divide-slate-105">
            <div className="pt-2">
              <span className="text-[10px] uppercase font-black tracking-wide text-rose-600">Physics 1st Block</span>
              <p className="font-bold text-slate-800 leading-tight mt-0.5">Snell's Law: Mirror vertically planar angle indices</p>
              <p className="text-[10px] text-slate-400 italic mt-1">Review refraction indexes n=1.5 to n=1.33.</p>
            </div>
            
            <div className="pt-3">
              <span className="text-[10px] uppercase font-black tracking-wide text-rose-600">Chemistry 2nd Block</span>
              <p className="font-bold text-slate-800 leading-tight mt-0.5">Stoichiometrics: Limiting Reactants mass yield</p>
              <p className="text-[10px] text-slate-400 italic mt-1">2 moles of hydrogen reacts with excess oxygen forming steam.</p>
            </div>

            <div className="pt-3">
              <span className="text-[10px] uppercase font-black tracking-wide text-amber-600">Biology 3rd Block</span>
              <p className="font-bold text-slate-800 leading-tight mt-0.5">Meiosis division: Homologous chromosomal synapsis stage</p>
              <p className="text-[10px] text-slate-400 italic mt-1">Crossing over occurs specifically in Prophase I.</p>
            </div>
          </div>
          
          <div className="p-3 bg-indigo-50 text-indigo-850 rounded-xl text-[10.5px] leading-relaxed border border-indigo-100">
            💡 <strong>Socratic Recommendation:</strong> When reviewing, Socrates recommends writing down the core formulas using pencil on physical index cards to enhance tactile synaptogenic preservation.
          </div>
        </div>

      </div>
    </div>
  );
}
