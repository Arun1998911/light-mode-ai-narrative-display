// Animated "Responsible AI" orb / glyph composition
// Pure SVG geometry (rings, dots, scanlines) — no faux illustration.

const Orb = () => {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ring rotations
  const r1 = (t * 18) % 360;
  const r2 = (-t * 11) % 360;
  const r3 = (t * 7) % 360;

  // pulsing core
  const pulse = 1 + Math.sin(t * 1.6) * 0.04;

  // orbit dots
  const dots = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2 + t * 0.35;
    const radius = 168 + Math.sin(t * 0.8 + i) * 4;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      o: 0.25 + (Math.sin(t * 1.2 + i * 0.5) + 1) * 0.25,
      r: 1.2 + (i % 3 === 0 ? 1.4 : 0),
    };
  });

  // tick marks around the outer ring
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2;
    const long = i % 5 === 0;
    return {
      x1: Math.cos(a) * 210,
      y1: Math.sin(a) * 210,
      x2: Math.cos(a) * (long ? 222 : 217),
      y2: Math.sin(a) * (long ? 222 : 217),
      o: long ? 0.7 : 0.25,
    };
  });

  return (
    <div style={{ position: 'relative', width: 520, height: 520 }}>
      <svg viewBox="-260 -260 520 520" width="520" height="520" style={{ display: 'block' }}>
        <defs>
          <radialGradient id="core" cx="0" cy="0" r="0.5">
            <stop offset="0%" stopColor="#44403c" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#78716c" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#a8a29e" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f5f0eb" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo" cx="0" cy="0" r="0.5">
            <stop offset="0%" stopColor="#1c1917" stopOpacity="0.0" />
            <stop offset="60%" stopColor="#1c1917" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#1c1917" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="scan" x1="0" x2="0" y1="-1" y2="1">
            <stop offset="0%" stopColor="#44403c" stopOpacity="0" />
            <stop offset="50%" stopColor="#44403c" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#44403c" stopOpacity="0" />
          </linearGradient>
          <clipPath id="coreClip">
            <circle cx="0" cy="0" r="100" />
          </clipPath>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0 L0 0 0 10" fill="none" stroke="#78716c" strokeWidth="0.4" opacity="0.18" />
          </pattern>
        </defs>

        {/* halo */}
        <circle cx="0" cy="0" r="240" fill="url(#halo)" />

        {/* tick ring */}
        <g>
          {ticks.map((tk, i) => (
            <line key={i} x1={tk.x1} y1={tk.y1} x2={tk.x2} y2={tk.y2}
              stroke="#78716c" strokeOpacity={tk.o} strokeWidth="1" />
          ))}
        </g>

        {/* outer rings (rotating) */}
        <g transform={`rotate(${r1})`}>
          <circle cx="0" cy="0" r="200" fill="none" stroke="#78716c" strokeOpacity="0.18" strokeWidth="1" />
          <circle cx="0" cy="0" r="200" fill="none" stroke="#78716c" strokeOpacity="0.5" strokeWidth="1.2"
            strokeDasharray="2 14" />
        </g>
        <g transform={`rotate(${r2})`}>
          <ellipse cx="0" cy="0" rx="180" ry="60" fill="none" stroke="#78716c" strokeOpacity="0.35" strokeWidth="1" />
          <ellipse cx="0" cy="0" rx="180" ry="60" fill="none" stroke="#78716c" strokeOpacity="0.7" strokeWidth="1"
            strokeDasharray="1 10" />
        </g>
        <g transform={`rotate(${60 + r3})`}>
          <ellipse cx="0" cy="0" rx="60" ry="180" fill="none" stroke="#78716c" strokeOpacity="0.25" strokeWidth="1" />
        </g>
        <g transform={`rotate(${-30 + r2 * 0.5})`}>
          <ellipse cx="0" cy="0" rx="140" ry="140" fill="none" stroke="#78716c" strokeOpacity="0.12" strokeWidth="1" />
        </g>

        {/* orbit dots */}
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#78716c" opacity={d.o} />
        ))}

        {/* core */}
        <g transform={`scale(${pulse})`}>
          <circle cx="0" cy="0" r="100" fill="url(#core)" />
          <g clipPath="url(#coreClip)">
            <rect x="-100" y="-100" width="200" height="200" fill="url(#grid)" />
            {/* scanline */}
            <rect x="-100"
              y={-100 + ((t * 80) % 200)}
              width="200" height="40" fill="url(#scan)" opacity="0.35" />
            {/* horizon */}
            <line x1="-100" y1="0" x2="100" y2="0" stroke="#78716c" strokeOpacity="0.4" strokeWidth="0.6" />
            <line x1="0" y1="-100" x2="0" y2="100" stroke="#78716c" strokeOpacity="0.4" strokeWidth="0.6" />
          </g>
          <circle cx="0" cy="0" r="100" fill="none" stroke="#78716c" strokeOpacity="0.85" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="112" fill="none" stroke="#78716c" strokeOpacity="0.18" strokeWidth="1" />
        </g>

        {/* center crosshair */}
        <g opacity="0.9">
          <circle cx="0" cy="0" r="2" fill="#44403c" />
          <circle cx="0" cy="0" r="6" fill="none" stroke="#78716c" strokeWidth="0.6" opacity="0.6" />
        </g>

        {/* corner brackets */}
        {[
          [-230, -230, 1, 1],
          [230, -230, -1, 1],
          [-230, 230, 1, -1],
          [230, 230, -1, -1],
        ].map(([x, y, sx, sy], i) => (
          <g key={i} transform={`translate(${x}, ${y})`}>
            <path d={`M0 0 L${20 * sx} 0 M0 0 L0 ${20 * sy}`} stroke="#78716c" strokeOpacity="0.5" strokeWidth="1" />
          </g>
        ))}
      </svg>

      {/* tiny readouts overlaying the orb */}
      <div className="mono" style={{
        position: 'absolute', top: 8, left: 8, fontSize: 10,
        color: 'var(--ink-mute)', letterSpacing: '0.08em',
      }}>
        SYS / RAI · v2.4
      </div>
      <div className="mono" style={{
        position: 'absolute', top: 8, right: 8, fontSize: 10,
        color: 'var(--ink-mute)', letterSpacing: '0.08em',
      }}>
        {`T+${t.toFixed(2).padStart(6, '0')}s`}
      </div>
      <div className="mono" style={{
        position: 'absolute', bottom: 8, left: 8, fontSize: 10,
        color: 'var(--ink-mute)', letterSpacing: '0.08em',
      }}>
        {`Θ ${(r1 * Math.PI / 180).toFixed(3)}rad`}
      </div>
      <div className="mono" style={{
        position: 'absolute', bottom: 8, right: 8, fontSize: 10,
        color: 'var(--ink-mute)', letterSpacing: '0.08em',
      }}>
        STATUS · NOMINAL
      </div>
    </div>
  );
};

window.Orb = Orb;
