import React, { useState, useEffect } from 'react';
import { Shield, Users, CreditCard, Bell, Inbox, AlertOctagon, Send, Check, Edit2, Save, MapPin, Calendar as CalendarIcon, Plus, Trash2, X, RefreshCw } from 'lucide-react';
import { Announcement } from './AnnouncementsPage';
import { MedSchool } from '../types';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';

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
  phone?: string;
  tier: string;
  refNumber: string;
  amount: number;
  status: 'Pending Approval' | 'Approved' | 'Declined';
  date: string;
}

interface FeedbackItem {
  id: string;
  rating: number;
  category: string;
  comment: string;
  date: string;
  user: string;
}

interface CurriculumAdminProps {
  userSuite: string;
  setUserSuite: (suite: string) => void;
  vouchers: GcashVoucher[];
  setVouchers: React.Dispatch<React.SetStateAction<GcashVoucher[]>>;
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
  tickets: SupportTicket[];
  setTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>;
  feedbacks: FeedbackItem[];
  currentUserEmail: string;
  medSchools: MedSchool[];
  setMedSchools: React.Dispatch<React.SetStateAction<MedSchool[]>>;
  usersList: any[];
  setUsersList: React.Dispatch<React.SetStateAction<any[]>>;
  onResetSelfMetrics?: () => void;
}

export default function CurriculumAdmin({
  userSuite,
  setUserSuite,
  vouchers,
  setVouchers,
  announcements,
  setAnnouncements,
  tickets,
  setTickets,
  feedbacks,
  currentUserEmail,
  medSchools,
  setMedSchools,
  usersList,
  setUsersList,
  onResetSelfMetrics,
}: CurriculumAdminProps) {
  const isAdmin = (currentUserEmail || '').trim().toLowerCase() === 'studyfilesbyz@gmail.com';

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white border border-slate-100 rounded-[24px] shadow-sm text-center space-y-6 animate-fade-in" id="admin-forbidden-lock">
        <div className="w-16 h-16 mx-auto bg-red-50 text-red-500 rounded-full flex items-center justify-center">
          <AlertOctagon className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-800">Restricted Administration Hub</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            The Curriculum Administration Hub and voucher ledger are strictly limited to verified systems coordinators (<span className="font-mono text-slate-700 font-bold">studyfilesbyz@gmail.com</span>).
          </p>
        </div>
        <div className="pt-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-400 space-y-1">
            <span className="block font-black text-slate-500 uppercase text-[9px]">Your Current Identifier:</span>
            <span className="font-mono block truncate text-slate-705 font-bold">{currentUserEmail}</span>
          </div>
        </div>
      </div>
    );
  }
  
  // Announcement form state
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState<'Exam Alert' | 'Filing Extension' | 'General'>('Exam Alert');

  // Medical College Admissions Configurator States
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('asmph');
  const targetSchool = medSchools.find(s => s.id === selectedSchoolId) || medSchools[0];

  const updateSchoolField = (field: keyof MedSchool, val: any) => {
    setMedSchools(prev => prev.map(s => s.id === selectedSchoolId ? { ...s, [field]: val } : s));
  };

  // Add school states
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [addSchoolName, setAddSchoolName] = useState('');
  const [addSchoolAbbr, setAddSchoolAbbr] = useState('');
  const [addSchoolLoc, setAddSchoolLoc] = useState('');
  const [addSchoolMinNmat, setAddSchoolMinNmat] = useState(85);
  const [addSchoolCompNmat, setAddSchoolCompNmat] = useState(95);
  const [addSchoolGwaW, setAddSchoolGwaW] = useState('50% State Weight');
  const [addSchoolNmatW, setAddSchoolNmatW] = useState('50% PR Weight');
  const [addSchoolDeadline, setAddSchoolDeadline] = useState('March 15, 2027');
  const [addSchoolLink, setAddSchoolLink] = useState('https://');
  const [addSchoolAppPeriod, setAddSchoolAppPeriod] = useState('Oct 2026 - Mar 2027');
  const [addSchoolDaysUntilStart, setAddSchoolDaysUntilStart] = useState(15);
  const [addSchoolDaysUntilEnd, setAddSchoolDaysUntilEnd] = useState(90);
  const [addSchoolRegFee, setAddSchoolRegFee] = useState('₱3,000');
  const [addSchoolContactEmail, setAddSchoolContactEmail] = useState('admissions@university.edu.ph');
  const [addSchoolContactAddress, setAddSchoolContactAddress] = useState('Manila, Philippines');
  const [addSchoolContactOffice, setAddSchoolContactOffice] = useState('Office of Admissions');
  const [addSchoolContactNumber, setAddSchoolContactNumber] = useState('');
  const [addSchoolDaysBeforeRelease, setAddSchoolDaysBeforeRelease] = useState('');
  const [addSchoolRequirementsText, setAddSchoolRequirementsText] = useState('Transcript of Records, NMAT Certificate, Recommendation Letters, Certificate of Graduation, Good Moral Character, Birth Certificate');

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addSchoolName.trim() || !addSchoolAbbr.trim()) {
      alert('Please fill out School Name and Abbreviation.');
      return;
    }
    const cleanAbbr = addSchoolAbbr.trim().toUpperCase();
    const newId = cleanAbbr.toLowerCase().replace(/\s+/g, '-');
    
    // Check if school already exists
    if (medSchools.some(s => s.id === newId || s.abbreviation === cleanAbbr)) {
      alert(`A school guideline with abbreviation "${cleanAbbr}" already exists.`);
      return;
    }

    const newSchool: MedSchool = {
      id: newId || `school-${Date.now()}`,
      name: addSchoolName.trim(),
      abbreviation: cleanAbbr,
      location: addSchoolLoc.trim() || 'Manila, Philippines',
      requiredNmatMin: addSchoolMinNmat,
      competitiveNmat: addSchoolCompNmat,
      weightGwa: addSchoolGwaW.trim() || 'Balanced weight',
      weightNmat: addSchoolNmatW.trim() || 'Strong PR focus',
      deadline: addSchoolDeadline.trim() || 'TBD',
      requirements: addSchoolRequirementsText.split(',').map(item => item.trim()).filter(Boolean),
      link: addSchoolLink.trim() || 'https://',
      applicationPeriod: addSchoolAppPeriod.trim(),
      daysUntilStart: addSchoolDaysUntilStart,
      daysUntilEnd: addSchoolDaysUntilEnd,
      registrationFee: addSchoolRegFee.trim(),
      contactEmail: addSchoolContactEmail.trim(),
      contactAddress: addSchoolContactAddress.trim(),
      contactOffice: addSchoolContactOffice.trim(),
      contactNumber: addSchoolContactNumber.trim() || undefined,
      daysBeforeRelease: addSchoolDaysBeforeRelease.trim() ? parseInt(addSchoolDaysBeforeRelease) : undefined
    };

    setMedSchools(prev => [...prev, newSchool]);
    setSelectedSchoolId(newSchool.id);
    alert(`Successfully added "${newSchool.name}" to the central guidelines directory!`);

    // Reset fields
    setAddSchoolName('');
    setAddSchoolAbbr('');
    setAddSchoolLoc('');
    setAddSchoolMinNmat(85);
    setAddSchoolCompNmat(95);
    setAddSchoolGwaW('50% State Weight');
    setAddSchoolNmatW('50% PR Weight');
    setAddSchoolDeadline('March 15, 2027');
    setAddSchoolLink('https://');
    setAddSchoolAppPeriod('Oct 2026 - Mar 2027');
    setAddSchoolDaysUntilStart(15);
    setAddSchoolDaysUntilEnd(90);
    setAddSchoolRegFee('₱3,000');
    setAddSchoolContactEmail('admissions@university.edu.ph');
    setAddSchoolContactAddress('Manila, Philippines');
    setAddSchoolContactOffice('Office of Admissions');
    setAddSchoolContactNumber('');
    setAddSchoolDaysBeforeRelease('');
    setAddSchoolRequirementsText('Transcript of Records, NMAT Certificate, Recommendation Letters, Certificate of Graduation, Good Moral Character, Birth Certificate');
    setShowAddSchool(false);
  };

  const handleDeleteSchool = (schoolId: string) => {
    if (medSchools.length <= 1) {
      alert('You must retain at least one medical school guideline as template framework.');
      return;
    }
    const school = medSchools.find(s => s.id === schoolId);
    if (!school) return;

    if (window.confirm(`Are you sure you want to permanently delete the admissions matching guideline list for "${school.name}"? This will reactively remove it.`)) {
      setMedSchools(prev => {
        const filtered = prev.filter(s => s.id !== schoolId);
        if (selectedSchoolId === schoolId && filtered.length > 0) {
          setSelectedSchoolId(filtered[0].id);
        }
        return filtered;
      });
      alert(`Admissions guideline for ${school.abbreviation} deleted successfully!`);
    }
  };

  // Reply states
  const [ticketReplies, setTicketReplies] = useState<Record<string, string>>({});

  // Live account user registry states from Firestore live_users collection
  const [liveUsersFromDb, setLiveUsersFromDb] = useState<any[]>([]);
  const [loadingLiveUsers, setLoadingLiveUsers] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  const fetchLiveUsers = async () => {
    setLoadingLiveUsers(true);
    try {
      const qSnap = await getDocs(collection(db, "live_users"));
      const list: any[] = [];
      qSnap.forEach(d => {
        list.push({ docId: d.id, ...d.data() });
      });
      setLiveUsersFromDb(list);
    } catch (err) {
      console.warn("Error fetching live users from Firestore:", err);
    } finally {
      setLoadingLiveUsers(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchLiveUsers();
    }
  }, [isAdmin]);

  const handleRegisterUser = async () => {
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert('Please fill out student Name and valid Email address.');
      return;
    }
    const emailClean = newUserEmail.trim().toLowerCase();
    const alreadyExists = liveUsersFromDb.some(u => (u.email || '').trim().toLowerCase() === emailClean);
    if (alreadyExists) {
      alert('A student profile with this email address already exists in the live registry.');
      return;
    }

    const docId = "usr_self_" + emailClean.replace(/[^a-zA-Z0-9]/g, "_");
    const newRecord = {
      id: docId,
      name: newUserName.trim(),
      email: emailClean,
      suite: 'Free Student Tier',
      premed: 'Seeded via Admin Registry',
      score: 85.0,
      solvedDrills: 0,
      lastUpdated: Date.now()
    };

    try {
      await setDoc(doc(db, "live_users", docId), newRecord);
      setLiveUsersFromDb(prev => [newRecord, ...prev]);
      setUsersList(prev => [{ id: docId, name: newRecord.name, email: newRecord.email, suite: newRecord.suite }, ...prev]);
      alert(`Successfully registered "${newRecord.name}" into Firestore's live_users!`);
      setNewUserName('');
      setNewUserEmail('');
    } catch (err) {
      console.warn("Error registering live user to Firestore:", err);
      alert(`Database save failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleDeleteLiveUser = async (userRecord: any) => {
    const idToDelete = userRecord.id || userRecord.docId;
    if (!idToDelete) return;
    if (!confirm(`Are you sure you want to delete ${userRecord.name} (${userRecord.email}) from the live_users database?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, "live_users", idToDelete));
      setLiveUsersFromDb(prev => prev.filter(u => u.id !== idToDelete && u.docId !== idToDelete));
      setUsersList(prev => prev.filter(u => (u.email || '').trim().toLowerCase() !== (userRecord.email || '').trim().toLowerCase()));
      alert("Successfully deleted user from Firestore!");
    } catch (err) {
      console.warn("Error deleting user from Firestore:", err);
      alert(`Database deletion failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleUpdateSuiteValue = async (userRecord: any, newSuite: string) => {
    const activeId = userRecord.id || userRecord.docId;
    if (!activeId) return;
    try {
      const userRef = doc(db, "live_users", activeId);
      await updateDoc(userRef, { suite: newSuite });
      
      setLiveUsersFromDb(prev => prev.map(u => (u.id === activeId || u.docId === activeId) ? { ...u, suite: newSuite } : u));
      setUsersList(prev => prev.map(u => (u.email || '').trim().toLowerCase() === (userRecord.email || '').trim().toLowerCase() ? { ...u, suite: newSuite } : u));
      
      const isSelf = (userRecord.email || '').trim().toLowerCase() === (currentUserEmail || '').trim().toLowerCase();
      if (isSelf) {
        setUserSuite(newSuite);
      }
      alert(`Suite elevated! ${userRecord.name} is set to "${newSuite}"`);
    } catch (err) {
      console.warn("Error updating suite value in Firestore:", err);
      alert(`Failed to upgrade suite in database: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleResetUserMetrics = async (userRecord: any) => {
    const activeId = userRecord.id || userRecord.docId;
    if (!activeId) return;
    if (!confirm(`Are you sure you want to reset all progress metrics (Rating to 85.0 and Solved Drills to 0) for ${userRecord.name}?`)) {
      return;
    }
    try {
      const userRef = doc(db, "live_users", activeId);
      await updateDoc(userRef, {
        score: 85.0,
        solvedDrills: 0,
        lastUpdated: Date.now()
      });
      
      setLiveUsersFromDb(prev => prev.map(u => (u.id === activeId || u.docId === activeId) ? { ...u, score: 85.0, solvedDrills: 0 } : u));
      
      const isSelf = (userRecord.email || '').trim().toLowerCase() === (currentUserEmail || '').trim().toLowerCase();
      if (isSelf && onResetSelfMetrics) {
        onResetSelfMetrics();
      }
      alert(`Successfully reset learning metrics for ${userRecord.name}!`);
    } catch (err) {
      console.warn("Error resetting user metrics in Firestore:", err);
      alert(`Metrics reset failed in DB: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const approveVoucher = (id: string, requestedTier: string) => {
    // Approve status
    setVouchers(prev => prev.map(v => v.id === id ? { ...v, status: 'Approved' } : v));
    
    // Automatically elevate the user's active suite packages reactively!
    setUserSuite(requestedTier);
    alert(`GCash ledger reference approved! Active suite bumped to: "${requestedTier}"`);
  };

  const declineVoucher = (id: string) => {
    setVouchers(prev => prev.map(v => v.id === id ? { ...v, status: 'Declined' } : v));
    alert('GCash ledger reference declined.');
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: annTitle.trim(),
      content: annContent.trim(),
      date: new Date().toISOString().split('T')[0],
      category: annCategory
    };

    setAnnouncements([newAnn, ...announcements]);
    setAnnTitle('');
    setAnnContent('');
    alert('Pinned new bulletin announcement! Live on student board feeds.');
  };

  const handleTicketReply = (id: string) => {
    const replyText = ticketReplies[id];
    if (!replyText || !replyText.trim()) return;

    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
    alert(`Reply sent to Help Desk! Issue status resolved: "${replyText.trim()}"`);
    setTicketReplies(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="space-y-8 animate-fade-in" id="curriculum-admin-wrapper">
      
      {/* Admin Title Card */}
      <div className="bg-gradient-to-r from-red-650 from-rose-800 to-rose-950 p-6 rounded-[24px] text-white shadow-sm border border-rose-300/10 space-y-2">
        <span className="text-[10px] uppercase font-black tracking-widest text-rose-300 bg-red-950/40 px-2 py-0.5 rounded border border-rose-500/20">
          🛡️ Master Security Role Unlocked
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-1.5">
          Curriculum Administration Hub
        </h2>
        <p className="text-xs text-rose-200">
          Manage live user subscriptions, approve GCash ledger references, post dynamic announcements, and reply to support tickets.
        </p>
      </div>

      {/* Grid of administrative modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Change Suite Selector & Announcements Publisher (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
            {/* Student Account Registry & Suite Configurator */}
          <div className="bg-white border border-slate-100 rounded-[24px] p-5 space-y-4 shadow-xs" id="students-registry-suite-editor">
            <div className="flex justify-between items-center border-b pb-2">
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-sm text-slate-850 flex items-center gap-1.5">
                  <Users className="w-4.5 h-4.5 text-rose-600 animate-pulse" /> Students Registry & Suite Editor
                </h3>
                <span className="block text-[9px] text-slate-400 font-bold">Only listing live users from database</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  title="Reload live users"
                  onClick={fetchLiveUsers}
                  className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingLiveUsers ? 'animate-spin' : ''}`} />
                </button>
                <span className="text-[9px] bg-rose-50 text-rose-700 border border-rose-100 font-extrabold px-2 py-0.5 rounded-full">
                  {liveUsersFromDb.length} Live Accounts
                </span>
              </div>
            </div>

            {/* Quick search input */}
            <div className="space-y-1">
              <label className="block text-[9px] font-black uppercase text-slate-400">Search Students</label>
              <input
                type="text"
                placeholder="By name, email, or suite..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-150 rounded-xl outline-none text-xs font-semibold"
              />
            </div>

            {/* Live List layout */}
            <input type="hidden" name="dummy-ref" value={usersList.length} />
            <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1 scrollbar-thin">
              {loadingLiveUsers && liveUsersFromDb.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  <RefreshCw className="w-5 h-5 mx-auto text-indigo-505 animate-spin mb-2" />
                  <span>Retrieving live users database pipeline...</span>
                </div>
              ) : liveUsersFromDb.filter(user => {
                const searchStr = userSearch.toLowerCase();
                const userName = (user.name || '').toLowerCase();
                const userEmail = (user.email || '').toLowerCase();
                const userSuiteName = (user.suite || '').toLowerCase();
                return userName.includes(searchStr) || 
                       userEmail.includes(searchStr) || 
                       userSuiteName.includes(searchStr);
              }).length === 0 ? (
                <div className="text-center py-6 text-slate-405 italic text-xs">
                  No matches matched user query or database is empty.
                </div>
              ) : liveUsersFromDb.filter(user => {
                const searchStr = userSearch.toLowerCase();
                const userName = (user.name || '').toLowerCase();
                const userEmail = (user.email || '').toLowerCase();
                const userSuiteName = (user.suite || '').toLowerCase();
                return userName.includes(searchStr) || 
                       userEmail.includes(searchStr) || 
                       userSuiteName.includes(searchStr);
              }).map(user => {
                const isSelf = (user.email || '').trim().toLowerCase() === (currentUserEmail || '').trim().toLowerCase();
                return (
                  <div key={user.docId || user.id} className={`p-3 rounded-xl border text-xs space-y-2 transition-all ${
                    isSelf ? 'bg-rose-50 border-rose-250' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="font-black text-slate-800">{user.name}</span>
                          {isSelf && (
                            <span className="text-[8.5px] uppercase font-black bg-rose-600 text-white px-1.5 py-0.2 rounded">
                              YOU
                            </span>
                          )}
                          {user.premed && (
                            <span className="text-[9px] text-slate-400 block font-normal">
                              • {user.premed}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-450 font-mono block mt-0.5">{user.email}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleResetUserMetrics(user)}
                          className="text-slate-400 hover:text-indigo-600 cursor-pointer p-1 transition-colors"
                          title="Reset User Metrics (Set rating back to 85.0 and drills to 0)"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteLiveUser(user)}
                          className="text-slate-400 hover:text-red-550 shrink-0 cursor-pointer p-1"
                          title="Delete user"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2.5 bg-white/70 p-2 rounded-lg border border-slate-100">
                      <div className="font-mono text-[9px] text-indigo-900 font-bold whitespace-nowrap">
                        Rating: <strong className="text-slate-800 font-black">{user.score || 85.0}</strong>
                      </div>
                      <div className="font-mono text-[9px] text-emerald-905 font-bold whitespace-nowrap">
                        Drills: <strong className="text-slate-800 font-black">{user.solvedDrills || 0}</strong>
                      </div>
                    </div>

                    {/* Suite select editor dropdown */}
                    <div className="flex items-center justify-between gap-1.5 pt-1.5 border-t border-slate-200/40 font-semibold text-[11px]">
                      <span className="text-[9.5px] text-slate-450 font-black uppercase">Suite Tier:</span>
                      <select
                        value={user.suite || "Free Student Tier"}
                        onChange={(e) => handleUpdateSuiteValue(user, e.target.value)}
                        className="p-1 px-2 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none cursor-pointer text-slate-705"
                      >
                        <option value="Free Student Tier">Free Student Tier</option>
                        <option value="Pro Suite (₱79)">Pro Suite (₱79)</option>
                        <option value="Clinical Suite (₱149)">Clinical Suite (₱149)</option>
                        <option value="Lifetime Pass (₱249)">Lifetime Pass (₱249)</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick simulated account register form */}
            <div className="pt-3.5 border-t border-slate-100 space-y-2">
              <span className="block text-[9.5px] font-black uppercase text-slate-400">Register Simulated Account</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold leading-normal">
                <input
                  type="text"
                  placeholder="Student Name..."
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-150 rounded-lg outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address..."
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-155 rounded-lg outline-none"
                />
              </div>
              <button
                onClick={handleRegisterUser}
                type="button"
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-lg cursor-pointer text-xs transition-colors"
              >
                Create Simulated Account Entry
              </button>
            </div>
          </div>

          {/* Announcements Publisher */}
          <div className="bg-white border border-slate-100 rounded-[24px] p-5 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-805 flex items-center gap-1.5 border-b pb-2">
              <Bell className="w-4.5 h-4.5 text-rose-600" /> Post New Announcement
            </h3>

            <form onSubmit={handlePostAnnouncement} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Announcement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. November Registration Moving Extended..."
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Category Type</label>
                <select
                  value={annCategory}
                  onChange={(e) => setAnnCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                >
                  <option value="Exam Alert">Exam Alert Bulletin</option>
                  <option value="Filing Extension">Filing Extension Update</option>
                  <option value="General">General News</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Detailed Content</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Draft official coordinates alert text..."
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none focus:bg-white focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-rose-650 hover:bg-rose-750 bg-rose-700 text-white font-extrabold rounded-lg cursor-pointer"
              >
                Publish Bulletin
              </button>
            </form>
          </div>

          {/* Admissions Milestones Editor for Medical Colleges */}
          <div className="bg-white border border-slate-105 rounded-[24px] p-5 space-y-4" id="admissions-matrix-config-card">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-extrabold text-sm text-slate-805 flex items-center gap-1.5">
                <Shield className="w-4.5 h-4.5 text-rose-600" /> Admissions Matrix Configurator
              </h3>
              <button
                type="button"
                onClick={() => setShowAddSchool(!showAddSchool)}
                className="text-[10px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg px-2.5 py-1 flex items-center gap-1 cursor-pointer"
              >
                {showAddSchool ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                <span>{showAddSchool ? "Cancel Add" : "Add School"}</span>
              </button>
            </div>
            
            <p className="text-[10px] text-slate-450 leading-relaxed font-semibold">
              Add, modify, or delete milestones, competitive centiles, and minimum NMAT scores for each matching guideline. Changes propagate instantly.
            </p>

            {showAddSchool ? (
              /* Add School Guideline Form */
              <form onSubmit={handleAddSchool} className="space-y-3 font-semibold text-xs bg-slate-50 p-4 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-black uppercase text-slate-400 block border-b pb-0.5">Initialize New School Guideline</span>
                
                <div>
                  <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Institution Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. University of the East Ramon Magsaysay"
                    value={addSchoolName}
                    onChange={(e) => setAddSchoolName(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-705"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Abbreviation</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UERM"
                      value={addSchoolAbbr}
                      onChange={(e) => setAddSchoolAbbr(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-705"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Quezon City"
                      value={addSchoolLoc}
                      onChange={(e) => setAddSchoolLoc(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-705"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">NMAT Cut-off Score</label>
                    <input
                      type="number"
                      min="10"
                      max="99"
                      required
                      value={addSchoolMinNmat}
                      onChange={(e) => setAddSchoolMinNmat(parseInt(e.target.value) || 40)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-705"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Competitive PR Goal</label>
                    <input
                      type="number"
                      min="10"
                      max="99"
                      required
                      value={addSchoolCompNmat}
                      onChange={(e) => setAddSchoolCompNmat(parseInt(e.target.value) || 40)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-705"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">GWA Weighting</label>
                    <input
                      type="text"
                      placeholder="e.g. 50% GWA"
                      value={addSchoolGwaW}
                      onChange={(e) => setAddSchoolGwaW(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Application Period</label>
                    <input
                      type="text"
                      placeholder="e.g. October 2026 - March 2027"
                      value={addSchoolAppPeriod}
                      onChange={(e) => setAddSchoolAppPeriod(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Days Until Start</label>
                    <input
                      type="number"
                      value={addSchoolDaysUntilStart}
                      onChange={(e) => setAddSchoolDaysUntilStart(parseInt(e.target.value) || 0)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-semibold text-slate-705"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Days Until End</label>
                    <input
                      type="number"
                      value={addSchoolDaysUntilEnd}
                      onChange={(e) => setAddSchoolDaysUntilEnd(parseInt(e.target.value) || 0)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-semibold text-slate-705"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1 font-sans">Reg. Fee</label>
                    <input
                      type="text"
                      placeholder="e.g. ₱3,500"
                      value={addSchoolRegFee}
                      onChange={(e) => setAddSchoolRegFee(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-semibold text-slate-705"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Contact Email</label>
                    <input
                      type="email"
                      placeholder="e.g. admissions@upm.edu.ph"
                      value={addSchoolContactEmail}
                      onChange={(e) => setAddSchoolContactEmail(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none text-slate-705"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Contact Office</label>
                    <input
                      type="text"
                      placeholder="e.g. Admissions Office"
                      value={addSchoolContactOffice}
                      onChange={(e) => setAddSchoolContactOffice(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none text-slate-705"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Contact Address</label>
                    <input
                      type="text"
                      placeholder="e.g. Ermita, Manila"
                      value={addSchoolContactAddress}
                      onChange={(e) => setAddSchoolContactAddress(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none text-slate-705"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Contact Number (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. +63 2 8123 4567"
                      value={addSchoolContactNumber}
                      onChange={(e) => setAddSchoolContactNumber(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none text-slate-705"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Days to Results Release (Opt)</label>
                    <input
                      type="number"
                      placeholder="e.g. 45"
                      value={addSchoolDaysBeforeRelease}
                      onChange={(e) => setAddSchoolDaysBeforeRelease(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none text-slate-705"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Deadline Date</label>
                    <input
                      type="text"
                      placeholder="e.g. April 15, 2027"
                      value={addSchoolDeadline}
                      onChange={(e) => setAddSchoolDeadline(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Admissions Requirements (Comma separated)</label>
                  <textarea
                    rows={2}
                    placeholder="Transcript of Records, Recommendation Letters, Birth Certificate"
                    value={addSchoolRequirementsText}
                    onChange={(e) => setAddSchoolRequirementsText(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-medium text-slate-705"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Admissions Portal URL</label>
                  <input
                    type="text"
                    value={addSchoolLink}
                    onChange={(e) => setAddSchoolLink(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-semibold text-slate-705"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-rose-700 hover:bg-rose-800 text-white font-extrabold rounded-lg cursor-pointer"
                >
                  Create reference guideline
                </button>
              </form>
            ) : (
              /* Edit/Delete School Guideline */
              <div className="space-y-3 font-semibold text-xs">
                <div>
                  <label className="block text-[9.5px] font-black uppercase text-slate-400 mb-1">Select Philippine Med School Guideline</label>
                  <div className="flex gap-2">
                    <select
                      value={selectedSchoolId}
                      onChange={(e) => setSelectedSchoolId(e.target.value)}
                      className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    >
                      {medSchools.map(s => (
                        <option key={s.id} value={s.id}>{s.abbreviation} - {s.name}</option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDeleteSchool(selectedSchoolId)}
                      title="Delete selected school guideline"
                      className="p-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl cursor-pointer flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

              {targetSchool && (
                <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-150">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Institution Name</label>
                    <input
                      type="text"
                      value={targetSchool.name}
                      onChange={(e) => updateSchoolField('name', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-705"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Abbreviation</label>
                      <input
                        type="text"
                        value={targetSchool.abbreviation}
                        onChange={(e) => updateSchoolField('abbreviation', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-705"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Location</label>
                      <input
                        type="text"
                        value={targetSchool.location}
                        onChange={(e) => updateSchoolField('location', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-705"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">NMAT Cut-off Score</label>
                      <input
                        type="number"
                        min="10"
                        max="99"
                        value={targetSchool.requiredNmatMin}
                        onChange={(e) => updateSchoolField('requiredNmatMin', parseInt(e.target.value) || 40)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-black text-slate-705"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Competitive PR</label>
                      <input
                        type="number"
                        min="10"
                        max="99"
                        value={targetSchool.competitiveNmat}
                        onChange={(e) => updateSchoolField('competitiveNmat', parseInt(e.target.value) || 80)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-black text-slate-705"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Undergrad GWA Weight</label>
                      <input
                        type="text"
                        value={targetSchool.weightGwa}
                        onChange={(e) => updateSchoolField('weightGwa', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-semibold text-slate-705"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Application Period</label>
                      <input
                        type="text"
                        value={targetSchool.applicationPeriod || ''}
                        onChange={(e) => updateSchoolField('applicationPeriod', e.target.value)}
                        placeholder="e.g. Oct 2026 - Mar 2027"
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-705"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Days Until Start</label>
                      <input
                        type="number"
                        value={targetSchool.daysUntilStart ?? 0}
                        onChange={(e) => updateSchoolField('daysUntilStart', parseInt(e.target.value) || 0)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-semibold text-slate-705"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Days Until End</label>
                      <input
                        type="number"
                        value={targetSchool.daysUntilEnd ?? 0}
                        onChange={(e) => updateSchoolField('daysUntilEnd', parseInt(e.target.value) || 0)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-semibold text-slate-705"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Reg Fee</label>
                      <input
                        type="text"
                        value={targetSchool.registrationFee || ''}
                        onChange={(e) => updateSchoolField('registrationFee', e.target.value)}
                        placeholder="e.g. ₱3,000"
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-semibold text-slate-705"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Contact Email</label>
                      <input
                        type="email"
                        value={targetSchool.contactEmail || ''}
                        onChange={(e) => updateSchoolField('contactEmail', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none text-slate-705"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Contact Office</label>
                      <input
                        type="text"
                        value={targetSchool.contactOffice || ''}
                        onChange={(e) => updateSchoolField('contactOffice', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none text-slate-705"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Contact Address</label>
                      <input
                        type="text"
                        value={targetSchool.contactAddress || ''}
                        onChange={(e) => updateSchoolField('contactAddress', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none text-slate-705"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Contact Number (Opt)</label>
                      <input
                        type="text"
                        value={targetSchool.contactNumber || ''}
                        onChange={(e) => updateSchoolField('contactNumber', e.target.value)}
                        placeholder="e.g. +63 2 8123 4567"
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none text-slate-705"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Days to results release (Opt)</label>
                      <input
                        type="number"
                        value={targetSchool.daysBeforeRelease ?? ''}
                        onChange={(e) => updateSchoolField('daysBeforeRelease', e.target.value ? parseInt(e.target.value) : undefined)}
                        placeholder="e.g. 45"
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none text-slate-705"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Deadline Date</label>
                      <input
                        type="text"
                        value={targetSchool.deadline}
                        onChange={(e) => updateSchoolField('deadline', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-705"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Admissions Requirements (comma separated)</label>
                    <textarea
                      rows={2}
                      value={(targetSchool.requirements || []).join(', ')}
                      onChange={(e) => updateSchoolField('requirements', e.target.value.split(',').map(r => r.trim()).filter(Boolean))}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-medium text-slate-750"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Application Portal Link</label>
                    <input
                      type="text"
                      value={targetSchool.link}
                      onChange={(e) => updateSchoolField('link', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none font-sans text-[11px] text-[#1b4cb4] underline"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <span className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-150 rounded px-2 py-0.5 flex items-center gap-1 font-bold">
                      <Save className="w-3 h-3" />
                      <span>Changes Auto-Propagated</span>
                    </span>
                  </div>
                </div>
              )}
              </div>
            )}
          </div>
        </div>

        {/* Live GCash approvals & Support tick replies inbox (Col span 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Live GCash Subscription Approvals */}
          <div className="bg-white border border-slate-100 rounded-[24px] p-5 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-805 flex items-center gap-1.5 border-b pb-2">
              <CreditCard className="w-4.5 h-4.5 text-rose-600" /> Live GCash Approvals Queue
            </h3>
            
            {vouchers.length === 0 ? (
              <p className="text-xs text-slate-400 font-semibold italic">No filed references pending in vouchers database.</p>
            ) : (
              <div className="space-y-3">
                {vouchers.map(v => (
                  <div key={v.id} className="p-3.5 bg-slate-50 border border-slate-105 rounded-xl text-xs space-y-3 font-semibold">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-sky-700 bg-sky-50 border border-sky-100 px-1.5 py-0.5 rounded">
                          {v.tier}
                        </span>
                        <p className="font-black text-slate-800 mt-1">{v.studentEmail}</p>
                        <p className="text-[10px] text-slate-450 mt-0.5">Mobile: {v.phone || 'N/A'}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-mono">{v.date}</span>
                        <strong className="text-xs text-slate-850">Ref: {v.refNumber}</strong>
                        <span className="block font-bold text-[#059669]">₱{v.amount}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200/50 pt-2.5">
                      <span className={`text-[9.5px] font-black px-2 py-0.5 rounded ${
                        v.status === 'Approved' ? 'bg-emerald-50 text-emerald-800' :
                        v.status === 'Declined' ? 'bg-red-50 text-red-850' : 'bg-amber-50 text-amber-800'
                      }`}>
                        Status: {v.status}
                      </span>
                      
                      {v.status === 'Pending Approval' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveVoucher(v.id, v.tier)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] rounded cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => declineVoucher(v.id)}
                            className="px-2.5 py-1 bg-red-650 hover:bg-red-750 text-white font-extrabold text-[10px] rounded cursor-pointer"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inbox Answers Support Tickets */}
          <div className="bg-white border border-slate-100 rounded-[24px] p-5 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-805 flex items-center gap-1.5 border-b pb-2">
              <Inbox className="w-4.5 h-4.5 text-rose-600" /> Support Desk Inbox
            </h3>

            {tickets.length === 0 ? (
              <p className="text-xs text-slate-400 font-bold italic">Support tickets queue is cleared!</p>
            ) : (
              <div className="space-y-3">
                {tickets.map(tick => (
                  <div key={tick.id} className="p-3 bg-slate-50 border border-slate-105 rounded-xl text-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-slate-805 block">{tick.subject}</strong>
                        <p className="text-[10px] text-slate-450 italic mt-0.5">"{tick.description}"</p>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded ${
                        tick.status === 'Resolved' ? 'bg-emerald-50 text-emerald-800 font-black' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {tick.status}
                      </span>
                    </div>

                    {tick.status !== 'Resolved' && (
                      <div className="flex gap-2 pt-2 border-t border-slate-200/50">
                        <input
                          type="text"
                          placeholder="Draft technical reply coordinates..."
                          value={ticketReplies[tick.id] || ''}
                          onChange={(e) => setTicketReplies({ ...ticketReplies, [tick.id]: e.target.value })}
                          className="bg-white border border-slate-205 rounded-lg p-1.5 text-xs flex-grow outline-none"
                        />
                        <button
                          onClick={() => handleTicketReply(tick.id)}
                          className="px-3 bg-slate-900 text-white rounded-lg font-black text-[10px] cursor-pointer flex items-center justify-center"
                        >
                          Send Resolver
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Feedback logs reading inbox */}
          <div className="bg-white border border-slate-100 rounded-[24px] p-5 space-y-3">
            <h4 className="font-extrabold text-slate-805 text-sm">Read Feedbacks Feed</h4>
            
            {feedbacks.length === 0 ? (
              <p className="text-xs text-slate-400 font-bold italic">No feedback entries processed yet.</p>
            ) : (
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {feedbacks.map(f => (
                  <div key={f.id} className="p-2.5 bg-slate-50 border border-slate-105 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-800">{f.user || 'Unknown Student'}</span>
                      <span className="text-amber-500 font-mono">{'★'.repeat(f.rating)}</span>
                    </div>
                    <span className="text-[9px] text-sky-700 block bg-sky-50 px-1.5 py-0.5 rounded-md w-max">{f.category}</span>
                    <p className="text-[10.5px] mt-1 text-slate-655 font-medium leading-normal italic">"{f.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
