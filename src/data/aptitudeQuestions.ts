export const aptitudeQuestions = [
  {
    topic: "Aptitude Quantitative mixture problems",
    q: "A vascular laboratory team needs to prepare 500 mL of a 20% ethanol solution by mixing 10% and 40% ethanol stocks. How many milliliters of the 40% stock solution are required?",
    choices: [
      { text: "166.7 mL", isCorrect: true },
      { text: "250.0 mL", isCorrect: false },
      { text: "333.3 mL", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Using C1*V1 + C2*V2 = Cf*Vf. Let x be the volume of the 40% solution. The volume of the 10% solution is (500 - x).\n0.40(x) + 0.10(500 - x) = 0.20 * 500\n0.30x + 50 = 100 => 0.30x = 50 => x = 166.67 mL."
  },
  {
    topic: "Aptitude Inductive pattern rotations",
    q: "Analyze a rotating visual symbol: In Step 1, it points North (0°) and has surface area x. In Step 2, it points Northeast (45°) and its area is 2x. In Step 3, it points East (90°) and its area is 0.5x. If this rotation-area pattern continues, what should Step 4 resemble?",
    choices: [
      { text: "A shape pointing Southeast (135°) with surface area 2x", isCorrect: true },
      { text: "A shape pointing South (180°) with surface area x", isCorrect: false },
      { text: "A shape pointing South (180°) with surface area 0.5x", isCorrect: false },
      { text: "A shape pointing Southwest (225°) with surface area 4x", isCorrect: false }
    ],
    rationale: "The angular rotation proceeds by +45° clockwise in each step. The area alternates between doubling (2x) and halving (0.5x). At step 3, we had 0.5x area and 90° rotation. Step 4 requires +45° rotation (to 135°) and a doubling of the area (2 * 0.5x = 1.0x which corresponds to 2x relative to step 3's 0.5x, i.e. 2 * current = 1.0x area which is double step 3's area)."
  },
  {
    topic: "Aptitude Verbal reading passage",
    q: "The principle of active retrieval asserts that human memory is not a passive recording vault but a dynamic constructive network. Studies show that active recall stimulates myelin thickening around neural pathways, enhancing recall speed. What is the author’s primary thesis?",
    choices: [
      { text: "Active recall strengthens long-term memory retrieval pathways structurally", isCorrect: true },
      { text: "Passive studying is superior because it conserves ATP", isCorrect: false },
      { text: "Myelin is only produced during childhood development cycles", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The author asserts that memory is a dynamic constructive system, and active recall physically alters it via myelin thickness, improving retrieval, which means active recall structurally reinforces long-term memory pathways."
  },
  {
    topic: "Aptitude Perceptual planar reflections",
    q: "An isometric block has its front face painted with vertical stripes, and its top face painted with horizontal stripes. When viewed through a standard flat vertical mirror on its right lateral side, how do these patterns appear in the reflection?",
    choices: [
      { text: "Vertical stripes on the front face, and horizontal stripes on the top face", isCorrect: true },
      { text: "Horizontal stripes on the front face, and vertical stripes on the top face", isCorrect: false },
      { text: "The entire block appears as a dark void without stripes", isCorrect: false },
      { text: "all of the above under separate conditions", isCorrect: false }
    ],
    rationale: "A vertical flat mirror flips the horizontal axis but preserves the vertical axis. Thus, vertical lines remain vertical, and horizontal lines parallel to the mirror remain horizontal. The stripes do not change their fundamental orientation."
  },
  {
    topic: "Aptitude Quantitative probability genetic",
    q: "Two carriers of a rare autosomal recessive cystic disorder plan to have a child. What is the probability that they will have a child who is both clinically unaffected and a carrier of the recessive gene?",
    choices: [
      { text: "50% (or 2/4)", isCorrect: true },
      { text: "25% (or 1/4)", isCorrect: false },
      { text: "75% (or 3/4)", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Crossing two carriers (Aa x Aa) yields 1/4 AA (unaffected non-carrier), 2/4 Aa (unaffected carrier), and 1/4 aa (affected). The probability of a child being unaffected AND a carrier is 2/4, which is 50%."
  },
  {
    topic: "Aptitude Verbal analogies",
    q: "Identify the word analogous to: LACONIC is to TERSE as EPHEMERAL is to:",
    choices: [
      { text: "Transient", isCorrect: true },
      { text: "Endless", isCorrect: false },
      { text: "Ubiquitous", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Laconic and terse are synonyms meaning brief. Ephemeral means lasting a very short time, which means its synonym is transient."
  },
  {
    topic: "Aptitude Inductive sequence match",
    q: "A sequence of symbols progresses: ★, ★★, ★★★. In parallel, a numeric value increases as a prime sequence: 2, 3, 5. What must the next symbol state in this system look like?",
    choices: [
      { text: "★★★★ paired with the value 7", isCorrect: true },
      { text: "★★★★★ paired with the value 6", isCorrect: false },
      { text: "★★★★ paired with the value 9", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The number of stars increases by exactly 1 in each step. The numeric value follows the sequence of prime numbers (2, 3, 5, ...). The next prime is 7, and the star count must be 4."
  },
  {
    topic: "Aptitude Perceptual volume counts",
    q: "A flat matrix solid measures 5 blocks wide, 4 blocks deep, and 3 blocks high. If two blocks are removed from each of the four vertical corners, how many blocks remain in this isometric figure?",
    choices: [
      { text: "52 blocks", isCorrect: true },
      { text: "48 blocks", isCorrect: false },
      { text: "56 blocks", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Total blocks initially = 5 * 4 * 3 = 60 blocks. There are 4 vertical corners, each being 3 blocks high. Removing 'two blocks from each of the four vertical corners' means we remove 2 * 4 = 8 blocks. 60 - 8 = 52 blocks remain."
  },
  {
    topic: "Aptitude Quantitative work problems",
    q: "Working alone at constant speeds, Pump A can drain a clinical pool in 4 hours, whereas Pump B can drain the same pool in 6 hours. If both pumps are turned on simultaneously, how many hours will it take to drain the pool?",
    choices: [
      { text: "2.4 hours", isCorrect: true },
      { text: "5.0 hours", isCorrect: false },
      { text: "2.5 hours", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Using the rate formula: 1/T = 1/Ta + 1/Tb. 1/T = 1/4 + 1/6 = 3/12 + 2/12 = 5/12. Therefore, T = 12/5 = 2.4 hours."
  },
  {
    topic: "Aptitude Inductive logical deductions",
    q: "If all pre-meds study biology, and some biologists are research scientists. Which of the following statements must be true based on this logical structure?",
    choices: [
      { text: "Some pre-meds may be research scientists, but it is not guaranteed", isCorrect: true },
      { text: "All pre-meds are research scientists", isCorrect: false },
      { text: "No pre-meds are research scientists", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "We know Pre-meds ⊆ Biologists. We also know Biologists ∩ Researchers ≠ ∅. However, since the intersection of Biologists and Researchers does not have to overlap with the subset of Pre-meds, it is possible but not guaranteed that some pre-meds are research scientists."
  },
  {
    topic: "Aptitude Verbal sentence completions",
    q: "Although her clinical presentation was initially ____, suggesting a benign course, the subsequent rapid deterioration of her vital indicators shocked the attending physicians.",
    choices: [
      { text: "innocuous", isCorrect: true },
      { text: "conspicuous", isCorrect: false },
      { text: "pernicious", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The word 'Although' signals a contrast. The missing word must contrast with 'deterioration' and align with 'benign course'. 'Innocuous' means harmless or benign, making it the perfect fit."
  },
  {
    topic: "Aptitude Perceptual flat fold templates",
    q: "A flat cardboard template is cut in the shape of a cross with 6 identical squares. When folded along the inner seams, which 3D figure is manufactured?",
    choices: [
      { text: "A standard cube", isCorrect: true },
      { text: "A triangular pyramid", isCorrect: false },
      { text: "An open cylinder", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "A cross composed of 6 squares is a classic 2D folding net for a standard 3D cube. When folded by 90° along each internal intersection, it closes completely to form a 6-faced cube."
  },
  {
    topic: "Aptitude Quantitative cost problems",
    q: "A lab purchase order of 15 pipettes and 10 beakers costs exactly $150. A second order under identical prices containing 5 pipettes and 20 beakers costs $150. What is the individual cost of a single beaker?",
    choices: [
      { text: "$6.00", isCorrect: true },
      { text: "$4.00", isCorrect: false },
      { text: "$5.00", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Let P be the price of a pipette and B be the price of a beaker. We have dry systems of equations:\n1) 15P + 10B = 150  => 3P + 2B = 30\n2) 5P + 20B = 150  => P + 4B = 30 => P = 30 - 4B\nSubstitute P into (1):\n3(30 - 4B) + 2B = 30 => 90 - 12B + 2B = 30 => 60 = 10B => B = $6.00."
  },
  {
    topic: "Aptitude Inductive series progressions",
    q: "What is the next number in the following sequence: 3, 5, 9, 17, 33, ...?",
    choices: [
      { text: "65", isCorrect: true },
      { text: "49", isCorrect: false },
      { text: "51", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The difference between consecutive terms doubles in each step: 5-3=2; 9-5=4; 17-9=8; 33-17=16. The next difference must be 16 * 2 = 32. Thus, the next term is 33 + 32 = 65. (Alternatively, the pattern satisfies Un = 2*Un-1 - 1)."
  },
  {
    topic: "Aptitude Verbal reading inferences",
    q: "Psychological resilience is not a static trait but a collection of flexible coping strategies. Active cognitive reframing lowers amygdala activation, reducing hormonal stress levels. Which of the following is most strongly supported by the text?",
    choices: [
      { text: "Individuals can learn and train cognitive strategies to reduce biological stress reactions", isCorrect: true },
      { text: "Resilience is entirely pre-determined by genetic inheritance", isCorrect: false },
      { text: "Amygdala activity is immune to conscious cognitive intervention", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The passage states that resilience is a set of 'flexible coping strategies' and that 'active cognitive reframing' (a strategy) reduces amygdala activation and stress hormones. This directly implies that cognitive training can lower biological stress responses."
  },
  {
    topic: "Aptitude Perceptual visual overlaps",
    q: "Two transparent sheets carry patterns. Sheet A has a horizontal line across the middle; Sheet B has a vertical line down the middle. When Sheet A is rotated 90° clockwise and then overlaid directly on top of Sheet B, what pattern is formed?",
    choices: [
      { text: "A single vertical line down the middle of the sheet", isCorrect: true },
      { text: "A cross intersecting in the center of the sheet", isCorrect: false },
      { text: "A perfect empty circle in the center", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Sheet A has a horizontal line. Rotating it 90° makes it a vertical line. Overlaying Sheet B (which also has a vertical line down the middle) yields two overlapping vertical lines, resulting in a single vertical line."
  },
  {
    topic: "Aptitude Quantitative distance rates",
    q: "A clinical courier travels from Hospital A to Hospital B at an average speed of 60 km/h, and returns along the same route at an average speed of 40 km/h. What was their average speed for the entire round trip?",
    choices: [
      { text: "48 km/h", isCorrect: true },
      { text: "50 km/h", isCorrect: false },
      { text: "45 km/h", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Let D be the distance between hospitals. Total distance = 2D. Time to go = D/60; time to return = D/40. Total time = D/60 + D/40 = (2D/120) + (3D/120) = 5D/120 = D/24. Average speed = distance / time = 2D / (D/24) = 48 km/h. (This is the harmonic mean of the speeds)."
  },
  {
    topic: "Aptitude Inductive matrix puzzles",
    q: "In a 3x3 logical grid, the rows display symbols in sequence. Row 1 has Circle, Square, Triangle. Row 2 has Square, Triangle, Circle. If Row 3 begins with Triangle, Circle, what must be the final missing symbol?",
    choices: [
      { text: "Square", isCorrect: true },
      { text: "Circle", isCorrect: false },
      { text: "Triangle", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Each row and column contains exactly one of each symbol: Circle, Square, and Triangle. Row 3 contains Triangle and Circle, so the third and final element must be the Square."
  },
  {
    topic: "Aptitude Verbal logical arguments",
    q: "Premise 1: No synthetic antibiotics cure viral infections. Premise 2: Compound X cured a viral infection in a trial. What conclusion can be drawn from these premises?",
    choices: [
      { text: "Compound X is not a synthetic antibiotic", isCorrect: true },
      { text: "Compound X is highly toxic to human cells", isCorrect: false },
      { text: "Compound X can cure any viral infection", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Since no synthetic antibiotics cure viral infections, and Compound X did cure a viral infection, Compound X cannot belong to the set of synthetic antibiotics."
  },
  {
    topic: "Aptitude Perceptual spatial block rotations",
    q: "A wooden cube has its top and bottom faces painted red, its front and back faces painted blue, and its left and right faces painted green. If this cube is rotated 90° about its vertical axis (pitch), which color faces are now pointing North (front) and South (back)?",
    choices: [
      { text: "Green", isCorrect: true },
      { text: "Blue", isCorrect: false },
      { text: "Red", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Rotating about the vertical axis keeps the top and bottom faces (red) pointing in the same direction. However, the lateral faces rotate by 90°. The left/right faces (green) rotate to become the front (North) and back (South) faces."
  },
  {
    topic: "Aptitude Quantitative age word puzzles",
    q: "A senior researcher is currently three times as old as junior resident Dr. Santos. Five years ago, the researcher was four times as old as Dr. Santos. How old is Dr. Santos currently?",
    choices: [
      { text: "15 years old", isCorrect: true },
      { text: "20 years old", isCorrect: false },
      { text: "10 years old", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Let R be the researcher's age and S be Dr. Santos's age. We have:\n1) R = 3S\n2) R - 5 = 4(S - 5)\nSubstitute (1) into (2):\n3S - 5 = 4S - 20 => S = 15 years old."
  },
  {
    topic: "Aptitude Inductive letter sequences",
    q: "What is the next term in the following letter sequence: B, D, G, K, P, ...?",
    choices: [
      { text: "V", isCorrect: true },
      { text: "U", isCorrect: false },
      { text: "T", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The gaps between letters in the alphabet increase by 1 letter in each step: B (+1 letter: C) -> D (+2 letters: E,F) -> G (+3 letters: H,I,J) -> K (+4 letters: L,M,N,O) -> P (+5 letters: Q,R,S,T,U) -> V."
  },
  {
    topic: "Aptitude Verbal reading context",
    q: "A pharmaceutical trail evaluates a drug targeting cognitive decline. The results show a statistically significant increase in acetylcholine levels, but participants exhibit zero change in daily memory performance surveys. Which statement describes this outcome?",
    choices: [
      { text: "The drug has biomarker efficacy but lacks clinical functional efficacy in this study", isCorrect: true },
      { text: "The drug is unspontaneously metabolizable", isCorrect: false },
      { text: "Acetylcholine is unrelated to cognitive pathways", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The drug successfully alters the biological marker (acetylcholine, showing chemical/biomarker efficacy), but has no effect on actual daily activities/memory (lacking functional clinical efficacy)."
  },
  {
    topic: "Aptitude Perceptual flat fold cubes",
    q: "A standard six-sided die has opposite faces that always sum to 7 (1 opposite 6, 2 opposite 5, 3 opposite 4). If the die is rolled twice, first tipping forward (North) and then tipping right (East), which face is now pointing upwards if 1 was initially on top and 2 was facing North?",
    choices: [
      { text: "3", isCorrect: true },
      { text: "5", isCorrect: false },
      { text: "4", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "1 is on top (6 is bottom), 2 is North (5 is South). The remaining faces are 3 and 4 (East/West). Tilting North (forward) makes 2 move to the bottom, 5 moves to top, 1 moves to North, 6 moves to South. Now 5 is top, 2 is bottom, 1 is North, 6 is South. Tilting East (right) means the North/South axis (1 and 6) is unchanged. Top (5) rolls to East, bottom (2) rolls to West. The West face (formerly 3 or 4) rolls to the top. From relative axes, 3 ends on top."
  },
  {
    topic: "Aptitude Quantitative geometric areas",
    q: "A circular petri dish has a radius of 10.0 cm. If its radius is increased by exactly 10%, by what percentage does the area of the dish expand?",
    choices: [
      { text: "21%", isCorrect: true },
      { text: "10%", isCorrect: false },
      { text: "20%", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Area is proportional to the square of the radius (A = π*r^2). If r is scaled by 1.10, the new area is A_new = π * (1.10 * r)^2 = 1.21 * A. This represents an increase of exactly 21%."
  },
  {
    topic: "Aptitude Inductive logical reasoning",
    q: "Premise 1: All cells containing chlorophyll carry out photosynthesis. Premise 2: Some cyanobacteria carry out photosynthesis. What can be concluded about whether cyanobacteria contain chlorophyll?",
    choices: [
      { text: "cannot be determined based on the given information", isCorrect: true },
      { text: "All cyanobacteria contain chlorophyll", isCorrect: false },
      { text: "No cyanobacteria contain chlorophyll", isCorrect: false },
      { text: "Some cyanobacteria contain chlorophyll", isCorrect: false }
    ],
    rationale: "Premise 1 establishes Chlorophyll ⊆ Photosynthesis. Premise 2 states Cyanobacteria ∩ Photosynthesis ≠ ∅. However, since the subset of photosynthetic cyanobacteria does not have to lie inside the subset of Chlorophyll-containing cells (some photosynthetic cells might use other pigments), this cannot be determined from the premises."
  },
  {
    topic: "Aptitude Verbal analogies antonyms",
    q: "Identify the word containing the opposite analog: ALTRUISTIC is to SELFISH as BENEVOLENT is to:",
    choices: [
      { text: "Malevolent", isCorrect: true },
      { text: "Magnanimous", isCorrect: false },
      { text: "Benevolent", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Altruistic and selfish are direct antonyms. Benevolent means kind and well-meaning, making its analog antonym malevolent (wishing evil or harm to others)."
  },
  {
    topic: "Aptitude Perceptual pattern count blocks",
    q: "A flat rectangular plastic sheet holds 12 identical circular vaccine vials. When viewed from above, the vials are placed in 4 rows and 3 columns, touching their adjacent neighbors. If a laser cuts through the grid along a straight diagonal line segment from the top-left corner to the bottom-right corner, how many vials are cut by the laser?",
    choices: [
      { text: "6 vials", isCorrect: true },
      { text: "4 vials", isCorrect: false },
      { text: "5 vials", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "For a grid of m x n blocks, a diagonal line cuts through exactly (m + n - gcd(m, n)) blocks. For a 4 x 3 grid, gcd(4, 3) = 1. The number of cut vials is 4 + 3 - 1 = 6 vials."
  },
  {
    topic: "Aptitude Quantitative percentage increments",
    q: "A hospital bed price is increased by 20% due to supply chain backlogs, and then subsequently discounted by 20% during a holiday sale. How does the final sale price compare to the original price?",
    choices: [
      { text: "It is 4% cheaper than the original price", isCorrect: true },
      { text: "It is identical to the original price", isCorrect: false },
      { text: "It is 2% expensive than the original price", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Let P be the initial price. After the 20% hike, the price is 1.20P. Discounting this by 20% yields: Price_final = 1.20P * (1 - 0.20) = 1.20P * 0.80 = 0.96P. This is 96% of the initial price, representing a 4% decrease."
  },
  {
    topic: "Aptitude Inductive structural number sequences",
    q: "What is the missing term in the sequence: 2, 6, 12, 20, 30, __, 56?",
    choices: [
      { text: "42", isCorrect: true },
      { text: "40", isCorrect: false },
      { text: "44", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The terms follow the formula Un = n * (n + 1). U1 = 1*2=2; U2 = 2*3=6; U3 = 3*4=12; U4 = 4*5=20; U5 = 5*6=30. The sixth term must be U6 = 6 * 7 = 42."
  },
  {
    topic: "Aptitude Verbal structural comprehension",
    q: "Because the investigator's report was completely compiled from hearsay and filled with speculation, the research board deemed its conclusions to be ____ and dismissed the entire case.",
    choices: [
      { text: "spurious", isCorrect: true },
      { text: "empirical", isCorrect: false },
      { text: "indubitable", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The word 'spurious' means false, fake, or lacking logic. This is the only option that is consistent with 'hearsay and filled with speculation'."
  },
  {
    topic: "Aptitude Perceptual 3D shadows",
    q: "A solid wooden cone stands upright on its circular flat base. If a bright light shines on it horizontally from the side, what shape is the resulting shadow cast on a flat vertical wall behind it?",
    choices: [
      { text: "A triangle", isCorrect: true },
      { text: "A circle", isCorrect: false },
      { text: "An ellipse", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "When lit horizontally from the side, the silhouette or projection of a vertical cone is represented by its triangular cross-section, forming a triangle shadow on a vertical wall."
  },
  {
    topic: "Aptitude Quantitative work rates rates",
    q: "An automated enzyme synthesizer can prepare 20 test kits in exactly 30 minutes. How many test kits can three identical synthesizers prepare in 2 hours?",
    choices: [
      { text: "240 kits", isCorrect: true },
      { text: "160 kits", isCorrect: false },
      { text: "120 kits", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "One synthesizer produces 20 kits per 30 minutes, which is 40 kits per hour. Three synthesizers will produce 3 * 40 = 120 kits per hour. In 2 hours, they will synthesize 120 * 2 = 240 kits."
  },
  {
    topic: "Aptitude Inductive logical connections",
    q: "If some doctors are cardiologists, and all cardiologists speak French, what must be true about French speakers?",
    choices: [
      { text: "Some doctors speak French", isCorrect: true },
      { text: "All doctors speak French", isCorrect: false },
      { text: "All French speakers are cardiologists", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Since some doctors are cardiologists, and every single cardiologist speaks French, those doctors who are cardiologists must also speak French. Hence, some doctors speak French."
  },
  {
    topic: "Aptitude Verbal analogies categories",
    q: "Identify the word corresponding to: GLYCOLYSIS is to CYTOSOL as KREBS CYCLE is to:",
    choices: [
      { text: "Mitochondrial Matrix", isCorrect: true },
      { text: "Mitochondrial Cristae", isCorrect: false },
      { text: "Ribosome", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "This analogy describes biological processes and their cellular locations. Glycolysis takes place in the cytosol; the Krebs cycle takes place in the fluid mitochondrial matrix."
  },
  {
    topic: "Aptitude Perceptual flat fold rotations",
    q: "A flat sheet of paper with the letters 'N MAT' printed sequentially is folded in half from right to left, and then rotated 180° in the plane of the sheet. How do the letters appear when viewed through the non-printed back of the sheet?",
    choices: [
      { text: "TAM N written upside down", isCorrect: true },
      { text: "N MAT written backwards", isCorrect: false },
      { text: "The letters appear completely identical", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Viewing from the back of a sheet reverses the left-to-right reading order (like a mirror image: TAM N). Rotating the sheet in its plane by 180° turns the letters upside down, resulting in 'TAM N' written upside down."
  },
  {
    topic: "Aptitude Quantitative probability subsets",
    q: "A student randomly guesses the answers on a 3-item true/false quiz. What is the probability that they will score exactly 2 correct answers out of 3?",
    choices: [
      { text: "3/8 (or 37.5%)", isCorrect: true },
      { text: "1/4 (or 25%)", isCorrect: false },
      { text: "1/2 (or 50%)", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "There are 2^3 = 8 possible outcomes. The number of ways to get exactly 2 correct answers is given by the binomial coefficient: 3 choose 2 = 3 (C-C-I, C-I-C, I-C-C). Thus, the probability is 3/8, which is 37.5%."
  },
  {
    topic: "Aptitude Inductive symbol patterns",
    q: "A symbol increases its side count: Triangle (3), Square (4), Pentagon (5). What shape must represent the fourth term of this sequence?",
    choices: [
      { text: "Hexagon", isCorrect: true },
      { text: "Circle", isCorrect: false },
      { text: "Octagon", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The shapes increase their number of sides by exactly 1 in each step. Following a pentagon (5 sides), the next shape must have 6 sides, which is a hexagon."
  },
  {
    topic: "Aptitude Verbal reading definitions",
    q: "The term 'iambic pentameter' in poetry defines a metric line containing exactly five feet, each composed of one unstressed syllable followed by one stressed syllable. Which of the following matches this definition?",
    choices: [
      { text: "A specific rhythmic structure containing ten syllables per line", isCorrect: true },
      { text: "A poem composed of exactly five rhyming stanzas", isCorrect: false },
      { text: "A free-form verse without syllable counts", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "An iamb is a metrical foot of 2 syllables (unstressed/stressed). Pentameter means there are 5 such feet in a line. 5 * 2 = 10 syllables per line, which directly matches the definition."
  },
  {
    topic: "Aptitude Perceptual visual overlays lines",
    q: "If a line coordinates grid has grid lines spaced every 1 cm, and a circle of radius 2.5 cm is placed with its center directly on a grid coordinate intersection, how many grid lines does the circle intersect?",
    choices: [
      { text: "10 grid lines", isCorrect: true },
      { text: "8 grid lines", isCorrect: false },
      { text: "6 grid lines", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The center is at (0, 0). The circle is x^2 + y^2 = (2.5)^2 = 6.25. The vertical grid lines are x = -2, -1, 0, 1, 2. The horizontal grid lines are y = -2, -1, 0, 1, 2. The circle intersects five vertical lines and five horizontal lines, giving a total of 10 grid lines touched."
  },
  {
    topic: "Aptitude Quantitative work logs",
    q: "An intensive care nurse monitors three patients. Patient A requires checking every 12 minutes, Patient B every 15 minutes, and Patient C every 20 minutes. If the nurse checks all three patients at 8:00 AM, at what time will they next check all three patients simultaneously?",
    choices: [
      { text: "9:00 AM", isCorrect: true },
      { text: "8:30 AM", isCorrect: false },
      { text: "10:00 AM", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "We need the Least Common Multiple (LCM) of checking intervals: LCM(12, 15, 20). 12 = 2^2 * 3; 15 = 3 * 5; 20 = 2^2 * 5. LCM = 2^2 * 3 * 5 = 60 minutes. Therefore, the nurse will check all three patients exactly 60 minutes later, at 9:00 AM."
  },
  {
    topic: "Aptitude Inductive number systems",
    q: "In a secret laboratory code, the word 'ACID' is encrypted as '1-3-9-4'. What is the corresponding code for the word 'BASE'?",
    choices: [
      { text: "2-1-19-5", isCorrect: true },
      { text: "2-1-3-5", isCorrect: false },
      { text: "3-2-20-6", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The encryption maps each letter to its alphabetical index: A = 1, C = 3, I = 9, D = 4. Following this rule, B = 2, A = 1, S = 19, E = 5. Hence, BASE is '2-1-19-5'."
  },
  {
    topic: "Aptitude Verbal structural definitions",
    q: "The medical board criticized the doctor's record-keeping as ____, noting that several core patient charts had been misplaced or left incomplete.",
    choices: [
      { text: "slipshod", isCorrect: true },
      { text: "meticulous", isCorrect: false },
      { text: "redundant", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Misplacing files and leaving charts incomplete represents careless or casual work, which fits the definition of 'slipshod'."
  },
  {
    topic: "Aptitude Perceptual shadow projections",
    q: "A hollow sphere with a small circular hole cut out of its top is illuminated from directly above. What is the shape of the highlighted light beam cast on the floor inside and beneath the sphere?",
    choices: [
      { text: "A circle", isCorrect: true },
      { text: "An ellipse", isCorrect: false },
      { text: "A hollow ring", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "A light shining vertically through a circular hole in a flat top surface acts as a pinhole projector, casting a solid circular highlighted zone on the horizontal floor directly beneath it."
  },
  {
    topic: "Aptitude Quantitative ratios statistics",
    q: "In a clinical trial, the ratio of treated participants who recovered to those who did not is 7:3. If 210 treated participants recovered, what was the total number of treated participants in the trial?",
    choices: [
      { text: "300", isCorrect: true },
      { text: "90", isCorrect: false },
      { text: "270", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "The ratio is 7 parts recovered to 3 parts not recovered, making a total of 10 parts. 7 parts = 210 participants => 1 part = 30 participants. The total number of participants is 10 parts * 30 = 300."
  },
  {
    topic: "Aptitude Inductive matrix logic",
    q: "Analyze the sequence: A1 is 2, B1 is 4, C1 is 8. A2 is 3, B2 is 9, C2 is 27. If A3 is 4 and B3 is 16, what must C3 equal?",
    choices: [
      { text: "64", isCorrect: true },
      { text: "32", isCorrect: false },
      { text: "48", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "In each row, the terms correspond to powers of the first term: A, A^2, A^3. In row 3, the first term is 4, the second is 4^2 = 16, and the third must be 4^3 = 64."
  },
  {
    topic: "Aptitude Verbal logical deductions negative",
    q: "All medical students wear white coats. No dentists are medical students. Which of the following is a logically sound conclusion?",
    choices: [
      { text: "cannot be determined based on the given information", isCorrect: true },
      { text: "No dentists wear white coats", isCorrect: false },
      { text: "All dentists wear white coats", isCorrect: false },
      { text: "Some dentists do not wear white coats", isCorrect: false }
    ],
    rationale: "We know MedStudents ⊆ WhiteCoats, and Dentists ∩ MedStudents = ∅. This does not prevent Dentists and WhiteCoats from intersecting in any way. Dentists could wear white coats or not. Thus, nothing can be determined about dentists wearing white coats from the given information."
  },
  {
    topic: "Aptitude Perceptual planar symmetric designs",
    q: "A clean square sheet of paper is folded in half diagonally, then folded in half again to form a smaller triangle. A single circular hole is punched through the center of the folded triangle. When the sheet is fully unfolded, how many circular holes are visible?",
    choices: [
      { text: "4 holes", isCorrect: true },
      { text: "2 holes", isCorrect: false },
      { text: "1 hole", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "Folding a square diagonally once leaves 2 layers. Folding it diagonally again leaves 4 layers. Punching a hole through all layers of this folded triangle produces exactly 4 holes when unfolded across the quadrants."
  },
  {
    topic: "Aptitude Quantitative rate ratios",
    q: "A clinical centrifuge can process 80 blood samples in exactly 15 minutes. If a diagnostic lab needs to process 480 samples in 1 hour, how many centrifuges must be operated simultaneously to handle this workload?",
    choices: [
      { text: "2 centrifuges", isCorrect: true },
      { text: "1 centrifuge", isCorrect: false },
      { text: "3 centrifuges", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "One centrifuge processes 80 samples per 15 minutes, which equals 80 * 4 = 320 samples per hour. To process 480 samples in one hour, the lab needs: 480 / 320 = 1.5 centrifuges. Since they must operate in whole units, they must run 2 centrifuges."
  },
  {
    topic: "Aptitude Inductive sequence ratios",
    q: "What is the next number in this sequence: 1, 2, 6, 24, 120, ...?",
    choices: [
      { text: "720", isCorrect: true },
      { text: "240", isCorrect: false },
      { text: "600", isCorrect: false },
      { text: "cannot be determined based on the given information", isCorrect: false }
    ],
    rationale: "This is the factorial sequence: Un = n!. U1 = 1! = 1; U2 = 2! = 2; U3 = 3! = 6; U4 = 4! = 24; U5 = 5! = 120. The next term is U6 = 6! = 720 (or multiplying by 2, 3, 4, 5, then 6)."
  }
];
