/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable class-methods-use-this */
import * as React from 'react';
import { sizes, themes } from '../Game';
import Square from '../Square/Square';
import './Board.scss';

export type XO = 'X' | 'O' | null;

type Props = {
  theme: themes;
  squares: any[];
  onClick: any;
  size: sizes;
}
export default class Board extends React.Component<Props> {
  renderSquare(i: number, row: number) {
    return (
      <Square
        theme={this.props.theme}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i, row)}
        size={this.props.size}
      />
    );
  }

  render() {
    const rowClasses = `board-row ${this.props.size}`;

    return (
      <div className="board">
        <div className={rowClasses}>
          {this.renderSquare(0, 0)}
          {this.renderSquare(1, 0)}
          {this.renderSquare(2, 0)}
        </div>
        <div className={rowClasses}>
          {this.renderSquare(3, 1)}
          {this.renderSquare(4, 1)}
          {this.renderSquare(5, 1)}
        </div>
        <div className={rowClasses}>
          {this.renderSquare(6, 2)}
          {this.renderSquare(7, 2)}
          {this.renderSquare(8, 2)}
        </div>
      </div>
    );
  }
}
