import React from 'react';
import { Organism } from '../types/ecosystem';
import { CheckCircle2, Circle, Sparkles, Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface OrganismChecklistProps {
  organisms: Organism[];
  discoveredIds: string[];
  selectedOrganism: Organism | null;
  onSelectOrganism: (org: Organism) => void;
  hoveredOrganismId: string | null;
  setHoveredOrganismId: (id: string | null) => void;
}

export const OrganismChecklist: React.FC<OrganismChecklistProps> = ({
  organisms,
  discoveredIds,
  selectedOrganism,
  onSelectOrganism,
  hoveredOrganismId,
  setHoveredOrganismId,
}) => {
  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'bird':
        return '🦅';
      case 'bug':
        return '🐞';
      case 'fish':
        return '🐟';
      case 'frog':
        return '🐸';
      case 'mushroom':
        return '🍄';
      case 'plant':
        return '🌿';
      case 'ripple':
        return '🌸';
      case 'footprint':
        return '🪰';
      default:
        return '🌱';
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Danh Sách Sinh Vật Hệ Sinh Thái ({discoveredIds.length}/{organisms.length})
          </h3>
          <p className="text-xs text-slate-500">
            Nhấp vào từng sinh vật để xem vị trí ẩn nấp, tập tính sinh học và nghe âm thanh
          </p>
        </div>

        {discoveredIds.length === organisms.length && (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold border border-green-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            Đã hoàn thành khám phá!
          </span>
        )}
      </div>

      {/* Grid of Species Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {organisms.map((org) => {
          const isFound = discoveredIds.includes(org.id);
          const isSelected = selectedOrganism?.id === org.id;
          const isHovered = hoveredOrganismId === org.id;

          return (
            <button
              key={org.id}
              onClick={() => {
                sound.playClick();
                onSelectOrganism(org);
              }}
              onMouseEnter={() => setHoveredOrganismId(org.id)}
              onMouseLeave={() => setHoveredOrganismId(null)}
              className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between relative group ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-500/30'
                  : isHovered
                  ? 'border-emerald-300 bg-slate-50 shadow-sm'
                  : isFound
                  ? 'border-emerald-200 bg-white hover:border-emerald-300'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl filter drop-shadow-sm">
                  {getBadgeIcon(org.clueBadge.iconType)}
                </span>
                {isFound ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                )}
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-900 leading-tight mb-0.5 line-clamp-1">
                  {org.vietnameseName}
                </h4>
                <p className="text-[10px] text-slate-400 capitalize">
                  {org.category}
                </p>
              </div>

              {/* Status footer */}
              <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className={isFound ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                  {isFound ? 'Đã tìm thấy' : 'Chưa tìm'}
                </span>
                <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">
                  🔍
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
