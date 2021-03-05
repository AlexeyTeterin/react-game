import { emojiSet } from './types';

export interface IEmoji {
  [propName: string]: emojiSet;
}

const EMOJI: IEmoji = {
  simple: { x: '❌', o: '⭕' },
  nature: { x: '❄️', o: '🌸' },
  danger: { x: '☠️', o: '☢️' },
};
export default EMOJI;
