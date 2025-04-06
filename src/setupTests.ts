import '@testing-library/jest-dom';
import { TypewellWord } from './core/TypeWell';

declare global {
  var testWords: TypewellWord[];
}

// タイマーのモック
jest.useFakeTimers();

// テスト用のデータ
global.testWords = [
  { hiragana: 'てすと', kanji: 'テスト', completed: false },
  { hiragana: 'れんしゅう', kanji: '練習', completed: false }
]; 