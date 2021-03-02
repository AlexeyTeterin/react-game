import {
  themes, sizes, emojiSetNames, history,
} from '../types';

interface IGameState {
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
}

export default IGameState;
