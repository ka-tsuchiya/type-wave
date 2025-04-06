import { TypewellWord } from '../../core/TypeWell';

export const createTestWord = (hiragana: string, kanji: string, completed: boolean | number = false): TypewellWord => ({
  hiragana,
  kanji,
  completed
});

export const createTypingState = (word: string) => ({
  index: 0,
  lastResult: false
}); 