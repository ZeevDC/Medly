export const physicsQuestions = [
  {
    topic: "Fluid Dynamics Hemodynamics Poiseuille",
    q: "A blood vessel affected by localized atherosclerosis exhibits narrowing of its internal radius by exactly 50%. Assuming laminar, steady-state blood flow according to Poiseuille's Law, how does the flow resistance (R) scale at this stenosis?",
    choices: [
      { text: "Resistance increases by exactly 16 times", isCorrect: true },
      { text: "Resistance is doubled", isCorrect: false },
      { text: "Resistance increases by 4 times", isCorrect: false },
      { text: "Resistance decreases to 1/16 of its initial value due to capillary recruitment", isCorrect: false }
    ],
    rationale: "According to Poiseuille’s Law, vascular resistance is inversely proportional to the fourth power of the radius (R ∝ 1/r^4). Halving the radius leads to a resistance increase of 1 / (0.5)^4 = 1 / 0.0625 = 16 times."
  },
  {
    topic: "Optics Hyperopia correction",
    q: "A 45-year-old patient is diagnosed with hyperopia. Their near point is located far back at 150 cm instead of the standard comfortable 25 cm. What optical power (P) in diopters must their corrective lens have to restore normal near-vision?",
    choices: [
      { text: "+3.33 Diopters (Converging)", isCorrect: true },
      { text: "-3.33 Diopters (Diverging)", isCorrect: false },
      { text: "+1.67 Diopters (Converging)", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "We want an object placed at s = 25 cm (0.25 m) to form a virtual image at s' = -150 cm (-1.5 m) on the same side. Using the thin lens equation: P = 1/f = 1/s + 1/s' = 1/0.25 + 1/(-1.5) = 4 - 0.67 = +3.33 D. Positive diopter indicates a converging lens."
  },
  {
    topic: "Biomechanics Joints torque",
    q: "During a clinical forearm static retention test, a patient holds a 50 N mass in their palm. The biceps tendon inserts on the radius at 3.0 cm from the elbow joint hinge, while the mass is placed at 30.0 cm. Neglecting forearm weight, what vertical muscular force must the biceps exert to hold this static equilibrium?",
    choices: [
      { text: "500 N upward force", isCorrect: true },
      { text: "50 N upward force", isCorrect: false },
      { text: "150 N upward force", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "In static equilibrium, net torque is zero: Στ = 0. The torque of the biceps acts upward: F_biceps * 3 cm. The torque of the mass acts downward: 50 N * 30.0 cm. Rearranging: F_biceps * 3 = 1500 => F_biceps = 500 N."
  },
  {
    topic: "Thermodynamics Carnival limits",
    q: "A hypothetical biological heat engine operates at standard core body temperature of 37°C (310 K) and releases its metabolic heat into a localized cryogenic sink at 0°C (273 K). What is the maximum theoretical efficiency limit of this biological engine?",
    choices: [
      { text: "11.9%", isCorrect: true },
      { text: "100%", isCorrect: false },
      { text: "45.2%", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "The maximum possible efficiency is given by the Carnot efficiency: Eff = 1 - T_cold/T_hot. Using absolute thermodynamic temperatures in Kelvin: Eff = 1 - 273/310 = 1 - 0.8806 = 0.1194, which is 11.9%."
  },
  {
    topic: "Electromagnetism Axonal capacitance",
    q: "An unmyelinated axon membrane of thickness 10.0 nm behaves electrically as a parallel-plate capacitor. If the resting membrane potential of the cell is -70.0 mV, what magnitude of electric field exists across this thin lipid bilayer?",
    choices: [
      { text: "7.0 x 10^6 V/m", isCorrect: true },
      { text: "70 V/m", isCorrect: false },
      { text: "7.0 x 10^4 V/m", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "The electric field inside a uniform parallel-plate capacitor is E = V / d. Substituting the absolute values: E = | -70.0 x 10^-3 V | / (10.0 x 10^-9 m) = 7.0 x 10^6 V/m."
  },
  {
    topic: "Kinematics Momentum conservation",
    q: "A 60.0 kg technician aboard a zero-gravity flight traveling at 2.0 m/s collides with a stationary 40.0 kg medical supply cart. If the technician grabs the cart, and they travel together post-collision, what is their final velocity?",
    choices: [
      { text: "1.2 m/s", isCorrect: true },
      { text: "2.0 m/s", isCorrect: false },
      { text: "0.8 m/s", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "This is a completely inelastic collision. Conservation of linear momentum dictates: m1*v1 = (m1 + m2)*v_final. 60 kg * 2.0 m/s = (60 kg + 40 kg)*v_final => 120 = 100 * v_final => v_final = 1.2 m/s."
  },
  {
    topic: "Modern Physics Half-life kinetics",
    q: "A radioactive tracer isotope utilized in PET scans has a diagnostic half-life of 20 minutes. If clinical dosing requires exactly 10.0 milligrams for active imaging, what mass of this isotope remains active after 1 hour?",
    choices: [
      { text: "1.25 milligrams", isCorrect: true },
      { text: "5.0 milligrams", isCorrect: false },
      { text: "2.50 milligrams", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "1 hour represents three half-lives (3 * 20 minutes = 60 mins). The active remaining mass is given by: m_final = m_initial * (0.5)^n = 10.0 * (0.5)^3 = 10.0 * 0.125 = 1.25 milligrams."
  },
  {
    topic: "Optics Converging lenses",
    q: "An object is placed at a distance equal to the focal length (f) of a thin converging lens. Which of the following statements is true regarding the resulting image resolved?",
    choices: [
      { text: "No real or virtual image is resolved as refracted rays exit parallel", isCorrect: true },
      { text: "A highly magnified virtual image forms at double focal distance on the same side", isCorrect: false },
      { text: "A tiny real inverted image forms inside the focal plane of the lens", isCorrect: false },
      { text: "all of the above", isCorrect: false }
    ],
    rationale: "According to the thin lens equation, 1/s + 1/s' = 1/f. If s = f, then 1/f + 1/s' = 1/f, which means 1/s' = 0 and s' runs to infinity. Refracted rays exit parallel to each other and never converge, so no image is resolved."
  },
  {
    topic: "Fluid Dynamics Venturi principle",
    q: "An ideal, incompressible fluid flows through a horizontal pipe containing a constriction that halves the pipe's cross-sectional area. According to Bernoulli's equation, how does internal fluid pressure shift at this constriction?",
    choices: [
      { text: "It decreases because fluid velocity doubles, converting pressure energy to kinetic energy", isCorrect: true },
      { text: "It doubles because of structural compression within the convergent walls", isCorrect: false },
      { text: "It remains completely constant due to the conservation of mass flow", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "By the continuity equation, halving the cross-sectional area doubles the fluid velocity. By Bernoulli's equation, since elevation is constant, an increase in kinetic energy (velocity) must match a decrease in electrostatic potential energy (pressure) to conserve energy."
  },
  {
    topic: "Mechanics Work kinetic theorem",
    q: "A physical therapist pulls a resistance sled with a constant force of 120 N at an angle of 30.0° above the horizontal plane. If the sled travels a horizontal distance of 10.0 meters, how much work was performed by the therapist?",
    choices: [
      { text: "1.04 x 10^3 Joules", isCorrect: true },
      { text: "1.20 x 10^3 Joules", isCorrect: false },
      { text: "6.00 x 10^2 Joules", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "Work is given by W = F * d * cos(θ). Substituting the values: W = 120 N * 10.0 m * cos(30.0°) = 1200 * 0.866 = 1039.2 Joules or 1.04 x 10^3 Joules."
  },
  {
    topic: "Electromagnetism Resistivity pathways",
    q: "An electrical wire of length L and uniform cross-sectional radius r has an electrical resistance of R. If this wire is stretched uniformly until its length is doubled while maintaining its mass constant, what is its new resistance?",
    choices: [
      { text: "4 R", isCorrect: true },
      { text: "2 R", isCorrect: false },
      { text: "R / 2", isCorrect: false },
      { text: "R / 4", isCorrect: false }
    ],
    rationale: "Since mass and density are constant, the volume of the wire is conserved: V = A1 * L1 = A2 * L2. Doubling the length (L2 = 2 L1) means the area must be halved (A2 = A1 / 2). Resistance is R = ρ * L / A. Thus, R_new = ρ * (2 L) / (A / 2) = 4 R."
  },
  {
    topic: "Thermodynamics Ideal gases isotherm",
    q: "An ideal gas undergoes an isothermal expansion during which its volume is doubled. Which of the following is true regarding this thermodynamic phase change?",
    choices: [
      { text: "The gas absorbs heat equal to the work performed, and internal energy is unchanged (ΔU = 0)", isCorrect: true },
      { text: "No heat is exchanged (q = 0), and internal energy increases as work is done", isCorrect: false },
      { text: "The temperature drops to half of its initial value", isCorrect: false },
      { text: "The pressure of the gas increases to double the initial value", isCorrect: false }
    ],
    rationale: "For an ideal gas, internal energy depends solely on temperature: U = (3/2)nRT. In an isothermal process (ΔT = 0), the change in internal energy is zero (ΔU = 0). By the First Law (ΔU = q + W), the gas must absorb heat equal to the work it performs (q = -W)."
  },
  {
    topic: "Mechanics Friction coefficients",
    q: "A static orthotic model of mass 10.0 kg belongs on a horizontal laboratory flat. If the coefficient of static friction is 0.40 and the coefficient of kinetic friction is 0.30, what horizontal force is required to initiate motion?",
    choices: [
      { text: "Any force exceeding 39.2 N", isCorrect: true },
      { text: "Any force exceeding 29.4 N", isCorrect: false },
      { text: "Exactly 10.0 N of directional force", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "The maximum static force of friction of the system is F_s_max = μ_s * N = μ_s * m * g = 0.40 * 10.0 kg * 9.8 m/s^2 = 39.2 N. To initiate motion, an applied force must exceed this maximum static friction threshold."
  },
  {
    topic: "Optics Spherical mirrors",
    q: "A dentist uses a small curved mirror to form an upright, virtual image of a tooth that is magnified by exactly 2.0 times when placed 1.5 cm away. What type of mirror is utilized, and what is its radius of curvature?",
    choices: [
      { text: "Concave mirror; radius of curvature = 6.0 cm", isCorrect: true },
      { text: "Convex mirror; radius of curvature = 3.0 cm", isCorrect: false },
      { text: "Plane mirror; radius of curvature is infinite", isCorrect: false },
      { text: "Concave mirror; radius of curvature = 3.0 cm", isCorrect: false }
    ],
    rationale: "Magnification is m = -s'/s = +2.0 (upright virtual image). Since s = 1.5 cm, s' = -3.0 cm. Using the mirror formula: 1/f = 1/s + 1/s' = 1/1.5 - 1/3 = 1/3, meaning f = +3.0 cm. A positive focal length indicates a concave mirror. The radius of curvature is R = 2f = 6.0 cm."
  },
  {
    topic: "Modern Physics Photoelectric effect",
    q: "A metal surface has a photoelectric work function of 2.0 eV. If monochromatic light of wavelength 400 nm (photon energy ≈ 3.1 eV) strikes this metal, what is the maximum kinetic energy of the ejected photoelectrons?",
    choices: [
      { text: "1.1 eV", isCorrect: true },
      { text: "5.1 eV", isCorrect: false },
      { text: "2.0 eV", isCorrect: false },
      { text: "No photoelectrons are ejected because the threshold wavelength is exceeded", isCorrect: false }
    ],
    rationale: "By Einstein's Photoelectric Equation: KE_max = hf - Φ. Energy of the incident photon is hf = 3.1 eV, and the work function is Φ = 2.0 eV. Thus, KE_max = 3.1 eV - 2.0 eV = 1.1 eV."
  },
  {
    topic: "Fluid Dynamics Buoyant forces Archemedes",
    q: "An object is weighed in air and has a mass of 5.0 kg. When completely submerged in water, its apparent mass is revealed to be 3.0 kg. What is the density of this solid object?",
    choices: [
      { text: "2500 kg/m^3", isCorrect: true },
      { text: "1500 kg/m^3", isCorrect: false },
      { text: "5000 kg/m^3", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "The buoyant force is equal to the weight of displaced water: F_b = W_air - W_submerged = (5.0 - 3.0) kg * g = 2.0 * g. The volume of the object is V = m_water_displaced / ρ_water = 2.0 kg / 1000 kg/m^3 = 0.002 m^3. Density = mass/volume = 5.0 kg / 0.002 m^3 = 2500 kg/m^3."
  },
  {
    topic: "Modern Physics X-ray Compton scattering",
    q: "In an X-ray diagnostic experiment, a high-energy photon collides with a stationary electron and undergoes Compton scattering. Which statement is correct regarding the scattered photon?",
    choices: [
      { text: "Its wavelength increases, and its frequency decreases because energy was transferred to the electron", isCorrect: true },
      { text: "Its wavelength decreases, and its frequency increases", isCorrect: false },
      { text: "The speed of the scattered photon decreases below the speed of light", isCorrect: false },
      { text: "The photon undergoes complete pair-annihilation, releasing massive neutrinos", isCorrect: false }
    ],
    rationale: "During Compton scattering, the incident photon transfers part of its kinetic energy to the target electron. Since photon energy is E = hc/λ = hf, a loss in energy results in a lower frequency (f) and a longer wavelength (λ) of the scattered photon."
  },
  {
    topic: "Optics Wave interference",
    q: "Monochromatic light of wavelength 600 nm passes through a double-slit assembly, forming an interference pattern on a distant wall. If the entire apparatus is submerged in water (n = 1.33), what shift occurs in the fringe separation?",
    choices: [
      { text: "The fringes move closer together because the wavelength decreases in the medium", isCorrect: true },
      { text: "The fringes move further apart because the speed of light increases", isCorrect: false },
      { text: "The interference pattern disappears completely because of water dispersion", isCorrect: false },
      { text: "The fringe spacing remains unchanged", isCorrect: false }
    ],
    rationale: "The wavelength of light in a medium with refractive index n is λ_n = λ_air / n. Because water has n = 1.33, the wavelength decreases inside water. The fringe spacing in double-slit interference is y = L*λ/d; thus, a shorter wavelength yields closer fringes."
  },
  {
    topic: "Thermodynamics Heat transfer conduction",
    q: "A cylindrical bone sample has a length of L and cross-sectional area A. A thermal gradient ΔT drives conduction heat transfer. If the length is doubled and the area is halved, what change occurs in the rate of heat conduction?",
    choices: [
      { text: "It decreases to 1/4 of the initial rate", isCorrect: true },
      { text: "It is halved", isCorrect: false },
      { text: "It remains completely constant", isCorrect: false },
      { text: "It increases to 4 times the initial rate", isCorrect: false }
    ],
    rationale: "The rate of heat conduction is given by Q/t = k * A * ΔT / L. If L is doubled (2L) and A is halved (A/2), the new rate of heat conduction is Q_new/t = k * (A/2) * ΔT / (2L) = (1/4) * (Q/t)."
  },
  {
    topic: "Mechanics Circular centripetal acceleration",
    q: "An astronaut experiences high centripetal workloads in a centrifuge. If the rotational speed (v) is doubled while the radius of rotation (r) is halved, how does the centripetal acceleration (ac) scale?",
    choices: [
      { text: "Centripetal acceleration increases by 8 times", isCorrect: true },
      { text: "Centripetal acceleration increases by 4 times", isCorrect: false },
      { text: "Centripetal acceleration is doubled", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "Centripetal acceleration is given by a_c = v^2 / r. If v becomes 2v and r becomes r/2, then a_c_new = (2v)^2 / (r/2) = 4v^2 / (r/2) = 8 * (v^2/r)."
  },
  {
    topic: "Electromagnetism Magnetic fields Solenoids",
    q: "A medical electromagnet consists of a cylindrical solenoid with N turns carrying current I. If the current is doubled and the total number of turns per unit length is halved, what happens to the internal magnetic field (B)?",
    choices: [
      { text: "It remains completely unchanged", isCorrect: true },
      { text: "It is doubled", isCorrect: false },
      { text: "It decreases to 1/4 of the initial value", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "The magnetic field inside a long solenoid is B = μ_0 * n * I, where n is the number of turns per unit length. If I becomes 2I, and n becomes n/2, the new magnetic field is B_new = μ_0 * (n/2) * (2I) = μ_0 * n * I = B."
  },
  {
    topic: "Optics Total internal reflection",
    q: "An endoscope fiber made of glass (n = 1.50) is surrounded by a cladding material. To ensure total internal reflection of light with incident angles up to 45°, what must be the maximum refractive index (n_clad) of the cladding?",
    choices: [
      { text: "1.06", isCorrect: true },
      { text: "1.33", isCorrect: false },
      { text: "1.25", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "For total internal reflection, the critical angle θ_c must satisfy sin(θ_c) = n_clad / n_glass. To reflect light hitting at 45°, θ_c must be at most 45°. sin(45°) = 0.707. Therefore, n_clad / n_glass <= 0.707 => n_clad <= 1.50 * 0.707 = 1.06."
  },
  {
    topic: "Mechanics Simple harmonic motion",
    q: "A patient's chest during periodic mechanical respiration is modeled as a mass-spring harmonic system. If the spring constant (k) is quadrupled while the mass (m) is doubled, how does the mechanical frequency (f) shift?",
    choices: [
      { text: "It increases by a factor of over √2 (or 1.41)", isCorrect: true },
      { text: "It is doubled", isCorrect: false },
      { text: "It is halved", isCorrect: false },
      { text: "It remains completely unchanged", isCorrect: false }
    ],
    rationale: "The frequency of a mass-spring system in simple harmonic motion is f = (1/(2π)) * √(k/m). If k becomes 4k and m becomes 2m, then f_new = (1/(2π)) * √(4k/2m) = √2 * f. Since √2 ≈ 1.414, the frequency increases by a factor of 1.41."
  },
  {
    topic: "Modern Physics Radioactive alpha decay",
    q: "A Uranium-238 nucleus (Z = 92) undergoes alpha (α) decay to form Th-234. What are the mass number and atomic number changes of the nucleus during this decay?",
    choices: [
      { text: "Mass number decreases by 4; atomic number decreases by 2", isCorrect: true },
      { text: "Mass number decreases by 2; atomic number decreases by 4", isCorrect: false },
      { text: "Mass number remains unchanged; atomic number increases by 1", isCorrect: false },
      { text: "all of the above except for thorium synthesis", isCorrect: false }
    ],
    rationale: "An alpha particle is a helium nucleus (4_He_2) consisting of 2 protons and 2 neutrons. Ejecting this particle decreases the parent nucleus's mass number (A) by 4 and its atomic number (Z) by 2."
  },
  {
    topic: "Fluid Dynamics Viscosity Poiseuille",
    q: "Two syringes of equal volume are fitted with needles of different lengths. Needle A is twice as long as Needle B, but has twice the internal diameter of Needle B. If equal force is applied, how does the volumetric flow rate of liquid out of needle A compare to B?",
    choices: [
      { text: "It is 8 times faster in needle A", isCorrect: true },
      { text: "It is 16 times faster in needle A", isCorrect: false },
      { text: "It is half as fast in needle A", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "By Poiseuille’s Law: Q = ΔP*π*r^4 / (8*η*L). Here, Needle A has twice the diameter, so its radius r_A = 2r_B, and its length L_A = 2L_B. Therefore, Q_A / Q_B = (r_A/r_B)^4 / (L_A/L_B) = (2)^4 / 2 = 16 / 2 = 8 times faster."
  },
  {
    topic: "Mechanics Angular momentum",
    q: "A high-board diver pulls their limbs close to their body during a rotation, decreasing their rotational moment of inertia (I) by half. Assuming zero external torque, what is the effect on their rotational angular velocity (ω) and mechanical kinetic energy (KE_rot)?",
    choices: [
      { text: "ω is doubled; rotational kinetic energy is doubled", isCorrect: true },
      { text: "ω is doubled; rotational kinetic energy is halved", isCorrect: false },
      { text: "ω is halved; rotational kinetic energy remains unchanged", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "By conservation of angular momentum (L = I * ω), if I is halved, ω must double to keep L constant. Rotational kinetic energy is KE_rot = (1/2) * I * ω^2. Substituting the new values: KE_new = (1/2) * (I/2) * (2ω)^2 = 2 * (1/2 * I * ω^2), so kinetic energy is doubled."
  },
  {
    topic: "Optics Lens combinations",
    q: "A pediatric patient requires an optical correction consisting of a +3.00 D lens paired immediately with a -1.00 D lens. What is the net focal length of this combined optical assembly?",
    choices: [
      { text: "0.50 meters", isCorrect: true },
      { text: "2.00 meters", isCorrect: false },
      { text: "0.25 meters", isCorrect: false },
      { text: "-0.50 meters", isCorrect: false }
    ],
    rationale: "For thin lenses placed in contact, their optical powers add directly: P_net = P1 + P2 = +3.00 D + (-1.00 D) = +2.00 D. Since power is the reciprocal of the focal length (P = 1/f), the net focal length is f = 1 / P_net = 1 / 2.00 = 0.50 meters."
  },
  {
    topic: "Electromagnetism Resistors series parallel",
    q: "An intensive care monitor circuit includes three identical resistors of resistance R. Which configuration provides a net equivalent resistance of exactly (2/3)R?",
    choices: [
      { text: "Two resistors in parallel, connected in series with the third resistor", isCorrect: false },
      { text: "Two resistors in series, connected in parallel with the third resistor", isCorrect: true },
      { text: "All three resistors connected in parallel", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "In option B, the series branch has resistance R_series = R + R = 2R. Connecting this branch in parallel with the third resistor R yields: 1/R_eq = 1/2R + 1/R = 3/2R => R_eq = (2/3)R."
  },
  {
    topic: "Thermodynamics Ideal gas expansion",
    q: "A sample of diatomic nitrogen gas expands adiabatically against a persistent vacuum. What is the temperature change of this gas during this free expansion process?",
    choices: [
      { text: "No change in temperature because no work is done and no heat is exchanged", isCorrect: true },
      { text: "The temperature drops significantly due to expansion cooling", isCorrect: false },
      { text: "The temperature rises because of pressure degradation", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "Free expansion of an ideal gas into a vacuum is an adiabatic process (q = 0) in which no work is performed (W = 0, since external pressure is zero). By the first law, ΔU = q + W = 0, which means there is no change in temperature."
  },
  {
    topic: "Mechanics Kinematics free fall",
    q: "An object is dropped from a cliff of height H. Neglecting air resistance, what is its velocity just before it hits the ground?",
    choices: [
      { text: "v = √(2gH)", isCorrect: true },
      { text: "v = 2gH", isCorrect: false },
      { text: "v = gH / 2", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "Using the kinematic equation v^2 = v0^2 + 2gΔy. Since the object is dropped from rest, v0 = 0, and the displacement is H, yielding v^2 = 2gH or v = √(2gH)."
  },
  {
    topic: "Electromagnetism Capacitors dielectric",
    q: "A parallel-plate capacitor is charged to a potential difference V and then disconnected from the battery. If a dielectric slab (κ = 3.0) is inserted between the plates, what happens to the voltage (V) and stored electrical energy (U)?",
    choices: [
      { text: "V is reduced to V/3; U is reduced to U/3", isCorrect: true },
      { text: "V is tripled; U is tripled", isCorrect: false },
      { text: "V is reduced to V/3; U remains unchanged", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "Because the capacitor is disconnected, its charge Q is constant. Inserting a dielectric increases capacitance: C_new = κ * C = 3 * C. Using V = Q/C, the voltage drops to V/3. Stored energy is U = Q^2 / 2C, which decreases to U/3."
  },
  {
    topic: "Optics Wave polarization",
    q: "Unpolarized light with intensity I0 passes through two polarizing sheets. If the angle between the transmission axes of the two sheets is 30.0°, what is the intensity of the light after passing through the second sheet?",
    choices: [
      { text: "0.375 I0", isCorrect: true },
      { text: "0.750 I0", isCorrect: false },
      { text: "0.250 I0", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "The first polarizer reduces unpolarized intensity to I1 = I0 / 2. According to Malus's Law, the second polarizer yields: I2 = I1 * cos^2(θ) = (I0 / 2) * cos^2(30.0°) = (I0 / 2) * (0.866)^2 = (I0 / 2) * 0.75 = 0.375 I0."
  },
  {
    topic: "Thermodynamics Phase transitions latent heat",
    q: "A 100.0 g block of ice at 0°C is added to 100.0 g of liquid water at 80°C inside an insulating vessel. If the latent heat of fusion of ice is 80 cal/g and the specific heat of water is 1 cal/g°C, what is the final temperature of the mixture?",
    choices: [
      { text: "0°C with all the ice melted", isCorrect: true },
      { text: "40°C with all the ice melted", isCorrect: false },
      { text: "10°C with some ice remaining", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "To melt 100 g of ice requires Q_melt = m * L_f = 100 g * 80 cal/g = 8000 calories. The maximum heat the water can release by cooling to 0°C is Q_cool = m * c * ΔT = 100 g * 1 * 80°C = 8000 calories. Thus, all heat melted the ice, and the mixture ends at 0°C."
  },
  {
    topic: "Mechanics Momentum collisions elasticity",
    q: "A perfectly elastic head-on collision occurs between an incoming ball of mass m moving with velocity v and a static target ball of mass m. What are the velocities of the two balls post-collision?",
    choices: [
      { text: "The incoming ball stops; the target ball moves forward with velocity v", isCorrect: true },
      { text: "Both balls move forward together with velocity v/2", isCorrect: false },
      { text: "The incoming ball rebounds with velocity -v; the target remains static", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "In a perfectly elastic collision of equal masses, velocity is exchanged completely. The initially moving mass transfer all of its momentum and kinetic energy to the target mass, coming to rest while the target moves off with v."
  },
  {
    topic: "Electromagnetism Faraday's induction",
    q: "A circular wire loop of radius R sits in a uniform perpendicular magnetic field. If the magnetic field strength decreases at a constant rate, what is the direction of the induced electrical current as viewed from above?",
    choices: [
      { text: "The current flows to create magnetic flux matching the decreasing field, following Lenz's Law", isCorrect: true },
      { text: "No current is induced because there is no mechanical movement of the wire loop", isCorrect: false },
      { text: "The current flows in a random oscillating wave", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "By Faraday’s Law of Induction, a changing magnetic flux induces an electromotive force (EMF) and current. Lenz's Law states that the induced current flows in a direction that opposes the change in flux (re-generating the field)."
  },
  {
    topic: "Optics Spherical lenses convex",
    q: "An object is placed 10.0 cm in front of a thin converging lens of focal length f = 15.0 cm. What are the position and properties of the resulting image resolved?",
    choices: [
      { text: "Virtual and upright image located 30.0 cm on the same side", isCorrect: true },
      { text: "Real and inverted image located 30.0 cm on the opposite side", isCorrect: false },
      { text: "Virtual and inverted image located 7.5 cm on the same side", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "Using the lens equation: 1/10 + 1/s' = 1/15 => 1/s' = 1/15 - 1/10 = -1/30 => s' = -30.0 cm. The negative sign indicates a virtual image located on the same side as the object. The magnification is m = -s'/s = -(-30)/10 = +3.0 (magnified, upright)."
  },
  {
    topic: "Modern Physics Heisenburg uncertainty",
    q: "According to the Heisenberg Uncertainty Principle (Δx * Δp >= h/4π), what is the direct consequence of measuring an electron's position with absolute spatial precision (Δx -> 0)?",
    choices: [
      { text: "The uncertainty in its momentum becomes infinite (Δp -> infinity)", isCorrect: true },
      { text: "The electron collapses into the nucleus due to electrostatic pull", isCorrect: false },
      { text: "The electron ceases all momentum (Δp -> 0)", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "The Heisenberg uncertainty principle states that the position and momentum of a particle cannot be measured simultaneously with absolute accuracy. If the uncertainty in position is zero, the uncertainty in momentum must approach infinity to satisfy the inequality."
  },
  {
    topic: "Fluid Dynamics Continuity mass conservation",
    q: "A horizontal vascular catheter branching system splits a main artery of area A and fluid velocity v into exactly ten capillaries, each with an area of A/20. What is the fluid velocity (v_cap) in each capillary?",
    choices: [
      { text: "2 v", isCorrect: true },
      { text: "v / 2", isCorrect: false },
      { text: "v / 10", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "By the conservation of mass (Equation of Continuity): A_in * v_in = Σ A_out * v_out. Substituting the values: A * v = 10 * (A / 20) * v_cap => A * v = (A / 2) * v_cap => v_cap = 2 v."
  },
  {
    topic: "Thermodynamics Ideal gas pressures",
    q: "If both the absolute temperature (T) and volume (V) of an ideal gas sample are doubled, how does the internal pressure (P) of the gas shift?",
    choices: [
      { text: "It remains completely unchanged", isCorrect: true },
      { text: "It is doubled", isCorrect: false },
      { text: "It increases by 4 times", isCorrect: false },
      { text: "It is halved", isCorrect: false }
    ],
    rationale: "According to the ideal gas law: P = nRT / V. If both T and V are doubled, the new pressure is P_new = nR(2T)/(2V) = nRT/V = P. Thus, the pressure of the gas is unchanged."
  },
  {
    topic: "Mechanics Friction sliding",
    q: "A patient pushes a heavy therapy block along a carpeted horizontal floor. To keep the block moving with a constant velocity, what net force must act on the block?",
    choices: [
      { text: "Exactly zero net force, because the applied force matches kinetic friction", isCorrect: true },
      { text: "A positive net force proportional to the static friction threshold", isCorrect: false },
      { text: "An increasing net force to overcome kinetic inertia", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "By Newton's First Law of Motion, an object moving at a constant velocity experiences no acceleration, which means the net forces acting on it must sum to exactly zero (ΣF = 0). The applied force directly cancels out the kinetic friction."
  },
  {
    topic: "Electromagnetism Coulomb's law forces",
    q: "Two positive point charges q1 and q2 are separated by a distance d and experience an electrostatic repulsive force F. If the distance is doubled and both charges are also doubled, what is the new electrostatic force?",
    choices: [
      { text: "F", isCorrect: true },
      { text: "2 F", isCorrect: false },
      { text: "F / 2", isCorrect: false },
      { text: "4 F", isCorrect: false }
    ],
    rationale: "According to Coulomb's Law, F = k * (q1 * q2) / d^2. If each charge becomes 2q and the distance becomes 2d, the new force is F_new = k * (2q1 * 2q2) / (2d)^2 = k * 4(q1 * q2) / (4d^2) = F."
  },
  {
    topic: "Optics Diffraction limits slit",
    q: "Monochromatic light of wavelength λ passes through a single slit of width a. What is the condition for obtaining a diffraction minimum (dark fringe) on a screen at angle θ?",
    choices: [
      { text: "a * sin(θ) = m * λ (where m is a non-zero integer)", isCorrect: true },
      { text: "a * sin(θ) = (m + 0.5) * λ", isCorrect: false },
      { text: "a * sin(θ) = λ / 2", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "For single-slit diffraction, destructive interference waves from the slit cancel out in pairs when the path difference satisfies the condition a * sin(θ) = m * λ, where m = ±1, ±2, ±3, etc."
  },
  {
    topic: "Thermodynamics Entropy processes irreversibility",
    q: "Which of the following processes involves zero net change in the total entropy of the universe (ΔS_univ = 0)?",
    choices: [
      { text: "A completely reversible isothermal process", isCorrect: true },
      { text: "Spontaneous heat transfer across a thermal gradient", isCorrect: false },
      { text: "Free expansion of a gas into a vacuum", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "A reversible process is an idealized process where the system stays in thermodynamic equilibrium, resulting in no net entropy production in the universe (ΔS_univ = 0). Cyclic or spontaneous irreversible real-world processes always increase universe entropy (ΔS_univ > 0)."
  },
  {
    topic: "Mechanics Potential kinetic conservations",
    q: "A simple pendulum of mass m and length L is released from a maximum angle θ. Neglecting air resistance, what is its maximum kinetic energy as it swings through the bottom of its arc?",
    choices: [
      { text: "mgL * (1 - cos(θ))", isCorrect: true },
      { text: "mgL", isCorrect: false },
      { text: "mgL * cos(θ)", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "By conservation of mechanical energy, the kinetic energy at the bottom equals the potential energy at the highest point: KE_max = PE_change = m * g * h. The height is h = L - L*cos(θ) = L*(1 - cos(θ)), giving KE_max = m * g * L * (1 - cos(θ))."
  },
  {
    topic: "Electromagnetism Resistors power heating",
    q: "A vascular heating catheter has resistance R and is connected to a constant voltage source V. If the resistance R is halved, what change occurs in the thermal power (P) generated by the catheter?",
    choices: [
      { text: "The thermal power is doubled", isCorrect: true },
      { text: "The thermal power is halved", isCorrect: false },
      { text: "The thermal power remains completely unchanged", isCorrect: false },
      { text: "The thermal power increases by 4 times due to current square", isCorrect: false }
    ],
    rationale: "The electrical power dissipated as heat in a resistor connected to a constant voltage source is P = V^2 / R. If the resistance R is halved (R/2), the power is P_new = V^2 / (R/2) = 2 * (V^2/R) = 2P."
  },
  {
    topic: "Optics Focal power formulas",
    q: "A patient has an eye with an optical focal power of +62.5 Diopters. If they look at a distant mountain, at what distance behind the cornea is the image projected?",
    choices: [
      { text: "1.60 cm", isCorrect: true },
      { text: "16.0 cm", isCorrect: false },
      { text: "0.16 cm", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "For a distant object, s = infinity, so 1/s = 0. The lens formula gives P = 1/f = 1/s'. Since P = 62.5 D, the image distance is s' = 1 / 62.5 = 0.016 meters = 1.60 cm."
  },
  {
    topic: "Modern Physics Photoelectric frequencies",
    q: "The threshold frequency for photoemission in a potassium plate is 5.5 x 10^14 Hz. If the plate is irradiated with light of frequency 4.0 x 10^14 Hz, what kinetic energy is measured in the photoelectrons?",
    choices: [
      { text: "Absolutely zero photoelectrons are emitted", isCorrect: true },
      { text: "1.5 x 10^14 eV", isCorrect: false },
      { text: "9.9 x 10^-20 Joules", isCorrect: false },
      { text: "none of the above", isCorrect: false }
    ],
    rationale: "By photoelectric theory, if the frequency of incident photons is below the threshold frequency (f < f0), the photon energy is insufficient to overcome the work function of the metal. Consequently, no electrons are ejected, and kinetic energy is zero."
  },
  {
    topic: "Fluid Dynamics Viscous drag Stokes",
    q: "According to Stokes' Law representing viscous drag: F_drag = 6 * π * η * r * v. If a spherical cell of radius r is settling through blood plasma of viscosity η with terminal velocity v, what happens to the drag force if both the radius and settling velocity are doubled?",
    choices: [
      { text: "It increases by 4 times", isCorrect: true },
      { text: "It is doubled", isCorrect: false },
      { text: "It remains completely unchanged", isCorrect: false },
      { text: "It is quadrupled; none of the above", isCorrect: false }
    ],
    rationale: "Drag force is linear with respect to both radius (r) and velocity (v): F_drag ∝ r * v. If both r and v are doubled, the new drag force is F_new ∝ (2r) * (2v) = 4 * (r * v), representing a 4-fold increase."
  },
  {
    topic: "Thermodynamics Ideal gas isotherms",
    q: "An ideal gas expands isothermally, doing 500 J of work against its surroundings. How much heat (q) was absorbed by the gas during this expansion?",
    choices: [
      { text: "+500 Joules", isCorrect: true },
      { text: "-500 Joules", isCorrect: false },
      { text: "Absolutely zero heat is exchanged", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "For an ideal gas in an isothermal expansion, ΔT = 0, which means internal energy is unchanged (ΔU = 0). By the First Law of Thermodynamics, ΔU = q + W. Since the gas performs work, W = -500 J. Therefore, 0 = q - 500 => q = +500 Joules."
  },
  {
    topic: "Mechanics Universal gravity",
    q: "If the mass of the Earth is M and its radius is R, what is the acceleration due to gravity (g) at a height equal to the Earth's radius (R) above the surface?",
    choices: [
      { text: "g / 4", isCorrect: true },
      { text: "g / 2", isCorrect: false },
      { text: "g", isCorrect: false },
      { text: "insufficient data to determine", isCorrect: false }
    ],
    rationale: "At the Earth's surface, g = G*M/R^2. At a height H = R, the distance from the Earth's center is d = R + H = 2R. The acceleration is g_new = G*M/(2R)^2 = G*M/(4R^2) = g/4."
  }
];
