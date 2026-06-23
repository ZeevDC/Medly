import React, { useState, useEffect } from 'react';
import { 
  School, 
  Target, 
  FileText, 
  Calendar, 
  Calculator, 
  HelpCircle, 
  TrendingUp, 
  CheckSquare, 
  Square,
  Compass,
  CheckCircle,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { MedSchool } from '../types';

interface AdmissionsMatrixProps {
  medSchools: MedSchool[];
  nmatGoal: number;
  setNmatGoal: (val: number) => void;
  undergradGwa: string;
  setUndergradGwa: (val: string) => void;
  isDataLight: boolean;
}

export default function AdmissionsMatrix({
  medSchools,
  nmatGoal,
  setNmatGoal,
  undergradGwa,
  setUndergradGwa,
  isDataLight,
}: AdmissionsMatrixProps) {
  // Input states
  const [gradingType, setGradingType] = useState<'gwa' | 'qpi'>('gwa');
  const [numericGrade, setNumericGrade] = useState<number>(1.45); // default Cum Laude
  const [selectedDreamSchool, setSelectedDreamSchool] = useState<string>('asmph');
  const [isManilaResident, setIsManilaResident] = useState<boolean>(false);
  const [isUpGrad, setIsUpGrad] = useState<boolean>(false);

  // Requirement status stored locally
  const [documentChecklist, setDocumentChecklist] = useState<{ [key: string]: boolean }>(() => {
    try {
      const stored = localStorage.getItem('medly_doc_checklist');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      'tor': true, // Transcript
      'recom': false, // Letters
      'nmat': false, // NMAT certificate
      'goodmoral': false, // Good moral
      'birth': true, // Birth Certificate
    };
  });

  useEffect(() => {
    localStorage.setItem('medly_doc_checklist', JSON.stringify(documentChecklist));
  }, [documentChecklist]);

  const toggleCheck = (id: string) => {
    setDocumentChecklist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // NMAT Prediction Calculator Algorithm
  // Calculate recommended NMAT percentile rank
  const calculateRequiredNmat = (): number => {
    let baseNmat = 90;
    
    // Choose active school
    const school = medSchools.find(s => s.id === selectedDreamSchool) || medSchools[0];
    baseNmat = school.requiredNmatMin;

    // Relative weightings based on GWA
    if (gradingType === 'gwa') {
      // Philippine GWA: 1.0 (Summa) to 3.0 (Passing). Lower is better.
      const gwa = Number(numericGrade);
      if (selectedDreamSchool === 'upcm') {
        // UPCM is extremely competitive
        if (gwa <= 1.20) {
          baseNmat = Math.max(baseNmat, 98); // Top tier grades can get in with 98
        } else if (gwa <= 1.50) {
          baseNmat = 99; // Cum laude UP grad needs 99
        } else {
          baseNmat = 99; // Standard grad needs absolute top percentile 99.5
        }
        if (isUpGrad) baseNmat -= 1; // Slight UP preference
      } else if (selectedDreamSchool === 'asmph') {
        // Ateneo
        if (gwa <= 1.20) baseNmat = 90;
        else if (gwa <= 1.50) baseNmat = 93;
        else if (gwa <= 1.80) baseNmat = 95;
        else baseNmat = 97;
      } else if (selectedDreamSchool === 'plm') {
        // Pamantasan ng Lungsod ng Maynila - prefers Manila residents
        if (isManilaResident) {
          if (gwa <= 1.30) baseNmat = 85;
          else if (gwa <= 1.60) baseNmat = 90;
          else baseNmat = 93;
        } else {
          // Non-Manila residents have extremely high standards
          if (gwa <= 1.30) baseNmat = 93;
          else baseNmat = 96;
        }
      } else {
        // St Lukes, UERM
        if (gwa <= 1.50) baseNmat = Math.max(school.requiredNmatMin, 85);
        else baseNmat = Math.max(school.requiredNmatMin + 5, 88);
      }
    } else {
      // QPI: 4.0 (A) to 1.0. Higher is better.
      const qpi = Number(numericGrade);
      if (selectedDreamSchool === 'asmph') {
        if (qpi >= 3.8) baseNmat = 90;
        else if (qpi >= 3.5) baseNmat = 93;
        else if (qpi >= 3.2) baseNmat = 95;
        else baseNmat = 97;
      } else {
        if (qpi >= 3.8) baseNmat = Math.max(school.requiredNmatMin, 88);
        else baseNmat = Math.max(school.requiredNmatMin + 6, 92);
      }
    }

    // Ensure it falls within absolute limits
    return Math.min(99, Math.max(school.requiredNmatMin, baseNmat));
  };

  const recommendedScore = calculateRequiredNmat();

  // Sync to App State
  const handleSaveResult = () => {
    setNmatGoal(recommendedScore);
    setUndergradGwa(`${numericGrade} (${gradingType.toUpperCase()})`);
  };

  const selectedSchoolInfo = medSchools.find(s => s.id === selectedDreamSchool) || medSchools[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
      {/* 2. Unified Grid: Calculator and school requirements */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-slate-800 font-sans flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <span>NMAT Target Percentile Predictor</span>
          </h2>
          <p className="text-xs text-slate-400">Estimate the exact NMAT Percentile Rank (PR) needed to become a competitive applicant based on actual weightings.</p>
        </div>

        {/* Form panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Undergraduate Grading System</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setGradingType('gwa'); setNumericGrade(1.45); }}
                  className={`py-2 rounded-xl text-xs font-bold cursor-pointer border text-center transition-all ${
                    gradingType === 'gwa'
                      ? 'bg-white border-emerald-500 text-emerald-800 shadow-sm'
                      : 'bg-slate-100 border-transparent text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  GWA (1.0 to 3.0)
                  <span className="block text-[9px] font-medium text-slate-400">UP, DLSU, PLM style</span>
                </button>
                <button
                  onClick={() => { setGradingType('qpi'); setNumericGrade(3.40); }}
                  className={`py-2 rounded-xl text-xs font-bold cursor-pointer border text-center transition-all ${
                    gradingType === 'qpi'
                      ? 'bg-white border-emerald-500 text-emerald-800 shadow-sm'
                      : 'bg-slate-100 border-transparent text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  QPI (1.0 to 4.0)
                  <span className="block text-[9px] font-medium text-slate-400">Ateneo / UST style</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-750 mb-1">
                Your Undergraduate Score ({gradingType === 'gwa' ? 'GWA' : 'QPI'})
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  step="0.05"
                  min={gradingType === 'gwa' ? 1.0 : 1.0}
                  max={gradingType === 'gwa' ? 3.0 : 4.0}
                  value={numericGrade}
                  onChange={(e) => setNumericGrade(Number(e.target.value))}
                  className="w-24 p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 font-extrabold text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <span className="text-[11px] text-slate-400">
                  {gradingType === 'gwa' 
                    ? '(e.g. 1.00 is raw perfection, 1.45 is typically Cum Laude)'
                    : '(e.g. 4.00 is raw perfection, 3.40 is Dean\'s List)'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Your Dream Medical School</label>
              <select
                value={selectedDreamSchool}
                onChange={(e) => setSelectedDreamSchool(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {medSchools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.abbreviation} - {school.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Manila Residency / UP Grad preferences */}
            <div className="space-y-2 pt-2 border-t border-slate-150">
              {selectedDreamSchool === 'plm' && (
                <label className="flex items-center space-x-2 cursor-pointer bg-white p-2 border border-slate-200 rounded-lg">
                  <input
                    type="checkbox"
                    checked={isManilaResident}
                    onChange={(e) => setIsManilaResident(e.target.checked)}
                    className="rounded border-slate-305 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-extrabold text-slate-800 block text-[10px]">Registered Manila Resident?</span>
                    <span className="text-[9px] text-slate-400 block">PLM offers significant quotas/subsidies to Manila residents.</span>
                  </div>
                </label>
              )}

              {selectedDreamSchool === 'upcm' && (
                <label className="flex items-center space-x-2 cursor-pointer bg-white p-2 border border-slate-200 rounded-lg">
                  <input
                    type="checkbox"
                    checked={isUpGrad}
                    onChange={(e) => setIsUpGrad(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-extrabold text-slate-800 block text-[10px]">Graduating from UP System?</span>
                    <span className="text-[9px] text-slate-400 block">UP College of Medicine allocates specific slots to UP Manila/Diliman premeds.</span>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Results Output Block */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-5 flex flex-col justify-between text-center space-y-4">
            <div className="space-y-1.5">
              <span className="p-2 bg-emerald-50 text-emerald-700 rounded-full inline-flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-600" />
              </span>
              <span className="text-[10px] text-slate-400 block font-extrabold uppercase tracking-wide">COMPETITIVE PR RECOMMENDATION</span>
              
              <div className="py-2">
                <span className="text-4xl sm:text-5xl font-black text-slate-850 font-sans tracking-tight">
                  {recommendedScore}
                </span>
                <span className="text-xs font-bold text-slate-400 block mt-1">Percentile Rank or higher</span>
              </div>

              <div className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] rounded-full inline-block font-semibold">
                School minimum: {selectedSchoolInfo.requiredNmatMin} PR
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] leading-relaxed text-slate-500">
                This prediction reflects historical admissions weighted averages: <strong>{selectedSchoolInfo.weightGwa} GWA weighing</strong> and <strong>{selectedSchoolInfo.weightNmat} NMAT weighing</strong> at {selectedSchoolInfo.abbreviation}.
              </p>
              
              <button
                onClick={handleSaveResult}
                className="w-full py-2 bg-slate-900 border border-slate-950 text-white font-bold text-xs uppercase tracking-wide rounded-xl cursor-pointer hover:bg-slate-850 transition-all"
              >
                Sync with my Dashboard Goal
              </button>
            </div>
          </div>
        </div>

        {/* Selected School detailed profiles */}
        <div className="p-4 border border-slate-150 rounded-2xl space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-extrabold flex items-center justify-center">
                🏫
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-[13px] leading-none">{selectedSchoolInfo.name}</h3>
                <span className="text-[10px] text-slate-400 font-medium">Official Cut-off and Weighing Structure</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded">
              {selectedSchoolInfo.abbreviation} Admission
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-2">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold">NMAT Weight</span>
              <span className="font-bold text-slate-800 block text-xs">{selectedSchoolInfo.weightNmat}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold">GWA Weight</span>
              <span className="font-bold text-slate-800 block text-xs">{selectedSchoolInfo.weightGwa}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold">Min. NMAT</span>
              <span className="font-bold text-slate-800 block text-xs">{selectedSchoolInfo.requiredNmatMin} PR</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-150 text-center col-span-2 md:col-span-1">
              <span className="text-[10px] text-slate-400 block font-semibold">Annual Deadline</span>
              <span className="font-extrabold text-slate-800 block text-xs">{selectedSchoolInfo.deadline}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist and Deadlines drawer */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <CheckSquare className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-extrabold text-slate-800 font-sans text-sm sm:text-base">Document tracker</h2>
              <p className="text-xs text-slate-400">Collect physical credentials for ASMPH, UPCM, PLM, UERM, FNRMF submissions.</p>
            </div>
          </div>

          {/* Document list checkboxes */}
          <div className="space-y-3 py-2">
            
            <div 
              onClick={() => toggleCheck('tor')} 
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                documentChecklist['tor'] ? 'bg-emerald-50/50 border-emerald-100 text-emerald-950' : 'bg-slate-50/60 border-slate-100 text-slate-600'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className={`w-1.5 h-1.5 rounded-full ${documentChecklist['tor'] ? 'bg-emerald-500' : 'bg-slate-350'}`} />
                <div>
                  <span className="font-bold block">Transcript of Records (TOR)</span>
                  <span className="text-[9px] text-slate-400 block">Undergraduate office certified true copy.</span>
                </div>
              </div>
              {documentChecklist['tor'] ? (
                <span className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-300 px-2 py-0.5 rounded shadow-sm">✓ Collected</span>
              ) : (
                <span className="text-[10px] text-slate-400 font-bold px-2 py-0.5 border border-dashed rounded">In progress</span>
              )}
            </div>

            <div 
              onClick={() => toggleCheck('recom')} 
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                documentChecklist['recom'] ? 'bg-emerald-50/50 border-emerald-100 text-emerald-950' : 'bg-slate-50/60 border-slate-100 text-slate-600'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className={`w-1.5 h-1.5 rounded-full ${documentChecklist['recom'] ? 'bg-emerald-500' : 'bg-slate-350'}`} />
                <div>
                  <span className="font-bold block">Recommendation Letters</span>
                  <span className="text-[9px] text-slate-400 block">Two letters from science department professors.</span>
                </div>
              </div>
              {documentChecklist['recom'] ? (
                <span className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-300 px-2 py-0.5 rounded shadow-sm">✓ Collected</span>
              ) : (
                <span className="text-[10px] text-slate-400 font-bold px-2 py-0.5 border border-dashed rounded">In progress</span>
              )}
            </div>

            <div 
              onClick={() => toggleCheck('nmat')} 
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                documentChecklist['nmat'] ? 'bg-emerald-50/50 border-emerald-100 text-emerald-950' : 'bg-slate-50/60 border-slate-100 text-slate-600'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className={`w-1.5 h-1.5 rounded-full ${documentChecklist['nmat'] ? 'bg-emerald-500' : 'bg-slate-350'}`} />
                <div>
                  <span className="font-bold block">Official NMAT PR Report</span>
                  <span className="text-[9px] text-slate-400 block">CEM paper certification certificate mailed.</span>
                </div>
              </div>
              {documentChecklist['nmat'] ? (
                <span className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-300 px-2 py-0.5 rounded shadow-sm">✓ Collected</span>
              ) : (
                <span className="text-[10px] text-slate-400 font-bold px-2 py-0.5 border border-dashed rounded">In progress</span>
              )}
            </div>

            <div 
              onClick={() => toggleCheck('goodmoral')} 
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                documentChecklist['goodmoral'] ? 'bg-emerald-50/50 border-emerald-100 text-emerald-950' : 'bg-slate-50/60 border-slate-100 text-slate-600'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className={`w-1.5 h-1.5 rounded-full ${documentChecklist['goodmoral'] ? 'bg-emerald-500' : 'bg-slate-350'}`} />
                <div>
                  <span className="font-bold block">Good Moral Character Cert</span>
                  <span className="text-[9px] text-slate-400 block">Dean or guidance counselor signed report.</span>
                </div>
              </div>
              {documentChecklist['goodmoral'] ? (
                <span className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-300 px-2 py-0.5 rounded shadow-sm">✓ Collected</span>
              ) : (
                <span className="text-[10px] text-slate-400 font-bold px-2 py-0.5 border border-dashed rounded">In progress</span>
              )}
            </div>

          </div>
        </div>

        {/* Action guidelines */}
        <div className="border-t border-slate-100 pt-4 text-[11px] text-slate-500 leading-relaxed text-center">
          <p>
            Submission requirements are standardized via CEM (Center for Educational Measurement). Ensure your physical copies are authenticated before mailing.
          </p>
        </div>
      </div>
    </div>
  );
}
