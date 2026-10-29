import React from 'react';
import { UserRole } from '../types';

interface StageProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenProjectCreate: () => void;
  onOpenExpertSignup: (intent?: 'talk' | 'collab' | 'mentor') => void;
  onOpenDirectory: (tab?: 'experts' | 'projects') => void;
  onOpenCollabHub: () => void;
}

export const Stage: React.FC<StageProps> = ({
  currentRole,
  onSelectRole,
  onOpenProjectCreate,
  onOpenExpertSignup,
  onOpenDirectory,
  onOpenCollabHub,
}) => {
  const isExpert = currentRole === 'expert';
  const isOrg = currentRole === 'org';

  return (
    <div className="relative w-full min-h-[640px] my-6 transition-all duration-700">
      {/* Central Hero Statement (Visible in default state) */}
      <div
        className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 mx-auto max-w-2xl px-6 text-center z-10 transition-all duration-500 pointer-events-none ${
          currentRole ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <p className="inline-flex items-center gap-3 text-xs font-mono font-medium tracking-widest uppercase text-gold-700 mb-4 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gold-500/30">
          <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
          DZ-Bridge · National Diaspora Platform
        </p>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-plum-950 mb-6 leading-[1.15] text-balance">
          Linking <em className="italic font-serif text-gold-700">Algerian expertise</em> with national organizations
        </h1>

        <p className="text-base md:text-lg text-stone-700 max-w-xl mx-auto mb-8 font-sans">
          Bridging world-class Algerian scientists, engineers, and scholars across the globe with universities, research centers, and institutions in all 58 wilayas.
        </p>

        {/* Primary Interactive Role Selection Picks */}
        <div className="flex items-center justify-center gap-4 flex-wrap pointer-events-auto">
          <button
            onClick={() => onSelectRole('expert')}
            className="inline-flex items-center gap-3.5 h-14 px-7 rounded-full bg-plum-900 hover:bg-plum-800 text-white font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <span className="grid place-items-center w-8 h-8 rounded-full bg-white/15 text-gold-400 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4.5 20c.9-3.7 3.9-6 7.5-6s6.6 2.3 7.5 6" />
              </svg>
            </span>
            <span>I am an Expert</span>
            <svg className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => onSelectRole('org')}
            className="inline-flex items-center gap-3.5 h-14 px-7 rounded-full bg-gold-500 hover:bg-gold-700 text-plum-950 hover:text-white font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <span className="grid place-items-center w-8 h-8 rounded-full bg-plum-950/15 text-plum-950 group-hover:text-white group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 20.5V5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 14.5 5v15.5M14.5 9.5h4a1 1 0 0 1 1 1v10M2.5 20.5h19M8 7.5h3M8 11h3M8 14.5h3" />
              </svg>
            </span>
            <span>I am an Organization</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Decorative Suspension Bridge Vector Element */}
      <div
        className={`absolute left-[12%] right-[12%] bottom-3 h-32 pointer-events-none transition-opacity duration-500 ${
          currentRole ? 'opacity-10' : 'opacity-85'
        }`}
      >
        <svg viewBox="0 0 1000 150" preserveAspectRatio="none" className="w-full h-full text-gold-500">
          <path d="M0 118H1000" stroke="currentColor" strokeWidth="3" fill="none" />
          <path d="M0 130H1000" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
          <path d="M250 118V16M750 118V16" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M0 112Q130 90 250 16Q500 150 750 16Q870 90 1000 112" stroke="currentColor" strokeWidth="2.2" fill="none" />
          <path
            d="M290 100V120M340 78V120M390 63V120M440 56V120M490 53V120M540 54V120M590 58V120M640 66V120M690 82V120M730 98V120M160 78V118M80 98V118"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1.2"
            fill="none"
          />
          <circle r="5" fill="#C9A24B">
            <animateMotion dur="6s" repeatCount="indefinite" path="M0 118H1000" />
          </circle>
          <circle r="4" fill="#C9A24B" opacity="0.7">
            <animateMotion dur="6s" begin="-3s" repeatCount="indefinite" path="M1000 118H0" />
          </circle>
        </svg>
      </div>

      {/* ================= EXPERT PANEL ================= */}
      <section
        onClick={() => !currentRole && onSelectRole('expert')}
        className={`absolute top-0 bottom-0 rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          isExpert
            ? 'left-0 w-full z-20 bg-white/95 backdrop-blur-xl border border-stone-200 shadow-2xl p-8 lg:p-12 overflow-y-auto cursor-default'
            : isOrg
            ? 'left-0 w-1/4 opacity-0 pointer-events-none -translate-x-20'
            : 'left-0 w-[28%] border border-stone-200/80 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-gold-500/50 cursor-pointer group'
        }`}
      >
        {/* Top Tag */}
        <span
          className={`absolute top-4 left-6 z-10 text-[11px] font-mono tracking-widest uppercase font-medium transition-colors ${
            isExpert ? 'text-gold-700' : 'text-stone-700 group-hover:text-plum-900'
          }`}
        >
          For Experts
        </span>

        {/* Real High-Resolution Photography Portrait in Arched Frame */}
        <div
          className={`transition-all duration-700 ${
            isExpert
              ? 'hidden lg:block absolute right-12 top-12 bottom-12 w-[340px]'
              : 'absolute inset-x-0 bottom-0 h-[480px] flex items-end justify-center'
          }`}
        >
          <div className="relative w-[280px] h-[400px] rounded-t-[140px] overflow-hidden border-2 border-gold-500/50 shadow-2xl bg-plum-950">
            {/* The Real High-Resolution Photograph */}
            <img
              src="/src/assets/images/algerian_expert_portrait_1793282805790.jpg"
              alt="Algerian Expert and Scientist"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Ambient Lighting Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-plum-950/90 via-plum-950/20 to-transparent" />

            {/* Floating Information Capsule on the Image */}
            <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-plum-950/85 backdrop-blur-md border border-gold-500/30 text-white text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-gold-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Dr. Amine Mansouri, Ph.D.</span>
              </div>
              <p className="text-[11px] text-stone-300 mt-0.5">
                Senior Fellow, MIT CSAIL · Alumnus USTO-MB (Oran)
              </p>
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gold-300 font-mono">
                <span>Visiting Oran & Alger</span>
                <span>42 Publications</span>
              </div>
            </div>

            {/* Decorative Gold Arch Accent Line */}
            <div className="absolute top-0 inset-x-0 h-28 border-t-2 border-gold-400/40 rounded-t-[140px] pointer-events-none" />
          </div>
        </div>

        {/* Expanded Expert View Content */}
        {isExpert && (
          <div className="max-w-2xl">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectRole(null);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-all hover:-translate-x-1 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Overview
            </button>

            <p className="text-xs font-mono font-medium tracking-widest uppercase text-gold-700 mb-2">
              For Algerian Scholars & Diaspora Experts
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-plum-950 mb-4">
              Three ways to <em className="italic font-serif text-gold-700">contribute</em>.
            </h2>
            <p className="text-stone-600 mb-8 font-sans">
              Choose how you wish to engage with universities, researchers, and innovative companies across Algerian wilayas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Give a talk */}
              <article className="flex flex-col p-5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-white hover:border-gold-500/60 transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 grid place-items-center mb-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="3" width="6" height="11" rx="3" />
                    <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-lg text-plum-950 mb-2">Give a talk</h3>
                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  Share research at conferences, specialized seminars, and guest masterclasses in Algerian faculties.
                </p>
                <ul className="text-xs text-stone-600 space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Keynotes and doctoral workshops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>On site during visits or online</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Matched directly to your planned travel dates</span>
                  </li>
                </ul>
                <button
                  onClick={() => onOpenExpertSignup('talk')}
                  className="w-full h-10 rounded-full bg-plum-900 hover:bg-plum-800 text-white text-xs font-semibold transition-all hover:shadow cursor-pointer"
                >
                  Sign up to give a talk
                </button>
              </article>

              {/* Card 2: Collaborate on a project */}
              <article className="flex flex-col p-5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-white hover:border-gold-500/60 transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 grid place-items-center mb-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="8.5" cy="12" r="5" />
                    <circle cx="15.5" cy="12" r="5" />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-lg text-plum-950 mb-2">Collaborate on a project</h3>
                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  Join research, R&D and technology-transfer projects with labs, research centers, and industrial leaders.
                </p>
                <ul className="text-xs text-stone-600 space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Co-supervise doctoral theses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Advise national industrial R&D</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Joint international grant submissions</span>
                  </li>
                </ul>
                <button
                  onClick={() => onOpenDirectory('projects')}
                  className="w-full h-10 rounded-full bg-plum-900 hover:bg-plum-800 text-white text-xs font-semibold transition-all hover:shadow cursor-pointer"
                >
                  Browse university projects
                </button>
              </article>

              {/* Card 3: Meet & mentor */}
              <article className="flex flex-col p-5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-white hover:border-gold-500/60 transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 grid place-items-center mb-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 5h16v11H9l-5 4z" />
                    <path d="M8 9.5h8M8 12.5h5" />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-lg text-plum-950 mb-2">Meet & mentor</h3>
                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  Connect one-to-one with Algerian researchers, students, and start-up founders in person or via video call.
                </p>
                <ul className="text-xs text-stone-600 space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Exploratory meetings with institutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Mentoring Algerian tech student teams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Contact details shared only upon your approval</span>
                  </li>
                </ul>
                <button
                  onClick={() => onOpenExpertSignup('mentor')}
                  className="w-full h-10 rounded-full bg-plum-900 hover:bg-plum-800 text-white text-xs font-semibold transition-all hover:shadow cursor-pointer"
                >
                  Offer 1-on-1 mentorship
                </button>
              </article>
            </div>
          </div>
        )}
      </section>

      {/* ================= ORGANIZATION PANEL ================= */}
      <section
        onClick={() => !currentRole && onSelectRole('org')}
        className={`absolute top-0 bottom-0 rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          isOrg
            ? 'right-0 w-full z-20 bg-white/95 backdrop-blur-xl border border-stone-200 shadow-2xl p-8 lg:p-12 overflow-y-auto cursor-default'
            : isExpert
            ? 'right-0 w-1/4 opacity-0 pointer-events-none translate-x-20'
            : 'right-0 w-[28%] border border-stone-200/80 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-gold-500/50 cursor-pointer group'
        }`}
      >
        {/* Top Tag */}
        <span
          className={`absolute top-4 left-6 z-10 text-[11px] font-mono tracking-widest uppercase font-medium transition-colors ${
            isOrg ? 'text-gold-700' : 'text-stone-700 group-hover:text-plum-900'
          }`}
        >
          For Organizations
        </span>

        {/* Real High-Resolution Photography Architecture in Arched Frame */}
        <div
          className={`transition-all duration-700 ${
            isOrg
              ? 'hidden lg:block absolute right-12 top-12 bottom-12 w-[340px]'
              : 'absolute inset-x-0 bottom-0 h-[480px] flex items-end justify-center'
          }`}
        >
          <div className="relative w-[280px] h-[400px] rounded-t-[140px] overflow-hidden border-2 border-gold-500/50 shadow-2xl bg-plum-950">
            {/* The Real High-Resolution University Architecture Photograph */}
            <img
              src="/src/assets/images/organization_institution_1793282807216.jpg"
              alt="Algerian University and Innovation Center"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Ambient Lighting Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-plum-950/90 via-plum-950/20 to-transparent" />

            {/* Floating Information Capsule on the Image */}
            <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-plum-950/85 backdrop-blur-md border border-gold-500/30 text-white text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-gold-400">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span>Algerian Academic & Research Hub</span>
              </div>
              <p className="text-[11px] text-stone-300 mt-0.5">
                Universities, Research Centers & Companies
              </p>
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gold-300 font-mono">
                <span>All 58 Wilayas</span>
                <span>115+ Campuses</span>
              </div>
            </div>

            {/* Decorative Gold Arch Accent Line */}
            <div className="absolute top-0 inset-x-0 h-28 border-t-2 border-gold-400/40 rounded-t-[140px] pointer-events-none" />
          </div>
        </div>

        {/* Expanded Organization View Content */}
        {isOrg && (
          <div className="max-w-2xl">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectRole(null);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-all hover:-translate-x-1 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Overview
            </button>

            <p className="text-xs font-mono font-medium tracking-widest uppercase text-gold-700 mb-2">
              For Universities, Research Laboratories & Companies
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-plum-950 mb-4">
              What your organization <em className="italic font-serif text-gold-700">can do</em>.
            </h2>
            <p className="text-stone-600 mb-8 font-sans">
              Choose your path: start by creating a project, invite matching diaspora experts, then collaborate through co-supervision or joint R&D.
            </p>

            {/* Clear progressive options: 1) Create Project, 2) Invite Expert, 3) Collaborate */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Option 1: Create a Project */}
              <article className="flex flex-col p-5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-white hover:border-gold-500/60 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 grid place-items-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-gold-500/15 text-gold-800">
                    Step 1
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-lg text-plum-950 mb-2">Create a project</h3>
                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  Post a doctoral research thesis, industrial R&D challenge, or tech-transfer initiative looking for diaspora leadership.
                </p>
                <ul className="text-xs text-stone-600 space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Specify your Algerian wilaya & university</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Define research goals and student needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Broadcast instantly to qualified scholars</span>
                  </li>
                </ul>
                <button
                  onClick={onOpenProjectCreate}
                  className="w-full h-10 rounded-full bg-gold-500 hover:bg-gold-700 text-plum-950 hover:text-white text-xs font-semibold transition-all hover:shadow cursor-pointer"
                >
                  + Create a project now
                </button>
              </article>

              {/* Option 2: Invite an Expert */}
              <article className="flex flex-col p-5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-white hover:border-gold-500/60 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 grid place-items-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="3" width="6" height="11" rx="3" />
                      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-gold-500/15 text-gold-800">
                    Step 2
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-lg text-plum-950 mb-2">Invite an expert</h3>
                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  Search diaspora specialists by research field, availability, and target wilayas; invite them to give talks or evaluate work.
                </p>
                <ul className="text-xs text-stone-600 space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Keynote lectures and guest seminars</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Experts visiting Algeria prioritized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Direct proposal & date coordination</span>
                  </li>
                </ul>
                <button
                  onClick={() => onOpenDirectory('experts')}
                  className="w-full h-10 rounded-full bg-gold-500 hover:bg-gold-700 text-plum-950 hover:text-white text-xs font-semibold transition-all hover:shadow cursor-pointer"
                >
                  Browse & invite experts
                </button>
              </article>

              {/* Option 3: Collaborate */}
              <article className="flex flex-col p-5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-white hover:border-gold-500/60 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 grid place-items-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="8.5" cy="12" r="5" />
                      <circle cx="15.5" cy="12" r="5" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-gold-500/15 text-gold-800">
                    Step 3
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-lg text-plum-950 mb-2">Collaborate</h3>
                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  Establish continuous research partnerships, co-supervision milestones, and student laboratory mobility.
                </p>
                <ul className="text-xs text-stone-600 space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Track joint thesis milestones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Shared document and simulation repos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                    <span>Formal institutional framework agreement</span>
                  </li>
                </ul>
                <button
                  onClick={onOpenCollabHub}
                  className="w-full h-10 rounded-full bg-gold-500 hover:bg-gold-700 text-plum-950 hover:text-white text-xs font-semibold transition-all hover:shadow cursor-pointer"
                >
                  Open collaboration hub
                </button>
              </article>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
