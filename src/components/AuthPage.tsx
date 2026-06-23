import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Stethoscope, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface AuthPageProps {
  onSuccess: (email: string, displayName: string) => void;
  defaultEmail?: string;
}

export default function AuthPage({ onSuccess, defaultEmail }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(defaultEmail || '');
  const [password, setPassword] = useState('');
  
  // Forgot Password state
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  
  // Toast notifications & UI help state
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSandboxHelp, setShowSandboxHelp] = useState(false);

  const displayMessage = (type: 'error' | 'success', text: string) => {
    setErrorStatus(null);
    setSuccessStatus(null);
    if (type === 'error') {
      setErrorStatus(text);
    } else {
      setSuccessStatus(text);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorStatus(null);
    setSuccessStatus(null);
    setIsLoading(true);

    const emailTrim = email.trim();

    try {
      if (isForgotPassword) {
        if (!emailTrim) {
          displayMessage('error', 'Please enter your account email first.');
          setIsLoading(false);
          return;
        }
        await sendPasswordResetEmail(auth, emailTrim);
        displayMessage('success', `A password reset link has been dispatched to ${emailTrim}. Please check your inbox or spam filters.`);
        setIsLoading(false);
        return;
      }

      if (isLogin) {
        if (!emailTrim || !password) {
          displayMessage('error', 'Please complete all login credential fields.');
          setIsLoading(false);
          return;
        }
        const userCredential = await signInWithEmailAndPassword(auth, emailTrim, password);
        const fbUser = userCredential.user;
        const nameToUse = fbUser.displayName || fbUser.email?.split('@')[0] || 'Doctor';
        onSuccess(fbUser.email || emailTrim, nameToUse);
        displayMessage('success', 'Logged in successfully!');
      } else {
        if (!fullName.trim() || !emailTrim || !password) {
          displayMessage('error', 'Please supply your name, email, and password choice.');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          displayMessage('error', 'Security standard policy: password must be at least 6 characters.');
          setIsLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, emailTrim, password);
        const fbUser = userCredential.user;
        
        onSuccess(fbUser.email || emailTrim, fullName.trim());
        displayMessage('success', 'Medical candidate account provisioned successfully!');
      }
    } catch (err: any) {
      console.warn("Firebase Auth challenge failed:", err);
      let errMsg = err.message || "Authentication rejected.";
      if (err.code === 'auth/user-not-found') {
        errMsg = "We couldn't locate an active account registered with this email.";
      } else if (err.code === 'auth/wrong-password') {
        errMsg = "Invalid password. Double check capitalizations and retry.";
      } else if (err.code === 'auth/invalid-email') {
        errMsg = "The provided email format is incorrect.";
      } else if (err.code === 'auth/email-already-in-use') {
        errMsg = "An account is already online or assigned to this email address. Switch to Login.";
      } else if (err.code === 'auth/operation-not-allowed') {
        errMsg = "Firebase Custom Auth: Email/Password sign-in provider must be enabled in your Firebase Console authentication settings.";
        setShowSandboxHelp(true);
      }
      displayMessage('error', errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Provide high-fidelity local bypass capability if Firebase Auth needs setup or user wants an instant sandbox test!
  const handleSandboxBypass = () => {
    const isMainAdmin = email.trim().toLowerCase() === 'studyfilesbyz@gmail.com';
    const emailToUse = email.trim() || 'studyfilesbyz@gmail.com';
    const nameToUse = fullName.trim() || (isMainAdmin ? 'Medly Admin' : 'Candidate Doctor');
    onSuccess(emailToUse, nameToUse);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-8" id="auth-flow-container">
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-[40px] p-6 sm:p-10 shadow-xl space-y-8 animate-fade-in relative overflow-hidden">
        {/* Background ambient pulse decoration */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Brand header */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center justify-center bg-[#1b4cb4] text-white w-14 h-14 rounded-2xl shadow-md transform hover:scale-105 transition-all">
            {/* Custom vector doc cross indicator */}
            <svg viewBox="0 0 512 512" fill="none" className="w-8 h-8" aria-hidden="true">
              <rect x="226" y="136" width="60" height="240" rx="18" fill="white" />
              <rect x="136" y="226" width="240" height="60" rx="18" fill="white" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-850 tracking-tight flex items-center justify-center gap-2">
              Medly
            </h1>
            <p className="text-xs text-slate-505 font-bold mt-1 uppercase tracking-wider">Nmat Prep Ecosystem</p>
          </div>
        </div>

        {/* Toast alerts */}
        {errorStatus && (
          <div className="bg-rose-50 border border-rose-200 text-rose-950 p-3.5 rounded-2xl text-xs space-y-1.5 flex items-start gap-2.5 shadow-2xs">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-extrabold text-[11px] uppercase tracking-wider leading-none">Access Alert</p>
              <p className="mt-1 leading-normal font-medium">{errorStatus}</p>
            </div>
          </div>
        )}

        {successStatus && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-3.5 rounded-2xl text-xs space-y-1.5 flex items-start gap-2.5 shadow-2xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-extrabold text-[11px] uppercase tracking-wider leading-none">Process Verified</p>
              <p className="mt-1 leading-normal font-medium">{successStatus}</p>
            </div>
          </div>
        )}

        {/* Main form */}
        <form onSubmit={handleAuth} className="space-y-4">
          {isForgotPassword ? (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-850 text-xs">
                <p className="font-bold flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-amber-600" /> Account Recovery Mode
                </p>
                <p className="mt-1 text-slate-600 font-medium">Provide your registered candidate email address below to receive password recovery directions.</p>
              </div>
              
              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-slate-450 tracking-wider">Registered Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. residentdoctor@hospital.ph"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-205 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-semibold transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Full Name field (Signup-only) */}
              {!isLogin && (
                <div className="space-y-1 animate-fade-in">
                  <label className="block text-[10px] font-black uppercase text-slate-450 tracking-wider">Candidate Doctor Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Juan Dela Cruz"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-205 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-semibold transition-all shadow-inner"
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-slate-450 tracking-wider">Candidate Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. email@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-205 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-semibold transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-black uppercase text-slate-450 tracking-wider">Password Secret</label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setErrorStatus(null);
                        setSuccessStatus(null);
                      }}
                      className="text-[10px] text-indigo-600 hover:underline font-extrabold cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-205 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-mono transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action trigger button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-[#1b4cb4] hover:bg-opacity-95 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            <span>
              {isLoading 
                ? 'Processing...' 
                : isForgotPassword 
                  ? 'Dispatch Recovery Link' 
                  : isLogin 
                    ? 'Verify Credentials & Enter' 
                    : 'Configure Candidate Account'}
            </span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Toggle options */}
        <div className="text-center pt-2 space-y-4">
          <div className="text-xs text-slate-505 font-bold">
            {isForgotPassword ? (
              <button
                onClick={() => {
                  setIsForgotPassword(false);
                  setErrorStatus(null);
                  setSuccessStatus(null);
                }}
                className="text-indigo-600 hover:underline cursor-pointer font-black"
              >
                Return to Login form
              </button>
            ) : isLogin ? (
              <p>
                Don't have a candidate profile?{' '}
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setErrorStatus(null);
                    setSuccessStatus(null);
                  }}
                  className="text-indigo-600 hover:underline cursor-pointer font-black ml-1"
                >
                  Sign Up here
                </button>
              </p>
            ) : (
              <p>
                Already registered a profile?{' '}
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setErrorStatus(null);
                    setSuccessStatus(null);
                  }}
                  className="text-indigo-600 hover:underline cursor-pointer font-black ml-1"
                >
                  Log In here
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Info card if Email Auth is disabled */}
        {showSandboxHelp && (
          <div className="p-3 bg-indigo-50 rounded-xl text-[10px] text-indigo-950 space-y-1.5 border border-indigo-150 animate-fade-in line-clamp-none">
            <p className="font-extrabold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Firebase Console Instructions:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 font-semibold pl-1">
              <li>Open your Firebase Console Dashboard for <b className="text-indigo-700">medly-74a38</b>.</li>
              <li>Go to <span className="underline">Authentication</span> &gt; <span className="underline">Sign-in method</span> tab.</li>
              <li>Enable the <span className="font-mono bg-sky-100 px-1 rounded">Email/Password</span> sign-in provider.</li>
              <li>Or click the <b>Instant Sandbox Entrance</b> button above to bypass!</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
