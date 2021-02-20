import * as React from 'react';
import './Square.scss';

interface IProps {
  value: 'X' | 'O' | null,
  size: string,
  onClick: () => void,
}

export default function Square(props: IProps) {
  return (
    <button
      type="button"
      className={`square amber lighten-4 ${props.size}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}