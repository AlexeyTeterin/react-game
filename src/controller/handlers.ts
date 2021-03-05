import { PropsFromRedux } from '../model/connector';
import calcWonIndexes from './calcWonIndexes';

export const handleKeyDown = (props: PropsFromRedux, e: any) => {
  const activeIndex = props.indexOfFocused;

  const { boardSize: rows } = props;
  const lastColumnIndex = rows - 1;
  const lastRowIndex = rows * lastColumnIndex;

  switch (e.code) {
    case 'ArrowRight':
      props.setFocused(activeIndex % rows === lastColumnIndex
        ? activeIndex - lastColumnIndex : activeIndex + 1);
      break;
    case 'ArrowLeft':
      props.setFocused(activeIndex % rows === 0
        ? activeIndex + lastColumnIndex : activeIndex - 1);
      break;
    case 'ArrowDown':
      props.setFocused(activeIndex >= lastRowIndex
        ? activeIndex - lastRowIndex : activeIndex + rows);
      break;
    case 'ArrowUp':
      props.setFocused(activeIndex < rows
        ? activeIndex + lastRowIndex : activeIndex - rows);
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
  if (props.windowWidth < 520 && props.boardSize > 4) props.setSquareSize('extraSmall');
};

export const handleNewGameClick = (props: PropsFromRedux) => {
  props.setXIsNext(true);
  props.setStepNumber(0);
  props.setHistory([{ squares: Array(props.boardSize ** 2).fill(null) }]);
  props.setCurrentBoard();
  props.calcWonIndexes();
};

export const handleMoveSelect = (props: PropsFromRedux, move: number) => {
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
