import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IGameState } from '../../model/initialState';
import Square from '../Square/Square';
import './Board.scss';

type BoardProps = ConnectedProps<typeof boardConnector>;

const Board: React.FC<BoardProps> = (props: BoardProps) => {
  const renderSquare = (i: number) => (
    <Square id={i} key={`square${i}`} />
  );

  const renderSquares = (num: number) => new Array(num).fill(0)
    .map((el, index: number) => renderSquare(index));

  return (
    <>
      {renderSquares(props.boardSize ** 2)}
    </>
  );
};

const mapState = (state: IGameState) => ({
  boardSize: state.boardSize,
});

const boardConnector = connect(mapState, ({}));

export default boardConnector(Board);
