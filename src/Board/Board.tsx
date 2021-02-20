/* eslint-disable class-methods-use-this */
import * as React from 'react';
import Square from '../Square/Square';

export type XO = 'X' | 'O' | null;

type Props = {
  squares: Array<XO>;
  onClick: Function;
  size: 'sm' | 'm' | 'lg';
}
export default class Board extends React.Component<Props> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        size={this.props.size}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
