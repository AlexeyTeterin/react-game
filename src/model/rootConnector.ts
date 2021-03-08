import { RadioChangeEvent } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { history } from './types';
import { IGameState } from './initialState';

export type GameProps = ConnectedProps<typeof rootConnector>;

const mapStatetoProps = (state: IGameState) => ({
  theme: state.theme,
  darkMode: state.darkMode,
  squareSize: state.squareSize,
  emojis: state.emojis,
  xIsNext: state.xIsNext,
  isSound: state.isSound,
  soundVolume: state.soundVolume,
  isMusic: state.isMusic,
  musicVolume: state.musicVolume,
  history: state.history,
  stepNumber: state.stepNumber,
  indexOfFocused: state.indexOfFocused,
  windowWidth: state.windowWidth,
  currentBoard: state.currentBoard,
  wonIndexes: state.wonIndexes,
  boardSize: state.boardSize,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheme: (e: RadioChangeEvent) => dispatch({
    type: 'SET_THEME', value: e.target.value,
  }),
  toggleDarkMode: () => dispatch({
    type: 'TOGGLE_DARK_MODE',
  }),
  setSquareSize: (e: RadioChangeEvent | string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    return dispatch({
      type: 'SET_SQUARE_SIZE', value,
    });
  },
  setEmojis: (e: RadioChangeEvent) => dispatch({
    type: 'SET_EMOJIS', value: e.target.value,
  }),
  setXIsNext: (isNext: boolean) => dispatch({
    type: 'SET_X_IS_NEXT', value: isNext,
  }),
  toggleSound: () => dispatch({
    type: 'TOGGLE_SOUND',
  }),
  setSoundVolume: (value: number) => dispatch({
    type: 'SET_SOUND_VOLUME', value: value / 100,
  }),
  toggleMusic: () => dispatch({
    type: 'TOGGLE_MUSIC',
  }),
  setMusicVolume: (value: number) => dispatch({
    type: 'SET_MUSIC_VOLUME', value: value / 100,
  }),
  setHistory: (moves: history) => dispatch({
    type: 'SET_HISTORY', moves,
  }),
  setStepNumber: (num: number) => dispatch({
    type: 'SET_STEP_NUMBER', num,
  }),
  setFocused: (value: number) => dispatch({
    type: 'SET_FOCUSED', value,
  }),
  setWindowWidth: () => dispatch({
    type: 'SET_WINDOW_WIDTH',
  }),
  setCurrentBoard: () => dispatch({
    type: 'SET_CURRENT_BOARD',
  }),
  calcWonIndexes: () => dispatch({
    type: 'CALC_WON_INDEXES',
  }),
  setBoardSize: (value: number) => dispatch({
    type: 'SET_BOARD_SIZE', value,
  }),
});

const rootConnector = connect(mapStatetoProps, mapDispatchToProps);

export default rootConnector;
