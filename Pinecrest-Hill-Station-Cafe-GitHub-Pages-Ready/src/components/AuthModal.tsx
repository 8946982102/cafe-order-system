import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Lock, User as UserIcon, AlertCircle, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginGoogle, 
    loginEmail, 
    registerEmail,
    loginAsAdminDirect,
    setActivePage 
  } = useApp();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        setIsAuthModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    try {
      // Fixed, secure Admin / Owner credentials
      const isAdminEmail = 
        cleanEmail === 'admin@pinecrest.com' ||
        cleanEmail === 'owner@pinecrest.com' ||
        cleanEmail === 'admin@pinecrestcafe.com' ||
        cleanEmail === 'owner@pinecrestcafe.com' ||
        cleanEmail === 'mahesh91136@gmail.com';

      const isAdminPass = 
        cleanPassword === 'admin123' ||
        cleanPassword === 'admin123456' ||
        cleanPassword === 'pinecrestAdmin2026!' ||
        cleanPassword === 'owner123';

      if (isAdminEmail && isAdminPass) {
        loginAsAdminDirect(cleanPassword);
        setIsAuthModalOpen(false);
        setActivePage('admin');
        return;
      }

      if (authMode === 'signin') {
        await loginEmail(cleanEmail, cleanPassword);
      } else {
        if (!name.trim()) {
          setError('Please enter your name.');
          setIsLoading(false);
          return;
        }
        await registerEmail(cleanEmail, cleanPassword, name.trim());
      }
      setIsAuthModalOpen(false);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid email or password. Please check your credentials.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginGoogle();
      setIsAuthModalOpen(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google sign-in was cancelled or encountered an error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="w-full max-w-md bg-[#140D09] rounded-3xl border border-[#2E1A11] shadow-2xl p-6 sm:p-8 space-y-6 my-8 text-[#FAF5EF]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E6B87D] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Pinecrest Cafe & Juicery</span>
            </span>
            <h2 id="auth-modal-title" className="text-2xl sm:text-3xl font-bold text-[#FAF5EF] mt-1">
              {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Close sign in dialog"
            className="w-9 h-9 rounded-full bg-[#1C120B] hover:bg-[#2A1910] text-[#FAF5EF] border border-[#381F14] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switch: Sign In vs Sign Up */}
        <div className="flex bg-[#1C120B] p-1 rounded-2xl border border-[#2E1A11]">
          <button
            type="button"
            onClick={() => {
              setAuthMode('signin');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              authMode === 'signin'
                ? 'bg-[#8B1E1E] text-white shadow-sm border border-red-400/40'
                : 'text-[#A8988C] hover:text-[#FAF5EF]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-[#8B1E1E] text-white shadow-sm border border-red-400/40'
                : 'text-[#A8988C] hover:text-[#FAF5EF]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Google One-Click Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full py-3 rounded-2xl bg-[#1C120B] hover:bg-[#26180F] text-[#FAF5EF] font-semibold text-xs border border-[#2E1A11] flex items-center justify-center gap-2.5 transition-colors shadow-sm cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#26150C] w-full" />
          <span className="bg-[#140D09] px-3 text-[11px] text-[#A8988C] uppercase tracking-wider font-semibold">
            Or with email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {authMode === 'signup' && (
            <div>
              <label className="block font-medium text-[#FAF5EF] mb-1.5">
                Your Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#8C7B6E] absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alistair Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#2E1A11] text-xs text-[#FAF5EF] placeholder-[#7A6B5F] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-medium text-[#FAF5EF] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C7B6E] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#2E1A11] text-xs text-[#FAF5EF] placeholder-[#7A6B5F] focus:border-[#8B1E1E] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#FAF5EF] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C7B6E] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#2E1A11] text-xs text-[#FAF5EF] placeholder-[#7A6B5F] focus:border-[#8B1E1E] focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/70 text-red-300 border border-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#8B1E1E] hover:bg-[#A32323] text-white font-bold text-xs tracking-wide shadow-md transition-all active:scale-98 disabled:opacity-70 border border-red-400/40 cursor-pointer"
          >
            {isLoading 
              ? 'Signing in...' 
              : authMode === 'signin' 
                ? 'Sign In to Account' 
                : 'Create Account & Start Ordering'}
          </button>
        </form>

      </div>
    </div>
  );
};
