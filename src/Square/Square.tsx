import * as React from 'react';
import { themes } from '../Game';
import './Square.scss';

interface IProps {
  value: 'X' | 'O' | null,
  size: string,
  theme: themes,
  onClick: () => void,
}

export default function Square(props: IProps) {
  return (
    <button
      type="button"
      className={`square ${props.size} ${props.theme}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
