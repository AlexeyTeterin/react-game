import * as React from 'react';
import { sizes, themes } from '../Game';
import './Square.scss';

interface IProps {
  value: 'X' | 'O' | null,
  size: sizes,
  theme: themes,
  onClick: () => void,
}

export default function Square(props: IProps) {
  return (
    <button
      type="button"
      className={`square ${props.size} ${props.theme} animate`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
