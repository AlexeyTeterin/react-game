export type themes = 'Autumn' | 'Winter' | 'Spring';
export type sizes = 'extraSmall' | 'small' | 'medium' | 'large';
export type XO = 'X' | 'O' | null;
export type emojiSetNames = 'simple' | 'nature' | 'danger';
export type emojiSet = { x: string, o: string };
export type boardState = { squares: XO[] };
export type history = boardState[];
