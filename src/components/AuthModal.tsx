import React, { useState } from 'react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
  onLoginSuccess: (email: string, role: 'expert' | 'org') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'expert',
  onLoginSuccess,
}) => {
  const [role, setRole] = useState<'expert' | 'org'>(defaultRole || 'expert');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onLoginSuccess(email, role);
      setIsSuccess(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 grid place-items-center transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto mb-3">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-serif font-bold text-xl text-plum-950 mb-1">Authenticated!</h3>
            <p className="text-stone-600 text-xs">
              Welcome to the DZ-Bridge national exchange network.
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="w-10 h-10 rounded-xl bg-plum-900 text-gold-500 inline-grid place-items-center mb-2 shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 18h20M5 18V8M19 18V8M5 8C8 15 16 15 19 8M2 12l3-4M22 12l-3-4" />
                </svg>
              </span>
              <h2 className="text-2xl font-serif font-bold text-plum-950">Log into DZ-Bridge</h2>
              <p className="text-stone-600 text-xs mt-1">
                Access your missions, proposals, and direct institutional contacts.
              </p>
            </div>

            {/* Role Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => setRole('expert')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  role === 'expert' ? 'bg-white text-plum-950 shadow-sm' : 'text-stone-600 hover:text-plum-900'
                }`}
              >
                Algerian Expert
              </button>
              <button
                type="button"
                onClick={() => setRole('org')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  role === 'org' ? 'bg-white text-plum-950 shadow-sm' : 'text-stone-600 hover:text-plum-900'
                }`}
              >
                University / Organization
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder={role === 'expert' ? 'dr.expert@mit.edu' : 'direction.recherche@usthb.dz'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-gold-500 bg-stone-50/50"
                />
              </div>

              {role === 'org' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Institutional Domain / ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MESRS / CRTI / Sonatrach / USTHB"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-gold-500 bg-stone-50/50"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-gold-500 bg-stone-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-full bg-plum-900 hover:bg-plum-800 text-white text-xs font-semibold transition-all hover:shadow cursor-pointer mt-2"
              >
                Sign In to {role === 'expert' ? 'Expert Workspace' : 'Organization Portal'}
              </button>

              <div className="pt-2 text-center text-[11px] text-stone-500">
                Institutional SSO supported via MESRS & ASAL federations.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
