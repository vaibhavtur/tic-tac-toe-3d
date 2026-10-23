export const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export const emptyBoard = () => Array(9).fill(null);

// Returns { winner: 'O' | '*' | null, line: number[], tie: boolean }
export function judge(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c], tie: false };
    }
  }
  return { winner: null, line: [], tie: board.every(Boolean) };
}

// '*' = machine (maximiser), 'O' = human (minimiser)
function minimax(board, player, depth) {
  const { winner, tie } = judge(board);
  if (winner === "*") return 10 - depth;
  if (winner === "O") return depth - 10;
  if (tie) return 0;

  let best = player === "*" ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue;
    board[i] = player;
    const score = minimax(board, player === "*" ? "O" : "*", depth + 1);
    board[i] = null;
    best = player === "*" ? Math.max(best, score) : Math.min(best, score);
  }
  return best;
}

// level: 'easy' (random) | 'hard' (unbeatable)
export function machineMove(board, level) {
  const empties = board.map((v, i) => (v ? null : i)).filter((i) => i !== null);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  if (level === "easy") return pick(empties);

  let bestScore = -Infinity;
  let bestMoves = [];
  for (const i of empties) {
    const copy = board.slice();
    copy[i] = "*";
    const score = minimax(copy, "O", 1);
    if (score > bestScore) { bestScore = score; bestMoves = [i]; }
    else if (score === bestScore) bestMoves.push(i);
  }
  return pick(bestMoves);
}
