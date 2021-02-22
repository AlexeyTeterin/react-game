/* eslint-disable class-methods-use-this */
import * as React from 'react';
import { sizes, themes } from '../App';
import Square from '../Square/Square';
import './Board.scss';

export type XO = 'X' | 'O' | null;

type Props = {
  theme: themes;
  squares: XO[];
  onClick: Function;
  size: sizes;
}
export default class Board extends React.Component<Props> {
  renderSquare(i: number) {
    return (
      <Square
        theme={this.props.theme}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        size={this.props.size}
      />
    );
  }

  render() {
    const rowClasses = `board-row ${this.props.size}`;

    return (
      <div>
        <div className={rowClasses}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className={rowClasses}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className={rowClasses}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
