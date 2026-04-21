// Scenes:
//   0 = "Responsible AI." hero
//   1 = Blank + typewriter "We know your questions."
//   2 = Typewriter exits
//   3 = Sequential typewriter questions (auto, one by one)
//   4 = Solutions (manual tab dfclicks)sdsdf

const TIMING = {
  holdHero: 2800,
  typeStart: 350,
  typeSpeed: 55,
  holdTyped: 1400,
  exitDur: 700,
  blankGap: 400,
};

const Typewriter = ({ text, speed = 55, startDelay = 0, onDone }) => {
  const [n, setN] = React.useState(0);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  React.useEffect(() => {
    if (!started) return;
    if (n >= text.length) { onDone && onDone(); return; }
    const id = setTimeout(() => setN(n + 1), speed);
    return () => clearTimeout(id);
  }, [n, started, text, speed, onDone]);

  return (
    <span>
      {text.slice(0, n)}
      <span style={{
        display: 'inline-block', width: '0.55ch', marginLeft: 2,
        background: 'var(--ink)', height: '0.9em',
        animation: 'caretBlink 0.9s steps(1) infinite',
        verticalAlign: 'middle',
      }} />
    </span>
  );
};

const ResponsibleAIHero = ({ visible }) => (
  <div style={{
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    opacity: visible ? 1 : 0,
    transform: visible ? 'scale(1)' : 'scale(0.96)',
    transition: 'opacity 700ms cubic-bezier(.6,0,.2,1), transform 900ms cubic-bezier(.6,0,.2,1)',
    pointerEvents: visible ? 'auto' : 'none',
  }}>
    <div className="mono" style={{
      fontSize: 11, letterSpacing: '0.32em', color: 'var(--ink-mute)',
      marginBottom: 22, display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <span style={{ width: 24, height: 1, background: 'var(--ink-faint)' }} />
      A KNOLSKAPE POSITION PAPER
      <span style={{ width: 24, height: 1, background: 'var(--ink-faint)' }} />
    </div>
    <div style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
      <div data-orb-wrapper="1" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: 0.75 }}>
        <Orb />
      </div>
      <h1 style={{
        position: 'relative', margin: 0, padding: 0,
        fontSize: 'clamp(72px, 9vw, 120px)', lineHeight: 0.94,
        fontWeight: 500, letterSpacing: '-0.045em',
        textAlign: 'center', color: 'var(--ink)',
        textShadow: '0 0 40px rgba(245,240,235,0.9), 0 0 80px rgba(245,240,235,0.6)',
      }}>
        Responsible<br />
        <span className="serif" style={{
          fontWeight: 400, letterSpacing: '-0.02em',
          fontSize: 'clamp(84px, 10.5vw, 138px)',
        }}>AI.</span>
      </h1>
    </div>
  </div>
);

const TypewriterPanel = ({ active, exiting, onDone }) => (
  <div style={{
    position: 'absolute', inset: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    opacity: active && !exiting ? 1 : 0,
    transform: exiting ? 'translateY(-24px) scale(0.98)' : 'translateY(0) scale(1)',
    transition: `opacity ${TIMING.exitDur}ms cubic-bezier(.6,0,.2,1), transform ${TIMING.exitDur}ms cubic-bezier(.6,0,.2,1)`,
    pointerEvents: 'none',
  }}>
    <div style={{ width: 'min(1000px, 88vw)', textAlign: 'center' }}>
      <div className="mono" style={{
        fontSize: 11, letterSpacing: '0.32em', color: 'var(--ink-mute)', marginBottom: 18,
      }}>
        ── 14 RECURRING QUESTIONS FROM LEARNING LEADERS ──
      </div>
      <div style={{
        fontSize: 'clamp(42px, 5.2vw, 72px)',
        lineHeight: 1.05, letterSpacing: '-0.03em',
        fontWeight: 500, color: 'var(--ink)',
      }}>
        {active && (
          <Typewriter
            text="We know your questions."
            speed={TIMING.typeSpeed}
            startDelay={TIMING.typeStart}
            onDone={onDone}
          />
        )}
      </div>
    </div>
  </div>
);

// CTA button — visible from Q1, migrates to center when all done
const ExploreCTA = ({ visible, allDone, onClick }) => (
  <div style={{
    position: 'absolute',
    bottom: allDone ? '50%' : '72px',
    left: '50%',
    transform: allDone ? 'translateX(-50%) translateY(50%)' : 'translateX(-50%)',
    opacity: visible ? 1 : 0,
    transition: 'opacity 600ms, bottom 900ms cubic-bezier(.4,0,.2,1), transform 900ms cubic-bezier(.4,0,.2,1)',
    pointerEvents: visible ? 'auto' : 'none',
    zIndex: 50,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
  }}>
    {allDone && (
      <div className="mono" style={{
        fontSize: 10, letterSpacing: '0.26em', color: '#78716c',
        textAlign: 'center',
        animation: 'fadeUp 500ms cubic-bezier(.2,.8,.2,1) both',
      }}>
        ALL 14 QUESTIONS ON THE TABLE
      </div>
    )}
    <button
      onClick={onClick}
      style={{
        background: allDone
          ? 'linear-gradient(135deg, #292524 0%, #44403c 100%)'
          : 'rgba(28,25,23,0.07)',
        color: allDone ? '#fff' : 'var(--ink)',
        border: allDone ? 'none' : '1px solid rgba(28,25,23,0.2)',
        borderRadius: 999,
        padding: allDone ? '16px 40px' : '10px 22px',
        fontSize: allDone ? 15 : 12,
        fontWeight: 500, letterSpacing: '-0.01em',
        fontFamily: "'Geist', sans-serif",
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: allDone
          ? '0 0 40px rgba(41,37,36,0.18), 0 8px 32px rgba(0,0,0,0.15)'
          : 'none',
        transition: 'all 700ms cubic-bezier(.4,0,.2,1)',
        backdropFilter: allDone ? 'none' : 'blur(8px)',
        animation: allDone ? 'ctaPulse 2.5s ease-in-out infinite' : 'none',
      }}
      onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(41,37,36,0.28), 0 12px 40px rgba(0,0,0,0.2)'; }}
      onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = allDone ? '0 0 40px rgba(41,37,36,0.18), 0 8px 32px rgba(0,0,0,0.15)' : 'none'; }}
    >
      Explore our Responsible AI
      <span style={{ fontSize: allDone ? 18 : 13, transition: 'font-size 700ms' }}>→</span>
    </button>

    <style>{`
      @keyframes ctaPulse {
        0%, 100% { box-shadow: 0 0 40px rgba(41,37,36,0.18), 0 8px 32px rgba(0,0,0,0.15); }
        50%       { box-shadow: 0 0 70px rgba(41,37,36,0.3), 0 8px 32px rgba(0,0,0,0.15); }
      }
      @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    `}</style>
  </div>
);

// Horizontal dot progress bar — clickable for navigation
const DotProgress = ({ scene, setScene }) => {
  // step: 0=Hero, 1=Prompt(1/2), 2=Questions(3), 3=Solutions(4)
  const step = scene >= 4 ? 3 : scene >= 3 ? 2 : scene >= 1 ? 1 : 0;
  const total = 4;

  const handleClick = (i) => {
    if (i === step) return;
    // Map dot index back to scene
    const sceneMap = [0, 1, 3, 4];
    setScene(sceneMap[i]);
  };

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'center', gap: 10,
      zIndex: 60,
    }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          onClick={() => handleClick(i)}
          style={{
            width: i === step ? 28 : 7,
            height: 7, borderRadius: 99,
            background: i === step ? '#1c1917' : i < step ? '#a8a29e' : '#d6cfc7',
            transition: 'width 400ms cubic-bezier(.4,0,.2,1), background 400ms',
            cursor: i !== step ? 'pointer' : 'default',
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  const { TopBar } = window.Hero;
  const [scene, setScene] = React.useState(0);
  const [allQuestionsDone, setAllQuestionsDone] = React.useState(false);
  const [grouping, setGrouping] = React.useState(false);

  // Auto: 0 → 1
  React.useEffect(() => {
    if (scene === 0) {
      const t = setTimeout(() => setScene(1), TIMING.holdHero);
      return () => clearTimeout(t);
    }
  }, [scene]);

  // Auto: 2 → 3
  React.useEffect(() => {
    if (scene === 2) {
      const t = setTimeout(() => { setScene(3); setAllQuestionsDone(false); }, TIMING.exitDur + TIMING.blankGap);
      return () => clearTimeout(t);
    }
  }, [scene]);

  const handleTypedDone = React.useCallback(() => {
    setTimeout(() => setScene(2), TIMING.holdTyped);
  }, []);

  const handleAllQuestionsDone = React.useCallback(() => {
    setAllQuestionsDone(true);
  }, []);

  const handleExploreSolutions = () => {
    setGrouping(true);
    setTimeout(() => { setScene(4); setGrouping(false); }, 700);
  };

  // Expose for PPTX export
  React.useEffect(() => {
    window.__setScene = (s) => { setScene(s); setAllQuestionsDone(s >= 3); setGrouping(false); };
    window.__setTab = (i) => {
      if (window.__solutionsSetTab) window.__solutionsSetTab(i);
    };
    return () => { delete window.__setScene; delete window.__setTab; };
  }, []);
  React.useEffect(() => {
    const h = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        if (scene === 3) { setAllQuestionsDone(true); }
        else setScene(s => Math.min(4, s + 1));
      }
      if (e.key === 'Backspace') { setScene(0); setAllQuestionsDone(false); setGrouping(false); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [scene]);

  return (
    <div data-screen-label="01 Responsible AI" style={{
      position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden',
    }}>
      {/* bg grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 80%)',
      }} />

      <TopBar />

      <div style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 820 }}>

        {/* Scene 0: Hero */}
        <ResponsibleAIHero visible={scene === 0} />

        {/* Scene 1+2: Typewriter */}
        <TypewriterPanel
          active={scene === 1 || scene === 2}
          exiting={scene === 2}
          onDone={handleTypedDone}
        />

        {/* Scene 3: Sequential typed questions */}
        {scene === 3 && (
          <SequentialQuestions onAllDone={handleAllQuestionsDone} allDone={allQuestionsDone} />
        )}

        {/* CTA — visible from Q1, moves to center when all done */}
        <ExploreCTA
          visible={scene === 3 && !grouping}
          allDone={allQuestionsDone}
          onClick={handleExploreSolutions}
        />

        {/* Scene 4: Solutions */}
        <SolutionsScreen visible={scene === 4 && !grouping} />
      </div>

      {/* Horizontal dot progress */}
      <DotProgress scene={scene} setScene={setScene} />

      <style>{`
        @keyframes caretBlink { 50% { opacity: 0; } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px);} to { opacity:1; transform:translateY(0);} }
      `}</style>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
