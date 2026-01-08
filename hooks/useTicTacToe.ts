import { useState } from "react";

export type Cell = "X" | "O" | null;

export type WinningLine = {
  type: "row" | "col" | "diag";
  index: number;
};

type WinnerResult =
  | {
      winner: "X" | "O";
      line: WinningLine;
    }
  | {
      winner: "Draw";
      line: null;
    }
  | null;

export function useTicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState<Cell | "Draw" | null>(null);
  const [winningLine, setWinningLine] = useState<WinningLine | null>(null);

  const checkWinner = (newBoard: Cell[]): WinnerResult => {
    const lines = [
      // rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonals
      [0, 4, 8],
      [2, 4, 6],
    ] as const;

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      const value = newBoard[a];

      if (value && value === newBoard[b] && value === newBoard[c]) {
        if (i < 3) {
          return { winner: value, line: { type: "row", index: i } };
        }
        if (i < 6) {
          return { winner: value, line: { type: "col", index: i - 3 } };
        }
        return {
          winner: value,
          line: { type: "diag", index: i === 6 ? 0 : 1 },
        };
      }
    }

    if (newBoard.every(Boolean)) {
      return { winner: "Draw", line: null };
    }

    return null;
  };

  const makeMove = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    const result = checkWinner(newBoard);

    setBoard(newBoard);

    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setWinningLine(null);
  };

  return {
    board,
    isXTurn,
    winner,
    winningLine,
    makeMove,
    resetGame,
  };
}
