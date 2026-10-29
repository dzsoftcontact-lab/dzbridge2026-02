import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  onOpenAuth: (role?: UserRole) => void;
  onOpenDirectory: (tab?: 'experts' | 'projects') => void;
  onOpenProjectCreate: () => void;
  onSelectRole: (role: 'expert' | 'org' | null) => void;
  currentRole: 'expert' | 'org' | null;
  onOpenWilayaList: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAuth,
  onOpenDirectory,
  onOpenProjectCreate,
  onSelectRole,
  currentRole,
  onOpenWilayaList,
}) => {
  return (
    <header className="relative z-30 border-b border-[#E6E0D3] bg-white/80 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no clutter) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectRole(null);
            }}
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-plum-950 whitespace-nowrap group"
          >
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-plum-900 text-gold-500 shadow-sm group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 18h20M5 18V8M19 18V8M5 8C8 15 16 15 19 8M2 12l3-4M22 12l-3-4M9 14v4M12 15v3M15 14v4" />
              </svg>
            </span>
            <span className="font-serif tracking-tight text-plum-900 text-2xl">DZ-Bridge</span>
          </a>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button
            onClick={() => onSelectRole('expert')}
            className={`whitespace-nowrap transition-colors hover:text-plum-900 cursor-pointer ${
              currentRole === 'expert' ? 'text-plum-900 font-semibold underline underline-offset-4 decoration-gold-500 decoration-2' : ''
            }`}
          >
            For Experts
          </button>
          <button
            onClick={() => onSelectRole('org')}
            className={`whitespace-nowrap transition-colors hover:text-plum-900 cursor-pointer ${
              currentRole === 'org' ? 'text-plum-900 font-semibold underline underline-offset-4 decoration-gold-500 decoration-2' : ''
            }`}
          >
            For Organizations
          </button>
          <button
            onClick={() => onOpenDirectory('experts')}
            className="whitespace-nowrap hover:text-plum-900 transition-colors cursor-pointer"
          >
            Find Experts
          </button>
          <button
            onClick={() => onOpenDirectory('projects')}
            className="whitespace-nowrap hover:text-plum-900 transition-colors cursor-pointer"
          >
            University Projects
          </button>
          <button
            onClick={onOpenWilayaList}
            className="whitespace-nowrap hover:text-plum-900 transition-colors cursor-pointer"
          >
            Algeria Wilayas
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenAuth(null)}
            className="h-10 px-5 rounded-full border border-stone-300 bg-white hover:border-plum-800 text-stone-800 text-sm font-semibold transition-all hover:shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            Log in
          </button>
          <button
            onClick={() => onOpenProjectCreate()}
            className="hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-full bg-gold-500 hover:bg-gold-700 text-plum-950 hover:text-white text-sm font-semibold transition-all hover:shadow-md cursor-pointer whitespace-nowrap shrink-0"
          >
            Post a Project
          </button>
        </div>
      </div>
    </header>
  );
};
