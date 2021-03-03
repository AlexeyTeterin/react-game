import React from 'react';
import connector, { PropsFromRedux } from '../../redux/connector';
import Square from '../Square/Square';
import './Board.scss';

const Board: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
  const renderSquare = (i: number) => (
    <Square id={i} key={i} />
  );

  const renderSquares = (num: number) => new Array(num).fill(0)
    .map((el, index: number) => renderSquare(index));

  return (
    <>
      {renderSquares(props.boardSize ** 2)}
    </>
  );
};

export default connector(Board);
