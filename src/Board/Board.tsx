/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { themes } from '../Game';
import Square, { sizes } from '../Square/Square';
import './Board.scss';

type Props = {
  theme: themes;
  squares: any[];
  onClick: any;
  size: sizes;
  wonIndexes: number[] | null;
}

const Board: React.FC<Props> = (props: Props) => {
  const { wonIndexes } = props;

  const renderSquare = (i: number) => (
    <Square
      theme={props.theme}
      id={i}
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
      size={props.size}
      wonIndexes={wonIndexes}
    />
  );

  const rowClasses = `board-row ${props.size}`;

  return (
    <>
      <div className={rowClasses}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={rowClasses}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={rowClasses}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
};

export default Board;
