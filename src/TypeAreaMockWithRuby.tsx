import React, { useState } from 'react';
import { generateWord, TypewellWord } from './TypeWell';
import { initialState, nextState } from './TypingCore';
import TypeAreaWithRuby from './TypeAreaWithRuby';
import CountDownTimer from './CountDownTimer';
import Timer from './Timer';

function TypeAreaMockWithRuby() {
  const [completedWords, setWordsCount] = useState(0)
  const [onType, setonType] = useState(false)
  const [word, setWord] = useState(generateWord(400))
  const [words, setWords] = useState(wordSplit(word))
  const [state, setState] = useState(initialState(word.hiragana))
  const [count, setCount] = useState(0)
  const [buttonEnabled, setButtonEnabled] = useState(true)
  const [time, setTime] = useState(0)
  const newWord = (() =>{
    let newWord = generateWord(400)
    setWord(newWord)
    console.log("new word " + newWord.hiragana)
    setState(initialState(newWord.hiragana))
    setWords(wordSplit(newWord))
  })
  const click = (() => {
      newWord()
      countDown(3)
  })
  const keyPress = (e: React.KeyboardEvent) => {
    let s = nextState(e.key, state)
    setState(s)
    if(e.key === " " && s.lastResult) {
      let completedCount = completedWords+1
      setWordsCount(completedCount)
      let nextWords = words
      nextWords[completedCount-1].completed = true
      setWords(nextWords)
    }
  }
  const keyDown = (e:React.KeyboardEvent) => {
    if(e.keyCode === 27) {
      escape()
    }
  }
  const escape = (() => {
    setonType(false)
    setButtonEnabled(true)
    let button = document.getElementById("startButton")
    button?.focus()
    setTime(0)
  })
  const start = (() => {
    setonType(true)
    setWordsCount(0)
    let element = document.getElementsByClassName('TypeArea')[0] as HTMLElement
    element?.focus()
    let st = Date.now()
    timerStart(st)
  })

  const countDown = function(n: number){
    setButtonEnabled(false)
    setCount(n)
    if(!onType){
      if (n == 0) {
        start()
      }else{
        setTimeout(() => {
          countDown(n - 1)
        }, 1000)
      }
    }
  }

  const timerStart = ((st: number) => {
    setInterval(() => {
      let currentTime = Date.now()
      let diff = currentTime - st
      setTime(diff / 1000)
    }, 20)
  })

  if(onType) {

    return (
      <div className="Container">
        <button onClick={click} id="startButton" disabled={true}>
          新しいワード
        </button>
        <div>
          <Timer
            time={time}
            digit={1}
          />
        </div>
        <div onKeyPress={keyPress} onKeyDown={keyDown} tabIndex={0} className="TypeArea">
          <TypeAreaWithRuby
            words={words}
            state={state}
            />
        </div>
      </div>
    )
  } else {
    return (
      <div className="Container">
        <button onClick={click} disabled={!buttonEnabled}>
          新しいワード
        </button>
        <div>
          <CountDownTimer
           count={count}
           />
        </div>
      </div>
    )
  }
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

export default TypeAreaMockWithRuby