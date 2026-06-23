import React, { useState } from 'react';
import { 
  Compass, 
  BrainCircuit, 
  School, 
  Users, 
  Zap, 
  Wifi, 
  WifiOff, 
  Flame, 
  Gauge,
  Sparkles,
  Award,
  Sliders,
  Menu,
  X,
  AlertTriangle,
  Calendar,
  Bell,
  MessageSquare,
  Clock,
  Shield,
  FolderOpen,
  BookOpen,
  Activity,
  Trophy,
  LogOut
} from 'lucide-react';
import { getTheme } from '../utils/themeStyles';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  isDataLight: boolean;
  setIsDataLight: (val: boolean) => void;
  nmatGoal: number;
  streak: number;
  currentUserEmail: string;
  currentTheme?: string;
  onSignOut?: () => void;
}

export default function Navigation({
  activeTab,
  setActiveTab,
  isOffline,
  setIsOffline,
  isDataLight,
  setIsDataLight,
  nmatGoal,
  streak,
  currentUserEmail,
  currentTheme = 'cozy-bear',
  onSignOut,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const themeCfg = getTheme(currentTheme);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Gauge, desc: 'Central performance metrics, License status, Live rankings, Board challenge' },
    { id: 'achievements-metrics', label: 'Achievements & Metrics', icon: Award, desc: 'Simulated pass probability, study heatmap, subject radar, deficiency tracker, badges' },
    { id: 'topics-tracker', label: 'Syllabus & Readiness Map', icon: BookOpen, desc: 'Checklists of subjects for Chemistry, Biology, Physics, & Social Sciences plus readiness map' },
    { id: 'ai-tutor-mode', label: 'AI Tutor Mode', icon: Sparkles, desc: 'Interactive socratic prep mentors' },
    { id: 'community-discussion', label: 'Community Hub', icon: MessageSquare, desc: 'Discuss study tips, admissions, & mnemonics with other pre-meds' },
    { id: 'resources-page', label: 'Study Resources Vault', icon: FolderOpen, desc: 'High-yield practice drills, study notes, and mock booklet exams' },
    { id: 'spaced-repetition-coach', label: 'Spaced Repetition Coach', icon: BrainCircuit, desc: 'Rigorous spacing study agenda generator' },
    { id: 'clinical-practice', label: 'Clinical Practice Drills', icon: Compass, desc: '60s timed sprints with randomized difficulty' },
    { id: 'simulated-exam', label: 'Simulated Board Exam', icon: Clock, desc: '120-item Part 1 & Part 2 timed simulators' },
    { id: 'diagnostic-weakspots', label: 'Diagnostic Weakspots', icon: AlertTriangle, desc: 'Failed drills warning indicators logs' },
    { id: 'study-planner-calendar', label: 'Pre-Med Calendar', icon: Calendar, desc: 'Log schedules, student habits, focus hours, mood logs' },
    { id: 'announcements-news', label: 'NMAT Announcements', icon: Bell, desc: 'Official filings bulletins and notifications' },
    { id: 'premium-page', label: 'Premium Pass', icon: Award, desc: 'Unlock Medly Pro & Clinical Suite comparative blueprints' },
    { id: 'preferences-theme', label: 'Student ID & Settings', icon: Sliders, desc: 'Cozy badge card, custom themes, custom API keys' },
    { id: 'feedback-logs', label: 'Submit Feedback', icon: MessageSquare, desc: 'Help Medly curriculum coordinators polish the platform' },
  ];

  // If user is from authorized email admin profile, attach the system administrator block
  const isAdmin = currentUserEmail.trim().toLowerCase() === 'studyfilesbyz@gmail.com';
  const displayTabs = isAdmin 
    ? [...tabs, { id: 'curriculum-admin', label: 'Curriculum Admin Hub', icon: Shield, desc: 'Manage users, approvals, tickets, and feedbacks' }] 
    : tabs;

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`w-full bg-white border-b ${themeCfg.borderClass} sticky top-0 z-40 transition-all select-none shadow-xs`}>
        {/* Top Bar info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Hamburger and Brand Logo Group */}
            <div className="flex items-center space-x-3">
              {/* Hamburger Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2.5 -ml-2 rounded-xl text-slate-600 hover:${themeCfg.accentText} hover:bg-slate-50 transition-all duration-150 focus:outline-none cursor-pointer group`}
                aria-label="Toggle navigation menu"
                title="Open system navigation menu"
                id="hamburger-menu-btn"
              >
                <Menu className="w-6 h-6 group-hover:scale-105 transition-all" />
              </button>


              {/* Logo */}
              <div 
                className="flex items-center space-x-2.5 cursor-pointer" 
                onClick={() => handleTabClick('dashboard')}
              >
                <svg viewBox="0 0 512 512" fill="none" className="w-10 h-10 shadow-sm rounded-xl transition-all hover:scale-105 hidden sm:block" aria-hidden="true">
                  <rect width="512" height="512" rx="120" fill={themeCfg.id === 'cozy-bear' ? '#1b4cb4' : themeCfg.btnPrimary.split(' ')[0].replace('bg-[', '').replace(']', '') || '#1b4cb4'} />
                  <rect x="226" y="136" width="60" height="240" rx="18" fill="white" />
                  <rect x="136" y="226" width="240" height="60" rx="18" fill="white" />
                  <path d="M102 256 H160 L190 170 L222 342 L242 256 H280" stroke="#ffdce5" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M280 256 H300 L326 210 L342 302 L358 250 H410" stroke="#ffdce5" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <span className="font-extrabold text-xl tracking-tight text-slate-850 font-sans flex items-center gap-1.5">
                    Medly
                    <span className="animate-pulse text-base">{themeCfg.emoji}</span>
                  </span>
                  <span className="text-[10px] block text-slate-500 font-bold leading-none uppercase tracking-wide">Nmat Prep</span>
                </div>
              </div>
            </div>

            {/* Quick status bar */}
            <div className="hidden md:flex items-center space-x-4 text-sm ml-6">
              <div className={`flex items-center space-x-1.5 px-3 py-1 ${themeCfg.accentBg} ${themeCfg.accentText} ${themeCfg.accentBorder} border rounded-full font-bold text-xs`}>
                <Award className="w-3.5 h-3.5" />
                <span>Target: <strong className="font-black">{nmatGoal > 0 ? `${nmatGoal}+ PR` : 'Not Set'}</strong></span>
              </div>

              <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-50 text-amber-805 rounded-full font-black text-xs border border-amber-200 shadow-2xs animate-pulse">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>Streak: {streak} {streak === 1 ? 'day' : 'days'} {themeCfg.emoji}</span>
              </div>
            </div>

            {/* Switches and responsive triggers */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Data-Light Mode Switch */}
              <button
                onClick={() => setIsDataLight(!isDataLight)}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                  isDataLight
                    ? 'bg-sky-100 border-sky-300 text-sky-950'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title="Toggle Data-Light Mode for low mobile data limits"
              >
                <Zap className={`w-3.5 h-3.5 ${isDataLight ? 'text-sky-600 fill-sky-600' : 'text-slate-400'}`} />
                <span className="hidden md:inline">Data-Light {isDataLight ? 'ON' : 'OFF'}</span>
                <span className="md:hidden">{isDataLight ? 'Lite' : 'Full'}</span>
              </button>

              {/* Sign Out Button in Header */}
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-rose-50 border border-rose-250 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold cursor-pointer transition-all shadow-3xs"
                  title="Sign Out of your candidate profile"
                  id="header-signout-btn"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" strokeWidth={2.5} />
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden">Exit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out Navigation Drawer Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity duration-300 cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
          id="menu-overlay"
        />
      )}

      {/* Drawer Panel */}
      <div 
        className={`fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white h-screen shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col justify-between border-r border-[#EBF1FA] ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id="menu-drawer"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => handleTabClick('dashboard')}>
              <svg viewBox="0 0 512 512" fill="none" className="w-8 h-8 shadow-sm rounded-lg" aria-hidden="true">
                <rect width="512" height="512" rx="120" fill="#1b4cb4" />
                <rect x="226" y="136" width="60" height="240" rx="18" fill="white" />
                <rect x="136" y="226" width="240" height="60" rx="18" fill="white" />
              </svg>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-slate-850">Medly</span>
                <span className="text-[9px] block text-sky-600 font-bold leading-none uppercase tracking-wide">PH NMAT PREP</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stats Block inside sidebar drawer */}
          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-750">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-sky-500" /> Target PR:
              </span>
              <span className="text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md font-extrabold">{nmatGoal > 0 ? `${nmatGoal}+ Percentile` : 'Not Set'}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs font-bold text-slate-750">
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> Active Streak:
              </span>
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-extrabold">{streak} {streak === 1 ? 'Day' : 'Days'}</span>
            </div>
          </div>
        </div>

        {/* Drawer Main Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 scrollbar-thin">
          {displayTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-start space-x-3 p-3 rounded-xl transition-all duration-150 text-left hover:scale-[1.01] cursor-pointer ${
                  isActive
                    ? `${themeCfg.accentBg} border ${themeCfg.accentBorder} ${themeCfg.accentText} border shadow-xs`
                    : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <span className={`p-2 rounded-lg ${isActive ? `bg-white ${themeCfg.iconColor} shadow-xs` : 'bg-slate-100 text-slate-500'}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-bold text-xs sm:text-sm">{tab.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{tab.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Drawer Footer Settings shortcut */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col gap-2.5">
          {onSignOut && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onSignOut();
              }}
              className="w-full py-2.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs"
            >
              <LogOut className="w-4 h-4 text-rose-500" strokeWidth={2.5} />
              <span>Sign Out Profile</span>
            </button>
          )}
          <div className="text-[10px] text-slate-400 text-center font-medium">
            Medly Pre-Med Community Sync Active
          </div>
        </div>
      </div>
    </>
  );
}
