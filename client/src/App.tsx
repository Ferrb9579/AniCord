import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Player } from './Player'
import axios from 'axios'

function App() {
  useEffect(() => {
    axios.post("http://127.0.0.1:3001/download", null, {
      headers: {
        dlink: "https://files.vidstack.io/sprite-fight/hls/stream.m3u8"
      }
    }).then(res => {
      console.log(res)
    })
  })
  return (
    <>
      <Player />
    </>
  )
}

export default App
