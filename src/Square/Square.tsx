import React, { SyntheticEvent } from 'react';
import { sizes, themes, XO } from '../types';
import './Square.scss';

interface IProps {
  value: XO,
  size: sizes,
  theme: themes,
  onClick: Function,
  id: any,
  wonIndexes: number[] | null;
  indexOfFocused: number;
}

const Square: React.FC<IProps> = (props: IProps) => {
  const handleAnimationEnd = (e: React.SyntheticEvent) => {
    e.currentTarget.classList.remove('fade', 'shake');
  };

  const handleClick = (event: SyntheticEvent) => {
    const target = event.currentTarget;
    if (target.textContent) {
      event.currentTarget.classList.add('shake');
    } else {
      event.currentTarget.classList.add('fade');
    }

    props.onClick(event);
  };

  const isWinner = () => {
    if (props.wonIndexes?.includes(props.id)) return 'winner';
    return '';
  };

  const isFocused = () => {
    if (props.indexOfFocused === props.id) return 'focus';
    return '';
  };

  return (
    <button
      type="button"
      className={`square ${props.size} ${props.theme} ${isWinner()} ${isFocused()}`}
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()}
      onAnimationEnd={handleAnimationEnd}
      id={`square${props.id}`}
    >
      {props.value}
    </button>
  );
};

export default Square;
