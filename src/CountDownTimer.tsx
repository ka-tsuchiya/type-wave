import React, { useState } from 'react'
import ReactDom from 'react-dom'

function CountDownTimer(props: {count: number}) { 
  // const [count, setCount] = useState(props.count)

  // setInterval(() => {
  //   if(count > 0) {
  //     setCount(count - 1)
  //   }
  // }, 1000)
  console.log("CountDownTimer is called")

  return (
    <div className="CountDown" >
      {props.count.toString()}
    </div>
  )
}

export default CountDownTimer