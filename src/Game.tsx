import React, {
  useEffect, useRef, useState,
} from 'react';
import {
  Button, RadioChangeEvent,
} from 'antd';
import useSound from 'use-sound';
import sounds from './assets/sounds';
import Board from './Board/Board';
import MovesDropdown from './MovesDropdown/MovesDropdown';
import calcWonIndexes from './calcWonIndexes';
import SettingsPopover from './SettingsPopover/SettingsPopover';
import EMOJI, { convertToEmoji, emojiSetNames, emojiSet } from './emoji';
import { sizes, XO } from './Square/Square';

function isBoardFull(state: {squares: XO[]}) {
  return state.squares.indexOf(null) === -1;
}

export type themes = 'Autumn' | 'Winter' | 'Spring';

const App: React.FC = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [squareSize, setSquareSize] = useState<sizes>('small');
  const [theme, setTheme] = useState<themes>('Autumn');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [soundOptions, setSoundOptions] = useState({
    volume: 0.5,
    soundEnabled: true,
  });
  const [musicOptions, setMusicOptions] = useState({
    volume: 0.5,
    soundEnabled: false,
  });
  const [emojisName, setEmojisName] = useState<emojiSetNames>('simple');
  const [emojis, setEmojis] = useState<emojiSet>(EMOJI[emojisName]);
  const [playClickSound] = useSound(sounds.click, soundOptions);
  const [playWinSound] = useSound(sounds.win, soundOptions);
  const [playMusic, { pause }] = useSound(sounds.music, musicOptions);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    if (windowWidth < 440) setSquareSize('small');
  };

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
      volume: prev.volume > 0 ? prev.volume : 0.5,
    }));
  };

  const handleSoundVolumeChange = (value: number) => {
    setSoundOptions(() => ({
      soundEnabled: value > 0,
      volume: value / 100,
    }));
  };

  const handleMusicToggle = () => {
    setMusicOptions((prev) => ({
      soundEnabled: !prev.soundEnabled,
      volume: prev.volume > 0 ? prev.volume : 0.75,
    }));
  };

  useEffect(() => {
    if (musicOptions.soundEnabled) playMusic();
    else pause();
  }, [musicOptions.soundEnabled, pause, playMusic]);

  const handleMusicVolumeChange = (value: number) => {
    setMusicOptions(() => ({
      soundEnabled: value > 0,
      volume: value / 100,
    }));
  };

  const handleSymbolsChange = (event: RadioChangeEvent) => {
    const targetSetName: emojiSetNames = event.target.value;
    setEmojisName(targetSetName);
    setEmojis(EMOJI[targetSetName]);
  };

  const handleSquareClick = (i: number) => {
    const hist = history.slice(0, stepNumber + 1);
    const curr = hist[hist.length - 1];
    const squares = [...curr.squares];

    if (calcWonIndexes(squares) || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(hist.concat([{ squares }]));
    setXIsNext((prev) => !prev);
    setStepNumber(hist.length);
    playClickSound();

    if (calcWonIndexes(squares)) {
      playWinSound();
    }
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

  const formatSquares = (squares: XO[]) => squares.map((el) => convertToEmoji(el, emojis));

  const current = history[stepNumber];
  const wonIndexes = calcWonIndexes(current.squares);
  const whoIsNext = xIsNext ? emojis.x : emojis.o;
  const status = useRef('');

  if (wonIndexes) {
    status.current = `Winner is ${convertToEmoji(current.squares[wonIndexes[0]], emojis)}`;
  } else if (isBoardFull(current)) {
    status.current = 'Draw game';
  } else {
    status.current = `Next player: ${whoIsNext}`;
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  });

  return (
    <div className={`game ${theme}`}>
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
          isMusic={musicOptions.soundEnabled}
          musicVolume={musicOptions.volume}
          onMusicToggle={handleMusicToggle}
          onMusicSliderChange={handleMusicVolumeChange}
          emojiSetName={emojisName}
          onSymbolsChange={handleSymbolsChange}
          size={squareSize}
          onSizeChange={handleSquareSizeChange}
        />
        <Button type="default" ghost onClick={startNewGame}>
          New game
        </Button>
        <div>{status.current}</div>
      </div>
      <div className="game-board">
        <Board
          theme={theme}
          squares={formatSquares(current.squares)}
          onClick={handleSquareClick}
          size={squareSize}
          wonIndexes={wonIndexes}
        />
      </div>
      <div className="game-history">
        <MovesDropdown history={history} onItemClick={jumpTo} />
      </div>
    </div>
  );
};

export default App;
