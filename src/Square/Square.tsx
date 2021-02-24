import React, { SyntheticEvent } from 'react';
import { sizes, themes } from '../Game';
import './Square.scss';

interface IProps {
  value: 'X' | 'O' | null,
  size: sizes,
  theme: themes,
  onClick: () => void,
}

export default function Square(props: IProps) {
  function handleAnimationEnd(e: React.SyntheticEvent) {
    e.currentTarget.classList.remove('fade', 'shake');
  }

  function handleClick(event: SyntheticEvent) {
    const target = event.currentTarget;
    if (target.textContent) {
      event.currentTarget.classList.add('shake');
    } else {
      event.currentTarget.classList.add('fade');
    }

    props.onClick();
  }

  return (
    <button
      type="button"
      className={`square ${props.size} ${props.theme}`}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      {props.value}
    </button>
  );
}
