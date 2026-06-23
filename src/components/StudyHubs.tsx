import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Map, 
  MessageSquare, 
  Volume2, 
  VolumeX,
  Plus, 
  ArrowUp, 
  Play, 
  CheckCircle,
  HelpCircle,
  Award,
  Clock,
  Sparkles,
  Zap,
  Star,
  Search,
  Filter,
  ArrowUpDown,
  BookOpen,
  FileText,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { StudyRoom, FlashcardDeck, SrsConcept } from '../types';

export default function StudyHubs() {
  // Tabs: rooms vs community decks vs live multiplayer
  const [activeHubSubTab, setActiveHubSubTab] = useState<'rooms' | 'decks' | 'kahoot'>('rooms');

  // 1. Drop-In Voice Rooms
  const [joinedRoomId, setJoinedRoomId] = useState<string | null>(null);
  const [micActive, setMicActive] = useState(false);
  const [roomChat, setRoomChat] = useState<Array<{ sender: string; text: string; role: string }>>([
    { sender: 'MedStudent101', text: 'Does anyone have a good shortcut for evaluating mirror objects in perceptual acuity?', role: 'UPCM Dreamer' },
    { sender: 'KinesiologyGuy', text: 'Flip it mentally on the horizontal plane. It makes pattern sequence matching 10x faster!', role: 'ASMPH Bound' }
  ]);
  const [newChatInput, setNewChatInput] = useState('');

  // Initial Rooms List
  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([
    {
      id: 'room-1',
      name: 'Biology Grind Sub-Cells',
      description: 'Discussing crossing over, meiosis stages, cellular respiration cycles, and Krebs pathways.',
      activeVoiceCount: 5,
      activeChatCount: 12,
      members: [
        { name: 'Dr. Hope', avatarColor: 'bg-indigo-500', isSpeaking: true },
        { name: 'PreMed99', avatarColor: 'bg-emerald-500' },
        { name: 'NmatSurfer', avatarColor: 'bg-sky-550', isSpeaking: true },
        { name: 'StLukeDreamer', avatarColor: 'bg-purple-500' }
      ]
    },
    {
      id: 'room-2',
      name: 'Physics Kinematics Marathon',
      description: 'Calculating work-energy theorems, velocity equations and kinematics acceleration vectors.',
      activeVoiceCount: 3,
      activeChatCount: 8,
      members: [
        { name: 'PhysicsApe', avatarColor: 'bg-blue-500', isSpeaking: true },
        { name: 'UERM_Bound', avatarColor: 'bg-rose-500' },
        { name: 'PinoyMed', avatarColor: 'bg-yellow-500' }
      ]
    },
    {
      id: 'room-3',
      name: 'ASMPH & UPCM Interview prep',
      description: 'Sharing typical medical panel interview inquiries, essay writing structures, and posture review.',
      activeVoiceCount: 6,
      activeChatCount: 19,
      members: [
        { name: 'DeanLia', avatarColor: 'bg-slate-705', isSpeaking: true },
        { name: 'AnatQueen', avatarColor: 'bg-pink-500' }
      ]
    }
  ]);

  // 2. State for Community Decks & Marketplace
  const [marketDecks, setMarketDecks] = useState<FlashcardDeck[]>(() => {
    try {
      const stored = localStorage.getItem('medly_market_decks');
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    return [
      { 
        id: 'deck-1', 
        title: 'UPCM Biology Cellular Recall', 
        creator: 'UPCM_Alum95', 
        upvotes: 142, 
        subject: 'Biology', 
        cardCount: 4,
        rating: 4.8,
        ratingsCount: 38,
        description: 'Comprehensive active recall loops targeted at UPCM entrance biology chapters, focusing on meiosis crossovers, cell cycle check-points, organelles, and ATP synthase phosphorylation equations.',
        isStudyGuide: false,
        createdAt: '2026-04-10T12:00:00Z',
        cards: [
          { front: 'What is the rate-limiting step enzyme of Glycolysis, inhibited by elevated ATP?', back: 'Phosphofructokinase-1 (PFK-1)' },
          { front: 'Which cellular process reduces chromosome number by half to generate haploid gametes?', back: 'Meiosis I (specifically Homologous Chromosomes separate)' },
          { front: 'What organelle contains its own double-membrane system and circular DNA, inherited purely maternally?', back: 'Mitochondrion' },
          { front: 'What checkpoint monitors spindle assembly before entering anaphase?', back: 'M Checkpoint (Spindle Checkpoint)' }
        ],
        reviews: [
          { id: 'rev-1-1', user: 'PLM_Challenger', stars: 5, comment: 'Phenomenal card sequence! Handled 12 direct questions on Part 2 of my practice tests.', date: '21 May 2026' },
          { id: 'rev-1-2', user: 'PreMedNicole', stars: 4, comment: 'Clean definitions. Wish there were diagrams, but the high-yield shortcuts are exceptionally good.', date: '01 June 2026' }
        ]
      },
      { 
        id: 'deck-2', 
        title: 'Ateneo ASMPH Chemistry Stoichiometry Guide', 
        creator: 'LoyolaPreMed', 
        upvotes: 98, 
        subject: 'Chemistry', 
        cardCount: 2,
        rating: 4.7,
        ratingsCount: 19,
        description: 'Step-by-step written guide explaining molar conversions, limiting reactant formulas, buffer solution systems, and ideal gas behavior calculations. Includes custom hand-drafted worked examples.',
        isStudyGuide: true,
        createdAt: '2026-05-15T15:30:00Z',
        guideText: `### STOICHIOMETRY & MIXTURE FORMULAS GUIDE
        
#### 1. Molar Mass and Avogadro calculations:
- Moles = Mass (g) / Molar Mass (g/mol)
- 1 Mol gas at STP always occupies 22.4 L

#### 2. Limiting Reactant Checklist:
- Balance the chemical equation first!
- Convert all given reactant quantities to moles.
- Divide each mole count by its stoichiometric coefficient. The lowest resulting ratio is the limiting reactant.

#### 3. Henderson-Hasselbalch Equation for Buffers:
- pH = pKa + log([Conjugate Base] / [Weak Acid])
- Maintain buffer capacity by keeping ratio between 0.1 and 10.`,
        cards: [
          { front: 'What volume does 1 mole of an ideal gas occupy at STP (Standard Temperature and Pressure)?', back: '22.4 Liters' },
          { front: 'Write the formula for the Henderson-Hasselbalch equation used to compute buffer pH.', back: 'pH = pKa + log([Conjugate Base] / [Weak Acid])' }
        ],
        reviews: [
          { id: 'rev-2-1', user: 'AteneoDreamer', stars: 5, comment: 'Extremely clear breakdown of buffer pH. Standardized ASMPH formula fits.', date: '28 May 2026' }
        ]
      },
      { 
        id: 'deck-3', 
        title: 'PLM Physics Kinematics Shortsheet', 
        creator: 'OnaManilaRes', 
        upvotes: 83, 
        subject: 'Physics', 
        cardCount: 2,
        rating: 4.2,
        ratingsCount: 12,
        description: 'Highly effective active recall cards covering kinematics acceleration, velocity vectors, work-energy, power conservation, and torque formulas.',
        isStudyGuide: false,
        createdAt: '2026-04-18T08:15:00Z',
        cards: [
          { front: 'What is the work-energy theorem formula expressing kinetic energy change?', back: 'Work (W) = dKE = KE_final - KE_initial = 1/2 m v_f² - 1/2 m v_i²' },
          { front: 'Define the gravitational force between two massive bodies based on Newton\'s Law.', back: 'F = G * (m1 * m2) / r²' }
        ],
        reviews: [
          { id: 'rev-3-1', user: 'EinsteinPreMed', stars: 4, comment: 'Nice work energy formulas. Helped speed up my quantitative reasoning portion.', date: '05 May 2026' }
        ]
      },
      { 
        id: 'deck-4', 
        title: 'Perceptual Acuity Pattern Drills Vol 1', 
        creator: 'MedlyOfficial', 
        upvotes: 210, 
        subject: 'Perceptual Acuity', 
        cardCount: 2,
        rating: 4.9,
        ratingsCount: 52,
        description: 'Elite spatial drills targeting Keyholes, Pattern Folding, Perceptual Orthographic projections, and Mirror Images. Highly upvoted for CEM paper mirroring.',
        isStudyGuide: true,
        createdAt: '2026-03-25T11:00:00Z',
        guideText: `### PERCEPTUAL ACUITY MENTAL INDEXING TECHNIQUES
        
#### 1. Mirror Image Symmetries
- Draw the vertical or horizontal reference line on your scratchpad mentally.
- Flip the closest points to the line first, then the farthest points. Depth matches symmetrically.

#### 2. Keyholes (Perceptual Projections)
- Identify length vs width vs height projections of the solids.
- Rule out options based on hidden lines or size mismatches. Compare ratios!`,
        cards: [
          { front: 'What is the key trick for resolving 3D orthographic projections in Keyhole drills?', back: 'Check for identical facet depth and exclude options with disproportionate facet width ratio.' },
          { front: 'How does symmetry reflect objects across a horizontal plane?', back: 'Top parts mirror down, bottom parts mirror up; left and right positions remain on their respective sides.' }
        ],
        reviews: [
          { id: 'rev-4-1', user: 'CEM_Survivor', stars: 5, comment: 'Absolutely gold! Best perceptual acuity prep resource in the entire Philippines. Period.', date: '12 May 2026' }
        ]
      }
    ];
  });

  const [votedDecks, setVotedDecks] = useState<{ [id: string]: boolean }>(() => {
    try {
      const stored = localStorage.getItem('medly_voted_decks');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {};
  });

  // Persistent deck synchronization
  useEffect(() => {
    localStorage.setItem('medly_market_decks', JSON.stringify(marketDecks));
  }, [marketDecks]);

  useEffect(() => {
    localStorage.setItem('medly_voted_decks', JSON.stringify(votedDecks));
  }, [votedDecks]);

  // Search, Filter & Sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterType, setFilterType] = useState('All'); // All, Flashcards, Study Guides
  const [sortOption, setSortOption] = useState<'upvotes' | 'rating' | 'cards' | 'newest'>('upvotes');

  // Selected details state
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [selectedDeckTab, setSelectedDeckTab] = useState<'cards' | 'guide'>('cards');
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Review Form state
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewUser, setReviewUser] = useState('');

  // Upload Deck modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCreator, setUploadCreator] = useState('');
  const [uploadSubject, setUploadSubject] = useState('Biology');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadType, setUploadType] = useState<'deck' | 'guide' | 'combo'>('deck');
  const [uploadGuideText, setUploadGuideText] = useState('');
  const [uploadCards, setUploadCards] = useState<Array<{ front: string; back: string }>>([
    { front: '', back: '' },
    { front: '', back: '' }
  ]);

  // Feedback notifications
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleUpvoteDeck = (deckId: string) => {
    const isVoted = votedDecks[deckId];
    setMarketDecks(prev => prev.map(d => {
      if (d.id === deckId) {
        return {
          ...d,
          upvotes: isVoted ? d.upvotes - 1 : d.upvotes + 1
        };
      }
      return d;
    }));
    setVotedDecks(prev => ({ ...prev, [deckId]: !isVoted }));
    showToast(isVoted ? 'Removed upvote.' : 'Successfully registered upvote for this study resource!', 'info');
  };

  // Submit dynamic review and update average rating in state
  const handleSubmitReview = (deckId: string) => {
    if (!reviewComment.trim()) {
      alert('Please enter a constructive review comment.');
      return;
    }

    const reviewerName = reviewUser.trim() || 'Anonymous Future MD';
    const newReview = {
      id: `rev-${Date.now()}`,
      user: reviewerName,
      stars: reviewStars,
      comment: reviewComment,
      date: new Date().toLocaleDateString('en-PH', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    setMarketDecks(prev => prev.map(deck => {
      if (deck.id === deckId) {
        const currentReviews = deck.reviews || [];
        const updatedReviews = [...currentReviews, newReview];
        const newRatingsCount = (deck.ratingsCount || 0) + 1;
        const currentSum = (deck.rating || 0) * (deck.ratingsCount || 0);
        const newRating = parseFloat(((currentSum + reviewStars) / newRatingsCount).toFixed(1));
        return {
          ...deck,
          reviews: updatedReviews,
          ratingsCount: newRatingsCount,
          rating: newRating
        };
      }
      return deck;
    }));

    // Reset review inputs
    setReviewComment('');
    setReviewStars(5);
    showToast('Your rating and review has been published to the community board!');
  };

  // Add card to upload list
  const handleAddCardToUpload = () => {
    setUploadCards(prev => [...prev, { front: '', back: '' }]);
  };

  // Remove card from upload list
  const handleRemoveCardIdx = (idx: number) => {
    if (uploadCards.length <= 1) return;
    setUploadCards(prev => prev.filter((_, i) => i !== idx));
  };

  // Modify uploaded card
  const handleCardFieldChange = (idx: number, field: 'front' | 'back', val: string) => {
    setUploadCards(prev => prev.map((c, i) => {
      if (i === idx) {
        return { ...c, [field]: val };
      }
      return c;
    }));
  };

  // Action: Publish user-generated deck/guide
  const handlePublishResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      alert('Please enter a descriptive title.');
      return;
    }

    const finalCards = uploadCards.filter(c => c.front.trim() && c.back.trim());
    if (uploadType !== 'guide' && finalCards.length === 0) {
      alert('Please create at least 1 valid Front & Back flashcard for this deck.');
      return;
    }

    const creatorName = uploadCreator.trim() || 'You (Future MD)';
    const newDeck: FlashcardDeck = {
      id: `custom-deck-${Date.now()}`,
      title: uploadTitle,
      creator: creatorName,
      upvotes: 1, // Self-upvote
      subject: uploadSubject,
      cardCount: finalCards.length,
      isCustom: true,
      description: uploadDescription || `Comprehensive study resources covering high-yield ${uploadSubject} concepts for the Philippine NMAT examinations.`,
      rating: 5.0,
      ratingsCount: 1,
      createdAt: new Date().toISOString(),
      isStudyGuide: uploadType === 'guide' || uploadType === 'combo',
      guideText: uploadType !== 'deck' ? uploadGuideText : undefined,
      cards: uploadType !== 'guide' ? finalCards : undefined,
      reviews: [
        {
          id: `rev-init-${Date.now()}`,
          user: 'System Bot',
          stars: 5,
          comment: 'Verified custom resource upload. Outstanding organization!',
          date: 'Just now'
        }
      ]
    };

    setMarketDecks(prev => [newDeck, ...prev]);
    setIsUploadModalOpen(false);

    // Reset upload fields
    setUploadTitle('');
    setUploadCreator('');
    setUploadDescription('');
    setUploadGuideText('');
    setUploadCards([{ front: '', back: '' }, { front: '', back: '' }]);
    
    showToast(`"${uploadTitle}" has been successfully published to the public marketplace!`);
  };

  // Action: Install flashcards directly to local active SRS loop
  const handleInstallToLocalStorageSrs = (deck: FlashcardDeck) => {
    if (!deck.cards || deck.cards.length === 0) {
      showToast('This resource only contains study guide materials. No flashcards to install!', 'info');
      return;
    }

    try {
      const stored = localStorage.getItem('medly_srs_concepts');
      const currentList: SrsConcept[] = stored ? JSON.parse(stored) : [];

      // Check for each card and convert it back to active SRS concept!
      let addedCount = 0;
      const newList = [...currentList];

      deck.cards.forEach((card, idx) => {
        // Prevent duplicate concept names if already imported
        const isDuplicate = currentList.some(c => c.conceptName === `${card.front} (${deck.subject})`);
        if (!isDuplicate) {
          const newSrsItem: SrsConcept = {
            id: `imported-${deck.id}-${idx}-${Date.now()}`,
            conceptName: `${card.front} (${deck.subject})`,
            subject: deck.subject as any,
            difficulty: 'Medium',
            lastReviewed: new Date().toISOString(),
            nextReviewDate: new Date().toISOString(), // Overdue immediately so they study it
            repetitions: 0,
            intervalDays: 1,
            failCount: 0
          };
          newList.unshift(newSrsItem);
          addedCount++;
        }
      });

      localStorage.setItem('medly_srs_concepts', JSON.stringify(newList));
      showToast(`Imported ${addedCount} study cards into your local SRS Memory Engine! Go to the "AI Study Engine" tab to practice.`);
    } catch (err) {
      console.warn("Failed to parse and install cards:", err);
      showToast('Failed to install cards. Please try again.', 'info');
    }
  };

  // 3. Kahoot Live Multiplayer Game State
  const [kahootStage, setKahootStage] = useState<'lobby' | 'playing' | 'scoreboard'>('lobby');
  const [kahootActiveQuestion, setKahootActiveQuestion] = useState(0);
  const [kahootScore, setKahootScore] = useState(0);
  const [kahootSelection, setKahootSelection] = useState<number | null>(null);

  // Simulated AI Opponents
  const [opponents, setOpponents] = useState([
    { name: 'DocJeepney', score: 1800 },
    { name: 'MedSchiller', score: 1550 },
    { name: 'KinematicsGod', score: 1200 }
  ]);

  // Game Questions
  const gameQuestions = [
    {
      question: 'Which visual cell layer of the eye is primarily responsible for color distinction in ample lighting?',
      options: ['Rods', 'Cones', 'Bipolar Cells', 'Ganglion Cells'],
      correctIdx: 1,
      points: 1000,
      explanation: 'Cones are highly sensitive to colors and function under high light intensities. Rods handle twilight/black-and-white vision.'
    },
    {
      question: 'Evaluate the physical force exerted on a 2 kg block sliding on a frictionless surface accelerating at 5 m/s²:',
      options: ['2.5 N', '10.0 N', '7.0 N', '0.4 N'],
      correctIdx: 1,
      points: 1000,
      explanation: 'Using F = m * a => Force = 2 kg * 5 m/s² = 10 Newtons. Consistent with Newton\'s Second Law.'
    },
    {
      question: 'Which of the following describes the shape of water molecules due to oxygen\'s lone pairs?',
      options: ['Linear', 'Bent / V-shaped', 'Tetrahedral', 'Trigonal Planar'],
      correctIdx: 1,
      points: 1000,
      explanation: 'Water exhibits an sp3 hybridization, but due to lone-pair lone-pair repulsion, the physical geometry bends down to approximately 104.5 degrees, forming a bent shape.'
    }
  ];

  const handleJoinVoiceRoom = (roomId: string) => {
    setJoinedRoomId(joinedRoomId === roomId ? null : roomId);
    setMicActive(false);
  };

  const handleSendRoomChatMsg = () => {
    if (!newChatInput.trim()) return;
    setRoomChat(prev => [...prev, {
      sender: 'You (Future MD)',
      text: newChatInput,
      role: 'Pre-Med Candidate'
    }]);
    setNewChatInput('');
  };

  // Kahoot mechanics
  const handlePlayKahoot = () => {
    setKahootStage('playing');
    setKahootActiveQuestion(0);
    setKahootScore(0);
    setKahootSelection(null);
  };

  const selectKahootAnswer = (idx: number) => {
    if (kahootSelection !== null) return; // single answer per question
    setKahootSelection(idx);

    const isCorrect = idx === gameQuestions[kahootActiveQuestion].correctIdx;
    
    // Calculate live score
    let pointsAwarded = 0;
    if (isCorrect) {
      pointsAwarded = 800 + Math.floor(Math.random() * 200); // speed factor points
      setKahootScore(prev => prev + pointsAwarded);
    }

    // Simulate AI score improvements
    setOpponents(prev => prev.map(opp => ({
      ...opp,
      score: opp.score + (Math.random() > 0.35 ? 700 + Math.floor(Math.random() * 250) : 0)
    })));

    // Set delay to transition or finish
    setTimeout(() => {
      if (kahootActiveQuestion < gameQuestions.length - 1) {
        setKahootActiveQuestion(prev => prev + 1);
        setKahootSelection(null);
      } else {
        setKahootStage('scoreboard');
      }
    }, 3500);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 rounded-xl max-w-sm">
        <button
          onClick={() => setActiveHubSubTab('rooms')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-center transition-all cursor-pointer ${
            activeHubSubTab === 'rooms' ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100/50' : 'text-slate-550 hover:text-slate-700'
          }`}
        >
          Study Rooms
        </button>
        <button
          onClick={() => setActiveHubSubTab('decks')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-center transition-all cursor-pointer ${
            activeHubSubTab === 'decks' ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100/50' : 'text-slate-550 hover:text-slate-700'
          }`}
        >
          Marketplace
        </button>
        <button
          onClick={() => setActiveHubSubTab('kahoot')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-center transition-all cursor-pointer ${
            activeHubSubTab === 'kahoot' ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100/50' : 'text-slate-550 hover:text-slate-700'
          }`}
        >
          Live Quiz
        </button>
      </div>

      {/* SUB-TAB 1: Drop-In Study Voice Rooms */}
      {activeHubSubTab === 'rooms' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-800 font-sans flex items-center space-x-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Peer-to-Peer Study Hubs</span>
              </h2>
              <p className="text-xs text-slate-400">Join continuous drop-in audio/chat rooms. Share mnemonics with UPCM, ASMPH, and SLMC takers live.</p>
            </div>

            <div className="space-y-3">
              {studyRooms.map((room) => {
                const isActiveJoined = joinedRoomId === room.id;
                return (
                  <div 
                    key={room.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isActiveJoined 
                        ? 'bg-emerald-50/50 border-emerald-400 text-emerald-950 shadow-sm shadow-emerald-50' 
                        : 'bg-white border-slate-100 hover:border-slate-205'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm">{room.name}</h3>
                        <p className="text-[11px] text-slate-500 mt-1 max-w-xl leading-relaxed">{room.description}</p>
                      </div>
                      <button
                        onClick={() => handleJoinVoiceRoom(room.id)}
                        className={`px-3 py-1.5 rounded-lg font-extrabold text-xs cursor-pointer transition-all ${
                          isActiveJoined 
                            ? 'bg-amber-600 text-white hover:bg-amber-700' 
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isActiveJoined ? 'Leave Voice' : 'Join Voice Channel'}
                      </button>
                    </div>

                    {/* Member Avatars list */}
                    <div className="mt-4 pt-3 border-t border-slate-50/60 flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">ON AIR ({room.members.length}):</span>
                      {room.members.map((member, mIdx) => (
                        <div 
                          key={mIdx} 
                          className={`flex items-center space-x-1 px-2 py-0.5 rounded-full border text-[10px] font-bold ${
                            member.isSpeaking ? 'bg-green-50 border-green-300 text-green-800 animate-pulse' : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${member.isSpeaking ? 'bg-green-500' : 'bg-slate-350'}`} />
                          <span>{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Voice Connection Drawer */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-between">
            {joinedRoomId ? (
              (() => {
                const activeRoom = studyRooms.find(r => r.id === joinedRoomId);
                return (
                  <div className="space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="text-center space-y-1">
                        <span className="px-3 py-0.5 bg-green-50 text-green-800 border border-green-250 font-bold rounded-full text-[10px] animate-pulse">
                          ● Connected to Audio Channel
                        </span>
                        <h4 className="font-extrabold text-slate-800 text-sm mt-1">{activeRoom?.name}</h4>
                        <span className="text-[10px] text-slate-400 block pr-1">{activeRoom?.members.length} peers connected</span>
                      </div>

                      {/* Equalizer animation */}
                      <div className="h-16 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center space-x-1.5 px-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div 
                            key={i} 
                            style={{ animationDelay: `${i * 125}ms`, height: micActive ? `${20 + Math.random() * 40}%` : '15%' }}
                            className={`w-1 rounded-full transition-all duration-150 ${
                              micActive ? 'bg-emerald-500 animate-bounce' : 'bg-slate-300'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Mic Control toggle */}
                      <div className="flex justify-center space-x-3 pt-1">
                        <button
                          onClick={() => setMicActive(!micActive)}
                          className={`p-3 rounded-full border cursor-pointer transition-all ${
                            micActive ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' : 'bg-slate-100 border-slate-200 text-slate-650 hover:bg-slate-200'
                          }`}
                        >
                          {micActive ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <span className="text-xs font-bold self-center text-slate-600">
                          {micActive ? 'Mic Active — Streaming audio' : 'Microphone Muted'}
                        </span>
                      </div>

                      {/* Feed discussion */}
                      <div className="border-t border-slate-100 pt-4 space-y-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Lobby Live Chat</span>
                        <div className="h-36 overflow-y-auto space-y-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          {roomChat.map((chat, cIdx) => (
                            <div key={cIdx} className="text-[11px] leading-relaxed">
                              <strong className="text-slate-800 block opacity-90">{chat.sender} <span className="text-[9px] text-emerald-600">({chat.role})</span>:</strong>
                              <span className="text-slate-600">{chat.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Chat inputs */}
                    <div className="flex space-x-1.5 pt-3 border-t border-slate-100">
                      <input
                        value={newChatInput}
                        onChange={(e) => setNewChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendRoomChatMsg()}
                        placeholder="Write study point..."
                        className="flex-1 p-2 rounded-xl text-xs border border-slate-200 focus:ring-2 focus:ring-emerald-500 bg-white outline-none"
                      />
                      <button
                        onClick={handleSendRoomChatMsg}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )
              })()
            ) : (
              <div className="py-12 text-center text-slate-405 space-y-3 flex-1 flex flex-col justify-center">
                <Users className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800 text-xs">Offline Audio Standby</h4>
                <p className="text-[11px] text-slate-450 max-w-xs mx-auto">Click <strong className="text-emerald-700">"Join Voice Channel"</strong> to connect with an active audio stream and start group study questions!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 p-4 rounded-xl shadow-xl bg-slate-900 border border-slate-900 text-white animate-bounce flex items-center space-x-2 text-xs">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* SUB-TAB 2: Community Flashcard Decks & Study Guide Marketplace */}
      {activeHubSubTab === 'decks' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-800 font-sans flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
                <span>NMAT Community Mnemonic & Study Guide Marketplace</span>
              </h2>
              <p className="text-xs text-slate-400">
                Discover, rate, and study high-yield community loops uploaded by top Philippine medical students. Install decks directly to your local SRS memory engine.
              </p>
            </div>
            
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-750 text-white font-extrabold text-xs inline-flex items-center space-x-2 cursor-pointer shadow-md shadow-indigo-100 transition-all scale-100 hover:scale-102"
              id="upload-resource-btn"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Share Your Deck/Guide</span>
            </button>
          </div>

          {/* Filters, Search & Sort Toolbar */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, topic, creator..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 text-xs"
              />
            </div>

            {/* Subject Filter */}
            <div className="relative flex items-center space-x-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full bg-white border border-slate-200/80 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 text-xs cursor-pointer"
              >
                <option value="All">All Subjects</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
                <option value="Perceptual Acuity">Perceptual Acuity</option>
                <option value="Gross Anatomy">Gross Anatomy</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Physiology">Physiology</option>
              </select>
            </div>

            {/* Resource Type Filter */}
            <div className="relative flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-white border border-slate-200/80 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 text-xs cursor-pointer"
              >
                <option value="All">All Formats</option>
                <option value="Flashcards">Flashcard Decks Only</option>
                <option value="Guides">Written Study Guides</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center space-x-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="w-full bg-white border border-slate-200/80 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 text-xs cursor-pointer"
              >
                <option value="upvotes">Sort by Top Upvotes (Most Popular)</option>
                <option value="rating">Sort by Average rating (Highest Quality)</option>
                <option value="cards">Sort by Cards size (Highest Volume)</option>
                <option value="newest">Sort by Most Recent (Newest uploads)</option>
              </select>
            </div>
          </div>

          {/* Grid Layout of Community Decks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketDecks.filter(deck => {
              const matchesSearch = deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    deck.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    deck.creator.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesSubject = filterSubject === 'All' || deck.subject === filterSubject;
              const matchesType = filterType === 'All' ||
                                  (filterType === 'Flashcards' && !deck.isStudyGuide) ||
                                  (filterType === 'Guides' && deck.isStudyGuide);
              return matchesSearch && matchesSubject && matchesType;
            }).sort((a, b) => {
              if (sortOption === 'upvotes') return b.upvotes - a.upvotes;
              if (sortOption === 'rating') return (b.rating || 0) - (a.rating || 0);
              if (sortOption === 'cards') return (b.cardCount || 0) - (a.cardCount || 0);
              if (sortOption === 'newest') {
                const dA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dB - dA;
              }
              return 0;
            }).map((deck) => {
              const isAlreadyVoted = votedDecks[deck.id];
              return (
                <div key={deck.id} className="p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-350 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Upper Category Badges */}
                    <div className="flex justify-between items-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        deck.subject === 'Biology' ? 'bg-emerald-50 text-emerald-700' :
                        deck.subject === 'Chemistry' ? 'bg-blue-50 text-blue-700' :
                        deck.subject === 'Physics' ? 'bg-purple-50 text-purple-705' : 
                        deck.subject === 'Perceptual Acuity' ? 'bg-amber-50 text-amber-705' : 'bg-slate-50 text-slate-700'
                      }`}>
                        {deck.subject}
                      </span>
                      <span className="text-[10px] text-slate-405 font-bold flex items-center space-x-1">
                        {deck.isStudyGuide ? (
                          <span className="flex items-center text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded text-[9px] font-bold">
                            📝 Study Guide
                          </span>
                        ) : (
                          <span className="flex items-center text-teal-700 bg-teal-50 border border-teal-100 px-1.5 py-0.5 rounded text-[9px] font-bold">
                            📇 Flashcards ({deck.cardCount} cards)
                          </span>
                        )}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm mt-2 leading-snug">{deck.title}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{deck.description}</p>
                    
                    {/* Star Rating Display */}
                    <div className="flex items-center space-x-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                      <div className="flex items-center text-amber-450">
                        {Array.from({ length: 5 }).map((_, sIdx) => (
                          <Star 
                            key={sIdx} 
                            className={`w-3 h-3 ${sIdx < Math.round(deck.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-extrabold text-slate-700 text-[11px]">{deck.rating || '5.0'}</span>
                      <span className="text-slate-400 text-[10px]">({deck.ratingsCount || 1} peer ratings)</span>
                    </div>

                    <span className="text-[10px] text-slate-405 block">Uploaded by: <strong className="text-slate-600">@{deck.creator}</strong></span>
                  </div>

                  {/* Actions Area */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center gap-2">
                    <button
                      onClick={() => handleUpvoteDeck(deck.id)}
                      className={`px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl border text-[11px] font-bold flex items-center space-x-1 cursor-pointer transition-all ${
                        isAlreadyVoted ? 'bg-emerald-50 border-emerald-350 text-emerald-800' : 'text-slate-650'
                      }`}
                    >
                      <ArrowUp className={`w-3.5 h-3.5 ${isAlreadyVoted ? 'text-emerald-600 fill-emerald-600' : 'text-slate-400'}`} />
                      <span>{deck.upvotes}</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedDeckId(deck.id);
                        setActiveCardIdx(0);
                        setIsCardFlipped(false);
                        setSelectedDeckTab('cards');
                        setReviewStars(5);
                        setReviewComment('');
                      }}
                      className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-850 font-black rounded-xl text-xs flex items-center space-x-1 cursor-pointer transition-all border border-indigo-150"
                    >
                      <span>Explore Deck →</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* VIEW DECK / REVIEW DECK INTERACTIVE MODAL */}
          {selectedDeckId && (() => {
            const activeDeck = marketDecks.find(d => d.id === selectedDeckId);
            if (!activeDeck) return null;
            return (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-3xl w-full max-w-3xl shadow-xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col justify-between animate-scale-up">
                  {/* Modal Header */}
                  <div className="p-6 border-b border-slate-150 bg-slate-50/70 flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          activeDeck.subject === 'Biology' ? 'bg-emerald-50 text-emerald-700' :
                          activeDeck.subject === 'Chemistry' ? 'bg-blue-50 text-blue-700' :
                          activeDeck.subject === 'Physics' ? 'bg-purple-50 text-purple-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {activeDeck.subject}
                        </span>
                        <span className="text-[10px] text-slate-450">Created by @{activeDeck.creator}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-slate-800 mt-2 font-display">{activeDeck.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{activeDeck.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedDeckId(null)}
                      className="p-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-bold leading-none cursor-pointer"
                    >
                      ✕ Close
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 overflow-y-auto space-y-6 flex-1 max-h-[50vh]">
                    {/* Format Toggle bar (if contains both cards & guide sheets) */}
                    <div className="flex border-b border-slate-100 pb-2">
                      {activeDeck.cards && activeDeck.cards.length > 0 && (
                        <button
                          onClick={() => setSelectedDeckTab('cards')}
                          className={`pb-2 px-4 font-bold text-xs cursor-pointer border-b-2 transition-all flex items-center space-x-1.5 ${
                            selectedDeckTab === 'cards' 
                              ? 'border-indigo-650 text-indigo-900 font-extrabold' 
                              : 'border-transparent text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                          <span>Interactive Flashcards ({activeDeck.cards.length})</span>
                        </button>
                      )}
                      {activeDeck.isStudyGuide && (
                        <button
                          onClick={() => setSelectedDeckTab('guide')}
                          className={`pb-2 px-4 font-bold text-xs cursor-pointer border-b-2 transition-all flex items-center space-x-1.5 ${
                            selectedDeckTab === 'guide' || !activeDeck.cards
                              ? 'border-indigo-650 text-indigo-900 font-extrabold' 
                              : 'border-transparent text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Written Study Guide Sheets</span>
                        </button>
                      )}
                    </div>

                    {/* View Card Component Flip Engine */}
                    {(selectedDeckTab === 'cards' && activeDeck.cards && activeDeck.cards.length > 0) ? (
                      <div className="space-y-4">
                        <div className="max-w-md mx-auto">
                          {/* Flashcard Component view */}
                          <div
                            onClick={() => setIsCardFlipped(!isCardFlipped)}
                            className={`min-h-[180px] bg-slate-50 border-2 rounded-2xl p-6 flex flex-col justify-between text-center items-center cursor-pointer select-none transition-all duration-300 relative ${
                              isCardFlipped 
                                ? 'border-indigo-400 bg-indigo-50/30' 
                                : 'border-slate-205 hover:border-slate-350 bg-white'
                            }`}
                          >
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest absolute top-3 left-4">
                              {isCardFlipped ? 'RECALL ANSWER (BACK)' : 'CONCEPT QUESTION (FRONT)'}
                            </span>
                            
                            <div className="my-auto pt-4">
                              <p className={`text-sm sm:text-base font-extrabold leading-relaxed ${isCardFlipped ? 'text-indigo-950 font-black font-display' : 'text-slate-800'}`}>
                                {isCardFlipped ? activeDeck.cards[activeCardIdx].back : activeDeck.cards[activeCardIdx].front}
                              </p>
                            </div>

                            <span className="text-[10px] text-indigo-600 font-bold bg-indigo-100/60 px-2 py-0.5 rounded-full animate-pulse">
                              {isCardFlipped ? 'Click to show question' : 'Click to flip and reveal answer'}
                            </span>
                          </div>

                          {/* Cards Pagination controls */}
                          <div className="flex justify-between items-center mt-3 px-1.5">
                            <button
                              disabled={activeCardIdx === 0}
                              onClick={() => {
                                setActiveCardIdx(p => p - 1);
                                setIsCardFlipped(false);
                              }}
                              className="px-3 py-1.5 bg-slate-100 border text-slate-650 font-bold rounded-lg text-xs cursor-pointer disabled:opacity-40"
                            >
                              ← Previous
                            </button>
                            <span className="text-xs font-semibold text-slate-405">
                              Card {activeCardIdx + 1} of {activeDeck.cards.length}
                            </span>
                            <button
                              disabled={activeCardIdx === activeDeck.cards.length - 1}
                              onClick={() => {
                                setActiveCardIdx(p => p + 1);
                                setIsCardFlipped(false);
                              }}
                              className="px-3 py-1.5 bg-slate-100 border text-slate-650 font-bold rounded-lg text-xs cursor-pointer disabled:opacity-40"
                            >
                              Next →
                            </button>
                          </div>
                        </div>

                        {/* Import cards triggers */}
                        <div className="pt-2 text-center">
                          <button
                            onClick={() => handleInstallToLocalStorageSrs(activeDeck)}
                            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-950 hover:bg-slate-850 text-white font-extrabold text-xs inline-flex items-center space-x-2 cursor-pointer shadow-md"
                          >
                            <Download className="w-4 h-4 text-white" />
                            <span>Install Cards into your Local SRS Scheduler</span>
                          </button>
                          <p className="text-[10px] text-slate-400 mt-1 max-w-sm mx-auto">
                            Instantly sync card answers directly into your personal dashboard study repetitions list!
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Written Study Guide Viewer */
                      <div className="space-y-4">
                        <div className="bg-slate-50 border rounded-2xl p-6 font-sans text-slate-700 leading-relaxed text-xs overflow-y-auto max-h-[300px] whitespace-pre-line border-slate-205">
                          <div className="prose prose-sm max-w-none">
                            {activeDeck.guideText || `No long-form text guide added. Please read the description and flashcards below for study references.`}
                          </div>
                        </div>
                        <div className="text-center pt-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(activeDeck.guideText || '');
                              showToast('Study guide text copied to clipboard!');
                            }}
                            className="px-4 py-2 bg-indigo-50 text-indigo-750 font-bold border border-indigo-200 hover:bg-indigo-100 rounded-xl cursor-pointer"
                          >
                            📋 Copy Study Guide text to Clipboard
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Community Peer Reviews and Rating Section */}
                    <div className="border-t border-slate-150 pt-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4 text-indigo-500" />
                          <span>Peer Quality Reviews & Feedback Ratings</span>
                        </h4>
                        <span className="text-[11px] text-slate-450">Average Rating: <strong className="text-slate-800">{activeDeck.rating || '5.0'} / 5</strong> stars</span>
                      </div>

                      {/* Display reviews board */}
                      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-150 max-h-[180px] overflow-y-auto">
                        {activeDeck.reviews && activeDeck.reviews.length > 0 ? (
                          activeDeck.reviews.map((rev) => (
                            <div key={rev.id} className="p-3 bg-white border border-slate-100 rounded-xl space-y-1.5">
                              <div className="flex justify-between items-center text-[10px]">
                                <div className="flex items-center space-x-1.5">
                                  <strong className="text-slate-700">@{rev.user}</strong>
                                  <span className="text-slate-350">•</span>
                                  <span className="text-slate-400">{rev.date}</span>
                                </div>
                                
                                {/* Amber Stars rating */}
                                <div className="flex items-center text-amber-400">
                                  {Array.from({ length: 5 }).map((_, rIdx) => (
                                    <Star 
                                      key={rIdx} 
                                      className={`w-2.5 h-2.5 ${rIdx < rev.stars ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-slate-650 font-medium leading-relaxed">{rev.comment}</p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-slate-405">
                            No peer reviews left. Be the first to rate and comment!
                          </div>
                        )}
                      </div>

                      {/* Submit review sub form */}
                      <div className="bg-white p-4 rounded-2xl border border-indigo-150 space-y-3">
                        <span className="font-extrabold text-[11px] text-indigo-950 block uppercase">Review & Rate this Study Deck</span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-450 block mb-1">Click to Rate (1-5 Stars)</label>
                            <div className="flex items-center space-x-1.5 pt-1.5">
                              {Array.from({ length: 5 }).map((_, sIdx) => {
                                const starVal = sIdx + 1;
                                return (
                                  <button
                                    key={sIdx}
                                    type="button"
                                    onClick={() => setReviewStars(starVal)}
                                    className="p-1 rounded bg-slate-50 border hover:bg-slate-100 transition-all cursor-pointer"
                                  >
                                    <Star 
                                      className={`w-5 h-5 ${starVal <= reviewStars ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                                    />
                                  </button>
                                );
                              })}
                              <span className="text-xs font-black text-slate-700 pl-2">{reviewStars} out of 5</span>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-450 block mb-1">Your Name / Username</label>
                            <input
                              type="text"
                              value={reviewUser}
                              onChange={(e) => setReviewUser(e.target.value)}
                              placeholder="e.g. DreamMedStudent_PH"
                              className="w-full p-2 border border-slate-200 rounded-xl outline-none text-xs focus:ring-1 focus:ring-indigo-500 bg-slate-55/30"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-slate-450 block mb-1">Feedback Comment</label>
                          <textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="Help other premed students! Is this deck accurate, comprehensive, and high-yield? Share useful study shortcuts..."
                            rows={2}
                            className="w-full p-2 border border-slate-200 rounded-xl outline-none text-xs focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleSubmitReview(activeDeck.id)}
                            className="px-4 py-2 bg-indigo-650 hover:bg-indigo-750 text-white font-black rounded-xl text-xs cursor-pointer shadow-sm transition-all"
                          >
                            Publish Peer Score
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 border-t border-slate-150 bg-slate-50/50 flex justify-end">
                    <button
                      onClick={() => setSelectedDeckId(null)}
                      className="px-5 py-2 bg-slate-800 hover:bg-slate-900 border text-white font-extrabold text-xs rounded-xl cursor-pointer"
                    >
                      Clear overlay
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* UPLOAD / CREATE RESOURCE MODAL FORM */}
          {isUploadModalOpen && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
              <form 
                onSubmit={handlePublishResource}
                className="bg-white rounded-3xl w-full max-w-2xl shadow-xl border border-slate-205 overflow-hidden max-h-[90vh] flex flex-col justify-between animate-scale-up"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-150 bg-indigo-50/50 flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-indigo-950 font-display">
                      Share High-Yield Flashcard Deck or Written Study Guide
                    </h3>
                    <p className="text-xs text-indigo-850 mt-1">
                      Contribute to the Philippine NMAT marketplace community! Help your future med school classmate master dense syllabus subjects.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="p-1 px-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded-lg text-xs font-bold leading-none cursor-pointer"
                  >
                    ✕ Cancel
                  </button>
                </div>

                {/* Form fields scrollable */}
                <div className="p-6 overflow-y-auto space-y-5 flex-1 max-h-[55vh] text-xs">
                  {/* Basic settings Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Resource Title *</label>
                      <input
                        type="text"
                        required
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                        placeholder="e.g. ASMPH Cardiovascular Physiology active recall"
                        className="w-full p-2.5 border border-slate-205 rounded-xl outline-none text-xs focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Contributor Alias / Creator</label>
                      <input
                        type="text"
                        value={uploadCreator}
                        onChange={(e) => setUploadCreator(e.target.value)}
                        placeholder="e.g. UPCM_Hopeful (Leave blank for 'You')"
                        className="w-full p-2.5 border border-slate-205 rounded-xl outline-none text-xs focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Target NMAT/Med Subject *</label>
                      <select
                        value={uploadSubject}
                        onChange={(e) => setUploadSubject(e.target.value)}
                        className="w-full p-2.5 border border-slate-205 rounded-xl bg-white outline-none text-xs focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        <option value="Biology">Biology</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Physics">Physics</option>
                        <option value="Perceptual Acuity">Perceptual Acuity</option>
                        <option value="Gross Anatomy">Gross Anatomy</option>
                        <option value="Biochemistry">Biochemistry</option>
                        <option value="Physiology">Physiology</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Contribution Format *</label>
                      <select
                        value={uploadType}
                        onChange={(e) => setUploadType(e.target.value as any)}
                        className="w-full p-2.5 border border-slate-205 rounded-xl bg-white outline-none text-xs focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        <option value="deck">📇 Flashcards Deck only</option>
                        <option value="guide">📝 Long-form Study Guide document</option>
                        <option value="combo">💼 Combo (Flashcards + Guide Text)</option>
                      </select>
                    </div>
                  </div>

                  {/* Description area */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Brief Description / Study Focus *</label>
                    <textarea
                      required
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                      placeholder="e.g. An excellent set of cards summarizing high-yield respiratory and blood flow formulas, alveolar gas calculations, and metabolic pathways..."
                      rows={2}
                      className="w-full p-2.5 border border-slate-205 rounded-xl outline-none text-xs focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Study Guide text area (if guide or combo is selected) */}
                  {(uploadType === 'guide' || uploadType === 'combo') && (
                    <div className="space-y-1.5 p-3.5 bg-slate-50 border rounded-2xl border-slate-200">
                      <label className="text-[10px] uppercase font-bold text-indigo-950 block">Written Study Guide Material</label>
                      <p className="text-[10px] text-slate-405">Enter formulas, mnemonics, structured guidelines or outlines. This stays scrollable for peer reading!</p>
                      <textarea
                        required
                        value={uploadGuideText}
                        onChange={(e) => setUploadGuideText(e.target.value)}
                        placeholder="Write dynamic outlines:&#10;1. Mnemonics description...&#10;2. High-Yield formulas...&#10;3. Critical test traps to avoid..."
                        rows={6}
                        className="w-full p-2.5 border border-slate-205 rounded-xl bg-white outline-none text-xs focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  )}

                  {/* Flashcards creator grid (if deck or combo is selected) */}
                  {(uploadType === 'deck' || uploadType === 'combo') && (
                    <div className="space-y-4 p-4 bg-slate-55/40 border border-slate-200 rounded-2xl">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] uppercase font-bold text-indigo-950 block">
                          Assemble Flashcard Deck items (At least 1 required)
                        </label>
                        <button
                          type="button"
                          onClick={handleAddCardToUpload}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 border text-indigo-900 border-indigo-200 rounded-lg text-[10px] font-black cursor-pointer flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Index Card</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {uploadCards.map((card, idx) => (
                          <div key={idx} className="flex gap-2 items-center bg-white p-2.5 rounded-xl border border-slate-150">
                            <span className="w-5 h-5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 flex items-center justify-center flex-shrink-0">
                              #{idx + 1}
                            </span>
                            <input
                              type="text"
                              required={idx === 0}
                              value={card.front}
                              onChange={(e) => handleCardFieldChange(idx, 'front', e.target.value)}
                              placeholder="Front (e.g. What is sp3 hybridization?)"
                              className="flex-1 p-2 border border-slate-200 rounded-lg outline-none text-[11px] focus:ring-1 focus:ring-indigo-500"
                            />
                            <input
                              type="text"
                              required={idx === 0}
                              value={card.back}
                              onChange={(e) => handleCardFieldChange(idx, 'back', e.target.value)}
                              placeholder="Back (Answer or Mnemonic)"
                              className="flex-1 p-2 border border-slate-200 rounded-lg outline-none text-[11px] focus:ring-1 focus:ring-indigo-500"
                            />
                            <button
                              type="button"
                              disabled={uploadCards.length <= 1}
                              onClick={() => handleRemoveCardIdx(idx)}
                              className="p-1 px-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer disabled:opacity-40"
                              title="Delete card"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Form actions */}
                <div className="p-6 border-t border-slate-150 bg-slate-50/70 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-5 py-2.5 bg-white border border-slate-205 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-650 hover:bg-indigo-750 text-white font-extrabold rounded-xl text-xs cursor-pointer shadow-md"
                  >
                    Publish to Public Marketplace
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: Kahoot Live Multiplayer */}
      {activeHubSubTab === 'kahoot' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
          {kahootStage === 'lobby' && (
            <div className="text-center max-w-xl mx-auto py-8 space-y-5">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <Users className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-slate-800 text-base sm:text-lg">Live Multiplayer NMAT Showdown</h3>
                <p className="text-xs text-slate-450">Compete in real-time with other pre-meds waiting in our lobby! Test under clock ticking pressure to boost mental indexing.</p>
              </div>

              {/* Lobby competitors preview */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-left">
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Wait block lobby list:</span>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">🧑‍⚕️ @DocJeepney (UERM hope)</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Ready</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">👩‍⚕️ @MedSchiller (PLM bound)</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Ready</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">🧑‍⚕️ @AnatomyFighter (ASMPH bound)</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Ready</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handlePlayKahoot}
                  className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center space-x-2 cursor-pointer shadow-md"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Enter multiplayer lobby</span>
                </button>
              </div>
            </div>
          )}

          {kahootStage === 'playing' && (
            <div className="space-y-6">
              {/* Progress bar and statistics */}
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-805 font-bold rounded">
                    Score: {kahootScore} pts
                  </span>
                </div>
                <span className="font-extrabold text-slate-700">Question {kahootActiveQuestion + 1} of {gameQuestions.length}</span>
                <div className="flex items-center space-x-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Rapid clock: 10s left</span>
                </div>
              </div>

              {/* Central question description */}
              <div className="p-6 bg-slate-900 text-slate-105 border border-slate-950 rounded-2xl text-center space-y-2">
                <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-black block">MULTIPLE CHOICE SHOWDOWN</span>
                <p className="text-base sm:text-lg font-black max-w-xl mx-auto text-slate-150 leading-relaxed">
                  {gameQuestions[kahootActiveQuestion].question}
                </p>
              </div>

              {/* Answers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
                {gameQuestions[kahootActiveQuestion].options.map((option, idx) => {
                  const isCorrect = idx === gameQuestions[kahootActiveQuestion].correctIdx;
                  const isSelected = kahootSelection === idx;
                  let colorClass = 'bg-slate-50 border-slate-150 text-slate-700 hover:bg-slate-100';
                  
                  if (kahootSelection !== null) {
                    if (isCorrect) colorClass = 'bg-green-100 border-green-405 text-green-950 font-bold';
                    else if (isSelected) colorClass = 'bg-red-100 border-red-405 text-red-950 font-bold';
                    else colorClass = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={kahootSelection !== null}
                      onClick={() => selectKahootAnswer(idx)}
                      className={`p-4 rounded-xl border-2 text-left text-xs transition-all cursor-pointer ${colorClass}`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="w-5 h-5 rounded-full bg-white/60 font-black border text-[10px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span>{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {kahootSelection !== null && (
                <div className="bg-indigo-50 border border-indigo-150 p-4 rounded-xl animate-fade-in-up">
                  <div className="flex items-start space-x-2 text-xs">
                    <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-indigo-950 text-xs block font-extrabold uppercase">MULTIPLE CHOICE BREAKDOWN</strong>
                      <p className="text-indigo-900 mt-1 leading-relaxed">{gameQuestions[kahootActiveQuestion].explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {kahootStage === 'scoreboard' && (
            <div className="text-center max-w-md mx-auto space-y-6 py-6 font-sans">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Award className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-extrabold text-slate-800 text-lg">Final Match Scoreboard</h3>
                <p className="text-xs text-slate-400">Awesome job! Here is how your speed score stacked up against other takers:</p>
              </div>

              {/* Ranks list */}
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left">
                <div className="flex justify-between items-center text-xs p-2 bg-yellow-100/50 border border-yellow-250 rounded-xl">
                  <span className="font-bold">⭐ You (Future MD)</span>
                  <span className="font-black text-slate-800">{kahootScore} pts</span>
                </div>
                {opponents.concat([{ name: 'You (Future MD)', score: kahootScore }])
                  .sort((a,b) => b.score - a.score)
                  .map((opp, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2 border-b border-slate-100/60 font-semibold text-slate-650">
                      <span>Rank #{idx + 1}: {opp.name}</span>
                      <span>{opp.score} pts</span>
                    </div>
                  ))
                }
              </div>

              <div>
                <button
                  onClick={() => setKahootStage('lobby')}
                  className="px-5 py-2.5 rounded-xl bg-slate-150 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex cursor-pointer transition-all"
                >
                  Return to Lobby Entrance
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
