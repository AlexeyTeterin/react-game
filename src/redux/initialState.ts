import IGameState from './IGameState';

const initialState: IGameState = {
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
