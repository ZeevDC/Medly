/**
 * Shared Type Definitions for the Medly Philippine NMAT and Med School Prep Platform
 */

export interface MedSchool {
  id: string;
  name: string;
  abbreviation: string;
  location: string;
  requiredNmatMin: number;
  competitiveNmat: number;
  weightGwa: string; // Weight of undergrad grades (e.g. 40%, High, Moderate)
  weightNmat: string;
  deadline: string;
  requirements: string[];
  link: string;
  applicationPeriod?: string;
  daysUntilStart?: number;
  daysUntilEnd?: number;
  registrationFee?: string;
  contactEmail?: string;
  contactAddress?: string;
  contactOffice?: string;
  contactNumber?: string;
  daysBeforeRelease?: number;
}

export interface NmatQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | string;
  explanation: string;
  userDifficultyFeedback?: 'easy' | 'medium' | 'hard';
}

export interface SrsConcept {
  id: string;
  conceptName: string;
  subject: 'Biology' | 'Chemistry' | 'Physics' | 'Social Science' | 'Quantitative' | 'Verbal' | 'Perceptual Acuity' | 'Gross Anatomy' | 'Biochemistry' | 'Physiology';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  lastReviewed: string; // ISO date
  nextReviewDate: string; // ISO date
  repetitions: number;
  intervalDays: number; // SRS interval: 1, 2, 5, 14, etc.
  failCount: number;
}

export interface StudyRoom {
  id: string;
  name: string;
  description: string;
  activeVoiceCount: number;
  activeChatCount: number;
  members: Array<{ name: string; avatarColor: string; isSpeaking?: boolean }>;
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderRole?: 'student' | 'mentor' | 'bot';
  content: string;
  timestamp: string;
  avatarColor: string;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  creator: string;
  upvotes: number;
  subject: string;
  cardCount: number;
  isCustom?: boolean;
  description?: string;
  rating?: number; // average stars out of 5
  ratingsCount?: number; // total voter count
  reviews?: Array<{ id: string; user: string; stars: number; comment: string; date: string }>;
  cards?: Array<{ front: string; back: string }>;
  isStudyGuide?: boolean; // true if study guide or combo
  guideText?: string; // full markdown or text content for study guides
  createdAt?: string;
}

export interface BridgeModule {
  id: string;
  title: string;
  course: 'Anatomy' | 'Biochemistry' | 'Physiology';
  description: string;
  survivalTips: string[];
  topics: Array<{
    name: string;
    description: string;
    mnemonics: string;
    primerContent: string;
  }>;
}

export interface PatternPuzzle {
  id: string;
  instructions: string;
  figures: string[]; // SVGs or dynamic characters showing a progression
  options: string[]; // Options to pick
  correctOptionIndex: number;
  explanation: string;
}
