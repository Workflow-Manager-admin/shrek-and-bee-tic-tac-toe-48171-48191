import { component$, useStore, useStyles$, $ } from "@builder.io/qwik";
import styles from "./TicTacToeBoard.css?inline";
import ImgShrek from "../media/shrek.png?jsx";
import ImgBee from "../media/bee.png?jsx";

/**
 * Represents the logical state of the board.
 */
type Player = "X" | "O" | null;

const BOARD_SIZE = 3;

// Coordination for win checks
const winningCoords = [
  // Rows
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  // Columns
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  // Diagonals
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

function checkWinner(board: Player[][]): Player | "draw" | null {
  for (const line of winningCoords) {
    const [a, b, c] = line;
    const val = board[a[0]][a[1]];
    if (val && val === board[b[0]][b[1]] && val === board[c[0]][c[1]]) {
      return val;
    }
  }
  const allFilled = board.every(row => row.every(cell => !!cell));
  if (allFilled) return "draw";
  return null;
}

// PUBLIC_INTERFACE
export const TicTacToeBoard = component$(() => {
  useStyles$(styles);

  const state = useStore({
    board: Array.from({ length: BOARD_SIZE }, () => Array<Player>(BOARD_SIZE).fill(null)),
    turn: "X" as Player,
    status: "playing" as "playing" | "X" | "O" | "draw",
    winLine: null as null | number,
  });

  const play = $((row: number, col: number) => {
    if (state.status !== "playing") return;
    if (state.board[row][col] !== null) return;
    state.board[row][col] = state.turn;
    const winner = checkWinner(state.board);
    if (winner && winner !== "draw") {
      state.status = winner;
    } else if (winner === "draw") {
      state.status = "draw";
    } else {
      state.turn = state.turn === "X" ? "O" : "X";
    }
  });

  const reset = $(() => {
    state.board = Array.from({ length: BOARD_SIZE }, () => Array<Player>(BOARD_SIZE).fill(null));
    state.turn = "X";
    state.status = "playing";
  });

  function pieceContent(cell: Player) {
    if (cell === "X") return <ImgShrek style="width:90%;height:90%;object-fit:contain;filter:drop-shadow(0 2px 8px #2196F3AA);" />;
    if (cell === "O") return <ImgBee style="width:85%;height:85%;object-fit:contain;filter:drop-shadow(0 2px 8px #FFC10799);" />;
    return null;
  }

  let message = "";
  if (state.status === "playing") {
    message = `Turn: ${state.turn === "X" ? "Shrek" : "Bee"}`;
  } else if (state.status === "X") {
    message = "Shrek wins! 🏆";
  } else if (state.status === "O") {
    message = "Bee wins! 🥇";
  } else if (state.status === "draw") {
    message = "It's a draw! 🤝";
  }

  return (
    <div class="ttt-outer">
      <div class="ttt-status">{message}</div>
      <div class="ttt-board">
        {state.board.map((row, rIdx) => (
          <div class="ttt-row" key={"r" + rIdx}>
            {row.map((cell, cIdx) => (
              <button
                key={`c${cIdx}`}
                aria-label={`Cell ${rIdx + 1}, ${cIdx + 1}`}
                class={`ttt-cell${cell === "X" ? " ttt-x" : cell === "O" ? " ttt-o" : ""}`}
                disabled={!!cell || state.status !== "playing"}
                onClick$={() => play(rIdx, cIdx)}
              >
                {pieceContent(cell)}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button class="ttt-reset" onClick$={reset}>
        Reset Game
      </button>
    </div>
  );
});
