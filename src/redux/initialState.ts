import {
  themes, sizes, emojiSetNames, boardState, history,
} from '../types';

export interface IGameState {
  theme: themes
  darkMode: boolean
  squareSize: sizes
  emojis: emojiSetNames
  xIsNext: boolean
  isSound: boolean
  soundVolume: number
  isMusic: boolean
  musicVolume: number
  history: history
  stepNumber: number
  indexOfFocused: number
  windowWidth: number
  currentBoard: boardState
  wonIndexes: number[] | null
}

const savedState = localStorage.XOGame ? JSON.parse(localStorage.XOGame) : null;

const initialState: IGameState = savedState || {
  theme: 'Winter',
  darkMode: true,
  squareSize: 'medium',
  emojis: 'simple',
  xIsNext: true,
  isSound: true,
  soundVolume: 0.5,
  isMusic: false,
  musicVolume: 0.5,
  history: [{ squares: Array(9).fill(null) }],
  stepNumber: 0,
  indexOfFocused: -1,
  windowWidth: window.innerWidth,
  currentBoard: { squares: Array(9).fill(null) },
  wonIndexes: null,
};

export default initialState;
