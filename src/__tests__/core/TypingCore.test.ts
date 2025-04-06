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
    });

    test('誤った入力で状態が変化しない', () => {
      const state = initialState('てすと');
      const next = nextState('r', state);
      expect(next.index).toBe(0);
      expect(next.lastResult).toBe(false);
    });
  });

  describe('isFinish', () => {
    test('完了状態を正しく判定する', () => {
      let state = initialState('てすと');
      for (const s of 'tesuto') {
        state = nextState(s, state);
      }
      expect(isFinish(state)).toBe(true);
    });
  });
}); 