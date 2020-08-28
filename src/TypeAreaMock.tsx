import React from 'react';
import TypeArea from './TypeArea';
import { randomOne, randomN } from './sanpleWords';
import { generateWord } from './TypeWell';
import { initialState } from './TypingCore';

let word1 = randomOne()

function TypeAreaMock() {
  let word = generateWord(400)
  return (
    <div>
      <TypeArea
        hiragana={word.hiragana}
        kanji={word.kanji}
        state={initialState(word.hiragana)}
      />
    </div>
  )
}

export default TypeAreaMock