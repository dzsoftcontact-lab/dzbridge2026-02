import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ALGERIAN_WILAYAS, DIASPORA_HUBS } from '../data/mockData';
import { AlgerianWilaya, DiasporaHub } from '../types';

interface WorldAlgeriaMapProps {
  onSelectWilaya?: (wilaya: AlgerianWilaya) => void;
  activeWilaya?: AlgerianWilaya | null;
  onSelectHub?: (hub: DiasporaHub) => void;
}

interface ActiveBeam {
  id: string;
  fromHub: DiasporaHub;
  toWilaya: AlgerianWilaya;
  progress: number; // 0 to 1
  speed: number;
  color: string;
  domain: string;
}

export const WorldAlgeriaMap: React.FC<WorldAlgeriaMapProps> = ({
  onSelectWilaya,
  activeWilaya: propActiveWilaya,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeBeams, setActiveBeams] = useState<ActiveBeam[]>([]);
  const [currentConnection, setCurrentConnection] = useState<{
    from: string;
    to: string;
    domain: string;
  } | null>(null);
  const [highlightedWilaya, setHighlightedWilaya] = useState<AlgerianWilaya | null>(null);
  const [zoomMode, setZoomMode] = useState<'global' | 'algeria'>('global');

  // Trigger a beam from a diaspora hub to a random Algerian wilaya
  const triggerRandomConnection = useCallback((specificWilaya?: AlgerianWilaya) => {
    const randomHub = DIASPORA_HUBS[Math.floor(Math.random() * DIASPORA_HUBS.length)];
    // Ensure we pick diverse wilayas, not just the capital!
    const targetWilaya = specificWilaya || ALGERIAN_WILAYAS[Math.floor(Math.random() * ALGERIAN_WILAYAS.length)];

    const domains = [
      'Artificial Intelligence & Robotics',
      'Renewable Energy & Green Hydrogen',
      'Microelectronics & EDA',
      'Biotechnology & Clinical Research',
      'Quantum Computing & Algorithms',
      'Civil Engineering & Infrastructure',
      'Solar Physics & Desert Tech',
      'Agro-food & Water Security',
    ];
    const domain = domains[Math.floor(Math.random() * domains.length)];

    const newBeam: ActiveBeam = {
      id: `${Date.now()}-${Math.random()}`,
      fromHub: randomHub,
      toWilaya: targetWilaya,
      progress: 0,
      speed: 0.008 + Math.random() * 0.006,
      color: '#C9A24B',
      domain,
    };

    setActiveBeams((prev) => [...prev.slice(-4), newBeam]);
    setCurrentConnection({
      from: `${randomHub.name} (${randomHub.country})`,
      to: `${targetWilaya.name} (${targetWilaya.universities[0] || 'Wilaya ' + targetWilaya.code})`,
      domain,
    });
    setHighlightedWilaya(targetWilaya);
  }, []);

  // Periodic random connection trigger
  useEffect(() => {
    triggerRandomConnection();
    const interval = setInterval(() => {
      triggerRandomConnection();
    }, 4500);

    return () => clearInterval(interval);
  }, [triggerRandomConnection]);

  // Canvas rendering for full-page particle network and animated geodesic beams
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate ambient background floating particles
    const particleCount = Math.min(Math.floor(width / 24), 65);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.4 + 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle atmospheric particle web
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 75, ${p.alpha})`;
        ctx.fill();

        // Connect nearby ambient particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(201, 162, 75, ${(1 - dist / 110) * 0.08})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Animate geodesic beams
      setActiveBeams((prevBeams) => {
        const updated = prevBeams.map((beam) => {
          const nextProgress = beam.progress + beam.speed;

          // Convert hub and target to screen coordinates
          // Hubs are distributed globally; Algeria is prominently centered in the Mediterranean/North African quadrant
          const startX = (beam.fromHub.x / 100) * width;
          const startY = (beam.fromHub.y / 100) * height;

          // Target wilaya coordinate in Algeria zone:
          // Algeria bounding box in page coordinates:
          const algeriaBaseX = width * 0.52;
          const algeriaBaseY = height * 0.42;
          const algeriaSpanX = Math.min(width * 0.32, 420);
          const algeriaSpanY = Math.min(height * 0.38, 440);

          const targetX = algeriaBaseX + ((beam.toWilaya.xPercent - 50) / 100) * algeriaSpanX;
          const targetY = algeriaBaseY + ((beam.toWilaya.yPercent - 35) / 100) * algeriaSpanY;

          // Control point for curved arc
          const midX = (startX + targetX) / 2;
          const midY = Math.min(startY, targetY) - Math.abs(startX - targetX) * 0.22 - 40;

          // Draw faint guideline
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.quadraticCurveTo(midX, midY, targetX, targetY);
          ctx.strokeStyle = 'rgba(201, 162, 75, 0.15)';
          ctx.setLineDash([4, 6]);
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.setLineDash([]);

          // Compute current head on quadratic bezier curve
          const t = Math.min(1, Math.max(0, beam.progress));
          const currentX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * targetX;
          const currentY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * targetY;

          // Draw glowing head
          const glowGrad = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 14);
          glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          glowGrad.addColorStop(0.3, 'rgba(201, 162, 75, 0.8)');
          glowGrad.addColorStop(1, 'rgba(201, 162, 75, 0)');

          ctx.beginPath();
          ctx.arc(currentX, currentY, 12, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          // If reached destination, draw ripple pulse on the target Algerian wilaya
          if (t >= 0.92) {
            const rippleR = (t - 0.92) * 250;
            ctx.beginPath();
            ctx.arc(targetX, targetY, rippleR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(201, 162, 75, ${Math.max(0, 1 - (t - 0.92) / 0.08)})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          return { ...beam, progress: nextProgress };
        });

        // Filter out completed beams
        return updated.filter((b) => b.progress <= 1.08);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const active = propActiveWilaya || highlightedWilaya;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Dynamic Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Prominent High-Definition Algeria Map Overlay Layer (Elevated, visible, not hidden behind blurry text) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center px-4">
          {/* Subtle World Grid Lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-35"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="world-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="rgba(58, 2, 51, 0.05)"
                  strokeWidth="0.8"
                />
                <circle cx="0" cy="0" r="1.5" fill="rgba(201, 162, 75, 0.3)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#world-grid)" />
          </svg>

          {/* Interactive Diaspora Hub Markers on World Map */}
          <div className="absolute inset-0 pointer-events-none">
            {DIASPORA_HUBS.map((hub) => (
              <div
                key={hub.id}
                style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer"
                onClick={() => {
                  triggerRandomConnection();
                }}
                title={`${hub.name} (${hub.institution})`}
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-6 h-6 rounded-full bg-gold-500/20 animate-ping" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-500 ring-2 ring-white shadow-sm" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-plum-900/90 text-white text-[11px] rounded shadow-lg whitespace-nowrap pointer-events-none z-30 font-sans backdrop-blur-sm border border-gold-500/30">
                  <span className="font-semibold text-gold-400">{hub.name}</span>
                  <span className="block text-[10px] text-stone-300">{hub.institution}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Central Elevated Algeria Silhouette with Wilaya Nodes */}
          <div className="relative w-full max-w-[780px] h-[580px] my-auto pointer-events-auto">
            {/* Algeria Map Contour SVG */}
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full drop-shadow-xl overflow-visible transition-transform duration-700 ease-out"
            >
              <defs>
                <linearGradient id="algeriaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3A0233" stopOpacity="0.12" />
                  <stop offset="40%" stopColor="#C9A24B" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#28011F" stopOpacity="0.08" />
                </linearGradient>
                <filter id="algeriaGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Algeria Official Geographic Boundary Path */}
              <path
                d="M 185 55 
                   L 215 48 L 245 42 L 280 40 L 315 42 L 350 48 L 380 42 L 398 50 
                   L 410 75 L 420 110 L 415 140 L 400 170 L 415 200 L 430 235 L 445 270 
                   L 460 305 L 440 330 L 410 360 L 375 395 L 340 435 L 310 465 L 285 470 
                   L 255 460 L 235 435 L 220 405 L 180 370 L 140 330 L 95 285 L 60 250 
                   L 35 220 L 45 190 L 70 175 L 95 160 L 120 145 L 145 130 L 155 105 L 170 85 Z"
                fill="url(#algeriaGrad)"
                stroke="#C9A24B"
                strokeWidth="2.2"
                strokeLinejoin="round"
                className="transition-colors duration-500 hover:stroke-gold-400"
              />

              {/* Internal Inter-Wilaya High-Speed Collaboration Corridors */}
              <g stroke="rgba(201, 162, 75, 0.4)" strokeWidth="1" strokeDasharray="3,4" fill="none">
                {/* Coastal Tech Axis: Oran - Alger - Constantine - Annaba */}
                <path d="M 155 105 Q 245 68 280 62" />
                <path d="M 280 62 Q 345 64 380 75" />
                <path d="M 380 75 L 410 75" />
                {/* High Plateaus & Saharan Hubs: Alger to Ouargla & Ghardaia */}
                <path d="M 280 62 Q 310 160 345 250" />
                <path d="M 155 105 Q 185 180 285 240" />
                <path d="M 380 75 Q 360 170 345 250" />
                <path d="M 285 240 L 345 250" />
              </g>

              {/* Interactive Wilaya Pins across Algeria */}
              {ALGERIAN_WILAYAS.map((wilaya) => {
                // Approximate coordinate mapping to 500x500 SVG
                // North coast spans x: 140 to 420, y: 50 to 95
                // South reaches y: 250 to 320
                const mapX = 60 + (wilaya.xPercent / 100) * 380;
                const mapY = 40 + (wilaya.yPercent / 100) * 400;
                const isSelected = active?.code === wilaya.code;

                return (
                  <g
                    key={wilaya.code}
                    className="cursor-pointer group"
                    onClick={() => {
                      onSelectWilaya?.(wilaya);
                      setHighlightedWilaya(wilaya);
                      triggerRandomConnection(wilaya);
                    }}
                  >
                    {/* Pulsing ring if selected/active */}
                    {isSelected && (
                      <circle
                        cx={mapX}
                        cy={mapY}
                        r="14"
                        fill="none"
                        stroke="#C9A24B"
                        strokeWidth="1.5"
                        className="animate-ping origin-center opacity-75"
                      />
                    )}

                    {/* Outer node circle */}
                    <circle
                      cx={mapX}
                      cy={mapY}
                      r={isSelected ? '6' : '4'}
                      fill={isSelected ? '#3A0233' : '#C9A24B'}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? '2' : '1.5'}
                      className="transition-all duration-300 group-hover:r-6 group-hover:fill-plum-800"
                    />

                    {/* Wilaya Label */}
                    <text
                      x={mapX}
                      y={mapY - 9}
                      textAnchor="middle"
                      className={`text-[9px] font-sans font-semibold tracking-wide fill-stone-800 select-none transition-all duration-200 ${
                        isSelected ? 'fill-plum-900 font-bold text-[10px]' : 'group-hover:fill-plum-800'
                      }`}
                    >
                      {wilaya.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Quick Helper Badge */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full border border-stone-200 text-xs text-stone-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span>Interactive Network: Click any Wilaya or Diaspora Hub to route a connection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Active Connection Alert (Live Bridge Notification) */}
      {currentConnection && (
        <div className="absolute top-20 right-6 z-20 max-w-sm pointer-events-auto">
          <div className="p-3 bg-white/95 dark:bg-plum-950/90 backdrop-blur-md border border-gold-500/30 rounded-xl shadow-lg transition-all duration-300 text-xs">
            <div className="flex items-center justify-between text-[11px] font-mono text-gold-700 dark:text-gold-400 mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                LIVE DIASPORA LINK
              </span>
              <span>Active</span>
            </div>
            <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <span>{currentConnection.from}</span>
              <span className="text-gold-600">➔</span>
              <span className="text-plum-900 dark:text-gold-400">{currentConnection.to}</span>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">
              Field: {currentConnection.domain}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
