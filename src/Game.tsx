import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
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
  const [stepNumber, setStepNumber] = useState<number>(0);
  const soundOptions = {
    soundEnabled: props.isSound,
    volume: props.soundVolume,
  };
  const musicOptions = {
    soundEnabled: props.isMusic,
    volume: props.musicVolume,
  };
  const [playClickSound] = useSound(sounds.click, soundOptions);
  const [playWinSound] = useSound(sounds.win, soundOptions);
  const [playMusic, { pause }] = useSound(sounds.music, musicOptions);
  const [indexOfFocused, setFocused] = useState(-1);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    if (windowWidth < 440) props.setSquareSize('small');
  };

  useEffect(() => {
    if (musicOptions.soundEnabled) playMusic();
    else pause();
  }, [musicOptions.soundEnabled, pause, playMusic]);

  const handleSquareClick = (i: number) => {
    const hist = props.history.slice(0, stepNumber + 1);
    const curr = hist[hist.length - 1];
    const squares = [...curr.squares];

    if (calcWonIndexes(squares) || squares[i]) return;

    squares[i] = props.xIsNext ? 'X' : 'O';
    props.setHistory(hist.concat([{ squares }]));
    props.setXIsNext(!props.xIsNext);
    setStepNumber(hist.length);
    playClickSound();

    if (calcWonIndexes(squares)) {
      playWinSound();
    }
  };

  const jumpToMove = (move: number) => {
    props.setXIsNext((move % 2) === 0);
    setStepNumber(move);
  };

  const startNewGame = () => {
    setStepNumber(0);
    props.setHistory([{ squares: Array(9).fill(null) }]);
    props.setXIsNext(true);
  };

  const formatSquares = (squares: XO[]) => squares
    .map((el) => convertToEmoji(el, EMOJI[props.emojis]));

  const current = props.history[stepNumber];
  const wonIndexes = calcWonIndexes(current.squares);
  const whoIsNext = props.xIsNext ? EMOJI[props.emojis].x : EMOJI[props.emojis].o;
  const status = useRef('');

  const handleKeyDown = (e: any) => {
    switch (e.code) {
      case 'ArrowRight':
        setFocused((prev) => (prev % 3 === 2 ? prev - 2 : prev + 1));
        break;
      case 'ArrowLeft':
        setFocused((prev) => (prev % 3 === 0 ? prev + 2 : prev - 1));
        break;
      case 'ArrowDown':
        setFocused((prev) => (prev > 5 ? prev - 6 : prev + 3));
        break;
      case 'ArrowUp':
        setFocused((prev) => (prev < 3 ? prev + 6 : prev - 3));
        break;
      case 'Enter':
      case 'NumpadEnter':
      case 'Space':
        document.querySelector('.focus')?.dispatchEvent(new Event('click', { bubbles: true }));
        break;
      case 'KeyN':
      case 'Delete':
        startNewGame();
        break;
      case 'Backspace':
        setFocused(-1);
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
        <SettingsPopover />
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
          squares={formatSquares(current.squares)}
          onClick={handleSquareClick}
          wonIndexes={wonIndexes}
          indexOfFocused={indexOfFocused}
        />
      </div>
      <div className="game-history">
        <MovesDropdown history={props.history} onItemClick={jumpToMove} />
      </div>
    </div>
  );
};

export default connector(App);
