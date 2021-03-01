import { RadioChangeEvent } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { emojiSetNames, sizes, themes } from '../types';

interface IGameState {
  theme: themes;
  darkMode: boolean;
  squareSize: sizes;
  emojis: emojiSetNames;
}

const initialState: IGameState = {
  theme: 'Winter',
  darkMode: false,
  squareSize: 'medium',
  emojis: 'simple',
};

export type PropsFromRedux = ConnectedProps<typeof connector>;

const mapStatetoProps = (state: IGameState) => ({
  theme: state.theme,
  darkMode: state.darkMode,
  squareSize: state.squareSize,
  emojis: state.emojis,
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
});

export const connector = connect(mapStatetoProps, mapDispatchToProps);

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
    default:
  }

  return state;
}
