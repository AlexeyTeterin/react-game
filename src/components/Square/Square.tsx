import React, { SyntheticEvent } from 'react';
import convertToEmoji from '../../controller/convertToEmoji';
import { handleSquareClick } from '../../controller/handlers';
import connector, { PropsFromRedux } from '../../model/connector';
import { EMOJI } from '../../model/constants';
import './Square.scss';

interface ISquare { id: any}

type SquareProps = PropsFromRedux & ISquare;

const Square: React.FC<SquareProps> = (props: SquareProps) => {
  const currentSquare = props.currentBoard.squares[props.id];

  const squareFormatted = convertToEmoji(currentSquare, EMOJI[props.emojis]);

  const handleAnimationEnd = (e: React.SyntheticEvent) => {
    e.currentTarget.classList.remove('fade', 'shake');
    if (!props.wonIndexes) props.calcWonIndexes();
  };

  const handleClick = (event: SyntheticEvent) => {
    const target = event.currentTarget;
    if (target.textContent) {
      event.currentTarget.classList.add('shake');
    } else {
      event.currentTarget.classList.add('fade');
    }

    handleSquareClick(props, props.id);
  };

  const winner = (props.wonIndexes?.includes(props.id)) ? 'winner' : '';

  const focus = (props.indexOfFocused === props.id) ? 'focus' : '';

  return (
    <button
      type="button"
      className={`square ${props.squareSize} ${props.theme} ${winner} ${focus}`}
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()}
      onAnimationEnd={handleAnimationEnd}
      id={`square${props.id}`}
    >
      {squareFormatted}
    </button>
  );
};

export default connector(Square);
