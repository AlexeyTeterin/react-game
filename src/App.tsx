import React, { useState } from 'react';
import { Button, Slider } from 'antd';
import './App.css';
import Board, { XO } from './Board/Board';

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

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [size] = useState('m');
  const whoIsNext = xIsNext ? 'X' : 'O';

  const handleClick = (i: number) => {
    const hist = history.slice(0, stepNumber + 1);
    const current = hist[hist.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = whoIsNext;
    setHistory(hist.concat([{ squares }]));
    setXIsNext((prev) => !prev);
    setStepNumber(hist.length);
  };

  const jumpTo = (move: number) => {
    setXIsNext(() => (move % 2) === 0);
    setStepNumber(move);
  };

  const startNewGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setXIsNext(true);
    setStepNumber(0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;

  const moves = history.map((step, move: number) => {
    const desc = move
      ? `Go to move # ${move}`
      : 'To game start';
    return (
      <li key={Math.random()}>
        <Button
          type="dashed"
          onClick={() => jumpTo(move)}
        >
          {desc}
        </Button>
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

  return (
    <div className="game">
      <div className="game-board">
        <div className="game-controls">
          <Button
            type="primary"
            onClick={startNewGame}
          >
            New game
          </Button>
          <Slider min={0} max={100} defaultValue={30} />
          <div>{status}</div>
        </div>
        <Board
          squares={current.squares}
          onClick={handleClick}
          size={size}
        />
      </div>
      <div className="game-history">
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

export default App;
