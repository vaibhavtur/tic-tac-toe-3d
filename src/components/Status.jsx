import Mark from "./Mark.jsx";

export default function Status({ result, turn, names, thinking }) {
  let content;
  if (result.winner) {
    content = (
      <div className="row big" role="status">
        <Mark sym={result.winner} />{names[result.winner]} wins!
      </div>
    );
  } else if (result.tie) {
    content = <div className="row big" role="status">It's a tie!</div>;
  } else {
    content = (
      <div className="row" role="status">
        <Mark sym={turn} />{thinking ? "Machine is thinking…" : `${names[turn]}'s turn`}
      </div>
    );
  }
  return <div className="status">{content}</div>;
}
