import { XO } from './Square/Square';

export type emojiSetNames = 'simple' | 'nature' | 'danger';

export type emojiSet = { x: string, o: string };

export interface IEmoji {
  [propName: string]: emojiSet;
}

const EMOJI: IEmoji = {
  simple: { x: '❌', o: '⭕' },
  nature: { x: '❄️', o: '🌸' },
  danger: { x: '☠️', o: '☢️' },
};

export const convertToEmoji = (value: XO, set: emojiSet) => {
  if (value === 'X') return set.x;
  if (value === 'O') return set.o;
  return null;
};

export default EMOJI;
