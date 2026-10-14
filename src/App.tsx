import React, { useState, useRef } from 'react';
import { ORGANISMS } from './data/ecosystemData';
import { Organism, AppMode } from './types/ecosystem';
import { EcosystemCanvas } from './components/EcosystemCanvas';
import { InteractiveMagnifier } from './components/InteractiveMagnifier';
import { CreatureModal } from './components/CreatureModal';
import { LayerGuideOverlay } from './components/LayerGuideOverlay';
import { FoodChainOverlay } from './components/FoodChainOverlay';
import { ClassroomToolbar } from './components/ClassroomToolbar';
import { OrganismChecklist } from './components/OrganismChecklist';
import { sound } from './utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Download, RotateCcw, Presentation, Info } from 'lucide-react';

export default function App() {
  const [organisms] = useState<Organism[]>(ORGANISMS);
  const [selectedOrganism, setSelectedOrganism] = useState<Organism | null>(null);
  const [discoveredIds, setDiscoveredIds] = useState<string[]>(['kingfisher', 'ladybug']);
  const [showClueBadges, setShowClueBadges] = useState<boolean>(true);
  const [appMode, setAppMode] = useState<AppMode>('explore');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hoveredOrganismId, setHoveredOrganismId] = useState<string | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const handleSelectOrganism = (org: Organism) => {
    if (!discoveredIds.includes(org.id)) {
      const nextDiscovered = [...discoveredIds, org.id];
      setDiscoveredIds(nextDiscovered);

      if (nextDiscovered.length === organisms.length) {
        setTimeout(() => {
          setShowCompletionModal(true);
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
          });
        }, 600);
      }
    }
    setSelectedOrganism(org);
  };

  const handleNextOrganism = () => {
    if (!selectedOrganism) return;
    const currentIndex = organisms.findIndex((o) => o.id === selectedOrganism.id);
    const nextIndex = (currentIndex + 1) % organisms.length;
    handleSelectOrganism(organisms[nextIndex]);
  };

  const handlePrevOrganism = () => {
    if (!selectedOrganism) return;
    const currentIndex = organisms.findIndex((o) => o.id === selectedOrganism.id);
    const prevIndex = (currentIndex - 1 + organisms.length) % organisms.length;
    handleSelectOrganism(organisms[prevIndex]);
  };

  const handleResetQuest = () => {
    sound.playClick();
    setDiscoveredIds([]);
    setShowCompletionModal(false);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Download high-resolution pristine vector SVG or PNG (guaranteed NO text, NO characters, NO logos, NO watermark)
  const handleDownloadCleanIllustration = () => {
    const svgEl = document.getElementById('ecosystem-master-svg');
    if (!svgEl) return;

    // Clone the SVG so we don't mutate current DOM
    const clonedSvg = svgEl.cloneNode(true) as SVGSVGElement;
    clonedSvg.setAttribute('width', '1920');
    clonedSvg.setAttribute('height', '1080');

    // Remove any marker or dynamic UI from the downloaded clean vector
    const markers = clonedSvg.getElementById('discovery-markers');
    if (markers) markers.remove();

    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const URLObj = window.URL || window.webkitURL;
    const blobURL = URLObj.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#bae6fd';
        ctx.fillRect(0, 0, 1920, 1080);
        ctx.drawImage(image, 0, 0, 1920, 1080);
        const pngURL = canvas.toDataURL('image/png');

        const downloadLink = document.createElement('a');
        downloadLink.href = pngURL;
        downloadLink.download = 'he-sinh-thai-rung-ao-clean-classroom.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URLObj.revokeObjectURL(blobURL);
      }
    };
    image.src = blobURL;
  };

  const isCleanMode = appMode === 'clean_canvas';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-emerald-200">
      {/* Top Navigation Banner (Hidden in Clean Presentation Mode) */}
      {!isCleanMode && (
        <header className="bg-emerald-900 text-white shadow-md border-b border-emerald-800">
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-emerald-800/80 rounded-xl text-xl">🌿</span>
              <div>
                <h1 className="text-base sm:text-lg font-extrabold tracking-tight">
                  Khám Phá Hệ Sinh Thái Rừng – Ao (Forest & Pond Ecosystem)
                </h1>
                <p className="text-xs text-emerald-200 hidden sm:block">
                  Minh họa phẳng giáo dục sinh học trực quan – Bố cục chuẩn giảng dạy lớp học
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-800/60 rounded-xl text-xs font-semibold text-emerald-100">
                <Info className="w-3.5 h-3.5 text-emerald-300" />
                <span>Không chữ / Không logo trên tranh minh họa</span>
              </div>
              <button
                onClick={() => setAppMode('clean_canvas')}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Presentation className="w-4 h-4" />
                <span>Chiếu Bảng F11</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Container */}
      <main className={`max-w-7xl mx-auto px-2 sm:px-4 py-4 space-y-4 ${isCleanMode ? 'p-2' : ''}`}>
        {/* Floating Exit Button if in Clean Mode */}
        {isCleanMode && (
          <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
            <button
              onClick={handleDownloadCleanIllustration}
              className="px-4 py-2 bg-slate-900/90 text-white rounded-xl text-xs font-bold hover:bg-slate-800 backdrop-blur-md shadow-2xl flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              Tải Ảnh Sạch (PNG)
            </button>
            <button
              onClick={() => setAppMode('explore')}
              className="px-4 py-2 bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold hover:bg-amber-300 shadow-2xl transition-all"
            >
              Thoát Trình Chiếu Sạch ✕
            </button>
          </div>
        )}

        {/* Classroom Interactive Toolbar */}
        {!isCleanMode && (
          <ClassroomToolbar
            appMode={appMode}
            setAppMode={setAppMode}
            showClueBadges={showClueBadges}
            setShowClueBadges={setShowClueBadges}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            discoveredCount={discoveredIds.length}
            totalOrganisms={organisms.length}
            onDownloadCleanIllustration={handleDownloadCleanIllustration}
            onToggleFullscreen={handleToggleFullscreen}
            isFullscreen={isFullscreen}
          />
        )}

        {/* Master Illustration Canvas Area */}
        <div
          ref={canvasContainerRef}
          className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-slate-900"
        >
          <EcosystemCanvas
            organisms={organisms}
            selectedOrganism={selectedOrganism}
            discoveredIds={discoveredIds}
            onSelectOrganism={handleSelectOrganism}
            showClueBadges={showClueBadges}
            appMode={appMode}
            hoveredOrganismId={hoveredOrganismId}
            setHoveredOrganismId={setHoveredOrganismId}
          />

          {/* Interactive Floating Magnifier Lens */}
          <InteractiveMagnifier
            containerRef={canvasContainerRef}
            active={appMode === 'magnifier'}
          />

          {/* Layer Guide Overlay */}
          {appMode === 'layers' && (
            <LayerGuideOverlay onClose={() => setAppMode('explore')} />
          )}

          {/* Food Chain Diagram Overlay */}
          {appMode === 'food_chain' && (
            <FoodChainOverlay onClose={() => setAppMode('explore')} />
          )}
        </div>

        {/* Organism Checklist & Discovery Bar */}
        {!isCleanMode && (
          <OrganismChecklist
            organisms={organisms}
            discoveredIds={discoveredIds}
            selectedOrganism={selectedOrganism}
            onSelectOrganism={handleSelectOrganism}
            hoveredOrganismId={hoveredOrganismId}
            setHoveredOrganismId={setHoveredOrganismId}
          />
        )}

        {/* Educational Note & Pedagogy Card */}
        {!isCleanMode && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-extrabold text-emerald-800 text-sm flex items-center gap-1.5 mb-1">
                  🔍 Hoạt Động Khám Phá
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Một số loài sinh vật được khéo léo ẩn sau tán lá, dưới lá sen hoặc nép mình bên thân gỗ mục. Sử dụng các gợi ý hình ảnh (biểu tượng tròn) và kính lúp để tìm thấy toàn bộ 8 loài.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Tiến độ học sinh:</span>
                <span className="text-emerald-700 font-bold">{Math.round((discoveredIds.length / organisms.length) * 100)}%</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-extrabold text-teal-800 text-sm flex items-center gap-1.5 mb-1">
                  🏞️ Bố Cục Mặt Cắt 2 Môi Trường
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Tranh chia thành 2 không gian rõ rệt: Môi trường trên cạn (cây đại thụ, hoa dại, cành cây, chim bói cá) và Môi trường nước (hoa súng, cá chép, rong rêu, sỏi đá đáy ao) thể hiện sự tương tác hữu cơ.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-semibold">
                <span>Chuẩn giáo dục Khoa học tự nhiên</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-extrabold text-amber-800 text-sm flex items-center gap-1.5 mb-1">
                  🖥️ Tối Ưu Chiếu Bảng Lớp Học
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Bấm <strong>&quot;Chiếu Tranh Sạch&quot;</strong> để ẩn mọi nút bấm và chữ viết, cho phép thầy cô trình chiếu tranh minh họa thuần túy và tổ chức các câu hỏi tương tác trực tiếp với học sinh.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={handleDownloadCleanIllustration}
                  className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  Xuất file minh họa PNG
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Creature Biology Profile Modal */}
      <CreatureModal
        organism={selectedOrganism}
        onClose={() => setSelectedOrganism(null)}
        onNext={handleNextOrganism}
        onPrev={handlePrevOrganism}
        isDiscovered={selectedOrganism ? discoveredIds.includes(selectedOrganism.id) : false}
      />

      {/* Completion Celebration Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center border-4 border-amber-400">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Trophy className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Xuất Sắc! Hoàn Thành Khám Phá!
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Bạn và các em học sinh đã xuất sắc tìm thấy đầy đủ <strong>8 loài sinh vật</strong> trong hệ sinh thái Rừng – Ao, hiểu rõ vai trò của từng mắt xích trong chuỗi thức ăn tự nhiên.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleResetQuest}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Chơi Lại Từ Đầu
              </button>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-600/20"
              >
                Tiếp Tục Khám Phá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
