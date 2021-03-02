import React from 'react';
import connector, { PropsFromRedux } from '../../redux/connector';
import Square from '../Square/Square';
import './Board.scss';

const Board: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
  const renderSquare = (i: number) => (
    <Square id={i} />
  );

  const rowClasses = `board-row ${props.squareSize}`;

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

export default connector(Board);
