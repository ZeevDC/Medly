export const chemistryQuestions = [
  {
    topic: "Organic Substitution mechanisms",
    q: "An organic chemist attempts to synthesize an ether by reacting a tertiary alkyl halide (2-chloro-2-methylpropane) with sodium methoxide in a polar-aprotic solvent. What is the major product isolated, and which pathway rules this environment?",
    choices: [
      { text: "2-methylpropene via E2 elimination", isCorrect: true },
      { text: "2-methoxy-2-methylpropane via SN2 substitution", isCorrect: false },
      { text: "2-methoxy-2-methylpropane via SN1 substitution", isCorrect: false },
      { text: "1-methoxy-2-methylpropane via SN2 substitution", isCorrect: false }
    ],
    rationale: "Sodium methoxide is a strong, unhindered base and nucleophile. When reacted with a tertiary alkyl halide (which is highly sterically hindered), SN2 is impossible. Strong base forces E2 elimination as the dominant pathway, yielding 2-methylpropene."
  },
  {
    topic: "Electrochemistry Galvanic cell potential",
    q: "A research team constructs a standard galvanic cell consisting of a Zinc anode (Zn2+/Zn, E° = -0.76 V) and a Copper cathode (Cu2+/Cu, E° = +0.34 V). If Zinc ion concentration is raised to 10.0 M while keeping Copper ions at 0.1 M, which of the following is true regarding the cell potential (E) at 298K?",
    choices: [
      { text: "Reduced below 1.10 V according to the Nernst Equation", isCorrect: true },
      { text: "Increased above 1.10 V due to mass action electron displacement", isCorrect: false },
      { text: "Remains unchanged at 1.10 V because electrode mass is invariant", isCorrect: false },
      { text: "Reduces to zero, reversing the spontaneous battery flow direction", isCorrect: false }
    ],
    rationale: "The standard potential is 1.10 V. The reaction is Zn(s) + Cu2+(aq) -> Zn2+(aq) + Cu(s). The reaction quotient Q is [Zn2+]/[Cu2+] = 10.0/0.1 = 100. By the Nernst Equation, E = 1.10 - (0.0592/2) * log(100) = 1.10 - 0.0592 = 1.04 V, which is below 1.10 V."
  },
  {
    topic: "Inorganic Acid-base buffers",
    q: "The physiological bicarbonate buffer system stabilizes circulating blood pH. Which of the following is false regarding this homeostatic buffer system?",
    choices: [
      { text: "Hyperventilation drives up pCO2, shifting carbonic acid equilibrium to lower pH", isCorrect: true },
      { text: "Carbonic anhydrase speeds the conversion of dissolved carbon dioxide to carbonic acid", isCorrect: false },
      { text: "Kidneys compensate for chronic respiratory acidosis by retaining bicarbonate", isCorrect: false },
      { text: "The typical physiological ratio of bicarbonate to dissolved CO2 is roughly 20:1", isCorrect: false }
    ],
    rationale: "Hyperventilation causes the body to lose CO2 (lowering respiratory pCO2). This shifts the bicarbonate-carbonic acid equilibrium to the left, which reduces H+ levels and raises pH (causing respiratory alkalosis), rather than lowering it."
  },
  {
    topic: "Thermodynamics Coupled processes",
    q: "The biochemical synthesis of glutamine from glutamate has a standard free energy change of +14.2 kJ/mol. In hepatocytes, this endergonic step is coupled to ATP hydrolysis (-30.5 kJ/mol). What is the net standard free energy change, and is the coupled coupling reaction spontaneous?",
    choices: [
      { text: "-16.3 kJ/mol; spontaneous", isCorrect: true },
      { text: "+44.7 kJ/mol; non-spontaneous", isCorrect: false },
      { text: "-44.7 kJ/mol; spontaneous", isCorrect: false },
      { text: "+16.3 kJ/mol; non-spontaneous", isCorrect: false }
    ],
    rationale: "Free energy changes of coupled processes are additive: +14.2 kJ/mol + (-30.5 kJ/mol) = -16.3 kJ/mol. A negative net free energy means the coupled reaction has a driving force and is exergonic/spontaneous."
  },
  {
    topic: "Organic Alkene oxidations",
    q: "Reacting 1-methylcyclohexene with cold, dilute, alkaline potassium permanganate (KMnO4) yields which of the following diols?",
    choices: [
      { text: "cis-1-methylcyclohexane-1,2-diol via syn addition", isCorrect: true },
      { text: "trans-1-methylcyclohexane-1,2-diol via anti addition", isCorrect: false },
      { text: "2-methylcyclohexanone via oxidative cleavage", isCorrect: false },
      { text: "A racemic mixture of both cis and trans stereoisomers", isCorrect: false }
    ],
    rationale: "Cold, dilute, alkaline KMnO4 (Baeyer's reagent) is a syn-dihydroxylating agent. It delivers two hydroxyl groups to the same face of the alkene double bond, yielding a cis-1,2-diol."
  },
  {
    topic: "Inorganic Gas corrections",
    q: "According to the real-gas equation of van der Waals: [P + (an^2/V^2)][V - nb] = nRT. What physical molecular property does the parameter 'a' correct for?",
    choices: [
      { text: "Intermolecular attractive forces reducing the effective wall-collision pressure", isCorrect: true },
      { text: "The finite space volume physically occupied by gas molecules", isCorrect: false },
      { text: "The elastic kinetic speed limits under high-temperature conditions", isCorrect: false },
      { text: "All of the above", isCorrect: false }
    ],
    rationale: "The van der Waals 'a' term corrects for weak intermolecular attractive forces that pull gas molecules toward each other, reducing their impact velocities and forces against the container walls, thus explaining why real pressure is below ideal pressure."
  },
  {
    topic: "Biochemistry Protein denaturation",
    q: "A biochemist denatures a functional protein, unfolding its native shape into a random coil. Which structural link remains unaffected by this denaturation process?",
    choices: [
      { text: "Covalent peptide bonds linking amino acid residues", isCorrect: true },
      { text: "Salt bridges linking charged acidic and basic side chains", isCorrect: false },
      { text: "Intramolecular hydrogen bonds stabilizing alpha-helices", isCorrect: false },
      { text: "Hydrophobic pocket stabilization in interior motifs", isCorrect: false }
    ],
    rationale: "Denaturation disrupts secondary, tertiary, and quaternary levels of protein structure by breaking non-covalent interactions (and occasional disulfide bridges). It does not break the covalent peptide bonds of the primary sequence."
  },
  {
    topic: "Biochemistry Spectroscopic identification",
    q: "An organic compound isolated from plant leaves yields a strong, sharp IR band at 1715 cm-1 and a broad, intense peak spanning 3200-3600 cm-1. Analysis of its 1H-NMR spectrum reveals a single sharp singlet at 12.1 ppm. What is the functional group present?",
    choices: [
      { text: "Carboxylic acid function", isCorrect: true },
      { text: "Isolated secondary alcohol and ketone mixture", isCorrect: false },
      { text: "Ester and terminal alkene linkage", isCorrect: false },
      { text: "Aromatic aldehyde function", isCorrect: false }
    ],
    rationale: "The IR stretch at 1715 cm-1 is characteristic of a carbonyl group (C=O); the broad band at 3200-3600 cm-1 indicates an O-H stretch; and the NMR peak at 12.1 ppm is indicative of an acidic proton of a carboxylic acid."
  },
  {
    topic: "General Chemistry Stoichiometric limits",
    q: "A cylinder is packed with 2.0 moles of hydrogen gas (H2) and 1.0 mole of oxygen gas (O2) to synthesize water. If the reaction goes to completion, which reactant is the limiting reagent, and what mass of water is manufactured?",
    choices: [
      { text: "Neither is limiting; 36.0 grams of water are produced", isCorrect: true },
      { text: "H2 is limiting; 18.0 grams of water are produced", isCorrect: false },
      { text: "O2 is limiting; 18.0 grams of water are produced", isCorrect: false },
      { text: "Neither is limiting; 18.0 grams of water are produced", isCorrect: false }
    ],
    rationale: "The balanced reaction is 2H2 + O2 -> 2H2O. Here, 2.0 moles of H2 require exactly 1.0 mole of O2, yielding 2.0 moles of H2O. Since both are present in stoichiometric balance, neither is limiting. Mass of 2.0 moles of H2O is 2.0 * 18.0 = 36.0 grams."
  },
  {
    topic: "Organic Aldol additions",
    q: "A biochemist reacts acetaldehyde (ethanal) with a dilute sodium hydroxide solution. What is the primary product of this self-condensation reaction?",
    choices: [
      { text: "3-hydroxybutanal via aldol addition", isCorrect: true },
      { text: "Crotonaldehyde via dehydration of a ketone", isCorrect: false },
      { text: "Ethyl acetate via Claisen condensation", isCorrect: false },
      { text: "Diethyl ether via dehydration", isCorrect: false }
    ],
    rationale: "In dilute NaOH, acetaldehyde forms an enolate ion that attacks another molecule of acetaldehyde. Protonation of the resulting alkoxide intermediate yields 3-hydroxybutanal (a beta-hydroxy aldehyde), a classic aldol addition product."
  },
  {
    topic: "Biochemistry Enzyme kinetics",
    q: "During an enzyme-catalyzed assay, doubling the substrate concentration ([S]) from Km to 2 Km yields which of the following changes in initial velocity (v0) according to Michaelis-Menten kinetics?",
    choices: [
      { text: "Initial velocity increases from 0.50 Vmax to 0.67 Vmax", isCorrect: true },
      { text: "Initial velocity doubles from 0.50 Vmax to 1.00 Vmax", isCorrect: false },
      { text: "Initial velocity increases from 0.33 Vmax to 0.50 Vmax", isCorrect: false },
      { text: "Initial velocity decreases due to substrate inhibition", isCorrect: false }
    ],
    rationale: "By Michaelis-Menten: v0 = Vmax*[S] / (Km + [S]). When [S] = Km, v0 = Vmax*Km / (2Km) = 0.50 Vmax. When [S] = 2Km, v0 = Vmax*2Km / (3Km) = 2/3 Vmax = 0.67 Vmax."
  },
  {
    topic: "Inorganic Coordination coordination complexes",
    q: "The clinical coordination compound cisplatin, [Pt(NH3)2Cl2], is an effective chemotherapy agent. What is the coordination geometry of Platinum in this complex, and does it exhibit optical active stereoisomers?",
    choices: [
      { text: "Square planar; exhibits geometric (cis/trans) isomers but zero optical isomers", isCorrect: true },
      { text: "Tetrahedral; exhibits four optical stereoisomers", isCorrect: false },
      { text: "Octahedral; exhibits cis/trans d-orbital transitions", isCorrect: false },
      { text: "Square planar; exhibits both geometric and optical stereoisomers", isCorrect: false }
    ],
    rationale: "Platinum(II) complexes are typically d8 and square planar. Cisplatin exhibits geometric isomerism (the active cis form and inactive trans-platin), but since the square planar layout is flat, it possesses a plane of symmetry and is optically inactive."
  },
  {
    topic: "Organic Alkyne hydrates",
    q: "Hydration of propyne with sulfuric acid, water, and mercuric sulfate (HgSO4) yields which major organic keto product as a result of keto-enol tautomerism?",
    choices: [
      { text: "Propanone (acetone)", isCorrect: true },
      { text: "Propanal", isCorrect: false },
      { text: "Prop-2-en-1-ol", isCorrect: false },
      { text: "Methyl vinyl ether", isCorrect: false }
    ],
    rationale: "Hydration of terminal alkynes follows Markovnikov's rule. Electrophilic addition of water to propyne yields a circular enol intermediate, 2-hydroxypropene, which rapidly tautomerizes into its more stable keto form, propanone (acetone)."
  },
  {
    topic: "Thermodynamics Entropy changes",
    q: "Which of the following physical-chemical processes represents a negative change in entropy (ΔS < 0)?",
    choices: [
      { text: "The crystallization of sodium chloride from an aqueous solution", isCorrect: true },
      { text: "The sublimation of solid dry ice into carbon dioxide gas", isCorrect: false },
      { text: "Dissolving an ammonium nitrate cold pack in water", isCorrect: false },
      { text: "Thermal expansion of gas inside a copper container", isCorrect: false }
    ],
    rationale: "Crystallization converts highly disordered dissolved ions in solution into a highly ordered crystalline lattice, reducing system molecular disorder (ΔS < 0). The other options involve phase transitions or processes that increase disorder."
  },
  {
    topic: "Biochemistry Lipid metabolism",
    q: "During prolonged fasting, hepatocytes carry out beta-oxidation of fatty acids to yield acetyl-CoA, which is channeled into ketogenesis. All of the following are ketone bodies synthesized under these physiological conditions except for which of the following?",
    choices: [
      { text: "Pyruvate", isCorrect: true },
      { text: "Acetoacetate", isCorrect: false },
      { text: "Beta-hydroxybutyrate", isCorrect: false },
      { text: "Acetone", isCorrect: false }
    ],
    rationale: "Pyruvate is a 3-carbon intermediate of glycolysis and amino acid metabolism, not a ketone body. The three true metabolic ketone bodies are acetoacetate, beta-hydroxybutyrate, and acetone."
  },
  {
    topic: "Inorganic Solubility equilibria",
    q: "A chemist adds sodium chloride to a saturated solution of silver chloride (AgCl, Ksp = 1.8 x 10-10). What is the effect on silver ion (Ag+) concentration?",
    choices: [
      { text: "Ag+ concentration decreases due to the common-ion effect", isCorrect: true },
      { text: "Ag+ concentration increases due to the activity coeff-salt effect", isCorrect: false },
      { text: "Ag+ concentration remains unchanged because Ksp is constant", isCorrect: false },
      { text: "AgCl completely dissolves into sodium complex ligands", isCorrect: false }
    ],
    rationale: "Adding sodium chloride introduces chloride ions (Cl-). By Le Chatelier's principle and the common-ion effect, the solubility equilibrium shifts to the left, precipitating more AgCl and reducing the dissolved silver ion (Ag+) concentration."
  },
  {
    topic: "Organic Aromaticity rules",
    q: "According to Hückel's Rule, which of the following cyclic, planar, fully conjugated ring systems is classified as antiaromatic?",
    choices: [
      { text: "1,3-cyclobutadiene (4 pi electrons)", isCorrect: true },
      { text: "Benzene (6 pi electrons)", isCorrect: false },
      { text: "Cycloheptatrienyl cation / tropylium fold (6 pi electrons)", isCorrect: false },
      { text: "Furan heterocyclic ring (6 pi electrons)", isCorrect: false }
    ],
    rationale: "Hückel's rule states that planar, monocyclic, fully conjugated systems with (4n) pi-electrons are antiaromatic, whereas those with (4n+2) pi-electrons are aromatic. Cyclobutadiene has 4 pi-electrons (n=1), making it antiaromatic."
  },
  {
    topic: "General Chemistry Le Chatelier's equilibrium",
    q: "The synthesis of ammonia is exothermic: N2(g) + 3H2(g) <=> 2NH3(g) (ΔH = -92 kJ/mol). Which of the following edits will shift this equilibrium toward the reactants (left)?",
    choices: [
      { text: "Increasing the temperature of the reaction vessel", isCorrect: true },
      { text: "Increasing the total pressure by shrinking the vessel", isCorrect: false },
      { text: "Continuously condensing and extracting ammonia gas", isCorrect: false },
      { text: "Injecting more N2 gas into the high-pressure system", isCorrect: false }
    ],
    rationale: "Because the forward reaction is exothermic, heat can be modeled as a product. Raising the temperature adds heat, shifting the reaction to the left (towards reactants) to consume the excess heat according to Le Chatelier's principle."
  },
  {
    topic: "Biochemistry Carbohydrate linkages",
    q: "Amylose and cellulose are both glucose homopolymers synthesized by plants. What structural difference explains why humans can digest starch (amylose) but not cellulose?",
    choices: [
      { text: "Starch has alpha-1,4-glucosidic bonds, whereas cellulose has beta-1,4-glucosidic bonds", isCorrect: true },
      { text: "Starch has branch points with beta-1,6 linkages, whereas cellulose is linear", isCorrect: false },
      { text: "Cellulose has D-glucose monomers, whereas starch is made of L-glucose", isCorrect: false },
      { text: "None of the above", isCorrect: false }
    ],
    rationale: "Humans express alpha-amylase, which specifically hydrolyzes the alpha-1,4-glucosidic bonds of starch. We lack cellulase enzymes capable of breaking the rigid beta-1,4-glucosidic bonds of cellulose."
  },
  {
    topic: "Organic Grignard syntheses",
    q: "A synthetic chemist prepares phenylmagnesium bromide (a Grignard reagent) and reacts it with acetone, followed by dilute acid workup. What product class is isolated?",
    choices: [
      { text: "A tertiary alcohol", isCorrect: true },
      { text: "A secondary alcohol", isCorrect: false },
      { text: "A primary alcohol", isCorrect: false },
      { text: "An aromatic ketone", isCorrect: false }
    ],
    rationale: "Grignard reagents are powerful carbophilic nucleophiles. Reacting with a ketone (acetone) yields an alkoxide intermediate, which upon acid protonation is converted into a tertiary alcohol (2-phenylpropan-2-ol)."
  },
  {
    topic: "Thermodynamics Calorimetry math",
    q: "A student dissolves 10.0 grams of ammonium chloride in 150.0 grams of water inside a calorimeter. The temperature of the water drops from 25.0°C to 20.0°C. If the specific heat of water is 4.18 J/g°C, how much heat was absorbed by the dissolution, and what is its thermochemical sign?",
    choices: [
      { text: "+3.14 kJ; endothermic", isCorrect: true },
      { text: "-3.14 kJ; exothermic", isCorrect: false },
      { text: "+1.35 kJ; endothermic", isCorrect: false },
      { text: "-1.35 kJ; exothermic", isCorrect: false }
    ],
    rationale: "The mass of water is 150.0 g. Heat lost by the water is q = m * c * ΔT = 150.0 * 4.18 * (20.0 - 25.0) = -3135 J = -3.14 kJ. Since the water lost heat to the dissolving salt, the dissolution process is endothermic (q_system = +3.14 kJ)."
  },
  {
    topic: "Biochemistry Enzyme inhibition modes",
    q: "An enzyme kinetics researcher evaluates a drug that binds competitively to the active site of carbon anhydrase. What is the effect of this competitive drug on the enzyme's apparent Km and Vmax?",
    choices: [
      { text: "Apparent Km increases; Vmax remains unchanged", isCorrect: true },
      { text: "Apparent Km remains unchanged; Vmax decreases", isCorrect: false },
      { text: "Both apparent Km and Vmax decrease proportionally", isCorrect: false },
      { text: "Apparent Km decreases; Vmax increases", isCorrect: false }
    ],
    rationale: "Competitive inhibitors compete with the substrate for active site binding. High substrate concentrations can overcome this competitive inhibition, allowing the enzyme to achieve normal Vmax, but more substrate is required, raising apparent Km."
  },
  {
    topic: "Organic Carbocation dynamics",
    q: "Which carbocation intermediate is expected to exhibit the greatest thermodynamic stability, and why?",
    choices: [
      { text: "A tertiary carbocation due to inductive donation and hyperconjugation", isCorrect: true },
      { text: "A secondary carbocation due to localized homolytic conjugation", isCorrect: false },
      { text: "A primary carbocation due to lessened steric hindrance", isCorrect: false },
      { text: "A methyl carbocation due to high positive charge density", isCorrect: false }
    ],
    rationale: "Carbocation stability follows the order: 3° > 2° > 1° > methyl. Tertiary carbocations are stabilized by inductive electron donation from three adjacent alkyl groups and hyperconjugation (overlapping of adjacent C-H sigma bonds with the empty p-orbital)."
  },
  {
    topic: "Inorganic Acid-base strength factors",
    q: "Why is hydrofluoric acid (HF) classified as a weak acid in aqueous solution, whereas hydrochloric acid (HCl) behaves as a strong acid?",
    choices: [
      { text: "Strong hydrogen-bonding and high H-F bond enthalpy prevent dissociation", isCorrect: true },
      { text: "Fluorine contains highly accessible unfilled 3d orbitals", isCorrect: false },
      { text: "Fluorine is less electronegative than chlorine, reducing polar dissociation", isCorrect: false },
      { text: "The fluoride ion is highly unstable due to its massive ionic radius", isCorrect: false }
    ],
    rationale: "Fluorine is small and highly electronegative, creating an extremely strong H-F bond with high bond dissociation energy. Additionally, HF exhibits strong hydrogen bonding in water, hindering proton release and making it a weak acid."
  },
  {
    topic: "Biochemistry Nucleic acid interactions",
    q: "Double-stranded DNA molecules with high G-C segment content remain annealed at higher denaturation temperatures than A-T rich sequences. What intermolecular reason explains this stabilization?",
    choices: [
      { text: "G-C base pairs share three hydrogen bonds, while A-T shares only two", isCorrect: true },
      { text: "G-C base pairs represent stronger phosphodiester covalent links", isCorrect: false },
      { text: "G-C bases exhibit complete sterical immunity to water hydration", isCorrect: false },
      { text: "All of the above", isCorrect: false }
    ],
    rationale: "Guanine and Cytosine share three hydrogen bonds, whereas Adenine and Thymine share only two. This higher hydrogen bonding density (and stronger base-stacking interactions) makes G-C-rich DNA more resistant to thermal denaturation."
  },
  {
    topic: "Organic Carbonyl nucleophilic additions",
    q: "Which of the following organic structures will undergo the most rapid electrophilic carbonyl reaction when treated with a weak nucleophile like water?",
    choices: [
      { text: "Acetaldehyde (ethanal) due to less steric hindrance and fewer electron-donating groups", isCorrect: true },
      { text: "Acetone (propan-2-one) due to flanking inductive methyls", isCorrect: false },
      { text: "Di-tert-butyl ketone due to planar structural lock", isCorrect: false },
      { text: "Aromatic acetophenone due to resonance delocalization", isCorrect: false }
    ],
    rationale: "Aldehydes are more reactive toward nucleophilic addition than ketones because they have less steric hindrance around the carbonyl carbon and fewer alkyl groups to reduce the carbon's partial positive charge through inductive donation."
  },
  {
    topic: "Inorganic Radioactive decay modes",
    q: "A radioactive isotope of Iodine-131 decay via Beta minus (β-) emission. What change occurs in the nucleus of this isotope, and what element is formed?",
    choices: [
      { text: "A neutron is converted to a proton; atomic number increases to form Xenon-131", isCorrect: true },
      { text: "A proton is converted to a neutron; atomic number decreases to form Tellurium-131", isCorrect: false },
      { text: "Alpha particles are ejected; mass number decreases by 4", isCorrect: false },
      { text: "None of the above", isCorrect: false }
    ],
    rationale: "In Beta-minus decay, a neutron decays into a proton, an electron (beta particle), and an antineutrino. The atomic number increases by 1 (from 53 to 54), converting Iodine-131 to stable Xenon-131 while the mass number remains unchanged."
  },
  {
    topic: "Biochemistry Metabolic energy carriers",
    q: "During active cellular respiration, which coenzyme is reduced during the conversion of succinate to fumarate in the Citric Acid Cycle, and where is the corresponding enzyme located?",
    choices: [
      { text: "FAD to FADH2; Succinate Dehydrogenase in the inner mitochondrial membrane", isCorrect: true },
      { text: "NAD+ to NADH; Malate Dehydrogenase in the matrix fluid", isCorrect: false },
      { text: "NADP+ to NADPH; Isocitrate Dehydrogenase in the cytosol", isCorrect: false },
      { text: "ADP to ATP; Succinyl-CoA Synthetase in the inter-membrane space", isCorrect: false }
    ],
    rationale: "The oxidation of succinate to fumarate is catalyzed by Succinate Dehydrogenase, which uses FAD as the electron acceptor. This enzyme is also Complex II of the electron transport chain, localized in the inner mitochondrial membrane."
  },
  {
    topic: "Organic Structural isomerism",
    q: "An organic compound with the molecular formula C4H10O does not react with sodium metal and does not show any absorption band in the 3200-3600 cm-1 region in its IR spectrum. What functional group and structure is present?",
    choices: [
      { text: "Ether; Diethyl ether", isCorrect: true },
      { text: "Alcohol; Butan-1-ol", isCorrect: false },
      { text: "Carboxylic acid; Butanoic acid", isCorrect: false },
      { text: "Ketone; Butan-2-one", isCorrect: false }
    ],
    rationale: "C4H10O has a degree of unsaturation of 0. Since it has no IR absorption in the 3200-3600 cm-1 region, it lacks an O-H group (ruling out alcohols). Also, because it fails to react with sodium (which reacts with acidic O-H protons), it must be an ether. Diethyl ether matches."
  },
  {
    topic: "Organic Nucleophilic acyl substitutions",
    q: "Arrange the following carboxylic acid derivatives in order of decreasing reactivity (most reactive to least reactive) toward nucleophilic acyl substitution:",
    choices: [
      { text: "Acyl Chloride > Acid Anhydride > Ester > Amide", isCorrect: true },
      { text: "Amide > Ester > Acid Anhydride > Acyl Chloride", isCorrect: false },
      { text: "Acyl Chloride > Ester > Acid Anhydride > Amide", isCorrect: false },
      { text: "Acid Anhydride > Acyl Chloride > Amide > Ester", isCorrect: false }
    ],
    rationale: "Reactivity is determined by the leaving group ability of the substituent (basicity/stability). Chloride (Cl-) is a very weak conjugate base and excellent leaving group, followed by carboxylate, alkoxide, and finally the highly basic, poor leaving group amide (NH2-)."
  },
  {
    topic: "Electrochemistry Faraday's electrolysis",
    q: "An industrial electrochemical cell passes a constant current of 5.0 Amperes through an aqueous solution of copper sulfate (CuSO4) for 965 seconds. What mass of solid copper (Cu, atomic weight = 63.5 g/mol) is plated at the cathode?",
    choices: [
      { text: "1.59 grams", isCorrect: true },
      { text: "3.18 grams", isCorrect: false },
      { text: "6.35 grams", isCorrect: false },
      { text: "0.80 grams", isCorrect: false }
    ],
    rationale: "Charge Q = Current * Time = 5.0 A * 965 s = 4825 Coulombs. Moles of electrons = Q / F = 4825 / 96485 = 0.050 moles of e-. The reduction is Cu2+ + 2e- -> Cu(s). Thus, 2 moles of e- plate 1 mole of Cu. Plated Cu = 0.050 / 2 = 0.025 moles. Mass = 0.025 * 63.5 = 1.59 grams."
  },
  {
    topic: "Inorganic Periodic properties",
    q: "Which of the following atoms possesses the greatest first ionization energy, and why?",
    choices: [
      { text: "Helium because of its highly stable closed-shell 1s2 configuration and tiny atomic radius", isCorrect: true },
      { text: "Fluorine because of its extreme electronegativity", isCorrect: false },
      { text: "Cesium because of its massive atomic radius", isCorrect: false },
      { text: "Neon because of its 2s2 2p6 octet electronic status", isCorrect: false }
    ],
    rationale: "Helium has the highest first ionization energy of any element. Its electrons are in the 1s shell close to the nucleus with maximum electrostatic pull and no inner electron shielding, making them extremely difficult to remove."
  },
  {
    topic: "Biochemistry Amino acid charges",
    q: "A buffer solution contains the basic amino acid Histidine (pKa values: carboxyl = 1.8, imidazole side-chain = 6.0, amino = 9.2). What is the net electrical charge of Histidine at a physiologic pH of 7.4?",
    choices: [
      { text: "Neutral (0 charge)", isCorrect: true },
      { text: "Net positive (+1 charge)", isCorrect: false },
      { text: "Net negative (-1 charge)", isCorrect: false },
      { text: "Net positive (+2 charge)", isCorrect: false }
    ],
    rationale: "At pH 7.4, the carboxyl group (pKa 1.8) is deprotonated (-1 charge), the amino group (pKa 9.2) is protonated (+1 charge), and the imidazole side-chain (pKa 6.0) is deprotonated (neutral). Net charge: -1 + 1 + 0 = 0."
  },
  {
    topic: "Organic Halogen additions",
    q: "Adding molecular bromine (Br2) to trans-2-butene in an inert carbon tetrachloride solvent yields which of the following stereochemical isomers?",
    choices: [
      { text: "meso-2,3-dibromobutane", isCorrect: true },
      { text: "A 50:50 racemic mixture of (2R,3R) and (2S,3S)-dibromobutane", isCorrect: false },
      { text: "trans-1,2-dibromobutane", isCorrect: false },
      { text: "None of the above", isCorrect: false }
    ],
    rationale: "Reaction of Br2 with an alkene involves anti addition through a cyclic bromonium ion intermediate. Anti addition to a trans-symmetric alkene yields the meso compound (meso-2,3-dibromobutane), which is an achiral stereoisomer containing a plane of symmetry."
  },
  {
    topic: "Inorganic Intermolecular forces",
    q: "Which of the following organic liquids exhibits the highest boiling point, and what is its primary intermolecular force?",
    choices: [
      { text: "Water; dense network of intermolecular hydrogen bonds", isCorrect: true },
      { text: "Ethanol; single hydrogen bonds and London dispersion forces", isCorrect: false },
      { text: "Diethyl ether; weak dipole-dipole attractions", isCorrect: false },
      { text: "Pentane; weak London dispersion forces", isCorrect: false }
    ],
    rationale: "Water has a boiling point of 100°C because each water molecule can form up to four stable hydrogen bonds in a highly cooperative tetrahedral network, requiring substantial thermal energy to disrupt."
  },
  {
    topic: "Biochemistry Metabolism glycolysis energy",
    q: "Under anaerobic conditions, human muscle tissue converts pyruvate to lactate. What is the metabolic significance of this reduction step?",
    choices: [
      { text: "To regenerate NAD+ from NADH, preserving glycolytic flux", isCorrect: true },
      { text: "To synthesize another molecule of ATP via oxidative phosphorylation", isCorrect: false },
      { text: "To decrease muscle acidity by consuming protons", isCorrect: false },
      { text: "None of the above", isCorrect: false }
    ],
    rationale: "Glycolysis requires NAD+ to oxidize glyceraldehyde-3-phosphate. In the absence of oxygen for respiration, lactate dehydrogenase reduces pyruvate to lactate, oxidizing NADH back to NAD+ to ensure glycolysis can continue producing ATP anaerobically."
  },
  {
    topic: "Organic Phenol property dynamics",
    q: "Which of the following compounds exhibits the greatest acidity, and why?",
    choices: [
      { text: "p-nitrophenol due to resonance stabilization of phenoxide by nitro group", isCorrect: true },
      { text: "Phenol because of charge distribution in aromatic rings", isCorrect: false },
      { text: "p-methylphenol because of inductive electron donation", isCorrect: false },
      { text: "Cyclohexanol because of primary aliphatic structures", isCorrect: false }
    ],
    rationale: "Acidity increases when the conjugate base is stabilized. The phenoxide ion of p-nitrophenol is stabilized by both inductive electron-withdrawal and direct resonance delocalization of the negative charge into the nitro group."
  },
  {
    topic: "Inorganic Transition metal complexes",
    q: "A high-spin octahedral manganese(II) complex ([Mn(H2O)6]2+) exhibits extremely faint pale pink color in aqueous solution. What electronic selection rule explains this faint transition?",
    choices: [
      { text: "Spin-forbidden d-orbital transitions because all five d-orbitals contain a single electron", isCorrect: true },
      { text: "Laporte-symmetric orbital exclusion in highly tetrahedral layouts", isCorrect: false },
      { text: "Unpaired f-orbital charge transfers", isCorrect: false },
      { text: "None of the above", isCorrect: false }
    ],
    rationale: "Manganese(II) possesses a d5 configuration. In a high-spin octahedral ligand field, each of the five d-orbitals is occupied by one electron with parallel spins. Any d-d transition requires flipping an electron spin, which is spin-forbidden and mathematically highly improbable."
  },
  {
    topic: "Biochemistry Amino acid chromatography",
    q: "A research biochemist runs paper chromatography on a mixture of amino acids in a hydrophobic organic solvent. Which amino acid is expected to migrate the furthest with the solvent front (highest Rf value)?",
    choices: [
      { text: "Leucine", isCorrect: true },
      { text: "Aspartate", isCorrect: false },
      { text: "Lysine", isCorrect: false },
      { text: "Serine", isCorrect: false }
    ],
    rationale: "In paper chromatography (using paper as polar stationary phase and an organic solvent as mobile phase), hydrophobic molecules partition preferentially into the mobile phase, migrating furthest. Leucine possesses a hydrophobic branched alkyl side chain."
  },
  {
    topic: "Organic Elimination paths",
    q: "Reacting 2-bromobutane with a massive, sterically hindered base like potassium tert-butoxide (t-BuOK) yields which alkene as the major product, and what rule does this follow?",
    choices: [
      { text: "1-butene via Hofmann elimination", isCorrect: true },
      { text: "trans-2-butene via Zaitsev elimination", isCorrect: false },
      { text: "cis-2-butene via Zaitsev elimination", isCorrect: false },
      { text: "Butadiene via radical rearrangement", isCorrect: false }
    ],
    rationale: "A bulky base like tert-butoxide is sterically hindered and cannot easily access internal protons. Instead, it deprotonates the more accessible, less hindered terminal methyl group, yielding the thermodynamic Hofffman product: 1-butene."
  },
  {
    topic: "Inorganic Hybridization configurations",
    q: "What is the molecular geometry and chemical orbital hybridization of carbon in a molecule of carbon dioxide (CO2)?",
    choices: [
      { text: "Linear; sp hybridization", isCorrect: true },
      { text: "Trigonal planar; sp2 hybridization", isCorrect: false },
      { text: "Bent; sp2 hybridization", isCorrect: false },
      { text: "Tetrahedral; sp3 hybridization", isCorrect: false }
    ],
    rationale: "In CO2, carbon forms two double bonds (two sigma bonds and two pi bonds) and has zero lone pairs. It possesses a steric number of 2, requiring sp orbital hybridization and a linear molecular geometry (180° bond angle) to minimize charge repulsion."
  },
  {
    topic: "Biochemistry Oxidative phosphorylation",
    q: "The standard poisonous compound cyanide (CN-) blocks cellular respiration by binding tightly to which electron transport chain complex?",
    choices: [
      { text: "Complex IV (Cytochrome C Oxidase)", isCorrect: true },
      { text: "Complex I (NADH Dehydrogenase)", isCorrect: false },
      { text: "Complex II (Succinate Dehydrogenase)", isCorrect: false },
      { text: "ATP Synthase rotor tip", isCorrect: false }
    ],
    rationale: "Cyanide binds covalently and reversibly to the Fe3+ iron within the heme a3-CuB binuclear center of Complex IV (cytochrome c oxidase), completely arresting the terminal transfer of electrons to oxygen, halting ATP generation."
  },
  {
    topic: "Organic Optical active isomers",
    q: "Which of the following organic targets represents a chiral molecule that exhibits optical activity when analyzed with a polarimeter?",
    choices: [
      { text: "2-chlorobutane", isCorrect: true },
      { text: "1-chlorobutane", isCorrect: false },
      { text: "2-chloro-2-methylpropane", isCorrect: false },
      { text: "Meso-tartaric acid", isCorrect: false }
    ],
    rationale: "A module is chiral if it has a non-superimposable mirror image. 2-chlorobutane has a stereocenter (C2 carries H, Cl, methyl, and ethyl). The other options either lack a stereocenter (1-chlorobutane, 2-chloro-2-methylpropane) or have a plane of symmetry (meso-tartaric acid) and are achiral."
  },
  {
    topic: "Inorganic Free energies and rates",
    q: "A chemical reaction has a massive negative free energy change (ΔG° = -550 kJ/mol), but when reactants are mixed at room temperature, no reaction is observed over several days. What explains this discrepancy?",
    choices: [
      { text: "The reaction is thermodynamically favorable but kinetically hindered with high activation energy", isCorrect: true },
      { text: "The reaction is non-spontaneous due to high thermal entropy thresholds", isCorrect: false },
      { text: "The reaction enthalpy has shifted under ambient conditions", isCorrect: false },
      { text: "None of the above", isCorrect: false }
    ],
    rationale: "Thermodynamics (ΔG) indicates whether a process is spontaneous or favorable at equilibrium, but has no relation to the rate at which it occurs. A slow rate at room temperature represents kinetic stability, caused by a high activation energy barrier."
  },
  {
    topic: "Biochemistry Cholesterol paths",
    q: "Cholesterol is a vital molecule synthesized by animal cells. Which rate-limiting enzyme regulates the cellular biosynthetic pathway of cholesterol, and what is its pharmaceutical target group?",
    choices: [
      { text: "HMG-CoA Reductase; Statins", isCorrect: true },
      { text: "HMG-CoA Synthase; Fibrates", isCorrect: false },
      { text: "Squalene Monooxygenase; Bile acid sequestrants", isCorrect: false },
      { text: "ACAT transferase; Ezetimibe", isCorrect: false }
    ],
    rationale: "HMG-CoA Reductase catalyzes the NADPH-dependent conversion of HMG-CoA to mevalonate, the key rate-limiting step in cholesterol biosynthesis. Statins competitively inhibit this enzyme to reduce cholesterol."
  },
  {
    topic: "Organic Halogen substitution priorities",
    q: "When carrying out radical bromination of 2-methylpropane using bromine (Br2) and light, which hydrogen is abstracted first, and what product is isolated?",
    choices: [
      { text: "The tertiary hydrogen; 2-bromo-2-methylpropane", isCorrect: true },
      { text: "The primary hydrogen; 1-bromo-2-methylpropane", isCorrect: false },
      { text: "The secondary hydrogen; 2-bromobutane", isCorrect: false },
      { text: "None of the above", isCorrect: false }
    ],
    rationale: "Radical abstractive stability follows 3° > 2° > 1° > methyl. Radical bromination is highly regioselective for the most stable radical because bromine radicals are relatively unreactive and selective. It abstracts the 3° hydrogen, forming 2-bromo-2-methylpropane."
  },
  {
    topic: "Inorganic Ionic solids lattices",
    q: "Which of the following compounds exhibits the greatest lattice energy, and why?",
    choices: [
      { text: "Magnesium oxide (MgO) due to divalent charges and small ionic radii", isCorrect: true },
      { text: "Sodium chloride (NaCl) due to univalent ionic bonds", isCorrect: false },
      { text: "Calcium chloride (CaCl2) due to halogen packing", isCorrect: false },
      { text: "Cesium iodide (CsI) due to large ionic radii", isCorrect: false }
    ],
    rationale: "Lattice energy is governed by Coulomb's law: E ∝ (q1 * q2) / r. MgO contains divalent ions (Mg2+ and O2-), whose charge product (4) is higher than that of NaCl (1), and their small ionic radii permit small separations, maximizing electrostatic lattice strength."
  },
  {
    topic: "Biochemistry Gluconeogenesis barriers",
    q: "During prolonged starvation, the liver synthesizes glucose from non-carbohydrate precursors. Gluconeogenesis utilizes most glycolytic enzymes but bypasses three irreversible steps. Which enzyme is unique to gluconeogenesis?",
    choices: [
      { text: "Fructose-1,6-bisphosphatase", isCorrect: true },
      { text: "Phosphofructokinase-1", isCorrect: false },
      { text: "Pyruvate Kinase", isCorrect: false },
      { text: "Hexokinase", isCorrect: false }
    ],
    rationale: "The three irreversible steps of glycolysis are catalyzed by Hexokinase, PFK-1, and Pyruvate Kinase. Gluconeogenesis bypasses these using Pyruvate Carboxylase/PEP Carboxykinase, Fructose-1,6-bisphosphatase, and Glucose-6-phosphatase."
  },
  {
    topic: "Organic Carbonyl chemistry acidity",
    q: "Why are the alpha-hydrogens of carbonyl compounds (like acetone or aldehydes) significantly more acidic than regular alkane hydrogens?",
    choices: [
      { text: "The conjugate enolate base enjoys massive resonance stabilization into the electronegative oxygen atom", isCorrect: true },
      { text: "The carbonyl carbon is highly electronegative and directly attracts protons", isCorrect: false },
      { text: "The alpha carbon undergoes sp orbital compression during deprotonation", isCorrect: false },
      { text: "All of the above", isCorrect: false }
    ],
    rationale: "Deprotonating an alpha-hydrogen yields an enolate ion. This conjugate base is resonance-stabilized by delocalizing the negative charge from carbon onto the highly electronegative oxygen atom, making carbonyl alpha-hydrogens moderately acidic (pKa ~ 19-20)."
  },
  {
    topic: "Inorganic Gas laws densities",
    q: "What is the density (g/L) of oxygen gas (O2, molecular weight = 32.0 g/mol) under standard temperature and pressure (STP) conditions?",
    choices: [
      { text: "1.43 g/L", isCorrect: true },
      { text: "0.71 g/L", isCorrect: false },
      { text: "2.86 g/L", isCorrect: false },
      { text: "32.0 g/L", isCorrect: false }
    ],
    rationale: "Under STP conditions (273K, 1 atm), one mole of any ideal gas occupies exactly 22.4 liters. The density is mass/volume: d = 32.0 grams / 22.4 liters = 1.43 grams per liter."
  }
];
