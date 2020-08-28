import React, { useState } from 'react';
import { generateWord, TypewellWord } from './TypeWell';
import { initialState, nextState } from './TypingCore';
import TypeAreaWithRuby from './TypeAreaWithRuby';

function TypeAreaMockWithRuby() {
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
    let element = document.getElementsByClassName('TypeArea')[0] as HTMLElement
    element?.focus()
    newWord()
  })
  const keyPress = (e: React.KeyboardEvent) => {
    setState(nextState(e.key, state))
  }
  const keyDown = (e:React.KeyboardEvent) => {
    console.log(e.keyCode)
  }
  return (
    <div className="Container">
      <button onClick={click}>
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
}

function wordSplit(word: TypewellWord) {
  let result: TypewellWord[] = []
  let hiraganas = word.hiragana.split("　")
  let kanjis = word.kanji.split("　")
  for(let i = 0; i < hiraganas.length; i++) {
    result[i] = {
      hiragana: hiraganas[i] + "　",
      kanji: kanjis[i] + "　"
    }
  }
  return result
}

export default TypeAreaMockWithRuby