import React from 'react';
import { ALGERIAN_WILAYAS } from '../data/mockData';
import { AlgerianWilaya } from '../types';

interface WilayaListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWilaya: (wilaya: AlgerianWilaya) => void;
}

export const WilayaListModal: React.FC<WilayaListModalProps> = ({
  isOpen,
  onClose,
  onSelectWilaya,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 grid place-items-center transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6 shrink-0">
          <span className="text-xs font-mono text-gold-700 font-semibold tracking-wider uppercase">
            National Academic Coverage
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-plum-950 mt-1">
            Algerian Wilayas & Flagship Universities
          </h2>
          <p className="text-stone-600 text-xs md:text-sm mt-1">
            DZ-Bridge links diaspora experts directly with regional universities and laboratories across all provinces. Click any wilaya to focus the bridge network.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pr-2">
          {ALGERIAN_WILAYAS.map((wilaya) => (
            <div
              key={wilaya.code}
              onClick={() => {
                onSelectWilaya(wilaya);
                onClose();
              }}
              className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-gold-500/70 transition-all hover:shadow-md cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-plum-900 text-gold-400 group-hover:scale-105 transition-transform">
                  Wilaya {wilaya.code}
                </span>
                <span className="text-xs font-serif text-stone-500">{wilaya.arabicName}</span>
              </div>
              <h4 className="font-serif font-bold text-base text-plum-950 group-hover:text-gold-700 transition-colors">
                {wilaya.name}
              </h4>
              <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{wilaya.region}</p>
              <div className="mt-2 pt-2 border-t border-stone-200/60 text-[11px] text-stone-600">
                <span className="block font-medium line-clamp-2">
                  {wilaya.universities.join(' · ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between shrink-0 text-xs text-stone-500">
          <span>All 58 wilayas are integrated into national scientific missions.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-plum-900 text-white font-semibold text-xs hover:bg-plum-800 transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
