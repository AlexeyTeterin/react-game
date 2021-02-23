import { XO } from './Board/Board';

export type setOfEmoji = { x: string, o: string };

const EMOJI = {
  simple: { x: '❌', o: '⭕' },
  nature: { x: '❄️', o: '🌸' },
  danger: { x: '☠️', o: '☢️' },
};

export const convertToEmoji = (value: XO, set: setOfEmoji) => {
  if (value === 'X') return set.x;
  if (value === 'O') return set.o;
  return null;
};

export default EMOJI;
