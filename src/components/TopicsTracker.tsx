import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  Search, 
  BookOpen, 
  AlertCircle, 
  Sparkles, 
  Filter, 
  Activity, 
  Award, 
  Hourglass, 
  Flame, 
  Grid, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  RefreshCw,
  HelpCircle,
  Sparkle,
  Trash2,
  Plus,
  ExternalLink,
  Calendar,
  Clock,
  ClipboardList
} from 'lucide-react';
import { getTheme, ThemeConfig } from '../utils/themeStyles';

interface SyllabusItem {
  id: string;
  subject: 'Biology' | 'Chemistry' | 'Physics' | 'Social Science';
  category: string;
  topic: string;
  description: string;
  priority: 'High' | 'Medium' | 'Extreme';
}

type TopicStatus = 'not-started' | 'in-progress' | 'completed';

interface TopicsTrackerProps {
  onAskAi?: (topic: SyllabusItem) => void;
}

export default function TopicsTracker({ onAskAi }: TopicsTrackerProps) {
  // Read active theme config to stay cohesive with the selected theme
  const [currentTheme] = useState<string>(() => {
    return localStorage.getItem('medly_current_theme') || 'cozy-bear';
  });
  const themeCfg: ThemeConfig = getTheme(currentTheme);

  // Status mapping: topicId -> status
  const [topicStatuses, setTopicStatuses] = useState<Record<string, TopicStatus>>(() => {
    try {
      const stored = localStorage.getItem('medly_topic_statuses_v3');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'All' | 'Biology' | 'Chemistry' | 'Physics' | 'Social Science'>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<'All' | 'High' | 'Medium' | 'Extreme'>('All');
  const [showOnlyWeakspots, setShowOnlyWeakspots] = useState(false);

  useEffect(() => {
    localStorage.setItem('medly_topic_statuses_v3', JSON.stringify(topicStatuses));
  }, [topicStatuses]);

  // FULL COMPACT STUDY SYLLABUS CORRESPONDING STRICTLY TO USER-REQUESTED SYLLABUS LIST
  const syllabus: SyllabusItem[] = [
    // --- BIOLOGY (35 topics) ---
    // Anatomy/Physiology
    { id: 'bio-1', subject: 'Biology', category: 'Anatomy/Physiology', topic: 'Circulatory System', priority: 'Extreme', description: 'Chamber valves of the heart, blood pressure curves, systemic vs pulmonary circuits, and oxygen transport.' },
    { id: 'bio-2', subject: 'Biology', category: 'Anatomy/Physiology', topic: 'Respiratory System', priority: 'High', description: 'Gas partial pressures, alveolar-capillary gas exchange, inhalation/exhalation diaphragmatic forces.' },
    { id: 'bio-3', subject: 'Biology', category: 'Anatomy/Physiology', topic: 'Nervous System', priority: 'Extreme', description: 'Action potential generation, synaptic transmission channels, reflex arcs, CNS vs PNS divisions.' },
    { id: 'bio-4', subject: 'Biology', category: 'Anatomy/Physiology', topic: 'Digestive System', priority: 'High', description: 'Duodenum nutrient extraction, chemical enzymatic digestion cascades, gastric pH levels, liver secretion regulation.' },
    { id: 'bio-5', subject: 'Biology', category: 'Anatomy/Physiology', topic: 'Endocrine System', priority: 'Extreme', description: 'Hypothalamus-pituitary hormones, insulin/glucagon cycles, second messenger cascades, steroid vs nonsteroids.' },
    { id: 'bio-6', subject: 'Biology', category: 'Anatomy/Physiology', topic: 'Urinary System', priority: 'High', description: 'Nephron countercurrent heat exchange mechanics, ADH and aldosterone blood volume regulation, tubular reabsorption.' },
    { id: 'bio-7', subject: 'Biology', category: 'Anatomy/Physiology', topic: 'Reproductive System', priority: 'Extreme', description: 'Meiotic gametogenesis, LH/FSH feedback, estrogen/progesterone menstrual stages, fertilization.' },
    { id: 'bio-8', subject: 'Biology', category: 'Anatomy/Physiology', topic: 'Enzymes', priority: 'Extreme', description: 'Catalytic feedback systems, activation energies, induced fit mechanics, pH denaturation.' },
    { id: 'bio-9', subject: 'Biology', category: 'Anatomy/Physiology', topic: 'Cellular Transport', priority: 'Extreme', description: 'Solute concentration gradients, passive osmolarity, active ATP transport pumps, bulk endocytosis.' },
    { id: 'bio-10', subject: 'Biology', category: 'Anatomy/Physiology', topic: 'Blood Clot Formation', priority: 'Medium', description: 'Platelets release, cascade conversions of prothrombin-thrombin, fibrin network seals.' },
    { id: 'bio-11', subject: 'Biology', category: 'Anatomy/Physiology', topic: 'Blood Pigments', priority: 'Medium', description: 'Oxygen-binding affinity parameters of hemoglobin, myoglobin oxygen reserves, Bohr dynamics.' },
    { id: 'bio-12', subject: 'Biology', category: 'Anatomy/Physiology', topic: 'Cellular Tonicity', priority: 'Extreme', description: 'Hypertonic, hypotonic, and isotonic solutions, animal cells lysis vs turgor pressure curves in plant cell walls.' },

    // Cellular Biology
    { id: 'bio-13', subject: 'Biology', category: 'Cellular Biology', topic: 'Cell Cycle', priority: 'Extreme', description: 'Interphase check gates, G1/S/G2 checkpoints, meiotic crossing-overs, sister chromatid separations.' },
    { id: 'bio-14', subject: 'Biology', category: 'Cellular Biology', topic: 'Parts of the Cell', priority: 'Extreme', description: 'Membrane structures, mitochondrial cristae, nuclear pores, ribosomes, lysosome degradation complexes.' },
    { id: 'bio-15', subject: 'Biology', category: 'Cellular Biology', topic: 'Cellular Respiration', priority: 'Extreme', description: 'Glycolysis ATP returns, Krebs cycle oxidation of glucose, ETC proton-motive force gradients.' },

    // Ecology
    { id: 'bio-16', subject: 'Biology', category: 'Ecology', topic: 'Hierarchy of Life', priority: 'Medium', description: 'Biosphere down to tissue systems, biological populations integration scales.' },
    { id: 'bio-17', subject: 'Biology', category: 'Ecology', topic: 'Food CHain', priority: 'High', description: 'Biomagnification profiles, trophic level 10% thermal laws, consumer classifications.' },
    { id: 'bio-18', subject: 'Biology', category: 'Ecology', topic: 'Terrestrial Biomes', priority: 'High', description: 'Deciduous vs cloud forests, tundra freeze levels, temperate deserts, rainshadow configurations.' },
    { id: 'bio-19', subject: 'Biology', category: 'Ecology', topic: 'Aquatic Biomes', priority: 'Medium', description: 'Estuary ecosystems, pelagic nutrient densities, deep benthic floor environments.' },
    { id: 'bio-20', subject: 'Biology', category: 'Ecology', topic: 'Ecological Succession', priority: 'High', description: 'Lichen primary colonizers, secondary soil generation, stable climax forest models.' },
    { id: 'bio-21', subject: 'Biology', category: 'Ecology', topic: 'General Freshwater Biomes', priority: 'Medium', description: 'Lentic vs lotic flow speeds, thermal turnover patterns, oxygen replenishment curves.' },

    // Genetics
    { id: 'bio-22', subject: 'Biology', category: 'Genetics', topic: 'Central Dogma of Molecular Biology', priority: 'Extreme', description: 'DNA replication forks, transcription factor activations, peptide synthesis at ribosomes.' },
    { id: 'bio-23', subject: 'Biology', category: 'Genetics', topic: 'Mendelian Mode of Inheritance', priority: 'Extreme', description: 'Monohybrid/dihybrid Punnett distribution calculations, separate assortment lines.' },
    { id: 'bio-24', subject: 'Biology', category: 'Genetics', topic: 'Non-Mendelian Mode of Inheritance', priority: 'Extreme', description: 'Incomplete dominance, RBC codominance, linked traits mapping, polygenic inheritance.' },
    { id: 'bio-25', subject: 'Biology', category: 'Genetics', topic: 'Pedigree Analysis', priority: 'Extreme', description: 'Identifying autosomal dominant, autosomal recessive, and X-linked carrier lineages.' },
    { id: 'bio-26', subject: 'Biology', category: 'Genetics', topic: 'Chromosomes', priority: 'High', description: 'Ploidy counts, karyotype structures, nondisjunction anomalies (Down, Turner, Klinefelter).' },

    // Plant Physiology
    { id: 'bio-27', subject: 'Biology', category: 'Plant Physiology', topic: 'Parts of the Plant', priority: 'High', description: 'Stomata gas checks, xylem transpiration suction, phloem translocation routes.' },
    { id: 'bio-28', subject: 'Biology', category: 'Plant Physiology', topic: 'Kind of Plants', priority: 'High', description: 'Monocot vs Dicot leaf configurations, vascular cambium differences, bryophytes.' },
    { id: 'bio-29', subject: 'Biology', category: 'Plant Physiology', topic: 'Plant Hormones', priority: 'Extreme', description: 'Auxins growth, phototropism, gibberellins dormancy override, ethylene gas ripening.' },
    { id: 'bio-30', subject: 'Biology', category: 'Plant Physiology', topic: 'Reaction to Stimulus', priority: 'Medium', description: 'Gravitropism, thigmotropic touch reactions, rapid turgor folding.' },
    { id: 'bio-31', subject: 'Biology', category: 'Plant Physiology', topic: 'Plant Bacteria Symbiosis', priority: 'High', description: 'Rhizobium cells in root nodules, nitrogenase conversions, mycorrhizae absorption nodes.' },
    { id: 'bio-32', subject: 'Biology', category: 'Plant Physiology', topic: 'Photoperiodism', priority: 'Medium', description: 'Short-day vs long-day thresholds, phytochrome red/far-red light conversion clock controls.' },

    // Taxonomy
    { id: 'bio-33', subject: 'Biology', category: 'Taxonomy', topic: '5 Kingdom Scheme', priority: 'High', description: 'Monera, Protista, Fungi, Plantae, Animalia cellular characteristics, nutrition and vascular systems.' },
    { id: 'bio-34', subject: 'Biology', category: 'Taxonomy', topic: '3 Domains of Life', priority: 'High', description: 'Archaea extremophiles, Bacteria, Eukarya cell membranes and genetic differences.' },

    // Ontogeny
    { id: 'bio-35', subject: 'Biology', category: 'Ontogeny', topic: 'Growth and Development', priority: 'High', description: 'Embryonic gastrulation germ layers: ectoderm (neural), mesoderm (muscle/blood), endoderm (gut tissue Linings).' },

    // --- CHEMISTRY (51 topics) ---
    // Matter
    { id: 'chem-1', subject: 'Chemistry', category: 'Matter', topic: 'Properties', priority: 'Extreme', description: 'Physical vs chemical properties of materials, phase transition temperature milestones.' },
    { id: 'chem-2', subject: 'Chemistry', category: 'Matter', topic: 'Intensive and Extensive Properties', priority: 'Extreme', description: 'Distinguishing mass-independent properties (density, boiling point) from mass-dependent properties (heat, weight, volume).' },
    { id: 'chem-3', subject: 'Chemistry', category: 'Matter', topic: 'Types of Matter', priority: 'High', description: 'Pure substances (elements and compounds), homogeneous vs heterogeneous mixtures, filtration methods.' },

    // Atoms
    { id: 'chem-4', subject: 'Chemistry', category: 'Atoms', topic: 'Atomic Theory of Matter', priority: 'High', description: "Dalton's postulates, conservation of mass, definite and multiple proportions laws." },
    { id: 'chem-5', subject: 'Chemistry', category: 'Atoms', topic: 'Atomic Models', priority: 'High', description: 'Evolution of atomic paradigms from Thomson plumb pudding, Rutherford gold foil alpha dispersals, to Bohr energy level shells.' },
    { id: 'chem-6', subject: 'Chemistry', category: 'Atoms', topic: 'Components of an Atom', priority: 'Extreme', description: 'Protons, neutrons, electrons, isotopes, atomic numbers, atomic weights, mass defect.' },
    { id: 'chem-7', subject: 'Chemistry', category: 'Atoms', topic: 'Properties of an Atom', priority: 'Medium', description: 'Ionic radius, effective nuclear charge, shielding effect, atomic size metrics.' },
    { id: 'chem-8', subject: 'Chemistry', category: 'Atoms', topic: 'Electronic Configuration', priority: 'Extreme', description: "Aufbau principle, Hund's rule, Pauli exclusion rule, writing quantum subshell sequences (s, p, d, f)." },
    { id: 'chem-9', subject: 'Chemistry', category: 'Atoms', topic: 'Quantum Mechanics', priority: 'High', description: 'Schrödinger wave equation significance, quantum numbers (n, l, ml, ms) characterizing electron probabilities.' },

    // Elements
    { id: 'chem-10', subject: 'Chemistry', category: 'Elements', topic: 'Periodic Table of Elements', priority: 'Extreme', description: 'Periodic trends: Electronegativity, ionization energy, atomic radius, electron affinity, metal activity.' },

    // Compounds
    { id: 'chem-11', subject: 'Chemistry', category: 'Compounds', topic: 'Oxidation State', priority: 'Extreme', description: 'Rules for assigning oxidation numbers, neutral compounds vs polyatomic ions.' },
    { id: 'chem-12', subject: 'Chemistry', category: 'Compounds', topic: 'Types of Chemical Bonds', priority: 'Extreme', description: 'Ionic, covalent (polar vs nonpolar), metallic bonding properties, lattice energies.' },
    { id: 'chem-13', subject: 'Chemistry', category: 'Compounds', topic: 'Representation of Compounds', priority: 'High', description: 'Lewis dot diagrams, octet guidelines, formal charges, resonance contributors.' },
    { id: 'chem-14', subject: 'Chemistry', category: 'Compounds', topic: 'Molecular Geometry', priority: 'Extreme', description: 'VSEPR models showing bond angles (linear, trigonal planar, tetrahedral, bent).' },
    { id: 'chem-15', subject: 'Chemistry', category: 'Compounds', topic: 'Intermolecular Forces', priority: 'Extreme', description: 'London dispersion, dipole-dipole interactions, hydrogen bonding, ion-dipole forces, impact on boiling points.' },
    { id: 'chem-16', subject: 'Chemistry', category: 'Compounds', topic: 'Relationships of Organic Compounds', priority: 'High', description: 'Boiling point, melting point, vapor pressure relative to functional types, carbon chain length.' },

    // Gases
    { id: 'chem-17', subject: 'Chemistry', category: 'Gases', topic: 'Ideal Gas Law Concept', priority: 'Extreme', description: 'PV = nRT equations, kinetic molecular theory of gases, effusion and diffusion processes.' },
    { id: 'chem-18', subject: 'Chemistry', category: 'Gases', topic: 'Gas Laws', priority: 'Extreme', description: "Boyle's, Charles's, Gay-Lussac's, Avogadro's, Dalton's partial pressures, and Graham's effusion laws." },

    // Chemical Reactions
    { id: 'chem-19', subject: 'Chemistry', category: 'Chemical Reactions', topic: 'Types of Reactions', priority: 'High', description: 'Synthesis, decomposition, single displacement, double displacement (precipitation), acid-base neutralizations.' },
    { id: 'chem-20', subject: 'Chemistry', category: 'Chemical Reactions', topic: 'Fundamental Law of Chemical Reactions', priority: 'High', description: 'Law of conservation of mass, balancing raw chemical equations.' },
    { id: 'chem-21', subject: 'Chemistry', category: 'Chemical Reactions', topic: 'Redox Reactions', priority: 'Extreme', description: 'Oxidizing and reducing agents, balancing redox half-reactions in acidic or basic solutions.' },
    { id: 'chem-22', subject: 'Chemistry', category: 'Chemical Reactions', topic: 'Stoichiometry', priority: 'Extreme', description: 'Mole ratios, limiting reactants determination, theoretical yield, and actual percent yield ratios.' },

    // Chemical Equilibrium
    { id: 'chem-23', subject: 'Chemistry', category: 'Chemical Equilibrium', topic: 'Properties of Exothermic Reaction', priority: 'High', description: 'Negative enthalpy shift (ΔH < 0), heat release, energy diagrams.' },
    { id: 'chem-24', subject: 'Chemistry', category: 'Chemical Equilibrium', topic: 'Properties of Endothermic Reactions', priority: 'High', description: 'Positive enthalpy shift (ΔH > 0), heat absorption, bond-breaking energy requirements.' },
    { id: 'chem-25', subject: 'Chemistry', category: 'Chemical Equilibrium', topic: "Le Chatelier's Principles", priority: 'Extreme', description: 'Predicting equilibrium shifts due to pressure changes, temperature shifts, and concentration perturbations.' },

    // Acids and Bases
    { id: 'chem-26', subject: 'Chemistry', category: 'Acids and Bases', topic: 'Definitions', priority: 'Extreme', description: 'Arrhenius, Brønsted-Lowry, and Lewis definitions of acids and bases, conjugate pairs.' },
    { id: 'chem-27', subject: 'Chemistry', category: 'Acids and Bases', topic: 'Properties', priority: 'High', description: 'Taste, touch, litmus reaction tests, electrical conductivity in solutions.' },
    { id: 'chem-28', subject: 'Chemistry', category: 'Acids and Bases', topic: 'Strong and Weak Acids and Bases', priority: 'Extreme', description: 'Common inorganic strong acids list, carboxyl weak acids, amine bases, dissociation constant values.' },
    { id: 'chem-29', subject: 'Chemistry', category: 'Acids and Bases', topic: 'Computations', priority: 'Extreme', description: 'pH, pOH, Ka, Kb, Kw constants, hydronium ion concentration calculations.' },
    { id: 'chem-30', subject: 'Chemistry', category: 'Acids and Bases', topic: 'Dissociation of Acids and Bases', priority: 'High', description: 'Percent ionization, polyprotic acid step-wise dissociation thresholds.' },

    // Thermochemistry
    { id: 'chem-31', subject: 'Chemistry', category: 'Thermochemistry', topic: 'Thermal Properties of Matter', priority: 'High', description: 'Interpreting heating curves, phase shifts, state phase thermodynamics.' },
    { id: 'chem-32', subject: 'Chemistry', category: 'Thermochemistry', topic: 'Heat and its Effects', priority: 'Extreme', description: 'Specific heat formulas, calorimeter measurements, enthalpy of reactions, Hess\'s Law.' },

    // Concentrations of Solutions
    { id: 'chem-33', subject: 'Chemistry', category: 'Concentrations of Solutions', topic: 'Molality', priority: 'High', description: 'Moles of solute per kilogram of solvent (m), temperature independence.' },
    { id: 'chem-34', subject: 'Chemistry', category: 'Concentrations of Solutions', topic: 'Molarity', priority: 'Extreme', description: 'Moles of solute per liter of solution (M), temperature dependence.' },
    { id: 'chem-35', subject: 'Chemistry', category: 'Concentrations of Solutions', topic: 'Normality', priority: 'High', description: 'Equivalent weights per liter of solution (N), acid-base neutralizations equivalents.' },

    // Organic Chemistry
    { id: 'chem-36', subject: 'Chemistry', category: 'Organic Chemistry', topic: 'Common Properties', priority: 'High', description: 'Covalent character, lower solubility in polar water, lower melting and boiling points.' },
    { id: 'chem-37', subject: 'Chemistry', category: 'Organic Chemistry', topic: 'Resonance and Hybridization', priority: 'High', description: 'Carbon sp, sp2, sp3 orbital mixing geometries, localized vs delocalized bonding.' },
    { id: 'chem-38', subject: 'Chemistry', category: 'Organic Chemistry', topic: 'Isomers', priority: 'Extreme', description: 'Structural, geometric (cis/trans), stereoisomer chiral configurations (enantiomers, diastereomers).' },
    { id: 'chem-39', subject: 'Chemistry', category: 'Organic Chemistry', topic: 'Saturated hydrocarbons', priority: 'High', description: 'Alkanes, cycloalkanes nomenclature rules, free-radical halogenation reactions.' },
    { id: 'chem-40', subject: 'Chemistry', category: 'Organic Chemistry', topic: 'Unsaturated hydrocarbons', priority: 'Extreme', description: 'Alkenes, alkynes naming, electrophilic addition reactions, Markovnikov orientation.' },
    { id: 'chem-41', subject: 'Chemistry', category: 'Organic Chemistry', topic: 'Aromatic compounds', priority: 'High', description: 'Hückel rule of aromaticity (4n+2), benzene nucleophilic/electrophilic aromatic substitutions.' },
    { id: 'chem-42', subject: 'Chemistry', category: 'Organic Chemistry', topic: 'Functional Groups', priority: 'Extreme', description: 'Identifying alcohols, ketones, aldehydes, esters, ethers, carboxylic acids, amines, amides.' },

    // Biochemistry
    { id: 'chem-43', subject: 'Chemistry', category: 'Biochemistry', topic: 'Proteins', priority: 'Extreme', description: 'Amino acid side chains, peptide bonds, primary to quaternary protein structure hierarchy.' },
    { id: 'chem-44', subject: 'Chemistry', category: 'Biochemistry', topic: 'Carbohydrates', priority: 'Extreme', description: 'Alpha/beta glycosidic bounds, monosaccharides (reducing status), sugar structures.' },
    { id: 'chem-45', subject: 'Chemistry', category: 'Biochemistry', topic: 'Lipids', priority: 'High', description: 'Triacylglycerols, fatty acids, cell membrane phospholipids, saponification values.' },
    { id: 'chem-46', subject: 'Chemistry', category: 'Biochemistry', topic: 'Nucleic Acids', priority: 'High', description: 'Purines vs pyrimidines, DNA vs RNA nucleotide composition, phosphodiester backbones.' },
    { id: 'chem-47', subject: 'Chemistry', category: 'Biochemistry', topic: 'Biochemical Tests', priority: 'Extreme', description: 'Biuret (proteins), Molisch (carbs), Benedicts (reducing sugars), Iodine starch color tests.' },

    // Others (Chemistry)
    { id: 'chem-48', subject: 'Chemistry', category: 'Others', topic: 'Chemical Kinetics', priority: 'High', description: 'Reaction orders, rate law definitions, activation energy, catalyst acceleration.' },
    { id: 'chem-49', subject: 'Chemistry', category: 'Others', topic: 'Dissociation of Compounds', priority: 'Medium', description: 'Electrolyte ionization patterns, van \'t Hoff factor calculations.' },
    { id: 'chem-50', subject: 'Chemistry', category: 'Others', topic: 'Radioactive Decay', priority: 'High', description: 'Alpha, beta, and gamma radiation emissions, nuclear half-life decay equations.' },
    { id: 'chem-51', subject: 'Chemistry', category: 'Others', topic: 'Colligative Properties of Solutions', priority: 'Extreme', description: 'Boiling point elevation, freezing point depression, osmotic pressure calculations.' },

    // --- PHYSICS (41 topics) ---
    // Motion
    { id: 'phys-1', subject: 'Physics', category: 'Motion', topic: 'Linear Motion', priority: 'Extreme', description: 'Kinematic formulas of constant acceleration, displacement, average velocity.' },
    { id: 'phys-2', subject: 'Physics', category: 'Motion', topic: 'Free Fall Motion', priority: 'High', description: 'Acceleration of gravity, upward vertical launches, terminal air velocities.' },
    { id: 'phys-3', subject: 'Physics', category: 'Motion', topic: 'Projectile', priority: 'Extreme', description: 'Vector horizontal vx speed constant vs vertical vy gravity accelerations, flight ranges.' },
    { id: 'phys-4', subject: 'Physics', category: 'Motion', topic: 'Uniform Circular Motion', priority: 'Extreme', description: 'Centripetal acceleration (v^2/r), rotational speeds, periods and frequencies.' },
    { id: 'phys-5', subject: 'Physics', category: 'Motion', topic: 'Newton’s Law of Universal Gravitation', priority: 'Medium', description: 'Inverse-square force F = GMm/r^2, surface gravity formulas.' },
    { id: 'phys-6', subject: 'Physics', category: 'Motion', topic: 'Laws of Motion', priority: 'Extreme', description: 'Law of inertia, F = ma, action-reactions, static vs kinetic sliding frictions.' },
    { id: 'phys-7', subject: 'Physics', category: 'Motion', topic: 'Kepler’s Law of Planetary Orbits', priority: 'Medium', description: 'Elliptical orbits, equal sweep times, T^2 orbital harmonic proportion ratios.' },

    // Energy
    { id: 'phys-8', subject: 'Physics', category: 'Energy', topic: 'Potential', priority: 'Extreme', description: 'mgh gravitational and 1/2 k x^2 spring potential displacements.' },
    { id: 'phys-9', subject: 'Physics', category: 'Energy', topic: 'Kinetic', priority: 'Extreme', description: 'Translational kinetic energy 1/2 m v^2, net Work-Energy theorem conversions.' },

    // Fluids
    { id: 'phys-10', subject: 'Physics', category: 'Fluids', topic: 'Density', priority: 'High', description: 'Mass to volume density profiles, temperature volumes.' },
    { id: 'phys-11', subject: 'Physics', category: 'Fluids', topic: 'Specific Gravity', priority: 'High', description: 'Evaluation of non-fluid densities relative to pure water fractions.' },
    { id: 'phys-12', subject: 'Physics', category: 'Fluids', topic: 'Pressure', priority: 'Extreme', description: 'Hydrostatic fluids pressures (P = ρgh), barometric atmosphere units (pascal, torr).' },
    { id: 'phys-13', subject: 'Physics', category: 'Fluids', topic: "Pascal’s Law", priority: 'High', description: 'Equal pressure distribution in closed fluids, hydraulic leverage multiplication.' },
    { id: 'phys-14', subject: 'Physics', category: 'Fluids', topic: 'Buoyant Force', priority: 'Extreme', description: 'Archimedes Principle (Fb = weight of liquid volume displaced), floating densities.' },
    { id: 'phys-15', subject: 'Physics', category: 'Fluids', topic: "Bernoulli’s Principle", priority: 'Extreme', description: 'Ventu effect, pipe narrowing speeds, pressure drops during speed increases.' },
    { id: 'phys-16', subject: 'Physics', category: 'Fluids', topic: "Torricelli’s Theorem", priority: 'High', description: 'Fluid efflux tank leak speeds (v = sqrt(2gh)) calculations.' },
    { id: 'phys-17', subject: 'Physics', category: 'Fluids', topic: 'Venturi Effect', priority: 'Medium', description: 'Pressure gauges in widening and narrowing pipe sections.' },

    // Thermal Processes
    { id: 'phys-18', subject: 'Physics', category: 'Thermal Processes', topic: 'Conduction', priority: 'High', description: 'Heat transfers through direct atom contact, solid insulator materials.' },
    { id: 'phys-19', subject: 'Physics', category: 'Thermal Processes', topic: 'Convection', priority: 'High', description: 'Convective fluid loop currents, hot rising pockets.' },
    { id: 'phys-20', subject: 'Physics', category: 'Thermal Processes', topic: 'Radiation', priority: 'Medium', description: 'EM wave heat discharges, Stefan Boltzmann light absorptions.' },

    // Electricity
    { id: 'phys-21', subject: 'Physics', category: 'Electricity', topic: "Coulomb’s Law", priority: 'Extreme', description: 'Electrostatic force inverse-square grid, charges repulsion / attraction.' },
    { id: 'phys-22', subject: 'Physics', category: 'Electricity', topic: "Ohm’s Law", priority: 'Extreme', description: 'Voltage-current-resistance balances, length-area wire resistivity factors.' },
    { id: 'phys-23', subject: 'Physics', category: 'Electricity', topic: 'Resistors', priority: 'Extreme', description: 'Equivalent series (sum) and parallel (reciprocals) configurations, heat dissipation.' },
    { id: 'phys-24', subject: 'Physics', category: 'Electricity', topic: 'Capacitors', priority: 'High', description: 'Charge plates capacities C = Q/V, parallel series networks.' },

    // Magnets
    { id: 'phys-25', subject: 'Physics', category: 'Magnets', topic: 'Magnetic Field', priority: 'High', description: 'Forces on charges moving in fields, right hand laws.' },
    { id: 'phys-26', subject: 'Physics', category: 'Magnets', topic: 'Magnetic Force', priority: 'High', description: 'F = qvB sin(theta), deflection directions, motor mechanics.' },

    // Waves and Optics
    { id: 'phys-27', subject: 'Physics', category: 'Waves and Optics', topic: 'Electromagnetic Spectrum', priority: 'High', description: 'Radio, micro, IR, visual ray, UV, gamma waves spectrum properties.' },
    { id: 'phys-28', subject: 'Physics', category: 'Waves and Optics', topic: 'Properties of Waves', priority: 'High', description: 'Amplitude, frequency, wave speeds v = fλ, constructive / destructive overlaps.' },
    { id: 'phys-29', subject: 'Physics', category: 'Waves and Optics', topic: 'Mirrors', priority: 'Extreme', description: 'Concave magnifying mirrors vs convex passenger mirror virtual upright views.' },
    { id: 'phys-30', subject: 'Physics', category: 'Waves and Optics', topic: 'Lenses', priority: 'Extreme', description: 'Converging lenses (farsightedness) vs diverging lenses (nearsightedness), magnification formulas.' },
    { id: 'phys-31', subject: 'Physics', category: 'Waves and Optics', topic: 'Light Waves', priority: 'High', description: 'Refraction Snell Law indices of refraction, polarization scopes.' },

    // Nuclear Physics
    { id: 'phys-32', subject: 'Physics', category: 'Nuclear Physics', topic: 'Radioactivity', priority: 'Medium', description: 'Atomic mass decays, alpha beta gammas, radiation counts.' },

    // Others (Physics)
    { id: 'phys-33', subject: 'Physics', category: 'Others', topic: 'Work', priority: 'High', description: 'Product of constant force and directional distance, angles (F d cos theta).' },
    { id: 'phys-34', subject: 'Physics', category: 'Others', topic: 'Power', priority: 'High', description: 'Energy consumption speeds, Work over time ratios.' },
    { id: 'phys-35', subject: 'Physics', category: 'Others', topic: 'Momentum', priority: 'High', description: 'Product mass & velocity (p = mv), conservation systems in car crash drill tests.' },
    { id: 'phys-36', subject: 'Physics', category: 'Others', topic: 'Impulse', priority: 'High', description: 'I = F * t = change in momentum, sports impact absorbers.' },
    { id: 'phys-37', subject: 'Physics', category: 'Others', topic: 'Laws of Thermodynamics', priority: 'High', description: 'Conservation of energy, entropy laws, thermal balances.' },
    { id: 'phys-38', subject: 'Physics', category: 'Others', topic: 'Heat Capacity', priority: 'Extreme', description: 'Calorimetry specific heat equation Q = m c ΔT.' },
    { id: 'phys-39', subject: 'Physics', category: 'Others', topic: 'Change in Phase', priority: 'High', description: 'Latent heat requirements for melting/vaporization cycles.' },
    { id: 'phys-40', subject: 'Physics', category: 'Others', topic: 'Electromagnetism', priority: 'Medium', description: "Faradays loop inductions, motors flux switches." },
    { id: 'phys-41', subject: 'Physics', category: 'Others', topic: 'Light and Sound Waves', priority: 'High', description: 'Sound decibel amplitudes, Doppler pitches shifts for sirens.' },

    // --- SOCIAL SCIENCES (22 topics) ---
    // Sociology & Anthropology
    { id: 'ss-1', subject: 'Social Science', category: 'Sociology & Anthropology', topic: 'Role and Scope of Sociology', priority: 'High', description: 'Sociological imagination concept, scientific human interactions analysis, micro- vs macro sociological perspectives.' },
    { id: 'ss-2', subject: 'Social Science', category: 'Sociology & Anthropology', topic: 'Elements of Sociological Analysis', priority: 'Extreme', description: 'Cultural components, values, norms, folkways vs mores, taboos, and ethnocentrism vs cultural relativism.' },
    { id: 'ss-3', subject: 'Social Science', category: 'Sociology & Anthropology', topic: 'Social Institutions', priority: 'Extreme', description: 'The family structures, marital configurations, religious, economic, and educational roles.' },
    { id: 'ss-4', subject: 'Social Science', category: 'Sociology & Anthropology', topic: 'Economy and Work', priority: 'Medium', description: 'Capitalist vs socialist models, historical shifts in industrial labor divisions.' },
    { id: 'ss-5', subject: 'Social Science', category: 'Sociology & Anthropology', topic: 'Social Change and Current Trends', priority: 'High', description: 'Urbanizations, demographic transitions, populations migrations.' },
    { id: 'ss-6', subject: 'Social Science', category: 'Sociology & Anthropology', topic: 'Social Chance and Future Trends', priority: 'Medium', description: 'Automation impacts, technological social interactions updates.' },
    { id: 'ss-7', subject: 'Social Science', category: 'Sociology & Anthropology', topic: 'Important Figures in the Development', priority: 'Extreme', description: 'Founding parents: Comte, Marx (conflict theory), Durkheim (anomie, functionals), Weber (rationalization).' },
    { id: 'ss-8', subject: 'Social Science', category: 'Sociology & Anthropology', topic: 'Sociological Terms', priority: 'Extreme', description: 'Status (ascribed, achieved, master status), social roles, stratification channels, deviance, control.' },

    // Psychology
    { id: 'ss-9', subject: 'Social Science', category: 'Psychology', topic: 'Schools of Thought', priority: 'Extreme', description: 'Historical paradigms: Structuralism, Functionalism, Behaviorism, Gestalt psychology, Psychoanalysis.' },
    { id: 'ss-10', subject: 'Social Science', category: 'Psychology', topic: 'Contemporary Psychological Perspectives', priority: 'High', description: 'Cognitive views, biological models, humanistic perspectives (self-actualization).' },
    { id: 'ss-11', subject: 'Social Science', category: 'Psychology', topic: 'General Characteristics', priority: 'Medium', description: 'Scientific experimental research methods and survey analyses.' },
    { id: 'ss-12', subject: 'Social Science', category: 'Psychology', topic: 'Factual Experiences', priority: 'Medium', description: 'Sensory feedbacks, emotional loops, learning behaviors.' },
    { id: 'ss-13', subject: 'Social Science', category: 'Psychology', topic: 'Nervous System', priority: 'Extreme', description: 'Brain cerebral lobes localization (frontal, temporal, parietal, occipital), amygdala, hippocampus.' },
    { id: 'ss-14', subject: 'Social Science', category: 'Psychology', topic: 'Sensation and Perception', priority: 'Extreme', description: 'Absolute thresholds, top-down vs bottom-up pathways, Gestalt rules of visual organization.' },
    { id: 'ss-15', subject: 'Social Science', category: 'Psychology', topic: 'Consciousness', priority: 'High', description: 'Sleep cycles phases, REM phases characteristics, circadian rhythms.' },
    { id: 'ss-16', subject: 'Social Science', category: 'Psychology', topic: 'Psychoactive Drugs', priority: 'High', description: 'Depressants, stimulants, opiates impacts at neuroreceptors, dopamine levels.' },
    { id: 'ss-17', subject: 'Social Science', category: 'Psychology', topic: 'Memories', priority: 'Extreme', description: 'Short-term magic counts, sensory holding, procedural vs declarative storages, amnesias.' },
    { id: 'ss-18', subject: 'Social Science', category: 'Psychology', topic: 'Motivation and Emotions', priority: 'Extreme', description: 'Core theories: James-Lange, Cannon-Bard, Schachter Two-Factor cognitive appraisal pathways.' },
    { id: 'ss-19', subject: 'Social Science', category: 'Psychology', topic: 'Principles of Growth and Development', priority: 'Extreme', description: 'Piaget (stages of cognitive child development), Erikson (psychosocial conflicts, identity), Kohlberg (moral phases).' },
    { id: 'ss-20', subject: 'Social Science', category: 'Psychology', topic: 'Learning', priority: 'Extreme', description: 'Classical conditioning (extinction, recovery), Operant conditioning (reinforcements schedules), Observational bands.' },
    { id: 'ss-21', subject: 'Social Science', category: 'Psychology', topic: 'Psychopathologies and Therapy', priority: 'Extreme', description: 'Core DSM criteria (anxieties, depression, bipolar, schizoid), behavioral vs psychodynamic therapies.' },
    { id: 'ss-22', subject: 'Social Science', category: 'Psychology', topic: 'Social Psychology and Behavior', priority: 'Extreme', description: 'Obedience Milgram shock tests, conformity Asch spacing drills, cognitive dissonances.' }
  ];

  // Helper functions for status toggling
  const handleToggleStatus = (id: string) => {
    setTopicStatuses(prev => {
      const current = prev[id] || 'not-started';
      let next: TopicStatus = 'not-started';
      if (current === 'not-started') next = 'in-progress';
      else if (current === 'in-progress') next = 'completed';
      else next = 'not-started';
      return {
        ...prev,
        [id]: next
      };
    });
  };

  const handleSetAllStatus = (status: TopicStatus, subjectFilter?: string) => {
    setTopicStatuses(prev => {
      const updated = { ...prev };
      syllabus.forEach(item => {
        if (!subjectFilter || item.subject === subjectFilter) {
          updated[item.id] = status;
        }
      });
      return updated;
    });
  };

  const handleResetSubject = (subjectName: string) => {
    if (window.confirm(`Are you sure you want to reset your checklist progress for ${subjectName}?`)) {
      setTopicStatuses(prev => {
        const updated = { ...prev };
        syllabus.forEach(item => {
          if (item.subject === subjectName) {
            updated[item.id] = 'not-started';
          }
        });
        return updated;
      });
    }
  };

  // Compute stats
  const getSubjectStats = (subject: 'Biology' | 'Chemistry' | 'Physics' | 'Social Science') => {
    const items = syllabus.filter(t => t.subject === subject);
    const total = items.length;
    const completed = items.filter(t => topicStatuses[t.id] === 'completed').length;
    const inProgress = items.filter(t => topicStatuses[t.id] === 'in-progress').length;
    const notStarted = total - completed - inProgress;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const inProgressPercentage = total > 0 ? Math.round((inProgress / total) * 100) : 0;

    return { total, completed, inProgress, notStarted, percentage, inProgressPercentage };
  };

  const totalSyllabusCount = syllabus.length;
  const totalCompletedCount = syllabus.filter(t => topicStatuses[t.id] === 'completed').length;
  const totalInProgressCount = syllabus.filter(t => topicStatuses[t.id] === 'in-progress').length;
  const overallPercentage = totalSyllabusCount > 0 ? Math.round((totalCompletedCount / totalSyllabusCount) * 100) : 0;

  // Filter topics
  const filteredSyllabus = syllabus.filter(t => {
    const matchesSearch = 
      t.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === 'All' || t.subject === selectedSubject;
    const matchesCategory = !selectedCategoryFilter || t.category === selectedCategoryFilter;
    const matchesPriority = selectedPriorityFilter === 'All' || t.priority === selectedPriorityFilter;
    
    const isWeakspot = topicStatuses[t.id] !== 'completed';
    const matchesWeakspotsOnly = !showOnlyWeakspots || isWeakspot;

    return matchesSearch && matchesSubject && matchesCategory && matchesPriority && matchesWeakspotsOnly;
  });

  // Extract categoric segments for filtering
  const activeSubjectCategories = [
    ...new Set(syllabus.filter(t => selectedSubject === 'All' || t.subject === selectedSubject).map(t => t.category))
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Hero Card with Cutesy Banner Style */}
      <div className={`p-6 sm:p-8 rounded-[30px] border ${themeCfg.borderClass} ${themeCfg.cardBg} transition-all duration-300 relative overflow-hidden shadow-sm`}>
        {/* Playful background decorative shapes */}
        <div className="absolute right-0 top-0 -mr-6 -mt-6 w-32 h-32 bg-[#FFECEF]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -ml-12 -mb-12 w-48 h-48 bg-[#FAF0FF]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-800 rounded-full border border-sky-100 font-extrabold text-[10px] uppercase tracking-wider">
              <Sparkle className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
              <span>NMAT REAL-TIME SYLLABUS</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-black ${themeCfg.textPrimary} tracking-tight`}>
              NMAT Topics {themeCfg.emoji}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl leading-relaxed">
              Consolidated checklists for Biology, Chemistry, Physics, and Social Sciences to lock down your high-yield board readiness.
            </p>
          </div>

          {/* Core progress circle */}
          <div className="flex-shrink-0 bg-slate-50 border border-slate-100 p-4 rounded-3xl flex items-center gap-4 shadow-3xs">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Outer SVG ring */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="#E2E8F0"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke={themeCfg.id === 'cozy-bear' ? '#1b4cb4' : '#E56A8F'}
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 34}
                  strokeDashoffset={2 * Math.PI * 34 * (1 - overallPercentage / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="text-center z-10">
                <span className="text-lg font-black text-slate-800 tracking-tight leading-none">
                  {overallPercentage}%
                </span>
                <span className="text-[9px] block text-slate-400 font-bold leading-none uppercase">MASTERED</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-700">Total Progress</p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase leading-none">
                {totalCompletedCount} of {totalSyllabusCount} Completed
              </p>
              <p className="text-[10px] text-amber-600 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-md inline-block font-bold">
                {totalInProgressCount} in active review
              </p>
            </div>
          </div>
        </div>
      </div>

      <>
          {/* 2. Visual Map of Readiness Section */}
          <div className={`p-6 rounded-[28px] border border-slate-100 bg-white shadow-xs space-y-6 relative`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#5D824B]" />
                  <span>Interactive Map of Subject Readiness</span>
                </h2>
                <p className="text-[11px] text-slate-450">A visual outline of your domain knowledge and active study levels. Click a category block to filter the checklist.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Legend:</span>
                <div className="flex items-center gap-3 text-[10px] font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" /> Completed</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" /> In-Progress</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-200 block" /> Not Started</span>
                </div>
              </div>
            </div>

            {/* The 4 Subjects Map - Rings and Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Biology', emoji: '🌿', color: 'emerald', key: 'Biology', desc: 'Cell cycle, metabolic cascades & genetic inheritance' },
                { name: 'Chemistry', emoji: '🧪', color: 'blue', key: 'Chemistry', desc: 'Gas laws, atomic quantum states & proteins' },
                { name: 'Physics', emoji: '⚡', color: 'purple', key: 'Physics', desc: 'Kinematic velocities, fluid forces & optic structures' },
                { name: 'Social Science', emoji: '🧠', color: 'pink', key: 'Social Science', desc: 'Sociological trends & psychological perspectives' }
              ].map(subject => {
                const stats = getSubjectStats(subject.key as any);
                const isSelected = selectedSubject === subject.key;
                
                // Color map for rings
                const ringColors: Record<string, string> = {
                  emerald: 'stroke-emerald-550 text-emerald-600 bg-emerald-50 border-emerald-100',
                  blue: 'stroke-sky-550 text-sky-600 bg-sky-50 border-sky-100',
                  purple: 'stroke-purple-550 text-purple-600 bg-purple-50 border-purple-100',
                  pink: 'stroke-pink-550 text-pink-600 bg-pink-50 border-pink-100'
                };

                return (
                  <div 
                    key={subject.key}
                    onClick={() => {
                      setSelectedSubject(isSelected ? 'All' : (subject.key as any));
                      setSelectedCategoryFilter(null);
                    }}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'border-slate-800 bg-slate-50/50 ring-2 ring-slate-100 shadow-2xs' 
                        : 'bg-white border-slate-100 hover:border-slate-250'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xl inline-block mb-1">{subject.emoji}</span>
                        <h3 className="font-extrabold text-xs sm:text-sm text-slate-800">{subject.name}</h3>
                        <p className="text-[10px] text-slate-400 leading-snug mt-1 font-medium">{subject.desc}</p>
                      </div>

                      {/* SVG progress ring */}
                      <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <svg className="absolute w-full h-full transform -rotate-90">
                          <circle cx="24" cy="24" r="18" stroke="#f1f5f9" strokeWidth="3.5" fill="transparent" />
                          <circle 
                            cx="24" 
                            cy="24" 
                            r="18" 
                            className={`transition-all duration-700 ease-out fill-transparent ${
                              subject.color === 'emerald' ? 'stroke-emerald-500' :
                              subject.color === 'blue' ? 'stroke-sky-500' :
                              subject.color === 'purple' ? 'stroke-purple-500' :
                              'stroke-pink-500'
                            }`}
                            strokeWidth="3.5" 
                            strokeDasharray={2 * Math.PI * 18}
                            strokeDashoffset={2 * Math.PI * 18 * (1 - stats.percentage / 100)}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="text-[10px] font-black text-slate-700">{stats.percentage}%</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-450">{stats.completed}/{stats.total} Mastered</span>
                      {stats.inProgress > 0 && (
                        <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                          {stats.inProgress} active
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Category Heatmap Constellation Map */}
            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Grid className="w-3.5 h-3.5 text-slate-400" />
                  <span>Syllabus Category Heat Grid: {selectedSubject === 'All' ? 'All Subjects' : selectedSubject}</span>
                </h3>
                {selectedCategoryFilter && (
                  <button 
                    onClick={() => setSelectedCategoryFilter(null)}
                    className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 hover:bg-amber-100 px-2 py-0.5 rounded cursor-pointer transition-all"
                  >
                    Clear Category Filter (x)
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {activeSubjectCategories.map(catName => {
                  // Get item array belonging to this category
                  const catItems = syllabus.filter(t => t.category === catName && (selectedSubject === 'All' || t.subject === selectedSubject));
                  const catTotal = catItems.length;
                  const catCompleted = catItems.filter(t => topicStatuses[t.id] === 'completed').length;
                  const catInProgress = catItems.filter(t => topicStatuses[t.id] === 'in-progress').length;
                  
                  // Determine heat status color for category label background
                  let activeBorder = 'border-slate-200 bg-white hover:border-slate-300';
                  if (selectedCategoryFilter === catName) {
                    activeBorder = 'border-slate-400 bg-slate-100 shadow-3xs ring-1 ring-slate-200';
                  }

                  return (
                    <div 
                      key={catName}
                      onClick={() => setSelectedCategoryFilter(catName)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${activeBorder} flex flex-col justify-between`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <p className="text-[11px] font-black text-slate-700 line-clamp-1 leading-tight">{catName}</p>
                        <span className="text-[8px] font-extrabold bg-slate-100 px-1 py-0.5 rounded text-slate-500 flex-shrink-0">
                          {catCompleted}/{catTotal}
                        </span>
                      </div>

                      {/* Micro Heat Dot Matrix represent topics count */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {catItems.map(item => {
                          const itemStatus = topicStatuses[item.id] || 'not-started';
                          let dotColor = 'bg-slate-200 hover:bg-slate-300';
                          if (itemStatus === 'completed') dotColor = 'bg-emerald-550 shadow-xs shadow-emerald-200';
                          else if (itemStatus === 'in-progress') dotColor = 'bg-amber-400 shadow-xs shadow-amber-200 animate-pulse';

                          return (
                            <div 
                              key={item.id} 
                              title={`${item.topic} (${itemStatus.toUpperCase()})`}
                              className={`w-2.5 h-2.5 rounded-full ${dotColor} transition-all duration-300 transform hover:scale-125`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Controls and Filtering Suite */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* Main search and priority selector */}
              <div className="flex-1 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search biology pathways, gas laws, resistors, clinical terms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 text-xs bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all font-medium placeholder-slate-400"
                  />
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 bg-slate-50 p-1 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block ml-2">Priority:</span>
                  <div className="flex gap-1">
                    {['All', 'High', 'Medium', 'Extreme'].map((pr) => (
                      <button
                        key={pr}
                        type="button"
                        onClick={() => setSelectedPriorityFilter(pr as any)}
                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer ${
                          selectedPriorityFilter === pr 
                            ? 'bg-white text-slate-800 shadow-3xs border border-slate-200' 
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {pr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Controls triggers */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Switch for weakspots */}
                <button
                  type="button"
                  onClick={() => setShowOnlyWeakspots(!showOnlyWeakspots)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    showOnlyWeakspots 
                      ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-3xs'
                      : 'bg-white border-slate-100 text-slate-650 hover:bg-slate-50'
                  }`}
                  title="Filter to show uncompleted competencies needing study focus"
                >
                  <AlertCircle className={`w-4 h-4 ${showOnlyWeakspots ? 'text-amber-500' : 'text-slate-400'}`} />
                  <span>Weakspots Only</span>
                </button>

                {/* Reset entire subject */}
                {selectedSubject !== 'All' && (
                  <button
                    type="button"
                    onClick={() => handleResetSubject(selectedSubject)}
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-red-100 bg-red-50 text-red-800 hover:bg-red-100 hover:text-red-900 text-xs font-extrabold cursor-pointer transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
                    <span>Clear {selectedSubject}</span>
                  </button>
                )}

                {/* Mark All completed shortcut */}
                {selectedSubject !== 'All' && (
                  <button
                    type="button"
                    onClick={() => handleSetAllStatus('completed', selectedSubject)}
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-extrabold cursor-pointer transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Complete {selectedSubject}</span>
                  </button>
                )}
              </div>
            </div>

            {/* If filters exist, show state info */}
            {(selectedSubject !== 'All' || selectedCategoryFilter || showOnlyWeakspots || searchTerm) && (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span>Active Filters:</span>
                {selectedSubject !== 'All' && <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">{selectedSubject}</span>}
                {selectedCategoryFilter && <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">{selectedCategoryFilter}</span>}
                {showOnlyWeakspots && <span className="bg-amber-50 border border-amber-100 text-amber-700 px-2 py-0.5 rounded">Weakspots</span>}
                {searchTerm && <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">Search: "{searchTerm}"</span>}
                
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubject('All');
                    setSelectedCategoryFilter(null);
                    setSelectedPriorityFilter('All');
                    setShowOnlyWeakspots(false);
                    setSearchTerm('');
                  }}
                  className="ml-auto text-sky-700 hover:underline font-bold"
                >
                  Clear All Filters (x)
                </button>
              </div>
            )}
          </div>

          {/* 4. Display Core Checklist Grid */}
          <div className="space-y-3.5">
            {filteredSyllabus.length === 0 ? (
              <div className="p-12 text-center bg-white border border-slate-100 rounded-[24px] space-y-3">
                <p className="text-2xl">🔍</p>
                <p className="font-extrabold text-sm text-slate-800">No core competency matched your filters</p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium">Try loosening your search letters, selecting "All" subjects, or toggling off the "Weakspots Only" state filter.</p>
              </div>
            ) : (
              filteredSyllabus.map(item => {
                const currentStatus = topicStatuses[item.id] || 'not-started';
                
                return (
                  <div 
                    key={item.id}
                    className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 gap-4 ${
                      currentStatus === 'completed'
                        ? 'bg-slate-50/70 border-slate-150'
                        : currentStatus === 'in-progress'
                        ? 'bg-amber-50/20 border-amber-200 shadow-3xs'
                        : 'bg-white border-slate-100 hover:border-slate-250 hover:shadow-3xs'
                    }`}
                  >
                    
                    {/* Tick action column */}
                    <div className="flex items-start gap-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item.id)}
                        className={`mt-0.5 p-1 rounded-lg border transition-all duration-200 flex-shrink-0 cursor-pointer ${
                          currentStatus === 'completed'
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : currentStatus === 'in-progress'
                            ? 'bg-amber-100 border-amber-300 text-amber-700 animate-pulse'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                        title="Toggle review status (Not Started -> In Progress -> Completed)"
                      >
                        {currentStatus === 'completed' ? (
                          <CheckSquare className="w-5 h-5 stroke-[2.5]" />
                        ) : (
                          <Square className="w-5 h-5 stroke-[2]" />
                        )}
                      </button>

                      {/* Info text */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5 leading-none">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase text-slate-600 border border-slate-200 bg-slate-50`}>
                            {item.subject}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">
                            {item.category}
                          </span>

                          {onAskAi && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAskAi(item);
                              }}
                              className="ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-800 rounded-md border border-indigo-150 text-[10px] font-black cursor-pointer transition-all uppercase tracking-tight"
                              title="Discuss this specific NMAT competency interactively with Socratic AI Mentor"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-indigo-550 animate-pulse" />
                              <span>💡 Ask AI Tutor</span>
                            </button>
                          )}
                        </div>

                        <h3 className={`text-sm sm:text-base font-extrabold tracking-tight ${
                          currentStatus === 'completed' ? 'text-slate-550 line-through' : 'text-slate-800'
                        }`}>
                          {item.topic}
                        </h3>
                        
                        <p className="text-[11px] sm:text-xs text-slate-450 leading-relaxed font-semibold">
                          {item.description}
                        </p>
                      </div>

                    </div>

                    {/* Multi-Status Toggle Bar Segment */}
                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100 flex-shrink-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400 sm:hidden">Status:</span>
                      <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                        {[
                          { status: 'not-started', label: '🔘 Unstarted' },
                          { status: 'in-progress', label: '🟡 Active' },
                          { status: 'completed', label: '🟢 Ticked' }
                        ].map(st => {
                          const active = currentStatus === st.status;
                          return (
                            <button
                              key={st.status}
                              onClick={() => {
                                setTopicStatuses(prev => ({
                                  ...prev,
                                  [item.id]: st.status as TopicStatus
                                }));
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase cursor-pointer transition-all ${
                                active
                                  ? st.status === 'completed'
                                    ? 'bg-emerald-500 text-white shadow-xs'
                                    : st.status === 'in-progress'
                                    ? 'bg-amber-400 text-slate-900 shadow-xs'
                                    : 'bg-slate-400 text-white shadow-xs'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              {st.label.split(' ')[1]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </>
    </div>
  );
}
