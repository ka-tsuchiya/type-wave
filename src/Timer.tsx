import React from 'react';

function Timer(props: {time: number, digit: number}){
    return (
        <div className="Timer" >
            {props.time.toFixed(props.digit)}
        </div>
        )
}

export default Timer