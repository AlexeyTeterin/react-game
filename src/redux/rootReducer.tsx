const initialState = {
  theme: 'Winter',
};

export default function rootReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'setTheme':
      return { theme: action.value };
    default:
  }

  return state;
}
