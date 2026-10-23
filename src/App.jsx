import { useEffect, useMemo, useState } from "react";
import { emptyBoard, judge, machineMove } from "./logic/game.js";
import Mark from "./components/Mark.jsx";
import Controls from "./components/Controls.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";
import Status from "./components/Status.jsx";
import Board from "./components/Board.jsx";

const NO_SCORES = { O: 0, "*": 0, tie: 0 };

export default function App() {
  const [mode, setMode] = useState("cpu");      // 'pvp' | 'cpu'
  const [level, setLevel] = useState("hard");   // 'easy' | 'hard'
  const [board, setBoard] = useState(emptyBoard);
  const [turn, setTurn] = useState("O");
  const [starter, setStarter] = useState("O");
  const [scores, setScores] = useState(NO_SCORES);

  const result = useMemo(() => judge(board), [board]);
  const over = !!result.winner || result.tie;
  const machineTurn = mode === "cpu" && turn === "*" && !over;
  const names = mode === "cpu"
    ? { O: "You", "*": "Machine" }
    : { O: "Player 1", "*": "Player 2" };

  function play(i) {
    if (board[i] || over) return;
    const next = board.slice();
    next[i] = turn;
    setBoard(next);
    const r = judge(next);
    if (r.winner) setScores((s) => ({ ...s, [r.winner]: s[r.winner] + 1 }));
    else if (r.tie) setScores((s) => ({ ...s, tie: s.tie + 1 }));
    else setTurn(turn === "O" ? "*" : "O");
  }

  // Machine plays "*"
  useEffect(() => {
    if (!machineTurn) return;
    const id = setTimeout(() => play(machineMove(board, level)), 500);
    return () => clearTimeout(id);
  }, [board, turn, mode, level, over]); // eslint-disable-line react-hooks/exhaustive-deps

  const resetRound = (s) => { setBoard(emptyBoard()); setTurn(s); setStarter(s); };
  const fullReset = () => { setScores(NO_SCORES); resetRound("O"); };
  const nextRound = () => resetRound(starter === "O" ? "*" : "O");

  return (
    <main className="app">
      <div className="logo"><Mark sym="O" />Tic Tac Toe<Mark sym="*" /></div>

      <Controls
        mode={mode}
        level={level}
        onMode={(m) => { setMode(m); fullReset(); }}
        onLevel={(l) => { setLevel(l); fullReset(); }}
      />

      <ScoreBoard scores={scores} names={names} turn={turn} over={over} />
      <Status result={result} turn={turn} names={names} thinking={machineTurn} />
      <Board board={board} winLine={result.line} locked={over || machineTurn} onPlay={play} />

      <div className="actions">
        <button
          className={`btn${over ? " pulse" : ""}`}
          onClick={over ? nextRound : () => resetRound(starter)}
        >
          {over ? "Next round" : "Restart round"}
        </button>
        <button className="btn ghost" onClick={fullReset}>Reset score</button>
      </div>
    </main>
  );
}
