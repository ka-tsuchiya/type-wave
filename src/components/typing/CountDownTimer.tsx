import React from 'react'

function CountDownTimer(props: {count: number}) { 
  return (
    <div className="CountDown" >
      {props.count.toString()}
    </div>
  )
}

export default CountDownTimer