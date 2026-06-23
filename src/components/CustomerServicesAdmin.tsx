import React, { useState, useEffect } from 'react';
import { CreditCard, ShieldAlert, Send, ToggleLeft, ToggleRight, FileText, Check, CheckCircle, RefreshCcw, Download, Sparkles, User, Key, Database, Sliders } from 'lucide-react';

interface CustomerServicesAdminProps {
  currentUserEmail: string;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  subscriptionSimMode: string;
  setSubscriptionSimMode: (mode: string) => void;
}

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'Open' | 'Under Investigation' | 'Resolved';
  date: string;
}

interface GcashVoucher {
  id: string;
  studentEmail: string;
  tier: string;
  refNumber: string;
  amount: number;
  status: 'Pending Approval' | 'Approved' | 'Declined';
  date: string;
}

export default function CustomerServicesAdmin({
  currentUserEmail,
  currentTheme,
  setCurrentTheme,
  subscriptionSimMode,
  setSubscriptionSimMode,
}: CustomerServicesAdminProps) {
  const isAdmin = currentUserEmail.trim().toLowerCase() === 'studyfilesbyz@gmail.com';

  const [activeSubTab, setActiveSubTab] = useState<'gcash-help' | 'preferences' | 'admin-panel'>('gcash-help');

  // Themes list
  const themeOptions = [
    { id: 'cozy-bear', name: '🐻 Cozy Ice-Bear Workspace (Featured!)', bgClass: 'bg-sky-400', textClass: 'text-sky-900' },
    { id: 'blue-winter', name: '❄️ Frosted Blue Winter', bgClass: 'bg-blue-600', textClass: 'text-blue-900' },
    { id: 'strawberry-matcha', name: '🍓 Strawberry Matcha Crème', bgClass: 'bg-emerald-600', textClass: 'text-red-655' },
    { id: 'lilac-dream', name: '💜 Lilac Lavender Dream', bgClass: 'bg-purple-500', textClass: 'text-purple-900' },
    { id: 'pink-pastel', name: '🌸 Sakura Pink Pastel', bgClass: 'bg-pink-400', textClass: 'text-pink-905' },
    { id: 'red-coquette', name: '🎀 Red Coquette Lace', bgClass: 'bg-rose-600', textClass: 'text-rose-955' },
    { id: 'yellow-dream', name: '🌙 Cozy Moon Yellow Dream', bgClass: 'bg-amber-400', textClass: 'text-amber-955' }
  ];

  // --- 1. GCASH LEDGER STATES ---
  const [selectedTier, setSelectedTier] = useState('Pro Suite');
  const [gcashRef, setGcashRef] = useState('');
  const [gcashAmount, setGcashAmount] = useState('499');
  const [gcashSubmitSuccess, setGcashSubmitSuccess] = useState(false);

  const [vouchers, setVouchers] = useState<GcashVoucher[]>(() => {
    try {
      const stored = localStorage.getItem('medly_gcash_vouchers');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      { id: 'g-1', studentEmail: 'premed_julius@g.upm.edu.ph', tier: 'Pro Suite', refNumber: '1002930291', amount: 499, status: 'Pending Approval', date: '2026-06-12' },
      { id: 'g-2', studentEmail: 'maria.reales@ust.edu.ph', tier: 'Clinical Suite', refNumber: '4990219201', amount: 799, status: 'Approved', date: '2026-06-11' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('medly_gcash_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  const handleGcashSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gcashRef.trim()) return;

    const newVoucher: GcashVoucher = {
      id: `vouch-${Date.now()}`,
      studentEmail: currentUserEmail,
      tier: selectedTier,
      refNumber: gcashRef,
      amount: Number(gcashAmount),
      status: 'Pending Approval',
      date: new Date().toISOString().split('T')[0]
    };

    setVouchers(prev => [newVoucher, ...prev]);
    setGcashRef('');
    setGcashSubmitSuccess(true);
    setTimeout(() => setGcashSubmitSuccess(false), 4000);
  };

  // --- 2. SUPPORT TICKET STATES ---
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    try {
      const stored = localStorage.getItem('medly_support_tickets');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      { id: 't-1', subject: 'CEM PDF syllabus is showing a local loading gap', description: 'After checking cell division cards, the alignment looks slightly shifted on mobile viewports.', status: 'Under Investigation', date: '2026-06-12' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('medly_support_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;

    const newTicket: SupportTicket = {
      id: `t-${Date.now()}`,
      subject: ticketSubject,
      description: ticketDesc,
      status: 'Open',
      date: new Date().toISOString().split('T')[0]
    };

    setTickets(prev => [newTicket, ...prev]);
    setTicketSubject('');
    setTicketDesc('');
  };

  // --- 3. ADMIN OPERATIONS ---
  const approveVoucher = (id: string) => {
    setVouchers(prev => prev.map(v => v.id === id ? { ...v, status: 'Approved' } : v));
  };

  const declineVoucher = (id: string) => {
    setVouchers(prev => prev.map(v => v.id === id ? { ...v, status: 'Declined' } : v));
  };

  const seedMockDb = () => {
    alert('Mock Clinical Practice and SRS Boards database successfully re-seeded with latest June 2026 Philippine NMAT specifications!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 font-sans">
      
      {/* Tab controls */}
      <div className="lg:col-span-1 space-y-3">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col space-y-1.5 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Services Dashboard</span>
          
          <button
            onClick={() => setActiveSubTab('gcash-help')}
            className={`flex items-center space-x-2.5 p-3 rounded-xl font-semibold text-xs text-left cursor-pointer transition-all ${
              activeSubTab === 'gcash-help'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CreditCard className="w-4.5 h-4.5" />
            <div className="leading-none">
              <span className="block">GCash Ledger & Help Desk</span>
              <span className={`text-[9px] block ${activeSubTab === 'gcash-help' ? 'text-sky-100' : 'text-slate-400'}`}>Tiers proof upload</span>
            </div>
          </button>

          <button
            onClick={() => setActiveSubTab('preferences')}
            className={`flex items-center space-x-2.5 p-3 rounded-xl font-semibold text-xs text-left cursor-pointer transition-all ${
              activeSubTab === 'preferences'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-4.5 h-4.5" />
            <div className="leading-none">
              <span className="block">Profile & Settings</span>
              <span className={`text-[9px] block ${activeSubTab === 'preferences' ? 'text-sky-100' : 'text-slate-400'}`}>Theme and backup swaps</span>
            </div>
          </button>

          {/* Master Access Tab - unlocked to specific administrative emails */}
          {isAdmin && (
            <button
              onClick={() => setActiveSubTab('admin-panel')}
              className={`flex items-center space-x-2.5 p-3 rounded-xl font-extrabold text-xs text-left cursor-pointer transition-all ${
                activeSubTab === 'admin-panel'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-red-650 bg-red-50/50 hover:bg-red-50 border border-red-105'
              }`}
            >
              <ShieldAlert className="w-4.5 h-4.5 text-rose-500" />
              <div className="leading-none">
                <span className="block">ADMIN MASTER PANEL</span>
                <span className={`text-[9px] block ${activeSubTab === 'admin-panel' ? 'text-rose-100' : 'text-rose-550'}`}>DB seed & Approvals</span>
              </div>
            </button>
          )}
        </div>

        {/* Dynamic Simulated Subscription Indicator */}
        <div className="p-4 bg-sky-50/50 border border-sky-150 rounded-2xl text-xs space-y-3">
          <span className="block text-[10px] uppercase font-black tracking-wide text-sky-700">Account Bounds:</span>
          <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-sky-100 font-bold">
            <span className="text-slate-700">Role Viewpoint:</span>
            <span className="text-xs uppercase font-extrabold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              {subscriptionSimMode}
            </span>
          </div>
          <p className="text-[10px] text-slate-405 leading-relaxed">
            Free accounts have caps on flashcard items. Upgrading to **Pro** or **Clinical Suite** unlocks all adaptive syllabus diagnostics.
          </p>
        </div>
      </div>

      {/* Main Container Viewport */}
      <div className="lg:col-span-3 bg-white border border-slate-105 rounded-2xl p-5 sm:p-6 shadow-sm">
        
        {/* GCASH LEDGER AND HELP DESK */}
        {activeSubTab === 'gcash-help' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Payment Receipt Portal */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">GCash Subscription Portal</h3>
                  <p className="text-xs text-slate-400">Unlock mock engines with digital vouchers.</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-3 font-medium text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Pro Prep Suite</span>
                    <span className="font-bold text-slate-800">₱499 One-time</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                    <span className="text-slate-600">Full Clinical Simulator Suite</span>
                    <span className="font-bold text-slate-800">₱799 One-time</span>
                  </div>
                  <div className="p-2.5 bg-sky-50/50 border border-sky-100 rounded-lg text-[10px] text-sky-750 leading-relaxed">
                    🌟 <strong>GCash Billing Instructions:</strong> Send payments to GCash phone 0917-XXX-XXXX, then submit your exact receipt Ref number below!
                  </div>
                </div>

                <form onSubmit={handleGcashSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Upgrade Package Tier</label>
                    <select
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl outline-none"
                    >
                      <option value="Pro Suite">Pro Suite - ₱499</option>
                      <option value="Clinical Suite">Full Clinical Suite - ₱799</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">GCash Receipt Reference number (13 Digits)</label>
                    <input
                      type="text"
                      placeholder="e.g. 5002192019482..."
                      value={gcashRef}
                      onChange={(e) => setGcashRef(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 font-bold text-white text-xs rounded-xl cursor-pointer"
                  >
                    Submit Proof Of Payment
                  </button>

                  {gcashSubmitSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] rounded-xl flex items-center gap-1.5 animate-pulse">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Receipt voucher submitted! Admin is reviewing reference reference margins.
                    </div>
                  )}
                </form>
              </div>

              {/* Help Desk Tickets Block */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">Help Desk Support Tickets</h3>
                  <p className="text-xs text-slate-400">File tickets if you hit a local system shift.</p>
                </div>

                <form onSubmit={handleTicketSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Subject Summary..."
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl outline-none"
                  />
                  <textarea
                    placeholder="Explain the technical gap or curriculum question..."
                    value={ticketDesc}
                    onChange={(e) => setTicketDesc(e.target.value)}
                    className="w-full h-24 p-2.5 text-xs bg-white border border-slate-203 rounded-xl outline-none resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    File Support Ticket
                  </button>
                </form>

                {/* Submited tickets queue list */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <span className="block text-[10px] font-black uppercase text-slate-400 mb-1">Your Filed Tickets Log</span>
                  {tickets.map(tick => (
                    <div key={tick.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-800 block truncate max-w-40">{tick.subject}</span>
                        <span className="text-[10px] text-slate-400">Status: <strong className="text-sky-600">{tick.status}</strong></span>
                      </div>
                      <span className="text-[9px] text-slate-400">{tick.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE AND SETTINGS */}
        {activeSubTab === 'preferences' && (
          <div className="space-y-6">
            {/* Custom Theme Selector with styled buttons */}
            <div className="space-y-3">
              <div>
                <h3 className="font-black text-slate-805 text-sm sm:text-base">Aesthetic Custom Themes</h3>
                <p className="text-xs text-slate-400">Personalize your student interface. Selected aesthetic persists across active sessions.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {themeOptions.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setCurrentTheme(theme.id)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-bold cursor-pointer transition-all flex flex-col justify-between ${
                      currentTheme === theme.id
                        ? 'border-sky-500 bg-sky-50 text-sky-950 font-black scale-[1.01]'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-705'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{theme.name}</span>
                      {currentTheme === theme.id && <Check className="w-3.5 h-3.5 text-sky-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile fields and credentials update form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-black text-slate-800 uppercase text-[10px] tracking-wide block mb-1">Update Student Credentials</span>
                  <p className="text-[11px] text-slate-405">Configure primary registration email credentials below.</p>
                </div>
                <div className="space-y-2.5">
                  <input
                    type="email"
                    disabled
                    value={currentUserEmail}
                    className="w-full p-2.5 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Enter new account password passcode..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                  />
                  <button
                    onClick={() => alert('Student passcode configurations updated successfully!')}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer"
                  >
                    Save Passcode
                  </button>
                </div>
              </div>

              {/* Mock DB backup */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-3 font-medium">
                <div className="flex items-center gap-1">
                  <Database className="w-4 h-4 text-sky-500 animate-spin" style={{ animationDuration: '40s' }} />
                  <span className="font-bold text-slate-800">Local Database Backups System</span>
                </div>
                <p className="text-[11px] text-slate-450 leading-relaxed">
                  Export your compiled syllabus checkboxes, calendar targets, and billing references into a single local JSON file. Restore at any commute junction.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert('Backup compiled! medly_local_db_backup.json downloaded.')}
                    className="px-3 py-1.5 bg-white border border-slate-250 text-[#059669] hover:bg-slate-100 font-bold rounded-lg flex items-center gap-1 cursor-pointer w-full text-center justify-center"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Backup DB</span>
                  </button>
                  <button
                    onClick={() => alert('Enter JSON files inside explorer settings parameters.')}
                    className="px-3 py-1.5 bg-white border border-slate-250 text-slate-655 hover:bg-slate-100 font-bold rounded-lg flex items-center gap-1 cursor-pointer w-full text-center justify-center"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                    <span>Restore DB</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADMINISTRATIVE MASTER ACCESS */}
        {isAdmin && activeSubTab === 'admin-panel' && (
          <div className="space-y-6 animate-scale-up">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2 text-rose-955 text-xs">
              <span className="font-extrabold uppercase text-red-700 block text-[10px] tracking-widest">
                🛡️ AUTHORIZED ADMINISTRATIVE ACCESS SECURE
              </span>
              <p className="text-[11px] leading-relaxed">
                Welcome, admin (<strong>{currentUserEmail}</strong>). You have explicit permissions to seed curriculum variables, approve subscription receipt ledgers, and audit caps via simulated viewport frames.
              </p>
            </div>

            {/* Simulated Suite Viewport */}
            <div className="p-4 bg-slate-50 border border-slate-210 rounded-xl space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1">
                  <Sliders className="w-4 h-4 text-red-500" />
                  Simulated Suite Viewport Configurator
                </span>
                <p className="text-xs text-slate-450 mt-0.5">Toggle this viewpoint selector to simulate the experience and limits constraint caps of different tiers.</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Free Student Tier', '3-Day Active Trial', 'Unlocked Pro Suite', 'Full Clinical Suite'].map(val => (
                  <button
                    key={val}
                    onClick={() => {
                      setSubscriptionSimMode(val);
                      alert(`Subscription viewpoint successfully shifted to: "${val}" to audit boundaries!`);
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-[11px] font-black cursor-pointer transition-all ${
                      subscriptionSimMode === val
                        ? 'bg-rose-600 border-rose-600 text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* GCash Approvals Queue */}
            <div className="space-y-4 pt-2">
              <span className="font-bold text-slate-800 text-sm block">GCash Subscription Approvals Ledger Queue</span>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-700 border-collapse">
                  <thead>
                    <tr className="border-b border-rose-200 bg-rose-50/20 text-[10px] font-black uppercase text-rose-800 tracking-wider">
                      <th className="p-3">Student Email</th>
                      <th className="p-3">Requested Tier</th>
                      <th className="p-3 text-center">Ref Number</th>
                      <th className="p-3 text-center">Amount</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vouchers.map(vouch => (
                      <tr key={vouch.id} className="border-b border-slate-100 font-medium">
                        <td className="p-3 font-bold text-slate-800">{vouch.studentEmail}</td>
                        <td className="p-3 font-semibold text-slate-500">{vouch.tier}</td>
                        <td className="p-3 text-center font-mono">{vouch.refNumber}</td>
                        <td className="p-3 text-center font-bold text-slate-800">₱{vouch.amount}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                            vouch.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            vouch.status === 'Declined' ? 'bg-red-50 text-red-650' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {vouch.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {vouch.status === 'Pending Approval' ? (
                            <div className="flex gap-1.5 justify-end">
                              <button
                                onClick={() => approveVoucher(vouch.id)}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] rounded cursor-pointer"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => declineVoucher(vouch.id)}
                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] rounded cursor-pointer"
                              >
                                Decline
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">No actions pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Seeding Tool */}
            <div className="p-4 bg-slate-50 border border-slate-205 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-800 block">Syllabus Database Seeding Tool</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Quickly import fresh high-yield boards content directly into active RAM arrays.</p>
              </div>
              <button
                onClick={seedMockDb}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Seed Board Exams Datablock
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
