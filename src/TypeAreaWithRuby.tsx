import React from 'react';
import { displayRaman, TypingState } from './TypingCore';
import './TypeArea.css';
import { TypewellWord } from './TypeWell';
import { TypeAreaWithRubyProps } from './types/typing';

type TypeProps = {
  state: TypingState
}

function TypeAreaWithRuby(props: TypeAreaWithRubyProps) {
  return (
    <div>
      <div className="japanese">
        {props.words.map((word) => {
          const completed = word.completed
          let style = completed ? {color: speedColor(props.baseKPM, Number(completed))} : {}
          return (
              <div className="word">
              <ruby className={completed ? 'completed' : ''} style={style}>
                {word.kanji}<rt>{completed ? Number(word.completed).toFixed(1) : word.hiragana}</rt>
              </ruby>
            </div>
          )
        })}
      </div>
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

function speedColor(base: number, speed: number) : string {
  const rate = speed / base
  const red = (128 / rate / rate)
  const green = (128 * (rate < 1 ? rate * rate : 1 / rate / rate))
  const blue = 128 * rate * rate
  let result = "#"
  for(let c of [red, green, blue]) {
    if(c > 255){
      c = 255
    } else {
      c = Math.trunc(c)
    }
    const f = ("0" + c.toString(16)).slice(-2)
    result += f
  }
  return result
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