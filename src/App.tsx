import React, { useEffect, useRef, useState } from 'react';

const ALGERIAN_WILAYAS = [
  { code: '16', name: 'Alger (Algiers)' },
  { code: '31', name: 'Oran' },
  { code: '25', name: 'Constantine' },
  { code: '23', name: 'Annaba' },
  { code: '19', name: 'Sétif' },
  { code: '13', name: 'Tlemcen' },
  { code: '07', name: 'Biskra' },
  { code: '47', name: 'Ghardaïa' },
  { code: '30', name: 'Ouargla' },
  { code: '08', name: 'Béchar' },
  { code: '37', name: 'Tindouf' },
  { code: '11', name: 'Tamanrasset' },
];

export default function App() {
  const [mode, setMode] = useState<'' | 'expert' | 'org'>('');
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  // Light and Dark theme toggle state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dz_bridge_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('dz_bridge_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background Canvas: Real World Map in fine dots (High-Visibility 35%) & Drifting Atmosphere
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;

    let W = (cv.width = window.innerWidth);
    let H = (cv.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let ps: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = [];

    const size = () => {
      if (!cv) return;
      W = cv.width = window.innerWidth * dpr;
      H = cv.height = window.innerHeight * dpr;
      ps = [];
      const n = Math.round(window.innerWidth / 24);
      for (let i = 0; i < n; i++) {
        ps.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22 * dpr,
          vy: (Math.random() - 0.5) * 0.22 * dpr,
          r: (Math.random() * 1.6 + 0.6) * dpr,
        });
      }
    };

    size();
    window.addEventListener('resize', size);

    let animId: number;
    const tick = () => {
      cx.clearRect(0, 0, W, H);

      // Ambient Drifting Golden Dots
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;

        cx.fillStyle = 'rgba(201, 162, 75, 0.5)';
        cx.beginPath();
        cx.arc(a.x, a.y, a.r, 0, 6.3);
        cx.fill();

        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const m = 130 * dpr;
          if (d < m) {
            cx.strokeStyle = 'rgba(201, 162, 75, ' + (0.2 * (1 - d / m)).toFixed(3) + ')';
            cx.lineWidth = dpr * 0.8;
            cx.beginPath();
            cx.moveTo(a.x, a.y);
            cx.lineTo(b.x, b.y);
            cx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(tick);
    };

    tick();

    const handlePointerMove = (e: MouseEvent) => {
      document.body.style.setProperty('--mx', (e.clientX / window.innerWidth - 0.5).toFixed(3));
      document.body.style.setProperty('--my', (e.clientY / window.innerHeight - 0.5).toFixed(3));
    };
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('resize', size);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const openModal = (type: string, title: string, subtitle: string) => {
    setModalType(type);
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setModalSuccess(false);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSuccess(true);
    setTimeout(() => {
      setModalType(null);
      setModalSuccess(false);
    }, 1500);
  };

  return (
    <>
      {/* Living background */}
      <div className="bg" aria-hidden="true">
        <i className="blob b-1"></i>
        <i className="blob b-2"></i>
        <i className="blob b-3"></i>
        <i className="dots"></i>
        <canvas id="fx" ref={canvasRef}></canvas>
        <i className="grain"></i>
      </div>

      {/* SVG Definitions */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <symbol id="i-user" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4.5 20c.9-3.7 3.9-6 7.5-6s6.6 2.3 7.5 6" />
          </symbol>
          <symbol id="i-org" viewBox="0 0 24 24">
            <path d="M4.5 20.5V5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 14.5 5v15.5M14.5 9.5h4a1 1 0 0 1 1 1v10M2.5 20.5h19M8 7.5h3M8 11h3M8 14.5h3" />
          </symbol>
          <symbol id="i-mic" viewBox="0 0 24 24">
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
          </symbol>
          <symbol id="i-collab" viewBox="0 0 24 24">
            <circle cx="8.5" cy="12" r="5" />
            <circle cx="15.5" cy="12" r="5" />
          </symbol>
          <symbol id="i-meet" viewBox="0 0 24 24">
            <path d="M4 5h16v11H9l-5 4z" />
            <path d="M8 9.5h8M8 12.5h5" />
          </symbol>
          <symbol id="i-arrow" viewBox="0 0 20 20">
            <path d="M4 10h11M11 5l5 5-5 5" />
          </symbol>
          <symbol id="i-back" viewBox="0 0 20 20">
            <path d="M16 10H5M9 5l-5 5 5 5" />
          </symbol>
          <symbol id="i-bridge" viewBox="0 0 24 24">
            <path d="M2 18h20M5 18V8M19 18V8M5 8C8 15 16 15 19 8M2 12l3-4M22 12l-3-4M9 14v4M12 15v3M15 14v4" />
          </symbol>

          {/* Shihab Shooting Star Radiant Gradient */}
          <linearGradient id="shihabGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.05" />
            <stop offset="65%" stopColor="#C9A24B" stopOpacity="0.8" />
            <stop offset="92%" stopColor="#FFF2B2" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="gMap" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8d4a86" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9A24B" stopOpacity="0.45" />
          </linearGradient>

          <pattern id="worldDotPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="rgba(201, 162, 75, 0.08)" />
            <circle cx="5" cy="5" r="1.2" fill="#C9A24B" fillOpacity="0.55" />
          </pattern>

          <linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a0722" />
            <stop offset=".55" stopColor="#6d2a5a" />
            <stop offset="1" stopColor="#e2a672" />
          </linearGradient>
          <radialGradient id="gSpot" cx=".32" cy=".25" r=".7">
            <stop offset="0%" stopColor="#fff" stopOpacity=".38" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e6b995" />
            <stop offset=".6" stopColor="#c58d65" />
            <stop offset="1" stopColor="#9c6342" />
          </linearGradient>
          <linearGradient id="gSuit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4a2d5a" />
            <stop offset="1" stopColor="#1d0d26" />
          </linearGradient>
          <linearGradient id="gHair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a2a26" />
            <stop offset="1" stopColor="#0d0707" />
          </linearGradient>
          <linearGradient id="gCol" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fffdf6" />
            <stop offset=".55" stopColor="#eadfc8" />
            <stop offset="1" stopColor="#b9a98a" />
          </linearGradient>
          <linearGradient id="gWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff7e6" />
            <stop offset="1" stopColor="#e3d4b6" />
          </linearGradient>
          <linearGradient id="gWave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset=".25" stopColor="#000" stopOpacity=".16" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".16" />
            <stop offset=".75" stopColor="#000" stopOpacity=".14" />
            <stop offset="1" stopColor="#fff" stopOpacity=".1" />
          </linearGradient>
          <clipPath id="arch">
            <path d="M10 440V150a140 140 0 0 1 280 0V440Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Header */}
      <header className="top">
        <div className="wrap">
          <a
            className="brand"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMode('');
            }}
          >
            <span className="mark">
              <svg className="ico" width="22" height="22">
                <use href="#i-bridge" />
              </svg>
            </span>
            DZ-Bridge
          </a>
          
          <div className="top-actions">
            {/* Seamless Light/Dark Mode Switcher */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                /* Sun Icon */
                <svg
                  className="theme-ico"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon Icon */
                <svg
                  className="theme-ico"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              className="btn btn-ghost"
              type="button"
              onClick={() =>
                openModal('login', 'Log In to DZ-Bridge', 'Access your proposals and institutional exchanges.')
              }
            >
              Log in
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="wrap">
        <div className={`stage ${mode ? `is-${mode}` : ''}`} id="stage" data-m={mode || undefined}>
          
          {/* Dynamic Animated Convergence Network: Random Links from Expert Head & Institution Head Meeting on the Central Algeria Map */}
          <div
            className="converge-network"
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 10,
              opacity: mode ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          >
            <svg
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="streamExpert1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#3A0233" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id="streamExpert2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3A0233" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#C9A24B" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="streamOrg1" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#3A0233" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id="streamOrg2" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#3A0233" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#C9A24B" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="1" />
                </linearGradient>

                <filter id="convergeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* EXPERT ORIGIN NODES (Head, Mind, Creative Aura) */}
              <g className="origin-expert">
                <circle cx="150" cy="180" r="4.5" fill="#C9A24B" filter="url(#convergeGlow)" />
                <circle
                  cx="150"
                  cy="180"
                  r="13"
                  fill="none"
                  stroke="#C9A24B"
                  strokeWidth="1.2"
                  strokeOpacity="0.55"
                  className="node-pulse"
                />
                <circle cx="140" cy="148" r="3" fill="#D4AF37" />
                <circle cx="170" cy="215" r="3" fill="#D4AF37" />
              </g>

              {/* INSTITUTION ORIGIN NODES (Dome, Observatory Spire, Colonnade) */}
              <g className="origin-org">
                <circle cx="850" cy="180" r="4.5" fill="#C9A24B" filter="url(#convergeGlow)" />
                <circle
                  cx="850"
                  cy="180"
                  r="13"
                  fill="none"
                  stroke="#C9A24B"
                  strokeWidth="1.2"
                  strokeOpacity="0.55"
                  className="node-pulse"
                />
                <circle cx="860" cy="148" r="3" fill="#D4AF37" />
                <circle cx="830" cy="215" r="3" fill="#D4AF37" />
              </g>

              {/* CONVERGING PATHS FROM EXPERT DIRECTLY TO THE MIDDLE OF ALGERIA MAP */}
              <g fill="none" stroke="#C9A24B" strokeWidth="1.2" strokeOpacity="0.22">
                <path d="M 140 148 C 240 75, 360 85, 500 118" />
                <path d="M 150 180 C 260 140, 375 115, 500 118" />
                <path d="M 170 215 C 280 220, 390 155, 500 118" />
                <path d="M 150 180 C 270 105, 380 105, 500 118" />
              </g>

              {/* Dynamic animated energy streams from Expert Head directly into the MIDDLE of Algeria Map */}
              <g fill="none" strokeWidth="2.2" strokeLinecap="round" filter="url(#convergeGlow)">
                <path
                  d="M 140 148 C 240 75, 360 85, 500 118"
                  stroke="url(#streamExpert1)"
                  className="flow-stream flow-stream-1"
                />
                <path
                  d="M 150 180 C 260 140, 375 115, 500 118"
                  stroke="url(#streamExpert2)"
                  className="flow-stream flow-stream-2"
                />
                <path
                  d="M 170 215 C 280 220, 390 155, 500 118"
                  stroke="url(#streamExpert1)"
                  className="flow-stream flow-stream-3"
                />
                <path
                  d="M 150 180 C 270 105, 380 105, 500 118"
                  stroke="url(#streamExpert2)"
                  className="flow-stream flow-stream-4"
                />
              </g>

              {/* CONVERGING PATHS FROM INSTITUTION DIRECTLY TO THE MIDDLE OF ALGERIA MAP */}
              <g fill="none" stroke="#C9A24B" strokeWidth="1.2" strokeOpacity="0.22">
                <path d="M 860 148 C 760 75, 640 85, 500 118" />
                <path d="M 850 180 C 740 140, 625 115, 500 118" />
                <path d="M 830 215 C 720 220, 610 155, 500 118" />
                <path d="M 850 180 C 730 105, 620 105, 500 118" />
              </g>

              {/* Dynamic animated energy streams from Institution Dome directly into the MIDDLE of Algeria Map */}
              <g fill="none" strokeWidth="2.2" strokeLinecap="round" filter="url(#convergeGlow)">
                <path
                  d="M 860 148 C 760 75, 640 85, 500 118"
                  stroke="url(#streamOrg1)"
                  className="flow-stream flow-stream-rev-1"
                />
                <path
                  d="M 850 180 C 740 140, 625 115, 500 118"
                  stroke="url(#streamOrg2)"
                  className="flow-stream flow-stream-rev-2"
                />
                <path
                  d="M 830 215 C 720 220, 610 155, 500 118"
                  stroke="url(#streamOrg1)"
                  className="flow-stream flow-stream-rev-3"
                />
                <path
                  d="M 850 180 C 730 105, 620 105, 500 118"
                  stroke="url(#streamOrg2)"
                  className="flow-stream flow-stream-rev-4"
                />
              </g>

              {/* Radiant meeting point and connection dots CONVERGING in the MIDDLE of the Algeria Map */}
              <g className="algeria-mid-convergence">
                <circle cx="500" cy="118" r="6" fill="#FFF2B2" stroke="#D4AF37" strokeWidth="2" filter="url(#convergeGlow)" className="impact-flare" />
                <circle cx="500" cy="118" r="3.5" fill="#FFFFFF" />
                <circle cx="500" cy="118" r="10" fill="none" stroke="#C9A24B" strokeWidth="1.6" className="node-pulse" />
                <circle cx="500" cy="118" r="18" fill="none" stroke="#F5D77F" strokeWidth="1.2" strokeOpacity="0.5" className="node-pulse" style={{ animationDelay: '-1.2s' }} />
              </g>
            </svg>
          </div>

          {/* Suspension Bridge Positioned Down at the Bottom under the Text:
              Pillars at the base of Expert (X=138) & Institution (X=862), low deck along the bottom, never overlapping text */}
          <div className="bridge" aria-hidden="true" style={{ opacity: mode ? 0 : 0.85 }}>
            <svg viewBox="0 0 1000 70" preserveAspectRatio="none">
              <defs>
                <linearGradient id="bridgeDeckGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.4" />
                  <stop offset="14%" stopColor="#C9A24B" stopOpacity="1" />
                  <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.9" />
                  <stop offset="86%" stopColor="#C9A24B" stopOpacity="1" />
                  <stop offset="100%" stopColor="#C9A24B" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="pillarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F5D77F" stopOpacity="1" />
                  <stop offset="100%" stopColor="#9A7424" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Roadway Decks along the bottom */}
              <path d="M0 58 H1000" stroke="url(#bridgeDeckGlow)" strokeWidth="2.5" />
              <path d="M0 64 H1000" stroke="#C9A24B" strokeOpacity="0.35" strokeWidth="1.2" />

              {/* PILLAR 1: DIRECTLY AT THE BASE OF EXPERT IMAGE (X = 138) */}
              <g className="pillar-expert">
                <line x1="135" y1="58" x2="135" y2="10" stroke="url(#pillarGrad)" strokeWidth="3" strokeLinecap="round" />
                <line x1="141" y1="58" x2="141" y2="10" stroke="url(#pillarGrad)" strokeWidth="3" strokeLinecap="round" />
                <line x1="135" y1="26" x2="141" y2="26" stroke="#C9A24B" strokeWidth="1.5" />
                <line x1="135" y1="42" x2="141" y2="42" stroke="#C9A24B" strokeWidth="1.5" />
                <circle cx="138" cy="9" r="3.5" fill="#F5D77F" stroke="#9A7424" strokeWidth="1.2" />
                <circle cx="138" cy="9" r="6" fill="none" stroke="#C9A24B" strokeWidth="1" strokeOpacity="0.5" className="node-pulse" />
              </g>

              {/* PILLAR 2: DIRECTLY AT THE BASE OF INSTITUTION IMAGE (X = 862) */}
              <g className="pillar-institution">
                <line x1="859" y1="58" x2="859" y2="10" stroke="url(#pillarGrad)" strokeWidth="3" strokeLinecap="round" />
                <line x1="865" y1="58" x2="865" y2="10" stroke="url(#pillarGrad)" strokeWidth="3" strokeLinecap="round" />
                <line x1="859" y1="26" x2="865" y2="26" stroke="#C9A24B" strokeWidth="1.5" />
                <line x1="859" y1="42" x2="865" y2="42" stroke="#C9A24B" strokeWidth="1.5" />
                <circle cx="862" cy="9" r="3.5" fill="#F5D77F" stroke="#9A7424" strokeWidth="1.2" />
                <circle cx="862" cy="9" r="6" fill="none" stroke="#C9A24B" strokeWidth="1" strokeOpacity="0.5" className="node-pulse" />
              </g>

              {/* SUSPENSION CABLES Low under the text */}
              <path d="M 0 58 Q 70 42, 138 10" stroke="#C9A24B" strokeWidth="2.2" fill="none" />
              <path d="M 138 10 Q 500 52, 862 10" stroke="#C9A24B" strokeWidth="2.4" fill="none" />
              <path d="M 138 14 Q 500 55, 862 14" stroke="#C9A24B" strokeOpacity="0.35" strokeWidth="1" fill="none" />
              <path d="M 862 10 Q 930 42, 1000 58" stroke="#C9A24B" strokeWidth="2.2" fill="none" />

              {/* VERTICAL SUSPENDERS connecting cable to deck at bottom */}
              <line x1="50" y1="50" x2="50" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="90" y1="36" x2="90" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="115" y1="22" x2="115" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />

              <line x1="180" y1="20" x2="180" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="220" y1="28" x2="220" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="260" y1="35" x2="260" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="300" y1="41" x2="300" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="340" y1="46" x2="340" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="380" y1="49" x2="380" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="420" y1="51" x2="420" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="460" y1="52" x2="460" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="500" y1="52" x2="500" y2="58" stroke="#C9A24B" strokeOpacity="0.5" strokeWidth="1.2" />
              <line x1="540" y1="52" x2="540" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="580" y1="51" x2="580" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="620" y1="49" x2="620" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="660" y1="46" x2="660" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="700" y1="41" x2="700" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="740" y1="35" x2="740" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="780" y1="28" x2="780" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="820" y1="20" x2="820" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />

              <line x1="885" y1="22" x2="885" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="910" y1="36" x2="910" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="950" y1="50" x2="950" y2="58" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />

              {/* Animated Light Pulses across the bottom deck */}
              <circle r="4.5" fill="#FFF2B2" stroke="#C9A24B" strokeWidth="1.2">
                <animateMotion dur="6s" repeatCount="indefinite" path="M 138 58 H 862" />
              </circle>
              <circle r="4" fill="#C9A24B">
                <animateMotion dur="6s" begin="-3s" repeatCount="indefinite" path="M 862 58 H 138" />
              </circle>
              <circle r="3" fill="#F5D77F">
                <animateMotion dur="7s" repeatCount="indefinite" path="M 138 10 Q 500 52, 862 10" />
              </circle>
              <circle r="3" fill="#F5D77F">
                <animateMotion dur="7s" begin="-3.5s" repeatCount="indefinite" path="M 862 10 Q 500 52, 138 10" />
              </circle>
            </svg>
          </div>

          {/* Central Section: Algeria Map on top, then DZ-Bridge, then the long sentence, then action picks */}
          <div className="mid">
            {/* 1. Algeria Map prominently ON TOP of text, connecting all edges */}
            <div className="algeria-hero-map-wrap" aria-label="Map of Algeria">
              <svg viewBox="0 0 380 380" className="algeria-hero-map">
                <path
                  className="shape"
                  d="M130.7 48L128.8 48L137.1 44L150.2 35.8L155.7 33L162.7 31.2L176.8 23L183.9 19.6L199.2 17.8L214.4 14.4L229.3 11.6L249.5 15L261.5 13.6L281.2 12.4L296.3 12L308.1 12L311.5 11.2L303.8 20L307.3 30L305.5 42L305.5 51L296.8 66L291.6 74L296 86L302.1 92L314.2 110L321.2 126L326.4 145L332.5 160L333.4 190L331.6 220L342.1 246L352.5 264L369.6 279.6L338.6 292L300.3 312L286.4 332L262 360L235.1 367L217.7 369L195.9 348L182 335L181.1 327L126.3 290L77.6 250L10.3 204L10.3 176L30.6 162L48 152L67.2 142L91.5 130L98.5 128L110.7 114L122.8 108L140.2 108L139.4 98L128.1 92L131.5 82L131.5 70L130.7 55Z"
                />
                <path
                  className="net"
                  d="M70.6 118Q110 40 150.2 36M150.2 36Q185 -4 214.4 14.4M214.4 14.4Q250 -2 276.1 22.6M70.6 118Q160 150 253.9 111M214.4 14.4Q245 70 253.9 111M253.9 111Q245 210 257.2 294.4 M70.6 118 Q130 145, 190 160 M150.2 36 Q165 110, 190 160 M253.9 111 Q220 140, 190 160 M276.1 22.6 Q235 100, 190 160 M257.2 294.4 Q220 220, 190 160"
                />
                <g className="c">
                  <circle cx="214.4" cy="14.4" r="5" />
                  <circle cx="150.2" cy="36" r="4" />
                  <circle cx="276.1" cy="22.6" r="4" />
                  <circle cx="70.6" cy="118" r="3.8" />
                  <circle cx="253.9" cy="111" r="3.8" />
                  <circle cx="257.2" cy="294.4" r="4.2" />
                  {/* Central convergence node in the middle of Algeria Map */}
                  <circle cx="190" cy="180" r="6" fill="#FFF2B2" stroke="#D4AF37" strokeWidth="2" />
                  <circle cx="190" cy="180" r="3.5" fill="#FFFFFF" />
                </g>
                <circle className="p" cx="190" cy="180" r="7" style={{ animationDelay: '-0.5s' }} />
                <circle className="p" cx="214.4" cy="14.4" r="5.5" />
                <circle className="p" cx="253.9" cy="111" r="4.5" style={{ animationDelay: '-1s' }} />
                <circle className="p" cx="257.2" cy="294.4" r="4.5" style={{ animationDelay: '-2s' }} />
              </svg>
            </div>

            {/* 2. Under the Algeria Map: DZ-Bridge */}
            <div className="landing-brand-title">
              DZ-Bridge
            </div>

            {/* 3. Under DZ-Bridge: the long sentence */}
            <h1>
              Bridge <em>Algerian Expertise</em> with Organizations
            </h1>

            {/* Repositioned Branding Elements Directly Beneath Expert and Organization */}
            <div className="picks-grid">
              {/* Expert Column */}
              <div className="pick-card">
                <button
                  className="pick btn-primary"
                  type="button"
                  data-go="expert"
                  onClick={() => setMode('expert')}
                >
                  <span className="pick-ic">
                    <svg className="ico" width="22" height="22">
                      <use href="#i-user" />
                    </svg>
                  </span>
                  <span>Expert</span>
                  <svg className="ico" width="16" height="16">
                    <use href="#i-arrow" />
                  </svg>
                </button>
                {/* First branding element directly beneath the central EXPERT text */}
                <div className="pick-branding">
                  <span className="pick-brand-tag">Academic &amp; Research</span>
                  <p className="pick-brand-desc">
                    Researchers and professionals, in Algeria and abroad
                  </p>
                </div>
              </div>

              {/* Organization Column */}
              <div className="pick-card">
                <button
                  className="pick btn-org"
                  type="button"
                  data-go="org"
                  onClick={() => setMode('org')}
                >
                  <span className="pick-ic">
                    <svg className="ico" width="22" height="22">
                      <use href="#i-org" />
                    </svg>
                  </span>
                  <span>Organization</span>
                  <svg className="ico" width="16" height="16">
                    <use href="#i-arrow" />
                  </svg>
                </button>
                {/* Second branding element directly beneath the organization's name */}
                <div className="pick-branding">
                  <span className="pick-brand-tag">Institutions &amp; Labs</span>
                  <p className="pick-brand-desc">
                    Universities, research centres, companies &amp; public bodies
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= EXPERT PANEL ================= */}
          <section
            className="panel"
            id="pe"
            data-k="expert"
            tabIndex={mode ? -1 : 0}
            role={mode === 'expert' ? 'region' : 'button'}
            aria-label="Open the expert space"
            onClick={() => !mode && setMode('expert')}
          >
            {/* Wow-Style Crisp Prestigious Tag */}
            <span className="tag">For experts</span>

            {/* Hand-drawn Vector Artwork of Algerian Expert */}
            <div className="fig">
              <svg viewBox="0 0 300 440" aria-hidden="true">
                <path d="M10 440V150a140 140 0 0 1 280 0V440Z" fill="url(#gSky)" />
                <g clipPath="url(#arch)">
                  <circle cx="90" cy="120" r="150" fill="url(#gSpot)" />
                  <g opacity=".5" stroke="#C9A24B" strokeWidth="1" fill="none">
                    <path d="M10 330Q150 270 290 330M10 360Q150 300 290 360" />
                  </g>
                  <g className="breathe">
                    <path d="M-20 440C-10 360 40 324 108 308H192C260 324 310 360 320 440Z" fill="url(#gSuit)" />
                    <path d="M192 308C260 324 310 360 320 440H280C270 380 240 340 192 322Z" fill="#C9A24B" opacity=".28" />
                    <path d="M126 262V312C126 326 174 326 174 312V262Z" fill="#a9704b" />
                    <path d="M126 296C140 308 160 308 174 296V312C174 326 126 326 126 312Z" fill="#6b3b24" opacity=".45" />
                    <path d="M118 304L150 398L182 304L168 298L150 322L132 298Z" fill="#f4eef6" />
                    <path d="M118 304L102 330L136 338L150 322Z M182 304L198 330L164 338L150 322Z" fill="#fff" stroke="#d9cfe0" strokeWidth="1" />
                    <path d="M108 308L118 304L150 398L136 440H88L104 366Z M192 308L182 304L150 398L164 440H212L196 366Z" fill="#2a1433" />
                    <path d="M108 308L104 366M192 308L196 366" stroke="#6b4a78" strokeWidth="1.5" fill="none" />
                    <path d="M130 304L146 400M170 304L154 400" stroke="#C9A24B" strokeWidth="2.4" fill="none" />
                    <g transform="translate(130 396)">
                      <rect width="40" height="52" rx="5" fill="#fff" />
                      <rect width="40" height="13" rx="5" fill="#C9A24B" />
                      <circle cx="20" cy="29" r="7" fill="#c9a089" />
                      <path d="M8 46c3-8 21-8 24 0" fill="#3a0233" />
                    </g>
                    <g transform="translate(112 346)">
                      <rect width="22" height="14" rx="2" fill="#fff" />
                      <rect width="11" height="14" rx="2" fill="#006233" />
                      <circle cx="11" cy="7" r="3.5" fill="#D21034" />
                      <circle cx="12.3" cy="7" r="2.7" fill="#fff" />
                      <circle cx="13" cy="7" r="1.1" fill="#D21034" />
                    </g>
                    <ellipse cx="108" cy="220" rx="7" ry="13" fill="#bb8259" />
                    <ellipse cx="192" cy="220" rx="7" ry="13" fill="#a3694a" />
                    <path d="M110 214C110 170 128 150 150 150C172 150 190 170 190 214C190 252 172 282 150 285C128 282 110 252 110 214Z" fill="url(#gSkin)" />
                    <path d="M172 158C192 176 194 214 186 242C178 270 162 283 150 285C172 270 182 242 184 214C185 190 180 172 172 158Z" fill="#5a2f1c" opacity=".28" />
                    <path d="M112 232C116 272 136 290 150 290C164 290 184 272 188 232C182 254 168 264 150 264C132 264 118 254 112 232Z" fill="#1b100d" opacity=".6" />
                    <path d="M133 254Q150 247 167 254Q150 260 133 254Z" fill="#1b100d" opacity=".65" />
                    <path d="M139 260Q150 268 161 260Q150 263 139 260Z" fill="#fff" />
                    <path d="M150 206L145 234Q150 240 157 235" stroke="#8c573a" strokeOpacity=".7" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <ellipse cx="132" cy="209" rx="8" ry="4.2" fill="#fff" />
                    <ellipse cx="168" cy="209" rx="8" ry="4.2" fill="#fff" />
                    <circle cx="133" cy="209" r="3.8" fill="#3a2216" />
                    <circle cx="169" cy="209" r="3.8" fill="#3a2216" />
                    <circle cx="133" cy="209" r="1.7" fill="#000" />
                    <circle cx="169" cy="209" r="1.7" fill="#000" />
                    <circle cx="134.4" cy="207.8" r="1" fill="#fff" />
                    <circle cx="170.4" cy="207.8" r="1" fill="#fff" />
                    <path d="M123 207Q132 203 141 207M159 207Q168 203 177 207" stroke="#2a1a14" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M119 197Q132 190 145 196M155 196Q168 190 181 197" stroke="#1b100d" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                    <g fill="#fff" fillOpacity=".07" stroke="#C9A24B" strokeWidth="2">
                      <rect x="119" y="198" width="28" height="22" rx="9" />
                      <rect x="153" y="198" width="28" height="22" rx="9" />
                    </g>
                    <path d="M147 207Q150 204 153 207M119 205L108 203M181 205L192 203M124 202l8 -2M158 202l8 -2" stroke="#C9A24B" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M106 208C98 152 128 128 154 130C188 128 206 158 194 208C190 184 182 170 162 165C140 161 120 171 106 208Z" fill="url(#gHair)" />
                    <path d="M114 162C126 134 162 124 188 152C172 143 142 143 114 162Z" fill="url(#gHair)" />
                    <path d="M128 148Q150 136 176 148M120 160Q146 142 178 156" stroke="#7a5d54" strokeOpacity=".55" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </g>
                </g>
                <path d="M10 440V150a140 140 0 0 1 280 0V440" fill="none" stroke="#C9A24B" strokeWidth="2.5" />
                <g className="float">
                  <circle cx="262" cy="110" r="22" fill="#C9A24B" />
                  <path
                    d="m252 110 7 7 13-15"
                    stroke="#28011F"
                    strokeWidth="3.6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <g className="float b">
                  <rect x="-6" y="190" width="64" height="44" rx="12" fill="#fff" stroke="#E6E0D3" />
                  <path d="M10 222v-10M22 222v-18M34 222v-8M46 222v-22" stroke="#3A0233" strokeWidth="5.5" strokeLinecap="round" />
                </g>
              </svg>
            </div>

            <div className="detail">
              <button
                className="back"
                type="button"
                aria-label="Back"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode('');
                }}
              >
                <svg className="ico" width="16" height="16">
                  <use href="#i-back" />
                </svg>
                Back
              </button>
              <p className="kicker" style={{ marginBottom: '12px' }}>
                For experts
              </p>
              <h2>
                Three ways to <em>contribute</em>.
              </h2>

              {/* EXACT 3 OPTIONS IN ONE SINGLE LINE (NO BREAKING) */}
              <div className="rgrid">
                <article className="rcard" style={{ '--i': 0 } as React.CSSProperties}>
                  <div className="ci">
                    <svg className="ico" width="24" height="24">
                      <use href="#i-mic" />
                    </svg>
                  </div>
                  <h3>Give a talk</h3>
                  <p>
                    Share your research and experience at conferences, seminars and guest lectures in Algerian
                    universities and companies.
                  </p>
                  <ul>
                    <li>Keynotes, seminars and workshops</li>
                    <li>On site or online</li>
                    <li>Planned around your visits to Algeria</li>
                  </ul>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() =>
                      openModal('talk', 'Sign up to give a talk', 'Join guest lectures and academic seminars across Algerian universities.')
                    }
                  >
                    Sign up to give a talk
                  </button>
                </article>

                <article className="rcard" style={{ '--i': 1 } as React.CSSProperties}>
                  <div className="ci">
                    <svg className="ico" width="24" height="24">
                      <use href="#i-collab" />
                    </svg>
                  </div>
                  <h3>Collaborate on a project</h3>
                  <p>
                    Join research, R&amp;D and technology-transfer projects with labs, research centres and companies.
                  </p>
                  <ul>
                    <li>Co-supervise theses and research</li>
                    <li>Advise industrial R&amp;D</li>
                    <li>Short missions or long-term work</li>
                  </ul>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() =>
                      openModal('collab', 'Sign up to collaborate', 'Connect with doctoral researchers and national R&D laboratories.')
                    }
                  >
                    Sign up to collaborate
                  </button>
                </article>

                <article className="rcard" style={{ '--i': 2 } as React.CSSProperties}>
                  <div className="ci">
                    <svg className="ico" width="24" height="24">
                      <use href="#i-meet" />
                    </svg>
                  </div>
                  <h3>Meet &amp; mentor</h3>
                  <p>
                    Meet organizations, researchers and students one to one, in person during your stay or by video call.
                  </p>
                  <ul>
                    <li>Exploratory meetings with organizations</li>
                    <li>Mentoring for students and start-ups</li>
                    <li>Contact opens only when you accept</li>
                  </ul>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() =>
                      openModal('meet', 'Sign up to meet & mentor', 'Provide 1-on-1 mentorship for Algerian researchers and entrepreneurs.')
                    }
                  >
                    Sign up to meet
                  </button>
                </article>
              </div>
            </div>
          </section>

          {/* ================= ORGANIZATION PANEL ================= */}
          <section
            className="panel"
            id="po"
            data-k="org"
            tabIndex={mode ? -1 : 0}
            role={mode === 'org' ? 'region' : 'button'}
            aria-label="Open the organization space"
            onClick={() => !mode && setMode('org')}
          >
            {/* Wow-Style Crisp Prestigious Tag */}
            <span className="tag">For organizations</span>

            {/* Hand-drawn Vector Artwork of National Academic & Research Palace */}
            <div className="fig">
              <svg viewBox="0 0 300 440" aria-hidden="true">
                <path d="M10 440V150a140 140 0 0 1 280 0V440Z" fill="url(#gSky)" />
                <g clipPath="url(#arch)">
                  <circle cx="210" cy="120" r="150" fill="url(#gSpot)" />
                  <g fill="#fff" opacity=".8">
                    <circle cx="60" cy="60" r="1.4" />
                    <circle cx="110" cy="34" r="1.1" />
                    <circle cx="240" cy="48" r="1.4" />
                    <circle cx="262" cy="96" r="1" />
                    <circle cx="36" cy="110" r="1" />
                  </g>
                  <path d="M40 270H260L150 196Z" fill="#f6ecd8" stroke="#cdbf9f" />
                  <path d="M68 266H232L150 211Z" fill="#e3d5b6" />
                  <circle cx="150" cy="243" r="11" fill="#C9A24B" />
                  <circle cx="150" cy="243" r="6" fill="#9A7424" />
                  <rect x="36" y="270" width="228" height="13" fill="#efe3cc" stroke="#cdbf9f" />
                  <rect x="48" y="283" width="204" height="120" fill="#33172e" />
                  <g fill="#f5c46a" opacity=".85">
                    <rect x="62" y="310" width="9" height="30" rx="4" />
                    <rect x="92" y="310" width="9" height="30" rx="4" />
                    <rect x="199" y="310" width="9" height="30" rx="4" />
                    <rect x="229" y="310" width="9" height="30" rx="4" />
                  </g>
                  <path d="M134 403V350a16 16 0 0 1 32 0V403Z" fill="#C9A24B" />
                  <path d="M150 334V403" stroke="#9A7424" strokeWidth="2" />
                  <g fill="url(#gCol)" stroke="#bda980" strokeWidth="1">
                    <rect x="53" y="283" width="15" height="120" rx="2" />
                    <rect x="85" y="283" width="15" height="120" rx="2" />
                    <rect x="117" y="283" width="15" height="120" rx="2" />
                    <rect x="168" y="283" width="15" height="120" rx="2" />
                    <rect x="200" y="283" width="15" height="120" rx="2" />
                    <rect x="232" y="283" width="15" height="120" rx="2" />
                  </g>
                  <rect x="24" y="403" width="252" height="12" fill="#e6dac4" />
                  <rect x="12" y="415" width="276" height="26" fill="#cfc0a2" />
                  <g stroke="#06361f" strokeLinecap="round" fill="none">
                    <path d="M26 440Q34 380 24 330" stroke="#3a2a1e" strokeWidth="5" />
                    <path d="M24 330Q4 322 -6 336M24 330Q10 310 -2 312M24 330Q30 310 44 314M24 330Q40 326 52 338" strokeWidth="4" />
                    <path d="M274 440Q266 380 276 330" stroke="#3a2a1e" strokeWidth="5" />
                    <path d="M276 330Q296 322 306 336M276 330Q290 310 302 312M276 330Q270 310 256 314M276 330Q260 326 248 338" strokeWidth="4" />
                  </g>
                  <rect x="148.5" y="52" width="3" height="150" fill="#9A7424" />
                  <circle cx="150" cy="50" r="5" fill="#C9A24B" />
                </g>
                <g className="wave">
                  <g transform="translate(152 58) scale(.85) translate(-133 -28)">
                    <rect x="133" y="28" width="48" height="64" fill="#006233" />
                    <rect x="181" y="28" width="48" height="64" fill="#fff" />
                    <circle cx="178" cy="60" r="18" fill="#D21034" />
                    <circle cx="183" cy="60" r="14.4" fill="#fff" />
                    <polygon
                      points="187,52 188.94,57.33 194.61,57.53 190.14,61.02 191.7,66.47 187,63.3 182.3,66.47 183.86,61.02 179.39,57.53 185.06,57.33"
                      fill="#D21034"
                    />
                    <rect x="133" y="28" width="96" height="64" fill="url(#gWave)" />
                  </g>
                </g>
                <path d="M10 440V150a140 140 0 0 1 280 0V440" fill="none" stroke="#C9A24B" strokeWidth="2.5" />
                <g className="float">
                  <circle cx="38" cy="108" r="22" fill="#C9A24B" />
                  <svg
                    x="26"
                    y="96"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#28011F"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <use href="#i-org" />
                  </svg>
                </g>
              </svg>
            </div>

            <div className="detail">
              <button
                className="back"
                type="button"
                aria-label="Back"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode('');
                }}
              >
                <svg className="ico" width="16" height="16">
                  <use href="#i-back" />
                </svg>
                Back
              </button>
              <p className="kicker" style={{ marginBottom: '12px' }}>
                For organizations
              </p>
              <h2>
                Options to <em>engage expertise</em>.
              </h2>

              {/* EXACT 3 OPTIONS IN ONE SINGLE LINE (NO BREAKING) */}
              <div className="rgrid">
                <article className="rcard" style={{ '--i': 0 } as React.CSSProperties}>
                  <div className="ci">
                    <svg className="ico" width="24" height="24">
                      <use href="#i-collab" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', fontWeight: 600, marginBottom: '4px' }}>
                    1. First: Create a project
                  </div>
                  <h3>Create a project</h3>
                  <p>
                    Post research topics, PhD co-supervision proposals, or industrial R&amp;D challenges for diaspora leaders.
                  </p>
                  <ul>
                    <li>Co-supervision of theses and research</li>
                    <li>Specify your Algerian wilaya &amp; faculty</li>
                    <li>Short missions or long-term work</li>
                  </ul>
                  <button
                    className="btn btn-org"
                    type="button"
                    onClick={() => openModal('org-project', 'Create a project', 'Post your faculty or laboratory research topic.')}
                  >
                    Create a project
                  </button>
                </article>

                <article className="rcard" style={{ '--i': 1 } as React.CSSProperties}>
                  <div className="ci">
                    <svg className="ico" width="24" height="24">
                      <use href="#i-mic" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', fontWeight: 600, marginBottom: '4px' }}>
                    2. Then: Invite an expert
                  </div>
                  <h3>Invite an expert</h3>
                  <p>
                    Bring experts to your conferences, seminars and workshops, on site in Algeria or online.
                  </p>
                  <ul>
                    <li>Keynotes, seminars and workshops</li>
                    <li>Matched on topic and dates</li>
                    <li>Experts visiting Algeria on your dates are shown first</li>
                  </ul>
                  <button
                    className="btn btn-org"
                    type="button"
                    onClick={() => openModal('org-invite', 'Invite an expert', 'Connect with scholars visiting your wilaya on your dates.')}
                  >
                    Invite an expert
                  </button>
                </article>

                <article className="rcard" style={{ '--i': 2 } as React.CSSProperties}>
                  <div className="ci">
                    <svg className="ico" width="24" height="24">
                      <use href="#i-meet" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', fontWeight: 600, marginBottom: '4px' }}>
                    3. Then: Collaborate
                  </div>
                  <h3>Collaborate</h3>
                  <p>
                    Execute co-supervision, advise your teams one to one, or mentor student start-ups.
                  </p>
                  <ul>
                    <li>Exploratory institutional meetings</li>
                    <li>Mentoring for students and start-ups</li>
                    <li>Contact opens directly once accepted</li>
                  </ul>
                  <button
                    className="btn btn-org"
                    type="button"
                    onClick={() => openModal('org-collab', 'Collaborate with an expert', 'Initiate long-term institutional collaboration.')}
                  >
                    Start collaborating
                  </button>
                </article>
              </div>
            </div>
          </section>
        </div>

        {/* Subtle Institutional Footer Bar */}
        <footer
          style={{
            textAlign: 'center',
            padding: '24px 0 40px',
            color: 'var(--ink2)',
            fontSize: '13px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 22px',
              borderRadius: '999px',
              background: 'var(--glass)',
              border: '1px solid var(--line)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}
          >
            <svg className="ico" width="16" height="16">
              <use href="#i-bridge" />
            </svg>
            DZ-Bridge • Academic &amp; Professional Exchange
          </div>
        </footer>
      </main>

      {/* Modal / Dialog for missing actions */}
      {modalType && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(21, 5, 18, 0.65)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'grid',
            placeItems: 'center',
            padding: '20px',
          }}
          onClick={() => setModalType(null)}
        >
          <div
            style={{
              position: 'relative',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '24px',
              padding: 'clamp(24px, 4vw, 36px)',
              maxWidth: '520px',
              width: '100%',
              boxShadow: 'var(--shadow)',
              fontFamily: 'var(--sans)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalType(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid var(--line)',
                background: 'var(--bg)',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>

            {modalSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--gold-100)',
                    color: 'var(--gold-700)',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 16px',
                    fontSize: '24px',
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', margin: '0 0 8px' }}>
                  Action Submitted!
                </h3>
                <p style={{ color: 'var(--ink2)', fontSize: '14px', margin: 0 }}>
                  Your request has been routed to the national DZ-Bridge network.
                </p>
              </div>
            ) : (
              <div>
                <span className="kicker" style={{ marginBottom: '8px' }}>
                  DZ-Bridge
                </span>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '26px', margin: '0 0 6px' }}>
                  {modalTitle}
                </h2>
                <p style={{ color: 'var(--ink2)', fontSize: '14px', margin: '0 0 20px' }}>
                  {modalSubtitle}
                </p>

                <form onSubmit={handleModalSubmit} style={{ display: 'grid', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Full Name / Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Amina Khelil"
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 14px',
                        borderRadius: '12px',
                        border: '1px solid var(--line)',
                        background: 'var(--bg)',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      University / Laboratory / Institution *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Université Frères Mentouri Constantine 1 or MIT"
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 14px',
                        borderRadius: '12px',
                        border: '1px solid var(--line)',
                        background: 'var(--bg)',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Algerian Wilaya *
                      </label>
                      <select
                        style={{
                          width: '100%',
                          height: '42px',
                          padding: '0 10px',
                          borderRadius: '12px',
                          border: '1px solid var(--line)',
                          background: 'var(--bg)',
                          fontSize: '13px',
                          fontFamily: 'inherit',
                        }}
                      >
                        {ALGERIAN_WILAYAS.map((c) => (
                          <option key={c.code} value={c.name}>
                            {c.code} - {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="contact@institution.dz"
                        style={{
                          width: '100%',
                          height: '42px',
                          padding: '0 14px',
                          borderRadius: '12px',
                          border: '1px solid var(--line)',
                          background: 'var(--bg)',
                          fontSize: '14px',
                          fontFamily: 'inherit',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Brief Description / Research Domain *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Specify your scientific discipline, visit dates, or project scope..."
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: '1px solid var(--line)',
                        background: 'var(--bg)',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setModalType(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
