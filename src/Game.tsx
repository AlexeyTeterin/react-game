import React, {
  useEffect, useRef, useState,
} from 'react';
import {
  Button,
} from 'antd';
import useSound from 'use-sound';
import sounds from './assets/sounds';
import Board from './Board/Board';
import MovesDropdown from './MovesDropdown/MovesDropdown';
import calcWonIndexes from './calcWonIndexes';
import SettingsPopover from './SettingsPopover/SettingsPopover';
import EMOJI, { convertToEmoji } from './emoji';
import { connector, PropsFromRedux } from './redux/rootReducer';
import { XO } from './types';

function isBoardFull(state: {squares: XO[]}) {
  return state.squares.indexOf(null) === -1;
}

const App: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [soundOptions, setSoundOptions] = useState({
    volume: 0.5,
    soundEnabled: true,
  });
  const [musicOptions, setMusicOptions] = useState({
    volume: 0.5,
    soundEnabled: false,
  });
  const [playClickSound] = useSound(sounds.click, soundOptions);
  const [playWinSound] = useSound(sounds.win, soundOptions);
  const [playMusic, { pause }] = useSound(sounds.music, musicOptions);
  const [indexOfFocused, setFocused] = useState(-1);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    if (windowWidth < 440) props.setSquareSize('small');
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

  const jumpTo = (move: number) => {
    setXIsNext(() => (move % 2) === 0);
    setStepNumber(move);
  };

  const startNewGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setXIsNext(true);
    setStepNumber(0);
  };

  const formatSquares = (squares: XO[]) => squares
    .map((el) => convertToEmoji(el, EMOJI[props.emojis]));

  const current = history[stepNumber];
  const wonIndexes = calcWonIndexes(current.squares);
  const whoIsNext = xIsNext ? EMOJI[props.emojis].x : EMOJI[props.emojis].o;
  const status = useRef('');

  const handleKeyDown = (e: any) => {
    console.log(e);
    switch (e.key) {
      case 'ArrowRight':
        setFocused((prev) => (prev % 3 === 2 ? prev : prev + 1));
        break;
      case 'ArrowLeft':
        setFocused((prev) => (prev % 3 === 0 ? prev : prev - 1));
        break;
      case 'ArrowDown':
        setFocused((prev) => (prev > 5 ? prev : prev + 3));
        break;
      case 'ArrowUp':
        setFocused((prev) => (prev < 3 ? prev : prev - 3));
        break;
      case 'Enter':
        document.querySelector('.focus')!.dispatchEvent(new Event('click', { bubbles: true }));
        break;
      default:
    }
  };

  if (wonIndexes) {
    status.current = `Winner is ${convertToEmoji(current.squares[wonIndexes[0]], EMOJI[props.emojis])}`;
  } else if (isBoardFull(current)) {
    status.current = 'Draw game';
  } else {
    status.current = `Next player: ${whoIsNext}`;
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className={`game ${props.theme}`}>
      <div className="game-controls">
        <SettingsPopover
          isSound={soundOptions.soundEnabled}
          soundVolume={soundOptions.volume}
          onSoundToggle={handleSoundToggle}
          onSoundSliderChange={handleSoundVolumeChange}
          isMusic={musicOptions.soundEnabled}
          musicVolume={musicOptions.volume}
          onMusicToggle={handleMusicToggle}
          onMusicSliderChange={handleMusicVolumeChange}
        />
        <Button
          type="default"
          ghost
          onClick={startNewGame}
          onMouseDown={(e) => e.preventDefault()}
        >
          New game
        </Button>
        <div>{status.current}</div>
      </div>
      <div className="game-board">
        <Board
          theme={props.theme}
          squares={formatSquares(current.squares)}
          onClick={handleSquareClick}
          size={props.squareSize}
          wonIndexes={wonIndexes}
          indexOfFocused={indexOfFocused}
        />
      </div>
      <div className="game-history">
        <MovesDropdown history={history} onItemClick={jumpTo} />
      </div>
    </div>
  );
};

export default connector(App);
