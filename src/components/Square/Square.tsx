import React, {
  SyntheticEvent, useEffect, useState,
} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import convertToEmoji from '../../controller/convertToEmoji';
import { handleSquareClick } from '../../controller/handlers';
import { EMOJI } from '../../model/constants';
import { IGameState } from '../../model/initialState';
import { history } from '../../model/types';
import './Square.scss';

interface ISquare { id: any}

export type SquareProps = ConnectedProps<typeof squareConnector> & ISquare;

const Square: React.FC<SquareProps> = (props: SquareProps) => {
  const currentSquare = props.currentBoard.squares[props.id];
  const squareFormatted = convertToEmoji(currentSquare, EMOJI[props.emojis]);
  const [winnerClass, setWinnerClass] = useState('');
  const [focusClass, setFocusClass] = useState('');
  const [shakeClass, setShakeClass] = useState('');
  const [fadeClass, setFadeClass] = useState('');

  useEffect(() => {
    const winner = props.wonIndexes?.includes(props.id) ? 'winner' : '';
    const focus = props.indexOfFocused === props.id ? 'focus' : '';
    setWinnerClass(winner);
    setFocusClass(focus);
    setShakeClass('');
  }, [props.wonIndexes, props.id, props.indexOfFocused]);

  const handleAnimationEnd = () => {
    setShakeClass('');
    setFadeClass('');
    if (!props.wonIndexes) props.calcWonIndexes();
  };

  const handleClick = (event: SyntheticEvent) => {
    const target = event.currentTarget;

    if (target.textContent) {
      setShakeClass('shake');
      setFadeClass('');
    } else {
      setShakeClass('');
      setFadeClass('fade');
    }

    handleSquareClick(props, props.id);
  };

  const squareClasses = [
    'square',
    props.squareSize,
    props.theme,
    shakeClass,
    fadeClass,
    winnerClass,
    focusClass,
  ].join(' ');

  return (
    <button
      type="button"
      className={squareClasses}
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()}
      onAnimationEnd={handleAnimationEnd}
      id={`square${props.id}`}
    >
      {squareFormatted}
    </button>
  );
};

const mapState = (state: IGameState) => ({
  theme: state.theme,
  squareSize: state.squareSize,
  currentBoard: state.currentBoard,
  emojis: state.emojis,
  wonIndexes: state.wonIndexes,
  indexOfFocused: state.indexOfFocused,
  history: state.history,
  stepNumber: state.stepNumber,
  xIsNext: state.xIsNext,
});

const mapDispatch = (dispatch: Dispatch) => ({
  calcWonIndexes: () => dispatch({
    type: 'CALC_WON_INDEXES',
  }),
  setXIsNext: (isNext: boolean) => dispatch({
    type: 'SET_X_IS_NEXT', value: isNext,
  }),
  setHistory: (moves: history) => dispatch({
    type: 'SET_HISTORY', moves,
  }),
  setStepNumber: (num: number) => dispatch({
    type: 'SET_STEP_NUMBER', num,
  }),
  setCurrentBoard: () => dispatch({
    type: 'SET_CURRENT_BOARD',
  }),
});

const squareConnector = connect(mapState, mapDispatch);

export default squareConnector(Square);
