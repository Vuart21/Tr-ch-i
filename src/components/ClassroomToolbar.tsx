import React from 'react';
import { AppMode } from '../types/ecosystem';
import { sound } from '../utils/audio';
import {
  Compass,
  Search,
  Layers,
  Network,
  Maximize2,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Download,
  Presentation,
  CheckCircle2,
} from 'lucide-react';

interface ClassroomToolbarProps {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  showClueBadges: boolean;
  setShowClueBadges: (show: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  discoveredCount: number;
  totalOrganisms: number;
  onDownloadCleanIllustration: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export const ClassroomToolbar: React.FC<ClassroomToolbarProps> = ({
  appMode,
  setAppMode,
  showClueBadges,
  setShowClueBadges,
  isMuted,
  setIsMuted,
  discoveredCount,
  totalOrganisms,
  onDownloadCleanIllustration,
  onToggleFullscreen,
  isFullscreen,
}) => {
  const isCleanMode = appMode === 'clean_canvas';

  const handleModeClick = (mode: AppMode) => {
    sound.playClick();
    setAppMode(mode);
  };

  const handleToggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) sound.playClick();
  };

  const handleToggleClues = () => {
    sound.playClick();
    setShowClueBadges(!showClueBadges);
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3">
      {/* Primary Educational Mode Switcher */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => handleModeClick('explore')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            appMode === 'explore'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Khám Phá</span>
        </button>

        <button
          onClick={() => handleModeClick('hunt')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
            appMode === 'hunt'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Tìm Sinh Vật</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-amber-950 ml-1">
            {discoveredCount}/{totalOrganisms}
          </span>
        </button>

        <button
          onClick={() => handleModeClick('magnifier')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            appMode === 'magnifier'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Search className="w-4 h-4 text-emerald-300" />
          <span>Kính Lúp Soi Chi Tiết</span>
        </button>

        <button
          onClick={() => handleModeClick(appMode === 'layers' ? 'explore' : 'layers')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            appMode === 'layers'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Phân Tầng Rừng</span>
        </button>

        <button
          onClick={() => handleModeClick(appMode === 'food_chain' ? 'explore' : 'food_chain')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            appMode === 'food_chain'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Chuỗi Thức Ăn</span>
        </button>

        {/* Clean Mode Toggle - As user requested: No text, no letters, no logos, clean artwork for projector */}
        <button
          onClick={() => handleModeClick(isCleanMode ? 'explore' : 'clean_canvas')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            isCleanMode
              ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
          }`}
          title="Chế độ tranh minh họa thuần túy: Không chữ, không watermark, thích hợp chiếu máy chiếu"
        >
          <Presentation className="w-4 h-4" />
          <span>{isCleanMode ? 'Thoát Trình Chiếu' : 'Chiếu Tranh Sạch'}</span>
        </button>
      </div>

      {/* Secondary Controls & Tools */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Toggle Clue Badges */}
        <button
          onClick={handleToggleClues}
          className={`p-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
            showClueBadges && !isCleanMode
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
          title="Bật / Tắt biểu tượng gợi ý hình tròn (chim, dấu chân, nấm, vệt sóng...)"
        >
          {showClueBadges ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span className="hidden sm:inline">Gợi Ý Hình Ảnh</span>
        </button>

        {/* Mute Audio Toggle */}
        <button
          onClick={handleToggleSound}
          className={`p-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
            !isMuted
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
          }`}
          title={isMuted ? 'Bật âm thanh thiên nhiên' : 'Tắt âm thanh'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span className="hidden sm:inline">{isMuted ? 'Tắt Tiếng' : 'Âm Thanh'}</span>
        </button>

        {/* Download Clean Image */}
        <button
          onClick={onDownloadCleanIllustration}
          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          title="Tải ảnh minh họa sạch (100% không chữ, không ký tự, không watermark)"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Tải Ảnh Minh Họa</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-all"
          title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình máy chiếu'}
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
