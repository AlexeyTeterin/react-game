/* eslint-disable class-methods-use-this */
import * as React from 'react';
import Square from './Square';

type XO = 'X' | 'O' | null;

type Props = {
  squares: Array<XO>;
}

type State = {
  squares: Array<XO>;
  xIsNext: boolean;
}
export default class Board extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick = (i: number) => {
    if (calculateWinner(this.state.squares)) return;
    if (this.state.squares[i]) return;

    this.setState((prev) => {
      const squares = [...prev.squares];
      squares[i] = prev.xIsNext ? 'X' : 'O';
      return { squares, xIsNext: !prev.xIsNext };
    });
  }

  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const whoIsNext = this.state.xIsNext ? 'X' : 'O';
    let status;

    if (winner) {
      status = `Winner is ${winner}`;
    } else if (isBoardFull(this.state)) {
      status = 'Draw game';
    } else {
      status = `Next player: ${whoIsNext}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
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

function calculateWinner(squares: Array<XO>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(state: State) {
  return state.squares.indexOf(null) === -1;
}
