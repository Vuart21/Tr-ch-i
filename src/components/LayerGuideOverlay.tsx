import React from 'react';
import { ECO_ZONES } from '../data/ecosystemData';
import { Layers, X } from 'lucide-react';

interface LayerGuideOverlayProps {
  onClose: () => void;
}

export const LayerGuideOverlay: React.FC<LayerGuideOverlayProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 z-30 bg-slate-950/60 backdrop-blur-[2px] flex flex-col p-4 sm:p-6 overflow-y-auto animate-fade-in pointer-events-auto">
      <div className="flex items-center justify-between pb-3 border-b border-white/20 text-white mb-4">
        <div className="flex items-center gap-2.5">
          <Layers className="w-6 h-6 text-emerald-400" />
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            Sơ Đồ Phân Tầng Sinh Thái Rừng – Ao (Ecological Stratification)
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/10 hover:bg-rose-500 text-white transition-colors"
          title="Đóng sơ đồ"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 my-auto">
        {ECO_ZONES.map((zone, idx) => (
          <div
            key={zone.id}
            className="p-4 rounded-2xl bg-white/95 text-slate-800 shadow-xl border-t-4 border-emerald-600 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {zone.range}
                </span>
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 mb-1.5">
                {zone.name}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {zone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
