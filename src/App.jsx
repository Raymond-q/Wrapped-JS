import { useState, useEffect } from 'react'
import {client_id, client_secret, redirect_uri, auth_endpoint, response_type } from '../constants'
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

const logout = () => {
  setToken("")
  window.localStorage.removeItem("token")
}

function App() {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
  
    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
  
    setToken(token)
  
  }, [])
  
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
      <a href={`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`}>Login to Spotify</a>
    </div>
    
  )
}

export default App
