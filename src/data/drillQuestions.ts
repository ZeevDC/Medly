import { biologyQuestions } from './biologyQuestions';
import { chemistryQuestions } from './chemistryQuestions';
import { physicsQuestions } from './physicsQuestions';
import { socialScienceQuestions } from './socialScienceQuestions';
import { aptitudeQuestions } from './aptitudeQuestions';

export interface Question {
  id: string;
  subject: string;
  remedialTopic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// Smart Helper to shuffle options and correctly track the letter A, B, C, or D
// It bypasses shuffling if any choice contains positional words like "above", "below" or "both"
export function buildShuffledQuestion(
  id: string,
  subject: string,
  remedialTopic: string,
  question: string,
  rawChoices: { text: string; isCorrect: boolean }[],
  rationale: string
): Question {
  const shuffled = [...rawChoices];
  
  // Detect if any option relies on position (e.g. "all of the above", "none of the above", "both A and B")
  const hasPositionDependent = rawChoices.some(c => {
    const txt = c.text.toLowerCase();
    return (
      txt.includes('above') || 
      txt.includes('below') || 
      txt.includes('both ') || 
      txt.includes('either ') || 
      txt.includes('neither ') ||
      txt.includes('determined based on')
    );
  });

  if (!hasPositionDependent) {
    // Standard random Durstenfeld/Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  }

  const letters = ['A', 'B', 'C', 'D'];
  const options = shuffled.map((choice, i) => `${letters[i]}) ${choice.text}`);
  const correctIdx = shuffled.findIndex(choice => choice.isCorrect);
  const correctAnswer = letters[correctIdx] || 'A';

  return {
    id,
    subject,
    remedialTopic,
    question,
    options,
    correctAnswer,
    explanation: rationale,
  };
}

// -----------------------------------------------------------------
// Master Drill Question Provider function
// Generates exactly 50 premium handcrafted items per subject
// -----------------------------------------------------------------

export function getDrillQuestions(subject: string): Question[] {
  const normSubject = subject.trim().toLowerCase();

  if (normSubject === 'all subjects') {
    const bios = biologyQuestions.map((q, idx) => ({ ...q, actualSub: 'Biology' }));
    const chems = chemistryQuestions.map((q, idx) => ({ ...q, actualSub: 'Chemistry' }));
    const phys = physicsQuestions.map((q, idx) => ({ ...q, actualSub: 'Physics' }));
    const socs = socialScienceQuestions.map((q, idx) => ({ ...q, actualSub: 'Social Science' }));
    const apts = aptitudeQuestions.map((q, idx) => ({ ...q, actualSub: 'Cognitive Skills' }));
    
    // Shuffle the combined array so they are dynamically randomized across subjects
    const combined = [...bios, ...chems, ...phys, ...socs, ...apts];
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    return combined.map((item, index) => {
      return buildShuffledQuestion(
        `cp-all-static-${index + 1}`,
        item.actualSub,
        item.topic,
        item.q,
        item.choices,
        item.rationale
      );
    });
  }

  let pool: { topic: string; q: string; choices: { text: string; isCorrect: boolean }[]; rationale: string }[] = [];

  if (normSubject === 'biology') {
    pool = biologyQuestions;
  } else if (normSubject === 'chemistry') {
    pool = chemistryQuestions;
  } else if (normSubject === 'physics') {
    pool = physicsQuestions;
  } else if (normSubject === 'social science') {
    pool = socialScienceQuestions;
  } else {
    // Default to Aptitude and Cognitive Skills items
    pool = aptitudeQuestions;
  }

  // Ensure each subject returns exactly its corresponding list of 50 high-yield questions
  return pool.map((item, index) => {
    return buildShuffledQuestion(
      `cp-${normSubject}-static-${index + 1}`,
      subject,
      item.topic,
      item.q,
      item.choices,
      item.rationale
    );
  });
}
