const QUESTIONS = [
  "Can the AI explain why it gave certain feedback or scores?",
  "How transparent is the AI in explaining its reasoning?",
  "Who owns the learner data generated?",
  "How do we measure ROI from an AI-enhanced learning experience?",
  "How does it handle nuanced, open-ended experiential tasks vs. just multiple choice?",
  "How do we know the AI's assessments are fair and unbiased?",
  "How do we prevent learners from gaming or misusing the AI?",
  "Can personally identifiable information (PII) be exposed?",
  "Is the model a black box, or is the logic auditable?",
  "Where is data stored, and for how long?",
  "What controls exist to set guardrails on AI behavior?",
  "What happens when the AI gives wrong feedback or hallucinations?",
  "What happens if the AI goes down — is learning disrupted?",
  "Is the AI equitable across different demographics, cultures, and languages?",
];

const Q_GROUP = [3, 3, 1, 0, 2, 0, 2, 1, 3, 1, 2, 0, 0, 0];
const TAB_LABELS = [
  "AI Accuracy\n& Reliability",
  "Data Privacy\n& Security",
  "Control &\nFool-Proof AI",
  "Explainable &\nAuditable AI",
];

const BG_SLOTS = [
  { x: 10, y: 12, size: 13 }, { x: 62, y: 7,  size: 15 },
  { x: 84, y: 18, size: 12 }, { x: 22, y: 28, size: 14 },
  { x: 75, y: 32, size: 13 }, { x: 8,  y: 48, size: 16 },
  { x: 55, y: 50, size: 12 }, { x: 88, y: 55, size: 13 },
  { x: 32, y: 65, size: 15 }, { x: 70, y: 70, size: 12 },
  { x: 12, y: 80, size: 13 }, { x: 52, y: 85, size: 14 },
  { x: 28, y: 90, size: 12 }, { x: 80, y: 88, size: 13 },
];

const TYPE_SPEED = 32;
const HOLD_MS    = 500;

const BgQuestion = ({ text, slot, idx, clear }) => {
  const seed = (idx + 1) * 13.7;
  const rot = ((seed % 5) - 2.5);
  return (
    <div style={{
      position: 'absolute',
      left: `${slot.x}%`, top: `${slot.y}%`,
      transform: `translate(-50%, -50%) rotate(${rot}deg)`,
      maxWidth: 260,
      fontSize: slot.size,
      lineHeight: 1.4,
      letterSpacing: '-0.005em',
      color: clear ? 'var(--ink-dim)' : 'rgba(28,25,23,0.18)',
      filter: clear ? 'blur(0px)' : 'blur(2px)',
      fontFamily: clear ? "'Cormorant Garamond', serif" : "'Geist', sans-serif",
      fontWeight: 400,
      userSelect: 'none',
      pointerEvents: 'none',
      transition: 'color 900ms ease, filter 900ms ease',
      animation: 'bgFadeIn 900ms cubic-bezier(.2,.8,.2,1) both',
    }}>
      {text}
    </div>
  );
};

const TypewriterCenter = ({ text, onDone }) => {
  const [n, setN] = React.useState(0);
  const doneRef = React.useRef(false);

  React.useEffect(() => {
    setN(0);
    doneRef.current = false;
  }, [text]);

  React.useEffect(() => {
    if (n >= text.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        const t = setTimeout(onDone, HOLD_MS);
        return () => clearTimeout(t);
      }
      return;
    }
    const id = setTimeout(() => setN(c => c + 1), TYPE_SPEED);
    return () => clearTimeout(id);
  }, [n, text, onDone]);

  return (
    <span>
      {text.slice(0, n)}
      <span style={{
        display: 'inline-block', width: '0.5ch', height: '1em',
        background: 'var(--ink)', verticalAlign: 'text-bottom', marginLeft: 2,
        animation: 'caretBlink 0.8s steps(1) infinite',
        opacity: n >= text.length ? 0 : 1,
      }} />
    </span>
  );
};

const SequentialQuestions = ({ onAllDone, allDone }) => {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [bgQuestions, setBgQuestions] = React.useState([]);
  const [exiting, setExiting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const handleTyped = React.useCallback(() => {
    const idx = currentIdx;
    setExiting(true);
    setTimeout(() => {
      setBgQuestions(prev => [...prev, { text: QUESTIONS[idx], slot: BG_SLOTS[idx], idx }]);
      setExiting(false);
      if (idx + 1 >= QUESTIONS.length) {
        setDone(true);
        onAllDone && onAllDone();
      } else {
        setCurrentIdx(idx + 1);
      }
    }, 600);
  }, [currentIdx, onAllDone]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {bgQuestions.map((bq) => (
        <BgQuestion key={bq.idx} text={bq.text} slot={bq.slot} idx={bq.idx} clear={done || allDone} />
      ))}

      {!done && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 'min(760px, 82vw)',
          textAlign: 'center',
          opacity: exiting ? 0 : 1,
          filter: exiting ? 'blur(6px)' : 'blur(0px)',
          transform: `translate(-50%, -50%) scale(${exiting ? 0.94 : 1})`,
          transition: 'opacity 500ms cubic-bezier(.6,0,.2,1), filter 500ms, transform 500ms cubic-bezier(.6,0,.2,1)',
          pointerEvents: 'none',
        }}>
          <div className="mono" style={{
            fontSize: 10, letterSpacing: '0.24em',
            color: 'var(--ink-faint)', marginBottom: 20,
          }}>
            Q{String(currentIdx + 1).padStart(2, '0')} / {QUESTIONS.length}
          </div>
          <div style={{
            fontSize: 'clamp(26px, 3.4vw, 46px)',
            lineHeight: 1.25, letterSpacing: '-0.01em',
            fontWeight: 500, color: 'var(--ink)',
            fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
          }}>
            <TypewriterCenter key={currentIdx} text={QUESTIONS[currentIdx]} onDone={handleTyped} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes bgFadeIn { from { opacity:0; filter:blur(6px); } to { opacity:1; filter:blur(2px); } }
        @keyframes caretBlink { 50% { opacity:0; } }
      `}</style>
    </div>
  );
};

window.QUESTIONS = QUESTIONS;
window.Q_GROUP = Q_GROUP;
window.TAB_LABELS = TAB_LABELS;
window.SequentialQuestions = SequentialQuestions;
window.FloatingQuestions = SequentialQuestions;
