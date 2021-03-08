import calcWonIndexes from '../controller/calcWonIndexes';
import initialState, { IGameState } from './initialState';

export default function rootReducer(state: IGameState = initialState, action: any) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.value };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'SET_SQUARE_SIZE':
      return { ...state, squareSize: action.value };
    case 'SET_EMOJIS':
      return { ...state, emojis: action.value };
    case 'SET_X_IS_NEXT':
      return { ...state, xIsNext: action.value };
    case 'TOGGLE_SOUND':
      return { ...state, isSound: !state.isSound };
    case 'SET_SOUND_VOLUME':
      return { ...state, soundVolume: action.value };
    case 'TOGGLE_MUSIC':
      return { ...state, isMusic: !state.isMusic };
    case 'SET_MUSIC_VOLUME':
      return { ...state, musicVolume: action.value };
    case 'SET_HISTORY':
      return { ...state, history: action.moves };
    case 'SET_STEP_NUMBER':
      return { ...state, stepNumber: action.num };
    case 'SET_FOCUSED':
      return { ...state, indexOfFocused: action.value };
    case 'SET_WINDOW_WIDTH':
      return { ...state, windowWidth: window.innerWidth };
    case 'SET_CURRENT_BOARD':
      return { ...state, currentBoard: state.history[state.stepNumber] };
    case 'CALC_WON_INDEXES':
      return {
        ...state, wonIndexes: calcWonIndexes(state.currentBoard.squares),
      };
    case 'SET_BOARD_SIZE':
      return { ...state, boardSize: action.value };
    default:
  }

  return state;
}
