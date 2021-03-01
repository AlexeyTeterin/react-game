import { RadioChangeEvent } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { emojiSetNames, sizes, themes } from '../types';

interface IGameState {
  theme: themes;
  darkMode: boolean;
  squareSize: sizes;
  emojis: emojiSetNames;

  xIsNext: boolean;
}

const initialState: IGameState = {
  theme: 'Winter',
  darkMode: false,
  squareSize: 'medium',
  emojis: 'simple',
  xIsNext: true,
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
      return { ...state, xIsNext: !state.xIsNext };
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
  setXIsNext: (isNext: boolean) => dispatch({ type: 'setXIsNext', value: isNext }),
});

export const connector = connect(mapStatetoProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;
