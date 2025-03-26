import React, { useCallback, useState } from 'react';
import { generateWord, sortAndJoin, TypewellWord } from './TypeWell';
import { initialState as createInitialTypingState, isFinish, nextState } from './TypingCore';
import TypeAreaWithRuby from './TypeAreaWithRuby';
import CountDownTimer from './CountDownTimer';
import Timer from './Timer';

// 型定義の追加
interface TypingState {
  completedWords: number;
  isTyping: boolean;
  wordLength: number;
  baseKPM: number;
  word: TypewellWord;
  words: TypewellWord[];
  state: ReturnType<typeof createInitialTypingState>;
  count: number;
  buttonEnabled: boolean;
  startTime: number;
  finishTime: number;
  checkPointTime: number;
  checkPoint: number;
}

// 初期状態の定義
const initialTypingState: TypingState = {
  completedWords: 0,
  isTyping: false,
  wordLength: 400,
  baseKPM: 600,
  word: generateWord(400),
  words: wordSplit(generateWord(400)),
  state: createInitialTypingState(generateWord(400).hiragana),
  count: 0,
  buttonEnabled: true,
  startTime: 0,
  finishTime: 0,
  checkPointTime: 0,
  checkPoint: 0,
};

function TypeAreaMockWithRuby() {
  const [typingState, setTypingState] = useState<TypingState>(initialTypingState);
  const [resultText, setResultText] = useState("乗るしかない、このビッグウェーブに")
  const newWord = useCallback((() =>{
    let newWord = generateWord(typingState.wordLength)
    setTypingState(prev => ({
      ...prev,
      word: newWord,
      state: createInitialTypingState(newWord.hiragana),
      words: wordSplit(newWord)
    }))
  }), [typingState.wordLength])
  const sortWord = useCallback(() => {
    const newWord = sortAndJoin(typingState.words)
    setTypingState(prev => ({
      ...prev,
      word: newWord,
      state: createInitialTypingState(newWord.hiragana),
      words: wordSplit(newWord)
    }))
  }, [typingState.words])
  const click = (() => {
      newWord()
      countDown(3)
  })
  const sortedClick = (() => {
    sortWord()
    countDown(3)
  })
  const keyPress = (e: React.KeyboardEvent) => {
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
  }
  const keyDown = (e:React.KeyboardEvent) => {
    if(e.keyCode === 27) {
      escape()
    }
  }
  const escape = (() => {
    setTypingState(prev => ({
      ...prev,
      isTyping: false,
      buttonEnabled: true
    }))
    setTimeout(() => {
      let button = document.getElementById("startButton")
      button?.focus()
    }, 30);
  })
  const start = () => {
    const st = Date.now()
    setTypingState(prev => ({
      ...prev,
      completedWords: 0,
      checkPointTime: st,
      checkPoint: 0,
      startTime: st,
      isTyping: true
    }))
    setTimeout(() => {
      let element = document.getElementsByClassName('TypeArea')[0] as HTMLElement
      element?.focus()
    }, 30)
  }

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
        }, 1000)
      }
    }
  }, [])

  const selectLength = (value: string) => {
    setTypingState(prev => ({
      ...prev,
      wordLength: Number(value)
    }))
  }
  const selectBaseKPM = (value: string) => {
    setTypingState(prev => ({
      ...prev,
      baseKPM: Number(value)
    }))
  }
  

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
            {
              isFinish(typingState.state) ? (
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
          <div onKeyPress={keyPress} onKeyDown={keyDown} tabIndex={0} className="TypeArea">
            <TypeAreaWithRuby
              words={typingState.words}
              state={typingState.state}
              baseKPM={typingState.baseKPM}
              />
          </div>
        </div>
      </div>
    )
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
    )
  }
}

function SelectTypeLength(props: {onSelect: (value: string) => void, disabled: boolean}) {
  return (
    <select onChange={(e) => props.onSelect(e.target.value)} disabled={props.disabled}>
          <option value="100">100打</option>
          <option value="200">200打</option>
          <option value="400" selected>400打</option>
        </select>
  )
}

function SelectBaseSpeed(props: {onSelect: (value: string) => void, disabled: boolean}) {
  return (
    <select onChange={(e) => props.onSelect(e.target.value)} disabled={props.disabled}>
      <option value="200">200kpm</option>
      <option value="300">300kpm</option>
      <option value="400">400kpm</option>
      <option value="500">500kpm</option>
      <option value="600" selected>600kpm</option>
      <option value="700">700kpm</option>
      <option value="800">800kpm</option>
      <option value="900">900kpm</option>
      <option value="1000">1000kpm</option>
      <option value="1100">1100kpm</option>
      <option value="1200">1200kpm</option>
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