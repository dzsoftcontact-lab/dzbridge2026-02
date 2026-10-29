import React, { useState } from 'react';
import { ALGERIAN_WILAYAS, RESEARCH_DOMAINS } from '../data/mockData';
import { ExpertProfile } from '../types';

interface ExpertSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultIntent?: 'talk' | 'collab' | 'mentor';
  onExpertCreated: (expert: ExpertProfile) => void;
}

export const ExpertSignupModal: React.FC<ExpertSignupModalProps> = ({
  isOpen,
  onClose,
  defaultIntent = 'talk',
  onExpertCreated,
}) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('France');
  const [wilayaOrigin, setWilayaOrigin] = useState('Alger');
  const [domain, setDomain] = useState(RESEARCH_DOMAINS[1]);
  const [visitWindow, setVisitWindow] = useState('July 1 – August 15, 2026');
  const [talkTopics, setTalkTopics] = useState('');
  const [availableForTalks, setAvailableForTalks] = useState<boolean>(true);
  const [availableForCollab, setAvailableForCollab] = useState<boolean>(true);
  const [availableForMentorship, setAvailableForMentorship] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title || !affiliation) return;

    const newExpert: ExpertProfile = {
      id: `exp-${Date.now()}`,
      name,
      title,
      currentAffiliation: affiliation,
      country,
      city,
      wilayaOrigin,
      preferredWilayas: [wilayaOrigin, 'Alger', 'Oran', 'Constantine'],
      domain,
      bio: `${title} at ${affiliation}. Contributing to Algerian scientific elevation through DZ-Bridge.`,
      avatarUrl: '/src/assets/images/algerian_expert_portrait_1793282805790.jpg',
      visitWindow,
      availableForTalks,
      availableForCollab,
      availableForMentorship,
      talkTopics: talkTopics
        ? talkTopics.split('\n').filter((t) => t.trim().length > 0)
        : ['Advanced research developments and collaborative masterclass'],
      publicationCount: 18,
      citationCount: 850,
    };

    onExpertCreated(newExpert);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 grid place-items-center transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-serif font-bold text-2xl text-plum-950 mb-2">Welcome to DZ-Bridge!</h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Your profile is registered. Algerian universities and institutions in your target wilayas will be able to invite you for talks, co-supervision, and advisory missions.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono text-gold-700 font-semibold tracking-wider uppercase">
                Expert Registration · Algerian Diaspora
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-plum-950 mt-1">
                Join the Algerian Knowledge Bridge
              </h2>
              <p className="text-stone-600 text-xs md:text-sm mt-1">
                Share your research, inspire doctoral candidates, and collaborate with national institutions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name & Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Meriem Mansour"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Current Academic / Professional Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Associate Professor of AI & Robotics"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Current Institution / Lab *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CNRS / MIT / TUM"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Paris / Boston / Montreal"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Country</label>
                  <input
                    type="text"
                    placeholder="e.g. France / USA / Canada"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Primary Discipline / Domain *</label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50"
                  >
                    {RESEARCH_DOMAINS.filter((d) => d !== 'All Domains').map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Algerian Wilaya of Origin / Affection</label>
                  <select
                    value={wilayaOrigin}
                    onChange={(e) => setWilayaOrigin(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50"
                  >
                    {ALGERIAN_WILAYAS.map((w) => (
                      <option key={w.code} value={w.name}>
                        {w.code} - {w.name} ({w.arabicName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Planned Visit Window to Algeria</label>
                <input
                  type="text"
                  placeholder="e.g. July 15 – August 25, 2026 (or available remotely anytime)"
                  value={visitWindow}
                  onChange={(e) => setVisitWindow(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Proposed Talk / Workshop Topics (1 per line)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Machine Learning in Energy Grids&#10;Mentoring Young Algerian Engineers in Silicon Design"
                  value={talkTopics}
                  onChange={(e) => setTalkTopics(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50 resize-none"
                />
              </div>

              {/* Checkboxes for engagement */}
              <div className="pt-2">
                <span className="block text-xs font-semibold text-stone-700 mb-2">Available for:</span>
                <div className="flex flex-wrap gap-4 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availableForTalks}
                      onChange={(e) => setAvailableForTalks(e.target.checked)}
                      className="rounded border-stone-300 text-gold-600 focus:ring-gold-500"
                    />
                    <span>Giving Talks / Keynotes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availableForCollab}
                      onChange={(e) => setAvailableForCollab(e.target.checked)}
                      className="rounded border-stone-300 text-gold-600 focus:ring-gold-500"
                    />
                    <span>PhD Co-supervision & R&D</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availableForMentorship}
                      onChange={(e) => setAvailableForMentorship(e.target.checked)}
                      className="rounded border-stone-300 text-gold-600 focus:ring-gold-500"
                    />
                    <span>1-on-1 Mentorship</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-plum-900 hover:bg-plum-800 text-white text-xs font-semibold transition-all hover:shadow cursor-pointer"
                >
                  Complete Expert Registration
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
