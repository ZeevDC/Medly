export const biologyQuestions = [
  {
    topic: "Genetics Pedigree and inheritance",
    q: "A pedigree analysis of a family with a rare metabolic disorder shows that the trait affects both males and females in equal proportions. Affected offspring always have at least one affected parent. However, one of the youngest siblings inherits the genotype but shows absolutely no clinical symptoms. Which genetic concepts explain this?",
    choices: [
      { text: "Autosomal Dominant with Incomplete Penetrance", isCorrect: true },
      { text: "X-Linked Recessive with Variable Expressivity", isCorrect: false },
      { text: "Autosomal Recessive with Epistatic Masking", isCorrect: false },
      { text: "Mitochondrial Inheritance with High Heteroplasmy", isCorrect: false }
    ],
    rationale: "The equal distribution among sexes indicates an autosomal locus, and because it does not skip generations, it is dominant. The asymptomatic carrier sibling demonstrates incomplete penetrance, where a person carries the dominant disease-causing allele but is phenotypically normal."
  },
  {
    topic: "Cell Biology Mitochondrial cristae",
    q: "Biopsied muscle fiber cells from an NMAT prep candidate experiencing progressive, severe skeletal fatigue are examined under TEM. The mitochondria exhibit complete loss of the inner membrane cristae folds. The following processes will be severely impaired, except for:",
    choices: [
      { text: "Glycolytic conversion of glucose to pyruvate", isCorrect: true },
      { text: "Establishment of the matrix proton motive force", isCorrect: false },
      { text: "Cytochrome C oxidase complex ATP synthesis", isCorrect: false },
      { text: "Beta-oxidation of long-chain fatty acids", isCorrect: false }
    ],
    rationale: "Glycolysis takes place entirely in the cytosol and is anaerobic; thus, it does not require mitochondrial inner membrane cristae or the electron transport chain."
  },
  {
    topic: "Anatomy Cardiac valves regurgitation",
    q: "A 48-year-old female presents with fatigue and dyspnea. Echocardiogram reveals high-volume mitral valve regurgitation during ventricular systole. Which of the following pressure-volume profiles is false regarding this lesion?",
    choices: [
      { text: "Decreased left ventricular volume at end-diastole", isCorrect: true },
      { text: "Normal or decreased left ventricular afterload", isCorrect: false },
      { text: "Elevated left atrial pressures with pulmonary congestion", isCorrect: false },
      { text: "Decreased forward stroke volume despite increased total ejection fraction", isCorrect: false }
    ],
    rationale: "In chronic mitral regurgitation, there is a backflow of blood into the left atrium during systole. When this blood returns during diastole, it combines with normal venous return, which actually increases left ventricular end-diastolic volume (preload), rather than decreasing it."
  },
  {
    topic: "Botany Plant hormones and drought",
    q: "A mutant Solanum lycopersicum strain has a loss-of-function mutation in secondary receptors for Abscisic Acid (ABA). When subjected to severe environmental drought conditions, which physiological defect is the direct consequence?",
    choices: [
      { text: "Inability to close stomata resulting in rapid vascular desiccation", isCorrect: true },
      { text: "Premature shedding of unpollinated fruit buds via ethylene mimicry", isCorrect: false },
      { text: "Accelerated cell division in roots causing hyper-geotropism", isCorrect: false },
      { text: "Complete cessation of cell elongation in apical meristems", isCorrect: false }
    ],
    rationale: "Abscisic Acid is responsible for stomatal closure during water stress. Without functional ABA receptors, guard cells cannot export potassium or lose turgor pressure, keeping stomatal pores open under drought conditions, causing rapid vascular desiccation."
  },
  {
    topic: "Ecology Trophic cascades",
    q: "Regional extinction of Enhydra lutris (sea otters) in a coastal marine biome leads to a rapid, complete collapse of local Laminaria (kelp) forest cover. This represents which ecological paradigm?",
    choices: [
      { text: "A top-down trophic cascade driven by herbivore release", isCorrect: true },
      { text: "A bottom-up eutrophication event limiting primary productivity", isCorrect: false },
      { text: "Competitive niche exclusion under primary succession", isCorrect: false },
      { text: "Biomagnification of agricultural pesticide runoffs", isCorrect: false }
    ],
    rationale: "Sea otters are keystone predators of sea urchins. Their removal releases urchins from predatory control, allowing urchin populations to bloom and over-browse the kelp, illustrating a classic top-down trophic cascade."
  },
  {
    topic: "Enzymology Inhibition kinetics",
    q: "An allosteric enzyme is treated with a cellular feedback inhibitor that binds exclusively to the enzyme-substrate complex but not the free enzyme. What change is observed on a Lineweaver-Burk double-reciprocal plot?",
    choices: [
      { text: "Parallel upward shift with a decrease in both apparent Vmax and apparent Km", isCorrect: true },
      { text: "Y-intercept intersection showing competitive inhibition", isCorrect: false },
      { text: "X-intercept intersection showing pure non-competitive inhibition", isCorrect: false },
      { text: "Rotational shift about the origin without change in Vmax", isCorrect: false }
    ],
    rationale: "Binding of an inhibitor exclusively to the ES complex represents uncompetitive inhibition. This stabilizes the ES complex, reducing both the apparent Vmax and apparent Km in a proportional manner, yielding parallel lines on a Lineweaver-Burk plot."
  },
  {
    topic: "Anatomy Renal countercurrent multiplier",
    q: "Administering a loop diuretic that blocks the Na+/K+/2Cl- cotransporter in the thick ascending limb of Henle directly compromises renal filtration capacity. What is the fundamental mechanism behind this drug's diuretic effect?",
    choices: [
      { text: "Disrupting the single effect, avoiding water extraction in medullary collecting ducts", isCorrect: true },
      { text: "Increasing hydrostatic pressure inside Bowman's space via afferent constriction", isCorrect: false },
      { text: "Directly inhibiting the expression of Aquaporin-2 in proximal convoluted tubules", isCorrect: false },
      { text: "Directly decreasing systemic aldosterone via macula densa simulation", isCorrect: false }
    ],
    rationale: "By blocking solute transport in the ascending limb, loop diuretics impair the hyperosmolar medullary interstitial gradient. Without this gradient, water cannot be reabsorbed through collecting ducts, leading to water retention in the filtrate."
  },
  {
    topic: "Epigenetics Histone modification",
    q: "The following statements regarding epigenomics play a crucial role in embryogenesis and oncogenesis. All of these statements are biologically true except:",
    choices: [
      { text: "Histone acetylation universally condenses chromatin, silencing gene expression", isCorrect: true },
      { text: "DNA methylation occurs predominantly at cytidine residues in CpG islands", isCorrect: false },
      { text: "Methylated cytosines recruit methyl-CpG-binding domain proteins to silence transcription", isCorrect: false },
      { text: "Epigenetic chromatin marks can be transmitted during mitotic cell division", isCorrect: false }
    ],
    rationale: "Histone acetylation neutralizes the positive charge on lysine residues, weakening histone-DNA interactions. This opens the chromatin structure (forming euchromatin), promoting gene transcription rather than silencing it."
  },
  {
    topic: "Cell Biology Lysosomal storage diseases",
    q: "A toddler is evaluated for hepatosplenomegaly, skeletal skeletal deformities, and regression of motor skills. Cellular biopsy reveals swollen lysosomes packed with undegraded gangliosides. If a mutation blocks the phosphotransferase that tags lysosomal enzymes with mannose-6-phosphate in the Golgi, what is the direct cellular pathobiology?",
    choices: [
      { text: "Lysosomal enzymes are default-secreted into the extracellular space", isCorrect: true },
      { text: "Misfolded lysosomal enzymes are retro-translocated and destroyed in the proteasome", isCorrect: false },
      { text: "Lysosomal enzymes aggregate within the cis-cisterna of the endoplasmic reticulum", isCorrect: false },
      { text: "The lysosome membrane undergoes premature autolysis within the cytoplasm", isCorrect: false }
    ],
    rationale: "Mannose-6-phosphate (M6P) is the target signal sorting acid hydrolases from the Golgi to lysosomes. Without this tag, lysosomal enzymes are not sorted into clathrin-coated vesicles, but instead travel the default secretory pathway out of the cell, leaving empty lysosomes."
  },
  {
    topic: "Anatomy Pulm respiratory kinetics",
    q: "During an high-altitude clinical simulation, a pre-med student's ventilation rate increases. If the partial pressure of alveolar oxygen stays near 60 mmHg, which of the following is true regarding hemoglobin's oxygen binding dynamics?",
    choices: [
      { text: "The oxygen-hemoglobin dissociation curve shifts left, increasing affinity in tissues", isCorrect: false },
      { text: "Decreased organic 2,3-BPG synthesis immediately moves the curve rightward", isCorrect: false },
      { text: "A respiratory alkalosis shifts the curve left, enhancing loading at high altitude", isCorrect: true },
      { text: "Vascular bicarbonate ion concentrations increase to lower partial carbon dioxide pressure", isCorrect: false }
    ],
    rationale: "High altitude triggers hyperventilation, which drives down arterial pCO2, causing a respiratory alkalosis (high pH). Alkalosis stabilizes the relaxed high-affinity state of hemoglobin (Bohr effect), shifting the curve left and promoting oxygen loading in pulmonary capillaries."
  },
  {
    topic: "Botany Plant vascular systems",
    q: "A research greenhouse isolates a maple tree mutant with dysfunctional, non-lignified vessel elements in its secondary xylem. What is the most likely physiological consequence?",
    choices: [
      { text: "Inability of the plant to support tension-induced water columns, causing conduit collapse", isCorrect: true },
      { text: "Complete loss of sucrose translocation from mature leaves to sink tubers", isCorrect: false },
      { text: "Rapid turgidity in parenchymal cells due to unrestricted cell division", isCorrect: false },
      { text: "Accelerated lateral diffusion of mineral nutrients across the Casparian strip", isCorrect: false }
    ],
    rationale: "Cohesion-tension theory details that water is pulled up xylem under high negative pressures. Xylem vessel elements must be reinforced with rigid lignin to resist inward suction (cavitation and vessel collapse)."
  },
  {
    topic: "Ecology Island Biogeography",
    q: "According to the Macarthur-Wilson Equilibrium Model of Island Biogeography, which of the following islands is expected to exhibit the highest species richness at equilibrium?",
    choices: [
      { text: "A large island located near the continental mainland", isCorrect: true },
      { text: "A small island located far from the continental mainland", isCorrect: false },
      { text: "A large island located far from the continental mainland", isCorrect: false },
      { text: "A small, near-continent island under low niche diversification", isCorrect: false }
    ],
    rationale: "Larger islands have lower extinction rates (due to more resources and larger populations), and islands near the mainland have higher colonization rates. Together, a large near-mainland island will maintain the highest species richness."
  },
  {
    topic: "Genetics Chromosomal aberrations",
    q: "An analysis of human gametes shows a nondisjunction event occurring during meiosis II of oogenesis. If the resulting egg is fertilized by a normal sperm carrying a Y chromosome, what are the possible zygotic karyotypes?",
    choices: [
      { text: "Trisomy (XYY) and Monosomy (Y-only)", isCorrect: false },
      { text: "Klinefelter syndrome (XXY) and Monosomy (Y-only) or Normal (XY)", isCorrect: true },
      { text: "Turner syndrome (XO) and Down syndrome", isCorrect: false },
      { text: "Trisomy (XXX) and Klinefelter syndrome (XXY)", isCorrect: false }
    ],
    rationale: "Nondisjunction in Meiosis II of the egg yields either an oocyte with XX (both sister chromatids failed to separate) or an oocyte with zero X chromosomes (O). Fertilization by a normal Y sperm results in either an XXY zygote (Klinefelter) or a YO zygote (non-viable, monosomy Y)."
  },
  {
    topic: "Cell Biology Signal transduction pathway",
    q: "A cell line has a mutated form of the G-alpha-s protein that lacks GTPase activity. Which cellular outcome represents the immediate consequence of receptor stimulation by epinephrine?",
    choices: [
      { text: "Constitutive activation of adenylyl cyclase with elevated cAMP levels", isCorrect: true },
      { text: "Rapid intracellular calcium release from the sarcoplasmic reticulum", isCorrect: false },
      { text: "Immediate autophosphorylation of intracellular tyrosine residues", isCorrect: false },
      { text: "Degradation of IP3 and DAG into glycerol and free phosphate", isCorrect: false }
    ],
    rationale: "The GTPase activity of G-alpha-s is the built-in off-switch that hydrolyzes bound GTP to GDP. Without this activity, the G-protein remains locked in its active state, continuously stimulating adenylyl cyclase to generate cAMP."
  },
  {
    topic: "Anatomy Immunology cell functions",
    q: "All of the following cellular interactions are critical in coordinating adaptive immune cell responses to exogenous pathogens, except:",
    choices: [
      { text: "Interconnection of cytotoxic CD8+ T cells with MHC Class II on dendritic cells", isCorrect: true },
      { text: "MHC Class II presentation of endocytosed peptide fragments by macrophages to CD4+ Helper T cells", isCorrect: false },
      { text: "Toll-like receptor activation on antigen-presenting cells triggering co-stimulatory B7 protein insertion", isCorrect: false },
      { text: "Binding of CD40 on B-lymphocytes to CD40L on follicular helper T-cells", isCorrect: false }
    ],
    rationale: "Cytotoxic CD8+ T cells interact strictly with helper proteins on MHC Class I molecules, which present intracellular antigens. CD4+ Helper T cells interact with MHC Class II molecules on antigen-presenting cells."
  },
  {
    topic: "Botany Seed dormancy and heat",
    q: "Prairie seeds require high temperature thermal exposure (such as wildfires) to break their hard seed coats and initiate germination. This process is called scarification. What hormone works directly within the endosperm to mobilize amylase to synthesize sugars for the embryo?",
    choices: [
      { text: "Gibberellic Acid", isCorrect: true },
      { text: "Abscisic Acid", isCorrect: false },
      { text: "Indole-3-acetic acid", isCorrect: false },
      { text: "Ethylene gas", isCorrect: false }
    ],
    rationale: "Gibberellic Acid is synthesized by the embryo and diffuses to the aleurone layer, where it signals the synthesis and secretion of alpha-amylase to hydrolyze starch into maltose and glucose for the developing seedling."
  },
  {
    topic: "Ecology Population growth kinetics",
    q: "A microbiologist tracks *Escherichia coli* in a closed flask. Once population size (N) approaches carrying capacity (K), the per-capita growth rate is zero. What mathematical factor in the logistic growth equation dN/dt = rN((K-N)/K) yields this result?",
    choices: [
      { text: "The term (K-N)/K approaches zero", isCorrect: true },
      { text: "The exponential rate coefficient r approaches infinity", isCorrect: false },
      { text: "The absolute population size N approaches zero", isCorrect: false },
      { text: "None of the above", isCorrect: false }
    ],
    rationale: "In logistic growth, as N approaches K, the density-dependent term (K-N)/K approaches zero, which scales the entire derivative dN/dt to zero, leveling the population size curve."
  },
  {
    topic: "Genetics Molecular transcription",
    q: "A molecular biologist treats a eukaryotic culture with alpha-amanitin, a toxic peptide found in death cap mushrooms. The cell continues to synthesize 28S and 18S ribosomic RNA but completely fails to synthesize messenger RNA (mRNA). Which enzyme is inhibited?",
    choices: [
      { text: "RNA Polymerase II", isCorrect: true },
      { text: "RNA Polymerase I", isCorrect: false },
      { text: "RNA Polymerase III", isCorrect: false },
      { text: "Reverse Transcriptase", isCorrect: false }
    ],
    rationale: "Eukaryotic cells use RNA Polymerase I to transcribe large rRNAs (28S, 18S, 5.8S) and RNA Polymerase III to transcribe 5S rRNA and tRNAs. RNA Polymerase II transcribes pre-mRNAs and is highly sensitive to inhibition by alpha-amanitin."
  },
  {
    topic: "Cell Biology Cytoskeletal motor proteins",
    q: "A nerve axon cell relies on axonal transport to deliver vesicles containing neurotransmitters from the soma to the synaptic terminal. If a drug inhibits kinesin motor function, what is the direct cellular pathobiology?",
    choices: [
      { text: "Failure of anterograde transport towards the plus-end of microtubules", isCorrect: true },
      { text: "Complete collapse of retrograde transport towards microtubule-organizing centers", isCorrect: false },
      { text: "Disalignment of actin microfilaments beneath the plasma membrane", isCorrect: false },
      { text: "Inability to polymerize tubulin heterodimers into protofilaments", isCorrect: false }
    ],
    rationale: "Kinesin is a molecular motor that moves cargo anterogradely (toward the plus-end of microtubules, which points toward the synapse). Dynein moves cargo retrogradely (toward the minus-end, closer to the cell body)."
  },
  {
    topic: "Anatomy Gastrointestinal digestion",
    q: "A 35-year-old patient who had a complete gastrectomy is evaluated for megaloblastic anemia. Supplementation of all of the following elements is critical in this patient except for which of the following?",
    choices: [
      { text: "Short-chain fatty acids requiring gastric esterases", isCorrect: true },
      { text: "Intravenous or sublingual Vitamin B12 due to loss of parietal cell intrinsic factor", isCorrect: false },
      { text: "Folate absorption therapy to prevent red cell development arrest", isCorrect: false },
      { text: "Iron supplementation due to loss of stomach acid-mediated reduction to Fe2+", isCorrect: false }
    ],
    rationale: "Short-chain fatty acid absorption occurs primarily in the colon and is independent of gastric processing. Conversely, Vitamin B12 requires gastric intrinsic factor for absorption, and iron absorption requires stomach acid to convert dietary ferric iron (Fe3+) into the absorbable ferrous form (Fe2+)."
  },
  {
    topic: "Botany Plant transpirational pull",
    q: "Which of the following conditions will minimize transpirational water loss in angiosperms while maintaining net photosynthetic carbon assimilation under high solar exposure?",
    choices: [
      { text: "CAM photosynthesis, opening stomata strictly during the cool night hours", isCorrect: true },
      { text: "C3 photosynthesis, concentrating stomata on the upper epidermis of leaf sheets", isCorrect: false },
      { text: "C4 photosynthesis, closing bundle sheath chloroplasts during midday", isCorrect: false },
      { text: "None of the above", isCorrect: false }
    ],
    rationale: "CAM plants minimize water loss by opening their stomata exclusively at night, when the relative humidity is higher and temperatures are lower. They store carbon dioxide as malic acid in vacuoles and use it for photosynthesis during the day with closed stomata."
  },
  {
    topic: "Ecology Competitive Exclusion Principle",
    q: "Two species of *Paramecium* (*P. aurelia* and *P. caudatum*) are grown together in a culture containing a fixed volume of nutrient medium. Eventually, *P. caudatum* goes extinct while *P. aurelia* thrives. This illustrates:",
    choices: [
      { text: "Gause's Principle of Competitive Exclusion", isCorrect: true },
      { text: "Lotka-Volterra predator-prey cyclic oscillation", isCorrect: false },
      { text: "Altruistic kin selection in closed niches", isCorrect: false },
      { text: "Mutualistic co-adaptation under resource limits", isCorrect: false }
    ],
    rationale: "Gause's Principle of Competitive Exclusion states that two species competing for the exact same limiting resource cannot coexist indefinitely; the species with even a slight advantage will drive the other to local extinction."
  },
  {
    topic: "Genetics Restriction digest electrophoresis",
    q: "A forensic geneticist digests a genomic locus with a restriction enzyme that cuts palindromic sequences. If a mutation alters a single base pair in the recognition site, what band pattern is observed on agarose gel electrophoresis compared to wild-type controls?",
    choices: [
      { text: "Fewer bands with larger overall length profiles", isCorrect: true },
      { text: "A greater number of bands with smaller average molecular size", isCorrect: false },
      { text: "An identical band profile with increased fluorescence intensity", isCorrect: false },
      { text: "No migration of the fragments away from the cathode wells", isCorrect: false }
    ],
    rationale: "If a restriction site is mutated, the enzyme cannot cut at that location. This decreases the total number of cuts, yielding fewer, longer fragments (RFLPs) that migrate more slowly on the gel."
  },
  {
    topic: "Cell Biology Meiotic recombination and crossing",
    q: "During prophase I of meiosis, sister chromatids pair up during synapsis. At which specific sub-stage does crossing over (homologous genetic recombination) occur?",
    choices: [
      { text: "Pachynema (Pachytene)", isCorrect: true },
      { text: "Zygonema (Zygotene)", isCorrect: false },
      { text: "Leptonema (Leptotene)", isCorrect: false },
      { text: "Diplonema (Diplotene)", isCorrect: false }
    ],
    rationale: "Synapsis (pairing of homologous chromosomes) is initiated in zygotene, but crossing over occurs during the pachytene stage of meiotic prophase I."
  },
  {
    topic: "Anatomy Endocrine adrenal cortex",
    q: "A patient presents with hyper-pigmentation, hypotension, low serum sodium (hyponatremia), and elevated serum potassium (hyperkalemia). Pathology of which adrenal cortical zone is directly responsible for lack of aldosterone release?",
    choices: [
      { text: "Zona glomerulosa", isCorrect: true },
      { text: "Zona fasciculata", isCorrect: false },
      { text: "Zona reticularis", isCorrect: false },
      { text: "Adrenal medulla", isCorrect: false }
    ],
    rationale: "The adrenal cortex is structured into three zones (GFR): Zona glomerulosa (produces mineralocorticoids like aldosterone), Zona fasciculata (produces glucocorticoids like cortisol), and Zona reticularis (produces androgens)."
  },
  {
    topic: "Botany Phloem transport mechanism",
    q: "According to the Münch pressure-flow hypothesis representing phloem translocation, what drives the bulk flow of sucrose-rich sap from source leaves to sink physiological organs?",
    choices: [
      { text: "A turgor pressure gradient established by active sucrose loading and localized osmosis", isCorrect: true },
      { text: "Capillary action supported by adhesion to phloem sieve tube walls", isCorrect: false },
      { text: "Negative pressure suction generated by leaf transpiration", isCorrect: false },
      { text: "Peristaltic contraction of vascular smooth companion fibers", isCorrect: false }
    ],
    rationale: "Active loading of sucrose into sieve tubes at the source lowers water potential, drawing water in by osmosis. This builds hydrostatic (turgor) pressure. At the sink, sucrose is unloaded, water exits, and turgor pressure drops, driving mass flow."
  },
  {
    topic: "Ecology Biogeochemical cycles",
    q: "Which group of soil bacteria carries out the conversion of toxic ammonium (NH4+) into nitrite (NO2-), and then into nitrate (NO3-) during the nitrogen cycle?",
    choices: [
      { text: "Nitrifying bacteria (e.g. *Nitrosomonas* and *Nitrobacter*)", isCorrect: true },
      { text: "Denitrifying pseudomonads converting biological nitrogen to gaseous N2", isCorrect: false },
      { text: "Nitrogen-fixing mutualists located in root legumes", isCorrect: false },
      { text: "Saprotrophic fungi releasing enzymes into leaf detritus", isCorrect: false }
    ],
    rationale: "Nitrifying bacteria oxidize ammonia/ammonium first to nitrite (*Nitrosomonas*) and then to nitrate (*Nitrobacter*), which is the primary nitrogen form assimilated by terrestrial plants."
  },
  {
    topic: "Genetics Lac operon regulation",
    q: "*Escherichia coli* cells are grown in a medium containing both glucose and lactose. Under these conditions, what is the state of transcriptional regulation at the lactose operon?",
    choices: [
      { text: "Transcription is repressed because low cAMP prevents CAP binding, and lac repressor attaches", isCorrect: false },
      { text: "Transcription occurs at low basal levels because glucose prevents cAMP accumulation, but lactose removes the repressor", isCorrect: true },
      { text: "High levels of transcription occur because glucose acts as an inducer for CAP proteins", isCorrect: false },
      { text: "None of the above", isCorrect: false }
    ],
    rationale: "lactose binds to the lac repressor, altering its shape so it cannot bind the operator. However, because glucose is present, cAMP levels are low, and the CAP activator cannot bind. This results in only low, basal levels of transcription."
  },
  {
    topic: "Cell Biology Apoptosis pathways",
    q: "When a eukaryotic cell sustains irreparable DNA damage, it triggers the intrinsic apoptotic pathway. Which mitochondrial protein is released into the cytosol to form the apoptosome complex with Apaf-1 and procaspase-9?",
    choices: [
      { text: "Cytochrome C", isCorrect: true },
      { text: "BCL-2 anti-apoptotic receptor", isCorrect: false },
      { text: "Fas ligand death activator", isCorrect: false },
      { text: "Phosphatidylserine membrane marker", isCorrect: false }
    ],
    rationale: "In the intrinsic apoptotic pathway, pore formation in the outer mitochondrial membrane (mediated by Bax/Bak) permits Cytochrome C release into the cytosol, where it builds the apoptosome complex to activate caspase cascades."
  },
  {
    topic: "Anatomy Myofibril muscle contraction",
    q: "During skeletal muscle contraction, which of the following bands or zones in the sarcomere does not shorten during sliding filament interactions?",
    choices: [
      { text: "The A-band", isCorrect: true },
      { text: "The H-zone", isCorrect: false },
      { text: "The I-band", isCorrect: false },
      { text: "The sarcomere overall length", isCorrect: false }
    ],
    rationale: "The A-band spans the entire length of the thick myosin filaments. Although thin actin filaments slide past thick filaments, shortening the H-zone (myosin-only) and I-band (actin-only), the thick filaments do not shorten, keeping the A-band length constant."
  },
  {
    topic: "Botany Photoperiodism flowering",
    q: "A short-day plant is grown in a climate chamber under a photoperiodic cycle that triggers flowering. If the plant is exposed to a flash of red light in the middle of its long night, which response of the phytochrome system is expected?",
    choices: [
      { text: "Flowering is inhibited; Pr is immediately converted to the biochemically active Pfr state", isCorrect: true },
      { text: "Flowering is accelerated; Pfr is instantly converted into the inactive Pr state", isCorrect: false },
      { text: "Apical vegetative meristems convert into woody bark layers via jasmonate release", isCorrect: false },
      { text: "The flash does not interfere because short-day plants depend on photosynthetic sugar loads", isCorrect: false }
    ],
    rationale: "Short-day (long-night) plants require an uninterrupted dark period to flower. A flash of red light in the dark converts inactive phytochrome Pr into active phytochrome Pfr, which inhibits flowering in short-day plants."
  },
  {
    topic: "Ecology Ecological succession",
    q: "A volcanic eruption wipes out all life and topsoil on an island. Over decades, lichens settle on the bare rock, slowly breaking it down into mineral soil fragments. This colonizing phase of lichens represents:",
    choices: [
      { text: "Pioneer species initiating primary succession", isCorrect: true },
      { text: "Climax community under secondary succession", isCorrect: false },
      { text: "Competitive exclusion under cyclic succession", isCorrect: false },
      { text: "Trophic facilitation under autotrophy", isCorrect: false }
    ],
    rationale: "Primary succession occurs on substrates that lack established soil (like bare rock or lava flows). Lichens are pioneer species because they tolerate harsh conditions and generate organic acids to build the initial soil."
  },
  {
    topic: "Genetics Hardy-Weinberg equilibrium",
    q: "In a stable, randomly-mating population under Hardy-Weinberg equilibrium, the frequency of a recessive phenotypic trait is 0.09. What is the frequency of heterozygotes (carriers) in this population?",
    choices: [
      { text: "0.42 (or 42%)", isCorrect: true },
      { text: "0.21 (or 21%)", isCorrect: false },
      { text: "0.70 (or 70%)", isCorrect: false },
      { text: "0.18 (or 18%)", isCorrect: false }
    ],
    rationale: "The recessive phenotype frequency is q^2 = 0.09, which means q = 0.3. Because p + q = 1, p = 0.7. The heterozygote frequency is 2pq = 2 * (0.7) * (0.3) = 0.42, or 42%."
  },
  {
    topic: "Cell Biology Cell cycle checkpoints",
    q: "A cell undergoes DNA replication during S phase, but some of the DNA template strands remain uncopied. Which cyclin-cdk complex activity must be inhibited to prevent transition into the mitotic (M) phase?",
    choices: [
      { text: "Cyclin B-CDK1 (MPF)", isCorrect: true },
      { text: "Cyclin D-CDK4/6", isCorrect: false },
      { text: "Cyclin E-CDK2", isCorrect: false },
      { text: "Cyclin A-CDK2", isCorrect: false }
    ],
    rationale: "Cycle progression from G2 to mitotic M-phase is governed by the G2/M checkpoint, which requires the activation of Cyclin B-CDK1 (also known as M-Cdk or Mitosis-Promoting Factor, MPF)."
  },
  {
    topic: "Anatomy Neuromuscular junction transmission",
    q: "During motor signal transmission, action potentials trigger calcium influx into the presynaptic terminal, driving acetylcholine vesicle release. If a patient is exposed to botulinum toxin, what is the biomolecular mechanism of action?",
    choices: [
      { text: "Cleaving SNARE proteins to block synaptic vesicle fusion", isCorrect: true },
      { text: "Binding competitively to postsynaptic nicotinic receptors", isCorrect: false },
      { text: "Inhibiting acetylcholinesterase to increase receptor stimulation", isCorrect: false },
      { text: "Blocking voltage-gated sodium channels in the sarcolemma", isCorrect: false }
    ],
    rationale: "Botulinum toxin is a protease that cleaves SNARE proteins (such as synaptobrevin or syntaxin). This blocks synaptic vesicle docking and fusion in motor neurons, preventing acetylcholine release and causing flaccid paralysis."
  },
  {
    topic: "Botany Plant defenses",
    q: "When a leaf is chewed by an herbivore, it synthesizes systemic signals that diffuse to distant branches to mobilize anti-herbivore defenses. Which hormone is primary to systemic defense signaling?",
    choices: [
      { text: "Jasmonic Acid (Jasmonate)", isCorrect: true },
      { text: "Gibberellic Acid", isCorrect: false },
      { text: "Salicylic Acid", isCorrect: false },
      { text: "Brassinosteroids", isCorrect: false }
    ],
    rationale: "Jasmonic Acid is the primary hormone coordinating defense against herbivory and necrotrophic pathogens, triggering the synthesis of protease inhibitors and secondary toxic metabolites."
  },
  {
    topic: "Ecology Population density dynamics",
    q: "Which of the following factors acting on a wildlife population represents a density-independent limiting factor?",
    choices: [
      { text: "A severe freeze during mid-winter", isCorrect: true },
      { text: "Intraspecific competition for nesting cavities", isCorrect: false },
      { text: "An epidemic of viral hemorrhagic fever", isCorrect: false },
      { text: "Apex predator density shifting searching images", isCorrect: false }
    ],
    rationale: "Density-independent factors (such as extreme weather, volcanic eruptions, or forest fires) affect individuals regardless of the population's density, unlike biotic factors like disease or competition."
  },
  {
    topic: "Genetics DNA replication kinetics",
    q: "During DNA replication in *E. coli*, which enzyme is primarily responsible for synthesizing the short RNA primers on the lagging strand that template Okazaki fragments?",
    choices: [
      { text: "DNA Primase (DnaG)", isCorrect: true },
      { text: "DNA Polymerase I", isCorrect: false },
      { text: "DNA Helicase (DnaB)", isCorrect: false },
      { text: "DNA Ligase", isCorrect: false }
    ],
    rationale: "DNA Primase (DnaG) is an RNA polymerase that synthesizes short complementary RNA primers (typically 10-12 nucleotides long), which provide the 3'-OH end needed by DNA Polymerase III to extend Okazaki fragments."
  },
  {
    topic: "Cell Biology Carbohydrate membrane tags",
    q: "A cell line has a mutation that prevents glycosylation in the endoplasmic reticulum. Which cellular structure is likely directly impaired?",
    choices: [
      { text: "The extracellular glycocalyx used in cell-cell recognition", isCorrect: true },
      { text: "The hydrophobic lipid core of the plasma membrane", isCorrect: false },
      { text: "The microtubule alignment inside mitotic spindles", isCorrect: false },
      { text: "The nuclear envelope lamina network", isCorrect: false }
    ],
    rationale: "Glyproteins and glycolipids form the extracellular glycocalyx, which is key for cell-cell recognition, adhesion, and signaling. Its synthesis depends on ER and Golgi glycosylation pathways."
  },
  {
    topic: "Anatomy Nephron physiology",
    q: "A patient presents with severe dehydration, triggering maximum antidiuretic hormone (ADH/Vasopressin) secretion. What is ADH's cellular mechanism of action to conserve water?",
    choices: [
      { text: "Binding V2 receptors to insert Aquaporin-2 into apical membranes of collecting duct cells", isCorrect: true },
      { text: "Inhibiting secondary active Na+/Cl- cotransporters in the distal tubule", isCorrect: false },
      { text: "Directly expanding the capillary surface area of Bowman's glomerulus", isCorrect: false },
      { text: "Stimulating aldosterone synthesis in the renal juxtaglomerular cells", isCorrect: false }
    ],
    rationale: "ADH binds basolateral V2 receptors in collecting duct cells, activating GPCR pathways that trigger vesicle fusion to insert Aquaporin-2 channels into the apical membrane, which enhances water reabsorption from urine."
  },
  {
    topic: "Botany Stem cell development",
    q: "A botanist applies a hormone ratio with high auxin content and low cytokinin levels to a callus culture. What is the expected developmental outcome?",
    choices: [
      { text: "The callus forms roots", isCorrect: true },
      { text: "The callus forms shoots and leaves", isCorrect: false },
      { text: "The callus remains undifferentiated but undergoes rapid expansion", isCorrect: false },
      { text: "The callus undergoes immediate senescence and programmed cell death", isCorrect: false }
    ],
    rationale: "Plant tissue differentiation is governed by the auxin-to-cytokinin ratio. A high auxin-to-cytokinin ratio promotes root definition (rhizogenesis), whereas a high cytokinin-to-auxin ratio promotes shoot and leaf definition."
  },
  {
    topic: "Ecology Biome characteristics",
    q: "An ecological team surveys a terrestrial biome characterized by cold dry winters, hot wet summers, periodic wildfires, and dominated by deep-rooted perennial grasses rather than woody shrubs. This biome is classified as:",
    choices: [
      { text: "Temperate Grassland", isCorrect: true },
      { text: "Chaparral (shrub forest)", isCorrect: false },
      { text: "Taiga (Coniferous forest)", isCorrect: false },
      { text: "Tundra", isCorrect: false }
    ],
    rationale: "Temperate grasslands (such as North American prairies or Asian steppes) are dominated by perennial grasses, experience cold winters and hot summers, and depend on fires and seasonal droughts to limit woody plant encroachment."
  },
  {
    topic: "Genetics Central Dogma gene splicing",
    q: "During the processing of eukaryotic pre-mRNA, which ribonucleoprotein complexes are responsible for recognizing intron boundaries and splicing out the non-coding sequences?",
    choices: [
      { text: "Spliceosome snRNPs", isCorrect: true },
      { text: "Ribosomal 40S subunits", isCorrect: false },
      { text: "Histone acetyltransferases", isCorrect: false },
      { text: "None of the above", isCorrect: false }
    ],
    rationale: "Spliceosome complex snRNPs (small nuclear ribonucleoproteins, such as U1, U2, U4, U5, and U6) recognize consensus splice sites at intron boundaries and catalyze the transesterification loops to excise introns as lariats."
  },
  {
    topic: "Cell Biology Active membrane pumps",
    q: "The standard sodium-potassium active pump (Na+/K+ ATPase) maintains resting membrane potentials across human cells. What are the directionality and stoichiometry of ion transport by this primary active transporter per hydrolyzed ATP?",
    choices: [
      { text: "3 Na+ ions are pumped out of the cell; 2 K+ ions are pumped into the cell", isCorrect: true },
      { text: "2 Na+ ions are pumped into the cell; 3 K+ ions are pumped out of the cell", isCorrect: false },
      { text: "3 Na+ ions are pumped into the cell; 2 K+ ions are pumped out of the cell", isCorrect: false },
      { text: "3 K+ ions are pumped into the cell; 2 Na+ ions are pumped out of the cell", isCorrect: false }
    ],
    rationale: "The electrogenic Na+/K+ ATPase pumps 3 Na+ ions out of the cell and 2 K+ ions into the cell per ATP molecule, maintaining the negative intracellular resting potential."
  },
  {
    topic: "Anatomy Skeletal muscle troponin complexes",
    q: "In striated muscle cells, calcium ions initiates contraction by binding to which specific subunit of the troponin complex?",
    choices: [
      { text: "Troponin C", isCorrect: true },
      { text: "Troponin I", isCorrect: false },
      { text: "Troponin T", isCorrect: false },
      { text: "Actin monomeric bindings", isCorrect: false }
    ],
    rationale: "Calcium binds to Troponin C. This triggers a shape change that shifts the tropomyosin coil away from myosin-binding sites on actin, allowing myosin heads to form cross-bridges."
  },
  {
    topic: "Botany Seed anatomical differences",
    q: "Which of the following traits is structurally unique to monocotyledonous seeds compared to eudicotyledonous seeds?",
    choices: [
      { text: "The presence of a protective coleoptile enclosing the embryonic shoot tip", isCorrect: true },
      { text: "The presence of two large nutrient-dense storage cotyledons", isCorrect: false },
      { text: "The complete absence of a nuclear micro-endosperm", isCorrect: false },
      { text: "None of the above", isCorrect: false }
    ],
    rationale: "Monocots possess a single cotyledon and unique protective sheaths: a coleoptile (protecting the emerging plumule/shoot) and a coleorhiza (protecting the emerging radicle/root)."
  },
  {
    topic: "Ecology Species interaction indices",
    q: "A orchid species grows high up on the branch of an acacia tree. The orchid gains access to sunlight and air circulation without taking nutrients or harming the tree. What species relationship exists here?",
    choices: [
      { text: "Commensalism (+/0)", isCorrect: true },
      { text: "Mutualism (+/+)", isCorrect: false },
      { text: "Parasitism (+/-)", isCorrect: false },
      { text: "Neutral niche integration (0/0)", isCorrect: false }
    ],
    rationale: "Commensalism is an interaction where one species benefits (the orchid gains light access) while the other species is neither helped nor harmed (the tree is unaffected)."
  },
  {
    topic: "Genetics Sex-linked inheritance defects",
    q: "A male patient with classic hemophilia A (an X-linked recessive bleeding disorder) has children with a phenotypically normal female who has no history of the mutation in her ancestry. Which statement represents the genetic probability for their offspring?",
    choices: [
      { text: "All daughters will be carriers; all sons will be normal non-carriers", isCorrect: true },
      { text: "All sons will inherit the disease; daughters will be normal non-carriers", isCorrect: false },
      { text: "50% of sons will inherit the disease; 50% of daughters will be carriers", isCorrect: false },
      { text: "All offspring have a 50% chance of expressing clinical bleeding phenotypes", isCorrect: false }
    ],
    rationale: "The copy of the father's X chromosome (which carries the hemophilia allele) is passed to all daughters, making them carriers. He passes his normal Y chromosome to all sons, making them completely free of the mutation."
  },
  {
    topic: "Cell Biology Biochemical glycolysis",
    q: "During aerobic respiration, what is the net yield of ATP and reduced NADH produced exclusively per single glucose molecule that completes glycolysis in the cytosol?",
    choices: [
      { text: "2 ATP and 2 NADH", isCorrect: true },
      { text: "4 ATP and 2 NADH", isCorrect: false },
      { text: "2 ATP and 4 NADH", isCorrect: false },
      { text: "36 ATP and 10 NADH", isCorrect: false }
    ],
    rationale: "Glycolysis consumes 2 ATP to phosphorylate glucose and produces 4 ATP and 2 NADH. This yields a net of 2 ATP and 2 NADH per glucose molecule before transition into mitochondria."
  },
  {
    topic: "Anatomy Endocrine insulin release",
    q: "Beta-cells of the islets of Langerhans synthesize insulin. What direct ion dynamic stimulates exocytosis of insulin-packed vesicles in response to high glucose levels?",
    choices: [
      { text: "Calcium influx via voltage-gated channels triggered by depolarizing K-ATP gate closures", isCorrect: true },
      { text: "Sodium efflux via membrane active pumps", isCorrect: false },
      { text: "Chloride influx hyperpolarizing the intracellular matrix", isCorrect: false },
      { text: "Direct fusion from the cisternae without ion triggers", isCorrect: false }
    ],
    rationale: "Glucose metabolism increases ATP/ADP ratios, which closes ATP-sensitive potassium channels. The resulting potassium accumulation depolarizes the beta-cell, opening voltage-gated calcium channels. Calcium influx triggers insulin vesicle exocytosis."
  }
];
