import React, { useState } from 'react';
import { 
  BookOpen, 
  Compass, 
  MapPin, 
  Bookmark, 
  Sliders, 
  Heart, 
  ShieldCheck, 
  Award, 
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { BridgeModule } from '../types';

export default function BridgeProgram() {
  const [activeCourse, setActiveCourse] = useState<'Anatomy' | 'Biochemistry' | 'Physiology'>('Anatomy');
  const [unlockedState, setUnlockedState] = useState<boolean>(true); // initially unlocked for easy user traversal!

  const bridgeModules: BridgeModule[] = [
    {
      id: 'bridge-1',
      title: 'Gross Anatomy Prep Module',
      course: 'Anatomy',
      description: 'Prepare for the legendary Anato-marathons. Understand anatomical planes, skeletal muscle origins, insertions, and neural innervations.',
      survivalTips: [
        'Do not try to memorize everything in one night. Review muscle groupings by compartments (e.g., anterior thigh vs posterior compartment).',
        'Use high-quality color Atlases (like Netter or Moore) rather than flat textbook diagrams.',
        'Always verify bone landmarks before studying the attached muscle fibers.'
      ],
      topics: [
        {
          name: 'The Upper Limb Rotator Cuff Muscles',
          description: 'Four muscles that stabilize the glenohumeral joint structure.',
          mnemonics: 'S.I.T.S. (Supraspinatus, Infraspinatus, Teres Minor, Subscapularis)',
          primerContent: 'Supraspinatus initiates abduction of the arm (first 15 degrees). Infraspinatus handle lateral rotation. Teres Minor handles lateral rotation and adduction. Subscapularis handles medial rotation.'
        },
        {
          name: 'Anatomical Directional Planes',
          description: 'Standard conceptual slices used to describe body structures.',
          mnemonics: 'No mnemonic needed; relate directly to physical coordinates (Sagittal = splits Left/Right, Coronal = splits Front/Back, Transverse = splits Top/Bottom).',
          primerContent: 'Standard anatomical position is standing erect, feet together, facing forward, with palms facing forward as well. Keep standard positions memorised!'
        }
      ]
    },
    {
      id: 'bridge-2',
      title: 'Biochemistry Pathways Primer',
      course: 'Biochemistry',
      description: 'Review glucose catabolism, Krebs cycle conversions, amino acid breakdowns, and hormone receptors.',
      survivalTips: [
        'Focus heavily on the energetic bottlenecks (rate-limiting enzymes) of each cycle.',
        'Draw the cycles on whiteboards from memory repeatedly—it\'s the only way to retain co-factors.',
        'Associate metabolic dysfunctions directly with their corresponding clinical genetic pathology (e.g. G6PD deficiency).'
      ],
      topics: [
        {
          name: 'Rate-Limiting Enzymes of Cellular Pathways',
          description: 'The key enzymes that regulate the speed of energy generation.',
          mnemonics: 'P.F.K.-1 (Glycolysis), Isocitrate Dehydrogenase (Krebs), Carnitine Acyltransferase I (Beta-Oxidation).',
          primerContent: 'Phosphofructokinase-1 (PFK-1) catalyzes the phosphorylation of Fructose 6-phosphate to Fructose 1,6-bisphosphate using ATP. Highly regulated by AMP and Fructose 2,6-bisphosphate.'
        }
      ]
    },
    {
      id: 'bridge-3',
      title: 'Renal & Cardiovascular Physiology',
      course: 'Physiology',
      description: 'Explore homeostasis mechanisms, cardiac output pathways, action potentials, and renal filtration curves.',
      survivalTips: [
        'Understand physical formulas (e.g. Ohm\'s law applied to blood pressure: MAP = CO * SVR).',
        'Physiology is raw logic. Never memorize a reaction without understanding the corrective negative feedback mechanism.',
        'Verify urine filtration paths along the Loop of Henle and collecting duct membranes.'
      ],
      topics: [
        {
          name: 'Cardiac Output and Pressures',
          description: 'Fick principle and pressure formulas defining stroke volumes.',
          mnemonics: 'C.O. = SV * HR (Cardiac Output = Stroke Volume x Heart Rate)',
          primerContent: 'Cardiovascular system adapts pressures dynamically. Stroke volume is determined by of preload, afterload, and cardiac muscular contractility.'
        }
      ]
    }
  ];

  const activeData = bridgeModules.find(m => m.course === activeCourse) || bridgeModules[0];

  return (
    <div className="space-y-6 text-xs leading-relaxed font-sans">
      <div>
        <h2 className="text-lg font-extrabold text-slate-805 flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Pre-Med to Med School Bridge Program</span>
        </h2>
        <p className="text-xs text-slate-450">Unlocked survivor Guides featuring clinical Anatomy, Biochemistry and Physiology primers to prep you for Year 1 medical syllabus workloads.</p>
      </div>

      {!unlockedState ? (
        <div className="p-8 border-2 border-dashed border-indigo-200 rounded-2xl bg-indigo-50/20 text-center max-w-md mx-auto space-y-4">
          <Lock className="w-8 h-8 text-indigo-400 mx-auto animate-bounce" />
          <div>
            <h3 className="font-extrabold text-slate-800 text-xs">Bridge Program Locked</h3>
            <p className="text-[11px] text-slate-405 leading-relaxed mt-1">
              Complete at least 1 mock exam in our <strong>"Burnout Simulator"</strong> or answer 10 SRS active recall cards to unlock the Year 1 survival guide!
            </p>
          </div>
          <button
            onClick={() => setUnlockedState(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-705 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Unlock Bridge Program Instantly (Beta Tester override)
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Course Modules</span>
              
              <button
                onClick={() => setActiveCourse('Anatomy')}
                className={`py-3 px-3.5 rounded-xl font-bold text-xs text-left cursor-pointer transition-all ${
                  activeCourse === 'Anatomy' 
                    ? 'bg-slate-900 border border-slate-950 text-white shadow-sm' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                💀 Gross Anatomy Primer
                <span className="text-[9px] font-medium block text-slate-450 leading-none mt-1">Skeletal muscles, innervations</span>
              </button>

              <button
                onClick={() => setActiveCourse('Biochemistry')}
                className={`py-3 px-3.5 rounded-xl font-bold text-xs text-left cursor-pointer transition-all ${
                  activeCourse === 'Biochemistry' 
                    ? 'bg-slate-900 border border-slate-950 text-white shadow-sm' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                🧪 High-Yield Biochemistry
                <span className="text-[9px] font-medium block text-slate-450 leading-none mt-1">Metabolic cycles, enzymes</span>
              </button>

              <button
                onClick={() => setActiveCourse('Physiology')}
                className={`py-3 px-3.5 rounded-xl font-bold text-xs text-left cursor-pointer transition-all ${
                  activeCourse === 'Physiology' 
                    ? 'bg-slate-900 border border-slate-950 text-white shadow-sm' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                🫁 Homeostatic Physiology
                <span className="text-[9px] font-medium block text-slate-450 leading-none mt-1">Renal tubules, cardiac output</span>
              </button>
            </div>

            {/* Quick tips box */}
            <div className="p-4 bg-emerald-50 text-emerald-950 rounded-2xl border border-emerald-100 space-y-2">
              <span className="font-extrabold text-[10px] uppercase block tracking-wider text-emerald-800">Survival Fact of the Day</span>
              <p className="leading-relaxed text-[11px]">
                "Gross Anatomy requires intense visual memory. Start using anatomic 3D visualization software early in the semester to complement atlas drawings!"
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 space-y-6 shadow-sm">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-black text-slate-800 text-sm sm:text-base">{activeData.title}</h3>
                <span className="px-2.5 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-750 font-extrabold rounded">
                  Primer Module
                </span>
              </div>
              <p className="text-xs text-slate-450 mt-1">{activeData.description}</p>
            </div>

            {/* Survivor checklists */}
            <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <span className="font-extrabold text-[11px] text-slate-705 block uppercase tracking-wider">Survival guidelines from UP Med school upperclassmen:</span>
              <ul className="space-y-2 list-disc pl-4 text-slate-600 text-xs">
                {activeData.survivalTips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">{tip}</li>
                ))}
              </ul>
            </div>

            {/* High fidelity core content */}
            <div className="space-y-4">
              <span className="font-extrabold text-[11px] text-slate-705 block uppercase tracking-wider">Active Recall Topic Outlines:</span>
              <div className="space-y-4">
                {activeData.topics.map((topic, tIdx) => (
                  <div key={tIdx} className="p-4 rounded-xl border border-slate-150 space-y-2.5">
                    <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">{topic.name}</h4>
                    <p className="text-slate-500 mt-1">{topic.description}</p>
                    
                    {/* Mnemonics highlighted */}
                    <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-205 text-xs text-amber-900">
                      <strong>💡 Quick Mnemonic:</strong> <span className="font-extrabold">{topic.mnemonics}</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                      <strong className="block text-slate-700 font-bold mb-1">Functional Primer:</strong>
                      <p className="text-slate-655 leading-relaxed">{topic.primerContent}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
