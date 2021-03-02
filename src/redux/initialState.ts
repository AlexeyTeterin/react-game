import IGameState from './IGameState';

const savedState = localStorage.XOGame ? JSON.parse(localStorage.XOGame) : null;

const initialState: IGameState = savedState || {
  theme: 'Winter',
  darkMode: false,
  squareSize: 'medium',
  emojis: 'simple',
  xIsNext: true,
  isSound: true,
  soundVolume: 0.5,
  isMusic: false,
  musicVolume: 0.5,
  history: [{ squares: Array(9).fill(null) }],
  stepNumber: 0,
};

export default initialState;
