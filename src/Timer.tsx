import React, { useEffect, useState } from 'react';

function Timer(props: { startTime: number, digit: number }) {
  const { startTime, digit } = props
  const [time, setTime] = useState(startTime)
  useEffect(() => {
    setInterval(() => {
      let currentTime = Date.now()
      let diff = currentTime - startTime
      setTime(diff / 1000)
    }, 20)
  }, [])

  return (
    <div className="Timer" >
      {time.toFixed(digit)}
    </div>
  )
}

export default Timer