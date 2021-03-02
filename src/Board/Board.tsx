import React from 'react';
import connector, { PropsFromRedux } from '../redux/connector';
import Square from '../Square/Square';
import './Board.scss';

interface IBoard {
  squares: any[];
  onClick: any;
  wonIndexes: number[] | null;
}

type Props = PropsFromRedux & IBoard;

const Board: React.FC<Props> = (props: Props) => {
  const { wonIndexes } = props;

  const renderSquare = (i: number) => (
    <Square
      theme={props.theme}
      id={i}
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
      size={props.squareSize}
      wonIndexes={wonIndexes}
      indexOfFocused={props.indexOfFocused}
    />
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
