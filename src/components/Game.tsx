import React, { useEffect, useRef } from 'react';
import { Button } from 'antd';
import useSound from 'use-sound';
import * as controller from '../controller/handlers';
import Board from '../components/Board/Board';
import MovesDropdown from '../components/MovesDropdown/MovesDropdown';
import InfoPopover from '../components/InfoPopover/InfoPopover';
import SettingsPopover from '../components/SettingsPopover/SettingsPopover';
import convertToEmoji from '../controller/convertToEmoji';
import { EMOJI, SOUNDS } from '../model/constants';
import rootConnector, { GameProps } from '../model/rootConnector';
import './Game.scss';

const App: React.FC<GameProps> = (props: GameProps) => {
  const soundProps = { soundEnabled: props.isSound, volume: props.soundVolume };
  const musicProps = { soundEnabled: props.isMusic, volume: props.musicVolume };
  const isCurrentBoardFull = props.currentBoard.squares.indexOf(null) === -1;
  const activeEmojiSet = EMOJI[props.emojis];
  const whoIsNext = convertToEmoji(props.xIsNext ? 'X' : 'O', activeEmojiSet);
  const status = useRef('');

  const [playClickSound] = useSound(SOUNDS.click, soundProps);
  const [playWinSound] = useSound(SOUNDS.win, soundProps);
  const [playMusic, { pause }] = useSound(SOUNDS.music, musicProps);

  const onKeyDown = controller.handleKeyDown.bind(null, props);
  const onWindowResize = controller.handleWindowResize.bind(null, props);

  if (props.wonIndexes) {
    const winner = convertToEmoji(props.xIsNext ? 'O' : 'X', activeEmojiSet);
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
        className="game-board"
        style={boardStyle}
      >
        <Board />
      </div>
      <div className="game-history">
        <MovesDropdown
          history={props.history}
          onItemClick={(i: number) => controller.handleMoveSelect(props, i)}
        />
      </div>
    </div>
  );
};

export default rootConnector(App);
