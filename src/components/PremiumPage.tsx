import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  Star, 
  AlertCircle, 
  Sparkles, 
  Send,
  CheckCircle2,
  XCircle,
  Brain,
  Clock,
  Compass,
  Calendar,
  Layers,
  HelpCircle,
  Activity
} from 'lucide-react';

interface PremiumPageProps {
  userSuite: string;
  setUserSuite: (suite: string) => void;
  vouchers: any[];
  setVouchers: (vouchers: any[]) => void;
}

export default function PremiumPage({
  userSuite,
  setUserSuite,
  vouchers,
  setVouchers,
}: PremiumPageProps) {
  const [gcashPhone, setGcashPhone] = useState('');
  const [refNum, setRefNum] = useState('');
  const [selectedSuiteTier, setSelectedSuiteTier] = useState('Pro Suite (₱79)');
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const suiteList = [
    { name: 'Free Student Tier', price: '₱0', desc: 'Standard foundational review' },
    { name: 'Pro Suite (₱79)', price: '₱79', desc: 'Complete adaptive boards helper' },
    { name: 'Clinical Suite (₱149)', price: '₱149', desc: 'Syllabus analytics & core simulator' },
    { name: 'Lifetime Pass (₱249)', price: '₱249', desc: 'All tools unlocked forever' }
  ];

  const handleGCashSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gcashPhone.trim() || !refNum.trim()) {
      setAlertMsg({ type: 'error', text: 'Please fill in all payment details.' });
      return;
    }
    if (refNum.length < 8) {
      setAlertMsg({ type: 'error', text: 'Reference number looks too short.' });
      return;
    }

    // Capture and submit voucher
    const newVoucher = {
      id: `vch-${Date.now()}`,
      studentEmail: 'Juan dela Cruz (Active Student)',
      phone: gcashPhone,
      tier: selectedSuiteTier,
      refNumber: refNum,
      amount: selectedSuiteTier.includes('79') ? 79 : selectedSuiteTier.includes('149') ? 149 : selectedSuiteTier.includes('249') ? 249 : 0,
      status: 'Pending Approval',
      date: new Date().toISOString().split('T')[0]
    };

    setVouchers([newVoucher, ...vouchers]);
    setGcashPhone('');
    setRefNum('');
    setAlertMsg({
      type: 'success',
      text: 'Voucher log submitted to Medly Admins! Sending reference verification coordinates. Automated confirmation within 24 hours.'
    });
  };

  return (
    <div className="space-y-8 animate-fade-in" id="premium-view-wrapper">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-3xl font-black text-slate-850 tracking-tight flex items-center justify-center gap-2">
          Unlock the Complete Medly Suite <Sparkles className="w-6 h-6 text-yellow-500 animate-spin" style={{ animationDuration: '8s' }} />
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          Supercharge your Philippine medical school pathway. High-efficiency retrieval science, built right into active memory cells.
        </p>
      </div>

      {/* Comparative Blueprint */}
      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-150 rounded-[30px] border border-slate-200/80 shadow-md overflow-hidden">
        <div className="bg-white rounded-[28px] p-6 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-black text-lg text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5.5 h-5.5 text-indigo-600" />
                <span>Suites Comparative Matrix</span>
              </h3>
              <p className="text-xs text-slate-450 font-medium mt-0.5">Evaluate active benefits for diagnostic drills and mock clinical boards sync.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full inline-flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" /> RECOMMENDED: LIFETIME PASS
              </span>
            </div>
          </div>

          <table className="w-full text-xs text-left text-slate-700 min-w-[760px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-500 tracking-wider">
                <th className="py-4.5 px-4 font-black">Feature Blueprint Set</th>
                <th className="py-4.5 px-4 text-center bg-slate-50/50 rounded-t-2xl">Free Tier (₱0)</th>
                <th className="py-4.5 px-4 text-center text-teal-800 bg-teal-50/30">Pro Suite (₱79)</th>
                <th className="py-4.5 px-4 text-center text-sky-800 bg-sky-50/30">Clinical Suite (₱149)</th>
                <th className="py-4.5 px-4 text-center text-indigo-900 bg-indigo-50/40 rounded-t-2xl border-x border-t border-indigo-100/50">
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] bg-indigo-600 text-white font-extrabold px-1.5 py-0.2 rounded-full mb-1 tracking-widest">BEST VALUE</span>
                    <span className="flex items-center gap-0.5">Lifetime Pass (₱249)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4.5 px-4 font-bold text-slate-800 flex items-center gap-2.5">
                  <span className="p-1.5 bg-slate-100 text-slate-500 rounded-lg">
                    <Brain className="w-4 h-4" />
                  </span>
                  <span>Daily Flashcard Reviews</span>
                </td>
                <td className="py-4.5 px-4 text-center bg-slate-50/50">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-slate-100 text-slate-500 rounded-full border border-slate-200">
                    15 / Day
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-teal-50/10">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Unlimited
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-sky-50/10">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Unlimited
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-indigo-50/20 border-x border-indigo-100/20 font-black">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-indigo-100 text-indigo-800 rounded-full border border-indigo-200 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Unlimited Access
                  </span>
                </td>
              </tr>



              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4.5 px-4 font-bold text-slate-800 flex items-center gap-2.5">
                  <span className="p-1.5 bg-slate-100 text-slate-500 rounded-lg">
                    <Clock className="w-4 h-4" />
                  </span>
                  <span>Full 120-item Board Mock Simulators</span>
                </td>
                <td className="py-4.5 px-4 text-center bg-slate-50/50">
                  <span className="inline-flex items-center text-slate-300">
                    <XCircle className="w-4.5 h-4.5" />
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-teal-50/10">
                  <span className="inline-flex items-center text-slate-300">
                    <XCircle className="w-4.5 h-4.5" />
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-sky-50/10">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-sky-100 text-sky-700 rounded-full border border-sky-200 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> Part I & Part II Adaptive
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-indigo-50/20 border-x border-indigo-100/20 font-black">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-900 rounded-full border border-indigo-200 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Part I & Part II Adaptive
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4.5 px-4 font-bold text-slate-800 flex items-center gap-2.5">
                  <span className="p-1.5 bg-slate-100 text-slate-500 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                  </span>
                  <span>Diagnostic Weakspots Indicator Logs</span>
                </td>
                <td className="py-4.5 px-4 text-center bg-slate-50/50">
                  <span className="px-2.5 py-1 text-[10px] font-medium bg-slate-50 text-slate-400 border border-slate-150 rounded-full">
                    Basic Checklist
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-teal-50/10">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Full Gaps Warning Logs
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-sky-50/10">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Full Gaps Warning Logs
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-indigo-50/20 border-x border-indigo-100/20 font-black">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-indigo-100 text-indigo-800 rounded-full border border-indigo-200 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active Warning Tracker
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4.5 px-4 font-bold text-slate-800 flex items-center gap-2.5">
                  <span className="p-1.5 bg-slate-100 text-slate-500 rounded-lg">
                    <Compass className="w-4 h-4" />
                  </span>
                  <span>Clinical Practice Sprints (Timed)</span>
                </td>
                <td className="py-4.5 px-4 text-center bg-slate-50/50">
                  <span className="inline-flex items-center text-slate-300">
                    <XCircle className="w-4.5 h-4.5" />
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-teal-50/10">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Included
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-sky-50/10">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Included
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-indigo-50/20 border-x border-indigo-100/20 font-black">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-indigo-100 text-indigo-800 rounded-full border border-indigo-200 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Included
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4.5 px-4 font-bold text-slate-800 flex items-center gap-2.5">
                  <span className="p-1.5 bg-slate-100 text-slate-500 rounded-lg">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <span>Spaced Repetition Schedule Coach</span>
                </td>
                <td className="py-4.5 px-4 text-center bg-slate-50/50">
                  <span className="inline-flex items-center text-slate-300">
                    <XCircle className="w-4.5 h-4.5" />
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-teal-50/10">
                  <span className="inline-flex items-center text-slate-300">
                    <XCircle className="w-4.5 h-4.5" />
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-sky-50/10">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Custom Agenda Sync
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-indigo-50/20 border-x border-indigo-100/20 font-black">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full border border-amber-500 inline-flex items-center gap-1 shadow-2xs font-extrabold">
                    <Star className="w-3 h-3 fill-white" /> Lifetime Unlocked
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4.5 px-4 font-bold text-slate-800 flex items-center gap-2.5 md:rounded-bl-2xl">
                  <span className="p-1.5 bg-slate-100 text-slate-500 rounded-lg">
                    <Layers className="w-4 h-4" />
                  </span>
                  <span>Interactive Study Grid, Habits & Heatmap</span>
                </td>
                <td className="py-4.5 px-4 text-center bg-slate-50/50">
                  <span className="px-2.5 py-1 text-[10px] font-medium bg-slate-50 text-slate-400 border border-slate-150 rounded-full">
                    Basic Tracker
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-teal-50/10">
                  <span className="px-2.5 py-1 text-[10px] font-medium bg-slate-50 text-slate-400 border border-slate-150 rounded-full">
                    Basic Tracker
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-sky-50/10">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Full Heatmap Analytics
                  </span>
                </td>
                <td className="py-4.5 px-4 text-center bg-indigo-50/20 border-x border-b border-indigo-100/20 font-black md:rounded-br-2xl">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold bg-indigo-100 text-indigo-800 rounded-full border border-indigo-200 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Full Heatmap Analytics
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier Cards */}
        {suiteList.slice(1).map((suite) => (
          <div key={suite.name} className="bg-white rounded-[24px] border border-slate-100 p-5 sm:p-6 shadow-xs relative flex flex-col justify-between hover:shadow-md transition-all">
            {suite.name.includes('Lifetime') && (
              <span className="absolute -top-3 right-6 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-xs">
                Best value!
              </span>
            )}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-black tracking-wide text-sky-600">Upgrade Suite</span>
              <h4 className="text-lg font-black text-slate-800">{suite.name}</h4>
              <p className="text-2xl font-black text-slate-850 mt-1">{suite.price}</p>
              <p className="text-xs text-slate-450 leading-relaxed pt-2 border-t border-slate-50">{suite.desc}</p>
            </div>
            <button
              onClick={() => {
                setSelectedSuiteTier(suite.name);
                document.getElementById('gcash-secure-box')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-4 w-full py-2 bg-slate-905 hover:bg-slate-850 text-white text-xs font-bold rounded-xl transition-all"
            >
              Select {suite.name.split(' ')[0]}
            </button>
          </div>
        ))}
      </div>

      {/* GCash Verification Box */}
      <div id="gcash-secure-box" className="p-6 bg-sky-50 border border-sky-150 rounded-[24px] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center gap-2 text-sky-850">
            <span className="p-2 bg-sky-500 text-white rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight text-sky-900">GCash Secure Administrative Checkout</h4>
              <p className="text-xs text-sky-600">Fast, manual ledger checks secure direct local database credentials.</p>
            </div>
          </div>
          <div className="p-4 bg-white/80 rounded-xl space-y-2 border border-sky-100 text-xs text-slate-705 leading-relaxed font-semibold">
            <p className="text-slate-800 font-extrabold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Send payment to GCash number: <strong className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-black text-[13px]">09763333248 DEDC</strong>
            </p>
            <p className="text-[11px] text-slate-500">
              Transfer the exact amount matching your tier: ₱79 for Pro, ₱149 for Clinical, and ₱249 for Lifetime. Record the exact GCash reference code and send below!
            </p>
          </div>
        </div>

        <div className="md:col-span-5 bg-white border border-sky-100 rounded-2xl p-5">
          <form onSubmit={handleGCashSubmit} className="space-y-3 text-xs">
            <h5 className="font-extrabold text-slate-800 text-xs">Verify payment reference</h5>
            
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Target Package</label>
              <select
                value={selectedSuiteTier}
                onChange={(e) => setSelectedSuiteTier(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none font-bold"
              >
                <option value="Pro Suite (₱79)">Pro Suite - ₱79</option>
                <option value="Clinical Suite (₱149)">Clinical Suite - ₱149</option>
                <option value="Lifetime Pass (₱249)">Lifetime Pass - ₱249</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Your GCash Mobile Phone Number</label>
              <input
                type="text"
                required
                maxLength={11}
                placeholder="e.g. 09171234567"
                value={gcashPhone}
                onChange={(e) => setGclean(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">GCash 13-Digit Reference Number</label>
              <input
                type="text"
                required
                placeholder="e.g. 5002192138592"
                value={refNum}
                onChange={(e) => setRefNum(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white font-mono font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-sky-600 hover:bg-sky-750 text-white font-black rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Verify GCash Reference</span>
            </button>

            {alertMsg && (
              <div className={`p-3 rounded-lg text-[10px] flex gap-1.5 leading-tight ${
                alertMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-850'
              }`}>
                <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
                <p className="font-bold">{alertMsg.text}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );

  function setGclean(val: string) {
    const cleaned = val.replace(/\D/g, '');
    setGcleanPhone(cleaned);
  }

  function setGcleanPhone(cleaned: string) {
    setGcleanPhoneValue(cleaned);
  }

  function setGcleanPhoneValue(value: string) {
    setGcashPhone(value);
  }
}
