import React from 'react';
import { FOOD_CHAIN_STEPS } from '../data/ecosystemData';
import { Network, ArrowRight, Sun, Leaf, Bug, Fish, Sparkles, X } from 'lucide-react';

interface FoodChainOverlayProps {
  onClose: () => void;
}

export const FoodChainOverlay: React.FC<FoodChainOverlayProps> = ({ onClose }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'energy':
        return <Sun className="w-6 h-6 text-amber-500 animate-spin-slow" />;
      case 'producer':
        return <Leaf className="w-6 h-6 text-emerald-500" />;
      case 'primary':
        return <Fish className="w-6 h-6 text-sky-500" />;
      case 'secondary':
        return <Bug className="w-6 h-6 text-rose-500" />;
      case 'decomposer':
        return <Sparkles className="w-6 h-6 text-purple-500" />;
      default:
        return <Leaf className="w-6 h-6" />;
    }
  };

  return (
    <div className="absolute inset-0 z-30 bg-slate-950/70 backdrop-blur-[2px] flex flex-col p-4 sm:p-6 overflow-y-auto animate-fade-in pointer-events-auto">
      <div className="flex items-center justify-between pb-3 border-b border-white/20 text-white mb-4">
        <div className="flex items-center gap-2.5">
          <Network className="w-6 h-6 text-amber-400" />
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            Dòng Năng Lượng & Chuỗi Thức Ăn Hệ Sinh Thái Rừng – Ao
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

      <div className="flex flex-col lg:flex-row items-center justify-center gap-3 my-auto w-full max-w-6xl mx-auto">
        {FOOD_CHAIN_STEPS.map((step, idx) => (
          <React.Fragment key={step.step}>
            <div className="p-4 rounded-2xl bg-white text-slate-800 shadow-2xl border-2 border-slate-100 w-full lg:w-48 flex-shrink-0 flex flex-col items-center text-center">
              <div className="p-3 rounded-2xl bg-slate-50 mb-2.5 shadow-inner">
                {getIcon(step.type)}
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                {step.role}
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 mb-1 leading-tight">
                {step.name}
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                {step.desc}
              </p>
            </div>

            {idx < FOOD_CHAIN_STEPS.length - 1 && (
              <div className="hidden lg:flex items-center text-amber-400 animate-pulse">
                <ArrowRight className="w-6 h-6 stroke-[3]" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-4 p-3 bg-white/10 rounded-2xl text-center text-xs text-white/80 max-w-2xl mx-auto backdrop-blur-md">
        💡 <strong>Quy luật cân bằng:</strong> Năng lượng bắt đầu từ mặt trời được cây rừng và hoa sen hấp thụ, chuyển giao qua các bậc tiêu thụ và cuối cùng được nấm rừng phân giải trở lại đất ao màu mỡ.
      </div>
    </div>
  );
};
