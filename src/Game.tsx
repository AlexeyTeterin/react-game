import React, { useState } from 'react';
import {
  Button, RadioChangeEvent,
} from 'antd';
import useSound from 'use-sound';
import sounds from './assets/sounds';
import Board, { XO } from './Board/Board';
import MovesDropdown from './MovesDropdown/MovesDropdown';
import calculateWinner from './calculateWinner';
import SettingsPopover from './SettingsPopover/SettingsPopover';
import EMOJI, { convertToEmoji, emojiSetNames, emojiSet } from './emoji';

function isBoardFull(state: {squares: XO[]}) {
  return state.squares.indexOf(null) === -1;
}

export type sizes = 'small' | 'medium' | 'large';
export type themes = 'Autumn' | 'Winter' | 'Spring';

const App: React.FC = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [squareSize, setSquareSize] = useState<sizes>('small');
  const [theme, setTheme] = useState<themes>('Autumn');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [soundOptions, setSoundOptions] = useState({
    volume: 1,
    soundEnabled: true,
  });
  const [emojisName, setEmojisName] = useState<emojiSetNames>('simple');
  const [emojis, setEmojis] = useState<emojiSet>(EMOJI[emojisName]);
  const [playClickSound] = useSound(sounds.click, soundOptions);
  const [playWinSound] = useSound(sounds.win, soundOptions);
  const whoIsNext = xIsNext ? emojis.x : emojis.o;

  const handleThemeChange = (event: RadioChangeEvent) => {
    const { target } = event;
    setTheme(target.value);
  };

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const handleSoundToggle = () => {
    setSoundOptions((prev) => ({
      soundEnabled: !prev.soundEnabled,
      volume: prev.volume > 0 ? prev.volume : 0.75,
    }));
  };

  const handleSoundVolumeChange = (value: number) => {
    setSoundOptions(() => ({
      soundEnabled: value > 0,
      volume: value / 100,
    }));
  };

  const handleSymbolsChange = (event: RadioChangeEvent) => {
    const targetSetName: emojiSetNames = event.target.value;
    setEmojisName(targetSetName);
    setEmojis(EMOJI[targetSetName]);
  };

  const handleSquareClick = (i: number, row: number) => {
    const hist = history.slice(0, stepNumber + 1);
    const curr = hist[hist.length - 1];
    const squares = [...curr.squares];

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(hist.concat([{ squares }]));
    setXIsNext((prev) => !prev);
    setStepNumber(hist.length);
    playClickSound();
    document.querySelector('.board')?.children[row].children[(i % 3)].classList.add('animate');

    if (calculateWinner(squares)) playWinSound();
  };

  const handleSquareSizeChange = (event: RadioChangeEvent) => setSquareSize(event.target.value);

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

  const formatSquares = (squares: XO[]) => squares.map((el) => convertToEmoji(el, emojis));

  if (winner) {
    status = `Winner is ${convertToEmoji(winner, emojis)}`;
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
            isDark={darkMode}
            onDarkModeChange={handleDarkModeChange}
            isSound={soundOptions.soundEnabled}
            soundVolume={soundOptions.volume}
            onSoundToggle={handleSoundToggle}
            onSoundSliderChange={handleSoundVolumeChange}
            emojiSetName={emojisName}
            onSymbolsChange={handleSymbolsChange}
            size={squareSize}
            onSizeChange={handleSquareSizeChange}
          />
          <Button type="default" ghost onClick={startNewGame}>
            New game
          </Button>
          <div>{status}</div>
        </div>
        <Board
          theme={theme}
          squares={formatSquares(current.squares)}
          onClick={handleSquareClick}
          size={squareSize}
        />
      </div>
      <div className="game-history">
        <MovesDropdown history={history} onItemClick={jumpTo} />
      </div>
    </div>
  );
};

export default App;
