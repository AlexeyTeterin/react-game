import IGameState from './IGameState';

const savedState = JSON.parse(localStorage.XOGame);

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
};

export default initialState;
