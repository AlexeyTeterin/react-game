import { XO } from '../model/types';

const calcWinningLines = (boardSize: number) => {
  const empty = new Array(boardSize ** 2).fill(null).map((el, index) => index);

  const horizontalLines = [];

  for (let i = 0; i < boardSize; i += 1) {
    horizontalLines[i] = empty.slice((i * boardSize), (i * boardSize) + boardSize);
  }

  const verticalLines: number[][] = [];

  for (let i = 0; i < boardSize; i += 1) {
    verticalLines[i] = [];
    horizontalLines.forEach((el) => {
      verticalLines[i].push(el[i]);
    });
  }

  const diagonalLine1 = [];
  const diagonalLine2 = [];

  for (let i = 0; i < boardSize; i += 1) {
    diagonalLine1[i] = horizontalLines[i][i];
    diagonalLine2[i] = horizontalLines[i][boardSize - 1 - i];
  }

  return horizontalLines.concat(verticalLines, [diagonalLine1], [diagonalLine2]);
};

const WINNING_LINES_3 = calcWinningLines(3);
const WINNING_LINES_4 = calcWinningLines(4);
const WINNING_LINES_5 = calcWinningLines(5);

const calcWonIndexes = (squares: XO[]) => {
  const boardSize = Math.sqrt(squares.length);
  const equals = (line: XO[]) => line.every((el) => el !== null && el === line[0]);

  switch (boardSize) {
    case 3:
      for (let i = 0; i < WINNING_LINES_3.length; i += 1) {
        const [a, b, c] = WINNING_LINES_3[i];
        const currLine = [squares[a], squares[b], squares[c]];
        if (equals(currLine)) return [a, b, c];
      }
      break;

    case 4:
      for (let i = 0; i < WINNING_LINES_4.length; i += 1) {
        const [a, b, c, d] = WINNING_LINES_4[i];
        const currLine = [squares[a], squares[b], squares[c], squares[d]];
        if (equals(currLine)) return [a, b, c, d];
      }
      break;

    case 5:
      for (let i = 0; i < WINNING_LINES_5.length; i += 1) {
        const [a, b, c, d, e] = WINNING_LINES_5[i];
        const currLine = [squares[a], squares[b], squares[c], squares[d], squares[e]];
        if (equals(currLine)) return [a, b, c, d, e];
      }
      break;

    default:
  }

  return null;
};

export default calcWonIndexes;
