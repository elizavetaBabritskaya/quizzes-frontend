import React, {MouseEventHandler, useState, useEffect} from 'react';
import {Button} from 'antd';


export type Props = {
  // minutesCount: number,
  // secondsCount: number,
  count: number
}


const Timer = ({count} : Props) => {

const [time, setTime] = useState(count);

const tick = () => {
  console.log(time)
  if(time===0) {
    reset();
  } else {
    setTime((time) => (time-1000))
  }
};

const reset = () => setTime(time);

useEffect(()=>{
  const timerId = setInterval(tick, 1000);
  return() => clearInterval(timerId)
},[])
  return(
    <div>
       {`${(~~(time/60000)).toString().padStart(2, '0')}:${((time%60000)/1000).toString().padStart(2, '0')}`}
    </div>
    )
  };

export default Timer;