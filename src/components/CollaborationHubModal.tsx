import React, { useState } from 'react';

interface CollaborationHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCreateProject: () => void;
}

export const CollaborationHubModal: React.FC<CollaborationHubModalProps> = ({
  isOpen,
  onClose,
  onOpenCreateProject,
}) => {
  const [activeTab, setActiveTab] = useState<'theses' | 'missions' | 'agreements'>('theses');

  if (!isOpen) return null;

  const mockTheses = [
    {
      title: 'Autonomous Navigation for Desert Agricultural Drones',
      scholar: 'Dr. Amine Mansouri (MIT CSAIL)',
      algerianLead: 'Prof. Reda Boukhalfa (ENP Alger)',
      wilaya: 'Alger & Biskra',
      status: 'Active · Milestone 2 of 4',
      progress: 65,
    },
    {
      title: 'Perovskite Photovoltaic Degradation in Hyper-Arid Climates',
      scholar: 'Prof. Yasmine Benali (TUM Munich)',
      algerianLead: 'Dr. Lakhdar Boucetta (Univ. Ouargla)',
      wilaya: 'Ouargla (30)',
      status: 'Active · Milestone 1 of 4',
      progress: 35,
    },
    {
      title: 'Post-Quantum Lattice Cryptography for National Banking API',
      scholar: 'Dr. Leila Zerrouki (Imperial College)',
      algerianLead: 'Dr. Fouad Rahal (Univ. Djillali Liabès)',
      wilaya: 'Sidi Bel Abbès (22)',
      status: 'In Review',
      progress: 20,
    },
  ];

  const mockMissions = [
    {
      expert: 'Dr. Karim Cherif',
      institution: 'CEA-Leti Grenoble',
      host: 'Université Abou Bekr Belkaïd',
      wilaya: 'Tlemcen (13)',
      dates: 'July 10 – July 22, 2026',
      purpose: '5-Day Intensive Silicon Fabrication Masterclass & Lab Audit',
    },
    {
      expert: 'Prof. Yasmine Benali',
      institution: 'Max Planck Institute',
      host: 'Université Kasdi Merbah & CDER',
      wilaya: 'Ouargla & Ghardaïa',
      dates: 'Sept 14 – Sept 26, 2026',
      purpose: 'Sahara Solar Hydrogen Test Bench Deployment',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/60 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 grid place-items-center transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <span className="text-xs font-mono text-gold-700 font-semibold tracking-wider uppercase">
            National Collaboration Workspace
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-plum-950 mt-1">
            Institutional Collaboration Hub
          </h2>
          <p className="text-stone-600 text-xs md:text-sm mt-1">
            Tracking active co-supervision theses, joint laboratory missions, and knowledge-transfer agreements across Algeria.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex p-1 bg-stone-100 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('theses')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'theses' ? 'bg-white text-plum-950 shadow-sm' : 'text-stone-600 hover:text-plum-900'
            }`}
          >
            Co-Supervised Theses (3)
          </button>
          <button
            onClick={() => setActiveTab('missions')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'missions' ? 'bg-white text-plum-950 shadow-sm' : 'text-stone-600 hover:text-plum-900'
            }`}
          >
            Upcoming Visiting Missions (2)
          </button>
          <button
            onClick={() => setActiveTab('agreements')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'agreements' ? 'bg-white text-plum-950 shadow-sm' : 'text-stone-600 hover:text-plum-900'
            }`}
          >
            Framework Agreements (5)
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'theses' && (
          <div className="space-y-4">
            {mockTheses.map((thesis, i) => (
              <div key={i} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-serif font-semibold text-base text-plum-950">{thesis.title}</h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      <span className="font-medium text-gold-800">{thesis.scholar}</span> · {thesis.algerianLead}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-gold-100 text-gold-800">
                    {thesis.wilaya}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-stone-500 mb-1">
                    <span>{thesis.status}</span>
                    <span>{thesis.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className="h-full bg-gold-500 rounded-full transition-all duration-500"
                      style={{ width: `${thesis.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'missions' && (
          <div className="space-y-4">
            {mockMissions.map((mission, i) => (
              <div key={i} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-gold-700">{mission.dates}</span>
                  <span className="text-xs font-semibold text-stone-700">{mission.wilaya}</span>
                </div>
                <h4 className="font-serif font-bold text-base text-plum-950 mt-1">{mission.purpose}</h4>
                <p className="text-xs text-stone-600 mt-1">
                  Visiting Expert: <strong className="text-plum-900">{mission.expert}</strong> ({mission.institution})
                </p>
                <p className="text-xs text-stone-500">Host: {mission.host}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'agreements' && (
          <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 text-xs text-stone-600 space-y-2">
            <p className="font-semibold text-stone-800">Standard Algerian Academic & Industrial Protocol:</p>
            <p>1. Institutional memorandum between diaspora scholar affiliation and Algerian faculty.</p>
            <p>2. Direct local logistics and on-site hospitality coordinated via MESRS / hosting Wilaya rectorate.</p>
            <p>3. Automatic issuance of research mission accreditation and student certificates.</p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">Need to start a new collaborative venture?</span>
          <button
            onClick={() => {
              onClose();
              onOpenCreateProject();
            }}
            className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-700 text-plum-950 hover:text-white text-xs font-semibold transition-all hover:shadow cursor-pointer"
          >
            + Create New Project
          </button>
        </div>
      </div>
    </div>
  );
};
