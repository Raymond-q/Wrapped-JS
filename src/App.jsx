import { useState } from 'react'
import {client_id, client_secret, redirect_uri} from '../constants'
import './App.css'

function api(){
  
}

function click(count, setCount, started, setStarted, time){
  if (!started){
    setStarted(true)
    setTimeout(endTime(setStarted, count, setCount, time), time)
  }
  setCount(count + 1);
}

function reset(setCount){
  setCount(0);
}

function endTime(setStarted, count, setCount, time){
  setStarted(false)
  let temp = count
  setCount(0)
  console.log(temp * 1000 / time)
}

function App() {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  
  return (
    <div className="App">
      <div className="card">
        <button onClick={() => click(count, setCount, started, setStarted, 1000)}>
          count is {count}
        </button>
      </div>
      <div className="card">
        <button onClick={() => reset(setCount)}>
          reset count
        </button>
      </div>
    </div>
  )
}

export default App
