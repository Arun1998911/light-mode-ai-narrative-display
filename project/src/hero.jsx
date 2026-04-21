// Hero composition: header, central orb, ticker, floating questions.

const TopBar = () => (
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '18px 36px', zIndex: 40,
  }}>
    <img
      src={window.__res('knolskape_logo','src/knolskape_logo.png')}
      alt="Knolskape"
      style={{ height: 36, width: 'auto', objectFit: 'contain' }}
    />
  </div>
);

const Center = () => (
  <div style={{
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    pointerEvents: 'none',
  }}>
    {/* Eyebrow */}
    <div className="mono" style={{
      fontSize: 11, letterSpacing: '0.32em', color: 'var(--ink-mute)',
      marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <span style={{ width: 24, height: 1, background: 'var(--ink-faint)' }} />
      A KNOLSKAPE POSITION PAPER
      <span style={{ width: 24, height: 1, background: 'var(--ink-faint)' }} />
    </div>

    {/* Title with central orb behind */}
    <div style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: 0.5 }}>
        <Orb />
      </div>
      <h1 style={{
        position: 'relative',
        margin: 0, padding: 0,
        fontSize: 'clamp(56px, 7.5vw, 96px)', lineHeight: 0.94,
        fontWeight: 500, letterSpacing: '-0.045em',
        textAlign: 'center',
        color: '#fff',
        textShadow: '0 0 40px rgba(0,0,0,0.95), 0 0 80px rgba(0,0,0,0.85), 0 0 120px rgba(0,0,0,0.7)',
      }}>
        Responsible<br />
        <span className="serif" style={{
          fontWeight: 400, letterSpacing: '-0.02em',
          fontSize: 'clamp(64px, 8.8vw, 112px)',
        }}>
          AI.
        </span>
      </h1>
    </div>

    {/* Sub */}
    <p style={{
      maxWidth: 540, textAlign: 'center', marginTop: 18,
      color: 'var(--ink-dim)', fontSize: 16, lineHeight: 1.5,
      letterSpacing: '-0.005em',
    }}>
      Every week, learning leaders ask us the same fourteen questions
      about putting AI into experiential learning. Here is how
      Knolskape answers them — clearly, and on the record.
    </p>

    {/* CTA */}
    <div style={{
      marginTop: 28, display: 'flex', gap: 12, pointerEvents: 'auto',
    }}>
      <button style={{
        background: '#fff', color: '#0e0e0e', border: 'none',
        padding: '12px 18px', borderRadius: 999,
        fontSize: 13, fontWeight: 500, letterSpacing: '-0.005em',
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: 'inherit',
      }}>
        Read the answers
        <span style={{ display: 'inline-block', transform: 'translateY(-1px)' }}>↓</span>
      </button>
      <button style={{
        background: 'transparent', color: '#fff',
        border: '1px solid #3a3a3a',
        padding: '12px 18px', borderRadius: 999,
        fontSize: 13, fontWeight: 500, letterSpacing: '-0.005em',
        cursor: 'pointer', fontFamily: 'inherit',
      }}>
        Download PDF
      </button>
    </div>
  </div>
);

const Ticker = () => null;

const SideRailLeft = () => null;
const SideRailRight = () => null;

window.Hero = { TopBar, Center, Ticker, SideRailLeft, SideRailRight };
