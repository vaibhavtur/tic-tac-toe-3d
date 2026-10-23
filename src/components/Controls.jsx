export default function Controls({ mode, level, onMode, onLevel }) {
  return (
    <div className="controls">
      <div className="seg" role="group" aria-label="Play mode">
        <button aria-pressed={mode === "pvp"} onClick={() => onMode("pvp")}>Play with user</button>
        <button aria-pressed={mode === "cpu"} onClick={() => onMode("cpu")}>Play with machine</button>
      </div>
      <div className={`seg${mode === "cpu" ? "" : " hidden"}`} role="group" aria-label="Machine level">
        <button aria-pressed={level === "easy"} onClick={() => onLevel("easy")}>Easy</button>
        <button aria-pressed={level === "hard"} onClick={() => onLevel("hard")}>Hard</button>
      </div>
    </div>
  );
}
