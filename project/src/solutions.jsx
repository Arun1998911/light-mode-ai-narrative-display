// Solutions screen — 4 tab cards + split-panel Q&A

const TABS_DATA = [
  {
    label: "AI Accuracy\n& Reliability",
    short: "AI Accuracy",
    icon: window.__res('AccuracyAIlogo','src/AccuracyAIlogo.jpg'),
    qa: [
      {
        q: "What happens when the AI gives wrong feedback or hallucinations?",
        keywords: ["Confidence Gating", "Human-in-the-Loop", "Feedback Correction Loop"],
        a: `We've implemented a Confidence Gating System. Every AI output carries a confidence score. Below a defined threshold, the response is automatically flagged and routed to a Human-in-the-Loop (HITL) review queue before the learner ever sees it.

On top of that, we run semantic consistency checks — if an AI response contradicts established rubric anchors or factual knowledge in your content library, it's caught at the output layer.

We also maintain a Feedback Correction Loop — every instructor override trains the model to reduce that error class going forward.`,
      },
      {
        q: "How do we know the AI's assessments are fair and unbiased?",
        keywords: ["DIF Analysis", "Third-Party Auditors", "Quarterly Bias Testing"],
        a: `We run differential item functioning (DIF) analysis — a psychometric method used in standardised testing — across demographic subgroups after every model update. If any evaluation construct shows statistical variance across gender, language background, or geography, it triggers an automatic model review.

We also partner with third-party AI auditors who run independent bias testing on a quarterly basis. The reports are available to enterprise clients.

We don't self-certify fairness — we verify it externally.`,
      },
      {
        q: "How transparent is the AI in explaining its reasoning?",
        keywords: ["Explainable AI (XAI)", "Attention Mapping", "Decision Audit Report"],
        a: `We implement Explainable AI (XAI) using attention mapping and rubric-trace outputs — every piece of feedback shows which part of the learner's response drove the evaluation, which rubric criterion it mapped to, and what a stronger response would look like.

This isn't a summary — it's a traceable reasoning chain. Instructors can pull a full Decision Audit Report for any learner interaction, exportable as a structured JSON or PDF for compliance purposes.`,
      },
    ],
  },
  {
    label: "Data Privacy\n& Security",
    short: "Data Privacy",
    icon: window.__res('Datasecuritylogo','src/Datasecuritylogo.png'),
    qa: [
      {
        q: "Who owns the learner data generated?",
        keywords: ["Data Sovereignty", "GDPR Article 28", "Isolated Tenants"],
        a: `Contractually and architecturally — you do. We enforce data sovereignty through isolated tenant environments. Your data never co-mingles with another organization's data.

We operate as a Data Processor under GDPR Article 28, meaning we have zero legal basis to use your data for anything outside of delivering the contracted service — including model training.

This is enforced at the infrastructure level, not just in policy.`,
      },
      {
        q: "Where is data stored, and for how long?",
        keywords: ["Data Residency", "Data Lifecycle Manager", "GDPR Article 17"],
        a: `Data residency is customer-configurable — you choose AWS, Azure, or GCP, and the specific region (US, EU, APAC). Retention is governed by policies your admin team sets through our Data Lifecycle Manager.

We support automated purge schedules, right-to-erasure workflows compliant with GDPR Article 17, and full audit trails of every deletion event.`,
      },
      {
        q: "Can personally identifiable information (PII) be exposed?",
        keywords: ["PII Tokenization", "SOC 2 Type II", "Non-Reversible Tokens"],
        a: `PII never touches our AI inference layer. We use a PII Tokenization Pipeline at data ingestion — names, emails, employee IDs, and demographic identifiers are replaced with non-reversible tokens before any data reaches the model.

Our AI literally cannot see who a learner is — it only sees learning behavior.

This is validated in our annual SOC 2 Type II audit and penetration testing reports, which we share with enterprise clients under NDA.`,
      },
    ],
  },
  {
    label: "Control &\nFool-Proof AI",
    short: "Control",
    icon: window.__res('controllogo','src/controllogo.jpg'),
    qa: [
      {
        q: "How do we prevent learners from gaming or misusing the AI?",
        keywords: ["Behavioral Integrity Monitoring", "Anomaly Detection", "Adaptive Tasks"],
        a: `Our platform uses Behavioral Integrity Monitoring — a real-time anomaly detection layer that flags signals like: response time outliers, high semantic similarity to source material (plagiarism patterns), repetitive prompt injection attempts, and answer-fishing loops.

When gaming behavior is detected, the system doesn't penalize — it adapts the task variant to a form that cannot be gamed the same way.

The learner hits a wall of genuine challenge, not a punitive message.`,
      },
      {
        q: "What controls exist to set guardrails on AI behavior?",
        keywords: ["Policy Configuration Console", "Constitutional AI", "Output Filters"],
        a: `Admins access a Policy Configuration Console where they define: topic boundaries (what the AI will and won't engage with), response tone and formality profiles, competency scope per cohort, and intervention thresholds.

Under the hood, these translate into system-level prompt constraints and output filters enforced before any response is surfaced.

We also support Constitutional AI-style rule sets — you define the principles, the model is bound by them at inference time, not just at training.`,
      },
    ],
  },
  {
    label: "Explainable &\nAuditable AI",
    short: "Explainable",
    icon: window.__res('ExplainableAIlogo','src/ExplainableAIlogo.jpg'),
    qa: [
      {
        q: "Can the AI explain why it gave certain feedback or scores?",
        keywords: ["Rubric Trace Output", "EU AI Act", "Structured Breakdown"],
        a: `Every score is generated with a Rubric Trace Output — a structured breakdown showing: which competency was assessed, what evidence in the learner's response supported the score, which scoring band it fell into, and what the delta is to the next performance level.

This is rendered in natural language for the learner, and as a structured data object for instructors and administrators.

It was designed to meet the explainability requirements under the EU AI Act — not just as a feature, but as a compliance posture.`,
      },
      {
        q: "Is the model a black box, or is the logic auditable?",
        keywords: ["Model Card", "Immutable Audit Log", "GRC Integration"],
        a: `Fully auditable. We maintain a Model Card for every version of our evaluation model — documenting training data sources, evaluation benchmarks, known limitations, and bias test results.

Every inference event is logged with a unique transaction ID, timestamped, and stored in an immutable audit log for 12 months by default.

For regulated industries, we support integration with your GRC platforms and can produce audit packages for internal or external review on demand.`,
      },
    ],
  },
];

const QA_IMAGES = {
  "0-0": window.__res('AIaccuracyques1','src/AIaccuracyques1image.png'),
  "0-1": window.__res('AIaccuracyques2','src/AIaccuracyques2image.avif'),
  "0-2": window.__res('AIaccuracyques3','src/AIAccuracyques3image.webp'),
};
const HighlightedAnswer = ({ text, keywords }) => {
  const parts = [];
  let remaining = text;
  let idx = 0;

  // Build a regex from keywords
  const pattern = new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const splits = remaining.split(pattern);

  return (
    <span>
      {splits.map((part, i) => {
        const isKw = keywords.some(k => k.toLowerCase() === part.toLowerCase());
        return isKw
          ? <span key={i} style={{
              color: '#292524', fontWeight: 600,
              borderBottom: '1px solid rgba(41,37,36,0.2)',
            }}>{part}</span>
          : <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const SolutionsScreen = ({ visible }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeQ, setActiveQ] = React.useState(0);
  const [tabMounted, setTabMounted] = React.useState(false);
  const [answerKey, setAnswerKey] = React.useState(0); // force re-animation on answer change

  React.useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setTabMounted(true), 200);
      return () => clearTimeout(t);
    } else {
      setTabMounted(false);
    }
  }, [visible]);

  React.useEffect(() => {
    window.__solutionsSetTab = (i) => { handleTabChange(i); };
    return () => { delete window.__solutionsSetTab; };
  }, []);

  const handleTabChange = (i) => {
    setActiveTab(i);
    setActiveQ(0);
    setAnswerKey(k => k + 1);
  };

  const handleQChange = (i) => {
    setActiveQ(i);
    setAnswerKey(k => k + 1);
  };

  const tab = TABS_DATA[activeTab];
  const qItem = tab.qa[activeQ];

  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: visible ? 1 : 0,
      transition: 'opacity 600ms ease',
      pointerEvents: visible ? 'auto' : 'none',
      display: 'flex', flexDirection: 'column',
    }}>

      {/* ── Tab bar ── */}
      <div style={{
        display: 'flex', gap: 0,
        padding: '52px 32px 0',
        borderBottom: '1px solid var(--line)',
        flexShrink: 0,
      }}>
        {TABS_DATA.map((t, i) => {
          const active = activeTab === i;
          return (
            <button
              key={i}
              onClick={() => handleTabChange(i)}
              style={{
                flex: 1, background: active ? 'rgba(41,37,36,0.06)' : 'transparent',
                border: 'none',
                borderBottom: active ? '2px solid transparent' : '2px solid transparent',
                padding: '14px 20px 20px',
                cursor: 'pointer', textAlign: 'left',
                color: active ? '#1c1917' : 'var(--ink-mute)',
                opacity: tabMounted ? 1 : 0,
                transform: tabMounted ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: `${i * 70}ms`,
                fontFamily: "'Geist', sans-serif",
                position: 'relative',
                boxShadow: active
                  ? 'inset 0 -2px 0 #a855f7, 0 0 24px rgba(41,37,36,0.1)'
                  : 'none',
              }}
            >
              {/* shine removed */}
              <div style={{
                width: 36, height: 36, borderRadius: 10, overflow: 'hidden',
                marginBottom: 8,
                opacity: active ? 1 : 0.45,
                transition: 'opacity 220ms, box-shadow 300ms',
                boxShadow: active ? '0 0 14px rgba(41,37,36,0.25)' : 'none',
                flexShrink: 0,
              }}>
                <img src={t.icon} alt={t.short} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{
                fontSize: 13, fontWeight: active ? 500 : 400,
                lineHeight: 1.3, letterSpacing: '-0.01em',
                whiteSpace: 'pre-line',
                color: active ? '#292524' : 'var(--ink-mute)',
                transition: 'color 220ms',
              }}>
                {t.label}
              </div>
              <div className="mono" style={{
                marginTop: 6, fontSize: 9,
                color: active ? '#292524' : 'var(--ink-faint)',
                letterSpacing: '0.12em', transition: 'color 220ms',
              }}>
                {t.qa.length} Q{t.qa.length > 1 ? 'S' : ''}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Split panel ── */}
      <div style={{
        flex: 1, display: 'flex', overflow: 'hidden',
        opacity: tabMounted ? 1 : 0,
        transition: 'opacity 500ms 350ms',
      }}>

        {/* Left: Question list */}
        <div style={{
          width: 300, flexShrink: 0,
          borderRight: '1px solid var(--line)',
          overflowY: 'auto',
          padding: '28px 0',
        }}>
          <div className="mono" style={{
            fontSize: 9, letterSpacing: '0.22em', color: 'var(--ink-faint)',
            padding: '0 20px 14px',
          }}>
            QUESTIONS
          </div>
          {tab.qa.map((item, i) => {
            const active = activeQ === i;
            return (
              <button
                key={i}
                onClick={() => handleQChange(i)}
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  padding: '14px 20px',
                  textAlign: 'left', cursor: 'pointer',
                  borderLeft: active ? '2px solid #292524' : '2px solid transparent',
                  display: 'flex', flexDirection: 'column', gap: 6,
                  transition: 'background 200ms, border-color 200ms',
                  background: active ? 'rgba(41,37,36,0.06)' : 'transparent',
                  fontFamily: "'Geist', sans-serif",
                }}
              >
                <div className="mono" style={{
                  fontSize: 9, letterSpacing: '0.16em',
                  color: active ? 'var(--ink-mute)' : 'var(--ink-faint)',
                }}>
                  Q{String(i + 1).padStart(2, '0')}
                </div>
                <div style={{
                  fontSize: 12.5, lineHeight: 1.45, letterSpacing: '-0.005em',
                  color: active ? '#1c1917' : 'var(--ink-mute)',
                  transition: 'color 200ms',
                }}>
                  {item.q}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Answer */}
        <div
          key={answerKey}
          style={{
            flex: 1, overflowY: 'auto',
            padding: '40px 52px',
            animation: 'answerIn 420ms cubic-bezier(.2,.8,.2,1)',
          }}
        >
          {/* Q label */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32,
            padding: '16px 20px',
            background: 'rgba(41,37,36,0.06)',
            border: '1px solid rgba(41,37,36,0.12)',
            borderRadius: 14,
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: 12, overflow: 'hidden', flexShrink: 0,
              boxShadow: '0 0 22px rgba(41,37,36,0.2)',
            }}>
              <img src={tab.icon} alt={tab.short} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: '#292524', marginBottom: 4 }}>
                SOLUTION AREA
              </div>
              <div style={{
                fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em',
                color: '#1c1917', lineHeight: 1.2, whiteSpace: 'pre-line',
              }}>
                {tab.label}
              </div>
            </div>
          </div>

          <div className="mono" style={{
            fontSize: 10, letterSpacing: '0.22em', color: 'var(--ink-faint)',
            marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ width: 20, height: 1, background: 'var(--ink-faint)' }} />
            KNOLSKAPE'S ANSWER
          </div>

          {/* Question */}
          <h2 style={{
            margin: '0 0 32px', padding: 0,
            fontSize: 'clamp(20px, 2.4vw, 32px)', fontWeight: 500,
            lineHeight: 1.25, letterSpacing: '-0.025em',
            color: '#1c1917',
          }}>
            {qItem.q}
          </h2>

          {/* Keywords chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
            {qItem.keywords.map((kw, i) => (
              <span key={i} className="mono" style={{
                fontSize: 10, letterSpacing: '0.12em',
                padding: '5px 10px',
                border: '1px solid var(--line)',
                borderRadius: 99, color: 'var(--ink-mute)',
              }}>
                {kw}
              </span>
            ))}
          </div>

          {/* Answer paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {qItem.a.trim().split('\n\n').map((para, i) => (
              <p key={i} style={{
                margin: 0,
                fontSize: 15.5, lineHeight: 1.75,
                letterSpacing: '-0.005em',
                color: 'var(--ink-dim)',
                animationDelay: `${i * 80}ms`,
                animation: 'paraIn 500ms cubic-bezier(.2,.8,.2,1) both',
                animationDelay: `${80 + i * 100}ms`,
              }}>
                <HighlightedAnswer text={para} keywords={qItem.keywords} />
              </p>
            ))}
          </div>

          {/* Answer image if available */}
          {QA_IMAGES[`${activeTab}-${activeQ}`] && (
            <div style={{
              marginTop: 36,
              borderRadius: 16, overflow: 'hidden',
              border: '1px solid var(--line)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              animation: 'paraIn 500ms cubic-bezier(.2,.8,.2,1) both',
              animationDelay: '300ms',
            }}>
              <img
                src={QA_IMAGES[`${activeTab}-${activeQ}`]}
                alt="Supporting visual"
                style={{
                  width: '100%', height: 'auto',
                  display: 'block',
                  maxHeight: 340,
                  objectFit: 'cover',
                }}
              />
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes answerIn {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes paraIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tabShine {
          from { transform: translateX(-100%); }
          to   { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};

window.SolutionsScreen = SolutionsScreen;
