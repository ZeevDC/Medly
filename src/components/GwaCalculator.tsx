import React, { useState } from 'react';
import { Calculator, Plus, Trash, RotateCcw, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  units: number;
  grade: number; // raw value e.g. 1.25 or 85
  system: 'numeric' | 'percentage'; // numeric (1.0 is highest, 5.0 is fail) vs percentage (100 is highest, 75 is pass)
  passThreshold: number;
}

export default function GwaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 'c1', name: 'General Zoology', units: 5, grade: 1.25, system: 'numeric', passThreshold: 3.0 },
    { id: 'c2', name: 'Organic Chemistry Laboratory', units: 3, grade: 1.5, system: 'numeric', passThreshold: 3.0 },
    { id: 'c3', name: 'Introductory Physics Mechanics', units: 4, grade: 1.75, system: 'numeric', passThreshold: 3.0 },
    { id: 'c4', name: 'Pre-Medical Biostatistics', units: 3, grade: 88, system: 'percentage', passThreshold: 75 },
  ]);

  const [newCourse, setNewCourse] = useState({
    name: '',
    units: 3,
    grade: 1.5,
    system: 'numeric' as 'numeric' | 'percentage',
    passThreshold: 3.0
  });

  const [activeSystemTab, setActiveSystemTab] = useState<'numeric' | 'percentage'>('numeric');

  const addCourse = () => {
    if (!newCourse.name.trim()) return;
    const isNumeric = activeSystemTab === 'numeric';
    setCourses(prev => [
      ...prev,
      {
        id: `course-${Date.now()}`,
        name: newCourse.name,
        units: newCourse.units,
        grade: isNumeric ? Number(newCourse.grade) : 85,
        system: activeSystemTab,
        passThreshold: isNumeric ? 3.0 : 75
      }
    ]);
    setNewCourse(prev => ({ ...prev, name: '' }));
  };

  const removeCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const updateGrade = (id: string, newG: number) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, grade: newG } : c));
  };

  const updateUnits = (id: string, newU: number) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, units: newU } : c));
  };

  const resetAll = () => {
    setCourses([]);
  };

  // Dynamic calculations:
  // Since some courses are numeric and some are percentage, let's normalize them for reporting, or list GWA values independently per grading system!
  // Normalizing lets us give an overall approximate, but reporting separate GWA calculations per system is mathematically precise for Philippine registrar systems!
  const numericCourses = courses.filter(c => c.system === 'numeric');
  const percentageCourses = courses.filter(c => c.system === 'percentage');

  const calculateNumericGWA = () => {
    if (numericCourses.length === 0) return 0;
    const totalWeightedPoints = numericCourses.reduce((sum, c) => sum + (c.grade * c.units), 0);
    const totalUnits = numericCourses.reduce((sum, c) => sum + c.units, 0);
    return Math.round((totalWeightedPoints / totalUnits) * 100) / 100;
  };

  const calculatePercentageGWA = () => {
    if (percentageCourses.length === 0) return 0;
    const totalWeightedPoints = percentageCourses.reduce((sum, c) => sum + (c.grade * c.units), 0);
    const totalUnits = percentageCourses.reduce((sum, c) => sum + c.units, 0);
    return Math.round((totalWeightedPoints / totalUnits) * 100) / 100;
  };

  const getPassFailStatus = (course: Course) => {
    if (course.system === 'numeric') {
      // 1.0 is highest, 3.0 is pass, 5.0 is fail
      return course.grade <= course.passThreshold;
    } else {
      // 100 is highest, 75 is pass
      return course.grade >= course.passThreshold;
    }
  };

  const totalFails = courses.filter(c => !getPassFailStatus(c)).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* Dynamic Summary Panel */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-5 shadow-xs">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm">GWA Yield Analyzer</h3>
              <p className="text-[11px] text-slate-400">Undergrad grades are weighted strongly by med schools.</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {/* Numeric GWA (1.0 - 5.0 system) */}
            <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase text-sky-700 tracking-wider">Numeric GWA (1.0 to 5.0)</span>
                <span className="text-[10px] font-medium text-slate-400">Lower is better</span>
              </div>
              <div className="mt-1 flex items-baseline space-x-2">
                <span className="text-3xl font-black text-slate-850">
                  {numericCourses.length > 0 ? calculateNumericGWA().toFixed(2) : 'N/A'}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  ({numericCourses.reduce((sum, c) => sum + c.units, 0)} Units)
                </span>
              </div>
              <span className="text-[10px] text-slate-450 mt-1 leading-snug">Used by UP, UST, PLM, ASMPH admission offices.</span>
            </div>

            {/* Percentage GWA (75 - 100% system) */}
            <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">Percentage GWA (75 - 100%)</span>
                <span className="text-[10px] font-medium text-slate-400">Higher is better</span>
              </div>
              <div className="mt-1 flex items-baseline space-x-2">
                <span className="text-3xl font-black text-slate-850">
                  {percentageCourses.length > 0 ? calculatePercentageGWA().toFixed(1) + '%' : 'N/A'}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  ({percentageCourses.reduce((sum, c) => sum + c.units, 0)} Units)
                </span>
              </div>
              <span className="text-[10px] text-slate-450 mt-1 leading-snug">Used by medical schools with percentage equivalencies.</span>
            </div>
          </div>

          {/* Pass Threshold Warnings */}
          <div className="pt-2">
            {totalFails > 0 ? (
              <div className="bg-red-50 border border-red-200 text-red-950 p-3.5 rounded-xl flex items-start space-x-2.5">
                <AlertCircle className="w-5 h-5 text-red-650 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-extrabold block text-red-950">Threshold Warning Detected</span>
                  You have <strong className="font-black text-red-650">{totalFails} course(s)</strong> falling below required course pass thresholds. Med school admissions highly prioritize clean transcripts!
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-3.5 rounded-xl flex items-start space-x-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-extrabold block text-emerald-950">Honor Standard Secure</span>
                  All added courses satisfy their respective academic passing targets. Transcripts are certified clear for medical registration!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Admissions Weight Info */}
        <div className="p-4 bg-slate-55 border border-slate-150 rounded-2xl text-xs space-y-2 text-slate-600 font-medium">
          <div className="flex items-center space-x-1 font-bold text-slate-800">
            <HelpCircle className="w-4 h-4 text-sky-500 animate-pulse" />
            <span>Admissions Formula Guide</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            UPCM uses GWA for **60%** of their index score. ASMPH uses GWA for **40%** alongside interview profiles. Maintain a numeric GWA under **1.50** or percentage GWA above **92%** to stand out in competitive quotas!
          </p>
        </div>
      </div>

      {/* Main Course Ledger and Dynamic Grade Editor */}
      <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-black text-slate-850 text-sm sm:text-base">Course Transcripts & Grade Log</h3>
            <p className="text-xs text-slate-400">Input your mock terms, quizzes, or active university transcript courses below.</p>
          </div>
          <button 
            onClick={resetAll}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-650 font-bold hover:bg-slate-100 text-[10px] rounded-xl flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear Transcript</span>
          </button>
        </div>

        {/* Input Add Course Block */}
        <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-4">
          <div className="flex space-x-1 border-b border-slate-200 pb-1 w-full justify-start gap-1">
            <button
              onClick={() => setActiveSystemTab('numeric')}
              className={`pb-1 text-xs font-extrabold cursor-pointer transition-all border-b-2 px-2 ${
                activeSystemTab === 'numeric' ? 'border-sky-500 text-sky-600' : 'border-transparent text-slate-450 hover:text-slate-650'
              }`}
            >
              Numeric Grade (1.0 to 3.0/5.0)
            </button>
            <button
              onClick={() => setActiveSystemTab('percentage')}
              className={`pb-1 text-xs font-extrabold cursor-pointer transition-all border-b-2 px-2 ${
                activeSystemTab === 'percentage' ? 'border-sky-500 text-sky-600' : 'border-transparent text-slate-450 hover:text-slate-650'
              }`}
            >
              Percentage Grade (75 to 100%)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-5">
              <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase tracking-wide">Course / Subject Name</label>
              <input
                type="text"
                placeholder="e.g. Inorganic Chemistry, Biostatistics, Physics Lab..."
                value={newCourse.name}
                onChange={(e) => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase tracking-wide">Credit Units</label>
              <select
                value={newCourse.units}
                onChange={(e) => setNewCourse(prev => ({ ...prev, units: Number(e.target.value) }))}
                className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
              >
                {[1, 2, 3, 4, 5, 6].map(u => <option key={u} value={u}>{u} Units</option>)}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase tracking-wide">
                Target Grade {activeSystemTab === 'numeric' ? '(e.g. 1.25)' : '(e.g. 88%)'}
              </label>
              <input
                type="number"
                step={activeSystemTab === 'numeric' ? '0.25' : '1'}
                value={newCourse.grade}
                onChange={(e) => setNewCourse(prev => ({ ...prev, grade: Number(e.target.value) }))}
                className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                onClick={addCourse}
                className="w-full p-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-lg cursor-pointer flex items-center justify-center gap-1 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-705">
            <thead>
              <tr className="border-b border-slate-150 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                <th className="py-3 px-2">Course Name</th>
                <th className="py-3 px-2">Grading System</th>
                <th className="py-3 px-2 text-center">Credit Units</th>
                <th className="py-3 px-2 text-center">Your Grade</th>
                <th className="py-3 px-2 text-center">Pass Target</th>
                <th className="py-3 px-2 text-center">Status</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400 font-medium">
                    No course grades loaded. Add some pre-med units above to compute!
                  </td>
                </tr>
              ) : (
                courses.map((course) => {
                  const isPassed = getPassFailStatus(course);
                  return (
                    <tr key={course.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-all font-medium">
                      <td className="py-3 px-2 font-bold text-slate-800">{course.name}</td>
                      <td className="py-3 px-2 text-slate-450 uppercase text-[10px]">
                        {course.system === 'numeric' ? '1.0 - 5.0 scale' : '75 - 100% scale'}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={course.units}
                          onChange={(e) => updateUnits(course.id, Number(e.target.value))}
                          className="w-12 p-1 border border-slate-200 text-center rounded outline-none bg-transparent"
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          step={course.system === 'numeric' ? '0.05' : '1'}
                          value={course.grade}
                          onChange={(e) => updateGrade(course.id, Number(e.target.value))}
                          className="w-16 p-1 border font-bold border-slate-201 text-center rounded outline-none bg-transparent text-slate-850"
                        />
                      </td>
                      <td className="py-3 px-2 text-center text-slate-450 font-bold">
                        {course.system === 'numeric' ? `≤ ${course.passThreshold}` : `≥ ${course.passThreshold}%`}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {isPassed ? (
                          <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-150 text-emerald-700 rounded text-[9px] font-black">
                            PASSED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-red-50 border border-red-150 text-red-600 rounded text-[9px] font-black">
                            LOW GRADE
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => removeCourse(course.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-all cursor-pointer inline-block"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
