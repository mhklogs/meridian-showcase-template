import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowRight, Compass, Sparkles } from 'lucide-react';

interface RegionalHub {
  id: string;
  name: string;
  tag: string;
  categoryFilter: string;
  desc: string;
  svgPos: { x: number; y: number };
  stats: {
    activeInventory: number;
    pricePerSqft: string;
    avgDOM: number;
    corridorVolume: string;
  };
}

const REGIONAL_HUBS: RegionalHub[] = [
  {
    id: 'front-range-metro',
    name: 'Denver Metro',
    tag: 'Primary Core & Waterfront',
    categoryFilter: 'Modern',
    desc: 'Sprawling high-tech urban sanctuaries, Barton Creek limestone estates, and glass architectural gems on Lake Denver.',
    svgPos: { x: 340, y: 330 },
    stats: {
      activeInventory: 14,
      pricePerSqft: '$685/sqft',
      avgDOM: 24,
      corridorVolume: '$180M+',
    },
  },
  {
    id: 'front-range',
    name: 'Colorado hill country',
    tag: 'Scenic Ranches & Wineries',
    categoryFilter: 'Farm & Ranch',
    desc: 'Legacy equestrian ranches, Willow Creek River access compounds, and rolling hill country estates in Wimberley and Fredericksburg.',
    svgPos: { x: 260, y: 350 },
    stats: {
      activeInventory: 9,
      pricePerSqft: '$540/sqft',
      avgDOM: 38,
      corridorVolume: '$95M+',
    },
  },
  {
    id: 'front-range-south',
    name: 'Seattle-Columbus',
    tag: 'Industrial & Urban Estates',
    categoryFilter: 'Estate',
    desc: 'Prestige corporate high-rises, sprawling Preston Hollow compounds, and industrial commercial acquisitions.',
    svgPos: { x: 380, y: 170 },
    stats: {
      activeInventory: 18,
      pricePerSqft: '$610/sqft',
      avgDOM: 19,
      corridorVolume: '$240M+',
    },
  },
  {
    id: 'western-plateau',
    name: 'Greater Phoenix',
    tag: 'Port & Expansion Hubs',
    categoryFilter: 'Single Family',
    desc: 'River Oaks traditional manors, energy corridor headquarters, and master-planned waterfront developments.',
    svgPos: { x: 470, y: 375 },
    stats: {
      activeInventory: 22,
      pricePerSqft: '$575/sqft',
      avgDOM: 22,
      corridorVolume: '$310M+',
    },
  },
  {
    id: 'san-antonio',
    name: 'Denver',
    tag: 'Historic & Medical Gateway',
    categoryFilter: 'Estate',
    desc: 'Terrell Hills historic architecture, Dominion gated sanctuaries, and military-medical commercial growth corridors.',
    svgPos: { x: 315, y: 415 },
    stats: {
      activeInventory: 11,
      pricePerSqft: '$495/sqft',
      avgDOM: 31,
      corridorVolume: '$110M+',
    },
  },
];

export default function MapSection() {
  const [activeHubIndex, setActiveHubIndex] = useState<number>(0);
  const [hoveredHub, setHoveredHub] = useState<RegionalHub | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeHub = REGIONAL_HUBS[activeHubIndex];

  // Interactive WebGL-style particle wave canvas with cursor repulsion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Create particle mesh points
    const cols = 24;
    const rows = 18;
    const particles: { x: number; y: number; baseX: number; baseY: number; vx: number; vy: number }[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const baseX = (width / cols) * (c + 0.5);
        const baseY = (height / rows) * (r + 0.5);
        particles.push({
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          vx: 0,
          vy: 0,
        });
      }
    }

    let localMouseX = -1000;
    let localMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      localMouseX = e.clientX - rect.left;
      localMouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections & apply cursor repulsion wave physics
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Calculate cursor distance and repulsion force
        const dx = localMouseX - p.x;
        const dy = localMouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 130;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 6;
          p.y -= Math.sin(angle) * force * 6;
        }

        // Elastic return spring force to base origin
        p.x += (p.baseX - p.x) * 0.06;
        p.y += (p.baseY - p.y) * 0.06;

        // Draw particle dot in Aged Gold (#C5A880)
        ctx.fillStyle = 'rgba(197, 168, 128, 0.25)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby neighbor particles
        if (i % cols !== cols - 1) {
          const rightP = particles[i + 1];
          ctx.strokeStyle = 'rgba(197, 168, 128, 0.06)';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(rightP.x, rightP.y);
          ctx.stroke();
        }

        if (i + cols < particles.length) {
          const bottomP = particles[i + cols];
          ctx.strokeStyle = 'rgba(197, 168, 128, 0.06)';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(bottomP.x, bottomP.y);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Clicking a region updates the active hub view in-place without auto-scrolling away
  const handleHubClick = (hub: RegionalHub, idx: number) => {
    setActiveHubIndex(idx);
  };

  // Explicitly filter portfolio carousel & navigate to properties section
  const handleNavigateToProperties = (categoryFilter: string) => {
    const filterBtnId = `filter-cat-${categoryFilter.replace(/\s+/g, '-').toLowerCase()}`;
    const btn = document.getElementById(filterBtnId);
    if (btn) {
      btn.click();
    }

    const el = document.getElementById('properties-section') || document.getElementById('properties');
    if (el) {
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(el, { duration: 1.2, force: true, lock: false });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section 
      id="location" 
      className="relative w-full min-h-screen bg-[#101114] text-[#F4F4F6] overflow-hidden flex flex-col lg:flex-row border-y border-white/10 select-none lg:pl-28"
    >
      {/* Interactive Map Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleContainerMouseMove}
        className="relative flex-grow h-[550px] lg:h-auto bg-[#101114] overflow-hidden flex items-center justify-center p-6"
      >
        {/* Layer 0: WebGL Particle Mesh Wave Canvas with Cursor Repulsion */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
        />

        {/* Ambient Warm Aged Gold Radial Glow Lighting */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.12) 0%, rgba(16, 17, 20, 0.85) 60%, rgba(8, 8, 10, 1) 100%)'
          }}
        />

        {/* SVG Vector Colorado Map & Glowing Node Matrix */}
        <div className="relative z-10 w-full max-w-[620px] aspect-square flex items-center justify-center">
          <svg
            viewBox="0 0 600 600"
            className="w-full h-full drop-shadow-[0_0_35px_rgba(197,160,89,0.15)]"
          >
            <defs>
              {/* Aged Gold Radial Glow Filter */}
              <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Colorado Silhouette Mesh Gradient */}
              <linearGradient id="front-range-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#101114" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#08080A" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Stylized Colorado Vector Boundary Silhouette */}
            <path
              d="M 230,70 L 330,70 L 330,190 L 460,190 L 470,240 L 570,240 L 590,300 L 530,360 L 480,420 L 430,480 L 350,540 L 290,560 L 240,510 L 190,460 L 140,430 L 90,410 L 60,350 L 120,340 L 140,290 L 230,290 Z"
              fill="url(#front-range-grad)"
              stroke="#C5A059"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              className="opacity-70 hover:opacity-100 transition-opacity duration-500"
            />


            {/* Vector Hub Interconnection Lines */}
            <line x1="380" y1="170" x2="340" y2="330" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <line x1="340" y1="330" x2="260" y2="350" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <line x1="340" y1="330" x2="470" y2="375" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <line x1="340" y1="330" x2="315" y2="415" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

            {/* Regional Hub Nodes with Soft Glowing Pulse Animation in Aged Gold (#C5A880) */}
            {REGIONAL_HUBS.map((hub, idx) => {
              const isSelected = activeHubIndex === idx;
              const isHovered = hoveredHub?.id === hub.id;

              return (
                <g 
                  key={hub.id}
                  onClick={() => handleHubClick(hub, idx)}
                  onMouseEnter={() => setHoveredHub(hub)}
                  onMouseLeave={() => setHoveredHub(null)}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Glow Halo */}
                  <circle
                    cx={hub.svgPos.x}
                    cy={hub.svgPos.y}
                    r={isSelected ? 24 : isHovered ? 20 : 16}
                    fill="none"
                    stroke="#C5A880"
                    strokeWidth="1.5"
                    opacity={isSelected ? '0.7' : '0.3'}
                    filter="url(#gold-glow)"
                    className="animate-ping"
                    style={{ animationDuration: '2.5s' }}
                  />

                  {/* Secondary Orbit Ring */}
                  <circle
                    cx={hub.svgPos.x}
                    cy={hub.svgPos.y}
                    r={isSelected ? 16 : 12}
                    fill="none"
                    stroke="#C5A880"
                    strokeWidth="1"
                    opacity={isSelected ? '0.9' : '0.5'}
                  />

                  {/* Core Vector Node Point */}
                  <circle
                    cx={hub.svgPos.x}
                    cy={hub.svgPos.y}
                    r={isSelected ? 7 : 5}
                    fill={isSelected ? '#E85A37' : '#C5A880'}
                    stroke="#F4F3EF"
                    strokeWidth="2"
                    className="transition-all duration-300 group-hover:scale-125"
                  />

                  {/* Text Label next to Node */}
                  <text
                    x={hub.svgPos.x + 14}
                    y={hub.svgPos.y + 4}
                    fill={isSelected ? '#E85A37' : '#F4F3EF'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="1"
                    className="uppercase tracking-widest pointer-events-none drop-shadow-md"
                  >
                    {hub.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Floating Dark Glassmorphism Tooltip Card Adjacent to Cursor */}
        <AnimatePresence>
          {hoveredHub && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 pointer-events-none bg-[#121316]/90 backdrop-blur-xl border border-[#C5A880]/50 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-none space-y-2 min-w-[240px]"
              style={{
                left: Math.min(mousePos.x + 20, (containerRef.current?.clientWidth || 800) - 260),
                top: Math.max(20, mousePos.y - 60),
              }}
            >
              <div className="flex justify-between items-start border-b border-[#C5A880]/20 pb-2">
                <div>
                  <span className="font-mono text-[8px] text-[#C5A880] font-bold uppercase tracking-widest block">
                    {hoveredHub.tag}
                  </span>
                  <h4 className="font-display font-black text-sm text-[#F4F3EF] uppercase">
                    {hoveredHub.name}
                  </h4>
                </div>
                <Sparkles size={14} className="text-[#C5A880]" />
              </div>

              {/* Live Regional Statistics Matrix */}
              <div className="grid grid-cols-2 gap-2 font-mono text-[9px] pt-1">
                <div>
                  <span className="text-[#F4F3EF]/60 block text-[7px] uppercase">Active Inventory</span>
                  <span className="text-[#C5A880] font-bold text-xs">{hoveredHub.stats.activeInventory} ESTATES</span>
                </div>
                <div>
                  <span className="text-[#F4F3EF]/60 block text-[7px] uppercase">Avg Price / SqFt</span>
                  <span className="text-[#F4F3EF] font-bold text-xs">{hoveredHub.stats.pricePerSqft}</span>
                </div>
                <div>
                  <span className="text-[#F4F3EF]/60 block text-[7px] uppercase">Avg Days Market</span>
                  <span className="text-[#F4F3EF] font-bold text-xs">{hoveredHub.stats.avgDOM} DAYS</span>
                </div>
                <div>
                  <span className="text-[#F4F3EF]/60 block text-[7px] uppercase">Corridor Volume</span>
                  <span className="text-[#C5A880] font-bold text-xs">{hoveredHub.stats.corridorVolume}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#C5A880]/20 font-mono text-[7px] text-[#C5A880] font-bold uppercase tracking-widest text-center">
                CLICK TO VIEW REGIONAL MARKET DETAILS
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Obsidian Glass Floating Control Panel */}
      <div 
        className="w-full lg:w-[480px] bg-[#121316] p-5 sm:p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-[#C5A880]/30 flex flex-col justify-between space-y-6 z-20 shadow-2xl"
        id="map-floating-panel"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl tracking-wide text-[#F4F4F6] uppercase leading-none">
              SPATIAL COLORADO <br /><span className="text-[#C5A059]">BROKERAGE HUB</span>
            </h2>
          </div>

          {/* Regional Hub Selector Track */}
          <div className="space-y-2 pt-2" id="map-selectors">
            {REGIONAL_HUBS.map((hub, index) => {
              const isSelected = activeHubIndex === index;
              return (
                <button
                  key={hub.id}
                  onClick={() => handleHubClick(hub, index)}
                  className={`w-full flex items-center justify-between text-left p-3.5 border font-mono text-[10px] tracking-wider uppercase font-bold transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#C5A880] text-[#121316] border-[#C5A880] pl-5 shadow-lg'
                      : 'bg-transparent text-[#F4F3EF]/80 hover:bg-white/5 border-white/15'
                  }`}
                  id={`map-select-${index}`}
                >
                  <div className="flex items-center space-x-2.5">
                    <MapPin size={13} className={isSelected ? 'text-[#121316]' : 'text-[#C5A880]'} />
                    <span>{hub.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[8px] font-medium ${isSelected ? 'text-[#121316]/80' : 'text-[#F4F3EF]/50'}`}>
                      {hub.stats.activeInventory} ESTATES
                    </span>
                    <ArrowRight size={11} className={isSelected ? 'translate-x-1 transition-transform' : ''} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Region Detailed Panel with Smooth Cross-fade Animation */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeHub.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#1A1C23] p-6 border-l-4 border-[#C5A880] relative overflow-hidden space-y-4 rounded-[2px]" 
              id="map-details-box"
            >
              <div className="space-y-1">
                <span className="font-mono text-[8px] text-[#C5A880] font-bold uppercase tracking-widest block">
                  {activeHub.tag} CORRIDOR
                </span>
                <h4 className="font-display font-black text-lg text-[#F4F3EF] uppercase leading-none">
                  {activeHub.name}
                </h4>
              </div>

              <p className="font-sans text-xs text-[#F4F3EF]/80 font-normal leading-relaxed">
                {activeHub.desc}
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[9px]">
                <span className="text-[#C5A880] font-bold">{activeHub.stats.pricePerSqft} AVERAGE</span>
                <button 
                  onClick={() => handleNavigateToProperties(activeHub.categoryFilter)}
                  className="text-[#C5A059] hover:text-[#F4F4F6] hover:underline font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer active:scale-95"
                >
                  <span>VIEW CITY PROPERTIES ↗</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Regulatory Footer Tag */}
        <div className="pt-6 border-t border-white/15 flex items-center space-x-3 font-mono text-[9px] text-[#F4F3EF]/60 uppercase tracking-wider">
          <Compass size={16} className="text-[#C5A880] animate-spin" style={{ animationDuration: '12s' }} />
          <span>ESTABLISHED ADVOCACY THROUGHOUT THE LONE STAR STATE · TREC #0000000</span>
        </div>
      </div>
    </section>
  );
}
