interface StepListProps {
  steps: { title: string; description: string; code?: string }[];
}

export default function StepList({ steps }: StepListProps) {
  return (
    <ol className="docs-steps">
      {steps.map((step, i) => (
        <li key={i} className="docs-step">
          <div className="docs-step-num">{i + 1}</div>
          <div className="docs-step-body">
            <div className="docs-step-title">{step.title}</div>
            <p className="docs-step-desc">{step.description}</p>
            {step.code && (
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  background: "#0a0a16",
                  border: "1px solid rgba(34,197,94,0.12)",
                  borderRadius: "6px",
                  padding: "10px 14px",
                  color: "#86efac",
                  marginTop: "8px",
                }}
              >
                <span style={{ color: "#22c55e", userSelect: "none" }}>$ </span>
                {step.code}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
