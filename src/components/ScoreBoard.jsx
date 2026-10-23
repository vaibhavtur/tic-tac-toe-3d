import Mark from "./Mark.jsx";

function ScoreBox({ label, value, sym, active }) {
  return (
    <div className={`score${active ? " active" : ""}`}>
      <div className="who">{sym && <Mark sym={sym} />}{label}</div>
      <div className="n">{value}</div>
    </div>
  );
}

export default function ScoreBoard({ scores, names, turn, over }) {
  return (
    <div className="scores">
      <ScoreBox label={names.O} value={scores.O} sym="O" active={!over && turn === "O"} />
      <ScoreBox label="Ties" value={scores.tie} />
      <ScoreBox label={names["*"]} value={scores["*"]} sym="*" active={!over && turn === "*"} />
    </div>
  );
}
