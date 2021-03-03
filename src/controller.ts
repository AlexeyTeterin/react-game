import { PropsFromRedux } from './redux/connector';
import { XO } from './types';

export const handleKeyDown = (props: PropsFromRedux, e: any) => {
  const index = props.indexOfFocused;

  switch (e.code) {
    case 'ArrowRight':
      props.setFocused(index % 3 === 2 ? index - 2 : index + 1);
      break;
    case 'ArrowLeft':
      props.setFocused(index % 3 === 0 ? index + 2 : index - 1);
      break;
    case 'ArrowDown':
      props.setFocused(index > 5 ? index - 6 : index + 3);
      break;
    case 'ArrowUp':
      props.setFocused(index < 3 ? index + 6 : index - 3);
      break;
    case 'Enter':
    case 'NumpadEnter':
    case 'Space':
      document.querySelector('.focus')?.dispatchEvent(new Event('click', { bubbles: true }));
      break;
    case 'KeyN':
    case 'Delete':
      handleNewGameClick(props);
      break;
    case 'Backspace':
      props.setFocused(-1);
      break;
    default:
  }
};

export const handleWindowResize = (props: PropsFromRedux) => {
  props.setWindowWidth();
  if (props.windowWidth < 700) props.setSquareSize('medium');
  if (props.windowWidth < 600) props.setSquareSize('small');
  if (props.windowWidth < 500) props.setSquareSize('extraSmall');
};

export const handleNewGameClick = (props: PropsFromRedux) => {
  props.setXIsNext(true);
  props.setStepNumber(0);
  props.setHistory([{ squares: Array(props.boardSize ** 2).fill(null) }]);
  props.setCurrentBoard();
  props.calcWonIndexes();
};

export const jumpToMove = (props: PropsFromRedux, move: number) => {
  props.setXIsNext((move % 2) === 0);
  props.setStepNumber(move);
  props.setCurrentBoard();
  props.calcWonIndexes();
};

export const handleSquareClick = (props: PropsFromRedux, i: number) => {
  const hist = props.history.slice(0, props.stepNumber + 1);
  const curr = hist[hist.length - 1];
  const squares = [...curr.squares];

  if (calcWonIndexes(squares) || squares[i]) return;

  squares[i] = props.xIsNext ? 'X' : 'O';
  props.setHistory(hist.concat([{ squares }]));
  props.setXIsNext(!props.xIsNext);
  props.setStepNumber(hist.length);
  props.setCurrentBoard();
};

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

const winningLines3 = calcWinningLines(3);
const winningLines4 = calcWinningLines(4);
const winningLines5 = calcWinningLines(5);

export const calcWonIndexes = (squares: XO[]) => {
  const boardSize = Math.sqrt(squares.length);
  const equals = (line: XO[]) => line.every((el) => el !== null && el === line[0]);

  switch (boardSize) {
    case 3:
      for (let i = 0; i < winningLines3.length; i += 1) {
        const [a, b, c] = winningLines3[i];
        const currLine = [squares[a], squares[b], squares[c]];
        if (equals(currLine)) return [a, b, c];
      }
      break;

    case 4:
      for (let i = 0; i < winningLines4.length; i += 1) {
        const [a, b, c, d] = winningLines4[i];
        const currLine = [squares[a], squares[b], squares[c], squares[d]];
        if (equals(currLine)) return [a, b, c, d];
      }
      break;

    case 5:
      for (let i = 0; i < winningLines5.length; i += 1) {
        const [a, b, c, d, e] = winningLines5[i];
        const currLine = [squares[a], squares[b], squares[c], squares[d], squares[e]];
        if (equals(currLine)) return [a, b, c, d, e];
      }
      break;

    default:
  }

  return null;
};
