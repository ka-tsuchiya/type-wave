import { useCallback, useState } from 'react';
import { generateWord, sortAndJoin, TypewellWord } from '../core/TypeWell';
import { initialState as createInitialTypingState, isFinish, nextState } from '../core/TypingCore';
import { TypingState, TypingLogicReturn } from '../types/typing';
import { TYPING_CONSTANTS } from '../constants/typing';
import { wordKPM, wordSplit, makeResultText } from '../utils/typing/wordUtils';

// 初期状態の分離
const initialTypingState: TypingState = {
  completedWords: 0,
  isTyping: false,
  wordLength: TYPING_CONSTANTS.DEFAULT_WORD_LENGTH,
  baseKPM: TYPING_CONSTANTS.DEFAULT_BASE_KPM,
  word: generateWord(TYPING_CONSTANTS.DEFAULT_WORD_LENGTH),
  words: wordSplit(generateWord(TYPING_CONSTANTS.DEFAULT_WORD_LENGTH)),
  state: createInitialTypingState(generateWord(TYPING_CONSTANTS.DEFAULT_WORD_LENGTH).hiragana),
  count: 0,
  buttonEnabled: true,
  startTime: 0,
  finishTime: 0,
  checkPointTime: 0,
  checkPoint: 0,
  currentIndex: 0
};

export const useTypingLogic = (): TypingLogicReturn => {
  const [typingState, setTypingState] = useState<TypingState>(initialTypingState);
  const [resultText, setResultText] = useState<string>(TYPING_CONSTANTS.DEFAULT_RESULT_TEXT);

  const newWord = useCallback(() => {
    try {
      const newWord = generateWord(typingState.wordLength);
      setTypingState(prev => ({
        ...prev,
        word: { ...newWord, completed: false },
        state: createInitialTypingState(newWord.hiragana),
        words: wordSplit({ ...newWord, completed: false })
      }));
    } catch (error) {
      console.error('単語生成エラー:', error);
    }
  }, [typingState.wordLength]);

  const sortWord = useCallback(() => {
    try {
      const newWord = sortAndJoin(typingState.words);
      setTypingState(prev => ({
        ...prev,
        word: { ...newWord, completed: false },
        state: createInitialTypingState(newWord.hiragana),
        words: wordSplit({ ...newWord, completed: false })
      }));
    } catch (error) {
      console.error('単語ソートエラー:', error);
    }
  }, [typingState.words]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    try {
      const currentTime = Date.now();
      if (isFinish(typingState.state)) return;

      const s = nextState(e.key, typingState.state);
      setTypingState(prev => {
        if (e.key === " " && s.lastResult) {
          const completedCount = prev.completedWords + 1;
          const k = s.index - prev.checkPoint;
          const checkTime = currentTime - prev.checkPointTime;
          
          const kpm = wordKPM(k, checkTime);
          const nextWords = [...prev.words];
          nextWords[completedCount - 1].completed = kpm;

          return {
            ...prev,
            completedWords: completedCount,
            checkPoint: s.index,
            checkPointTime: currentTime,
            words: nextWords,
            state: s
          };
        }

        if (isFinish(s)) {
          const time = Date.now();
          const elapsed = time - prev.startTime;

          const k = s.index - prev.checkPoint;
          const checkTime = currentTime - prev.checkPointTime;
          const kpm = wordKPM(k, checkTime);
          
          const nextWords = [...prev.words];
          nextWords[prev.completedWords].completed = kpm;

          setResultText(makeResultText(elapsed, s.index));

          return {
            ...prev,
            finishTime: elapsed,
            words: nextWords,
            state: s
          };
        }

        return {
          ...prev,
          state: s
        };
      });
    } catch (error) {
      console.error('キー入力エラー:', error);
    }
  }, [typingState.state]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if(e.keyCode === 27) {
      escape();
    }
  }, []);

  const escape = useCallback(() => {
    setTypingState(prev => ({
      ...prev,
      isTyping: false,
      buttonEnabled: true
    }));
    setResultText(TYPING_CONSTANTS.DEFAULT_RESULT_TEXT);
    setTimeout(() => {
      let button = document.getElementById("startButton");
      button?.focus();
    }, TYPING_CONSTANTS.FOCUS_DELAY);
  }, []);

  const start = useCallback(() => {
    const st = Date.now();
    setTypingState(prev => ({
      ...prev,
      completedWords: 0,
      checkPointTime: st,
      checkPoint: 0,
      startTime: st,
      isTyping: true
    }));
    setResultText(TYPING_CONSTANTS.DEFAULT_RESULT_TEXT);
    setTimeout(() => {
      let element = document.getElementsByClassName('TypeArea')[0] as HTMLElement;
      element?.focus();
    }, TYPING_CONSTANTS.FOCUS_DELAY);
  }, []);

  const countDown = useCallback((n: number) => {
    setTypingState(prev => ({
      ...prev,
      buttonEnabled: false,
      count: n
    }));
    if(!typingState.isTyping){
      if (n == 0) {
        start();
      }else{
        setTimeout(() => {
          countDown(n - 1);
        }, TYPING_CONSTANTS.COUNTDOWN_INTERVAL);
      }
    }
  }, [typingState.isTyping, start]);

  const selectLength = useCallback((value: string) => {
    setTypingState(prev => ({
      ...prev,
      wordLength: Number(value)
    }));
  }, []);

  const selectBaseKPM = useCallback((value: string) => {
    setTypingState(prev => ({
      ...prev,
      baseKPM: Number(value)
    }));
  }, []);

  return {
    typingState,
    resultText,
    newWord,
    sortWord,
    handleKeyPress,
    handleKeyDown,
    escape,
    start,
    countDown,
    selectLength,
    selectBaseKPM
  };
}; 