import React, { useState } from 'react';
import { ALGERIAN_WILAYAS, RESEARCH_DOMAINS } from '../data/mockData';
import { ExpertProfile, UniversityProject } from '../types';

interface DirectoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'experts' | 'projects';
  experts: ExpertProfile[];
  projects: UniversityProject[];
  onInviteExpert: (expert: ExpertProfile) => void;
  onApplyProject: (project: UniversityProject) => void;
  onOpenProjectCreate: () => void;
}

export const DirectoryDrawer: React.FC<DirectoryDrawerProps> = ({
  isOpen,
  onClose,
  initialTab = 'experts',
  experts,
  projects,
  onInviteExpert,
  onApplyProject,
  onOpenProjectCreate,
}) => {
  const [tab, setTab] = useState<'experts' | 'projects'>(initialTab);
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedWilaya, setSelectedWilaya] = useState('all');

  if (!isOpen) return null;

  const filteredExperts = experts.filter((exp) => {
    const matchesSearch =
      exp.name.toLowerCase().includes(search.toLowerCase()) ||
      exp.title.toLowerCase().includes(search.toLowerCase()) ||
      exp.currentAffiliation.toLowerCase().includes(search.toLowerCase()) ||
      exp.country.toLowerCase().includes(search.toLowerCase()) ||
      exp.wilayaOrigin.toLowerCase().includes(search.toLowerCase());

    const matchesDomain =
      selectedDomain === 'All Domains' || exp.domain === selectedDomain;

    const matchesWilaya =
      selectedWilaya === 'all' ||
      exp.wilayaOrigin.toLowerCase().includes(selectedWilaya.toLowerCase()) ||
      exp.preferredWilayas.some((w) => w.toLowerCase().includes(selectedWilaya.toLowerCase()));

    return matchesSearch && matchesDomain && matchesWilaya;
  });

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(search.toLowerCase()) ||
      proj.organizationName.toLowerCase().includes(search.toLowerCase()) ||
      proj.description.toLowerCase().includes(search.toLowerCase());

    const matchesDomain =
      selectedDomain === 'All Domains' || proj.domain === selectedDomain;

    const matchesWilaya =
      selectedWilaya === 'all' || proj.wilayaCode === selectedWilaya;

    return matchesSearch && matchesDomain && matchesWilaya;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-plum-950/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-full bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between gap-4 bg-stone-50/50 shrink-0">
          <div>
            <span className="text-[11px] font-mono text-gold-700 uppercase font-semibold">
              DZ-Bridge Discovery Hub
            </span>
            <h2 className="text-2xl font-serif font-bold text-plum-950">
              National Experts & University Projects
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 grid place-items-center transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="px-6 py-4 border-b border-stone-200 bg-white space-y-3 shrink-0">
          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className="flex p-1 bg-stone-100 rounded-xl">
              <button
                onClick={() => setTab('experts')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  tab === 'experts' ? 'bg-white text-plum-950 shadow-sm' : 'text-stone-600 hover:text-plum-900'
                }`}
              >
                Diaspora Experts ({filteredExperts.length})
              </button>
              <button
                onClick={() => setTab('projects')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  tab === 'projects' ? 'bg-white text-plum-950 shadow-sm' : 'text-stone-600 hover:text-plum-900'
                }`}
              >
                University Projects ({filteredProjects.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={`Search ${tab === 'experts' ? 'experts, institutions, topics...' : 'projects, universities, wilayas...'}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-stone-200 text-xs bg-stone-50/70 focus:outline-none focus:border-gold-500"
              />
              <svg
                className="w-4 h-4 text-stone-400 absolute left-3 top-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>

          {/* Secondary Filters: Domain & Wilaya */}
          <div className="flex items-center gap-3">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="h-9 px-3 rounded-xl border border-stone-200 text-xs text-stone-700 bg-stone-50/70 focus:outline-none focus:border-gold-500"
            >
              {RESEARCH_DOMAINS.map((dom) => (
                <option key={dom} value={dom}>
                  {dom}
                </option>
              ))}
            </select>

            <select
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
              className="h-9 px-3 rounded-xl border border-stone-200 text-xs text-stone-700 bg-stone-50/70 focus:outline-none focus:border-gold-500"
            >
              <option value="all">All 58 Wilayas</option>
              {ALGERIAN_WILAYAS.map((w) => (
                <option key={w.code} value={w.code}>
                  {w.code} - {w.name}
                </option>
              ))}
            </select>

            {tab === 'projects' && (
              <button
                onClick={onOpenProjectCreate}
                className="ml-auto h-9 px-4 rounded-xl bg-gold-500 hover:bg-gold-700 text-plum-950 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                + Post New Project
              </button>
            )}
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {tab === 'experts' ? (
            filteredExperts.length === 0 ? (
              <div className="py-16 text-center text-stone-500 text-sm">
                No diaspora experts found matching your criteria. Try adjusting filters.
              </div>
            ) : (
              filteredExperts.map((exp) => (
                <article
                  key={exp.id}
                  className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-gold-500/70 transition-all hover:shadow-md flex flex-col md:flex-row gap-5 items-start"
                >
                  <img
                    src={exp.avatarUrl}
                    alt={exp.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-gold-500/40 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif font-bold text-lg text-plum-950">{exp.name}</h3>
                        <p className="text-xs font-medium text-stone-700">{exp.title}</p>
                        <p className="text-xs text-stone-500">
                          {exp.currentAffiliation} · {exp.city}, {exp.country}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-gold-100 text-gold-800 shrink-0">
                        Origin: {exp.wilayaOrigin}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {exp.bio}
                    </p>

                    <div className="mt-3 flex items-center gap-4 text-[11px] text-stone-500 font-mono">
                      <span>Visit: {exp.visitWindow}</span>
                      <span>·</span>
                      <span>Target: {exp.preferredWilayas.join(', ')}</span>
                      <span>·</span>
                      <span>{exp.publicationCount} Papers ({exp.citationCount} Cit.)</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-150 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-xs text-stone-600">
                        {exp.availableForTalks && <span className="px-2 py-0.5 rounded bg-stone-100">Talks</span>}
                        {exp.availableForCollab && <span className="px-2 py-0.5 rounded bg-stone-100">Co-supervision</span>}
                        {exp.availableForMentorship && <span className="px-2 py-0.5 rounded bg-stone-100">Mentorship</span>}
                      </div>

                      <button
                        onClick={() => onInviteExpert(exp)}
                        className="h-8 px-4 rounded-full bg-plum-900 hover:bg-plum-800 text-white text-xs font-semibold transition-all hover:shadow cursor-pointer"
                      >
                        Invite to Wilaya / Talk
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )
          ) : filteredProjects.length === 0 ? (
            <div className="py-16 text-center text-stone-500 text-sm">
              No university projects found matching your criteria.
            </div>
          ) : (
            filteredProjects.map((proj) => (
              <article
                key={proj.id}
                className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-gold-500/70 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-gold-700 font-semibold uppercase">
                      Wilaya {proj.wilayaCode} · {proj.wilayaName} · {proj.type}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-plum-950 mt-0.5">{proj.title}</h3>
                    <p className="text-xs font-medium text-stone-700 mt-0.5">{proj.organizationName}</p>
                  </div>
                  <span
                    className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                      proj.urgency === 'Urgent'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {proj.urgency}
                  </span>
                </div>

                <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">{proj.description}</p>

                <div className="mt-3 p-3 rounded-xl bg-stone-50 text-xs text-stone-700 space-y-1">
                  <span className="font-semibold text-stone-800 block text-[11px] uppercase tracking-wider">
                    Core Objectives:
                  </span>
                  {proj.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-150 flex items-center justify-between text-xs text-stone-500">
                  <span>Deadline: {proj.deadline} · Contact: {proj.contactPerson}</span>
                  <button
                    onClick={() => onApplyProject(proj)}
                    className="h-8 px-4 rounded-full bg-gold-500 hover:bg-gold-700 text-plum-950 hover:text-white text-xs font-semibold transition-all hover:shadow cursor-pointer"
                  >
                    Collaborate on Project
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
