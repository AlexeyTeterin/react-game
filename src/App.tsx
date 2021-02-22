import React, { useState } from 'react';
import {
  Button, RadioChangeEvent,
} from 'antd';
import Board, { XO } from './Board/Board';
import MovesDropdown from './MovesDropdown/MovesDropdown';
import calculateWinner from './calculateWinner';
import SettingsPopover from './SettingsPopover/SettingsPopover';

function isBoardFull(state: {squares: XO[]}) {
  return state.squares.indexOf(null) === -1;
}

export type sizes = 'sm' | 'm' | 'lg';
export type themes = 'Autumn' | 'Winter' | 'Spring';

const App: React.FC = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [size] = useState<sizes>('m');
  const [theme, setTheme] = useState<themes>('Autumn');
  const whoIsNext = xIsNext ? 'X' : 'O';

  const handleThemeChange = (event: RadioChangeEvent) => {
    const target = event.target!;
    setTheme(target.value);
  };

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
    <div className={`game ${theme}`}>
      <div className="game-board">
        <div className="game-controls">
          <SettingsPopover
            themeSelect={theme}
            onThemeChange={handleThemeChange}
          />
          <Button type="default" ghost onClick={startNewGame}>
            New game
          </Button>
          <div>{status}</div>
        </div>
        <Board
          theme={theme}
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
};

export default App;
