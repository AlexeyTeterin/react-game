import calcWonIndexes from '../controller/calcWonIndexes';
import initialState, { IGameState } from './initialState';

export default function rootReducer(state: IGameState = initialState, action: any) {
  switch (action.type) {
    case 'setTheme':
      return { ...state, theme: action.value };
    case 'toggleDarkMode':
      return { ...state, darkMode: !state.darkMode };
    case 'setSquareSize':
      return { ...state, squareSize: action.value };
    case 'setEmojis':
      return { ...state, emojis: action.value };
    case 'setXIsNext':
      return { ...state, xIsNext: action.value };
    case 'toggleSound':
      return { ...state, isSound: !state.isSound };
    case 'setSoundVolume':
      return { ...state, soundVolume: action.value };
    case 'toggleMusic':
      return { ...state, isMusic: !state.isMusic };
    case 'setMusicVolume':
      return { ...state, musicVolume: action.value };
    case 'setHistory':
      return { ...state, history: action.moves };
    case 'setStepNumber':
      return { ...state, stepNumber: action.num };
    case 'setFocused':
      return { ...state, indexOfFocused: action.value };
    case 'setWindowWidth':
      return { ...state, windowWidth: window.innerWidth };
    case 'setCurrentBoard':
      return { ...state, currentBoard: state.history[state.stepNumber] };
    case 'calcWonIndexes':
      return {
        ...state, wonIndexes: calcWonIndexes(state.currentBoard.squares),
      };
    case 'setBoardSize':
      return { ...state, boardSize: action.value };
    default:
  }

  return state;
}
