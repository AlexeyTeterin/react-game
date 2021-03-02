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
  props.setHistory([{ squares: Array(9).fill(null) }]);
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
      return [a, b, c];
    }
  }
  return null;
};
