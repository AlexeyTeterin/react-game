import IGameState from './IGameState';
import initialState from './initialState';

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
