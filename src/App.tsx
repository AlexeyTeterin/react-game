import React, { useState } from 'react';
import './App.css';
import Board, { XO } from './Board';

// interface State {
//   history: Array<Array<XO>>;
//   xIsNext: boolean;
// }

function App() {
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
  });
  const { history } = state;
  const current = history[history.length - 1];
  const whoIsNext = state.xIsNext ? 'X' : 'O';
  const winner = calculateWinner(current.squares);
  let status;
  const moves = history.map((step, move: number) => {
    const desc = move
      ? `Go to move # ${move}`
      : 'To beginning';
    return (
      <li>
        <button
          type="button"
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  if (winner) {
    status = `Winner is ${winner}`;
  } else if (isBoardFull(current)) {
    status = 'Draw game';
  } else {
    status = `Next player: ${whoIsNext}`;
  }

  const jumpTo = (move: number) => { console.log(move); };

  const handleClick = (i: number) => {
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = state.xIsNext ? 'X' : 'O';

    setState({
      history: history.concat([{ squares }]),
      xIsNext: !state.xIsNext,
    });
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: Array<XO>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(state: {squares: Array<XO>}) {
  return state.squares.indexOf(null) === -1;
}

export default App;
