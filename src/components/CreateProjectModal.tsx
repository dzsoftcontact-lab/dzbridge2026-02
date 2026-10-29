import React, { useState } from 'react';
import { ALGERIAN_WILAYAS, RESEARCH_DOMAINS } from '../data/mockData';
import { UniversityProject } from '../types';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: UniversityProject) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onProjectCreated,
}) => {
  const [title, setTitle] = useState('');
  const [orgName, setOrgName] = useState('');
  const [wilayaCode, setWilayaCode] = useState('16');
  const [domain, setDomain] = useState(RESEARCH_DOMAINS[1]);
  const [type, setType] = useState<UniversityProject['type']>('PhD Co-supervision');
  const [description, setDescription] = useState('');
  const [objectivesText, setObjectivesText] = useState('');
  const [deadline, setDeadline] = useState('October 31, 2026');
  const [contactPerson, setContactPerson] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !orgName || !description) return;

    const selectedWilaya = ALGERIAN_WILAYAS.find((w) => w.code === wilayaCode) || ALGERIAN_WILAYAS[0];

    const newProject: UniversityProject = {
      id: `proj-${Date.now()}`,
      title,
      organizationName: orgName,
      wilayaCode: selectedWilaya.code,
      wilayaName: selectedWilaya.name,
      domain,
      type,
      description,
      objectives: objectivesText
        ? objectivesText.split('\n').filter((line) => line.trim().length > 0)
        : ['Collaborate on joint research roadmap', 'Mentor doctoral students', 'Publish joint scientific work'],
      deadline,
      urgency: 'Active',
      contactPerson: contactPerson || 'Scientific Research Directorate',
    };

    onProjectCreated(newProject);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 grid place-items-center transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-serif font-bold text-2xl text-plum-950 mb-2">Project Created & Broadcasted!</h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Your research proposal has been listed on DZ-Bridge and shared with matching Algerian diaspora researchers in your discipline.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono text-gold-700 font-semibold tracking-wider uppercase">
                Step 1 · For Organizations
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-plum-950 mt-1">
                Post a New Project or Thesis
              </h2>
              <p className="text-stone-600 text-xs md:text-sm mt-1">
                Reach Algerian researchers and industry leaders in the diaspora to co-supervise or advise your project.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Project or Thesis Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Green Hydrogen Electrolysis & Catalyst Characterization"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm bg-stone-50/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Institution / University / Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Université Frères Mentouri Constantine 1"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Algerian Wilaya *
                  </label>
                  <select
                    value={wilayaCode}
                    onChange={(e) => setWilayaCode(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm bg-stone-50/50"
                  >
                    {ALGERIAN_WILAYAS.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.code} - {w.name} ({w.arabicName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Scientific / Technical Domain *
                  </label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm bg-stone-50/50"
                  >
                    {RESEARCH_DOMAINS.filter((d) => d !== 'All Domains').map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Collaboration Type *
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as UniversityProject['type'])}
                    className="w-full h-11 px-3 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm bg-stone-50/50"
                  >
                    <option value="PhD Co-supervision">PhD Co-supervision</option>
                    <option value="Industrial R&D">Industrial R&D Advisory</option>
                    <option value="Academic Curriculum">Academic Curriculum & Masterclasses</option>
                    <option value="Visiting Keynote">Visiting Keynote / Seminar</option>
                    <option value="Tech Transfer">Technology Transfer & Lab Setup</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Project Description & Expected Deliverables *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the research scope, laboratory capabilities, and what kind of mentorship or technical guidance is expected from the diaspora expert..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm bg-stone-50/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Lead Researcher / Contact Person
                  </label>
                  <input
                    type="text"
                    placeholder="Prof. or Dr. Name, Title"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Submission / Application Deadline
                  </label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-300 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-700 text-plum-950 hover:text-white text-xs font-semibold transition-all hover:shadow-md cursor-pointer"
                >
                  Publish & Broadcast Project
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
