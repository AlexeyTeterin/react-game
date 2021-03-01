const initialState = {
  theme: 'Winter',
  darkMode: false,
};

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
