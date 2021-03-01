import { RadioChangeEvent } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { themes } from '../types';

interface IGameState {
  theme: themes;
  darkMode: boolean;
}

const initialState: IGameState = {
  theme: 'Winter',
  darkMode: false,
};

export type PropsFromRedux = ConnectedProps<typeof connector>;

const mapStatetoProps = (state: IGameState) => ({
  theme: state.theme,
  darkMode: state.darkMode,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheme: (e: RadioChangeEvent) => dispatch({ type: 'setTheme', value: e.target.value }),
  toggleDarkMode: () => dispatch({ type: 'toggleDarkMode' }),
});

export const connector = connect(mapStatetoProps, mapDispatchToProps);

export default function rootReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'setTheme':
      return { theme: action.value, darkMode: state.darkMode };
    case 'toggleDarkMode':
      document.body.classList.toggle('dark');
      return { darkMode: !state.darkMode, theme: state.theme };
    default:
  }

  return state;
}
