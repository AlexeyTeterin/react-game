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
  if (props.windowWidth < 440) props.setSquareSize('small');
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

export const calcWonIndexes = (squares: XO[]) => {
  const lines4 = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];

  const lines3 = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const boardSize = Math.sqrt(squares.length);

  switch (boardSize) {
    case 3:
      for (let i = 0; i < lines3.length; i += 1) {
        const [a, b, c] = lines3[i];
        if (squares[a]
          && squares[a] === squares[b]
          && squares[a] === squares[c]) return [a, b, c];
      }
      break;
    case 4:
      for (let i = 0; i < lines4.length; i += 1) {
        const [a, b, c, d] = lines4[i];
        if (squares[a]
          && squares[a] === squares[b]
          && squares[a] === squares[c]
          && squares[a] === squares[d]) return [a, b, c, d];
      }
      break;
    default:
  }

  return null;
};
