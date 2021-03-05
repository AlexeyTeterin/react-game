import { XO, emojiSet } from '../model/types';

const convertToEmoji = (value: XO, setOfEmojis: emojiSet) => {
  if (value === 'X') return setOfEmojis.x;
  if (value === 'O') return setOfEmojis.o;
  return null;
};

export default convertToEmoji;
