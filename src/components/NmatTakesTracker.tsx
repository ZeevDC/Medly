import React, { useState, useEffect } from 'react';
import { Award, Plus, Trash2, Calendar, TrendingUp, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export interface NmatTake {
  id: string;
  takeName: string;
  date: string;
  part1Score: number; // Part 1 Avg
  part2Score: number; // Part 2 Avg
  overallPr: number; // Percentile Rank (PR)
}

interface NmatTakesTrackerProps {
  onHighPrUpdated?: (pr: number) => void;
}

export default function NmatTakesTracker({ onHighPrUpdated }: NmatTakesTrackerProps) {
  const [takes, setTakes] = useState<NmatTake[]>(() => {
    try {
      const stored = localStorage.getItem('medly_nmat_takes');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Failed to load custom takes from localstorage:", e);
    }
    // Default empty array so no pre-built scores show
    return [];
  });

  const [newTakeName, setNewTakeName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newPart1, setNewPart1] = useState(600);
  const [newPart2, setNewPart2] = useState(600);
  const [newPr, setNewPr] = useState(90);
  const [isAdding, setIsAdding] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('medly_nmat_takes', JSON.stringify(takes));
    } catch {}
    
    if (takes.length > 0 && onHighPrUpdated) {
      const highest = Math.max(...takes.map(t => t.overallPr));
      onHighPrUpdated(highest);
    }
  }, [takes, onHighPrUpdated]);

  const handleAddTake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTakeName.trim() || !newDate) return;

    const newTake: NmatTake = {
      id: `take-${Date.now()}`,
      takeName: newTakeName.trim(),
      date: newDate,
      part1Score: Number(newPart1),
      part2Score: Number(newPart2),
      overallPr: Number(newPr)
    };

    setTakes(prev => [...prev, newTake].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    
    // Reset form fields
    setNewTakeName('');
    setNewDate('');
    setIsAdding(false);
  };

  const handleDeleteTake = (id: string) => {
    setTakes(prev => prev.filter(t => t.id !== id));
  };

  // Calculations
  const highestPr = takes.length > 0 ? Math.max(...takes.map(t => t.overallPr)) : 0;
  const averagePr = takes.length > 0 ? Math.round(takes.reduce((sum, t) => sum + t.overallPr, 0) / takes.length) : 0;
  
  // Progress Delta (Compare latest to oldest)
  let progressDelta = 0;
  if (takes.length >= 2) {
    progressDelta = takes[takes.length - 1].overallPr - takes[0].overallPr;
  }

  return (
    <div className="bg-white rounded-[24px] border border-slate-100 p-6 flex flex-col justify-between shadow-xs" id="nmat-score-comparison-board">
      <div>
        <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-3">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 bg-gradient-to-tr from-rose-50 to-amber-50 text-rose-600 rounded-xl border border-rose-100">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-extrabold text-slate-800 font-sans text-sm sm:text-base">NMAT Multi-Take Score Analytics</h2>
              <p className="text-xs text-slate-400">Track and compare your performance across multiple takes side-by-side.</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-900 text-white hover:bg-slate-800 transition-all font-bold text-xs rounded-xl flex items-center space-x-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAdding ? 'Close form' : 'Log Take'}</span>
          </button>
        </div>

        {/* Overview banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div className="p-3 bg-rose-50/50 border border-rose-100/60 rounded-xl">
            <span className="block text-[9px] uppercase font-black text-rose-500 tracking-wider">Highest Active PR</span>
            <span className="text-xl font-black text-rose-700">{highestPr || 'No takes logged'}</span>
          </div>
          <div className="p-3 bg-sky-50/50 border border-sky-100/60 rounded-xl">
            <span className="block text-[9px] uppercase font-black text-sky-500 tracking-wider">Average Take PR</span>
            <span className="text-xl font-black text-sky-700">{averagePr || 0} Percentile</span>
          </div>
          <div className="p-3 bg-emerald-50/50 border border-emerald-100/60 rounded-xl flex flex-col justify-between">
            <span className="block text-[9px] uppercase font-black text-emerald-600 tracking-wider">Cumulative Delta</span>
            <span className="text-xs font-black text-emerald-800 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{progressDelta > 0 ? `+${progressDelta}` : progressDelta} Percentile Points</span>
            </span>
          </div>
        </div>

        {/* Adding form */}
        {isAdding && (
          <form onSubmit={handleAddTake} className="bg-slate-50 p-4 rounded-xl border border-slate-200/50 space-y-3 mb-5 text-xs animate-fade-in">
            <div className="flex gap-2 items-center text-xs font-bold text-slate-700 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Log a New NMAT Attempt</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Take Label/Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3rd Take (Official)"
                  value={newTakeName}
                  onChange={(e) => setNewTakeName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-slate-400"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Date of Exam</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Part 1 Average</label>
                <input
                  type="number"
                  min="200"
                  max="800"
                  value={newPart1}
                  onChange={(e) => setNewPart1(Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Part 2 Average</label>
                <input
                  type="number"
                  min="200"
                  max="800"
                  value={newPart2}
                  onChange={(e) => setNewPart2(Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Overall Percentile Rank</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={newPr}
                  onChange={(e) => setNewPr(Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-teal-200 rounded-lg outline-none font-bold text-rose-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-bold rounded-lg cursor-pointer transition-all shadow-sm"
            >
              Add Take details
            </button>
          </form>
        )}

        {/* Side-by-side Takes Comparison List */}
        <div className="space-y-3 mb-5">
          {takes.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
              No NMAT attempts logged yet. Tap "Log Take" above to map your growth timeline!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black">
                    <th className="py-2.5">Take ID</th>
                    <th className="py-2.5">Exam Date</th>
                    <th className="py-2.5 text-center">Part 1 Standard</th>
                    <th className="py-2.5 text-center">Part 2 Standard</th>
                    <th className="py-2.5 text-center">Overall PR</th>
                    <th className="py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium">
                  {takes.map((tk) => (
                    <tr key={tk.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-bold text-slate-800">{tk.takeName}</td>
                      <td className="py-2.5 text-slate-400">
                        <span className="inline-flex items-center gap-1 text-[10px]">
                          <Calendar className="w-3 h-3" />
                          {new Date(tk.date).toLocaleDateString(undefined, {month: 'short', day:'numeric', year:'numeric'})}
                        </span>
                      </td>
                      <td className="py-2.5 text-center font-mono">{tk.part1Score}</td>
                      <td className="py-2.5 text-center font-mono">{tk.part2Score}</td>
                      <td className="py-2.5 text-center">
                        <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full font-black text-[11px]">
                          {tk.overallPr} PR
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteTake(tk.id)}
                          className="p-1 px-1.5 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-lg transition-colors cursor-pointer"
                          title="Delete take attempt log"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
