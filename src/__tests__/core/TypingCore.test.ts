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
    test('完了状態を正しく判定する:てすと->tesuto', () => {
      let state = initialState('てすと');
      const ramans = 'tesuto';
      for (const s of ramans) {
        state = nextState(s, state);
      }
      expect(isFinish(state)).toBe(true);
    });
    const hiragana = 'ちょうちょう'
    const ramans0 = 'chouchou'
    test('完了状態を正しく判定する:' + hiragana + '->' + ramans0, () => {
      let state2 = initialState(hiragana);
      for (const s of ramans0) {
        state2 = nextState(s, state2);
      }
      console.log(state2)
      expect(isFinish(state2)).toBe(true);
    });
    const ramans1 = 'choutyou'
    test('完了状態を正しく判定する:' + hiragana + '->' + ramans1, () => {
      let state3 = initialState(hiragana);
      for (const s of ramans1) {
        state3 = nextState(s, state3);
      }
      expect(isFinish(state3)).toBe(true);
    });
    const ramans2 = 'tyoutyou'
    test('完了状態を正しく判定する:' + hiragana + '->' + ramans2, () => {
      let state4 = initialState(hiragana);
      for (const s of ramans2) {
        state4 = nextState(s, state4);
      }
      expect(isFinish(state4)).toBe(true);
    });
    const ramans3 = 'chouthou'
    test('完了状態を正しく判定する:' + hiragana + '->' + ramans3, () => {
      let state5 = initialState(hiragana);
      for (const s of ramans3) {
        state5 = nextState(s, state5);
      }
      expect(isFinish(state5)).toBe(false);
    }); 
    const hiragana2 = 'しょうしょう'
    const ramans4 = 'shoushou'
    test('完了状態を正しく判定する:' + hiragana2 + '->' + ramans4, () => {
      let state6 = initialState(hiragana2);
      for (const s of ramans4) {
        state6 = nextState(s, state6);
      }
      expect(isFinish(state6)).toBe(true);
    });
    const hiragana3 = 'こっかい'
    const ramans5 = 'kokkai'
    test('完了状態を正しく判定する:' + hiragana3 + '->' + ramans5, () => {
      let state7 = initialState(hiragana3);
      for (const s of ramans5) {
        state7 = nextState(s, state7);
      }
      expect(isFinish(state7)).toBe(true);
    });
    const ramans6 = 'koccai'
    test('完了状態を正しく判定する:' + hiragana3 + '->' + ramans6, () => {
      let state8 = initialState(hiragana3);
      for (const s of ramans6) {
        state8 = nextState(s, state8);
      }
      expect(isFinish(state8)).toBe(true);
    });
    const ramans7 = 'kockai'
    test('完了状態を正しく判定する:' + hiragana3 + '->' + ramans7, () => {
      let state9 = initialState(hiragana3);
      for (const s of ramans7) {
        state9 = nextState(s, state9);
      }
      expect(isFinish(state9)).toBe(false);
    });
  });
}); 