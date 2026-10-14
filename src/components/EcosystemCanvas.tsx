import React, { useRef } from 'react';
import { Organism, AppMode } from '../types/ecosystem';
import { sound } from '../utils/audio';

interface EcosystemCanvasProps {
  organisms: Organism[];
  selectedOrganism: Organism | null;
  discoveredIds: string[];
  onSelectOrganism: (org: Organism) => void;
  showClueBadges: boolean;
  appMode: AppMode;
  hoveredOrganismId: string | null;
  setHoveredOrganismId: (id: string | null) => void;
  magnifierPos?: { x: number; y: number } | null;
}

export const EcosystemCanvas: React.FC<EcosystemCanvasProps> = ({
  organisms,
  selectedOrganism,
  discoveredIds,
  onSelectOrganism,
  showClueBadges,
  appMode,
  hoveredOrganismId,
  setHoveredOrganismId,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleOrganismClick = (org: Organism) => {
    switch (org.id) {
      case 'kingfisher':
        sound.playBirdChirp();
        break;
      case 'frog':
        sound.playFrogCroak();
        break;
      case 'carp':
      case 'lotus':
        sound.playWaterBubble();
        break;
      case 'ladybug':
      case 'dragonfly':
        sound.playInsectBuzz();
        break;
      case 'mushrooms':
        sound.playSporeChime();
        break;
      default:
        sound.playDiscoveryChime();
    }
    onSelectOrganism(org);
  };

  const isCleanMode = appMode === 'clean_canvas';

  return (
    <div className="relative w-full aspect-[16/9] select-none rounded-2xl overflow-hidden shadow-2xl bg-sky-100 border-4 border-emerald-800/20">
      <svg
        ref={svgRef}
        id="ecosystem-master-svg"
        viewBox="0 0 1920 1080"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients */}
          {/* Sky Gradient */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="45%" stopColor="#bae6fd" />
            <stop offset="70%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#f0fdf4" />
          </linearGradient>

          {/* Mountains Gradient */}
          <linearGradient id="mountainFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="mountainMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.5" />
          </linearGradient>

          {/* Pine Forest Gradient */}
          <linearGradient id="pineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* Water Surface Split & Underwater Gradient */}
          <linearGradient id="underwaterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.88" />
            <stop offset="25%" stopColor="#0369a1" stopOpacity="0.94" />
            <stop offset="70%" stopColor="#075985" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>

          <linearGradient id="waterSurfaceGleam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#7dd3fc" stopOpacity="0.98" />
            <stop offset="70%" stopColor="#bae6fd" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
          </linearGradient>

          {/* Riverbed Sand Gradient */}
          <linearGradient id="riverbedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78716c" />
            <stop offset="40%" stopColor="#57534e" />
            <stop offset="100%" stopColor="#44403c" />
          </linearGradient>

          {/* Tree Bark Gradient */}
          <linearGradient id="treeBarkGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="40%" stopColor="#78350f" />
            <stop offset="80%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Fallen Log Gradient */}
          <linearGradient id="fallenLogGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#593414" />
            <stop offset="50%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Moss Gradient */}
          <linearGradient id="mossGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#4d7c0f" />
          </linearGradient>

          {/* Fish Gradient */}
          <linearGradient id="carpBodyGrad" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="45%" stopColor="#fbbf24" />
            <stop offset="85%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>

          {/* Clue Badge Pattern Filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="badgeShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.25" floodColor="#042f2e" />
          </filter>
          <filter id="magnifierShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="6" dy="12" stdDeviation="10" floodOpacity="0.3" floodColor="#0f172a" />
          </filter>

          {/* Sun Ray Gradient */}
          <linearGradient id="sunRay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* ---------------- 1. SKY & SUNSHINE BACKGROUND ---------------- */}
        <rect x="0" y="0" width="1920" height="600" fill="url(#skyGrad)" />

        {/* Sun Glow */}
        <circle cx="1280" cy="90" r="140" fill="#fef08a" opacity="0.35" />
        <circle cx="1280" cy="90" r="80" fill="#fef9c3" opacity="0.5" />

        {/* Soft Sunbeams */}
        <polygon points="1280,90 850,560 1020,560" fill="url(#sunRay)" />
        <polygon points="1280,90 1150,560 1380,560" fill="url(#sunRay)" />
        <polygon points="1280,90 1480,560 1720,560" fill="url(#sunRay)" />

        {/* Fluffy White Clouds */}
        <g fill="#ffffff" opacity="0.88">
          {/* Cloud 1 */}
          <ellipse cx="620" cy="110" rx="90" ry="32" />
          <ellipse cx="670" cy="95" rx="60" ry="42" />
          <ellipse cx="580" cy="115" rx="55" ry="28" />
          {/* Cloud 2 */}
          <ellipse cx="1060" cy="80" rx="110" ry="36" />
          <ellipse cx="1120" cy="65" rx="70" ry="46" />
          <ellipse cx="1000" cy="85" rx="65" ry="30" />
          {/* Cloud 3 */}
          <ellipse cx="1520" cy="120" rx="120" ry="40" />
          <ellipse cx="1580" cy="100" rx="80" ry="50" />
          <ellipse cx="1460" cy="125" rx="70" ry="34" />
        </g>

        {/* ---------------- 2. DISTANT MOUNTAIN SILHOUETTES ---------------- */}
        {/* Far Peak Mountain */}
        <polygon
          points="780,480 1120,210 1420,480"
          fill="url(#mountainFar)"
        />
        <polygon
          points="1080,480 1280,260 1560,480"
          fill="url(#mountainMid)"
        />

        {/* Middle Green Hills */}
        <path
          d="M600,480 Q850,380 1150,420 T1700,480 L1700,520 L600,520 Z"
          fill="#86efac"
          opacity="0.75"
        />

        {/* Dense Pine Forest Silhouette (Middle distance) */}
        <g fill="url(#pineGrad)">
          {/* Staggered pine trees in background */}
          {[
            { x: 860, y: 390, h: 70 },
            { x: 910, y: 380, h: 85 },
            { x: 960, y: 395, h: 65 },
            { x: 1020, y: 375, h: 95 },
            { x: 1080, y: 385, h: 80 },
            { x: 1140, y: 370, h: 100 },
            { x: 1200, y: 385, h: 80 },
            { x: 1260, y: 375, h: 90 },
            { x: 1320, y: 360, h: 115 },
            { x: 1380, y: 370, h: 105 },
            { x: 1440, y: 355, h: 125 },
            { x: 1500, y: 365, h: 110 },
            { x: 1560, y: 350, h: 130 },
            { x: 1620, y: 360, h: 120 },
            { x: 1680, y: 340, h: 140 },
            { x: 1740, y: 350, h: 130 },
            { x: 1800, y: 330, h: 150 },
            { x: 1860, y: 340, h: 140 },
          ].map((tree, i) => (
            <polygon
              key={`pine-${i}`}
              points={`${tree.x},${tree.y + tree.h} ${tree.x + 22},${tree.y} ${tree.x + 44},${tree.y + tree.h}`}
            />
          ))}
        </g>

        {/* ---------------- 3. FOREST GROUND & RIVERBANK (SHORELINE) ---------------- */}
        {/* Far Meadow Bank */}
        <path
          d="M520,490 C750,460 950,470 1200,475 C1450,480 1700,465 1920,480 L1920,530 C1600,535 1300,520 1000,525 C750,530 600,515 520,490 Z"
          fill="#4ade80"
        />

        {/* Center Rock Mounds in Far Pond Edge */}
        <g>
          {/* Mossy boulder 1 */}
          <path
            d="M540,510 C560,430 680,420 740,490 C790,440 910,450 930,510 Z"
            fill="#57534e"
          />
          <path
            d="M570,470 C600,430 660,425 710,460 C740,445 800,450 830,485 Z"
            fill="url(#mossGrad)"
          />
          {/* Mossy boulder 2 */}
          <ellipse cx="1060" cy="460" rx="90" ry="45" fill="#57534e" />
          <ellipse cx="1060" cy="450" rx="75" ry="32" fill="url(#mossGrad)" />
          {/* Pebble clusters */}
          <ellipse cx="1240" cy="485" rx="50" ry="25" fill="#78716c" />
          <ellipse cx="1320" cy="495" rx="35" ry="20" fill="#a8a29e" />
        </g>

        {/* ---------------- 4. WATER BODY (CROSS-SECTION OF POND) ---------------- */}
        {/* Underwater Basin (Below water split line Y=560) */}
        <rect x="0" y="560" width="1920" height="520" fill="url(#underwaterGrad)" />

        {/* Riverbed Sand, Silt and Pebbles (Bottom 940 - 1080) */}
        <path
          d="M0,970 Q300,920 600,950 T1200,930 T1700,960 L1920,950 L1920,1080 L0,1080 Z"
          fill="url(#riverbedGrad)"
        />

        {/* Underwater Pebbles and Smooth Stones */}
        <g fill="#a8a29e" opacity="0.85">
          <ellipse cx="640" cy="1000" rx="42" ry="24" fill="#78716c" />
          <ellipse cx="710" cy="1015" rx="28" ry="16" fill="#a8a29e" />
          <ellipse cx="770" cy="995" rx="55" ry="30" fill="#57534e" />
          <ellipse cx="860" cy="1010" rx="38" ry="22" fill="#78716c" />
          <ellipse cx="940" cy="1025" rx="45" ry="26" fill="#a8a29e" />
          <ellipse cx="1040" cy="1005" rx="60" ry="34" fill="#57534e" />
          <ellipse cx="1140" cy="1015" rx="35" ry="20" fill="#78716c" />
          <ellipse cx="1240" cy="1030" rx="50" ry="28" fill="#a8a29e" />
          <ellipse cx="1340" cy="1000" rx="70" ry="38" fill="#57534e" />
          <ellipse cx="1460" cy="1020" rx="40" ry="24" fill="#78716c" />
        </g>

        {/* Underwater Aquatic Weeds (Rong đuôi chó / Thủy sinh) */}
        <g stroke="#15803d" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.8">
          {/* Weed 1 */}
          <path d="M580,980 Q610,880 570,780 T610,680" />
          <path d="M600,990 Q640,890 620,800 T650,710" />
          {/* Weed 2 under fish */}
          <path d="M1120,990 Q1090,890 1130,810 T1110,720" />
          <path d="M1150,1010 Q1190,910 1170,820 T1200,740" />
          <path d="M1180,1020 Q1160,930 1190,850" />
          {/* Weed 3 right side */}
          <path d="M1380,980 Q1420,880 1390,780 T1430,680" stroke="#166534" strokeWidth="14" />
          <path d="M1410,1000 Q1450,900 1430,810 T1470,720" stroke="#15803d" strokeWidth="10" />
        </g>

        {/* Underwater Sun Rays filtered through water */}
        <g fill="#7dd3fc" opacity="0.16">
          <polygon points="650,560 610,950 710,950 720,560" />
          <polygon points="850,560 820,980 940,980 930,560" />
          <polygon points="1120,560 1090,950 1240,950 1210,560" />
          <polygon points="1350,560 1340,980 1480,980 1440,560" />
        </g>

        {/* Floating Underwater Bubbles */}
        <g fill="#e0f2fe" opacity="0.75">
          <circle cx="1030" cy="740" r="14" />
          <circle cx="1030" cy="740" r="5" fill="#ffffff" />
          <circle cx="1045" cy="710" r="10" />
          <circle cx="1065" cy="670" r="8" />
          <circle cx="1280" cy="760" r="12" />
          <circle cx="1300" cy="730" r="9" />
          <circle cx="920" cy="800" r="10" />
          <circle cx="890" cy="760" r="7" />
        </g>

        {/* Water Surface Line & Shimmer (Separation of air & water at Y=545 - 570) */}
        <rect x="0" y="540" width="1920" height="28" fill="url(#waterSurfaceGleam)" />
        {/* Gentle Water Ripple Waves */}
        <path
          d="M0,545 Q80,535 160,545 T320,545 T480,545 T640,545 T800,545 T960,545 T1120,545 T1280,545 T1440,545 T1600,545 T1760,545 T1920,545"
          fill="none"
          stroke="#e0f2fe"
          strokeWidth="6"
          opacity="0.9"
        />
        <path
          d="M0,565 Q80,555 160,565 T320,565 T480,565 T640,565 T800,565 T960,565 T1120,565 T1280,565 T1440,565 T1600,565 T1760,565 T1920,565"
          fill="none"
          stroke="#0284c7"
          strokeWidth="4"
          opacity="0.65"
        />

        {/* ---------------- 5. WATER LILIES & LOTUS ON POND SURFACE ---------------- */}
        <g id="lotus-group">
          {/* Lily Pad 1 (Large round green with notch) */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => handleOrganismClick(organisms.find(o => o.id === 'lotus')!)}
            onMouseEnter={() => setHoveredOrganismId('lotus')}
            onMouseLeave={() => setHoveredOrganismId(null)}
          >
            {/* Pad shadow */}
            <ellipse cx="890" cy="595" rx="145" ry="34" fill="#0284c7" opacity="0.4" />
            {/* Outer Pad */}
            <path
              d="M745,590 C745,568 810,550 890,550 C970,550 1035,568 1035,590 C1035,612 970,630 890,630 C845,630 810,622 785,610 L890,590 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="4"
            />
            {/* Pad radiating veins */}
            <path d="M890,590 L790,570 M890,590 L840,555 M890,590 L910,552 M890,590 L980,565 M890,590 L1010,595 M890,590 L970,620 M890,590 L910,628" stroke="#16a34a" strokeWidth="2.5" />
          </g>

          {/* Lily Pad 2 (Left smaller) */}
          <g>
            <ellipse cx="780" cy="555" rx="105" ry="24" fill="#16a34a" stroke="#15803d" strokeWidth="3" />
            <ellipse cx="1230" cy="580" rx="115" ry="26" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
          </g>

          {/* Lily Pad 3 (Foreground water surface) */}
          <g>
            <ellipse cx="980" cy="620" rx="110" ry="26" fill="#16a34a" stroke="#15803d" strokeWidth="3" />
          </g>

          {/* Beautiful Blooming Pink Lotus Flower */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:scale-110 origin-[1050px_560px]"
            onClick={() => handleOrganismClick(organisms.find(o => o.id === 'lotus')!)}
            onMouseEnter={() => setHoveredOrganismId('lotus')}
            onMouseLeave={() => setHoveredOrganismId(null)}
          >
            {/* Lotus Petals Back Layer */}
            <path d="M1020,550 C1000,500 1025,480 1045,510 Z" fill="#f43f5e" opacity="0.8" />
            <path d="M1070,550 C1090,500 1065,480 1045,510 Z" fill="#f43f5e" opacity="0.8" />
            <path d="M1045,550 C1045,470 1055,470 1055,550 Z" fill="#fb7185" />
            {/* Mid Petals */}
            <path d="M1000,555 C965,515 1010,490 1035,535 Z" fill="#f472b6" />
            <path d="M1090,555 C1125,515 1080,490 1055,535 Z" fill="#f472b6" />
            <path d="M1015,560 C980,530 1020,510 1040,550 Z" fill="#fbcfe8" />
            <path d="M1075,560 C1110,530 1070,510 1050,550 Z" fill="#fbcfe8" />
            {/* Center Front Petals */}
            <path d="M1030,565 C1015,530 1045,520 1050,565 Z" fill="#ffffff" stroke="#f472b6" strokeWidth="2" />
            <path d="M1060,565 C1075,530 1045,520 1040,565 Z" fill="#ffffff" stroke="#f472b6" strokeWidth="2" />
            {/* Golden Stamen core */}
            <ellipse cx="1045" cy="552" rx="14" ry="7" fill="#facc15" />
          </g>
        </g>

        {/* ---------------- 6. UNDERWATER CREATURE: FRESHWATER CARP (CÁ CHÉP) ---------------- */}
        <g
          id="carp-group"
          className="cursor-pointer transition-transform duration-300 hover:scale-105 origin-[1180px_790px]"
          onClick={() => handleOrganismClick(organisms.find(o => o.id === 'carp')!)}
          onMouseEnter={() => setHoveredOrganismId('carp')}
          onMouseLeave={() => setHoveredOrganismId(null)}
        >
          {/* Highlight ring if selected */}
          {selectedOrganism?.id === 'carp' && (
            <ellipse cx="1180" cy="790" rx="170" ry="85" fill="none" stroke="#facc15" strokeWidth="6" strokeDasharray="12 8" />
          )}

          {/* Fish Tail Fin (Caudal Fin) */}
          <path
            d="M1300,790 L1370,730 C1350,770 1355,810 1370,850 Z"
            fill="#ea580c"
            opacity="0.9"
            stroke="#c2410c"
            strokeWidth="3"
          />
          {/* Fin ray details */}
          <path d="M1305,790 L1365,745 M1305,790 L1365,790 M1305,790 L1365,835" stroke="#fed7aa" strokeWidth="2" />

          {/* Fish Dorsal Fin (Vây lưng) */}
          <path
            d="M1120,740 Q1190,705 1250,745 L1240,755 Q1180,725 1130,755 Z"
            fill="#ea580c"
            stroke="#9a3412"
            strokeWidth="3"
          />

          {/* Fish Pectoral and Pelvic Fins */}
          <path d="M1100,820 Q1120,865 1145,860 Q1130,830 1115,820 Z" fill="#f97316" />
          <path d="M1210,815 Q1230,850 1245,845 Q1235,825 1220,815 Z" fill="#f97316" />

          {/* Fish Main Body */}
          <path
            d="M1040,790 C1060,735 1170,725 1300,780 C1305,790 1305,800 1300,810 C1170,865 1060,845 1040,790 Z"
            fill="url(#carpBodyGrad)"
            stroke="#b45309"
            strokeWidth="4"
          />

          {/* Fish Scale Texture Pattern */}
          <g stroke="#b45309" strokeWidth="2" fill="none" opacity="0.6">
            <path d="M1120,760 Q1135,775 1120,790 M1150,755 Q1165,775 1150,795 M1180,755 Q1195,775 1180,795 M1210,760 Q1225,780 1210,800" />
            <path d="M1135,780 Q1150,795 1135,810 M1165,780 Q1180,800 1165,820 M1195,780 Q1210,800 1195,820 M1225,785 Q1240,805 1225,825" />
          </g>

          {/* Fish Head & Operculum (Mang cá) */}
          <path
            d="M1095,750 C1115,770 1115,815 1095,835"
            fill="none"
            stroke="#92400e"
            strokeWidth="4"
          />

          {/* Eye */}
          <circle cx="1070" cy="775" r="14" fill="#ffffff" stroke="#78350f" strokeWidth="3" />
          <circle cx="1068" cy="775" r="8" fill="#1e293b" />
          <circle cx="1065" cy="772" r="3" fill="#ffffff" />

          {/* Sensory Barbels at Mouth (Râu cá) */}
          <path d="M1042,795 Q1030,808 1038,818" fill="none" stroke="#b45309" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* ---------------- 7. RIGHT BANK: FALLEN LOG, MUSHROOMS & HIDDEN FROG ---------------- */}
        {/* Fallen Mossy Log (Gỗ mục nằm nghiêng) */}
        <g id="fallen-log-group">
          {/* Main Log Body */}
          <path
            d="M1300,520 L1920,200 L1920,380 L1450,620 Z"
            fill="url(#fallenLogGrad)"
            stroke="#291605"
            strokeWidth="5"
          />
          {/* Bark Ridges & Wood Cracks */}
          <path d="M1360,540 L1880,240" stroke="#291605" strokeWidth="4" />
          <path d="M1410,570 L1900,290" stroke="#3d1e08" strokeWidth="5" />
          <path d="M1470,595 L1910,340" stroke="#291605" strokeWidth="4" />
          {/* Moss on Top of Log */}
          <path
            d="M1340,510 C1400,480 1480,440 1560,400 C1650,350 1780,280 1900,210 L1920,240 C1780,310 1650,380 1540,430 C1460,470 1380,510 1330,530 Z"
            fill="url(#mossGrad)"
          />
        </g>

        {/* Forest Mushroom Cluster on Fallen Log (Cụm Nấm Rừng) */}
        <g
          id="mushrooms-group"
          className="cursor-pointer transition-transform duration-300 hover:scale-105 origin-[1660px_480px]"
          onClick={() => handleOrganismClick(organisms.find(o => o.id === 'mushrooms')!)}
          onMouseEnter={() => setHoveredOrganismId('mushrooms')}
          onMouseLeave={() => setHoveredOrganismId(null)}
        >
          {/* Selection Ring */}
          {selectedOrganism?.id === 'mushrooms' && (
            <ellipse cx="1660" cy="480" rx="130" ry="90" fill="none" stroke="#facc15" strokeWidth="6" strokeDasharray="12 8" />
          )}

          {/* Big Mushroom 1 */}
          {/* Stem */}
          <path d="M1650,440 Q1645,510 1665,550 L1685,550 Q1670,510 1675,440 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
          {/* Under cap gills */}
          <ellipse cx="1662" cy="445" rx="72" ry="24" fill="#d97706" />
          {/* Cap */}
          <path
            d="M1590,445 C1590,380 1735,380 1735,445 C1735,455 1590,455 1590,445 Z"
            fill="#d97706"
            stroke="#78350f"
            strokeWidth="4"
          />
          <path
            d="M1600,440 C1600,395 1725,395 1725,440 Z"
            fill="#f59e0b"
          />

          {/* Medium Mushroom 2 (Left) */}
          <path d="M1585,490 Q1575,540 1590,565 L1605,565 Q1595,540 1600,490 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
          <ellipse cx="1592" cy="492" rx="46" ry="16" fill="#d97706" />
          <path
            d="M1546,492 C1546,445 1638,445 1638,492 Z"
            fill="#b45309"
            stroke="#78350f"
            strokeWidth="3.5"
          />
          <path d="M1555,488 C1555,455 1630,455 1630,488 Z" fill="#d97706" />

          {/* Baby Mushroom 3 (Right) */}
          <path d="M1710,500 L1722,545 L1732,545 L1725,500 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
          <path d="M1695,500 C1695,465 1745,465 1745,500 Z" fill="#d97706" stroke="#78350f" strokeWidth="3" />
        </g>

        {/* Mossy River Shore Rocks on Right */}
        <g>
          <ellipse cx="1520" cy="580" rx="90" ry="40" fill="#78716c" />
          <ellipse cx="1520" cy="570" rx="75" ry="30" fill="url(#mossGrad)" />
          <ellipse cx="1680" cy="620" rx="110" ry="50" fill="#57534e" />
          <ellipse cx="1680" cy="610" rx="90" ry="36" fill="url(#mossGrad)" />
        </g>

        {/* Lush Reeds & Grass Clumps on Right Shore */}
        <g fill="#15803d" stroke="#14532d" strokeWidth="3">
          {/* Background reeds */}
          <path d="M1740,650 Q1710,530 1730,450 Q1760,530 1750,650 Z" />
          <path d="M1760,670 Q1780,510 1810,430 Q1790,520 1780,670 Z" />
          <path d="M1790,690 Q1830,550 1860,470 Q1830,550 1810,690 Z" />
          <path d="M1720,720 Q1680,600 1660,520 Q1700,600 1740,720 Z" />
        </g>

        {/* Hidden Green Tree/Pond Frog (Ếch Đồng Xanh - Khéo léo nấp sau bụi sậy) */}
        <g
          id="frog-group"
          className="cursor-pointer transition-transform duration-300 hover:scale-110 origin-[1780px_790px]"
          onClick={() => handleOrganismClick(organisms.find(o => o.id === 'frog')!)}
          onMouseEnter={() => setHoveredOrganismId('frog')}
          onMouseLeave={() => setHoveredOrganismId(null)}
        >
          {/* Selection Ring */}
          {selectedOrganism?.id === 'frog' && (
            <ellipse cx="1780" cy="790" rx="100" ry="70" fill="none" stroke="#facc15" strokeWidth="6" strokeDasharray="12 8" />
          )}

          {/* Frog Body peeking out from grass */}
          {/* Back feet with webbing */}
          <path d="M1730,810 Q1700,815 1690,830 Q1710,835 1740,825 Z" fill="#16a34a" stroke="#14532d" strokeWidth="2.5" />
          {/* Rounded Body */}
          <ellipse cx="1780" cy="795" rx="70" ry="46" fill="#22c55e" stroke="#15803d" strokeWidth="4" />
          {/* Light belly */}
          <ellipse cx="1770" cy="815" rx="48" ry="24" fill="#bbf7d0" />
          {/* Skin Spots */}
          <circle cx="1750" cy="785" r="5" fill="#14532d" />
          <circle cx="1775" cy="775" r="7" fill="#14532d" />
          <circle cx="1805" cy="785" r="6" fill="#14532d" />
          <circle cx="1790" cy="800" r="4" fill="#14532d" />

          {/* Big Golden Bulging Frog Eyes */}
          {/* Left Eye */}
          <ellipse cx="1740" cy="755" rx="16" ry="18" fill="#eab308" stroke="#15803d" strokeWidth="3" />
          <ellipse cx="1740" cy="755" rx="9" ry="12" fill="#0f172a" />
          <circle cx="1737" cy="750" r="3.5" fill="#ffffff" />
          {/* Right Eye */}
          <ellipse cx="1785" cy="755" rx="16" ry="18" fill="#eab308" stroke="#15803d" strokeWidth="3" />
          <ellipse cx="1785" cy="755" rx="9" ry="12" fill="#0f172a" />
          <circle cx="1782" cy="750" r="3.5" fill="#ffffff" />

          {/* Friendly Mouth Line */}
          <path d="M1735,785 Q1765,800 1795,785" fill="none" stroke="#14532d" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* Overlapping foreground reed blades in front of frog (creating realistic natural hide-and-seek camouflage) */}
        <g fill="#16a34a" stroke="#14532d" strokeWidth="3">
          <path d="M1820,860 Q1800,750 1760,700 Q1790,750 1840,860 Z" />
          <path d="M1840,890 Q1870,740 1890,660 Q1860,760 1850,890 Z" />
          <path d="M1720,880 Q1740,780 1730,730 Q1750,780 1740,880 Z" />
        </g>

        {/* ---------------- 8. LEFT SHORE: MASSIVE ANCIENT TREE, BRANCHES & CANOPY ---------------- */}
        {/* Ancient Tree Trunk on Left */}
        <g
          id="ancient-tree-group"
          className="cursor-pointer"
          onClick={() => handleOrganismClick(organisms.find(o => o.id === 'ancient_tree')!)}
          onMouseEnter={() => setHoveredOrganismId('ancient_tree')}
          onMouseLeave={() => setHoveredOrganismId(null)}
        >
          {/* Massive Tree Trunk */}
          <path
            d="M-40,0 L240,0 C260,200 240,400 280,600 C310,750 350,850 400,950 L-40,1080 Z"
            fill="url(#treeBarkGrad)"
            stroke="#291605"
            strokeWidth="6"
          />

          {/* Bark Furrows & Grooves */}
          <g stroke="#291605" strokeWidth="5" fill="none">
            <path d="M80,0 Q120,300 100,600 Q90,750 140,950" />
            <path d="M150,0 Q200,250 170,550 Q160,700 220,950" />
            <path d="M210,0 Q240,200 220,400" />
            {/* Tree hollow */}
            <ellipse cx="140" cy="450" rx="28" ry="48" fill="#1c0d02" />
          </g>

          {/* Big Horizontal Branch extending right towards water */}
          <path
            d="M240,220 Q380,210 520,250 L520,285 Q360,260 250,300 Z"
            fill="url(#treeBarkGrad)"
            stroke="#291605"
            strokeWidth="5"
          />
        </g>

        {/* Wildflower shrub at the base of the tree */}
        <g id="wildflower-shrub">
          {/* Leaves */}
          <path d="M110,650 Q80,560 140,530 Q160,590 110,650 Z" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
          <path d="M140,630 Q180,540 220,530 Q190,600 140,630 Z" fill="#16a34a" stroke="#15803d" strokeWidth="3" />
          <path d="M150,560 Q120,470 170,440 Q180,500 150,560 Z" fill="#22c55e" stroke="#15803d" strokeWidth="3" />

          {/* White Wildflowers (Hoa dại trắng nhụy vàng) */}
          {[
            { cx: 170, cy: 380, r: 16 },
            { cx: 215, cy: 425, r: 18 },
            { cx: 140, cy: 470, r: 15 },
          ].map((flower, idx) => (
            <g key={`flower-${idx}`}>
              {/* Petals */}
              <circle cx={flower.cx} cy={flower.cy - flower.r} r={flower.r * 0.75} fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <circle cx={flower.cx + flower.r} cy={flower.cy} r={flower.r * 0.75} fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <circle cx={flower.cx} cy={flower.cy + flower.r} r={flower.r * 0.75} fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <circle cx={flower.cx - flower.r} cy={flower.cy} r={flower.r * 0.75} fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <circle cx={flower.cx + flower.r * 0.7} cy={flower.cy - flower.r * 0.7} r={flower.r * 0.7} fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              {/* Golden Center */}
              <circle cx={flower.cx} cy={flower.cy} r={flower.r * 0.6} fill="#facc15" stroke="#eab308" strokeWidth="2" />
            </g>
          ))}
        </g>

        {/* Lush Tree Foliage Canopy Clusters */}
        <g fill="#16a34a" stroke="#15803d" strokeWidth="4">
          <ellipse cx="220" cy="120" rx="120" ry="70" fill="#22c55e" />
          <ellipse cx="360" cy="90" rx="140" ry="80" fill="#16a34a" />
          <ellipse cx="480" cy="110" rx="100" ry="60" fill="#22c55e" />
          <ellipse cx="280" cy="40" rx="160" ry="80" fill="#15803d" />
          <ellipse cx="420" cy="50" rx="130" ry="70" fill="#4ade80" />
        </g>

        {/* ---------------- 9. KINGFISHER BIRD (CHIM BÓI CÁ) ---------------- */}
        <g
          id="kingfisher-group"
          className="cursor-pointer transition-transform duration-300 hover:scale-110 origin-[380px_200px]"
          onClick={() => handleOrganismClick(organisms.find(o => o.id === 'kingfisher')!)}
          onMouseEnter={() => setHoveredOrganismId('kingfisher')}
          onMouseLeave={() => setHoveredOrganismId(null)}
        >
          {/* Highlight Selection Ring */}
          {selectedOrganism?.id === 'kingfisher' && (
            <ellipse cx="380" cy="200" rx="110" ry="110" fill="none" stroke="#facc15" strokeWidth="6" strokeDasharray="12 8" />
          )}

          {/* Bird Perched Claws on Branch */}
          <path d="M375,275 L365,285 M378,275 L375,288 M385,275 L390,285" stroke="#9a3412" strokeWidth="4" strokeLinecap="round" />

          {/* Tail */}
          <path d="M350,260 L335,320 L360,310 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />

          {/* Vibrant Orange Chest & Belly */}
          <path
            d="M360,180 C360,250 420,270 420,250 C420,210 390,180 360,180 Z"
            fill="#ea580c"
            stroke="#c2410c"
            strokeWidth="3.5"
          />

          {/* Brilliant Turquoise Back & Wing */}
          <path
            d="M335,160 C320,200 330,270 380,270 C360,230 360,180 335,160 Z"
            fill="#06b6d4"
            stroke="#0891b2"
            strokeWidth="3.5"
          />
          {/* Wing Feather Accents */}
          <path d="M345,190 Q370,230 365,260" fill="none" stroke="#0284c7" strokeWidth="3" />
          <path d="M338,205 Q360,240 355,265" fill="none" stroke="#0284c7" strokeWidth="3" />

          {/* Head */}
          <ellipse cx="370" cy="145" rx="32" ry="26" fill="#0284c7" stroke="#0369a1" strokeWidth="3.5" />
          {/* White Neck Stripe */}
          <ellipse cx="350" cy="165" rx="12" ry="8" fill="#ffffff" />
          {/* Orange Cheek Patch */}
          <ellipse cx="385" cy="155" rx="14" ry="10" fill="#f97316" />

          {/* Eye */}
          <circle cx="388" cy="140" r="8" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <circle cx="388" cy="140" r="5" fill="#0f172a" />
          <circle cx="386" cy="138" r="2" fill="#ffffff" />

          {/* Sharp Long Dagger-like Beak */}
          <path
            d="M398,142 L500,182 L398,155 Z"
            fill="#1e293b"
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </g>

        {/* ---------------- 10. MAGNIFYING GLASS & LADYBUG ON LEAF (BỌ RÙA & KÍNH LÚP) ---------------- */}
        {/* Large prominent green leaf on lower left */}
        <g id="ladybug-leaf">
          <path
            d="M200,820 C180,640 450,560 540,740 C520,860 300,920 200,820 Z"
            fill="#22c55e"
            stroke="#15803d"
            strokeWidth="6"
          />
          {/* Central Leaf Vein */}
          <path d="M220,810 Q350,730 520,740" fill="none" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />
          <path d="M300,765 Q330,710 380,700" fill="none" stroke="#16a34a" strokeWidth="4" />
          <path d="M380,740 Q410,690 460,685" fill="none" stroke="#16a34a" strokeWidth="4" />
          <path d="M350,755 Q380,800 430,810" fill="none" stroke="#16a34a" strokeWidth="4" />
        </g>

        {/* Magnifying Glass Fixture Frame (Focusing on Ladybug) */}
        <g
          id="ladybug-group"
          className="cursor-pointer transition-transform duration-300 hover:scale-105 origin-[370px_725px]"
          onClick={() => handleOrganismClick(organisms.find(o => o.id === 'ladybug')!)}
          onMouseEnter={() => setHoveredOrganismId('ladybug')}
          onMouseLeave={() => setHoveredOrganismId(null)}
        >
          {/* Handle of the Magnifying Glass */}
          <g filter="url(#magnifierShadow)">
            <path
              d="M210,885 L60,1035 C45,1050 65,1070 80,1055 L230,905 Z"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="6"
            />
            {/* Grip detail */}
            <path d="M120,975 L140,995 M150,945 L170,965" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Heavy Metallic Magnifier Rim */}
          <circle
            cx="360"
            cy="735"
            r="195"
            fill="#ffffff"
            fillOpacity="0.08"
            stroke="#0f172a"
            strokeWidth="28"
          />
          <circle
            cx="360"
            cy="735"
            r="185"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="6"
          />

          {/* Glass Lens Reflection Glint */}
          <path
            d="M220,670 C240,600 310,560 380,560"
            fill="none"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Zoomed Detailed Ladybug (Bọ Rùa 7 Sao Đỏ Chót) */}
          <g transform="translate(360, 735) scale(1.1) translate(-360, -735)">
            {/* Legs */}
            <g stroke="#0f172a" strokeWidth="6" strokeLinecap="round" fill="none">
              <path d="M330,710 L280,690 L260,705" />
              <path d="M330,735 L270,740 L250,755" />
              <path d="M330,760 L280,785 L265,810" />
              <path d="M390,710 L440,690 L460,705" />
              <path d="M390,735 L450,740 L470,755" />
              <path d="M390,760 L440,785 L455,810" />
            </g>

            {/* Antennae */}
            <path d="M345,670 Q325,640 315,645" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
            <path d="M375,670 Q395,640 405,645" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />

            {/* Head and Pronotum (Black and white patches) */}
            <ellipse cx="360" cy="675" rx="34" ry="24" fill="#0f172a" stroke="#020617" strokeWidth="3" />
            <ellipse cx="340" cy="670" rx="9" ry="6" fill="#ffffff" />
            <ellipse cx="380" cy="670" rx="9" ry="6" fill="#ffffff" />

            {/* Glossy Red Elytra Shell (Cánh Cứng Đỏ) */}
            <ellipse cx="360" cy="740" rx="72" ry="80" fill="#dc2626" stroke="#991b1b" strokeWidth="4" />
            {/* Split line */}
            <line x1="360" y1="680" x2="360" y2="820" stroke="#0f172a" strokeWidth="4" />

            {/* Seven Famous Black Dots (7 Chấm Đen Huyền Thoại) */}
            {/* 1. Center top spot on seam */}
            <circle cx="360" cy="700" r="11" fill="#0f172a" />
            {/* 2 & 3. Left and right upper spots */}
            <circle cx="325" cy="725" r="12" fill="#0f172a" />
            <circle cx="395" cy="725" r="12" fill="#0f172a" />
            {/* 4 & 5. Left and right middle spots */}
            <circle cx="315" cy="765" r="13" fill="#0f172a" />
            <circle cx="405" cy="765" r="13" fill="#0f172a" />
            {/* 6 & 7. Left and right lower spots */}
            <circle cx="340" cy="800" r="10" fill="#0f172a" />
            <circle cx="380" cy="800" r="10" fill="#0f172a" />

            {/* Shiny Highlight on Red Shell */}
            <path d="M310,710 C320,685 345,675 355,675" fill="none" stroke="#fca5a5" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
          </g>
        </g>

        {/* ---------------- 11. DRAGONFLY (CHUỒN CHUỒN) ---------------- */}
        <g
          id="dragonfly-group"
          className="cursor-pointer transition-transform duration-300 hover:scale-110 origin-[900px_410px]"
          onClick={() => handleOrganismClick(organisms.find(o => o.id === 'dragonfly')!)}
          onMouseEnter={() => setHoveredOrganismId('dragonfly')}
          onMouseLeave={() => setHoveredOrganismId(null)}
        >
          {/* Highlight selection */}
          {selectedOrganism?.id === 'dragonfly' && (
            <ellipse cx="900" cy="410" rx="90" ry="70" fill="none" stroke="#facc15" strokeWidth="6" strokeDasharray="12 8" />
          )}

          {/* Transparent delicate wings */}
          <g fill="#e0f2fe" fillOpacity="0.65" stroke="#38bdf8" strokeWidth="2.5">
            {/* Top Left Wing */}
            <ellipse cx="850" cy="385" rx="55" ry="14" transform="rotate(-18 850 385)" />
            {/* Bottom Left Wing */}
            <ellipse cx="855" cy="410" rx="48" ry="12" transform="rotate(-6 855 410)" />
            {/* Top Right Wing */}
            <ellipse cx="945" cy="385" rx="55" ry="14" transform="rotate(18 945 385)" />
            {/* Bottom Right Wing */}
            <ellipse cx="940" cy="410" rx="48" ry="12" transform="rotate(6 940 410)" />
          </g>

          {/* Slender Red Dragonfly Body */}
          <line x1="900" y1="365" x2="900" y2="455" stroke="#ef4444" strokeWidth="7" strokeLinecap="round" />
          {/* Head & Big Compound Eyes */}
          <circle cx="895" cy="365" r="7" fill="#0284c7" />
          <circle cx="905" cy="365" r="7" fill="#0284c7" />
          <circle cx="900" cy="370" r="5" fill="#dc2626" />
        </g>

        {/* ---------------- 12. CIRCULAR CLUE BADGES (BIỂU TƯỢNG GỢI Ý HÌNH ẢNH) ---------------- */}
        {/*
          As explicitly requested by user:
          "Thêm một vài kính lúp và biểu tượng gợi ý bằng hình ảnh như dấu chân, chiếc lá hoặc gợn sóng, giúp học sinh tìm kiếm sinh vật."
          "Không chèn chữ, không ký tự, không logo, không watermark."
          These badges have pure pictorial silhouettes inside warm ivory circles with dark green borders, exactly as shown in the reference image!
        */}
        {showClueBadges && !isCleanMode && (
          <g id="clue-badges-layer">
            {/* 1. Bird Clue Badge near Kingfisher */}
            <g
              transform="translate(540, 120)"
              filter="url(#badgeShadow)"
              className="cursor-pointer transition-transform duration-300 hover:scale-115"
              onClick={() => handleOrganismClick(organisms.find(o => o.id === 'kingfisher')!)}
            >
              <circle cx="0" cy="0" r="48" fill="#fef9c3" stroke="#14532d" strokeWidth="6" />
              {/* Bird Silhouette */}
              <path
                d="M-22,6 C-15,-12 5,-18 20,-6 C28,0 35,4 30,8 C18,12 8,20 -10,18 C-20,16 -26,12 -22,6 Z M18,-6 L32,-14 L24,-4 Z"
                fill="#14532d"
              />
            </g>

            {/* 2. Plant / Wildflower Leaf Clue Badge near Tree trunk */}
            <g
              transform="translate(370, 420)"
              filter="url(#badgeShadow)"
              className="cursor-pointer transition-transform duration-300 hover:scale-115"
              onClick={() => handleOrganismClick(organisms.find(o => o.id === 'ancient_tree')!)}
            >
              <circle cx="0" cy="0" r="54" fill="#fef9c3" stroke="#14532d" strokeWidth="6" />
              {/* Plant Silhouette */}
              <g fill="#14532d">
                <line x1="0" y1="28" x2="0" y2="-12" stroke="#14532d" strokeWidth="5" strokeLinecap="round" />
                <ellipse cx="-14" cy="8" rx="12" ry="7" transform="rotate(-30 -14 8)" />
                <ellipse cx="14" cy="4" rx="12" ry="7" transform="rotate(30 14 4)" />
                <ellipse cx="-12" cy="-8" rx="10" ry="6" transform="rotate(-25 -12 -8)" />
                <ellipse cx="12" cy="-12" rx="10" ry="6" transform="rotate(25 12 -12)" />
                <circle cx="0" cy="-22" r="12" />
                <circle cx="-10" cy="-20" r="7" />
                <circle cx="10" cy="-20" r="7" />
              </g>
            </g>

            {/* 3. Bug Clue Badge near Ladybug */}
            <g
              transform="translate(320, 840)"
              filter="url(#badgeShadow)"
              className="cursor-pointer transition-transform duration-300 hover:scale-115"
              onClick={() => handleOrganismClick(organisms.find(o => o.id === 'ladybug')!)}
            >
              <circle cx="0" cy="0" r="48" fill="#fef9c3" stroke="#14532d" strokeWidth="6" />
              {/* Beetle silhouette */}
              <g fill="#14532d">
                <ellipse cx="0" cy="4" rx="18" ry="22" />
                <ellipse cx="0" cy="-18" rx="10" ry="8" />
                <path d="M-15,-6 L-28,-14 M15,-6 L28,-14 M-18,6 L-30,8 M18,6 L30,8 M-15,16 L-26,26 M15,16 L26,26" stroke="#14532d" strokeWidth="4" strokeLinecap="round" />
                <path d="M-6,-24 L-12,-30 M6,-24 L12,-30" stroke="#14532d" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>

            {/* 4. Fish Clue Badge in Underwater Section */}
            <g
              transform="translate(910, 835)"
              filter="url(#badgeShadow)"
              className="cursor-pointer transition-transform duration-300 hover:scale-115"
              onClick={() => handleOrganismClick(organisms.find(o => o.id === 'carp')!)}
            >
              <circle cx="0" cy="0" r="52" fill="#fef9c3" stroke="#14532d" strokeWidth="6" />
              {/* Fish Silhouette */}
              <g fill="#14532d">
                <path d="M-26,0 C-10,-18 16,-14 26,0 C16,14 -10,18 -26,0 Z" />
                <polygon points="-26,0 -38,-14 -34,0 -38,14" />
                <polygon points="4,-14 16,-20 18,-10" />
              </g>
            </g>

            {/* 5. Mushroom Clue Badge near Log */}
            <g
              transform="translate(1780, 360)"
              filter="url(#badgeShadow)"
              className="cursor-pointer transition-transform duration-300 hover:scale-115"
              onClick={() => handleOrganismClick(organisms.find(o => o.id === 'mushrooms')!)}
            >
              <circle cx="0" cy="0" r="50" fill="#fef9c3" stroke="#14532d" strokeWidth="6" />
              {/* Mushroom silhouette */}
              <g fill="#14532d">
                {/* Big cap */}
                <path d="M-22,0 C-22,-24 22,-24 22,0 Z" />
                <rect x="-6" y="0" width="12" height="22" rx="3" />
                {/* Small cap */}
                <path d="M12,8 C12,-6 32,-6 32,8 Z" />
                <rect x="18" y="8" width="8" height="14" rx="2" />
              </g>
            </g>

            {/* 6. Ripple / Water Clue Badge near Lotus */}
            <g
              transform="translate(1120, 640)"
              filter="url(#badgeShadow)"
              className="cursor-pointer transition-transform duration-300 hover:scale-115"
              onClick={() => handleOrganismClick(organisms.find(o => o.id === 'lotus')!)}
            >
              <circle cx="0" cy="0" r="38" fill="#fef9c3" stroke="#14532d" strokeWidth="5" />
              {/* Water Wave Ripple Icon */}
              <path
                d="M-20,-6 Q-10,-14 0,-6 Q10,2 20,-6 M-20,6 Q-10,-2 0,6 Q10,14 20,6"
                fill="none"
                stroke="#14532d"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </g>

            {/* 7. Footprint / Track Clue Badge near Dragonfly / Reed area */}
            <g
              transform="translate(1720, 670)"
              filter="url(#badgeShadow)"
              className="cursor-pointer transition-transform duration-300 hover:scale-115"
              onClick={() => handleOrganismClick(organisms.find(o => o.id === 'frog')!)}
            >
              <circle cx="0" cy="0" r="38" fill="#fef9c3" stroke="#14532d" strokeWidth="5" />
              {/* Webbed Frog Footprint Silhouette */}
              <g fill="#14532d">
                <ellipse cx="0" cy="8" rx="8" ry="10" />
                <path d="M-12,-8 L-6,4 L-2,-14 L2,4 L12,-8 L2,8 L-6,8 Z" />
              </g>
            </g>
          </g>
        )}

        {/* ---------------- 13. INTERACTIVE DISCOVERY CHECKMARKS ---------------- */}
        {!isCleanMode && (
          <g id="discovery-markers">
            {organisms.map((org) => {
              const isFound = discoveredIds.includes(org.id);
              if (!isFound) return null;
              const cx = (org.xPercent / 100) * 1920;
              const cy = (org.yPercent / 100) * 1080;
              return (
                <g key={`marker-${org.id}`} transform={`translate(${cx}, ${cy})`} className="pointer-events-none animate-bounce">
                  <circle cx="0" cy="0" r="22" fill="#22c55e" stroke="#ffffff" strokeWidth="4" />
                  <path d="M-8,1 L-2,7 L8,-5" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              );
            })}
          </g>
        )}
      </svg>

      {/* Hover Tooltip Preview (Only when not in clean mode) */}
      {!isCleanMode && hoveredOrganismId && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-slate-900/90 text-white rounded-full text-sm font-semibold tracking-wide backdrop-blur-md shadow-xl flex items-center gap-2.5 pointer-events-none border border-white/20 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>
            {organisms.find(o => o.id === hoveredOrganismId)?.vietnameseName} - Nhấp để khám phá chi tiết
          </span>
        </div>
      )}
    </div>
  );
};
