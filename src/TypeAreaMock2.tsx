import React, { useState } from 'react';
import TypeArea from './TypeArea';
import { generateWord } from './TypeWell';
import { initialState } from './TypingCore';

function TypeAreaMock() {
  const [word, setWord] = useState(generateWord(400))
  const [state, setState] = useState(initialState(word.hiragana))
  const newWord = (() =>{
    let newWord = generateWord(400)
    setWord(newWord)
    console.log("new word " + newWord.hiragana)
    setState(initialState(newWord.hiragana))
  })
  const click = (() => {
    let element = document.getElementsByClassName('TypeArea')[0] as HTMLElement
    element?.focus()
    newWord()
  })
  return (
    <div>
      <button onClick={click}>
        スタート
      </button>
      <TypeArea
        hiragana={word.hiragana}
        kanji={word.kanji}
        state={state}
      />
    </div>
  )
}

export default TypeAreaMock