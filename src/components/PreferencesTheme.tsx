import React, { useState } from 'react';
import { User, Key, ShieldAlert, Check, Sparkles, LogOut, Sliders, AlertTriangle } from 'lucide-react';

interface PreferencesThemeProps {
  studentName: string;
  setStudentName: (name: string) => void;
  studentEmail: string;
  setStudentEmail: (email: string) => void;
  regNumber: string;
  setRegNumber: (num: string) => void;
  candidateLevel: string;
  setCandidateLevel: (lvl: string) => void;
  streak: number;
  accuracyIndex: string;
  setAccuracyIndex: (index: string) => void;
  userSuite: string;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  developerApiKey: string;
  setDeveloperApiKey: (key: string) => void;
  wipeAllData: () => void;
}

export default function PreferencesTheme({
  studentName,
  setStudentName,
  studentEmail,
  setStudentEmail,
  regNumber,
  setRegNumber,
  candidateLevel,
  setCandidateLevel,
  streak,
  accuracyIndex,
  setAccuracyIndex,
  userSuite,
  currentTheme,
  setCurrentTheme,
  developerApiKey,
  setDeveloperApiKey,
  wipeAllData,
}: PreferencesThemeProps) {
  const [password, setPassword] = useState('passcode123');
  const [avatarIndex, setAvatarIndex] = useState(1);
  const [showWipeConfirm, setShowWipeConfirm] = useState(false);

  const avatars = ['🐻', '🦊', '🦉', '🎓', '🍵', '🧬', '🧠', '🔬'];

  // Presets
  const themesList = [
    { id: 'cozy-bear', name: '🐻 Cozy Bear', description: 'Soft slate-gray & sky-blue highlights' },
    { id: 'strawberry-matcha', name: '🍵 Strawberry Matcha', description: 'Cream canvas, matcha green & strawberry rose accents' },
    { id: 'lilac-dream', name: '💜 Lilac Dream', description: 'Soft lavender, violet text & cloud backgrounds' },
    { id: 'pastel-pink-coquette', name: '🎀 Pastel Pink Coquette', description: 'Fairy pink, coquette lace border & rose gold buttons' },
    { id: 'winter', name: '❄️ Winter Frost', description: 'Glacial winter-blue borders with ice-white panels' },
    { id: 'red-blush', name: '🍷 Red Blush', description: 'Warm deep red highlights with rosy secondary borders' },
    { id: 'moon-dream', name: '🌙 Moon Dream Yellow', description: 'Nocturnal gold glow with starry outlines' },
  ];

  const handleWipeAction = () => {
    wipeAllData();
    setShowWipeConfirm(false);
    alert('All local database arrays and exam diagnostics have been purged. Refreshing workspace configurations.');
  };

  return (
    <div className="space-y-8 animate-fade-in" id="preferences-view-wrapper">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Student ID and credentials */}
        <div className="lg:col-span-5 space-y-6">
          <span className="block text-[11px] font-black uppercase text-slate-400 tracking-wider">OFFICIAL RECALL CREDENTIALS</span>
          
          {/* Cozy themed Student ID card */}
          <div className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-[24px] shadow-sm border border-slate-800 space-y-6 relative overflow-hidden group select-none">
            {/* Holographic background glow */}
            <div className="absolute -right-16 -bottom-16 w-44 h-44 bg-sky-500/10 rounded-full blur-2xl group-hover:scale-110 transition-all" />
            <div className="absolute -left-16 -top-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl" />

            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <h4 className="font-black text-sm tracking-wide text-indigo-200">MEDLY STUDENT PWA</h4>
                <p className="text-[9px] text-indigo-300 font-extrabold uppercase tracking-widest leading-none">Republic of the Philippines</p>
              </div>
              <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-500/20">
                {userSuite.replace(/\s*\(₱\d+\)/g, '').replace('Suite', '').trim()} Active
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Photo placeholder with chosen avatar */}
              <div className="w-16 h-16 rounded-2xl bg-indigo-900/60 border border-white/20 flex items-center justify-center text-3xl shadow-inner flex-shrink-0">
                {avatars[avatarIndex]}
              </div>

              <div className="space-y-1 overflow-hidden">
                <p className="text-sm font-black truncate text-white">{studentName}</p>
                <p className="text-[10px] font-mono text-indigo-200 truncate">{studentEmail}</p>
                <p className="text-[10px] text-slate-400">Class No: <strong className="font-mono text-white text-[11px]">{regNumber}</strong></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-4 text-center">
              <div className="bg-indigo-950/50 p-2 rounded-xl border border-white/5">
                <span className="block text-[8px] uppercase tracking-wide text-slate-400 font-extrabold">STREAK WEEK</span>
                <span className="text-[11px] font-black text-amber-400 block">{streak} Days</span>
              </div>
              <div className="bg-indigo-950/50 p-2 rounded-xl border border-white/5">
                <span className="block text-[8px] uppercase tracking-wide text-slate-400 font-extrabold">ACCURACY INDEX</span>
                <span className="text-[11px] font-black text-emerald-400 block">{accuracyIndex}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[8px] font-mono text-slate-500">
              <span>BOARD YEAR: 2026/2027</span>
              <span>MEDLY VERIFICATION RECALL ID</span>
            </div>
          </div>

          {/* Credentials Manager Form */}
          <div className="bg-white border border-slate-100 rounded-[24px] p-5 space-y-4">
            <h3 className="font-black text-sm text-slate-800 flex items-center gap-1.5 border-b pb-2">
              <User className="w-4 h-4 text-sky-550" /> Update Student Details
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Select Avatar Pattern</label>
                <div className="flex flex-wrap gap-2">
                  {avatars.map((av, index) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setAvatarIndex(index)}
                      className={`w-8 h-8 rounded-xl border flex items-center justify-center text-lg transition-all ${
                        avatarIndex === index ? 'border-sky-500 bg-sky-50 font-black scale-105' : 'border-slate-150 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Student Identifier Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Secret Email Channel</label>
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Candidate Registration Number</label>
                <input
                  type="text"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Accuracy Index Level</label>
                <input
                  type="text"
                  value={accuracyIndex}
                  onChange={(e) => setAccuracyIndex(e.target.value)}
                  placeholder="e.g. 86.4%"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Password/Passcode</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono"
                />
              </div>

              <button
                type="button"
                onClick={() => alert('Student credentials updated in local storage database!')}
                className="w-full py-2 bg-sky-600 hover:bg-sky-755 text-white font-black text-xs rounded-xl"
              >
                Save Details & Update ID
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Theme switcher, developer keys and regulatory block */}
        <div className="lg:col-span-7 space-y-6">
          <span className="block text-[11px] font-black uppercase text-slate-400 tracking-wider">SYSTEM CONFIGURATIONS & INTERFACE PRESETS</span>
          
          {/* Aesthetic UI Switcher */}
          <div className="bg-white border border-slate-100 rounded-[24px] p-5 space-y-4">
            <div>
              <h3 className="font-black text-sm text-slate-805 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-emerald-550" /> Interface Aesthetic Presets
              </h3>
              <p className="text-[11px] text-slate-450 mt-1">
                Customize colors, frames, and background highlights instantly across Medly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {themesList.map((them) => (
                <button
                  key={them.id}
                  onClick={() => {
                    setCurrentTheme(them.id);
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden ${
                    currentTheme === them.id
                      ? 'border-sky-500 bg-sky-50/70 text-sky-950 font-black'
                      : 'border-slate-150 bg-slate-50/50 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-extrabold">{them.name}</span>
                    {currentTheme === them.id && <Check className="w-3.5 h-3.5 text-sky-600" />}
                  </div>
                  <p className="text-[10px] text-slate-450 mt-1 font-medium leading-tight">{them.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Developer API Key Integration */}
          <div className="bg-white border border-slate-100 rounded-[24px] p-5 space-y-4">
            <h3 className="font-black text-sm text-slate-800 flex items-center gap-1.5 border-b pb-2">
              <Key className="w-4 h-4 text-yellow-500" /> Developer Key Integration
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Bring your own Gemini API keys for zero-cap Socratic coaching, dynamic quizzing, and personalized Clinical practice rationales. Secrets bypass Medly local servers securely.
            </p>
            
            <div className="text-xs space-y-2">
              <input
                type="password"
                placeholder="Paste your Google Gemini API Key here (AI models use this first)"
                value={developerApiKey}
                onChange={(e) => setDeveloperApiKey(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono"
              />
              <p className="text-[9px] text-slate-400">
                Key remains encrypted inside your private local sandbox storage block.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (developerApiKey) {
                    alert('Custom developer API Key registered! Bypassing sandbox server routes.');
                  } else {
                    alert('Using standard Medly sandbox server endpoint.');
                  }
                }}
                className="px-3.5 py-1.5 bg-slate-900 text-white font-bold rounded-lg cursor-pointer"
              >
                Register Key
              </button>
            </div>
          </div>

          {/* Regulatory Area Danger Block */}
          <div className="p-6 bg-red-50 border border-red-200 rounded-[24px] space-y-4 text-xs">
            <div className="flex items-center gap-2 text-rose-800">
              <span className="p-2 bg-red-600 text-white rounded-xl">
                <ShieldAlert className="w-5 h-5 animate-bounce" />
              </span>
              <div>
                <h4 className="font-black text-sm uppercase tracking-wide text-rose-950">Regulatory Area Danger Block</h4>
                <p className="text-[11px] text-rose-700">Wipe and format all active user configurations, calendar schedules, and vouchers.</p>
              </div>
            </div>
            <p className="text-rose-600 leading-relaxed text-[11px] font-semibold">
              Warning: Formatting is permanent. Wiping your data deletes all study timers, syllabus checkboxes, GCash references vouchers tracker and achievements logs. Ensure you export a backup prior to action.
            </p>

            {showWipeConfirm ? (
              <div className="space-y-2 fill-rose-50 p-4 bg-white rounded-xl border border-red-205 flex flex-col gap-1.5">
                <span className="font-extrabold text-slate-805 text-xs flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> Confirm wipe database format?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleWipeAction}
                    className="px-4 py-2 bg-red-600 hover:bg-red-750 text-white font-black rounded-lg cursor-pointer text-xs"
                  >
                    Yes, Wipe Everything
                  </button>
                  <button
                    onClick={() => setShowWipeConfirm(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-lg cursor-pointer text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowWipeConfirm(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl cursor-pointer"
              >
                Purge All Medly Data
              </button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
