import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Brain, 
  MessageSquare, 
  Dna, 
  HelpCircle, 
  Loader2, 
  CornerDownLeft, 
  RotateCcw, 
  ArrowUpRight,
  BookmarkCheck,
  Send,
  Zap,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { NmatQuestion, SrsConcept, ChatMessage } from '../types';

interface AIStudyEngineProps {
  srsConcepts: SrsConcept[];
  setSrsConcepts: React.Dispatch<React.SetStateAction<SrsConcept[]>>;
  isOffline: boolean;
  isDataLight: boolean;
}

export default function AIStudyEngine({
  srsConcepts,
  setSrsConcepts,
  isOffline,
  isDataLight,
}: AIStudyEngineProps) {
  // Tabs within AI Study Engine
  const [engineTab, setEngineTab] = useState<'quiz-gen' | 'srs-review' | 'socratic'>('quiz-gen');

  // 1. Quiz Generator States
  const [pastedNotes, setPastedNotes] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Chemistry');
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<NmatQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: string }>({});
  const [revealedExplanations, setRevealedExplanations] = useState<{ [qId: string]: boolean }>({});
  const [quizSavedStatus, setQuizSavedStatus] = useState(false);

  // 2. SRS Review States
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // 3. Socratic Chatbot States
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'soc-init',
      sender: 'Socrates-Med',
      senderRole: 'bot',
      content: 'Hello, peer! I am Socrates-Med, your personal NMAT coach. I am trained NOT to give you answers directly, but to ask supportive leading questions. Ask me anything about physics kinematics, stoichiometry, or perceptual acuity!',
      timestamp: new Date().toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}),
      avatarColor: 'from-purple-650 to-indigo-600'
    }
  ]);

  // Subject options
  const subjects = ['Chemistry', 'Physics', 'Biology', 'Social Science', 'Quantitative Reasoning', 'Perceptual Acuity'];

  // Preset materials to make it easy for testing
  const presetNotes = {
    Chemistry: "Ideal Gas Law is PV = nRT. P is pressure in atmospheres, V is volume in liters, n is moles, R is gas constant (0.0821 L atm/mol K) and T is temperature in Kelvin (Celsius + 273). Ideal gases undergo elastic collisions. At standard temperature and pressure (STP), 1 mole of ideal gas occupies exactly 22.4 liters. Real gases deviate from ideal behavior at high pressure and very low temperature due to inter-molecular attractions and physical molecular volume.",
    Physics: "Uniform speed kinematics equations: v_final = v_initial + a*t. Displacement d = v_initial*t + 0.5*a*(t squared). Final speed squared = initial speed squared + 2*a*d. Acceleration of gravity is approximately 9.8 m/sec squared. Newton's laws are: 1. Inertia (an object stays at rest or in straight uniform motion unless acted upon), 2. F = m*a (force is mass times acceleration), 3. Action-reaction (whenever one body exerts a force on a second, the second body exerts equal and opposite force).",
    Biology: "Mitosis results in two genetically identical diploid (2n) daughter cells. Meiosis on the other hand leads to four genetically unique haploid (n) gametes. Stages of mitosis are Prophase (chromatin condenses, spindle fibers form), Metaphase (chromosomal alignment on the equatorial plate), Anaphase (sister chromatids separated to opposite poles), Telophase (nuclear envelop forms again). Crossing over occurs in Prophase I of meiosis, promoting genetic variation."
  };

  const loadPreset = (subj: string) => {
    const rawSubject = subj as keyof typeof presetNotes;
    if (presetNotes[rawSubject]) {
      setPastedNotes(presetNotes[rawSubject]);
    }
  };

  // Run AI Document-to-Quiz generation
  const handleGenerateQuiz = async () => {
    if (!pastedNotes.trim()) return;
    setIsGeneratingQuiz(true);
    setGeneratedQuestions([]);
    setUserAnswers({});
    setRevealedExplanations({});
    setQuizSavedStatus(false);

    try {
      const userApiKey = localStorage.getItem('medly_developer_api_key') || '';
      const response = await fetch('/api/gemini/quiz', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-gemini-api-key': userApiKey
        },
        body: JSON.stringify({
          notes: pastedNotes,
          subject: selectedSubject,
          isOffline: isOffline
        })
      });
      const data = await response.json();
      if (data.questions) {
        setGeneratedQuestions(data.questions);
      }
    } catch (e) {
      console.warn("Quiz generation was halted or handled in simulation state:", e);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  // Handle answers
  const handleAnswerSelect = (questionId: string, optionLetter: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionLetter }));
    setRevealedExplanations(prev => ({ ...prev, [questionId]: true }));
  };

  // Convert Quiz questions to new SRS concept cards
  const saveQuizQuestionsToSrs = () => {
    if (generatedQuestions.length === 0) return;
    
    const newSrsCards: SrsConcept[] = generatedQuestions.map((q, idx) => ({
      id: `custom-srs-${Date.now()}-${idx}`,
      conceptName: q.question.substring(0, 45) + '...',
      subject: (selectedSubject as any) || 'Chemistry',
      difficulty: 'Medium',
      lastReviewed: new Date().toISOString(),
      nextReviewDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days later default
      repetitions: 1,
      intervalDays: 2,
      failCount: 0
    }));

    setSrsConcepts(prev => [...newSrsCards, ...prev]);
    setQuizSavedStatus(true);
  };

  // SRS card processing
  const handleSrsFeedback = (difficulty: 'easy' | 'medium' | 'hard', cardId: string) => {
    // Modify intervals based on standard Spaced Repetition algorithms:
    // Easy: interval *= 14 days
    // Medium: interval = 5 days
    // Hard: interval = 2 days
    setSrsConcepts(prev => prev.map(concept => {
      if (concept.id === cardId) {
        let nextInterval = 2;
        let failIncrement = 0;
        if (difficulty === 'easy') {
          nextInterval = concept.intervalDays === 2 ? 5 : concept.intervalDays * 2 + 3;
        } else if (difficulty === 'medium') {
          nextInterval = Math.max(3, concept.intervalDays);
        } else {
          nextInterval = 1;
          failIncrement = 1;
        }
        
        // Schedule next review date
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + nextInterval);

        return {
          ...concept,
          intervalDays: nextInterval,
          repetitions: concept.repetitions + 1,
          failCount: concept.failCount + failIncrement,
          lastReviewed: new Date().toISOString(),
          nextReviewDate: nextDate.toISOString(),
          difficulty: difficulty === 'easy' ? 'Easy' : difficulty === 'medium' ? 'Medium' : 'Hard'
        } as SrsConcept;
      }
      return concept;
    }));

    // Slide to next card
    setIsCardFlipped(false);
    if (activeCardIndex < srsConcepts.length - 1) {
      setActiveCardIndex(prev => prev + 1);
    } else {
      setActiveCardIndex(0); // circular list
    }
  };

  // Socrates chat request
  const handleSendSocraticMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: `chat-usr-${Date.now()}`,
      sender: 'You',
      senderRole: 'student',
      content: chatInput,
      timestamp: new Date().toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}),
      avatarColor: 'from-emerald-500 to-teal-500'
    };

    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const userApiKey = localStorage.getItem('medly_developer_api_key') || '';
      const response = await fetch('/api/gemini/socratic', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-gemini-api-key': userApiKey
        },
        body: JSON.stringify({
          message: userMsg.content,
          history: chatHistory.map(h => ({
            role: h.sender === 'You' ? 'user' : 'model',
            content: h.content
          })),
          context: {
            selectedSubject,
            cardCount: srsConcepts.length,
            isOffline
          }
        })
      });
      const data = await response.json();
      
      const botResponse: ChatMessage = {
        id: `chat-bot-${Date.now()}`,
        sender: 'Socrates-Med',
        senderRole: 'bot',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}),
        avatarColor: 'from-violet-500 to-indigo-600'
      };

      setChatHistory(prev => [...prev, botResponse]);
    } catch (err) {
      console.warn("Chat connection status logged:", err);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Helper lists for due today
  const dueConcepts = srsConcepts.filter(concept => new Date(concept.nextReviewDate) <= new Date());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Control panels */}
      <div className="lg:col-span-1 space-y-3">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Engine Modules</span>
          <button
            onClick={() => setEngineTab('quiz-gen')}
            className={`flex items-center space-x-2.5 p-3 rounded-xl font-semibold text-xs text-left cursor-pointer transition-all ${
              engineTab === 'quiz-gen' 
                ? 'bg-emerald-550 text-white shadow-sm shadow-emerald-100' 
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4.5 h-4.5" />
            <div className="leading-none">
              <span className="block">Doc-to-Quiz Parser</span>
              <span className={`text-[9px] block ${engineTab === 'quiz-gen' ? 'text-emerald-100' : 'text-slate-400'}`}>Upload and test</span>
            </div>
          </button>

          <button
            onClick={() => setEngineTab('srs-review')}
            className={`flex items-center space-x-2.5 p-3 rounded-xl font-semibold text-xs text-left cursor-pointer transition-all ${
              engineTab === 'srs-review' 
                ? 'bg-emerald-550 text-white shadow-sm shadow-emerald-100' 
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Brain className="w-4.5 h-4.5" />
            <div className="leading-none">
              <span className="block">SRS Swiper Tutor</span>
              <span className={`text-[9px] block ${engineTab === 'srs-review' ? 'text-emerald-100' : 'text-slate-400'}`}>
                {dueConcepts.length} due today / {srsConcepts.length} cards
              </span>
            </div>
          </button>

          <button
            onClick={() => setEngineTab('socratic')}
            className={`flex items-center space-x-2.5 p-3 rounded-xl font-semibold text-xs text-left cursor-pointer transition-all ${
              engineTab === 'socratic' 
                ? 'bg-emerald-550 text-white shadow-sm shadow-emerald-100' 
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4.5 h-4.5" />
            <div className="leading-none">
              <span className="block">Socratic AI Guide</span>
              <span className={`text-[9px] block ${engineTab === 'socratic' ? 'text-emerald-100' : 'text-slate-400'}`}>Concept probing bot</span>
            </div>
          </button>
        </div>

        {/* Quick Tips */}
        <div className="p-4 bg-gradient-to-br from-indigo-50/50 to-emerald-50/50 rounded-2xl border border-slate-100 text-xs text-slate-650 space-y-2">
          <div className="flex items-center space-x-1 font-bold text-slate-800 text-xs">
            <Sparkles className="w-4.5 h-4.5 text-emerald-600" />
            <span>Active Recall is Key</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            NMAT biology structures require active identification. Use the Socratic guide to quiz yourself on the layers of cellular membranes instead of reviewing raw textbook tables!
          </p>
        </div>
      </div>

      {/* Main working view */}
      <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        
        {/* TAB 1: quiz generator workspace */}
        {engineTab === 'quiz-gen' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-slate-800 font-sans flex items-center space-x-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span>AI Document-to-Quiz Engine</span>
              </h2>
              <p className="text-xs text-slate-400">Pastes high-yield notes, schedules, or bullet points to generate NMAT-like drills automatically with explanatory rationale.</p>
            </div>

            {/* Paste notes card */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Select NMAT Subject Material</label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subj) => (
                    <button
                      key={subj}
                      onClick={() => setSelectedSubject(subj)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-all ${
                        selectedSubject === subj
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700">Paste Your Notes, Syllabi or Textbook Passages</label>
                  <div className="flex space-x-2 text-[11px]">
                    <span className="text-slate-400">Quick Test:</span>
                    <button 
                      onClick={() => loadPreset(selectedSubject)}
                      className="text-emerald-600 hover:underline font-bold cursor-pointer"
                    >
                      Load {selectedSubject} Template Note
                    </button>
                  </div>
                </div>
                <textarea
                  value={pastedNotes}
                  onChange={(e) => setPastedNotes(e.target.value)}
                  placeholder="Paste biology diagrams description, physics formulas, endocrine gland functions, or quantitative data here..."
                  className="w-full h-32 p-3 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-55/40 font-sans outline-none resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleGenerateQuiz}
                  disabled={!pastedNotes.trim() || isGeneratingQuiz}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isGeneratingQuiz ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Gemini is generating custom NMAT drill...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-250 fill-emerald-250" />
                      <span>Convert Notes to NMAT MCQ Drill</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Question presentation */}
            {generatedQuestions.length > 0 && (
              <div className="border-t border-slate-100 pt-6 space-y-6">
                <div className="flex justify-between items-center bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100">
                  <div>
                    <h3 className="font-extrabold text-xs text-emerald-900">Custom NMAT Drill Generated!</h3>
                    <p className="text-[10px] text-emerald-700">These 3 item multiple choice questions specifically target concepts found in your notes.</p>
                  </div>
                  {!quizSavedStatus ? (
                    <button
                      onClick={saveQuizQuestionsToSrs}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-750 text-white font-bold text-xs flex items-center space-x-1 cursor-pointer"
                    >
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      <span>Save as active flashcards</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 bg-white/60 border border-emerald-300 px-3 py-1 rounded-lg flex items-center space-x-1">
                      <span>✓ Added to SRS Spacing Deck</span>
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  {generatedQuestions.map((q, qIndex) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const selectedAns = userAnswers[q.id];
                    const correctAns = q.correctAnswer;
                    return (
                      <div key={q.id} className="p-4 rounded-xl border border-slate-150 space-y-4">
                        <div className="flex items-start space-x-2">
                          <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {qIndex + 1}
                          </span>
                          <h4 className="font-bold text-slate-850 text-xs sm:text-sm leading-relaxed">{q.question}</h4>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-8">
                          {q.options.map((option) => {
                            const letter = option.charAt(0); // Assuming 'A)' or 'A ' format
                            const isThisSelected = selectedAns === letter;
                            const isThisCorrect = correctAns === letter;
                            let btnStyle = 'bg-white border-slate-200 hover:bg-slate-50';
                            
                            if (isThisSelected) {
                              if (letter === correctAns) {
                                btnStyle = 'bg-green-50 border-green-400 text-green-900 font-semibold';
                              } else {
                                btnStyle = 'bg-red-50 border-red-400 text-red-900 font-semibold';
                              }
                            } else if (isAnswered && isThisCorrect) {
                              // Reveal correct answer nonetheless
                              btnStyle = 'bg-green-50 border-green-300 text-green-800 font-semibold';
                            }

                            return (
                              <button
                                key={option}
                                disabled={isAnswered}
                                onClick={() => handleAnswerSelect(q.id, letter)}
                                className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${btnStyle}`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>

                        {/* Answer Check and explanations */}
                        {isAnswered && (
                          <div className="pl-8 pt-2">
                            <div className={`p-3 rounded-xl border flex items-start space-x-2.5 ${
                              selectedAns === correctAns ? 'bg-green-50/50 border-green-200' : 'bg-rose-50/50 border-rose-250'
                            }`}>
                              {selectedAns === correctAns ? (
                                <CheckCircle2 className="w-4.5 h-4.5 text-green-600 flex-shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-4.5 h-4.5 text-rose-600 flex-shrink-0 mt-0.5" />
                              )}
                              <div>
                                <span className="font-extrabold text-xs block text-slate-800">
                                  {selectedAns === correctAns ? 'Correct Answer!' : `Incorrect. The correct choice is ${correctAns}`}
                                </span>
                                <p className="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line">{q.explanation}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SRS review deck */}
        {engineTab === 'srs-review' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-slate-800 font-sans flex items-center space-x-2">
                <Brain className="w-5 h-5 text-emerald-600" />
                <span>Spaced Repetition swiper</span>
              </h2>
              <p className="text-xs text-slate-400">Our SRS algorithm schedules complex core subjects based on review performance to flatten your forgetting curves.</p>
            </div>

            {/* SRS Swiper Core */}
            {dueConcepts.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl space-y-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">No flashcards due right now!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">Outstanding! You have cleared your entire concept block. Feel free to parsed new syllabus notes to load more high-yield review content.</p>
                </div>
                <button
                  onClick={() => setEngineTab('quiz-gen')}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center space-x-1 cursor-pointer"
                >
                  <span>Build custom cards</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Stats row */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-450 font-semibold">Reviewing Card {activeCardIndex + 1} of {dueConcepts.length} outstanding today</span>
                  <div className="flex space-x-2">
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-700 font-bold rounded">Due today: {dueConcepts.length}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-650 rounded">In total: {srsConcepts.length}</span>
                  </div>
                </div>

                {/* Flip Card Stage */}
                {(() => {
                  const card = dueConcepts[activeCardIndex] || dueConcepts[0];
                  if (!card) return null;
                  return (
                    <div className="space-y-4">
                      <div 
                        onClick={() => setIsCardFlipped(!isCardFlipped)}
                        className={`min-h-52 rounded-2xl border-2 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 transform-gpu relative ${
                          isCardFlipped 
                            ? 'bg-slate-900 text-white border-slate-950 scale-[1.01] rotate-y-180' 
                            : 'bg-slate-50 text-slate-800 border-emerald-100 hover:border-emerald-300'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              card.subject === 'Biology' ? 'bg-green-100 text-green-800' :
                              card.subject === 'Chemistry' ? 'bg-blue-100 text-blue-800' :
                              card.subject === 'Physics' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {card.subject}
                            </span>
                            <span className="text-[10px] text-slate-450">Click card to Flip</span>
                          </div>

                          <div className="space-y-3 py-2 text-center">
                            {isCardFlipped ? (
                              <div className="space-y-3">
                                <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">Concept Rationale</span>
                                <p className="text-sm leading-relaxed text-slate-100 font-medium">{card.conceptName}</p>
                                <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
                                  This concept has an active spaced interval of {card.intervalDays} days. Correct recall extends this spacing to prevent cognitive load fatigue!
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <span className="text-[10px] text-emerald-600 font-bold block uppercase tracking-wider">NMAT High-Yield Topic</span>
                                <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-800 max-w-xl mx-auto">{card.conceptName}</h3>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="border-t border-slate-200/20 pt-4 flex justify-between items-center text-[10px]">
                          <span className={`${isCardFlipped ? 'text-slate-400' : 'text-slate-400'}`}>
                            Repetitions: <strong className="font-bold">{card.repetitions} times</strong>
                          </span>
                          <span className="font-extrabold underline text-emerald-500 uppercase">
                            {isCardFlipped ? 'Show Concept Front' : 'Reveal Explanation Back'}
                          </span>
                        </div>
                      </div>

                      {/* Hard, Medium, Easy Reschedule Buttons */}
                      <div className="pt-2">
                        <span className="block text-center text-xs font-bold text-slate-500 mb-3">Rate your memory retrieval:</span>
                        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                          <button
                            onClick={() => handleSrsFeedback('hard', card.id)}
                            className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 py-2.5 rounded-xl font-bold text-xs flex flex-col items-center cursor-pointer transition-all"
                          >
                            <span className="block">Hard 💥</span>
                            <span className="text-[9px] text-rose-500 font-medium">Review 1d later</span>
                          </button>

                          <button
                            onClick={() => handleSrsFeedback('medium', card.id)}
                            className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 py-2.5 rounded-xl font-bold text-xs flex flex-col items-center cursor-pointer transition-all"
                          >
                            <span className="block">Medium ⏳</span>
                            <span className="text-[9px] text-amber-600 font-medium">Review 5d later</span>
                          </button>

                          <button
                            onClick={() => handleSrsFeedback('easy', card.id)}
                            className="bg-green-50 hover:bg-green-150 border border-green-200 text-green-850 py-2.5 rounded-xl font-bold text-xs flex flex-col items-center cursor-pointer transition-all"
                          >
                            <span className="block">Easy 🎉</span>
                            <span className="text-[9px] text-green-600 font-medium">Review 14d later</span>
                          </button>
                        </div>
                      </div>

                      {/* Custom input concept generator */}
                      <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[11px] text-slate-450 font-semibold italic">Did you know? Kinematics formulas (D=vt+0.5at²) account for 15% of Physics items.</span>
                        <button
                          onClick={() => {
                            // Quick random trigger
                            const randId = `mock-srs-${Date.now()}`;
                            const conceptsList = [
                              "Bernoulli's Principle (fluid physics)",
                              "Markovnikov's Rule (organic addition)",
                              "Osmotic Pressure calculations (physical physical chemistry)"
                            ];
                            const selectOne = conceptsList[Math.floor(Math.random() * conceptsList.length)];
                            setSrsConcepts(prev => [{
                              id: randId,
                              conceptName: selectOne,
                              subject: 'Physics',
                              difficulty: 'Medium',
                              lastReviewed: new Date().toISOString(),
                              nextReviewDate: new Date().toISOString(),
                              repetitions: 1,
                              intervalDays: 2,
                              failCount: 0
                            }, ...prev]);
                          }}
                          className="text-[11px] font-bold text-slate-655 hover:underline cursor-pointer"
                        >
                          + Quick Add Concept Card
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Socratic AI bot */}
        {engineTab === 'socratic' && (
          <div className="space-y-4 flex flex-col h-[550px] justify-between">
            <div>
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-lg font-extrabold text-slate-800 font-sans flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                  <span>Socratic NMAT Tutor</span>
                </h2>
                <span className="text-[10px] text-indigo-600 font-extrabold px-2.5 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
                  Socrates-Med Bot Active
                </span>
              </div>
              <p className="text-xs text-slate-450">Stuck on a tricky problem? Socratic will guide you step by step with probing prompts instead of raw solutions.</p>
            </div>

            {/* Chat output area */}
            <div className="flex-1 overflow-y-auto p-4 border border-slate-150 rounded-xl bg-slate-50/50 space-y-4 font-sans text-xs flex flex-col">
              {chatHistory.map((item) => {
                const isBot = item.senderRole === 'bot';
                return (
                  <div key={item.id} className={`flex flex-col space-y-1 max-w-[85%] ${isBot ? 'self-start' : 'self-end'}`}>
                    <span className="text-[9px] text-slate-450 font-bold px-1">{item.sender}</span>
                    <div className={`p-3 rounded-2xl ${
                      isBot 
                        ? 'bg-slate-900 border border-slate-950 text-slate-100 rounded-tl-none' 
                        : 'bg-emerald-550 text-white rounded-tr-none'
                    }`}>
                      <p className="leading-relaxed whitespace-pre-line">{item.content}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 self-end px-1">{item.timestamp}</span>
                  </div>
                );
              })}
              {isChatLoading && (
                <div className="self-start flex flex-col space-y-1">
                  <span className="text-[9px] text-slate-400 font-bold">Socrates-Med is formulating question...</span>
                  <div className="bg-slate-150 p-3 rounded-2xl rounded-tl-none flex items-center space-x-2.5">
                    <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />
                    <span className="text-slate-500 italic text-[11px]">Let's inspect your reasoning...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Helper quick triggers */}
            <div className="pt-2">
              <span className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wide">Quick concept questions:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setChatInput("I don't understand kinematics formulas. How do they relate velocity and acceleration?")}
                  className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-205 text-[10px] cursor-pointer"
                >
                  Kinematics Velocity/Acc?
                </button>
                <button
                  onClick={() => setChatInput("Can you guide me on calculating pH of a weak acid buffer stream?")}
                  className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-205 text-[10px] cursor-pointer"
                >
                  Weak Acid Buffer pH?
                </button>
                <button
                  onClick={() => setChatInput("I get confused by Prophase I crossing over in Meiosis. What happens?")}
                  className="px-2.5 py-1 rounded bg-slate-100 text-slate-705 hover:bg-slate-150 text-[10px] cursor-pointer"
                >
                  Prophase I crossing over?
                </button>
              </div>
            </div>

            {/* Input field */}
            <div className="flex space-x-2 pt-2 border-t border-slate-100">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendSocraticMessage()}
                placeholder="Ask Socrates-Med: 'Stuck on physics forces' or 'Help with mole ratios'..."
                className="flex-1 p-3 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button
                onClick={handleSendSocraticMessage}
                disabled={!chatInput.trim() || isChatLoading}
                className="p-3 bg-slate-900 border border-slate-950 text-white rounded-xl hover:bg-slate-800 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
