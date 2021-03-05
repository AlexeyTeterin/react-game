import { RadioChangeEvent } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { history } from './types';
import { IGameState } from './initialState';

export type PropsFromRedux = ConnectedProps<typeof connector>;

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
    type: 'setTheme', value: e.target.value,
  }),
  toggleDarkMode: () => dispatch({
    type: 'toggleDarkMode',
  }),
  setSquareSize: (e: RadioChangeEvent | string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    return dispatch({
      type: 'setSquareSize', value,
    });
  },
  setEmojis: (e: RadioChangeEvent) => dispatch({
    type: 'setEmojis', value: e.target.value,
  }),
  setXIsNext: (isNext: boolean) => dispatch({
    type: 'setXIsNext', value: isNext,
  }),
  toggleSound: () => dispatch({
    type: 'toggleSound',
  }),
  setSoundVolume: (value: number) => dispatch({
    type: 'setSoundVolume', value: value / 100,
  }),
  toggleMusic: () => dispatch({
    type: 'toggleMusic',
  }),
  setMusicVolume: (value: number) => dispatch({
    type: 'setMusicVolume', value: value / 100,
  }),
  setHistory: (moves: history) => dispatch({
    type: 'setHistory', moves,
  }),
  setStepNumber: (num: number) => dispatch({
    type: 'setStepNumber', num,
  }),
  setFocused: (value: number) => dispatch({
    type: 'setFocused', value,
  }),
  setWindowWidth: () => dispatch({
    type: 'setWindowWidth',
  }),
  setCurrentBoard: () => dispatch({
    type: 'setCurrentBoard',
  }),
  calcWonIndexes: () => dispatch({
    type: 'calcWonIndexes',
  }),
  setBoardSize: (e: RadioChangeEvent) => dispatch({
    type: 'setBoardSize', value: e.target.value,
  }),
});

const connector = connect(mapStatetoProps, mapDispatchToProps);

export default connector;
