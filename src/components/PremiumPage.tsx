import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Brain, 
  Clock, 
  Compass, 
  Calendar, 
  Layers, 
  AlertCircle,
  ShieldCheck,
  ChevronRight
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
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in py-6 text-center" id="premium-view-wrapper">
      
      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/10 to-indigo-500/10 text-indigo-950 text-xs font-black uppercase px-4 py-1.5 rounded-full tracking-wider border border-indigo-200">
        <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Platform Upgrade Notification</span>
      </div>

      {/* Main Announcement Header */}
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-850 tracking-tight leading-tight">
          Medly Lifetime Pass Activated
        </h2>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
          We have standardized all candidate profiles on Medly to the complete <strong className="text-indigo-950 font-black">Lifetime Pass (₱249 value)</strong> entirely free. No paywalls, no tiered subscriptions, and no barriers between you and your dream medical school.
        </p>
      </div>

      {/* Activated Status Card */}
      <div className="p-1 bg-gradient-to-r from-amber-500 via-[#1b4cb4] to-indigo-650 rounded-[30px] shadow-lg max-w-md mx-auto overflow-hidden">
        <div className="bg-slate-900 text-white rounded-[28px] p-6 space-y-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent)] pointer-events-none" />
          
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto border border-white/10">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Active Privilege
            </span>
            <h4 className="text-lg font-extrabold text-white">VIP Lifetime Candidate Account</h4>
            <p className="text-xs text-slate-400">Sync status: Fully matched with Firestore core ledger</p>
          </div>

          <div className="pt-2">
            <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-[11px] text-slate-300 font-medium">
              Registered Email: <span className="font-mono text-white font-bold block mt-0.5">studyfilesbyz@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Unlocked Capabilities */}
      <div className="bg-white border border-slate-100 rounded-[28px] p-6 sm:p-8 space-y-6 shadow-sm text-left">
        <div>
          <h3 className="font-black text-lg text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5.5 h-5.5 text-indigo-600" />
            <span>Complete Suite Fully Unlocked</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-semibold">Your account has instant, unrestricted access to every capability on the platform:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Benefit 1 */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
            <div className="flex items-center gap-2.5 text-indigo-900 font-extrabold">
              <span className="p-1.5 bg-indigo-50 text-[#1b4cb4] rounded-lg">
                <Brain className="w-4.5 h-4.5" />
              </span>
              <span className="text-xs">Active Recall Spacing</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Unlock unlimited socratic flashcard spacing retrieval. Solidify neural myelination without daily bounds.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
            <div className="flex items-center gap-2.5 text-indigo-900 font-extrabold">
              <span className="p-1.5 bg-indigo-50 text-[#1b4cb4] rounded-lg">
                <Compass className="w-4.5 h-4.5" />
              </span>
              <span className="text-xs">Timed Clinical Practice</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Run randomized, adaptive 60-second timed clinical practice drills with comprehensive rationales.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
            <div className="flex items-center gap-2.5 text-indigo-900 font-extrabold">
              <span className="p-1.5 bg-indigo-50 text-[#1b4cb4] rounded-lg">
                <Clock className="w-4.5 h-4.5" />
              </span>
              <span className="text-xs">120-Item Board Simulators</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Evaluate performance indexes in real-time under mock NMAT conditions (Part I and Part II).
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
            <div className="flex items-center gap-2.5 text-indigo-900 font-extrabold">
              <span className="p-1.5 bg-indigo-50 text-[#1b4cb4] rounded-lg">
                <Calendar className="w-4.5 h-4.5" />
              </span>
              <span className="text-xs">Spaced Repetition Coach</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Generate custom, interleaving study agendas calibrated to your specific target exam date.
            </p>
          </div>

          {/* Benefit 5 */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
            <div className="flex items-center gap-2.5 text-indigo-900 font-extrabold">
              <span className="p-1.5 bg-indigo-50 text-[#1b4cb4] rounded-lg">
                <Layers className="w-4.5 h-4.5" />
              </span>
              <span className="text-xs">Study Heatmap Grid</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Audit study density grids to pinpoint schedule deficiencies and keep your memory retention sharp.
            </p>
          </div>

          {/* Benefit 6 */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
            <div className="flex items-center gap-2.5 text-indigo-900 font-extrabold">
              <span className="p-1.5 bg-indigo-50 text-[#1b4cb4] rounded-lg">
                <AlertCircle className="w-4.5 h-4.5" />
              </span>
              <span className="text-xs">Diagnostic Weakspots Logs</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Review full warnings of missed topics during active drills so you can focus on key recovery actions.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
