import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Navigation, 
  Coffee, 
  Mountain, 
  Copy, 
  Check, 
  Compass, 
  Clock, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Landmark {
  id: string;
  name: string;
  category: string;
  distance: string;
  x: number; // SVG viewBox coordinates 0 - 800
  y: number; // SVG viewBox coordinates 0 - 500
  description: string;
}

export const HillStationMap: React.FC = () => {
  const { settings, setActivePage } = useApp();
  const [hoveredPoint, setHoveredPoint] = useState<string | null>('cafe');
  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'scenic' | 'trail'>('all');

  const landmarks: Landmark[] = [
    {
      id: 'orchard',
      name: 'Old Valley Apple Orchards',
      category: 'scenic',
      distance: '600m West',
      x: 230,
      y: 290,
      description: 'Organic heritage orchard where our seasonal apple and pear juices are cold-pressed fresh daily.'
    },
    {
      id: 'lookout',
      name: 'Misty Ridge Sunset Pass',
      category: 'scenic',
      distance: '1.1 km North-East',
      x: 620,
      y: 160,
      description: 'Scenic alpine ridge overlooking the cloud sea and Great Himalayan snow lines.'
    },
    {
      id: 'trail',
      name: 'Cedar Forest Ridge Trailhead',
      category: 'trail',
      distance: '1.5 km South-East',
      x: 580,
      y: 380,
      description: 'Pine-scented woodland walking trail connecting the hilltop shrine to Pinecrest Café terrace.'
    },
    {
      id: 'spring',
      name: 'Mineral Mountain Glacial Spring',
      category: 'trail',
      distance: '900m South-West',
      x: 320,
      y: 430,
      description: 'Pristine mineral stream source used exclusively for our pour-overs, cold brew, and espresso extractions.'
    }
  ];

  // Pinecrest Cafe coordinates on the map
  const cafeCoords = { x: 410, y: 220 };

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(settings.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredLandmarks = activeFilter === 'all' 
    ? landmarks 
    : landmarks.filter(l => l.category === activeFilter);

  return (
    <div className="w-full bg-[#140D09] rounded-3xl border border-[#2B170E] overflow-hidden shadow-2xl">
      {/* Map Header Controls */}
      <div className="p-4 sm:p-6 border-b border-[#26150C] bg-[#1A110B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26170E] border border-[#3A2215] text-xs font-semibold text-[#E6B87D] mb-1.5">
            <Compass className="w-3.5 h-3.5 text-[#E6B87D]" />
            <span>Interactive Alpine Topography</span>
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF5EF]">
            Café Hill Station Topography Map
          </h3>
          <p className="text-xs sm:text-sm text-[#A8988C] mt-0.5">
            Hover or tap any landmark to inspect elevation, winding approach paths, and scenic vistas.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-[#120B07] p-1 rounded-2xl border border-[#301B11] self-start sm:self-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-[#991B1B] to-[#B91C1C] text-white shadow-md'
                : 'text-[#A8988C] hover:text-white'
            }`}
          >
            All Points
          </button>
          <button
            onClick={() => setActiveFilter('scenic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'scenic'
                ? 'bg-gradient-to-r from-[#991B1B] to-[#B91C1C] text-white shadow-md'
                : 'text-[#A8988C] hover:text-white'
            }`}
          >
            Scenic Spots
          </button>
          <button
            onClick={() => setActiveFilter('trail')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'trail'
                ? 'bg-gradient-to-r from-[#991B1B] to-[#B91C1C] text-white shadow-md'
                : 'text-[#A8988C] hover:text-white'
            }`}
          >
            Hiking Trails
          </button>
        </div>
      </div>

      {/* SVG Map Canvas Area */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[380px] sm:min-h-[460px] bg-[#0A0604] overflow-hidden select-none">
        
        {/* Soft Background Grid / Topo Grid Lines */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#E6B87D 0.75px, transparent 0.75px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Vector SVG Mountain Topography in Luxury Dark Palette */}
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="darkSlopeGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1C120B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#120A06" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="darkSlopeGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#25160E" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#160D08" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="darkRidgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D1A10" />
              <stop offset="100%" stopColor="#1A0F09" />
            </linearGradient>

            <linearGradient id="darkRiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B3A36" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#132B28" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Background Distant Mountain Peaks */}
          <path
            d="M -20,280 L 110,130 L 220,240 L 370,100 L 510,230 L 670,80 L 820,260 L 820,500 L -20,500 Z"
            fill="url(#darkSlopeGrad1)"
          />

          {/* Middle Mountain Ridge Slope */}
          <path
            d="M -20,330 L 140,210 L 280,310 L 410,170 L 560,290 L 710,190 L 820,320 L 820,500 L -20,500 Z"
            fill="url(#darkSlopeGrad2)"
          />

          {/* Foreground Plateau Ridge (Where the Cafe is Perched) */}
          <path
            d="M -20,400 Q 150,330 330,300 Q 430,220 540,260 Q 690,320 820,360 L 820,500 L -20,500 Z"
            fill="url(#darkRidgeGrad)"
          />

          {/* Alpine Valley Spring River */}
          <path
            d="M 60,500 C 120,440 180,410 240,430 C 300,450 380,440 450,490 C 490,520 520,500 550,500"
            fill="none"
            stroke="url(#darkRiverGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Elevation Topographic Contour Lines */}
          <path
            d="M 160,260 Q 280,240 400,230 Q 520,240 640,250"
            fill="none"
            stroke="#4A2F20"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.8"
          />
          <text x="648" y="254" fill="#A88B77" fontSize="9" fontWeight="600">6,500 Ft</text>

          <path
            d="M 220,220 Q 320,195 410,190 Q 500,195 600,215"
            fill="none"
            stroke="#6B412B"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.9"
          />
          <text x="608" y="219" fill="#E6B87D" fontSize="9" fontWeight="bold">6,800 Ft (Café Ridge)</text>

          <path
            d="M 280,180 Q 350,155 410,150 Q 480,155 540,175"
            fill="none"
            stroke="#4A2F20"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.8"
          />
          <text x="548" y="179" fill="#A88B77" fontSize="9" fontWeight="600">7,100 Ft</text>

          {/* Winding Alpine Approach Road */}
          <path
            d="M -10,470 C 80,440 160,390 220,350 C 290,300 320,290 350,260 C 380,230 400,225 410,220 C 430,215 480,240 550,230 C 620,220 700,200 810,180"
            fill="none"
            stroke="#3B2215"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M -10,470 C 80,440 160,390 220,350 C 290,300 320,290 350,260 C 380,230 400,225 410,220 C 430,215 480,240 550,230 C 620,220 700,200 810,180"
            fill="none"
            stroke="#E6B87D"
            strokeWidth="2.5"
            strokeDasharray="6 5"
            strokeLinecap="round"
          />

          {/* Stylized Pine Trees on Slopes */}
          {[
            { x: 130, y: 310, scale: 0.9 },
            { x: 155, y: 325, scale: 1.1 },
            { x: 180, y: 305, scale: 0.8 },
            { x: 270, y: 260, scale: 0.9 },
            { x: 300, y: 275, scale: 1.2 },
            { x: 470, y: 250, scale: 1.0 },
            { x: 500, y: 265, scale: 0.8 },
            { x: 670, y: 220, scale: 1.1 },
            { x: 700, y: 240, scale: 0.9 },
            { x: 730, y: 215, scale: 1.0 },
            { x: 340, y: 340, scale: 1.3 },
            { x: 380, y: 355, scale: 1.0 },
          ].map((tree, idx) => (
            <g key={idx} transform={`translate(${tree.x}, ${tree.y}) scale(${tree.scale})`} opacity="0.75">
              <line x1="0" y1="0" x2="0" y2="12" stroke="#4A3020" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="0,-18 -8,-7 8,-7" fill="#1C3827" />
              <polygon points="0,-11 -10,-1 10,-1" fill="#172F21" />
              <polygon points="0,-4 -12,6 12,6" fill="#12251A" />
            </g>
          ))}

          {/* Surrounding Landmark Markers */}
          {filteredLandmarks.map((lm) => {
            const isHovered = hoveredPoint === lm.id;
            return (
              <g 
                key={lm.id}
                className="cursor-pointer transition-transform duration-200"
                onMouseEnter={() => setHoveredPoint(lm.id)}
                onClick={() => setHoveredPoint(lm.id)}
              >
                <circle
                  cx={lm.x}
                  cy={lm.y}
                  r={isHovered ? 16 : 11}
                  fill={isHovered ? '#991B1B' : '#1C120B'}
                  fillOpacity={isHovered ? 0.35 : 0.9}
                  stroke="#E6B87D"
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all duration-200"
                />
                <circle
                  cx={lm.x}
                  cy={lm.y}
                  r={isHovered ? 5 : 3.5}
                  fill="#E6B87D"
                />
                <rect
                  x={lm.x - 45}
                  y={lm.y + 12}
                  width="90"
                  height="16"
                  rx="8"
                  fill="#1C120B"
                  fillOpacity="0.95"
                  stroke="#3A2215"
                  strokeWidth="1"
                />
                <text
                  x={lm.x}
                  y={lm.y + 23}
                  textAnchor="middle"
                  fill="#FAF5EF"
                  fontSize="8.5"
                  fontWeight="600"
                >
                  {lm.name.split(' ')[0]} {lm.name.split(' ')[1] || ''}
                </text>
              </g>
            );
          })}

          {/* MAIN PINPOINT: PINECREST CAFE & JUICERY */}
          <g 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredPoint('cafe')}
            onClick={() => setHoveredPoint('cafe')}
          >
            {/* Animated Radar Pulse Rings */}
            <circle
              cx={cafeCoords.x}
              cy={cafeCoords.y}
              r="28"
              fill="#991B1B"
              fillOpacity="0.3"
              className="animate-ping origin-center"
              style={{ transformOrigin: `${cafeCoords.x}px ${cafeCoords.y}px` }}
            />
            <circle
              cx={cafeCoords.x}
              cy={cafeCoords.y}
              r="20"
              fill="#1A110B"
              stroke="#991B1B"
              strokeWidth="2.5"
              className="shadow-md"
            />
            <circle
              cx={cafeCoords.x}
              cy={cafeCoords.y}
              r="13"
              fill="#991B1B"
            />

            {/* Glowing Center Coffee Icon Vector */}
            <path
              d={`M ${cafeCoords.x - 5} ${cafeCoords.y - 3} 
                 L ${cafeCoords.x + 3} ${cafeCoords.y - 3} 
                 L ${cafeCoords.x + 2} ${cafeCoords.y + 3} 
                 A 4 4 0 0 1 ${cafeCoords.x - 4} ${cafeCoords.y + 3} 
                 Z`}
              fill="#FAF5EF"
            />
            <path
              d={`M ${cafeCoords.x + 3} ${cafeCoords.y - 2} 
                 A 2 2 0 0 1 ${cafeCoords.x + 5} ${cafeCoords.y} 
                 A 2 2 0 0 1 ${cafeCoords.x + 2} ${cafeCoords.y + 1}`}
              fill="none"
              stroke="#FAF5EF"
              strokeWidth="1.2"
            />

            {/* Prominent Floating Banner Tag */}
            <g transform={`translate(${cafeCoords.x}, ${cafeCoords.y - 36})`}>
              <rect
                x="-80"
                y="-14"
                width="160"
                height="26"
                rx="13"
                fill="#120A06"
                stroke="#E6B87D"
                strokeWidth="1.5"
                filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fill="#FAF5EF"
                fontSize="10"
                fontWeight="bold"
                letterSpacing="0.4"
              >
                ★ PINECREST CAFÉ (6,800 FT)
              </text>
            </g>
          </g>

          {/* Compass Rose in Corner */}
          <g transform="translate(740, 60) scale(0.85)">
            <circle cx="0" cy="0" r="24" fill="#1A110B" fillOpacity="0.9" stroke="#381F14" strokeWidth="1.5" />
            <polygon points="0,-18 5,-4 0,-7" fill="#991B1B" />
            <polygon points="0,-18 -5,-4 0,-7" fill="#E6B87D" />
            <polygon points="0,18 5,4 0,7" fill="#991B1B" opacity="0.6" />
            <polygon points="0,18 -5,4 0,7" fill="#E6B87D" opacity="0.6" />
            <polygon points="18,0 4,5 7,0" fill="#E6B87D" opacity="0.6" />
            <polygon points="-18,0 -4,5 -7,0" fill="#E6B87D" opacity="0.6" />
            <text x="0" y="-21" textAnchor="middle" fill="#FAF5EF" fontSize="8" fontWeight="bold">N</text>
            <text x="0" y="27" textAnchor="middle" fill="#A8988C" fontSize="7" fontWeight="bold">S</text>
            <text x="24" y="2.5" textAnchor="middle" fill="#A8988C" fontSize="7" fontWeight="bold">E</text>
            <text x="-24" y="2.5" textAnchor="middle" fill="#A8988C" fontSize="7" fontWeight="bold">W</text>
          </g>
        </svg>

        {/* Hover / Tap Floating Detail Card Overlay */}
        <AnimatePresence>
          {hoveredPoint === 'cafe' && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md bg-[#140D09]/95 backdrop-blur-md rounded-2xl border border-[#3A2215] p-4 sm:p-5 shadow-2xl space-y-3 z-20 text-[#FAF5EF]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#991B1B] to-[#B91C1C] text-white flex items-center justify-center shadow-md shrink-0 border border-red-400/30">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-display text-lg font-bold text-[#FAF5EF] leading-tight">
                      Pinecrest Hill Station Café & Juicery
                    </h4>
                    <span className="text-[11px] font-semibold text-[#E6B87D] flex items-center gap-1 mt-0.5">
                      <Mountain className="w-3.5 h-3.5" /> Elevation: 6,800 Ft • High Alpine Pass
                    </span>
                  </div>
                </div>
              </div>

              {/* Address with Copy Button */}
              <div className="p-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-4 h-4 text-[#E6B87D] shrink-0" />
                  <span className="truncate text-[#D6C7B8]">{settings.address}</span>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="px-2.5 py-1 rounded-lg bg-[#2A1910] hover:bg-[#382114] text-[#E6B87D] border border-[#482819] font-medium text-[11px] shrink-0 flex items-center gap-1 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#A8988C] pt-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E6B87D]" />
                  <span>{settings.openingHours}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#E6B87D]" />
                  <span>Valley Parking Available</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-[#26150C]">
                <button
                  onClick={() => {
                    const encoded = encodeURIComponent(`${settings.name} ${settings.address}`);
                    window.open(`https://maps.google.com/?q=${encoded}`, '_blank');
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#1C120B] hover:bg-[#26180F] text-[#FAF5EF] border border-[#381F14] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#E6B87D]" />
                  <span>Open in Maps</span>
                </button>

                <button
                  onClick={() => {
                    setActivePage('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#991B1B] to-[#B91C1C] hover:from-[#7F1D1D] hover:to-[#991B1B] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <span>Explore Menu</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Surrounding Landmark Detail Card */}
          {hoveredPoint && hoveredPoint !== 'cafe' && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md bg-[#140D09]/95 backdrop-blur-md rounded-2xl border border-[#3A2215] p-4 shadow-2xl space-y-2.5 z-20 text-[#FAF5EF]"
            >
              {(() => {
                const item = landmarks.find(l => l.id === hoveredPoint);
                if (!item) return null;
                return (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-[#1C120B] text-[#E6B87D] border border-[#381F14]">
                          <Mountain className="w-4 h-4" />
                        </div>
                        <h4 className="font-serif-display text-base font-bold text-[#FAF5EF]">
                          {item.name}
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold text-[#E6B87D] bg-[#1C120B] px-2.5 py-0.5 rounded-full border border-[#381F14]">
                        {item.distance}
                      </span>
                    </div>

                    <p className="text-xs text-[#A8988C] leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-[#7A6B5F] border-t border-[#26150C]">
                      <span>Connected by Ridge Walking Trail</span>
                      <button
                        onClick={() => setHoveredPoint('cafe')}
                        className="text-[#E6B87D] font-semibold hover:underline"
                      >
                        Return to Café Pinpoint →
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map Legend & Mountain Access Guidelines Footer */}
      <div className="p-4 sm:p-5 bg-[#1A110B] border-t border-[#26150C] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs text-[#A8988C]">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-[#E6B87D] shrink-0" />
          <span><strong>Scenic Highway Approach:</strong> Accessible by all vehicles & shuttles</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full border-2 border-dashed border-[#E6B87D] shrink-0" />
          <span><strong>Elevation Marker:</strong> 6,800 Ft Valley Ridge Overlook</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-[#1C3827] shrink-0" />
          <span><strong>Orchard Sourcing:</strong> Organic heirloom apples picked within 1 km</span>
        </div>
      </div>
    </div>
  );
};
