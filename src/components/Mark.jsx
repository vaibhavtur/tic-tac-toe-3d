// Renders an "O" ring or a "*" star. Gradients (#gO, #gS) are defined in index.html.
export default function Mark({ sym }) {
  if (sym === "O") {
    return (
      <svg viewBox="0 0 100 100" role="img" aria-label="O">
        <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gO)" strokeWidth="16" />
        <circle
          cx="50" cy="50" r="35" fill="none" stroke="#fff" strokeOpacity=".45"
          strokeWidth="4" strokeLinecap="round" strokeDasharray="50 400"
          transform="rotate(-150 50 50)"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="*">
      {[0, 60, 120].map((angle) => (
        <line
          key={angle} x1="50" y1="9" x2="50" y2="91" stroke="url(#gS)"
          strokeWidth="15" strokeLinecap="round" transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}
