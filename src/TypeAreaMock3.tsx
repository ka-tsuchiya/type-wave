import React, { useState } from 'react';
import TypeArea from './TypeArea';
import { generateWord } from './TypeWell';
import { initialState, nextState } from './TypingCore';

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
        <TypeArea
          hiragana={word.hiragana}
          kanji={word.kanji}
          state={state}
        />
      </div>
    </div>
  )
}

export default TypeAreaMock