import Mark from "./Mark.jsx";

export default function Board({ board, winLine, locked, onPlay }) {
  return (
    <div className="stage">
      <div className="board">
        {board.map((value, i) => (
          <button
            key={i}
            className={`cell${winLine.includes(i) ? " win" : ""}`}
            disabled={!!value || locked}
            onClick={() => onPlay(i)}
            aria-label={`Square ${i + 1}${value ? `, ${value}` : ", empty"}`}
          >
            {value && <Mark sym={value} />}
          </button>
        ))}
      </div>
    </div>
  );
}
