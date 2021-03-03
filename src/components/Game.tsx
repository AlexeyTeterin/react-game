import React, { useEffect, useRef } from 'react';
import { Button } from 'antd';
import useSound from 'use-sound';
import sounds from '../assets/sounds';
import EMOJI from '../emoji';
import connector, { PropsFromRedux } from '../redux/connector';
import * as controller from '../controller';
import Board from '../components/Board/Board';
import MovesDropdown from '../components/MovesDropdown/MovesDropdown';
import InfoPopover from '../components/InfoPopover/InfoPopover';
import SettingsPopover from '../components/SettingsPopover/SettingsPopover';

const App: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
  const soundProps = { soundEnabled: props.isSound, volume: props.soundVolume };
  const musicProps = { soundEnabled: props.isMusic, volume: props.musicVolume };
  const isCurrentBoardFull = props.currentBoard.squares.indexOf(null) === -1;
  const emojiX = EMOJI[props.emojis].x;
  const emojiO = EMOJI[props.emojis].o;
  const whoIsNext = props.xIsNext ? emojiX : emojiO;
  const status = useRef('');

  const [playClickSound] = useSound(sounds.click, soundProps);
  const [playWinSound] = useSound(sounds.win, soundProps);
  const [playMusic, { pause }] = useSound(sounds.music, musicProps);

  const onKeyDown = controller.handleKeyDown.bind(null, props);
  const onWindowResize = controller.handleWindowResize.bind(null, props);

  if (props.wonIndexes) {
    const winner = props.xIsNext ? emojiO : emojiX;
    status.current = `Winner is ${winner}`;
  } else if (isCurrentBoardFull) {
    status.current = 'Draw game';
  } else {
    status.current = `Next player: ${whoIsNext}`;
  }

  useEffect(() => {
    if (musicProps.soundEnabled) playMusic();
    else pause();
  }, [musicProps.soundEnabled, pause, playMusic]);

  useEffect(() => {
    playClickSound();
  }, [props.currentBoard]);

  useEffect(() => {
    if (props.wonIndexes) playWinSound();
  }, [props.wonIndexes]);

  useEffect(() => {
    document.body.classList.toggle('dark', props.darkMode);
  }, [props.darkMode]);

  useEffect(() => {
    localStorage.setItem('XOGame', JSON.stringify(props));

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const boardStyle = {
    gridTemplateColumns: `repeat(${props.boardSize}, 1fr)`,
  };

  return (
    <div className={`game ${props.theme}`}>
      <div className="game-controls">
        <SettingsPopover />
        <InfoPopover />
        <Button
          type="default"
          ghost
          onClick={() => controller.handleNewGameClick(props)}
          onMouseDown={(e) => e.preventDefault()}
        >
          New game
        </Button>
        <div>{status.current}</div>
      </div>
      <div
        style={boardStyle}
        className="game-board"
      >
        <Board />
      </div>
      <div className="game-history">
        <MovesDropdown
          history={props.history}
          onItemClick={(i: number) => controller.jumpToMove(props, i)}
        />
      </div>
    </div>
  );
};

export default connector(App);
