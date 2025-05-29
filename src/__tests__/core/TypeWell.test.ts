import { generateWord, sortAndJoin } from '../../core/TypeWell';
import { convert } from '../../core/TypingCore';
import { createTestWord } from './utils';

describe('TypeWell', () => {
  describe('generateWord', () => {
    test('正しい形式の単語を生成する', () => {
      const word = generateWord(5);
      expect(word).toHaveProperty('hiragana');
      expect(word).toHaveProperty('kanji');
      expect(word).toHaveProperty('completed');
      expect(word.completed).toBe(false);
    });

    test('指定された長さの以上のローマ字の長さを持つ単語を生成する', () => {
      const word = generateWord(100);
      const hiragana = word.hiragana;
      const hiraganaLength = convert(hiragana)[0].length;
      expect(hiraganaLength).toBeGreaterThanOrEqual(100);
    });
  });

  describe('sortAndJoin', () => {
    test('単語を正しく遅い順にソートして結合する', () => {
      const words = [
        createTestWord('れんしゅう', '練習', 300),
        createTestWord('てすと', 'テスト', 200)
      ];
      const result = sortAndJoin(words);
      expect(result.hiragana).toBe('てすと　れんしゅう');
      expect(result.kanji).toBe('テスト　練習');
    });
  });
}); 