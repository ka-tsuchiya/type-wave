import React, { useState } from 'react';
import { generateWord, TypewellWord } from './TypeWell';
import { initialState, nextState } from './TypingCore';
import TypeAreaWithRuby from './TypeAreaWithRuby';

function TypeAreaMockWithRuby() {
  const [completedWords, setWordsCount] = useState(0)
  const [onType, setonType] = useState(false)
  const [word, setWord] = useState(generateWord(400))
  const [words, setWords] = useState(wordSplit(word))
  const [state, setState] = useState(initialState(word.hiragana))
  const newWord = (() =>{
    let newWord = generateWord(400)
    setWord(newWord)
    console.log("new word " + newWord.hiragana)
    setState(initialState(newWord.hiragana))
    setWords(wordSplit(newWord))
  })
  const click = (() => {
    setTimeout(() => {
      newWord()
      start()
      let element = document.getElementsByClassName('TypeArea')[0] as HTMLElement
      element?.focus()
    }, 1000);
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
    console.log(e.keyCode)
    if(e.keyCode === 27) {
      escape()
    }
  }
  const escape = (() => {
    setonType(false)
    let button = document.getElementById("startButton")
    button?.focus()
  })
  const start = (() => {
    setonType(true)
    setWordsCount(0)
  })

  if(onType) {

    return (
      <div className="Container">
        <button onClick={click} id="startButton">
          新しいワード
        </button>
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
        <button onClick={click}>
          新しいワード
        </button>
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