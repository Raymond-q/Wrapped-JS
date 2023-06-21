import { useState, useEffect } from 'react'
import {client_id, client_secret, redirect_uri, auth_endpoint, response_type } from '../constants'
import './App.css'
import axios from 'axios'

function App() {
  const [token, setToken] = useState("")
  const [tracks, setTracks] = useState([])

  const logout = () => {
    setToken("")
    console.log(token)
    window.localStorage.removeItem("token")
  }

  const login = () => {
    window.location.replace(auth_endpoint + `?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}`)
  }

  async function topItems (type, range) {
    const url = "https://api.spotify.com/v1/get/" + type
    console.log(url)
    const arr = await axios.get("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    )
    console.log(arr)
    /*if (type == "tracks"){
      setTracks(arr.items())
    }*/
  }

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
        <button onClick={() => topItems("tracks", "medium_term")}>
          Get tracks
        </button>
      </div>
      {!token ?
        <button onClick = {() => login()}>Login
            to Spotify</button>
        : <button onClick={logout}>Logout</button>}
    </div>
    
  )
}

export default App
