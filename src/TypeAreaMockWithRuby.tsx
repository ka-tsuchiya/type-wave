import React, { useCallback, useState } from 'react';
import { generateWord, sortAndJoin, TypewellWord } from './TypeWell';
import { initialState as createInitialTypingState, isFinish, nextState } from './TypingCore';
import TypeAreaWithRuby from './TypeAreaWithRuby';
import CountDownTimer from './CountDownTimer';
import Timer from './Timer';
import { TypingState, TypingLogicReturn } from './types/typing';
import { TYPING_CONSTANTS, WORD_LENGTH_OPTIONS, BASE_KPM_OPTIONS } from './constants/typing';

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

// タイピング関連のロジックをカスタムフックとして分離
const useTypingLogic = (): TypingLogicReturn => {
  const [typingState, setTypingState] = useState<TypingState>(initialTypingState);
  const [resultText, setResultText] = useState<string>(TYPING_CONSTANTS.DEFAULT_RESULT_TEXT);

  const newWord = useCallback(() => {
    let newWord = generateWord(typingState.wordLength)
    setTypingState(prev => ({
      ...prev,
      word: newWord,
      state: createInitialTypingState(newWord.hiragana),
      words: wordSplit(newWord)
    }))
  }, [typingState.wordLength]);

  const sortWord = useCallback(() => {
    const newWord = sortAndJoin(typingState.words)
    setTypingState(prev => ({
      ...prev,
      word: newWord,
      state: createInitialTypingState(newWord.hiragana),
      words: wordSplit(newWord)
    }))
  }, [typingState.words]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    let currentTime = Date.now()
    if (isFinish(typingState.state)) {
      return
    }
    let s = nextState(e.key, typingState.state)
    setTypingState(prev => {
      if (e.key === " " && s.lastResult) {
        let completedCount = prev.completedWords + 1
        let k = s.index - prev.checkPoint
        let checkTime = currentTime - prev.checkPointTime
        
        let kpm = wordKPM(k, checkTime)
        let nextWords = [...prev.words]
        nextWords[completedCount - 1].completed = kpm

        return {
          ...prev,
          completedWords: completedCount,
          checkPoint: s.index,
          checkPointTime: currentTime,
          words: nextWords,
          state: s
        }
      }

      if (isFinish(s)) {
        let time = Date.now()
        let elapsed = time - prev.startTime

        let k = s.index - prev.checkPoint
        let checkTime = currentTime - prev.checkPointTime
        let kpm = wordKPM(k, checkTime)
        
        let nextWords = [...prev.words]
        nextWords[prev.completedWords].completed = kpm

        setResultText(makeResultText(elapsed, s.index));

        return {
          ...prev,
          finishTime: elapsed,
          words: nextWords,
          state: s
        }
      }

      return {
        ...prev,
        state: s
      }
    })
  }, [typingState.state]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if(e.keyCode === 27) {
      escape()
    }
  }, []);

  const escape = useCallback(() => {
    setTypingState(prev => ({
      ...prev,
      isTyping: false,
      buttonEnabled: true
    }))
    setResultText(TYPING_CONSTANTS.DEFAULT_RESULT_TEXT);
    setTimeout(() => {
      let button = document.getElementById("startButton")
      button?.focus()
    }, TYPING_CONSTANTS.FOCUS_DELAY);
  }, []);

  const start = useCallback(() => {
    const st = Date.now()
    setTypingState(prev => ({
      ...prev,
      completedWords: 0,
      checkPointTime: st,
      checkPoint: 0,
      startTime: st,
      isTyping: true
    }))
    setResultText(TYPING_CONSTANTS.DEFAULT_RESULT_TEXT);
    setTimeout(() => {
      let element = document.getElementsByClassName('TypeArea')[0] as HTMLElement
      element?.focus()
    }, TYPING_CONSTANTS.FOCUS_DELAY)
  }, []);

  const countDown = useCallback((n: number) => {
    setTypingState(prev => ({
      ...prev,
      buttonEnabled: false,
      count: n
    }))
    if(!typingState.isTyping){
      if (n == 0) {
        start()
      }else{
        setTimeout(() => {
          countDown(n - 1)
        }, TYPING_CONSTANTS.COUNTDOWN_INTERVAL)
      }
    }
  }, [typingState.isTyping, start]);

  const selectLength = useCallback((value: string) => {
    setTypingState(prev => ({
      ...prev,
      wordLength: Number(value)
    }))
  }, []);

  const selectBaseKPM = useCallback((value: string) => {
    setTypingState(prev => ({
      ...prev,
      baseKPM: Number(value)
    }))
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

// メインコンポーネントの簡素化
function TypeAreaMockWithRuby() {
  const {
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
  } = useTypingLogic();

  const click = useCallback(() => {
    newWord();
    countDown(3);
  }, [newWord, countDown]);

  const sortedClick = useCallback(() => {
    sortWord();
    countDown(3);
  }, [sortWord, countDown]);

  if(typingState.isTyping) {
    return (
      <div>
        <button
          onClick={() => window.open(`http://twitter.com/share?url=tk2-256-37539.vs.sakura.ne.jp/type/index.html&text=${resultText}&hashtags=TypeWave`, '_blank')}
        >
          Twitterで共有する
        </button>
        <SelectBaseSpeed
          onSelect={selectBaseKPM}
          disabled={true} 
        />
        <SelectTypeLength
          onSelect={selectLength}
          disabled={true}
        />
        <div className="Container">
          <button onClick={click} id="startButton" disabled={true}>
            スタート
          </button>
          <button disabled={true}>
            ソートしてやり直し
          </button>
          <div>
            {isFinish(typingState.state) ? (
              <div>
                {typingState.state.index + "打 / " + (typingState.finishTime / 1000).toFixed(3) + "秒 = " + (typingState.state.index / typingState.finishTime * 60000).toFixed(2) + "kpm"}
              </div>
            ) : (
              <Timer
                startTime={typingState.startTime}
                digit={1}
              />
            )}
          </div>
          <div onKeyPress={handleKeyPress} onKeyDown={handleKeyDown} tabIndex={0} className="TypeArea">
            <TypeAreaWithRuby
              words={typingState.words}
              state={typingState.state}
              baseKPM={typingState.baseKPM}
              onKeyPress={handleKeyPress}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <button
          onClick={() => window.open(`http://twitter.com/share?url=tk2-256-37539.vs.sakura.ne.jp/type/index.html&text=${resultText}&hashtags=TypeWave`, '_blank')}
        >
          Twitterで共有する
        </button>
        <SelectBaseSpeed
          onSelect={selectBaseKPM}
          disabled={false}
        />
        <SelectTypeLength
          onSelect={selectLength}
          disabled={false}
        />
        <div className="Container">
          <button onClick={click} id="startButton" disabled={!typingState.buttonEnabled}>
            スタート
          </button>
          <button onClick={sortedClick} disabled={!typingState.buttonEnabled || (typingState.finishTime == 0)}>
            ソートしてやり直し
          </button>
          <div>
            <CountDownTimer
              count={typingState.count}
            />
          </div>
        </div>
      </div>
    );
  }
}

function SelectTypeLength(props: {onSelect: (value: string) => void, disabled: boolean}) {
  return (
    <select onChange={(e) => props.onSelect(e.target.value)} disabled={props.disabled} defaultValue={TYPING_CONSTANTS.DEFAULT_WORD_LENGTH.toString()}>
      {WORD_LENGTH_OPTIONS.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}

function SelectBaseSpeed(props: {onSelect: (value: string) => void, disabled: boolean}) {
  return (
    <select onChange={(e) => props.onSelect(e.target.value)} disabled={props.disabled} defaultValue={TYPING_CONSTANTS.DEFAULT_BASE_KPM.toString()}>
      {BASE_KPM_OPTIONS.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}

function wordKPM(k: number, timems: number): number {
  return k * 60000 / timems
}

function wordSplit(word: TypewellWord) {
  let result: TypewellWord[] = []
  let hiraganas = word.hiragana.split("　")
  let kanjis = word.kanji.split("　")
  for(let i = 0; i < hiraganas.length; i++) {
    result[i] = {
      hiragana: hiraganas[i] + "　",
      kanji: kanjis[i] + "　",
      completed: false
    }
  }
  return result
}

function makeResultText(timems: number, length: number) : string {
  return length + "打を" + (timems / 1000).toFixed(3) + "秒で打って" + (length / timems * 60000).toFixed(2) + "kpmでした"
}

export default TypeAreaMockWithRuby