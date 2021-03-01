import { RadioChangeEvent } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { sizes, themes } from '../types';

interface IGameState {
  theme: themes;
  darkMode: boolean;
  squareSize: sizes;
}

const initialState: IGameState = {
  theme: 'Winter',
  darkMode: false,
  squareSize: 'medium',
};

export type PropsFromRedux = ConnectedProps<typeof connector>;

const mapStatetoProps = (state: IGameState) => ({
  theme: state.theme,
  darkMode: state.darkMode,
  squareSize: state.squareSize,
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
});

export const connector = connect(mapStatetoProps, mapDispatchToProps);

export default function rootReducer(state: IGameState = initialState, action: any) {
  const { theme, darkMode, squareSize } = state;
  switch (action.type) {
    case 'setTheme':
      return { theme: action.value, darkMode, squareSize };
    case 'toggleDarkMode':
      document.body.classList.toggle('dark');
      return { darkMode: !state.darkMode, theme, squareSize };
    case 'setSquareSize':
      return { squareSize: action.value, theme, darkMode };
    default:
  }

  return state;
}
