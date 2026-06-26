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
import NmatTakesTracker from './components/NmatTakesTracker';

// User Authentication Page & Firebase integration
import AuthPage from './components/AuthPage';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './lib/firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

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
  
  // Synchronously load authenticated email first to prevent flash/overwrite of pre-populated data
  const [studentEmail, setStudentEmail] = useState<string>(() => {
    try {
      const isAuthed = localStorage.getItem('medly_is_authenticated') === 'true';
      const stored = localStorage.getItem('medly_student_email');
      return isAuthed && stored ? stored : 'studyfilesbyz@gmail.com';
    } catch {
      return 'studyfilesbyz@gmail.com';
    }
  });

  const [studentName, setStudentName] = useState<string>(() => {
    try {
      const isAuthed = localStorage.getItem('medly_is_authenticated') === 'true';
      const stored = localStorage.getItem('medly_student_name');
      return isAuthed && stored ? stored : 'Juan Dela Cruz';
    } catch {
      return 'Juan Dela Cruz';
    }
  });

  const [currentUserEmail, setCurrentUserEmail] = useState<string>(studentEmail);

  const isFresh = studentEmail.trim().toLowerCase() !== 'studyfilesbyz@gmail.com';

  const [nmatGoal, setNmatGoal] = useState<number>(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      const stored = localStorage.getItem(`medly_nmat_goal_${emailKey}`);
      return stored ? parseInt(stored) : (emailKey !== 'studyfilesbyz@gmail.com' ? 0 : 95);
    } catch {
      return 95;
    }
  });

  const [undergradGwa, setUndergradGwa] = useState<string>(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      const stored = localStorage.getItem(`medly_undergrad_gwa_${emailKey}`);
      return stored || (emailKey !== 'studyfilesbyz@gmail.com' ? '3.00' : '1.45');
    } catch {
      return '1.45';
    }
  });

  const [streak, setStreak] = useState<number>(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      const stored = localStorage.getItem(`medly_streak_${emailKey}`);
      return stored ? parseInt(stored) : 0;
    } catch {
      return 0;
    }
  });

  const [solvedDrills, setSolvedDrills] = useState<number>(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      const stored = localStorage.getItem(`medly_solved_drills_${emailKey}`);
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

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('medly_is_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const handleAuthSuccess = (email: string, displayName: string) => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem('medly_is_authenticated', 'true');
      localStorage.setItem('medly_student_email', email);
      localStorage.setItem('medly_student_name', displayName || 'Juan Dela Cruz');
    } catch {}

    const emailKey = email.trim().toLowerCase();
    const isSpecialAdmin = emailKey === 'studyfilesbyz@gmail.com';
    const targetSuite = isSpecialAdmin ? 'Lifetime Pass (₱249)' : 'Free Student Tier';

    setSubscriptionSimMode(targetSuite);
    try {
      localStorage.setItem('medly_subscription_mode', targetSuite);
    } catch {}

    // Force initialization of fresh users from scratch!
    if (!isSpecialAdmin) {
      try {
        localStorage.setItem(`medly_streak_${emailKey}`, '0');
        localStorage.setItem(`medly_nmat_goal_${emailKey}`, '0');
        localStorage.setItem(`medly_undergrad_gwa_${emailKey}`, '3.00');
        localStorage.setItem(`medly_solved_drills_${emailKey}`, '0');
        localStorage.setItem(`medly_accuracy_index_${emailKey}`, '0.0%');
        localStorage.setItem(`medly_habit_tracker_${emailKey}`, JSON.stringify({
          'Active Recall Spacing': false,
          'Physics Formulas Revision': false,
          'Anki Loop Queue': false
        }));
        localStorage.setItem(`medly_study_logs_${emailKey}`, JSON.stringify([]));
        localStorage.setItem(`medly_mood_logs_${emailKey}`, JSON.stringify([]));
        localStorage.setItem(`medly_failed_answers_logs_${emailKey}`, JSON.stringify([]));
      } catch {}
    } else {
      try {
        localStorage.setItem(`medly_nmat_goal_${emailKey}`, '95');
        localStorage.setItem(`medly_undergrad_gwa_${emailKey}`, '1.45');
        localStorage.setItem(`medly_accuracy_index_${emailKey}`, '86.4%');
      } catch {}
    }

    setStudentEmail(email);
    setCurrentUserEmail(email);
    setStudentName(displayName || 'Juan Dela Cruz');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Firebase Auth sign out pending config:", e);
    }
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('medly_is_authenticated');
      localStorage.removeItem('medly_student_email');
      localStorage.removeItem('medly_student_name');
    } catch {}
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
  const [regNumber, setRegNumber] = useState('NMAT-2026-8809');
  const [candidateLevel, setCandidateLevel] = useState('Undergraduate Senior Year');
  
  const [accuracyIndex, setAccuracyIndex] = useState<string>(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      const stored = localStorage.getItem(`medly_accuracy_index_${emailKey}`);
      return stored || (emailKey !== 'studyfilesbyz@gmail.com' ? '0.0%' : '86.4%');
    } catch {
      return '86.4%';
    }
  });

  const [developerApiKey, setDeveloperApiKey] = useState('GEMINI_KEY_SANDBOX');

  // Shared Clinical Practice failed answers logs (Diagnostic Warning triggers)
  const [failedAnswersLogs, setFailedAnswersLogs] = useState<any[]>(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      const stored = localStorage.getItem(`medly_failed_answers_logs_${emailKey}`);
      if (stored) return JSON.parse(stored);
      if (emailKey !== 'studyfilesbyz@gmail.com') return [];
    } catch {}
    return [
      { id: 'log-1', subject: 'Physics', consecutiveFailCount: 3, alertLvl: 'High Danger', lastFailureDate: 'Just now', remedialTopic: 'Kinematics Speed Vector' },
      { id: 'log-2', subject: 'Chemistry', consecutiveFailCount: 2, alertLvl: 'Moderate Warning', lastFailureDate: '2 hours ago', remedialTopic: 'Stoichiometry Mass' }
    ];
  });

  // Vouchers and transaction tickets
  const [vouchers, setVouchers] = useState<any[]>(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      if (emailKey !== 'studyfilesbyz@gmail.com') return [];
    } catch {}
    return [
      { id: 'vch-1', studentEmail: 'juan_dela_cruz@gmail.com', phone: '09173322114', tier: 'Pro Suite (₱79)', refNumber: '8823291039', amount: 79, status: 'Pending Approval', date: 'June 18, 2026' }
    ];
  });

  // Announcements list
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Tickets
  const [tickets, setTickets] = useState<any[]>(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      if (emailKey !== 'studyfilesbyz@gmail.com') return [];
    } catch {}
    return [
      { id: 'tkt-1', subject: 'Formula sheet PDF rendering mismatch', description: 'The perceptual acuity matrix sheets are cut off in PWA landscape view on smaller Android screens.', status: 'Under Investigation', date: 'June 17, 2026' }
    ];
  });

  // Feedbacks
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  // Live registry of pre-med student accounts
  const [usersList, setUsersList] = useState<any[]>([]);

  // Subscribe to real-time live_users list from Firestore (excluding pre-built users)
  useEffect(() => {
    try {
      const q = collection(db, "live_users");
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const list: any[] = [];
        let hasAdmin = false;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const docId = doc.id;
          const emailClean = (data.email || '').trim().toLowerCase();
          
          if (emailClean === 'studyfilesbyz@gmail.com') {
            hasAdmin = true;
          }

          // Filter out pre-built / mock / competitor users
          if (docId.startsWith("usr_comp_") || emailClean.endsWith("@example.com")) {
            return;
          }
          list.push({
            id: docId,
            docId: docId,
            name: data.name || "Anonymous Pre-Med",
            email: emailClean,
            suite: data.suite || "Free Student Tier",
            premed: data.premed || "Pre-Med Student",
            score: typeof data.score === "number" ? data.score : 85.0,
            solvedDrills: typeof data.solvedDrills === "number" ? data.solvedDrills : 0,
            lastUpdated: data.lastUpdated || Date.now()
          });
        });

        // Auto-seed studyfilesbyz@gmail.com if not present in Firestore
        if (!hasAdmin) {
          const adminDocId = "usr_self_studyfilesbyz_gmail_com";
          setDoc(doc(db, "live_users", adminDocId), {
            id: adminDocId,
            name: "studyfilesbyz",
            email: "studyfilesbyz@gmail.com",
            suite: "Clinical Premium (Admin)",
            premed: "UP Manila (BS Biology)",
            score: 95.0,
            solvedDrills: 120,
            lastUpdated: Date.now()
          }, { merge: true }).catch(err => {
            console.warn("Seeding studyfilesbyz admin account pending configuration:", err);
          });
          
          // Also immediately append to list for real-time responsiveness if firestore write is pending/blocked
          const alreadyInList = list.some(u => u.email === 'studyfilesbyz@gmail.com');
          if (!alreadyInList) {
            list.push({
              id: adminDocId,
              docId: adminDocId,
              name: "studyfilesbyz",
              email: "studyfilesbyz@gmail.com",
              suite: "Clinical Premium (Admin)",
              premed: "UP Manila (BS Biology)",
              score: 95.0,
              solvedDrills: 120,
              lastUpdated: Date.now()
            });
          }
        }

        setUsersList(list);
      }, (error) => {
        console.warn("Error subscribing to live_users in App.tsx:", error);
        
        // Dynamic fallback if offline or permissions block
        const fallbackList = [
          {
            id: "usr_self_studyfilesbyz_gmail_com",
            docId: "usr_self_studyfilesbyz_gmail_com",
            name: "studyfilesbyz",
            email: "studyfilesbyz@gmail.com",
            suite: "Clinical Premium (Admin)",
            premed: "UP Manila (BS Biology)",
            score: 95.0,
            solvedDrills: 120,
            lastUpdated: Date.now()
          }
        ];
        setUsersList(fallbackList);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Firestore collection subscribe error:", e);
    }
  }, []);

  // Sync the current user's profile to Firestore "live_users" collection on profile/suite updates
  useEffect(() => {
    if (!studentEmail || studentEmail.trim() === '') return;
    const emailClean = studentEmail.trim().toLowerCase();
    const docId = "usr_self_" + emailClean.replace(/[^a-zA-Z0-9]/g, "_");

    const timer = setTimeout(async () => {
      try {
        const userRef = doc(db, "live_users", docId);
        await setDoc(userRef, {
          id: docId,
          name: studentName,
          email: emailClean,
          suite: subscriptionSimMode || "Free Student Tier",
          premed: "UP Manila (BS Biology)", // default premed
          lastUpdated: Date.now()
        }, { merge: true });
      } catch (err) {
        console.warn("App-level user profile sync pending:", err);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [studentEmail, studentName, subscriptionSimMode]);

  // Sync with actual active Firebase session on mount
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      if (auth && (auth as any)._isMock) {
        if (typeof auth.onAuthStateChanged === 'function') {
          unsubscribe = auth.onAuthStateChanged((user: any) => {
            // Dummy auth callback
          });
        }
      } else {
        unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsAuthenticated(true);
            try {
              localStorage.setItem('medly_is_authenticated', 'true');
            } catch {}
            setStudentEmail(user.email || '');
            setCurrentUserEmail(user.email || '');
            if (user.displayName) {
              setStudentName(user.displayName);
            }
          }
        });
      }
    } catch (e) {
      console.warn("onAuthStateChanged subscription failed:", e);
    }
    return () => {
      try {
        unsubscribe();
      } catch {}
    };
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
        const emailKey = studentEmail.trim().toLowerCase();
        const isFreshUser = emailKey !== 'studyfilesbyz@gmail.com';

        let storedStreak: string | null = null;
        let storedGoal: string | null = null;
        let storedGwa: string | null = null;
        let storedDrills: string | null = null;
        let storedAccuracy: string | null = null;
        let storedHabits: string | null = null;
        let storedStudyLogs: string | null = null;
        let storedMoodLogs: string | null = null;
        let storedFailLogs: string | null = null;

        try {
          storedStreak = localStorage.getItem(`medly_streak_${emailKey}`);
          storedGoal = localStorage.getItem(`medly_nmat_goal_${emailKey}`);
          storedGwa = localStorage.getItem(`medly_undergrad_gwa_${emailKey}`);
          storedDrills = localStorage.getItem(`medly_solved_drills_${emailKey}`);
          storedAccuracy = localStorage.getItem(`medly_accuracy_index_${emailKey}`);
          storedHabits = localStorage.getItem(`medly_habit_tracker_${emailKey}`);
          storedStudyLogs = localStorage.getItem(`medly_study_logs_${emailKey}`);
          storedMoodLogs = localStorage.getItem(`medly_mood_logs_${emailKey}`);
          storedFailLogs = localStorage.getItem(`medly_failed_answers_logs_${emailKey}`);
        } catch {}

        setStreak(storedStreak ? parseInt(storedStreak) : 0);
        setNmatGoal(storedGoal ? parseInt(storedGoal) : (isFreshUser ? 0 : 95));
        setUndergradGwa(storedGwa || (isFreshUser ? '3.00' : '1.45'));
        setSolvedDrills(storedDrills ? parseInt(storedDrills) : 0);
        setAccuracyIndex(storedAccuracy || (isFreshUser ? '0.0%' : '86.4%'));

        setHabitTracker(storedHabits ? JSON.parse(storedHabits) : {
          'Active Recall Spacing': !isFreshUser,
          'Physics Formulas Revision': false,
          'Anki Loop Queue': !isFreshUser
        });

        setStudyLogs(storedStudyLogs ? JSON.parse(storedStudyLogs) : (isFreshUser ? [] : [
          { id: 'sl-1', subject: 'Biology', hours: 3, date: '2026-06-18' },
          { id: 'sl-2', subject: 'Physics', hours: 2, date: '2026-06-17' }
        ]));

        setMoodLogs(storedMoodLogs ? JSON.parse(storedMoodLogs) : (isFreshUser ? [] : [
          { id: 'ml-1', mood: 'Focused 🧠', date: '2026-06-18', note: 'Mastered Krebs cycle kinetics.' }
        ]));

        setFailedAnswersLogs(storedFailLogs ? JSON.parse(storedFailLogs) : (isFreshUser ? [] : [
          { id: 'log-1', subject: 'Physics', consecutiveFailCount: 3, alertLvl: 'High Danger', lastFailureDate: 'Just now', remedialTopic: 'Kinematics Speed Vector' },
          { id: 'log-2', subject: 'Chemistry', consecutiveFailCount: 2, alertLvl: 'Moderate Warning', lastFailureDate: '2 hours ago', remedialTopic: 'Stoichiometry Mass' }
        ]));

        setUserTargetSchools([]);
        setSrsConcepts([]);
        setNotifications([]);
        setRegNumber(`NMAT-2026-${Math.floor(1000 + Math.random() * 9000)}`);
        setCandidateLevel('Undergraduate Senior Year');
      }

      // Changes came from the student profile (e.g., Preference Theme edit or Upgrade checkout)
      // Since usersList is fully populated via Firestore onSnapshot in real time,
      // we DO NOT need to manually append or update usersList here anymore.
      // This avoids potential render loops.

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
      const emailKey = studentEmail.trim().toLowerCase();
      const isFreshUser = emailKey !== 'studyfilesbyz@gmail.com';
      const stored = localStorage.getItem(`medly_habit_tracker_${emailKey}`);
      return stored ? JSON.parse(stored) : {
        'Active Recall Spacing': !isFreshUser,
        'Physics Formulas Revision': false,
        'Anki Loop Queue': !isFreshUser
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
      const emailKey = studentEmail.trim().toLowerCase();
      const isFreshUser = emailKey !== 'studyfilesbyz@gmail.com';
      const stored = localStorage.getItem(`medly_study_logs_${emailKey}`);
      return stored ? JSON.parse(stored) : (isFreshUser ? [] : [
        { id: 'sl-1', subject: 'Biology', hours: 3, date: '2026-06-18' },
        { id: 'sl-2', subject: 'Physics', hours: 2, date: '2026-06-17' }
      ]);
    } catch {
      return [
        { id: 'sl-1', subject: 'Biology', hours: 3, date: '2026-06-18' },
        { id: 'sl-2', subject: 'Physics', hours: 2, date: '2026-06-17' }
      ];
    }
  });

  const [moodLogs, setMoodLogs] = useState<any[]>(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      const isFreshUser = emailKey !== 'studyfilesbyz@gmail.com';
      const stored = localStorage.getItem(`medly_mood_logs_${emailKey}`);
      return stored ? JSON.parse(stored) : (isFreshUser ? [] : [
        { id: 'ml-1', mood: 'Focused 🧠', date: '2026-06-18', note: 'Mastered Krebs cycle kinetics.' }
      ]);
    } catch {
      return [
        { id: 'ml-1', mood: 'Focused 🧠', date: '2026-06-18', note: 'Mastered Krebs cycle kinetics.' }
      ];
    }
  });

  useEffect(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      localStorage.setItem(`medly_habit_tracker_${emailKey}`, JSON.stringify(habitTracker));
    } catch {}
  }, [habitTracker, studentEmail]);

  useEffect(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      localStorage.setItem(`medly_study_logs_${emailKey}`, JSON.stringify(studyLogs));
    } catch {}
  }, [studyLogs, studentEmail]);

  useEffect(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      localStorage.setItem(`medly_mood_logs_${emailKey}`, JSON.stringify(moodLogs));
    } catch {}
  }, [moodLogs, studentEmail]);

  const wipeAllData = () => {
    try {
      localStorage.clear();
    } catch {}
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
      const emailKey = studentEmail.trim().toLowerCase();
      localStorage.setItem(`medly_nmat_goal_${emailKey}`, String(nmatGoal));
    } catch {}
  }, [nmatGoal, studentEmail]);

  useEffect(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      localStorage.setItem(`medly_undergrad_gwa_${emailKey}`, undergradGwa);
    } catch {}
  }, [undergradGwa, studentEmail]);

  // Automatically calculate the student recall streak based on:
  // - Unique study days logged in studyLogs
  // - Completed active recall checklist items in habitTracker
  // - Solved practice drills bonus (1 day for every 4 drills completed)
  useEffect(() => {
    const emailKey = studentEmail.trim().toLowerCase();
    const isFresh = emailKey !== 'studyfilesbyz@gmail.com';
    const uniqueDays = new Set((studyLogs || []).map((l: any) => l.date)).size;
    const completedHabits = Object.values(habitTracker || {}).filter(Boolean).length;
    const drillsBonus = Math.floor((solvedDrills || 0) / 4);
    let computed = uniqueDays + completedHabits + drillsBonus;
    if (!isFresh) {
      computed = Math.max(1, computed);
    }
    setStreak(computed);
  }, [studyLogs, habitTracker, solvedDrills, studentEmail]);

  useEffect(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      localStorage.setItem(`medly_streak_${emailKey}`, String(streak));
    } catch {}
  }, [streak, studentEmail]);

  useEffect(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      localStorage.setItem(`medly_solved_drills_${emailKey}`, String(solvedDrills));
    } catch {}
  }, [solvedDrills, studentEmail]);

  useEffect(() => {
    try {
      const emailKey = studentEmail.trim().toLowerCase();
      localStorage.setItem(`medly_accuracy_index_${emailKey}`, accuracyIndex);
    } catch {}
  }, [accuracyIndex, studentEmail]);

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
    try {
      localStorage.setItem('medly_srs_concepts', JSON.stringify(srsConcepts));
    } catch {}
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
            key={studentEmail}
            currentUserEmail={studentEmail}
            streak={streak}
            solvedDrills={solvedDrills}
            undergradGwa={undergradGwa}
            studyLogs={studyLogs}
            failedAnswersLogs={failedAnswersLogs}
            userSuite={subscriptionSimMode}
            onViewPremium={() => setActiveTab('premium-page')}
          />
        )}

        {activeTab === 'nmat-takes-tracker' && (
          <NmatTakesTracker
            onHighPrUpdated={(highestPr) => {
              setNmatGoal(highestPr);
            }}
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
          <SpacedRepetitionCoach
            userSuite={subscriptionSimMode}
            onViewPremium={() => setActiveTab('premium-page')}
          />
        )}

        {activeTab === 'clinical-practice' && (
          <ClinicalPractice
            solvedDrills={solvedDrills}
            setSolvedDrills={setSolvedDrills}
            failedAnswersLogs={failedAnswersLogs}
            setFailedAnswersLogs={setFailedAnswersLogs}
            userSuite={subscriptionSimMode}
            onViewPremium={() => setActiveTab('premium-page')}
          />
        )}

        {/* Real-time full Simulated Mock Exams Suite */}
        {activeTab === 'simulated-exam' && (
          <SimulatedExam
            userSuite={subscriptionSimMode}
            onViewPremium={() => setActiveTab('premium-page')}
          />
        )}

        {activeTab === 'diagnostic-weakspots' && (
          <DiagnosticWeakspots
            key={studentEmail}
            currentUserEmail={studentEmail}
            failedAnswersLogs={failedAnswersLogs}
            setFailedAnswersLogs={setFailedAnswersLogs}
            setActiveTab={setActiveTab}
            userSuite={subscriptionSimMode}
          />
        )}

        {activeTab === 'study-planner-calendar' && (
          <StudyPlannerCalendar
            key={studentEmail}
            currentUserEmail={studentEmail}
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
            Medly for Nmat Prep
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
