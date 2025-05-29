import { initialState, isFinish, nextState } from '../../core/TypingCore';
import { createTestWord } from './utils';

describe('TypingCore', () => {
  describe('initialState', () => {
    test('初期状態が正しく生成される', () => {
      const state = initialState('てすと');
      expect(state.index).toBe(0);
      expect(state.lastResult).toBe(true);
    });
  });

  describe('nextState', () => {
    test('正しい入力でステートが更新される', () => {
      const state = initialState('てすと');
      const next = nextState('t', state);
      expect(next.index).toBe(1);
      expect(next.lastResult).toBe(true);
      const next2 = nextState('e', next);
      expect(next2.index).toBe(2);
      expect(next2.lastResult).toBe(true);
      const next3 = nextState('s', next2);
      expect(next3.index).toBe(3);
      expect(next3.lastResult).toBe(true);
    });

    test('誤った入力でインデックスが更新されず、lastResultがfalseになる', () => {
      const state = initialState('てすと');
      const next = nextState('r', state);
      expect(next.index).toBe(0);
      expect(next.lastResult).toBe(false);
    });
  });

  describe('isFinish', () => {
    test.each([
      {
        hiragana: 'てすと',
        input: 'tesuto',
        expected: true,
        description: '基本的な入力パターン'
      },
      {
        hiragana: 'ちょうちょう',
        input: 'chouchou',
        expected: true,
        description: '拗音を含む入力（その1）'
      },
      {
        hiragana: 'ちょうちょう',
        input: 'choutyou',
        expected: true,
        description: '拗音を含む入力（その2）'
      },
      {
        hiragana: 'ちょうちょう',
        input: 'tyoutyou',
        expected: true,
        description: '拗音を含む入力（その3）'
      },
      {
        hiragana: 'ちょうちょう',
        input: 'chouthou',
        expected: false,
        description: '不正な拗音入力'
      },
      {
        hiragana: 'しょうしょう',
        input: 'shoushou',
        expected: true,
        description: '別の拗音パターン'
      },
      {
        hiragana: 'こっかい',
        input: 'kokkai',
        expected: true,
        description: '小さい「っ」を含む入力（その1）'
      },
      {
        hiragana: 'こっかい',
        input: 'koccai',
        expected: true,
        description: '小さい「っ」を含む入力（その2）'
      },
      {
        hiragana: 'こっかい',
        input: 'kockai',
        expected: false,
        description: '不正な小さい「っ」入力'
      },
      {
        hiragana: 'ぐっない',
        input: 'gunnai',
        expected: false,
        description: '小さい「っ」を含む入力（その3）'
      },
      {
        hiragana: 'ぐっない',
        input: 'gultunai',
        expected: true,
        description: '小さい「っ」を含む入力（その4）'
      },
      {
        hiragana: 'がんか',
        input: 'gannka',
        expected: true,
        description: '通常より長い入力'
      },
      {
        hiragana: 'ごち',
        input: 'gochi',
        expected: true,
        description: '通常より長い入力2'
      },
      {
        hiragana: 'あっち',
        input: 'acchi',
        expected: true,
        description: '通常より長い入力3'
      },
      {
        hiragana: 'あっち',
        input: 'atchi',
        expected: false,
        description: '通常より長い入力4(不正な入力)'
      },
      {
        hiragana: 'だっちょう',
        input: 'dacchou',
        expected: true,
        description: '促音と拗音の組み合わせ'
      },
      {
        hiragana: 'だっちょう',
        input: 'dattyou',
        expected: true,
        description: '促音と拗音の組み合わせ2'
      },
      {
        hiragana: 'だっちょう',
        input: 'dactyou',
        expected: false,
        description: '促音と拗音の組み合わせ4'
      },
      {
        hiragana: 'うんぬん',
        input: 'uxnnun',
        expected: true,
        description: 'うんぬん2'
      },
      {
        hiragana: 'うんぬん',
        input: 'unxnun',
        expected: false,
        description: 'うんぬん3'
      },
      {
        hiragana: 'ばっじ',
        input: 'bajji',
        expected: true,
        description: '文字が違う促音'
      },
      {
        hiragana: 'ばっじ',
        input: 'bajzi',
        expected: false,
        description: '文字が違う促音2'
      },
      {
        hiragana: 'ばっじ',
        input: 'bazji',
        expected: false,
        description: '文字が違う促音3'
      },
      {
        hiragana: 'うぉーたー',
        input: 'who-ta-',
        expected: true,
        description: 'うぉーたー1'
      },
      {
        hiragana: 'うぉーたー',
        input: 'uxo-ta-',
        expected: true,
        description: 'うぉーたー2'
      },
      {
        hiragana: 'うぉーたー',
        input: 'ulo-ta-',
        expected: true,
        description: 'うぉーたー3'
      },
      {
        hiragana: 'うぉーたー',
        input: 'uho-ta-',
        expected: false,
        description: 'うぉーたー4(不正な入力)'
      },
      {
        hiragana: 'うぉーたー',
        input: 'wxo-ta-',
        expected: false,
        description: 'うぉーたー5(不正な入力)'
      },
      {
        hiragana: 'うぉーたー',
        input: 'wlo-ta-',
        expected: false,
        description: 'うぉーたー6(不正な入力)'
      },
      {
        hiragana: 'かんじゃ',
        input: 'kanzya',
        expected: true,
        description: 'かんじゃ1'
      },
      {
        hiragana: 'かんじゃ',
        input: 'kanja',
        expected: true,
        description: 'かんじゃ2'
      },
      {
        hiragana: 'かんじゃ',
        input: 'kaxja',
        expected: false,
        description: 'かんじゃ3(不正な入力)'
      },

    ])('$description: $hiragana -> $input', ({ hiragana, input, expected }) => {
      let state = initialState(hiragana);
      for (const char of input) {
        state = nextState(char, state);
      }
      expect(isFinish(state)).toBe(expected);
    });
  });

  describe('既知の制限事項（将来的な改善対象）', () => {
    test.each([
      {
        hiragana: 'あっち',
        input: 'acti',
        expected: true,
        description: '促音の入力パターンが不完全（actiで「あっち」と入力可能）',
        issue: '促音の入力パターンの検証が不十分'
      },
      {
        hiragana: 'だっちょう',
        input: 'datcyou',
        expected: true,
        description: '促音と拗音の組み合わせで不正な入力が許容される',
        issue: '促音と拗音の組み合わせパターンの検証が不十分'
      }
    ])('$description: $hiragana -> $input', ({ hiragana, input, expected }) => {
      let state = initialState(hiragana);
      for (const char of input) {
        state = nextState(char, state);
      }
      expect(isFinish(state)).toBe(expected);
    });
  });
}); 