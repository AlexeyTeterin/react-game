import React, { useState } from 'react';
import {
  Button, Slider,
} from 'antd';
import Board, { XO } from './Board/Board';
import MovesDropdown from './MovesDropdown/MovesDropdown';
import calculateWinner from './calculateWinner';
import SettingsPopover from './SettingsPopover/SettingsPopover';

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
          {/* <SettingOutlined className="settingsBtn" /> */}
          <SettingsPopover />
          <Button type="default" ghost onClick={startNewGame}>
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
        <MovesDropdown history={history} onItemClick={jumpTo} />
      </div>
    </div>
  );
}

export default App;
