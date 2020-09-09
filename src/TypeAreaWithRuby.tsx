import React from 'react';
import { displayRaman, TypingState } from './TypingCore';
import './TypeArea.css';
import { TypewellWord } from './TypeWell';

type TypeProps = {
  state: TypingState
}

function TypeAreaWithRuby(props: {words: TypewellWord[], state: TypingState}) {
  return (
    <div>
      {props.words.map((word) => {
        return (
          <ruby className={word.completed ? 'completed' : ''}>
            {word.kanji}<rt>{word.hiragana}</rt>
          </ruby>
        )
      })}
      <ReferenceRaman
        state={props.state}
      />
    </div>
  )
}

function ReferenceRaman(props: TypeProps) {
  // let state = props.state
  return (
    <code className="reference">
      <Raman
        completed={props.state.ramans[0].substr(0, props.state.index).toLowerCase()}
        text={displayRaman(props.state).toLowerCase()}
        miss={!props.state.lastResult}
      />
    </code>
  )
}

function Raman(props: {text: string, miss: boolean, completed: string}) {
  if(props.miss) {
    return (
      <div>
        <span className="completed">
          {props.completed}
        </span>
        <span className="miss">{props.text[0]}</span>
        {props.text.substr(1)}
      </div>
    )
  }
  return (
    <div>
      <span className="completed">
        {props.completed}
      </span>
      {props.text}
    </div>
  )
}

export default TypeAreaWithRuby