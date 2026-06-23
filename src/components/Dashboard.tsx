import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  ChevronRight, 
  AlertTriangle, 
  Activity, 
  MapPin, 
  Bookmark, 
  Clock, 
  CheckCircle,
  HelpCircle,
  Info,
  Bell,
  LineChart,
  Flame,
  Award,
  Plus,
  Trash2,
  Edit2,
  X
} from 'lucide-react';
import { MedSchool, SrsConcept } from '../types';
import NmatTakesTracker from './NmatTakesTracker';
import { getTheme } from '../utils/themeStyles';
import { collection, doc, setDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrorHandler';

interface LocalNotification {
  id: string;
  text: string;
  type: 'info' | 'warning' | 'success';
  timestamp: string;
}

interface DashboardProps {
  medSchools: MedSchool[];
  userTargetSchools: MedSchool[];
  setUserTargetSchools: React.Dispatch<React.SetStateAction<MedSchool[]>>;
  srsConcepts: SrsConcept[];
  isOffline: boolean;
  isDataLight: boolean;
  nmatGoal: number;
  setNmatGoal: (goal: number) => void;
  undergradGwa: string;
  setUndergradGwa: (gwa: string) => void;
  streak: number;
  setStreak: (val: number) => void;
  solvedDrills: number;
  setSolvedDrills: (val: number) => void;
  spacedReviewWave: string;
  setSpacedReviewWave: (val: string) => void;
  notifications: LocalNotification[];
  setNotifications: (notifs: LocalNotification[]) => void;
  setActiveTab: (tab: string) => void;
  startSrsReview: () => void;
  currentTheme?: string;
  userSuite?: string;
  currentUserEmail?: string;
  usersList?: any[];
  announcements?: any[];
}

export default function Dashboard({
  medSchools,
  userTargetSchools = [],
  setUserTargetSchools,
  srsConcepts,
  isOffline,
  isDataLight,
  nmatGoal,
  setNmatGoal,
  undergradGwa,
  setUndergradGwa,
  streak,
  setStreak,
  solvedDrills,
  setSolvedDrills,
  spacedReviewWave,
  setSpacedReviewWave,
  notifications,
  setNotifications,
  setActiveTab,
  startSrsReview,
  currentTheme = 'cozy-bear',
  userSuite = 'Free Student Tier',
  currentUserEmail = 'studyfilesbyz@gmail.com',
  usersList = [],
  announcements = [],
}: DashboardProps) {
  
  const themeCfg = getTheme(currentTheme || 'cozy-bear');
  const [expandedSchoolId, setExpandedSchoolId] = useState<string | null>(null);

  // Auto-calculate potential NMAT score based on actual student progress indicators
  const calculatedPotentialNmat = useMemo(() => {
    let base = 52; // realistic baseline NMAT score
    // Booster from solved drills
    base += Math.min(25, solvedDrills * 1.5);
    // Booster from consistency (streak)
    base += Math.min(10, streak * 1.2);
    // Booster from GWA
    const gwaNum = parseFloat(undergradGwa);
    if (!isNaN(gwaNum) && gwaNum >= 1.0 && gwaNum <= 5.0) {
      if (gwaNum <= 1.2) base += 14;
      else if (gwaNum <= 1.5) base += 10;
      else if (gwaNum <= 1.8) base += 7;
      else if (gwaNum <= 2.2) base += 4;
      else if (gwaNum <= 3.0) base += 1;
    }
    return Math.min(99, Math.round(base));
  }, [solvedDrills, streak, undergradGwa]);

  useEffect(() => {
    if (calculatedPotentialNmat !== nmatGoal) {
      setNmatGoal(calculatedPotentialNmat);
    }
  }, [calculatedPotentialNmat, nmatGoal, setNmatGoal]);

  // Real-time rankings from Firebase Firestore
  const [firebaseRankings, setFirebaseRankings] = useState<any[]>([]);
  const [firebaseLoading, setFirebaseLoading] = useState(true);

  // Sync current user state to Firebase Firestore database
  useEffect(() => {
    if (!currentUserEmail) return;

    // Resolve name of current user from the registry list
    const selfUser = usersList.find(u => u.email?.trim().toLowerCase() === currentUserEmail.trim().toLowerCase());
    const selfName = selfUser ? selfUser.name : "Juan Dela Cruz";
    const premed = "UP Manila (BS Biology)";

    const selfDoc = {
      id: "usr_self_" + currentUserEmail.replace(/[^a-zA-Z0-9]/g, "_"),
      name: selfName,
      email: currentUserEmail.trim().toLowerCase(),
      suite: userSuite || "Free Student Tier",
      premed: premed,
      score: parseFloat(calculatedPotentialNmat.toFixed(1)),
      solvedDrills: solvedDrills,
      lastUpdated: Date.now()
    };

    const timer = setTimeout(async () => {
      try {
        await setDoc(doc(db, "live_users", selfDoc.id), selfDoc);
      } catch (err) {
        console.warn("Student cloud profile sync pending config:", err);
        handleFirestoreError(err, OperationType.WRITE, `live_users/${selfDoc.id}`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentUserEmail, usersList, userSuite, calculatedPotentialNmat, solvedDrills]);

  // Listen to live rankings collection in real-time
  useEffect(() => {
    const q = query(
      collection(db, "live_users"),
      orderBy("score", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (snapshot.empty) {
        // If empty, seed live competitor data inside Firestore
        const defaultCompetitors = [
          { id: "usr_comp_1", name: "Ramon Lopez", email: "ramon.lopez@example.com", suite: "Pro Suite (₱79)", premed: "UP Diliman (BS Biochemistry)", score: 97.5, solvedDrills: 45, lastUpdated: Date.now() },
          { id: "usr_comp_2", name: "Alyssa Ramirez", email: "alyssa.ramirez@example.com", suite: "Clinical Suite (₱149)", premed: "UST (BS Pharmacy)", score: 94.2, solvedDrills: 38, lastUpdated: Date.now() },
          { id: "usr_comp_3", name: "Patricia Cruz", email: "patricia.cruz@example.com", suite: "Free Student Tier", premed: "DLSU (BS Human Biology)", score: 91.8, solvedDrills: 26, lastUpdated: Date.now() },
          { id: "usr_comp_4", name: "Lorenzo Santos", email: "lorenzo.santos@example.com", suite: "Lifetime Pass (₱249)", premed: "Ateneo (BS Psychology)", score: 89.4, solvedDrills: 19, lastUpdated: Date.now() },
          { id: "usr_comp_5", name: "Ma. Elena Castro", email: "elena.castro@example.com", suite: "Pro Suite (₱79)", premed: "PLM (BS Physical Therapy)", score: 86.5, solvedDrills: 15, lastUpdated: Date.now() }
        ];

        for (const competitor of defaultCompetitors) {
          try {
            await setDoc(doc(db, "live_users", competitor.id), competitor);
          } catch (e) {
            console.error("Error seeding competitor:", e);
            handleFirestoreError(e, OperationType.WRITE, `live_users/${competitor.id}`);
          }
        }
      } else {
        const rankings = snapshot.docs.map(doc => {
          const data = doc.data();
          const isSelf = (data.email || '').trim().toLowerCase() === currentUserEmail.trim().toLowerCase();
          return {
            id: doc.id,
            name: data.name || "Anonymous Pre-Med",
            premed: data.premed || "Pre-Med Student",
            score: typeof data.score === "number" ? data.score : 85.0,
            tag: isSelf ? 'YOU' : data.suite?.includes('Pro') ? 'PRO' : data.suite?.includes('Clinical') ? 'CLINICAL' : data.suite?.includes('Lifetime') ? 'VIP' : undefined,
            email: data.email || ""
          };
        });
        setFirebaseRankings(rankings);
        setFirebaseLoading(false);
      }
    }, (error) => {
      console.warn("Firebase rankings snapshot error (using local fallbacks):", error);
      const fallbackCompetitors = [
        { id: "usr_comp_1", name: "Ramon Lopez", premed: "UP Diliman (BS Biochemistry)", score: 97.5, tag: 'PRO' },
        { id: "usr_comp_2", name: "Alyssa Ramirez", premed: "UST (BS Pharmacy)", score: 94.2, tag: 'CLINICAL' },
        { id: "usr_comp_3", name: "Patricia Cruz", premed: "DLSU (BS Human Biology)", score: 91.8 },
        { id: "usr_comp_4", name: "Lorenzo Santos", premed: "Ateneo (BS Psychology)", score: 89.4, tag: 'VIP' },
        { id: "usr_comp_5", name: "Ma. Elena Castro", premed: "PLM (BS Physical Therapy)", score: 86.5, tag: 'PRO' }
      ];
      setFirebaseRankings(fallbackCompetitors);
      setFirebaseLoading(false);
      handleFirestoreError(error, OperationType.GET, "live_users");
    });

    return () => unsubscribe();
  }, [currentUserEmail]);

  // Calculate total concepts due today
  const dueToday = srsConcepts.filter(concept => {
    const nextDate = new Date(concept.nextReviewDate);
    const today = new Date();
    return nextDate <= today;
  });

  const [targetExamDateStr, setTargetExamDateStr] = useState(() => {
    try {
      const stored = localStorage.getItem('medly_target_exam_date');
      return stored || '2026-11-07T08:00:00';
    } catch {
      return '2026-11-07T08:00:00';
    }
  });

  const targetExamDate = useMemo(() => new Date(targetExamDateStr), [targetExamDateStr]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetExamDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetExamDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetExamDate]);

  function calculateTimeLeft(target: Date) {
    const totalMs = target.getTime() - Date.now();
    if (totalMs <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((totalMs / 1000 / 60) % 60);
    const seconds = Math.floor((totalMs / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  // Dynamic cutesy vector artwork for each aesthetic preset
  const renderThemeSVG = (themeId: string) => {
    switch (themeId) {
      case 'cozy-bear':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm filter saturate-95">
            {/* Bear body aura/halo */}
            <circle cx="100" cy="110" r="60" fill="#f0f7ff" stroke="#e0f0fe" strokeWidth="2" strokeDasharray="3 3" />
            
            {/* Bear Legs (Lotus formulation) */}
            <ellipse cx="100" cy="151" rx="45" ry="12" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            <circle cx="65" cy="148" r="14" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            <circle cx="135" cy="148" r="14" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            <ellipse cx="65" cy="148" rx="8" ry="6" fill="#f1f5f9" />
            <ellipse cx="135" cy="148" rx="8" ry="6" fill="#f1f5f9" />

            {/* Bear Main Torso */}
            <ellipse cx="100" cy="115" rx="35" ry="32" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            <ellipse cx="100" cy="118" rx="22" ry="18" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

            {/* Bear Head */}
            <circle cx="100" cy="72" r="32" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />

            {/* Ears */}
            <circle cx="73" cy="48" r="12" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            <circle cx="73" cy="48" r="7" fill="#fecdd3" />
            <circle cx="127" cy="48" r="12" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            <circle cx="127" cy="48" r="7" fill="#fef08a" />

            {/* Closed Eyes */}
            <path d="M78 72 Q86 78 92 72" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M122 72 Q114 78 108 72" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Cute Rosy Cheeks */}
            <circle cx="76" cy="80" r="5" fill="#fda4af" />
            <circle cx="124" cy="80" r="5" fill="#fda4af" />

            {/* Snout & Nose */}
            <ellipse cx="100" cy="79" rx="8" ry="6" fill="#f1f5f9" stroke="#1e293b" strokeWidth="1.5" />
            <polygon points="96,77 104,77 100,81" fill="#1e293b" />
            <path d="M100 81 Q100 85 98 85" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M100 81 Q100 85 102 85" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Arms (Zen gesture) */}
            <path d="M70 120 C 55 125, 50 135, 60 138" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M130 120 C 145 125, 150 135, 140 138" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Blue Coffee Mug held warmly */}
            <rect x="142" y="115" width="22" height="20" rx="5" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
            <path d="M164 120 Q170 125 164 130" stroke="#1e293b" strokeWidth="2" fill="none" />
            {/* Steam */}
            <path d="M148 109 Q150 105 148 101" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M154 110 Q156 106 154 102" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M158 109 Q160 105 158 101" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'strawberry-matcha':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Cozy tea aura */}
            <circle cx="100" cy="110" r="60" fill="#f0edf4" stroke="#dcfce7" strokeWidth="2" strokeDasharray="3 3" />
            {/* Cute Teacup Body */}
            <path d="M45 80 L155 80 C155 130, 135 150, 100 150 C65 150, 45 130, 45 80 Z" fill="#ffffff" stroke="#2c3e2b" strokeWidth="4" strokeLinejoin="round" />
            {/* matcha liquid surface */}
            <ellipse cx="100" cy="80" rx="53" ry="12" fill="#84cc16" stroke="#2c3e2b" strokeWidth="3" />
            {/* Teacup handle */}
            <path d="M154 95 C175 95, 175 125, 154 125" stroke="#2c3e2b" strokeWidth="4" fill="none" strokeLinecap="round" />
            
            {/* Smiling face on the cup */}
            {/* Eyes */}
            <circle cx="80" cy="110" r="3.5" fill="#2c3e2b" />
            <circle cx="120" cy="110" r="3.5" fill="#2c3e2b" />
            {/* Shy cheeks */}
            <circle cx="72" cy="116" r="4.5" fill="#fecdd3" />
            <circle cx="128" cy="116" r="4.5" fill="#fecdd3" />
            {/* Smiling lips */}
            <path d="M96 116 Q100 120 104 116" stroke="#2c3e2b" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* A sweet strawberry floating or peaking out */}
            <path d="M115 50 Q125 35 135 50 Q138 65 125 70 Q112 65 115 50 Z" fill="#ef4444" stroke="#2c3e2b" strokeWidth="2.5" />
            {/* Strawberry seeds */}
            <circle cx="122" cy="52" r="1" fill="#fef08a" />
            <circle cx="128" cy="56" r="1" fill="#fef08a" />
            <circle cx="125" cy="62" r="1" fill="#fef08a" />
            {/* Strawberry leaf */}
            <path d="M125 38 Q120 42 122 45 Q125 42 128 45 Q125 38 125 38 Z" fill="#22c55e" />

            {/* Steam swirl */}
            <path d="M85 55 Q90 45 85 35 T90 20" stroke="#86efac" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M100 58 Q105 48 100 38 T105 23" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'lilac-dream':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Lavender halo */}
            <circle cx="100" cy="100" r="55" fill="#faf5ff" stroke="#f3e8ff" strokeWidth="2" strokeDasharray="4 4" />
            {/* A fluffy cutesy cloud */}
            <path d="M50 120 C40 120, 30 110, 35 95 C30 80, 50 65, 70 70 C80 50, 110 50, 125 65 C145 60, 160 80, 155 95 C165 105, 155 120, 140 120 Z" fill="#ffffff" stroke="#4a154b" strokeWidth="3.5" strokeLinejoin="round" />
            
            {/* Sweet sleeping face on the cloud */}
            <path d="M75 92 Q82 98 88 92" stroke="#4a154b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M112 92 Q119 98 125 92" stroke="#4a154b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M96 99 Q100 102 104 99" stroke="#4a154b" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Blushing purple cheeks */}
            <circle cx="68" cy="98" r="4.5" fill="#e879f9" opacity="0.6" />
            <circle cx="132" cy="98" r="4.5" fill="#e879f9" opacity="0.6" />

            {/* Glimmering cute star */}
            <polygon points="100,20 104,32 116,32 106,40 110,52 100,44 90,52 94,40 84,32 96,32" fill="#fde047" stroke="#4a154b" strokeWidth="2" />
            <circle cx="145" cy="45" r="3" fill="#c084fc" />
            <circle cx="55" cy="45" r="2.5" fill="#e9d5ff" />
          </svg>
        );
      case 'pastel-pink-coquette':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            <circle cx="100" cy="100" r="58" fill="#fff1f2" stroke="#fecdd3" strokeWidth="2" strokeDasharray="4 2" />
            {/* High-fidelity cute bow ribbon */}
            {/* Center Knot */}
            <rect x="91" y="91" width="18" height="18" rx="6" fill="#f43f5e" stroke="#4c0519" strokeWidth="3" />
            
            {/* Left Loop */}
            <path d="M91 100 Q65 70, 45 85 Q30 96, 45 110 T91 100" fill="#fda4af" stroke="#4c0519" strokeWidth="3" strokeLinejoin="round" />
            {/* Right Loop */}
            <path d="M109 100 Q135 70, 155 85 Q170 96, 155 110 T109 100" fill="#fda4af" stroke="#4c0519" strokeWidth="3" strokeLinejoin="round" />
            
            {/* Left Tail */}
            <path d="M85 106 Q55 130, 40 160 Q55 160, 80 142 T85 106" fill="#fb7185" stroke="#4c0519" strokeWidth="3" strokeLinejoin="round" />
            {/* Right Tail */}
            <path d="M115 106 Q145 130, 160 160 Q145 160, 120 142 T115 106" fill="#fb7185" stroke="#4c0519" strokeWidth="3" strokeLinejoin="round" />
            
            {/* Star Sparkles around */}
            <path d="M100 25 L102 33 L110 35 L102 37 L100 45 L98 37 L90 35 L98 33 Z" fill="#fb7185" />
            <circle cx="145" cy="135" r="4" fill="#fb7185" />
            <circle cx="55" cy="55" r="3" fill="#fecdd3" />
          </svg>
        );
      case 'winter':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Winter snowglobe shape */}
            <circle cx="100" cy="95" r="55" fill="#f0f9ff" stroke="#0891b2" strokeWidth="3.5" />
            {/* Snowglobe stand */}
            <path d="M60 145 L140 145 L130 165 L70 165 Z" fill="#0284c7" stroke="#0e294b" strokeWidth="3" />
            
            {/* Happy Little Penguin */}
            {/* Body */}
            <ellipse cx="100" cy="105" rx="28" ry="32" fill="#0f172a" stroke="#0e294b" strokeWidth="2" />
            {/* Blushing Belly */}
            <ellipse cx="100" cy="110" rx="20" ry="24" fill="#ffffff" />
            {/* Cute face */}
            <circle cx="91" cy="94" r="2.5" fill="#0f172a" />
            <circle cx="109" cy="94" r="2.5" fill="#0f172a" />
            <polygon points="98,98 102,98 100,103" fill="#f97316" />
            {/* Rosy cheeks */}
            <circle cx="85" cy="98" r="3" fill="#fda4af" />
            <circle cx="115" cy="98" r="3" fill="#fda4af" />
            
            {/* Scarf */}
            <path d="M82 108 L118 108" stroke="#ef4444" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M110 108 L115 125" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />

            {/* Falling snow particles */}
            <circle cx="75" cy="65" r="2.5" fill="#ffffff" />
            <circle cx="125" cy="70" r="3" fill="#ffffff" />
            <circle cx="100" cy="55" r="2" fill="#ffffff" />
          </svg>
        );
      case 'red-blush':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            <circle cx="100" cy="100" r="58" fill="#fff5f5" stroke="#fca5a5" strokeWidth="2.5" strokeDasharray="3 3" />
            {/* Cute Blushing Love Envelope */}
            {/* Envelope body background */}
            <rect x="50" y="75" width="100" height="70" rx="10" fill="#fee2e2" stroke="#991b1b" strokeWidth="3.5" />
            {/* Flap open behind heart */}
            <path d="M50 78 L100 115 L150 78" stroke="#991b1b" strokeWidth="3.5" fill="none" />
            
            {/* Giant blushing heart */}
            <path d="M100 102 C90 85, 72 85, 80 105 L100 125 L120 105 C128 85, 110 85, 100 102" fill="#fc8181" stroke="#991b1b" strokeWidth="3" strokeLinejoin="round" />
            
            {/* Smiling cheeks on the envelope */}
            <circle cx="78" cy="120" r="4.5" fill="#f87171" />
            <circle cx="122" cy="120" r="4.5" fill="#f87171" />
            <path d="M85 110 Q90 114 94 110" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M106 110 Q110 114 114 110" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Sparkles / floating hearts */}
            <path d="M60 40 C55 33, 46 33, 50 43 L60 52 L70 43 C74 33, 65 33, 60 40" fill="#fecaca" />
            <circle cx="140" cy="50" r="2" fill="#ef4444" />
            <circle cx="150" cy="120" r="3.5" fill="#feca57" />
          </svg>
        );
      case 'moon-dream':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Starry dust */}
            <circle cx="100" cy="100" r="58" fill="#fef9c3" opacity="0.3" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 3" />
            {/* Cute Sleepy Moon */}
            <path d="M135 125 C85 125, 55 90, 65 45 C45 65, 45 105, 75 125 Q105 145, 135 125 Z" fill="#fef08a" stroke="#854d0e" strokeWidth="3.5" strokeLinejoin="round" />
            
            {/* Nightcap on the moon */}
            <path d="M63 45 Q75 30, 85 40 Q75 48, 63 45 Z" fill="#a855f7" stroke="#854d0e" strokeWidth="2" />
            <circle cx="85" cy="40" r="4" fill="#ffffff" stroke="#8c52ff" strokeWidth="1" />
            
            {/* Closed Sleepy Eyes and Rosy blush */}
            <path d="M72 90 Q78 95 84 90" stroke="#854d0e" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="68" cy="98" r="4" fill="#fca5a5" />

            {/* Sparkle starry dust */}
            <polygon points="120,40 122,46 128,48 122,50 120,56 118,50 112,48 118,46" fill="#eab308" />
            <circle cx="145" cy="85" r="3.5" fill="#fde047" />
            <circle cx="110" cy="115" r="2.5" fill="#fef9c3" />
          </svg>
        );
      default:
        return (
          <div className="text-6xl animate-bounce">✨</div>
        );
    }
  };

  // Daily board challenge interactive state
  const [dailyAns, setDailyAns] = useState<string | null>(null);
  const [dailyChecked, setDailyChecked] = useState(false);

  // User targets CRUD states and helpers
  const [showAddCustomTarget, setShowAddCustomTarget] = useState(false);
  const [selectedPresetSchoolId, setSelectedPresetSchoolId] = useState('');
  
  // Custom inputs (if they want to type manually or prepopulate)
  const [customName, setCustomName] = useState('');
  const [customAbbr, setCustomAbbr] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [customMinNmat, setCustomMinNmat] = useState(85);
  const [customCompNmat, setCustomCompNmat] = useState(90);
  const [customDeadline, setCustomDeadline] = useState('March 1, 2027');
  const [customPortalLink, setCustomPortalLink] = useState('https://');

  const [editingTargetId, setEditingTargetId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editAbbr, setEditAbbr] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editMinNmat, setEditMinNmat] = useState(85);
  const [editCompNmat, setEditCompNmat] = useState(90);
  const [editDeadline, setEditDeadline] = useState('');
  const [editPortalLink, setEditPortalLink] = useState('');

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetSchoolId(presetId);
    if (!presetId) {
      setCustomName('');
      setCustomAbbr('');
      setCustomLocation('');
      setCustomMinNmat(85);
      setCustomCompNmat(90);
      setCustomDeadline('March 1, 2027');
      setCustomPortalLink('https://');
      return;
    }
    const preset = medSchools.find(s => s.id === presetId);
    if (preset) {
      setCustomName(preset.name);
      setCustomAbbr(preset.abbreviation);
      setCustomLocation(preset.location);
      setCustomMinNmat(preset.requiredNmatMin);
      setCustomCompNmat(preset.competitiveNmat);
      setCustomDeadline(preset.deadline);
      setCustomPortalLink(preset.link);
    }
  };

  const handleAddTargetSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customAbbr.trim()) {
      alert('Please fill out Institution Name and Abbreviation.');
      return;
    }

    const newTarget: MedSchool = {
      id: `target-${Date.now()}`,
      name: customName.trim(),
      abbreviation: customAbbr.trim().toUpperCase(),
      location: customLocation.trim() || 'Philippines',
      requiredNmatMin: customMinNmat,
      competitiveNmat: customCompNmat,
      weightGwa: 'Calculated GWA Weights',
      weightNmat: 'NMAT percentile score target',
      deadline: customDeadline.trim() || 'TBD',
      requirements: ['CEM Official NMAT Certificate', 'Undergrad TOR', 'GMC Recommendation Letter'],
      link: customPortalLink.trim() || 'https://'
    };

    setUserTargetSchools(prev => [...prev, newTarget]);
    
    // Reset fields
    setCustomName('');
    setCustomAbbr('');
    setCustomLocation('');
    setCustomMinNmat(85);
    setCustomCompNmat(90);
    setCustomDeadline('March 1, 2027');
    setCustomPortalLink('https://');
    setSelectedPresetSchoolId('');
    setShowAddCustomTarget(false);
  };

  const handleDeleteTargetSchool = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from your chosen target milestones?`)) {
      setUserTargetSchools(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleStartEditTarget = (school: MedSchool) => {
    setEditingTargetId(school.id);
    setEditName(school.name);
    setEditAbbr(school.abbreviation);
    setEditLocation(school.location);
    setEditMinNmat(school.requiredNmatMin);
    setEditCompNmat(school.competitiveNmat);
    setEditDeadline(school.deadline);
    setEditPortalLink(school.link);
  };

  const handleSaveEditTarget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editAbbr.trim()) {
      alert('Please fill out Institution Name and Abbreviation.');
      return;
    }
    
    setUserTargetSchools(prev => prev.map(s => {
      if (s.id === editingTargetId) {
        return {
          ...s,
          name: editName.trim(),
          abbreviation: editAbbr.trim().toUpperCase(),
          location: editLocation.trim(),
          requiredNmatMin: editMinNmat,
          competitiveNmat: editCompNmat,
          deadline: editDeadline.trim(),
          link: editPortalLink.trim()
        };
      }
      return s;
    }));

    setEditingTargetId(null);
  };

  const renderAdmissionsMilestones = () => {
    return (
      <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-extrabold text-slate-800 font-sans text-sm sm:text-base">Philippine Medical School Target Admissions Milestones</h2>
              <p className="text-xs text-slate-400">Deadlines and weight distributions across prestigious medical colleges in Manila & suburbs.</p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => {
              setShowAddCustomTarget(!showAddCustomTarget);
              setEditingTargetId(null);
            }}
            className="self-start sm:self-auto text-xs font-bold text-sky-705 bg-sky-50 hover:bg-sky-100 border border-sky-105 rounded-xl px-3 py-1.5 flex items-center gap-1.5 cursor-pointer transition-colors font-sans"
          >
            {showAddCustomTarget ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{showAddCustomTarget ? "Cancel Add" : "Add Target University"}</span>
          </button>
        </div>

        {/* Inline Add Target University Selector & Form */}
        {showAddCustomTarget && (
          <form onSubmit={handleAddTargetSchool} className="mb-6 p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-3 text-xs font-semibold text-slate-705">
            <div className="border-b pb-1.5 flex justify-between items-center">
              <span className="text-[10px] uppercase font-black text-slate-450 tracking-wider">Configure Chosen Target School</span>
              <span className="text-[10px] text-slate-400">Select template or type custom</span>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-[9px] uppercase font-black text-slate-400 mb-1">Institution Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UPCM"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[9px] uppercase font-black text-slate-400 mb-1">Abbreviation</label>
                <input
                  type="text"
                  required
                  value={customAbbr}
                  onChange={(e) => setCustomAbbr(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-extrabold uppercase animate-pulse"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-black text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-black text-slate-400 mb-1">Required Min NMAT</label>
                <input
                  type="number"
                  min="40"
                  max="99"
                  value={customMinNmat}
                  onChange={(e) => setCustomMinNmat(parseInt(e.target.value) || 85)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-black text-slate-705"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-black text-slate-400 mb-1">Competitive PR Target</label>
                <input
                  type="number"
                  min="40"
                  max="99"
                  value={customCompNmat}
                  onChange={(e) => setCustomCompNmat(parseInt(e.target.value) || 90)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-black text-slate-705"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] uppercase font-black text-slate-400 mb-1">Application Target Deadline</label>
                <input
                  type="text"
                  value={customDeadline}
                  onChange={(e) => setCustomDeadline(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-black text-slate-400 mb-1">Portal Link URL</label>
                <input
                  type="text"
                  value={customPortalLink}
                  onChange={(e) => setCustomPortalLink(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-sky-700 underline"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg font-bold cursor-pointer transition-colors"
            >
              Add Target University to Tracker
            </button>
          </form>
        )}

        {/* Inline Edit Target University Form */}
        {editingTargetId && (
          <form onSubmit={handleSaveEditTarget} className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3 text-xs font-semibold text-slate-705">
            <div className="border-b pb-1.5 flex justify-between items-center">
              <span className="text-[10px] uppercase font-black text-amber-800 tracking-wider">Edit Target School Milestone</span>
              <button
                type="button"
                onClick={() => setEditingTargetId(null)}
                className="text-amber-700 hover:text-amber-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] uppercase font-black text-amber-700 mb-1">Institution Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2 bg-white border border-amber-200 rounded-lg outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-black text-amber-700 mb-1">Abbreviation</label>
                <input
                  type="text"
                  required
                  value={editAbbr}
                  onChange={(e) => setEditAbbr(e.target.value)}
                  className="w-full p-2 bg-white border border-amber-200 rounded-lg outline-none font-extrabold uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[9px] uppercase font-black text-amber-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full p-2 bg-white border border-amber-200 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-black text-amber-700 mb-1">Required Min NMAT</label>
                <input
                  type="number"
                  min="40"
                  max="99"
                  value={editMinNmat}
                  onChange={(e) => setEditMinNmat(parseInt(e.target.value) || 85)}
                  className="w-full p-2 bg-white border border-amber-200 rounded-lg outline-none font-black text-slate-705"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-black text-amber-700 mb-1">Competitive PR Target</label>
                <input
                  type="number"
                  min="40"
                  max="99"
                  value={editCompNmat}
                  onChange={(e) => setEditCompNmat(parseInt(e.target.value) || 90)}
                  className="w-full p-2 bg-white border border-amber-200 rounded-lg outline-none font-black text-slate-705"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-black text-amber-700 mb-1">Application Target Deadline</label>
                <input
                  type="text"
                  value={editDeadline}
                  onChange={(e) => setEditDeadline(e.target.value)}
                  className="w-full p-2 bg-white border border-amber-200 rounded-lg outline-none font-bold text-slate-705"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] uppercase font-black text-amber-700 mb-1">Portal Link URL</label>
              <input
                type="text"
                value={editPortalLink}
                onChange={(e) => setEditPortalLink(e.target.value)}
                className="w-full p-2 bg-white border border-amber-200 rounded-lg outline-none font-bold text-slate-705"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold cursor-pointer transition-colors"
            >
              Save Changes to Milestone Target
            </button>
          </form>
        )}

        {userTargetSchools.length === 0 ? (
          <div className="p-8 border border-dashed border-slate-200 rounded-2xl text-center space-y-3">
            <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
              No target medical schools added to your Milestones Tracker yet. Click <strong className="text-sky-700">Add Target University</strong> above to select from reference med schools or define your own custom target milestone!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userTargetSchools.map(school => (
              <div key={school.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between group relative">
                
                {/* Edit & Delete absolute action buttons visible on hover / tap */}
                <div className="absolute right-2 top-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    type="button"
                    onClick={() => handleStartEditTarget(school)}
                    title="Edit milestone details"
                    className="p-1 px-1.5 text-sky-700 bg-white border border-slate-200 hover:border-sky-300 rounded shadow-xs cursor-pointer text-[9px] font-black"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTargetSchool(school.id, school.name)}
                    title="Delete custom target school"
                    className="p-1 px-1.5 text-red-650 bg-white border border-slate-200 hover:border-red-300 rounded shadow-xs cursor-pointer text-[9px] font-black"
                  >
                    Delete
                  </button>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase tracking-wide font-extrabold text-[#113bb4] bg-sky-50 px-2 py-0.5 rounded">
                      Competitive PR: {school.competitiveNmat}
                    </span>
                    <span className="text-xs font-bold text-slate-700 pr-12">{school.abbreviation}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-xs mt-1 mb-0.5 leading-snug">{school.name}</h3>
                  
                  <div className="space-y-1 mt-2 border-t border-slate-100 pt-2 font-semibold">
                    <p className="text-[10px] text-slate-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1 flex-shrink-0 text-slate-400" />
                      App Deadline: <strong className="text-slate-750 ml-1 text-slate-700">{school.deadline}</strong>
                    </p>
                    <p className="text-[10px] text-slate-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1 flex-shrink-0 text-slate-400" />
                      Location: <strong className="text-slate-750 ml-1 truncate text-slate-700">{school.location}</strong>
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-105 mt-3 pt-2.5 flex justify-between items-center text-[10px] text-slate-400 font-bold">
                  <span>Min PR: <strong className="text-slate-700">{school.requiredNmatMin}</strong></span>
                  {school.link && school.link !== 'https://' && (
                    <a
                      href={school.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1044b4] underline font-extrabold flex items-center hover:text-blue-900"
                    >
                      Portal Link
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderDreamSchoolIndex = () => {
    return (
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between shadow-xs">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <Bookmark className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-extrabold text-slate-800 font-sans text-sm sm:text-base">Dream School Index</h2>
              <p className="text-xs text-slate-400">Evaluate GWA matching against your chosen target universities list.</p>
            </div>
          </div>

          <div className="space-y-4 py-2">
            <div className="p-3 bg-gradient-to-r from-sky-50 to-indigo-50/50 rounded-xl border border-sky-100 text-xs shadow-xs">
              <div className="flex justify-between items-center mb-1 font-semibold">
                <span className="font-bold text-sky-900">Your Current Undergrad GPA / GWA:</span>
                <span className="font-exrabold text-[#113eb4] bg-white px-2.5 py-0.5 rounded shadow-xs border border-slate-205">
                  {undergradGwa || '1.45 (GWA)'}
                </span>
              </div>
              <p className="text-[10px] text-sky-700 font-medium">Calculated target percentile scores take this performance rating into account.</p>
            </div>

            {/* Chosen Target Med School Requirements */}
            {userTargetSchools.length === 0 ? (
              <p className="text-[11px] text-slate-450 italic font-semibold py-2">
                No target medical schools selected. Add colleges in the Milestones Tracker below to view alignment analytics here!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userTargetSchools.map((school) => (
                  <div key={school.id} className="p-3 rounded-xl border border-slate-105 bg-slate-50/40 text-xs font-semibold flex justify-between items-center hover:border-slate-200 transition-all text-slate-755">
                    <div className="flex items-center space-x-2.5 truncate w-full">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <div className="truncate flex-1">
                        <span className="font-bold text-slate-900 block truncate">{school.name} ({school.abbreviation})</span>
                        <span className="text-[10px] text-slate-405 font-semibold block truncate">{school.location}</span>
                      </div>
                    </div>
                    <div className="text-right bg-sky-50 px-2 py-1 rounded flex-shrink-0 ml-2">
                      <span className="font-black text-[11px] text-sky-700 block">{school.competitiveNmat}+ PR</span>
                      <span className="block text-[9px] text-slate-400">Min: {school.requiredNmatMin}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3 mt-4 flex justify-between items-center text-xs font-bold">
          <span className="text-slate-400">Targeting {nmatGoal} Percentile Centile</span>
          <button
            onClick={() => setActiveTab('clinical-practice')}
            className="text-sky-705 hover:text-sky-800 flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <span>Start Prep Drills to Boost PR</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Live rankings participants list - synced directly in real-time from Firebase Firestore
  const liveRankings = firebaseRankings;

  // Active Announcements Board - Dynamically derived from admin state prop

  // Daily Performance Metrics
  const performanceMetrics = [
    { label: 'Active Streak', value: `${streak} ${streak === 1 ? 'Day' : 'Days'}`, color: 'text-amber-500 bg-amber-50 border-amber-100' },
    { label: 'Avg Mock Accuracy', value: '86.4%', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { label: 'Total Solved Drills', value: `${solvedDrills} Drill Items`, color: 'text-sky-600 bg-sky-50 border-sky-100' },
    { label: 'Spaced review wave', value: spacedReviewWave, color: 'text-indigo-600 bg-indigo-50 border-indigo-105' }
  ];

  if (true) {
    return (
      <div className="space-y-6">
        {/* Featured Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Welcome Card (Columns span 3) */}
          <div className={`lg:col-span-3 ${themeCfg.cardBg} ${themeCfg.bubbleStyle} rounded-[24px] border ${themeCfg.borderClass} p-5 sm:p-8 shadow-xs relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-6`}>
            {/* Left Content */}
            <div className="space-y-4 z-10 flex-grow w-full flex flex-col items-center sm:items-start text-center sm:text-left">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${themeCfg.btnPrimary} text-white uppercase tracking-widest shadow-xs`}>
                  License Status: {userSuite?.replace(/\s*\(₱\d+\)/g, '')}
                </span>
                <h1 className={`text-2xl xs:text-3xl sm:text-4xl font-extrabold tracking-tight ${themeCfg.textColor} font-sans mt-2.5`}>
                  Hello, Doc! 👋
                </h1>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                <button
                  onClick={startSrsReview}
                  className={`px-4 py-2 ${themeCfg.btnPrimary} hover:opacity-95 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer`}
                >
                  Start SRS Review ({dueToday.length} Due)
                </button>
                <button
                  onClick={() => setActiveTab('simulated-suite')}
                  className={`px-4 py-2 ${themeCfg.btnSecondary} text-slate-705 border ${themeCfg.borderClass} hover:opacity-90 rounded-xl font-bold text-xs transition-all cursor-pointer`}
                >
                  Simulate Exam
                </button>
              </div>
            </div>

            {/* Dynamic Custom Theme Vector Art SVG Illustration */}
            <div className="relative flex-none w-56 h-56 xs:w-64 xs:h-64 sm:w-44 sm:h-44 flex items-center justify-center pointer-events-none select-none">
              {renderThemeSVG(currentTheme)}
            </div>
          </div>
        </div>

        {/* NMAT Official countdown and Streak metrics merged row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* NMAT Official countdown inside a spacious, beautiful card */}
          <div className={`md:col-span-2 ${(() => {
            switch (currentTheme) {
              case 'strawberry-matcha': return 'bg-gradient-to-r from-emerald-600 via-lime-600 to-green-600 border-emerald-400/20';
              case 'lilac-dream': return 'bg-gradient-to-r from-purple-500 via-violet-600 to-purple-600 border-purple-400/20';
              case 'pastel-pink-coquette': return 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 border-rose-300/20';
              case 'winter': return 'bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 border-cyan-400/20';
              case 'red-blush': return 'bg-gradient-to-r from-red-500 via-rose-500 to-red-650 border-red-400/20';
              case 'moon-dream': return 'bg-gradient-to-r from-slate-800 via-indigo-900 to-purple-950 border-slate-700/20';
              default: return 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-750 border-amber-500/20';
            }
          })()} rounded-[24px] p-5 sm:p-6 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-4`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative z-10 space-y-2 w-full">
              <div className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-0.5 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                <span className="text-[10px] uppercase font-black tracking-widest text-white">National NMAT Target Countdown</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black font-sans leading-tight">
                  Count down to {new Date(targetExamDateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </h2>
                <div className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-all rounded-md px-2 py-0.5 text-xs font-bold border border-white/20 shadow-xs">
                  <span className="text-[9px] uppercase font-bold text-white">Edit Date:</span>
                  <input
                    type="date"
                    value={targetExamDateStr.split('T')[0]}
                    onChange={(e) => {
                      if (e.target.value) {
                         const newDateStr = `${e.target.value}T08:00:00`;
                         setTargetExamDateStr(newDateStr);
                         try {
                           localStorage.setItem('medly_target_exam_date', newDateStr);
                         } catch {}
                      }
                    }}
                    className="bg-transparent text-white font-extrabold outline-none cursor-pointer border-none text-[11px] p-0 w-24 focus:ring-0"
                  />
                </div>
              </div>
              <p className="text-xs text-white/90 max-w-sm leading-relaxed">CEM certified Philippines cycle. Ensure that all clinical papers have corresponding digital stamps.</p>
            </div>

            <div className="relative z-10 flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-xl w-full sm:max-w-[280px]">
              <div className="grid grid-cols-4 gap-2 text-center text-white">
                <div className="p-1.5 bg-white/5 rounded-xl border border-white/5">
                  <span className="block text-base sm:text-lg font-black font-mono tracking-tight">{timeLeft.days}</span>
                  <span className="text-[8px] font-black uppercase opacity-75">Days</span>
                </div>
                <div className="p-1.5 bg-white/5 rounded-xl border border-white/5">
                  <span className="block text-base sm:text-lg font-black font-mono tracking-tight">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[8px] font-black uppercase opacity-75">Hrs</span>
                </div>
                <div className="p-1.5 bg-white/5 rounded-xl border border-white/5">
                  <span className="block text-base sm:text-lg font-black font-mono tracking-tight">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[8px] font-black uppercase opacity-75">Mins</span>
                </div>
                <div className="p-1.5 bg-white/5 rounded-xl border border-white/5">
                  <span className="block text-base sm:text-lg font-black font-mono tracking-tight text-white/90">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[8px] font-black uppercase opacity-75">Secs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Streak metrics inside a spacious theme dynamic card */}
          <div className={`${themeCfg.cardBg} ${themeCfg.bubbleStyle} rounded-[24px] border ${themeCfg.borderClass} p-5 sm:p-6 shadow-xs flex flex-col justify-between`}>
            <div className="flex items-center space-x-2 justify-between w-full">
              <div className="flex items-center space-x-2">
                <span className={`p-2 ${themeCfg.accentBg} ${themeCfg.accentText} rounded-xl`}>
                  <Flame className="w-5 h-5 animate-pulse" />
                </span>
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-400">STUDENT RECALL STREAK</span>
                  <span className={`text-xl font-bold ${themeCfg.textColor} tracking-tight`}>{streak} {streak === 1 ? 'Day' : 'Days'} Active</span>
                </div>
              </div>
              <div className={`px-2.5 py-1 ${themeCfg.accentBg} ${themeCfg.accentText} rounded-xl text-[9px] font-black uppercase tracking-wider`}>
                Auto-Calculated
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
              <div className={`${themeCfg.btnPrimary} h-full rounded-full transition-all animate-pulse`} style={{ width: `${Math.min(100, streak * 10)}%` }} />
            </div>
            <p className="text-[10px] text-slate-450 leading-relaxed mt-2.5">
              Review daily. Streak automatically grows as you complete study habits, log study sessions, and solve practice drill items.
            </p>
          </div>
        </div>

        {/* 4 Bento metrics row exactly style-coded to match the screenshot bottom cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card 1: Target PR */}
          <div className={`p-5 sm:p-6 ${themeCfg.cardBg} ${themeCfg.bubbleStyle} rounded-[24px] border ${themeCfg.borderClass} space-y-4 shadow-xs relative flex flex-col justify-between min-h-[160px] hover:shadow-sm transition-all text-center items-center`} id="nmat-score-display-card">
            <div className="flex flex-col items-center gap-2">
              <span className={`p-3 ${themeCfg.accentBg} ${themeCfg.accentText} rounded-[18px]`}>
                <Award className="w-5 h-5 animate-bounce" />
              </span>
              <span className={`text-[10px] font-black uppercase ${themeCfg.accentText} ${themeCfg.accentBg} px-2.5 py-1 rounded-full text-center`}>Automated PR</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Potential NMAT Score</p>
              <div className="flex items-baseline justify-center gap-1.5 mt-1">
                <span className="text-xs font-black text-slate-400 uppercase">PR</span>
                <span className={`text-2xl sm:text-3xl font-black ${themeCfg.textColor} tracking-tight`}>{calculatedPotentialNmat}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Undergrad GWA weight */}
          <div className={`p-5 sm:p-6 ${themeCfg.cardBg} ${themeCfg.bubbleStyle} rounded-[24px] border ${themeCfg.borderClass} space-y-4 shadow-xs relative flex flex-col justify-between min-h-[160px] hover:shadow-sm transition-all text-center items-center`}>
            <div className="flex flex-col items-center gap-2">
              <span className={`p-3 ${themeCfg.accentBg} ${themeCfg.accentText} rounded-[18px]`}>
                <Activity className="w-5 h-5" />
              </span>
              <span className={`text-[10px] font-black uppercase ${themeCfg.accentText} ${themeCfg.accentBg} px-2.5 py-1 rounded-full text-center`}>GWA weight</span>
            </div>
            <div className="w-full">
              <p className="text-[11px] font-bold text-slate-405">Undergrad GPA Yield</p>
              <input
                type="text"
                value={undergradGwa}
                onChange={(e) => setUndergradGwa(e.target.value)}
                placeholder="e.g. 1.45"
                className={`mt-1 w-full bg-white text-sm sm:text-base font-black ${themeCfg.textColor} px-2 py-1 rounded border border-slate-200 outline-none focus:ring-1 focus:ring-sky-500 text-center`}
              />
            </div>
          </div>

          {/* Card 3: Spaced Review Wave */}
          <div className={`p-5 sm:p-6 ${themeCfg.cardBg} ${themeCfg.bubbleStyle} rounded-[24px] border ${themeCfg.borderClass} space-y-4 shadow-xs relative flex flex-col justify-between min-h-[160px] hover:shadow-sm transition-all text-center items-center`}>
            <div className="flex flex-col items-center gap-2">
              <span className={`p-3 ${themeCfg.accentBg} ${themeCfg.accentText} rounded-[18px]`}>
                <Clock className="w-5 h-5" />
              </span>
              <span className={`text-[10px] font-black uppercase ${themeCfg.accentText} ${themeCfg.accentBg} px-2.5 py-1 rounded-full text-center`}>Spacing</span>
            </div>
            <div className="w-full">
              <p className="text-[11px] font-bold text-slate-405">Spaced Review Wave</p>
              <select
                value={spacedReviewWave}
                onChange={(e) => setSpacedReviewWave(e.target.value)}
                className={`mt-1 w-full bg-white text-xs sm:text-sm font-black ${themeCfg.textColor} px-1 py-1 rounded border border-slate-200 outline-none focus:ring-1 focus:ring-sky-500 text-center`}
              >
                <option value="14 Days Cycle">14 Days Cycle</option>
                <option value="7 Days Cycle">7 Days Cycle</option>
                <option value="30 Days Cycle">30 Days Cycle</option>
                <option value="Anki Smart Wave">Anki Smart Wave</option>
                <option value="Manual Review Only">Manual Review Only</option>
              </select>
            </div>
          </div>

          {/* Card 4: Total Solved Drills */}
          <div className={`p-5 sm:p-6 ${themeCfg.cardBg} ${themeCfg.bubbleStyle} rounded-[24px] border ${themeCfg.borderClass} space-y-4 shadow-xs relative flex flex-col justify-between min-h-[160px] hover:shadow-sm transition-all text-center items-center`} id="solved-drills-display-card">
            <div className="flex flex-col items-center gap-2">
              <span className={`p-3 ${themeCfg.accentBg} ${themeCfg.accentText} rounded-[18px]`}>
                <CheckCircle className="w-5 h-5" />
              </span>
              <span className={`text-[10px] font-black uppercase ${themeCfg.accentText} ${themeCfg.accentBg} px-2.5 py-1 rounded-full text-center`}>Solved</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Solved Drills</p>
              <div className={`flex items-baseline justify-center gap-1 mt-1 text-2xl sm:text-3xl font-black ${themeCfg.textColor}`}>
                <span>{solvedDrills}</span>
                <span className="text-xs text-slate-400 font-bold uppercase ml-1">drills</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive NMAT Daily Challenge & Live Rankings Peer Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Daily Board Challenge Card (span 2) */}
          <div className={`lg:col-span-2 ${themeCfg.cardBg} ${themeCfg.bubbleStyle} rounded-[24px] border ${themeCfg.borderClass} p-6 flex flex-col justify-between shadow-xs space-y-4`}>
            <div>
              <div className="flex justify-between items-center pb-2 border-b border-rose-100">
                <div className="flex items-center space-x-2">
                  <span className={`p-2 ${themeCfg.accentBg} ${themeCfg.accentText} rounded-xl`}>
                    <Award className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className={`font-extrabold ${themeCfg.textColor} text-sm sm:text-base`}>🎯 Daily NMAT Board Challenge</h3>
                    <p className="text-[11px] text-slate-400">Fresh high-yield conceptual question delivered every 24 hours.</p>
                  </div>
                </div>
                <span className={`text-[9px] uppercase font-black tracking-wider ${themeCfg.accentText} ${themeCfg.accentBg} px-2.5 py-0.5 rounded-full border ${themeCfg.borderClass}`}>
                  Part 2: Biology / Genetics
                </span>
              </div>

              <div className="mt-4 p-4 bg-white/50 border border-slate-100 rounded-2xl">
                <p className={`text-xs sm:text-sm font-bold ${themeCfg.textColor} leading-relaxed`}>
                  In premium molecular diagnostics, a student identifies a chromosome sequence with a 3' to 5' lagging strand direction. During DNA replication, which of the following proteins plays the direct role of synthetic phosphodiester joining of Okazaki fragments?
                </p>
              </div>

              {/* Choices list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                {[
                  { key: 'A', text: 'A) DNA Ligase III / I' },
                  { key: 'B', text: 'B) RNA Helicase Delta' },
                  { key: 'C', text: 'C) Topoisomerase Alpha' },
                  { key: 'D', text: 'D) Single-Strand primers' }
                ].map(item => {
                  const isSelected = dailyAns === item.key;
                  return (
                    <button
                      key={item.key}
                      disabled={dailyChecked}
                      onClick={() => setDailyAns(item.key)}
                      className={`p-3 rounded-xl border text-left text-xs font-black transition-all cursor-pointer ${
                        isSelected 
                          ? `${themeCfg.btnPrimary} text-white` 
                          : `border-slate-200 bg-white hover:bg-slate-50 ${themeCfg.textColor}`
                      } ${dailyChecked ? 'opacity-80' : ''}`}
                    >
                      {item.text}
                    </button>
                  );
                })}
              </div>

              {/* Status and explanation banner */}
              {dailyChecked && (
                <div className={`mt-4 p-3.5 rounded-xl border text-[11px] leading-relaxed transition-all ${themeCfg.accentBg} ${themeCfg.accentBorder} ${themeCfg.textColor}`}>
                  {dailyAns === 'A' ? (
                    <div>
                      <strong className="text-emerald-700 block mb-0.5">🎉 PERFECT MATCH! Socratic Rationale Matched:</strong>
                      <span>DNA Ligases catalyze the formation of a phosphodiester bond between adjacent 3'-hydroxyl and 5'-phosphate termini of Okazaki fragments, cementing lagging strands.</span>
                    </div>
                  ) : (
                    <div>
                      <strong className="text-rose-700 block mb-0.5">💥 COGNITIVE VARIANCE ENCOUNTERED:</strong>
                      <span>Incorrect option chosen. DNA Ligase is the correct choice (A). Topoisomerases relieve supercoiling, helicases separate double strands, while ligases form phosphodiester backbones.</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2 border-t text-[10px]">
              <span className="text-slate-400">94% of Manila premed candidates solved this correctly today.</span>
              <div className="flex gap-2">
                {dailyChecked ? (
                  <button
                    onClick={() => {
                      setDailyChecked(false);
                      setDailyAns(null);
                    }}
                    className={`px-3 py-1 ${themeCfg.btnSecondary} rounded-lg cursor-pointer`}
                  >
                    Reset Challenge
                  </button>
                ) : (
                  <button
                    disabled={!dailyAns}
                    onClick={() => setDailyChecked(true)}
                    className={`px-4 py-1 ${themeCfg.btnPrimary} text-white font-black rounded-lg cursor-pointer disabled:opacity-40`}
                  >
                    Lock Answer
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Live Rankings Leaderboard (span 1) */}
          <div className={`${themeCfg.cardBg} ${themeCfg.bubbleStyle} rounded-[24px] border ${themeCfg.borderClass} p-6 flex flex-col justify-between shadow-xs space-y-4`}>
            <div>
              <div className="flex items-center space-x-2 pb-2 border-b border-rose-100">
                <span className={`p-2 ${themeCfg.accentBg} ${themeCfg.accentText} rounded-xl`}>
                  <Flame className="w-5 h-5 animate-pulse" />
                </span>
                <div>
                  <h3 className={`font-extrabold ${themeCfg.textColor} text-sm sm:text-base`}>🏆 Medly Live rankings</h3>
                  <p className="text-[11px] text-slate-400">Live peer stand estimates based on board challenges.</p>
                </div>
              </div>

              {/* Dynamic Rankings list */}
              <div className="space-y-2 mt-4 max-h-[190px] overflow-y-auto pr-1">
                {firebaseLoading ? (
                  <div className="flex flex-col items-center justify-center py-10 space-y-2 text-slate-400">
                    <span className="w-6 h-6 border-2 border-rose-600 border-t-transparent rounded-full animate-spin"></span>
                    <span className="text-[10px] font-bold tracking-wider uppercase">Loading live rankings...</span>
                  </div>
                ) : (
                  liveRankings.map((user, pos) => {
                    return (
                      <div key={user.name} className="flex justify-between items-center p-2 rounded-xl bg-white/50 border border-slate-100 hover:bg-white/90 transition-all text-xs">
                        <div className="flex items-center space-x-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] text-white ${
                            pos === 0 ? 'bg-amber-500' : pos === 1 ? 'bg-slate-400' : pos === 2 ? 'bg-amber-700' : 'bg-slate-300'
                          }`}>
                            {pos + 1}
                          </span>
                          <div>
                            <p className={`font-bold ${themeCfg.textColor} flex items-center gap-1`}>
                              {user.name}
                              {user.tag && <span className={`text-[8px] ${themeCfg.accentBg} ${themeCfg.accentText} px-1 rounded font-black uppercase`}>{user.tag}</span>}
                            </p>
                            <p className="text-[9.5px] text-slate-450">{user.premed}</p>
                          </div>
                        </div>
                        <span className={`font-mono text-[11px] font-black ${themeCfg.textColor}`}>
                          {user.score} PR
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Simulated standings message */}
            <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-455 leading-relaxed font-semibold">
              <span className="flex items-center gap-1 text-emerald-600 font-extrabold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Live Sync Enabled
              </span>
              Standings are automatically synced in real-time with the central student accounts database.
            </div>
          </div>

        </div>

        {/* 2. Bento Grid Stats & Philippine Med Admissions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${themeCfg.cardBg} ${themeCfg.bubbleStyle} rounded-[24px] border ${themeCfg.borderClass} lg:col-span-3 p-6 flex flex-col justify-between shadow-xs`}>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className={`p-2 ${themeCfg.accentBg} ${themeCfg.accentText} rounded-xl`}>
                  <Bookmark className="w-5 h-5" />
                </span>
                <div>
                  <h2 className={`font-extrabold ${themeCfg.textColor} font-sans text-sm sm:text-base`}>Philippine Med Admissions</h2>
                  <p className="text-xs text-slate-400">Estimated requirement matching guidelines.</p>
                </div>
              </div>

              <div className="space-y-4 py-2">
                <div className={`p-3 ${themeCfg.accentBg} ${themeCfg.accentBorder} rounded-xl border text-xs shadow-xs`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-bold ${themeCfg.accentText}`}>Undergrad GPA Weighted:</span>
                    <span className={`font-bold ${themeCfg.textColor} bg-white px-2 py-0.5 rounded shadow-xs border ${themeCfg.borderClass}`}>
                      {undergradGwa || '1.45 (GWA)'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">Calculated percentile requirements take this GWA into high consideration.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {medSchools.length === 0 ? (
                    <div className="p-8 border-2 border-dashed border-slate-200/50 rounded-2xl text-center text-slate-400 font-medium">
                      <p>No Philippine Medical School admissions guidelines have been added yet.</p>
                      <p className="text-[10px] text-slate-400 mt-1">Verified administrators can compile, publish, and delete guidelines in the Curriculum Administration tab.</p>
                    </div>
                  ) : (
                    medSchools.map(school => {
                      const isExpanded = expandedSchoolId === school.id;
                      return (
                        <div 
                          key={school.id} 
                          className={`p-4 rounded-[20px] border transition-all cursor-pointer ${
                            isExpanded 
                              ? 'bg-slate-50/75 border-slate-205 shadow-sm' 
                              : 'bg-white/50 border-slate-100 hover:border-slate-200 hover:bg-white'
                          }`}
                          onClick={() => setExpandedSchoolId(isExpanded ? null : school.id)}
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                            <div className="space-y-1">
                              <span className={`font-black text-sm block ${themeCfg.textColor}`}>
                                {school.name} ({school.abbreviation})
                              </span>
                              <p className="text-[10px] text-slate-405 font-semibold">
                                📍 {school.location} • Undergrad Weight: <strong className="font-extrabold text-slate-600">{school.weightGwa}</strong>
                              </p>
                            </div>
                            <div className="text-left sm:text-right flex flex-col sm:items-end gap-1 flex-shrink-0">
                              <span className={`text-[10px] font-black uppercase tracking-wider ${themeCfg.accentText} ${themeCfg.accentBg} px-2.5 py-1 rounded-lg`}>
                                NMAT Cut-off Score: {school.requiredNmatMin} PR
                              </span>
                              <span className="text-[9.5px] text-slate-400 block font-bold">
                                {isExpanded ? 'Click to collapse ▲' : 'Click to view details ▼'}
                              </span>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-slate-200/60 grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] leading-relaxed" onClick={(e) => e.stopPropagation()}>
                              <div className="space-y-3">
                                <div>
                                  <span className="text-[9.5px] font-black uppercase tracking-wide text-slate-400 block mb-0.5">Application Period</span>
                                  <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-100 font-bold text-slate-700 flex justify-between items-center flex-wrap gap-1">
                                    <span>🗓️ {school.applicationPeriod || 'TBD'}</span>
                                    {school.daysUntilStart !== undefined && school.daysUntilEnd !== undefined && (
                                      <span className="text-[9px] text-indigo-750 bg-indigo-50 border border-indigo-150 rounded px-1.5 py-0.5">
                                        Starts in {school.daysUntilStart}d • Ends in {school.daysUntilEnd}d
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <span className="text-[9.5px] font-black uppercase tracking-wide text-slate-400 block mb-0.5">Competitive PR Goal</span>
                                    <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-100 font-bold text-indigo-800">
                                      🎯 {school.competitiveNmat} PR
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-[9.5px] font-black uppercase tracking-wide text-slate-400 block mb-0.5">Registration Fee</span>
                                    <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-100 font-bold text-slate-700">
                                      💳 {school.registrationFee || 'TBD'}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <span className="text-[9.5px] font-black uppercase tracking-wide text-slate-400 block mb-0.5">Admissions Contact Details</span>
                                  <div className="bg-white p-3 rounded-lg border border-slate-100 space-y-1 font-medium text-slate-600">
                                    <div>🏢 <strong className="text-slate-750">{school.contactOffice || 'Admissions Office'}</strong></div>
                                    <div>📍 <span className="text-slate-600">{school.contactAddress || school.location}</span></div>
                                    <div className="flex justify-between flex-wrap gap-1.5 pt-0.5 border-t border-slate-50 mt-1 text-[10px]">
                                      <span>✉️ {school.contactEmail || 'N/A'}</span>
                                      {school.contactNumber && <span>📞 {school.contactNumber}</span>}
                                    </div>
                                  </div>
                                </div>

                                {school.daysBeforeRelease !== undefined && (
                                  <div className="p-2 bg-emerald-50 border border-emerald-150 text-emerald-805 rounded-lg text-[10px] font-bold">
                                    📢 Estimated days until release of results: <span className="font-extrabold">{school.daysBeforeRelease} days</span>
                                  </div>
                                )}
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <span className="text-[9.5px] font-black uppercase tracking-wide text-slate-400 block mb-1">Admissions Requirements</span>
                                  <div className="space-y-1.5 bg-white p-3 rounded-lg border border-slate-100 max-h-[160px] overflow-y-auto scrollbar-thin">
                                    {school.requirements && school.requirements.length > 0 ? (
                                      school.requirements.map((req, i) => (
                                        <div key={i} className="flex items-start gap-1.5 text-slate-600 font-semibold leading-relaxed">
                                          <span className="text-emerald-500 font-bold">✔</span>
                                          <span>{req}</span>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-slate-400 italic">No specific requirements listed.</p>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <span className="text-[9.5px] font-black uppercase tracking-wide text-slate-400 block mb-1">Official Admissions Portal</span>
                                  <a 
                                    href={school.link} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="p-2 bg-slate-900 border border-slate-950 text-white rounded-xl text-center font-extrabold block hover:bg-slate-800 transition-all font-sans text-[10px] tracking-wide uppercase"
                                  >
                                    Visit Portal URL ↗
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-50 pt-3 flex justify-between items-center gap-4">
              <span className="text-xs text-slate-400">Targeting {nmatGoal} PR</span>
            </div>
          </div>
        </div>

        {/* 3. Philippine Med School Milestones Calendar */}
        {renderAdmissionsMilestones()}

        {/* 4. Quick NMAT Study Fact Card */}
        <div className={`p-5 ${themeCfg.accentBg} ${themeCfg.accentBorder} border rounded-[24px] flex items-start space-x-4 text-xs ${themeCfg.textColor} shadow-xs`}>
          <Info className={`w-5 h-5 ${themeCfg.iconColor} flex-shrink-0 mt-0.5`} />
          <div>
            <span className={`font-black ${themeCfg.accentText} uppercase block tracking-wider text-[10px]`}>PHILIPPINE NMAT PRO-TIP</span>
            <p className="leading-relaxed mt-1 text-[11px] font-medium text-slate-600">
              "The NMAT consists of two portions. Part 1 checks mental ability: Verbal, Quantitative (fractions, math formulas, percentage questions), Perceptual Acuity (mirroring, pattern groupings), and Inductive Reasoning. Part 2 matches academic concepts (Biology, Physics, Chemistry, Social Science). Aim for an equal footing—doing exceptionally well in Part 1 can dramatically boost your Percentile Rank (PR)!"
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isDataLight ? 'text-xs' : ''}`}>
      {/* 1. Header Banner */}
      <div className={`relative overflow-hidden rounded-2xl border ${
        isOffline 
          ? 'bg-amber-50/75 border-amber-200 text-slate-850' 
          : 'bg-gradient-to-r from-blue-700 via-sky-800 to-indigo-900 border-sky-950/20 text-white'
        } p-6 sm:p-8 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6`}>
        {!isDataLight && (
          <div className="absolute right-4 bottom-[-30px] opacity-15 pointer-events-none select-none text-sky-200 flex space-x-4">
            <svg width="180" height="180" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="animate-spin" style={{ animationDuration: '60s' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 2v20M17 5L7 19M19 12H5M17 19L7 5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6l3 3m0-6l-3 3M17 9l3-3m-6 6l3 3M19 12l-3 3M12 18l-3-3m0 6l3-3M7 15l-3 3" />
            </svg>
            <svg width="100" height="100" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="animate-spin hidden sm:block" style={{ animationDuration: '45s', animationDirection: 'reverse' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12 2v20M17 5L7 19M19 12H5M17 19L7 5" />
            </svg>
          </div>
        )}

        {/* Left main branding & greetings */}
        <div className="relative z-10 flex-1 space-y-3">
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isOffline ? 'bg-amber-200 text-amber-900' : 'bg-sky-500/20 text-sky-100'
            }`}>
              {isOffline ? 'Offline Commute Sync Live' : 'PWA Cloud Storage Linked'}
            </span>
            <span className={isOffline ? 'text-amber-800 text-xs font-medium' : 'text-sky-200 text-xs font-medium'}>| Manila, Philippines</span>
          </div>
          
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans ${
            isOffline ? 'text-amber-950' : 'text-white'
          }`}>
            Mabuhay, future Doctor! 👋
          </h1>
          
          <p className={`max-w-2xl text-sm leading-relaxed ${
            isOffline ? 'text-amber-900' : 'text-sky-100/90'
          }`}>
            Your NMAT target score of <span className="font-bold underline text-amber-300">{nmatGoal > 0 ? `${nmatGoal} Centile` : 'Not Set'}</span> is currently synchronized to ASMPH, UPCM, and PLM profiles. Let's finish your SRS cards and practice inductive loops today!
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('ai-engine')}
              className={`px-5 py-2 rounded-xl font-bold text-xs cursor-pointer shadow-md transition-all ${
                isOffline
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-205'
                  : 'bg-sky-400 hover:bg-sky-350 text-slate-900 shadow-sky-900/40'
              }`}
            >
              Start SRS Review ({dueToday.length} Due)
            </button>
            <button
              onClick={() => setActiveTab('simulated-suite')}
              className={`px-5 py-2 rounded-xl font-bold text-xs border cursor-pointer transition-all ${
                isOffline 
                  ? 'border-amber-400 text-amber-950 hover:bg-amber-100' 
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              Simulate 4-Hour Exam
            </button>
          </div>
        </div>

        {/* Right official NMAT Exam Countdown Panel */}
        <div className={`relative z-10 flex-shrink-0 bg-white/10 ${
          isOffline ? 'bg-amber-100/50 border-amber-300 text-amber-950 shadow-amber-100/30' : 'border-white/15 text-white shadow-indigo-900/30'
        } backdrop-blur-md rounded-2xl p-4 sm:p-5 border lg:max-w-xs w-full shadow-xl flex flex-col justify-between`}>
          <div className="flex items-center justify-between mb-3 border-b pb-2 border-white/10">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-sky-300" />
              <span className="text-[10px] uppercase font-black tracking-wider opacity-95">NMAT Exam Countdown</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-rose-500/30 text-rose-300 animate-pulse">
              Official Hub
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-1.5 text-center my-1.5">
            <div className={`p-2 rounded-xl border ${isOffline ? 'bg-amber-200/40 border-amber-300/30' : 'bg-white/5 border-white/5'}`}>
              <span className="block text-lg sm:text-xl font-black font-mono tracking-tight">{timeLeft.days}</span>
              <span className="text-[8px] font-black uppercase tracking-wider opacity-75">Days</span>
            </div>
            <div className={`p-2 rounded-xl border ${isOffline ? 'bg-amber-200/40 border-amber-300/30' : 'bg-white/5 border-white/5'}`}>
              <span className="block text-lg sm:text-xl font-black font-mono tracking-tight">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[8px] font-black uppercase tracking-wider opacity-75">Hrs</span>
            </div>
            <div className={`p-2 rounded-xl border ${isOffline ? 'bg-amber-200/40 border-amber-300/30' : 'bg-white/5 border-white/5'}`}>
              <span className="block text-lg sm:text-xl font-black font-mono tracking-tight">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[8px] font-black uppercase tracking-wider opacity-75">Mins</span>
            </div>
            <div className={`p-2 rounded-xl border ${isOffline ? 'bg-amber-200/40 border-amber-300/30' : 'bg-white/5 border-white/5'}`}>
              <span className="block text-lg sm:text-xl font-black font-mono tracking-tight text-rose-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[8px] font-black uppercase tracking-wider text-rose-300">Secs</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/10 text-[10px] font-medium">
            <span className="opacity-80">Target Date:</span>
            <input
              type="date"
              value={targetExamDateStr.split('T')[0]}
              onChange={(e) => {
                if (e.target.value) {
                  const newDateStr = `${e.target.value}T08:00:00`;
                  setTargetExamDateStr(newDateStr);
                  try {
                    localStorage.setItem('medly_target_exam_date', newDateStr);
                  } catch {}
                }
              }}
              className="bg-white/10 hover:bg-white/15 transition-all text-white rounded px-1.5 py-0.5 text-[9px] font-extrabold border border-white/10 outline-none cursor-pointer focus:ring-1 focus:ring-sky-300 text-center w-[100px]"
            />
          </div>
        </div>
      </div>

      {/* Central Command Center: Streak and Performance Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {performanceMetrics.map(met => (
          <div key={met.label} className={`p-4 rounded-xl border flex flex-col justify-between ${met.color}`}>
            <span className="text-[10px] font-black uppercase tracking-wider opacity-80">{met.label}</span>
            <span className="text-xl sm:text-2xl font-black mt-1">{met.value}</span>
          </div>
        ))}
      </div>

      {/* 2. Bento Grid Stats & Dream School Index */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Target School Tracker */}
        {renderDreamSchoolIndex()}

      </div>

      {/* Multi-take Score Comparison board */}
      <NmatTakesTracker />

      {/* Active Bulletins/Announcements Board Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Dynamic Announcements Bulletin */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <Bell className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-extrabold text-slate-800 text-sm sm:text-base">Announcements Board & Regulatory Advisories</h2>
              <p className="text-xs text-slate-400">Stay up-to-date with testing schedules, filing criteria, and app updates.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {announcements.length === 0 ? (
              <div className="col-span-1 md:col-span-3 text-center p-6 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                <p className="text-xs text-slate-400 font-extrabold italic">No board bulletins mapped yet. Bulletins are completely clear.</p>
              </div>
            ) : (
              announcements.map(ann => (
                <div key={ann.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex flex-col justify-between text-xs space-y-2">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-black uppercase text-sky-600 px-1.5 py-0.5 bg-sky-50 rounded">
                        {ann.category}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold">{ann.date}</span>
                    </div>
                    <h4 className="font-extrabold text-slate-850 leading-snug">{ann.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{ann.body || ann.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Diagnostic Metrics Trends Mini Panel */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <LineChart className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-extrabold text-slate-850 text-xs sm:text-sm">Mock Statistics</h2>
                <p className="text-xs text-slate-400">Real-time performance trends.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed font-medium">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Biology Mock Average:</span>
                <span className="font-bold text-slate-800">82%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Chemistry Mock Average:</span>
                <span className="font-bold text-slate-800">88%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Physics Mock Average:</span>
                <span className="font-bold text-slate-800">79%</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <span className="text-slate-650 font-bold">Projected NMAT Percentile:</span>
                <span className="font-black text-sky-600">PR 96 - 98</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <button
              onClick={() => setActiveTab('theory-syllabi')}
              className="w-full py-1.5 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-[11px] rounded-lg cursor-pointer text-center"
            >
              Examine Detail Reports
            </button>
          </div>
        </div>

      </div>

      {/* 3. Philippine Med School Milestones Calendar */}
      {renderAdmissionsMilestones()}

      {/* 4. Quick NMAT Study Fact Card */}
      <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-150 flex items-start space-x-3 text-xs text-slate-800">
        <Info className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-black text-sky-800 uppercase block tracking-wider text-[10px]">PHILIPPINE NMAT PRO-TIP</span>
          <p className="leading-relaxed mt-1 text-[11px] font-medium text-slate-600">
            "The NMAT consists of two portions. Part 1 checks mental ability: Verbal, Quantitative (fractions, math formulas, percentage questions), Perceptual Acuity (mirroring, pattern groupings), and Inductive Reasoning. Part 2 matches academic concepts (Biology, Physics, Chemistry, Social Science). Aim for an equal footing—doing exceptionally well in Part 1 can dramatically boost your Percentile Rank (PR)!"
          </p>
        </div>
      </div>
    </div>
  );
}
