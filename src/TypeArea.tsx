import React from 'react';
import { displayRaman, TypingState } from './TypingCore';
import './TypeArea.css';

type TypeProps = {
  state: TypingState
}

function TypeArea(props: {kanji: string, hiragana: string, state: TypingState}) {
  return (
    <div>
      <Kanji
        text={props.kanji}
      />
      <Hiragana
        text={props.hiragana}
      />
      <ReferenceRaman
        state={props.state}
      />
    </div>
  )
}

function Kanji(props: {text: string}) {
  return (
    <div className="Kanji">
      {props.text}
    </div>
  )
}

function Hiragana(props: {text: string}) {
  return (
    <div className="Hiragana">
      {props.text}
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

export default TypeArea