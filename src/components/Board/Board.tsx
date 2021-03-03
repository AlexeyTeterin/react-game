import React from 'react';
import connector, { PropsFromRedux } from '../../redux/connector';
import Square from '../Square/Square';
import './Board.scss';

const Board: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
  const renderSquare = (i: number) => (
    <Square id={i} />
  );

  const numOfSquares = props.boardSize ** 2;

  const renderSquares = () => new Array(numOfSquares).fill(0)
    .map((el, index: number) => renderSquare(index));

  return (
    <>
      {renderSquares()}
    </>
  );
};

export default connector(Board);
