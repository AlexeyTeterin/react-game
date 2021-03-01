import { RadioChangeEvent } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  emojiSetNames, history, sizes, themes,
} from '../types';

interface IGameState {
  theme: themes;
  darkMode: boolean;
  squareSize: sizes;
  emojis: emojiSetNames;
  xIsNext: boolean;
  isSound: boolean;
  soundVolume: number;
  isMusic: boolean;
  musicVolume: number;
  history: history;
}

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

export default function rootReducer(state: IGameState = initialState, action: any) {
  switch (action.type) {
    case 'setTheme':
      return { ...state, theme: action.value };
    case 'toggleDarkMode':
      document.body.classList.toggle('dark');
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
    default:
  }

  return state;
}

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
});

export const connector = connect(mapStatetoProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;
