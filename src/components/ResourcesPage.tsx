import React, { useState, useEffect } from 'react';
import { 
  FolderOpen, 
  Search, 
  Download, 
  ExternalLink, 
  FileText, 
  BookOpen, 
  Award, 
  Layers, 
  ChevronRight, 
  Info,
  Calendar,
  Sparkles,
  ClipboardList,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Shield,
  Edit2,
  Trash2
} from 'lucide-react';

interface ResourcesPageProps {
  currentUserEmail?: string;
}

interface ResourceFile {
  id: string;
  title: string;
  category: 'drills' | 'notes' | 'mock-exams' | 'others';
  categoryLabel: string;
  size: string;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'zip';
  description: string;
  pagesOrItems: string;
  keyConcepts: string[];
  outline: string[];
  driveUrl: string;
}

interface SheetItem {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  type: 'video' | 'link' | 'note' | 'faq';
  linkUrl?: string;
  description: string;
}

const nmatSheetItems: SheetItem[] = [
  // Main Notes
  { id: 'sh-1', name: 'Learnfast - Main', category: 'Task Drive', subCategory: 'Main Notes', type: 'note', description: 'Comprehensive review lessons spanning mental and physical sciences.' },
  { id: 'sh-2', name: 'UPlink', category: 'Task Drive', subCategory: 'Main Notes', type: 'note', description: 'Detailed high-yield pre-medical summary lecture trans notes.' },
  // Supplemental
  { id: 'sh-3', name: 'UP PMHS', category: 'Task Drive', subCategory: 'Supplemental', type: 'note', description: 'Pre-Medical Honor Society curated handouts and question sets.' },
  { id: 'sh-4', name: 'M. Lao Notes', category: 'Task Drive', subCategory: 'Supplemental', type: 'note', description: 'Handwritten organic chemistry mechanisms and biology comparison tables.' },
  // Other Reference
  { id: 'sh-5', name: 'Brains Review', category: 'Task Drive', subCategory: 'Other Reference', type: 'note', description: 'In-depth diagnostics workbook and high-percentile secret tactics.' },
  { id: 'sh-6', name: 'Bwitz', category: 'Task Drive', subCategory: 'Other Reference', type: 'note', description: 'Rapid-fire visual drills on perceptual acuity and shape groupings.' },
  { id: 'sh-7', name: 'MSA Module', category: 'Task Drive', subCategory: 'Other Reference', type: 'note', description: 'Math equations, verbal vocabulary roots, and speed quantitative worksheets.' },
  { id: 'sh-8', name: 'NMAT Compre Reviewer', category: 'Task Drive', subCategory: 'Other Reference', type: 'note', description: 'All-in-one multi-year consolidated questions database.' },
  { id: 'sh-9', name: 'UERM Ex Orbe Medicvs', category: 'Task Drive', subCategory: 'Other Reference', type: 'note', description: 'High-yield biology and physics concept-mapping outlines.' },
  // Strategies
  { id: 'sh-10', name: 'UPlink NMAT Tips_1', category: 'Task Drive', subCategory: 'Strategies (Must Read)', type: 'link', description: 'Part 1 time-saving strategies: skipping hard puzzles and scanning techniques.' },
  { id: 'sh-11', name: 'UPlink NMAT Tips_2', category: 'Task Drive', subCategory: 'Strategies (Must Read)', type: 'link', description: 'Part 2 review guidelines: physical chemistry reactions cheat sheet.' },
  // Reminders / FAQs
  { id: 'sh-12', name: 'CEM NMAT COAG', category: 'Reminders & FAQs', subCategory: 'Official FAQs', type: 'faq', description: 'CEM Code of Academic Guidelines and testing rules.' },
  { id: 'sh-13', name: 'CEM NMAT BOI', category: 'Reminders & FAQs', subCategory: 'Official FAQs', type: 'faq', description: 'CEM Bulletin of Information on registration, fees, and requirements.' },
  // YT Channels
  { id: 'sh-14', name: 'Professor Dave Explains', category: 'Other Resources', subCategory: 'YouTube Channels', type: 'video', linkUrl: 'https://www.youtube.com/@ProfessorDaveExplains', description: 'Excellent tutorial videos on general chemistry and basic physics.' },
  { id: 'sh-15', name: 'The Organic Chemistry Tutor', category: 'Other Resources', subCategory: 'YouTube Channels', type: 'video', linkUrl: 'https://www.youtube.com/@TheOrganicChemistryTutor', description: 'Step-by-step mathematical stoichiometry, algebra, and thermodynamics.' },
  { id: 'sh-16', name: 'Bozeman Science', category: 'Other Resources', subCategory: 'YouTube Channels', type: 'video', linkUrl: 'https://www.youtube.com/@bozemanscience', description: 'Comprehensive cellular processes, anatomy, and heredity charts.' },
  { id: 'sh-17', name: 'Khan Academy', category: 'Other Resources', subCategory: 'YouTube Channels', type: 'video', linkUrl: 'https://www.youtube.com/@khanacademy', description: 'Interactive learning videos covering human psychology and sociology.' },
  { id: 'sh-18', name: 'Amoeba Sisters', category: 'Other Resources', subCategory: 'YouTube Channels', type: 'video', linkUrl: 'https://www.youtube.com/@AmoebaSisters', description: 'Highly-visual cartoon illustrations on genetics, mitosis, and DNA.' },
  { id: 'sh-19', name: 'Crash Course', category: 'Other Resources', subCategory: 'YouTube Channels', type: 'video', linkUrl: 'https://www.youtube.com/@crashcourse', description: 'Rapid organic pathways, sociology frameworks, and physics forces.' },
  // Links
  { id: 'sh-20', name: "FilipiKnow's Complete NMAT Reviewer 2024", category: 'Other Resources', subCategory: 'High-Yield Links', type: 'link', linkUrl: 'https://filipiknow.net/nmat-reviewer/', description: 'Free Phil-premed NMAT reviewer with simulated printable modules.' },
  { id: 'sh-21', name: "Alvero's NMAT Study Guide", category: 'Other Resources', subCategory: 'High-Yield Links', type: 'link', description: 'Elite student scoring guide detailing ASMPH/UPCM exact centile metrics.' },
  { id: 'sh-22', name: "The Ultimate Guide to NMAT: Registration, Requirements, and Coverage", category: 'Other Resources', subCategory: 'High-Yield Links', type: 'link', description: 'Complete CEM handbook describing subtest weight distribution rules.' },
  { id: 'sh-23', name: 'NMAT Tips', category: 'Other Resources', subCategory: 'High-Yield Links', type: 'link', description: 'Community blog outlines detailing daily schedule checklists.' }
];

export default function ResourcesPage({ currentUserEmail }: ResourcesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'drills' | 'notes' | 'mock-exams' | 'others'>('all');
  const [selectedFile, setSelectedFile] = useState<ResourceFile | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [isSimulatingDownloadId, setIsSimulatingDownloadId] = useState<string | null>(null);

  // Curated items based on standard high-yield medical school entrance resources
  const [resources, setResources] = useState<ResourceFile[]>(() => {
    try {
      const stored = localStorage.getItem('medly_study_resources_vault');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
    {
      id: 'res-1',
      title: 'Official CEM NMAT Practice Booklet Part 1 (Comprehensive)',
      category: 'mock-exams',
      categoryLabel: 'Mock Exam Set',
      size: '14.5 MB',
      fileType: 'pdf',
      description: 'The definitive CEM practice examination questionnaire for NMAT Part I. It covers mental ability metrics including verbal analogies, fast quantitative speed-drills, perceptual acuity pattern mirroring, and inductive reasoning blocks.',
      pagesOrItems: '120 items • 45 pages',
      keyConcepts: ['Verbal Analogy Reasoning', 'Quantitative Word Formulas', 'Mirror Pattern Recognition', 'Letter/Number Series Induction'],
      outline: [
        'Section A: Verbal Comprehension & Analogies (30 Questions)',
        'Section B: Quantitative Reasoning and Fractions (30 Questions)',
        'Section C: Perceptual Acuity Spatial Orientation (30 Questions)',
        'Section D: Inductive Reasoning Pattern Sequences (30 Questions)',
        'Correct Answer Key and Scaled Score Scoring Matric'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-2',
      title: 'Official CEM NMAT Practice Booklet Part 2 (Comprehensive)',
      category: 'mock-exams',
      categoryLabel: 'Mock Exam Set',
      size: '16.2 MB',
      fileType: 'pdf',
      description: 'The official CEM practice examination for NMAT Part II. Essential for testing memory schemas of core sciences, specifically biology, physics, chemistry, and social sciences.',
      pagesOrItems: '120 items • 52 pages',
      keyConcepts: ['Cell Biology & Genetics', 'Organic Synthesis Reactants', 'Thermodynamics & Electromagnetism', 'Developmental Psychology & Sociology'],
      outline: [
        'Biological Sciences - Animal Physiology & Botany (30 Questions)',
        'Chemical Sciences - General Chemistry & Organic Chains (30 Questions)',
        'Physics - Optics, Vectors, Mechanics, Fluid dynamics (30 Questions)',
        'Social Sciences - Sociology, Piaget Stages, Psychological profiles (30 Questions)',
        'Scoring Rationale & Exhaustive Explanations Matrix'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-3',
      title: 'UP Pre-Medical Honor Society NMAT Physics Prep Booklet',
      category: 'mock-exams',
      categoryLabel: 'Mock Exam Set',
      size: '8.4 MB',
      fileType: 'pdf',
      description: 'Comprehensive physics simulated exam curated by UP premed graduates. Known for its realistic, highly quantitative calculations and trick questions on optics and thermodynamics.',
      pagesOrItems: '60 items • 24 pages',
      keyConcepts: ['Friction & Gravity Vectors', 'Gas Expansion Work', 'Snells Law of Optic Reflection', 'Parallel Circuits Resistance'],
      outline: [
        'Kinematics & Speed Force Free-Body Diagrams (15 Items)',
        'Fluids Density and Hydrostatic Lifting (15 Items)',
        'Electrostatics and Capacitor Dielectric loops (15 Items)',
        'Wave Oscillation and Doppler Pitch shift (15 Items)',
        'Comprehensive step-by-step mathematical answers guides'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-4',
      title: 'Ateneo Pre-Med Association High-Yield Chem Mock Exam & Key',
      category: 'mock-exams',
      categoryLabel: 'Mock Exam Set',
      size: '9.8 MB',
      fileType: 'pdf',
      description: 'A mock assessment tailored specifically for General and Organic Chemistry. Includes intensive drills on stoichiometry stoichiometry, buffers, pH calculation, and organic naming conventions.',
      pagesOrItems: '60 items • 28 pages',
      keyConcepts: ['Le Chateliers Equilibrium equilibrium', 'Buffer Systems pH Calculations', 'Electrolysis Galvanic Half-Reactions', 'Alkyl Halides nucleophilic substitution'],
      outline: [
        'Section I: Stoichiometric Equations Balance and Limiting Reactants',
        'Section II: Thermodynamics of Reactions (Enthalpy, Standard Free Energy)',
        'Section III: Acids, Bases, Indicators & Salt Solubility Constant (Ksp)',
        'Section IV: Chiral Centers, Enantiomers, and Carbon Naming rules',
        'Annotated Answer Keys with rationales'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-5',
      title: 'Perceptual Acuity Mirror Images & Spatial Rotation Speed drills',
      category: 'drills',
      categoryLabel: 'Drill Sheet',
      size: '6.1 MB',
      fileType: 'pdf',
      description: 'A dedicated practice workbook targeting the Perceptual Acuity section of Part 1. Contains 150+ custom geometric figures and mirror reflection problems designed to accelerate pattern scanning and avoid exam fatigue.',
      pagesOrItems: '150 items • 35 pages',
      keyConcepts: ['Mirror Reflection Layouts', 'Folded Paper Hole Punches', 'Identical Figure Matching', 'Hidden Shape Identification'],
      outline: [
        'Warm-Up: Horizontal and Vertical Reflection symmetries (50 questions)',
        'Intermediate: Orthographic cube folding visualizations (50 questions)',
        'Advanced: Layered interlocking shape configurations (50 questions)',
        'Drill Timer Sheets for Speed Optimization'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-6',
      title: 'NMAT Part 1 Inductive Reasoning Number & Matrix Drills',
      category: 'drills',
      categoryLabel: 'Drill Sheet',
      size: '5.2 MB',
      fileType: 'pdf',
      description: 'Daily drills containing matrix alignments, shape groupings, and series progression puzzles. Prepares you for the challenging inductive logic patterns commonly screened on the official exam.',
      pagesOrItems: '100 items • 20 pages',
      keyConcepts: ['Series Sequence Formulation', 'Matrix Sequence Progressions', 'Figure Analogies Logic', 'Classifications of Outlier Shapes'],
      outline: [
        'Fibonacci-style and geometric numeric series drills (30 items)',
        'Visual rotational progression sequence grids (30 items)',
        'Shape pairing logic & mathematical equivalent diagrams (25 items)',
        'Outlier shape classification grouping problems (15 items)'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-7',
      title: 'Quantitative Reasoning Formulas Mechanics Drill Pack',
      category: 'drills',
      categoryLabel: 'Drill Sheet',
      size: '4.7 MB',
      fileType: 'pdf',
      description: 'A compilation of fraction conversion practice sets, compound rate formulas, work equations, and quantitative data sufficiency tables.',
      pagesOrItems: '120 items • 18 pages',
      keyConcepts: ['Fractions Speed conversion', 'Direct and Inverse Proportion equations', 'Combined rate work math problems', 'Data sufficiency statements assessment'],
      outline: [
        'Speed Math warmups: fractions, decimals, percentages',
        'Direct, Inverse, and Joint variation formula drills',
        'Averages, mixtures, and alloy percentage problems',
        'Data sufficiency reasoning logic checklists'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-8',
      title: 'Organic Chemistry Reactions & Functional Group Drill sheet',
      category: 'drills',
      categoryLabel: 'Drill Sheet',
      size: '3.6 MB',
      fileType: 'pdf',
      description: 'Mechanism drill sheets focused on electrophilic addition, nucleophilic substitution (SN1 vs SN2), and elimination pathways (E1 vs E2). Highly recommended for biochemistry memory preservation.',
      pagesOrItems: '80 items • 15 pages',
      keyConcepts: ['SN1 SN2 Elimination Rates', 'Markovnikov addition rules', 'Carbonyl keto-enol tautomerism', 'Aromatic ring activation order'],
      outline: [
        'Alkane/Alkene/Alkyne hydration synthesis pathways',
        'SN1, SN2, E1, E2 nucleophilic rate and mechanism matrix',
        'Esterification, reduction, and Aldol condensation drills',
        'Aromatic electrophilic substitution reagents table'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-9',
      title: 'Medly High-Yield Physics Thermodynamics & Optics Formulas Guide',
      category: 'notes',
      categoryLabel: 'Lecture Notes',
      size: '3.1 MB',
      fileType: 'pdf',
      description: 'Condensed, beautifully organized formulas crib-sheet. It highlights the essential physics concepts required for NMAT Part 2, detailing Snell\'s law, refraction, convex/concave mirror logic, and thermodynamic cycles.',
      pagesOrItems: '14 pages cheat-sheet',
      keyConcepts: ['Ideal Gas Thermodynamic Laws', 'Mirror Refractive Focus equations', 'Coulombs Electric Force vector', 'Wave Doppler Pitch calculation'],
      outline: [
        'Summary sheet for Kinematics & Gravity formulas',
        'Thermodynamics: Heat capacity, Adiabatic processes, Carnot cycle',
        'Optics: Lens manufacturer equations, focal charts, refraction indices',
        'Electricity & Magnetism: Amperes law, magnetic force on charges'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-10',
      title: 'High-Yield Cell Biology Macromolecules Review Trans',
      category: 'notes',
      categoryLabel: 'Lecture Notes',
      size: '7.8 MB',
      fileType: 'pdf',
      description: 'Detailed anatomy, physiology, and cell biology study transes. It contains crisp comparison tables between mitosis and meiosis, cellular respiration pathways (Glycolysis, Krebs, ETC), and DNA translation controls.',
      pagesOrItems: '48 pages study trans',
      keyConcepts: ['Mitosis vs Meiosis stages', 'Krebs Cycle Energy output', 'Enzymatic inhibition kinetics', 'Eukaryotic vs Prokaryotic DNA'],
      outline: [
        'Biological macromolecules: Lipids, Proteins, Starch configurations',
        'Cell boundaries & organelles: Membrane pumps, lysosomes, mitochondria',
        'Cellular respiration & glycolysis output balance',
        'Central Dogma: mRNA transcription, ribosomes, and DNA repair'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-11',
      title: 'General Chemistry Aqueous Equilibrium & Gas Laws Handout',
      category: 'notes',
      categoryLabel: 'Lecture Notes',
      size: '5.9 MB',
      fileType: 'pdf',
      description: 'Comprehensive general chemistry notes defining molarity, gas kinetics, equilibrium shift directions, chemical kinetics, and nuclear decay rates.',
      pagesOrItems: '32 pages study notes',
      keyConcepts: ['Boyles and Charles Gas laws', 'Gibbs Free Energy spontaneity', 'Solubility Product constant Ksp', 'Zero vs First Order reaction rates'],
      outline: [
        'Ideal gases: Dalton partial pressures and effusion ratios',
        'Chemical kinetics: rate laws, half-life equations',
        'Le Chatelier stresses & equilibrium constants (Kc, Kp)',
        'Nuclear chemistry: alpha, beta particles decay formulas'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-12',
      title: 'Social Sciences Key Theories & Psychological Frameworks Note',
      category: 'notes',
      categoryLabel: 'Lecture Notes',
      size: '4.2 MB',
      fileType: 'pdf',
      description: 'A study cheat-sheet detailing major sociological systems (functionalism, conflict theory, interactionism) and lifespan developmental theories (Freud, Erikson, Piaget, Kohlberg) essential for Part II social sciences.',
      pagesOrItems: '19 pages summary notes',
      keyConcepts: ['Sociological System paradigms', 'Piaget Cognitive Milestones', 'Eriksons psychosocial crises', 'Kohlbergs moral developments'],
      outline: [
        'Lifespan psychology: Freud psychosocial stages comparison',
        'Eriksons psychosocial conflicts (e.g. Identity vs Role Confusion)',
        'Sociology foundations: structural functionalism, Marxist conflicts',
        'Perceptual anomalies, sensory adaptations, Pavlov conditioning schemas'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-13',
      title: 'ASMPH Admission Timeline & MBA Double-Degree Guide 2026-2027',
      category: 'others',
      categoryLabel: 'Resource Booklet',
      size: '3.4 MB',
      fileType: 'pdf',
      description: 'A comprehensive briefing document on Ateneo School of Medicine and Public Health Admissions. Covers specific entry constraints, recommendation letter formats, and a detailed outline of the joint MD-MBA program layout.',
      pagesOrItems: '12 pages guidelines',
      keyConcepts: ['ASMPH Admissions timeline', 'MD-MBA Joint Degree layout', 'Recommendation Letter instructions', 'Financial aid applications'],
      outline: [
        'ASMPH Core Pillars: clinician, leader, social catalyst',
        'The MBA curriculum integration: when are business modules taught?',
        'Admissions documentation checklist (GMC, NMAT, double TOR)',
        'Interview prep tips and common panel discussion questions'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-14',
      title: 'Philippine Med Schools Intake Document Filing Guideline',
      category: 'others',
      categoryLabel: 'Filing Instruction',
      size: '2.5 MB',
      fileType: 'pdf',
      description: 'A complete step-by-step checklist on preparing documents for UPCM, PLM, ASMPH, UST-FMS, and St. Luke\'s. Includes instructions on getting PSA birth certificates, NBI clearance clearances, and TOR authentication.',
      pagesOrItems: '8 pages instructions',
      keyConcepts: ['TOR CAV Certification', 'Online CEM NMAT certified photocopy', 'NBI clearance pre-requisites', 'Affidavits of residency'],
      outline: [
        'Step 1: Requesting CAV (Certification, Authentication, Verification) for TOR',
        'Step 2: Securing NBI Philippine clearance with premed stamp',
        'Step 3: Notarized certificate of residency (for PLM municipal subsidy)',
        'Step 4: Certified true copy forwarding guidelines for CEM NMAT ranks'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    },
    {
      id: 'res-15',
      title: 'Med School Letter of Intent / Essay Premium Template drafts',
      category: 'others',
      categoryLabel: 'Writing Draft',
      size: '1.8 MB',
      fileType: 'docx',
      description: 'Three structural template drafts for drafting your personal essay or letter of intent to medical school admission committees. Contains proven structures that connect volunteering experiences to future clinical practice.',
      pagesOrItems: '3 template drafts',
      keyConcepts: ['Personal Essay alignment', 'Pre-med volunteering hooks', 'Career mission statement', 'Why ASMPH / UPCM / SLMC prompt structures'],
      outline: [
        'Template A: The Community Advocate (ideal for UPCM/PLM applications)',
        'Template B: The Innovative Clinician (ideal for ASMPH MD-MBA program)',
        'Template C: The Clinical Researcher (ideal for SLMC/St. Luke\'s)',
        'Recommended style, paragraph proportions, and formatting checklist'
      ],
      driveUrl: 'https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing'
    }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('medly_study_resources_vault', JSON.stringify(resources));
    } catch {}
  }, [resources]);

  const isAdmin = currentUserEmail?.trim().toLowerCase() === 'studyfilesbyz@gmail.com';

  const [editingLocId, setEditingLocId] = useState<string | null>(null);
  const [resTitle, setResTitle] = useState('');
  const [resCategory, setResCategory] = useState<'drills' | 'notes' | 'mock-exams' | 'others'>('drills');
  const [resSize, setResSize] = useState('5 MB');
  const [resFileType, setResFileType] = useState<'pdf' | 'docx' | 'xlsx' | 'zip'>('pdf');
  const [resDescription, setResDescription] = useState('');
  const [resPagesOrItems, setResPagesOrItems] = useState('50 items');
  const [resKeyConcepts, setResKeyConcepts] = useState('');
  const [resOutline, setResOutline] = useState('');
  const [resDriveUrl, setResDriveUrl] = useState('');

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      alert("Access Denied! Only studyfilesbyz@gmail.com is authorized to control or modify the NMAT Study Document Library.");
      return;
    }
    if (!resTitle.trim()) return;

    const keyConceptsArr = resKeyConcepts.split(',').map(s => s.trim()).filter(Boolean);
    const outlineArr = resOutline.split('\n').map(s => s.trim()).filter(Boolean);

    const categoryLabelMap = {
      drills: 'Drill Sheet',
      notes: 'Lecture Notes',
      'mock-exams': 'Mock Exam Set',
      others: 'Resource Booklet'
    };

    if (editingLocId) {
      setResources(prev => prev.map(r => r.id === editingLocId ? {
        ...r,
        title: resTitle.trim(),
        category: resCategory,
        categoryLabel: categoryLabelMap[resCategory] || 'Resource Booklet',
        size: resSize.trim(),
        fileType: resFileType,
        description: resDescription.trim(),
        pagesOrItems: resPagesOrItems.trim(),
        keyConcepts: keyConceptsArr,
        outline: outlineArr,
        driveUrl: resDriveUrl.trim() || 'https://drive.google.com'
      } : r));
      setEditingLocId(null);
    } else {
      const newRes: ResourceFile = {
        id: `res-${Date.now()}`,
        title: resTitle.trim(),
        category: resCategory,
        categoryLabel: categoryLabelMap[resCategory] || 'Resource Booklet',
        size: resSize.trim(),
        fileType: resFileType,
        description: resDescription.trim(),
        pagesOrItems: resPagesOrItems.trim(),
        keyConcepts: keyConceptsArr,
        outline: outlineArr,
        driveUrl: resDriveUrl.trim() || 'https://drive.google.com'
      };
      setResources(prev => [newRes, ...prev]);
    }

    // Reset fields
    setResTitle('');
    setResDescription('');
    setResSize('5 MB');
    setResPagesOrItems('50 items');
    setResKeyConcepts('');
    setResOutline('');
    setResDriveUrl('');
  };

  const handleDeleteResource = (id: string) => {
    if (!isAdmin) {
      alert("Access Denied! Only studyfilesbyz@gmail.com is authorized to control or modify the NMAT Study Document Library.");
      return;
    }
    if (confirm("Are you sure you want to delete this study resource?")) {
      setResources(prev => prev.filter(r => r.id !== id));
      if (selectedFile?.id === id) {
        setSelectedFile(null);
      }
    }
  };

  const handleEditResourceClick = (file: ResourceFile) => {
    if (!isAdmin) {
      alert("Access Denied! Only studyfilesbyz@gmail.com is authorized to control or modify the NMAT Study Document Library.");
      return;
    }
    setEditingLocId(file.id);
    setResTitle(file.title);
    setResCategory(file.category);
    setResSize(file.size);
    setResFileType(file.fileType);
    setResDescription(file.description);
    setResPagesOrItems(file.pagesOrItems);
    setResKeyConcepts(file.keyConcepts.join(', '));
    setResOutline(file.outline.join('\n'));
    setResDriveUrl(file.driveUrl);
    
    // Smooth scroll admin console into view
    const el = document.getElementById('admin-resource-console');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSimulateDownload = (file: ResourceFile) => {
    setIsSimulatingDownloadId(file.id);
    setTimeout(() => {
      setIsSimulatingDownloadId(null);
      setDownloadSuccessMessage(`Successfully synchronized offline index for: "${file.title}"! File cached inside local sandbox storage.`);
      setTimeout(() => {
        setDownloadSuccessMessage(null);
      }, 5000);
    }, 1500);
  };

  const coveragePart1 = [
    { subtest: 'Verbal', items: 30, time: 30, desc: 'Sentence completions, vocabulary analogical equations, reading' },
    { subtest: 'Inductive Reasoning', items: 30, time: 35, desc: 'Rotational patterns, letter and number sequence inductions' },
    { subtest: 'Quantitative', items: 30, time: 40, desc: 'Stoichiometry variables, fractions, algebra, rate work formulas' },
    { subtest: 'Perceptual Acuity', items: 30, time: 30, desc: 'Mirroring figures, identical matching speed assessment' },
  ];

  const coveragePart2 = [
    { subtest: 'Biology', items: 30, time: 20, desc: 'Physiology, botany, cellular respiration pathways, genetics' },
    { subtest: 'Physics', items: 30, time: 25, desc: 'Optics formulas, kinematics forces, thermodynamic cycles' },
    { subtest: 'Social Science', items: 30, time: 20, desc: 'Erikson lifespan stages, sociometry, developmental rules' },
    { subtest: 'Chemistry', items: 30, time: 25, desc: 'Stoichiometric balance, organic groups, thermodynamic enthalpy' },
  ];

  const filteredResources = resources.filter(file => {
    const matchesSearch = file.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          file.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          file.keyConcepts.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeFilter === 'all' || file.category === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in" id="medly-digital-library-view">
      
      {/* Premium Header Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 p-6 md:p-8 rounded-[24px] text-white shadow-sm border border-slate-700/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[9.5px] uppercase font-black tracking-widest text-[#8bb3f9] bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-500/20 inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> High-Yield NMAT Repositories
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            NMAT Study Document Library
          </h1>
          <p className="text-xs text-indigo-100 leading-relaxed font-sans">
            Instantly browse, inspect, and access high-yield practice drills, lecture transes, official CEM mock booklets, and filing templates sourced direct from the Medly cooperative drive repository.
          </p>
        </div>

        {/* Master Folder Link Button */}
        <a 
          href="https://drive.google.com/drive/folders/10Gd5wnRYCgLvzLgOzRZprAHQtP8DjBph?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3.5 bg-[#1b4cb4] hover:bg-opacity-90 font-bold text-xs rounded-xl flex items-center space-x-2 transition-all shadow-md hover:scale-[1.01] border border-indigo-400/20 text-white self-stretch md:self-auto text-center"
        >
          <FolderOpen className="w-4 h-4" />
          <span>Open Original Drive Folder</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Grid containing Search bar and Content */}
      <div className="space-y-5">
          
          {/* Admin Vault Console Panel */}
          {isAdmin && (
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-[24px] space-y-4 shadow-sm" id="admin-resource-console">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-indigo-650" /> Admin Resources Vault Controller
                </h3>
                <span className="text-[10px] bg-indigo-150 text-[#1b4cb4] px-2.5 py-0.5 rounded font-black uppercase">ADMIN KEY ACCESS ACTIVE</span>
              </div>

              <form onSubmit={handleSaveResource} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-400">Resource Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Official CEM Practice Booklet Part 3 (Comprehensive)"
                    value={resTitle}
                    onChange={(e) => setResTitle(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold outline-none" 
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-400">Category TYPE</label>
                  <select 
                    value={resCategory}
                    onChange={(e) => setResCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold outline-none"
                  >
                    <option value="drills">Practice Drills</option>
                    <option value="notes">Study Notes & Trans</option>
                    <option value="mock-exams">Mock Exams</option>
                    <option value="others">Others & Guidelines</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-400">File Size (e.g. '12.4 MB', '4.5 MB')</label>
                  <input 
                    type="text" 
                    value={resSize}
                    onChange={(e) => setResSize(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-400">File Type Extension</label>
                  <select 
                    value={resFileType}
                    onChange={(e) => setResFileType(e.target.value as any)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold outline-none"
                  >
                    <option value="pdf">pdf</option>
                    <option value="docx">docx</option>
                    <option value="xlsx">xlsx</option>
                    <option value="zip">zip</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-400">Pages or Items (e.g. '60 items • 24 pages')</label>
                  <input 
                    type="text" 
                    value={resPagesOrItems}
                    onChange={(e) => setResPagesOrItems(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-400">Google Drive / Source Link</label>
                  <input 
                    type="url" 
                    value={resDriveUrl}
                    onChange={(e) => setResDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none" 
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-400">Document Overview Description</label>
                  <textarea 
                    value={resDescription}
                    onChange={(e) => setResDescription(e.target.value)}
                    placeholder="Provide a comprehensive descriptive outline matching clinical/exam preparation standards..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none h-16 resize-y" 
                    required
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-400">Key Concepts (Comma separated, e.g. mitotic stages, kinetic laws)</label>
                  <input 
                    type="text" 
                    value={resKeyConcepts}
                    onChange={(e) => setResKeyConcepts(e.target.value)}
                    placeholder="Mitosis stages, stoichiometry equations, Snell's law"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none" 
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-400">Detailed Outlines (New line per section / item)</label>
                  <textarea 
                    value={resOutline}
                    onChange={(e) => setResOutline(e.target.value)}
                    placeholder="Section I: Verbal Analogies (30 Questions)&#10;Section II: Quant Math Formulas (30 Questions)"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none h-20 resize-y" 
                  />
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-end gap-2.5 pt-2">
                  {editingLocId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingLocId(null);
                        setResTitle('');
                        setResDescription('');
                        setResSize('5 MB');
                        setResPagesOrItems('50 items');
                        setResKeyConcepts('');
                        setResOutline('');
                        setResDriveUrl('');
                      }}
                      className="px-4 py-2 hover:bg-slate-200 bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl cursor-pointer shadow-xs transition-all"
                  >
                    {editingLocId ? "Save Study Resource Updates" : "Post New Study Resource"}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Banner notification */}
          {downloadSuccessMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-600 animate-pulse" />
              <span>{downloadSuccessMessage}</span>
            </div>
          )}

          {/* Search and Categories Toolbar Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
            
            {/* Search bar */}
            <div className="flex-grow max-w-md relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search by title, topic, or concept..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-indigo-500 font-medium font-sans"
              />
            </div>

            {/* Quick Stats banner */}
            <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50/50 border border-indigo-100 rounded-xl font-bold text-indigo-950 self-start md:self-auto text-[11px]">
              <Info className="w-3.5 h-3.5 text-indigo-650" />
              <span>Count: {filteredResources.length} items found</span>
            </div>
          </div>

          {/* Category filtering pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin text-xs">
            {[
              { id: 'all', label: 'All Files' },
              { id: 'drills', label: 'Practice Drills' },
              { id: 'notes', label: 'Study Notes & Trans' },
              { id: 'mock-exams', label: 'Mock Exams' },
              { id: 'others', label: 'Others & Guidelines' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id as any)}
                className={`px-3.5 py-1.5 rounded-xl border font-bold cursor-pointer transition-colors flex-shrink-0 ${
                  activeFilter === opt.id
                    ? 'bg-[#1b4cb4] border-[#1b4cb4] text-white'
                    : 'bg-white border-slate-150 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Files grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((file) => {
              let catColor = 'bg-slate-50 text-slate-800 border-slate-200';
              if (file.category === 'drills') catColor = 'bg-purple-50 text-purple-800 border-purple-200';
              else if (file.category === 'notes') catColor = 'bg-amber-50 text-amber-700 border-amber-200';
              else if (file.category === 'mock-exams') catColor = 'bg-rose-50 text-rose-700 border-rose-200';
              else if (file.category === 'others') catColor = 'bg-sky-50 text-sky-700 border-sky-200';

              return (
                <div 
                  key={file.id} 
                  className="bg-white rounded-2xl border border-slate-105 p-5 hover:border-indigo-400 transition-all flex flex-col justify-between shadow-xs relative group hover:shadow-sm"
                >
                  <div className="space-y-3">
                    {/* Category and sizes */}
                    <div className="flex justify-between items-center text-[10px] font-black">
                      <span className={`px-2 py-0.5 rounded uppercase border ${catColor}`}>
                        {file.categoryLabel}
                      </span>
                      <span className="text-slate-400 font-mono text-[9px]">{file.size}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-slate-850 text-xs sm:text-sm leading-snug group-hover:text-indigo-650 transition-colors">
                      {file.title}
                    </h3>

                    {/* Description mini */}
                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3 font-medium">
                      {file.description}
                    </p>

                    {/* Mini pills for key concepts */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {file.keyConcepts.slice(0, 2).map((concept, idx) => (
                        <span key={idx} className="bg-slate-50 border border-slate-100 text-slate-500 text-[9px] px-1.5 py-0.5 rounded font-semibold">
                          {concept}
                        </span>
                      ))}
                      {file.keyConcepts.length > 2 && (
                        <span className="text-slate-400 text-[8.5px] font-bold self-center">
                          +{file.keyConcepts.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between gap-2 text-xs font-bold">
                    {/* Details checker */}
                    <button
                      onClick={() => setSelectedFile(file)}
                      className="px-3 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg border border-slate-150 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {/* Simulated download */}
                      <button
                        onClick={() => handleSimulateDownload(file)}
                        disabled={isSimulatingDownloadId === file.id}
                        className="p-1.5 bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                        title="Sync offline local index summary"
                      >
                        <Download className={`w-4 h-4 ${isSimulatingDownloadId === file.id ? 'animate-bounce text-indigo-600' : ''}`} />
                      </button>

                      {/* Original link */}
                      <a
                        href={file.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-750 border border-indigo-150 rounded-lg transition-all cursor-pointer"
                        title="Open source folder on Google Drive"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="flex gap-2 w-full pt-3 mt-3 border-t border-dashed border-slate-150">
                      <button 
                        onClick={() => handleEditResourceClick(file)}
                        className="flex-1 py-1.5 bg-amber-55 bg-opacity-70 hover:bg-opacity-100 border border-amber-250 text-amber-850 rounded-lg font-bold text-[10.5px] cursor-pointer flex items-center justify-center gap-1 transition-all"
                      >
                        <Edit2 className="w-3 h-3 text-amber-700" /> Edit Resource
                      </button>
                      <button 
                        onClick={() => handleDeleteResource(file.id)}
                        className="flex-1 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-250 text-rose-700 rounded-lg font-bold text-[10.5px] cursor-pointer flex items-center justify-center gap-1 transition-all"
                      >
                        <Trash2 className="w-3 h-3 text-rose-600" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredResources.length === 0 && (
              <div className="col-span-full py-16 text-center bg-white border border-dashed border-slate-200 rounded-[24px]">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-slate-355" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">No matching items found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  We couldn't find any resources matching your query. Try broad terms like "Physics", "CEM", "Biology", or clear selection filters.
                </p>
              </div>
            )}
          </div>
        </div>

      {/* File Drawer/Detail Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 text-xs select-text">
            
            {/* Modal header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="space-y-1.5">
                <span className="px-2.5 py-0.5 bg-indigo-50 border border-indigo-150 text-indigo-850 font-black uppercase rounded text-[10px]">
                  {selectedFile.categoryLabel}
                </span>
                <h2 className="text-base font-black text-slate-850 leading-snug">{selectedFile.title}</h2>
                <p className="text-[10px] text-slate-400 font-mono">Size: {selectedFile.size} • Pages/Items: {selectedFile.pagesOrItems}</p>
              </div>
              
              <button
                onClick={() => setSelectedFile(null)}
                className="p-1.5 hover:bg-slate-100 border border-slate-150 text-slate-500 rounded-lg transition-all font-sans text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Document Overview</span>
              <p className="text-slate-655 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-150">
                {selectedFile.description}
              </p>
            </div>

            {/* Segment: Key Concepts */}
            <div className="space-y-2">
              <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">High-Yield Concepts Screened</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedFile.keyConcepts.map((concept, idx) => (
                  <span key={idx} className="bg-indigo-50/50 text-[#1b4cb4] font-bold border border-indigo-100/80 px-2.5 py-1 rounded-lg">
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Segment: Outline of Contents */}
            <div className="space-y-2.5">
              <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Detailed Section Breakdown</span>
              <ul className="space-y-1.5 font-medium text-slate-650">
                {selectedFile.outline.map((o, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100/80 border text-[10px] font-bold flex items-center justify-center text-slate-500 flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons footer inside modal */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 justify-end items-center">
              
              {isAdmin && (
                <button
                  onClick={() => handleDeleteResource(selectedFile.id)}
                  className="px-4 py-2 bg-rose-50 border border-rose-200 text-rose-700 font-bold rounded-xl hover:bg-rose-100 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs mr-auto w-full sm:w-auto"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Delete Resource</span>
                </button>
              )}

              {/* Secondary simulated download option */}
              <button
                onClick={() => {
                  handleSimulateDownload(selectedFile);
                  setSelectedFile(null);
                }}
                disabled={isSimulatingDownloadId === selectedFile.id}
                className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5 text-xs w-full sm:w-auto"
              >
                <Download className="w-4 h-4" />
                <span>Download Index to Local Offline Memory</span>
              </button>

              {/* Direct GDrive link */}
              <a
                href={selectedFile.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1b4cb4] text-white font-bold rounded-xl hover:bg-opacity-90 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs w-full sm:w-auto text-center"
              >
                <span>Access Google Drive Document Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Quick advice card */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed flex items-start gap-3">
        <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="space-y-1 font-medium">
          <h4 className="font-extrabold text-amber-950 text-xs sm:text-sm">CEM Scoring Standard & File Access Tips</h4>
          <p className="text-amber-800">
            For Part 1 items, do not overspend time on a single Perceptual Acuity pattern. If a spatial orientation mirroring puzzle takes more than 40 seconds, skip the Item! Utilize the formulas cheatsheet files to build faster automatic retrieval triggers before attempting the Mock assessments.
          </p>
        </div>
      </div>

    </div>
  );
}
