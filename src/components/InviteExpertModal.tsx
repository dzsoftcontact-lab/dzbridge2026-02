import React, { useState } from 'react';
import { ALGERIAN_WILAYAS } from '../data/mockData';
import { ExpertProfile } from '../types';

interface InviteExpertModalProps {
  expert: ExpertProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSendInvitation: (expertId: string, invitationData: any) => void;
}

export const InviteExpertModal: React.FC<InviteExpertModalProps> = ({
  expert,
  isOpen,
  onClose,
  onSendInvitation,
}) => {
  const [invitationType, setInvitationType] = useState<'talk' | 'collab' | 'meet'>('talk');
  const [organization, setOrganization] = useState('');
  const [wilayaCode, setWilayaCode] = useState('16');
  const [topic, setTopic] = useState('');
  const [proposedDate, setProposedDate] = useState('July 2026');
  const [customMessage, setCustomMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen || !expert) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendInvitation(expert.id, {
      invitationType,
      organization,
      wilayaCode,
      topic,
      proposedDate,
      customMessage,
    });
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 grid place-items-center transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {isSent ? (
          <div className="py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-serif font-bold text-2xl text-plum-950 mb-2">Invitation Transmitted!</h3>
            <p className="text-stone-600 text-sm max-w-sm mx-auto">
              Your official request has been transmitted directly to {expert.name}. Once accepted, contact and itinerary channels will open.
            </p>
          </div>
        ) : (
          <div>
            {/* Expert Header Badge */}
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-stone-150">
              <img
                src={expert.avatarUrl}
                alt={expert.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold-500/50 shadow"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-[11px] font-mono text-gold-700 uppercase font-semibold">
                  Official Invitation to Expert
                </span>
                <h3 className="text-xl font-serif font-bold text-plum-950">{expert.name}</h3>
                <p className="text-xs text-stone-500 line-clamp-1">{expert.title} · {expert.currentAffiliation}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setInvitationType('talk')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    invitationType === 'talk' ? 'bg-white text-plum-950 shadow-sm' : 'text-stone-600 hover:text-plum-900'
                  }`}
                >
                  Invite to Talk
                </button>
                <button
                  type="button"
                  onClick={() => setInvitationType('collab')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    invitationType === 'collab' ? 'bg-white text-plum-950 shadow-sm' : 'text-stone-600 hover:text-plum-900'
                  }`}
                >
                  Co-supervise / R&D
                </button>
                <button
                  type="button"
                  onClick={() => setInvitationType('meet')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    invitationType === 'meet' ? 'bg-white text-plum-950 shadow-sm' : 'text-stone-600 hover:text-plum-900'
                  }`}
                >
                  Meet & Mentor
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your University / Laboratory / Company *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faculté de Génie des Procédés, USTHB Alger"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Host Algerian Wilaya *
                  </label>
                  <select
                    value={wilayaCode}
                    onChange={(e) => setWilayaCode(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50"
                  >
                    {ALGERIAN_WILAYAS.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.code} - {w.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Proposed Window / Dates *
                  </label>
                  <input
                    type="text"
                    required
                    value={proposedDate}
                    onChange={(e) => setProposedDate(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Topic / Subject of Engagement *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masterclass on Robotic Vision or Advisory on Solar Pilot"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Personalized Message & Logistical Notes
                </label>
                <textarea
                  rows={3}
                  placeholder={`Dear ${expert.name}, we would be honored to host you for a technical seminar during your planned visit to Algeria...`}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-gold-500 bg-stone-50/50 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gold-500 hover:bg-gold-700 text-plum-950 hover:text-white text-xs font-semibold transition-all hover:shadow cursor-pointer"
                >
                  Send Official Invitation
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
