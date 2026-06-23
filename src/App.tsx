import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import AIStudyEngine from './components/AIStudyEngine';
import TopicsTracker from './components/TopicsTracker';
import GwaCalculator from './components/GwaCalculator';
import SimulatedExam from './components/SimulatedExam';
import TheorySyllabi from './components/TheorySyllabi';
import CustomerServicesAdmin from './components/CustomerServicesAdmin';
import { getTheme } from './utils/themeStyles';

// Premium NMAT Modules
import AchievementsMetrics from './components/AchievementsMetrics';
import AITutorMode from './components/AITutorMode';
import SpacedRepetitionCoach from './components/SpacedRepetitionCoach';
import ClinicalPractice from './components/ClinicalPractice';
import DiagnosticWeakspots from './components/DiagnosticWeakspots';
import StudyPlannerCalendar from './components/StudyPlannerCalendar';
import AnnouncementsPage from './components/AnnouncementsPage';
import PremiumPage from './components/PremiumPage';
import PreferencesTheme from './components/PreferencesTheme';
import FeedbackPage from './components/FeedbackPage';
import CurriculumAdmin from './components/CurriculumAdmin';
import CommunityDiscussionBoard from './components/CommunityDiscussionBoard';
import ResourcesPage from './components/ResourcesPage';

// User Authentication Page & Firebase integration
import AuthPage from './components/AuthPage';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';

import { MedSchool, SrsConcept } from './types';
import { Compass, BookOpen, School, Calculator, ClipboardList, Send, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Custom states
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [tutorFocusTopic, setTutorFocusTopic] = useState<{
    id: string;
    subject: 'Biology' | 'Chemistry' | 'Physics' | 'Social Science';
    category: string;
    topic: string;
    description: string;
    priority: 'High' | 'Medium' | 'Extreme';
  } | null>(null);
  const [isDataLight, setIsDataLight] = useState<boolean>(false);
  
  const [nmatGoal, setNmatGoal] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('medly_nmat_goal');
      return stored ? parseInt(stored) : 95;
    } catch {
      return 95;
    }
  });

  const [undergradGwa, setUndergradGwa] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('medly_undergrad_gwa');
      return stored || '1.45';
    } catch {
      return '1.45';
    }
  });

  const [streak, setStreak] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('medly_streak');
      return stored ? parseInt(stored) : 0;
    } catch {
      return 0;
    }
  });

  const [solvedDrills, setSolvedDrills] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('medly_solved_drills');
      return stored ? parseInt(stored) : 0;
    } catch {
      return 0;
    }
  });

  const [spacedReviewWave, setSpacedReviewWave] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('medly_spaced_review_wave');
      return stored || '14 Days';
    } catch {
      return '14 Days';
    }
  });

  interface LocalNotification {
    id: string;
    text: string;
    type: 'info' | 'warning' | 'success';
    timestamp: string;
  }

  const [notifications, setNotifications] = useState<LocalNotification[]>(() => {
    try {
      const stored = localStorage.getItem('medly_notifications');
      return stored ? JSON.parse(stored) : []; // Starts empty (0 notification - from scratch)
    } catch {
      return [];
    }
  });

  const [currentUserEmail, setCurrentUserEmail] = useState<string>('studyfilesbyz@gmail.com');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('medly_is_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const handleAuthSuccess = (email: string, displayName: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('medly_is_authenticated', 'true');
    setStudentEmail(email);
    setCurrentUserEmail(email);
    setStudentName(displayName);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Firebase Auth sign out pending config:", e);
    }
    setIsAuthenticated(false);
    localStorage.removeItem('medly_is_authenticated');
    setStudentEmail('studyfilesbyz@gmail.com');
    setCurrentUserEmail('studyfilesbyz@gmail.com');
    setStudentName('Juan Dela Cruz');
    setActiveTab('dashboard');
  };
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('medly_active_theme');
      return stored || 'cozy-bear';
    } catch {
      return 'cozy-bear';
    }
  });

  const [subscriptionSimMode, setSubscriptionSimMode] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('medly_subscription_mode');
      return stored || 'Free Student Tier';
    } catch {
      return 'Free Student Tier';
    }
  });

  // State hooks for Student ID / Profile Preferences Theme
  const [studentName, setStudentName] = useState('Juan Dela Cruz');
  const [studentEmail, setStudentEmail] = useState('studyfilesbyz@gmail.com');
  const [regNumber, setRegNumber] = useState('NMAT-2026-8809');
  const [candidateLevel, setCandidateLevel] = useState('Undergraduate Senior Year');
  const [accuracyIndex, setAccuracyIndex] = useState('86.4%');
  const [developerApiKey, setDeveloperApiKey] = useState('GEMINI_KEY_SANDBOX');

  // Shared Clinical Practice failed answers logs (Diagnostic Warning triggers)
  const [failedAnswersLogs, setFailedAnswersLogs] = useState<any[]>([
    { id: 'log-1', subject: 'Physics', consecutiveFailCount: 3, alertLvl: 'High Danger', lastFailureDate: 'Just now', remedialTopic: 'Kinematics Speed Vector' },
    { id: 'log-2', subject: 'Chemistry', consecutiveFailCount: 2, alertLvl: 'Moderate Warning', lastFailureDate: '2 hours ago', remedialTopic: 'Stoichiometry Mass' }
  ]);

  // Vouchers and transaction tickets
  const [vouchers, setVouchers] = useState<any[]>([
    { id: 'vch-1', studentEmail: 'juan_dela_cruz@gmail.com', phone: '09173322114', tier: 'Pro Suite (₱79)', refNumber: '8823291039', amount: 79, status: 'Pending Approval', date: 'June 18, 2026' }
  ]);

  // Announcements list
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Tickets
  const [tickets, setTickets] = useState<any[]>([
    { id: 'tkt-1', subject: 'Formula sheet PDF rendering mismatch', description: 'The perceptual acuity matrix sheets are cut off in PWA landscape view on smaller Android screens.', status: 'Under Investigation', date: 'June 17, 2026' }
  ]);

  // Feedbacks
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  // Live registry of pre-med student accounts
  const [usersList, setUsersList] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('medly_users_list');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      { id: 'usr-1', name: 'Juan Dela Cruz', email: 'studyfilesbyz@gmail.com', suite: 'Free Student Tier' },
      { id: 'usr-2', name: 'Juan Dela Cruz', email: 'juan_dela_cruz@gmail.com', suite: 'Pro Suite (₱79)' },
      { id: 'usr-3', name: 'Hazel Santos', email: 'hazel_santos@gmail.com', suite: 'Clinical Suite (₱149)' },
      { id: 'usr-4', name: 'Jerome Mercado', email: 'jerome_mercado@gmail.com', suite: 'Lifetime Pass (₱249)' },
      { id: 'usr-5', name: 'Christine Alcantara', email: 'christine_alcantara@gmail.com', suite: 'Free Student Tier' }
    ];
  });

  // Sync with actual active Firebase session on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem('medly_is_authenticated', 'true');
        setStudentEmail(user.email || '');
        setCurrentUserEmail(user.email || '');
        if (user.displayName) {
          setStudentName(user.displayName);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Persist live users registry changes to storage
  useEffect(() => {
    try {
      localStorage.setItem('medly_users_list', JSON.stringify(usersList));
    } catch {}
  }, [usersList]);

  // Ref to track last synchronized values and prevent infinite state synchronization loops
  const lastSyncRef = useRef({
    name: studentName,
    email: studentEmail,
    suite: subscriptionSimMode
  });

  // Keep student profile and the pre-med users list registry in perfect non-looping synchrony
  useEffect(() => {
    const currentEmailClean = studentEmail.trim().toLowerCase();

    // Check if the current render's state variables changed from our last processed state
    const stateNameChanged = studentName !== lastSyncRef.current.name;
    const stateEmailChanged = studentEmail !== lastSyncRef.current.email;
    const stateSuiteChanged = subscriptionSimMode !== lastSyncRef.current.suite;

    if (stateNameChanged || stateEmailChanged || stateSuiteChanged) {
      if (stateEmailChanged) {
        // Always reset ALL statistics on new user sign-up/creation!
        setStreak(0);
        setSolvedDrills(0);
        setHabitTracker({
          'Active Recall Spacing': true,
          'Physics Formulas Revision': false,
          'Anki Loop Queue': true
        });
        setStudyLogs([]);
        setMoodLogs([]);
        setFailedAnswersLogs([]);
        setNmatGoal(95);
        setUndergradGwa('1.45');
        setAccuracyIndex('0.0%');
        setUserTargetSchools([]);
        setSrsConcepts([]);
        setNotifications([]);
        setRegNumber(`NMAT-2026-${Math.floor(1000 + Math.random() * 9000)}`);
        setCandidateLevel('Undergraduate Senior Year');
      }

      // Changes came from the student profile (e.g., Preference Theme edit or Upgrade checkout)
      setUsersList(prev => {
        const match = prev.find(u => u.email.trim().toLowerCase() === currentEmailClean);
        if (match) {
          if (match.name !== studentName || match.suite !== subscriptionSimMode) {
            return prev.map(u => u.email.trim().toLowerCase() === currentEmailClean
              ? { ...u, name: studentName, suite: subscriptionSimMode }
              : u
            );
          }
          return prev;
        } else {
          return [
            { id: `usr-${Date.now()}`, name: studentName, email: studentEmail, suite: subscriptionSimMode },
            ...prev
          ];
        }
      });

      // Update the reference with the newly updated state variables
      lastSyncRef.current = {
        name: studentName,
        email: studentEmail,
        suite: subscriptionSimMode
      };
    } else {
      // State did not change, so check if usersList changed from outside (e.g., edited by Admin)
      const match = usersList.find(u => u.email.trim().toLowerCase() === currentEmailClean);
      if (match) {
        let updated = false;
        if (match.name !== studentName) {
          setStudentName(match.name);
          updated = true;
        }
        if (match.suite !== subscriptionSimMode) {
          setSubscriptionSimMode(match.suite);
          updated = true;
        }
        if (updated) {
          lastSyncRef.current = {
            name: match.name,
            email: studentEmail,
            suite: match.suite
          };
        }
      }
    }
  }, [studentName, studentEmail, subscriptionSimMode, usersList]);

  // Study habit, calendars and telemetry sheets logs
  const [habitTracker, setHabitTracker] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('medly_habit_tracker');
      return stored ? JSON.parse(stored) : {
        'Active Recall Spacing': true,
        'Physics Formulas Revision': false,
        'Anki Loop Queue': true
      };
    } catch {
      return {
        'Active Recall Spacing': true,
        'Physics Formulas Revision': false,
        'Anki Loop Queue': true
      };
    }
  });

  const [studyLogs, setStudyLogs] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('medly_study_logs');
      return stored ? JSON.parse(stored) : [
        { id: 'sl-1', subject: 'Biology', hours: 3, date: '2026-06-18' },
        { id: 'sl-2', subject: 'Physics', hours: 2, date: '2026-06-17' }
      ];
    } catch {
      return [
        { id: 'sl-1', subject: 'Biology', hours: 3, date: '2026-06-18' },
        { id: 'sl-2', subject: 'Physics', hours: 2, date: '2026-06-17' }
      ];
    }
  });

  const [moodLogs, setMoodLogs] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('medly_mood_logs');
      return stored ? JSON.parse(stored) : [
        { id: 'ml-1', mood: 'Focused 🧠', date: '2026-06-18', note: 'Mastered Krebs cycle kinetics.' }
      ];
    } catch {
      return [
        { id: 'ml-1', mood: 'Focused 🧠', date: '2026-06-18', note: 'Mastered Krebs cycle kinetics.' }
      ];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('medly_habit_tracker', JSON.stringify(habitTracker));
    } catch {}
  }, [habitTracker]);

  useEffect(() => {
    try {
      localStorage.setItem('medly_study_logs', JSON.stringify(studyLogs));
    } catch {}
  }, [studyLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('medly_mood_logs', JSON.stringify(moodLogs));
    } catch {}
  }, [moodLogs]);

  const wipeAllData = () => {
    localStorage.clear();
    setStreak(0);
    setSolvedDrills(0);
    setNmatGoal(95);
    setUndergradGwa('1.50');
    setSpacedReviewWave('14 Days Cycle');
    setNotifications([]);
    setSubscriptionSimMode('Free Student Tier');
    setFailedAnswersLogs([]);
    setVouchers([]);
    setHabitTracker({});
    setStudyLogs([]);
    setMoodLogs([]);
    setFeedbacks([]);
    alert('Medly storage cleared successfully! You have started fresh with zero records.');
  };

  const handleResetCurrentSelfMetrics = () => {
    setSolvedDrills(0);
    setStudyLogs([]);
    setMoodLogs([]);
    setHabitTracker({
      'Active Recall Spacing': true,
      'Physics Formulas Revision': false,
      'Anki Loop Queue': true
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem('medly_subscription_mode', subscriptionSimMode);
    } catch {}
  }, [subscriptionSimMode]);

  useEffect(() => {
    try {
      localStorage.setItem('medly_active_theme', currentTheme);
    } catch {}
  }, [currentTheme]);

  useEffect(() => {
    try {
      localStorage.setItem('medly_nmat_goal', String(nmatGoal));
    } catch {}
  }, [nmatGoal]);

  useEffect(() => {
    try {
      localStorage.setItem('medly_undergrad_gwa', undergradGwa);
    } catch {}
  }, [undergradGwa]);

  // Automatically calculate the student recall streak based on:
  // - Unique study days logged in studyLogs
  // - Completed active recall checklist items in habitTracker
  // - Solved practice drills bonus (1 day for every 4 drills completed)
  useEffect(() => {
    const uniqueDays = new Set((studyLogs || []).map((l: any) => l.date)).size;
    const completedHabits = Object.values(habitTracker || {}).filter(Boolean).length;
    const drillsBonus = Math.floor((solvedDrills || 0) / 4);
    const computed = Math.max(1, uniqueDays + completedHabits + drillsBonus);
    setStreak(computed);
  }, [studyLogs, habitTracker, solvedDrills]);

  useEffect(() => {
    try {
      localStorage.setItem('medly_streak', String(streak));
    } catch {}
  }, [streak]);

  useEffect(() => {
    try {
      localStorage.setItem('medly_solved_drills', String(solvedDrills));
    } catch {}
  }, [solvedDrills]);

  useEffect(() => {
    try {
      localStorage.setItem('medly_spaced_review_wave', spacedReviewWave);
    } catch {}
  }, [spacedReviewWave]);

  useEffect(() => {
    try {
      localStorage.setItem('medly_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  // Initial Med Schools Reference List (Specific to Philippines) - Customizable State
  const [medSchools, setMedSchools] = useState<MedSchool[]>(() => {
    try {
      const stored = localStorage.getItem('medly_med_schools');
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('medly_med_schools', JSON.stringify(medSchools));
    } catch {}
  }, [medSchools]);

  // Student's chosen target universities milestones list - Starts empty as requested
  const [userTargetSchools, setUserTargetSchools] = useState<MedSchool[]>(() => {
    try {
      const stored = localStorage.getItem('medly_user_target_schools');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('medly_user_target_schools', JSON.stringify(userTargetSchools));
    } catch {}
  }, [userTargetSchools]);

  // Initial SRS Spaced Repetition concepts (Philippine premed topics)
  const [srsConcepts, setSrsConcepts] = useState<SrsConcept[]>(() => {
    try {
      const stored = localStorage.getItem('medly_srs_concepts');
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    return []; // Empty by default so user starts from scratch
  });

  useEffect(() => {
    localStorage.setItem('medly_srs_concepts', JSON.stringify(srsConcepts));
  }, [srsConcepts]);

  // Sub tab for Regulatory Prep view
  const [regulatorySubTab, setRegulatorySubTab] = useState<'tracker' | 'gwa'>('tracker');

  // Dynamic theme wrapper styles
  const activeThemeConfig = getTheme(currentTheme);
  const getThemeWrapperClass = () => {
    return `${activeThemeConfig.bgClass} ${activeThemeConfig.textPrimary}`;
  };

  if (!isAuthenticated) {
    return (
      <AuthPage 
        onSuccess={handleAuthSuccess} 
        defaultEmail={studentEmail}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased ${getThemeWrapperClass()} ${
      isDataLight ? 'max-w-6xl mx-auto shadow-none' : ''
    } relative overflow-hidden`}>
      {/* Cutesy Decorative Accent Background Elements */}
      <div className="absolute top-10 left-4 pointer-events-none opacity-30 select-none animate-bounce" style={{ animationDuration: '8s' }}>
        <span className="text-3xl">{activeThemeConfig.emoji}</span>
      </div>
      <div className="absolute top-24 right-4 pointer-events-none opacity-25 select-none animate-pulse" style={{ animationDuration: '5s' }}>
        <span className="text-2xl">✨</span>
      </div>
      <div className="absolute bottom-16 left-6 pointer-events-none opacity-20 select-none animate-pulse" style={{ animationDuration: '7s' }}>
        <span className="text-xl">🌸</span>
      </div>
      <div className="absolute bottom-32 right-8 pointer-events-none opacity-25 select-none animate-bounce" style={{ animationDuration: '10s' }}>
        <span className="text-3xl">{activeThemeConfig.emoji}</span>
      </div>

      {/* Navigation Header bar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        isDataLight={isDataLight}
        setIsDataLight={setIsDataLight}
        nmatGoal={nmatGoal}
        streak={streak}
        currentUserEmail={studentEmail}
        currentTheme={currentTheme}
        onSignOut={handleSignOut}
      />

      {/* Main body viewport */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-2.5 xs:p-4 sm:p-6 lg:p-8">
        
        {/* Render Tab Content */}
        {activeTab === 'dashboard' && (
          <Dashboard
            medSchools={medSchools}
            userTargetSchools={userTargetSchools}
            setUserTargetSchools={setUserTargetSchools}
            srsConcepts={srsConcepts}
            isOffline={isOffline}
            isDataLight={isDataLight}
            nmatGoal={nmatGoal}
            setNmatGoal={setNmatGoal}
            undergradGwa={undergradGwa}
            setUndergradGwa={setUndergradGwa}
            streak={streak}
            setStreak={setStreak}
            solvedDrills={solvedDrills}
            setSolvedDrills={setSolvedDrills}
            spacedReviewWave={spacedReviewWave}
            setSpacedReviewWave={setSpacedReviewWave}
            notifications={notifications}
            setNotifications={setNotifications}
            setActiveTab={setActiveTab}
            startSrsReview={() => setActiveTab('clinical-practice')}
            currentTheme={currentTheme}
            userSuite={subscriptionSimMode}
            currentUserEmail={studentEmail}
            usersList={usersList}
            announcements={announcements}
          />
        )}

        {activeTab === 'achievements-metrics' && (
          <AchievementsMetrics
            streak={streak}
            solvedDrills={solvedDrills}
            undergradGwa={undergradGwa}
            studyLogs={studyLogs}
            failedAnswersLogs={failedAnswersLogs}
          />
        )}

        {activeTab === 'topics-tracker' && (
          <TopicsTracker 
            onAskAi={(topicItem) => {
              setTutorFocusTopic(topicItem);
              setActiveTab('ai-tutor-mode');
            }}
          />
        )}

        {activeTab === 'ai-tutor-mode' && (
          <AITutorMode 
            isOffline={isOffline}
            focusedTopic={tutorFocusTopic}
            onClearFocusedTopic={() => setTutorFocusTopic(null)}
          />
        )}

        {activeTab === 'spaced-repetition-coach' && (
          <SpacedRepetitionCoach />
        )}

        {activeTab === 'clinical-practice' && (
          <ClinicalPractice
            solvedDrills={solvedDrills}
            setSolvedDrills={setSolvedDrills}
            failedAnswersLogs={failedAnswersLogs}
            setFailedAnswersLogs={setFailedAnswersLogs}
          />
        )}

        {/* Real-time full Simulated Mock Exams Suite */}
        {activeTab === 'simulated-exam' && (
          <SimulatedExam />
        )}

        {activeTab === 'diagnostic-weakspots' && (
          <DiagnosticWeakspots
            failedAnswersLogs={failedAnswersLogs}
            setFailedAnswersLogs={setFailedAnswersLogs}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'study-planner-calendar' && (
          <StudyPlannerCalendar
            habitTracker={habitTracker}
            setHabitTracker={setHabitTracker}
            studyLogs={studyLogs}
            setStudyLogs={setStudyLogs}
            moodLogs={moodLogs}
            setMoodLogs={setMoodLogs}
          />
        )}

        {activeTab === 'announcements-news' && (
          <AnnouncementsPage
            announcements={announcements}
            setAnnouncements={setAnnouncements}
          />
        )}

        {activeTab === 'premium-page' && (
          <PremiumPage
            userSuite={subscriptionSimMode}
            setUserSuite={setSubscriptionSimMode}
            vouchers={vouchers}
            setVouchers={setVouchers}
          />
        )}

        {activeTab === 'preferences-theme' && (
          <PreferencesTheme
            studentName={studentName}
            setStudentName={setStudentName}
            studentEmail={studentEmail}
            setStudentEmail={setStudentEmail}
            regNumber={regNumber}
            setRegNumber={setRegNumber}
            candidateLevel={candidateLevel}
            setCandidateLevel={setCandidateLevel}
            streak={streak}
            accuracyIndex={accuracyIndex}
            setAccuracyIndex={setAccuracyIndex}
            userSuite={subscriptionSimMode}
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
            developerApiKey={developerApiKey}
            setDeveloperApiKey={setDeveloperApiKey}
            wipeAllData={wipeAllData}
          />
        )}

        {activeTab === 'community-discussion' && (
          <CommunityDiscussionBoard />
        )}

        {activeTab === 'resources-page' && (
          <ResourcesPage currentUserEmail={studentEmail} />
        )}

        {activeTab === 'feedback-logs' && (
          <FeedbackPage
            feedbacks={feedbacks}
            setFeedbacks={setFeedbacks}
          />
        )}

        {activeTab === 'curriculum-admin' && (
          <CurriculumAdmin
            userSuite={subscriptionSimMode}
            setUserSuite={setSubscriptionSimMode}
            vouchers={vouchers}
            setVouchers={setVouchers}
            announcements={announcements}
            setAnnouncements={setAnnouncements}
            tickets={tickets}
            setTickets={setTickets}
            feedbacks={feedbacks}
            currentUserEmail={studentEmail}
            medSchools={medSchools}
            setMedSchools={setMedSchools}
            usersList={usersList}
            setUsersList={setUsersList}
            onResetSelfMetrics={handleResetCurrentSelfMetrics}
          />
        )}

      </main>

      {/* Footer bar */}
      <footer className={`${activeThemeConfig.cardBg} border-t ${activeThemeConfig.borderClass} py-6 mt-12`}>
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className={`text-[11px] ${activeThemeConfig.textSecondary}`} id="medly-footer-text">
            Medly for Philippine NMAT
          </p>
          <div className="flex justify-center space-x-4 text-[10px] opacity-70 font-bold">
            <span className={activeThemeConfig.accentText}>Active Theme: <strong className="uppercase font-black">{currentTheme}</strong></span>
            <span>•</span>
            <span>Version PWA-Offline 4.2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
