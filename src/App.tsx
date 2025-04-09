import { useState, useEffect } from 'react'
import './App.css'

const getFace = (value) => {
  if (value < 30) return "😊"
  if (value < 70) return "😐"
  return "😭"
}

const getLabel = (value) => {
  if (value < 30) return "ça vail bin"
  if (value < 70) return "aillé !"
  return "ail ail ail"
}

function App() {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem('garlicLevel')
    return saved ? parseInt(saved) : 50
  })

  const [ready, setReady] = useState(false)

  useEffect(() => {
    localStorage.setItem('garlicLevel', value)
  }, [value])

  return (
    <div className="container">
      <h1>l’aillomètrre d’Antrain</h1>
      <div className="face">{getFace(value)}</div>
      <div className="label">{getLabel(value)}</div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <button onClick={() => setReady(true)}>l’aillomètre est en place</button>
      {ready && <div className="ready-message">L’aillomètre est actif ! 🌱</div>}
    </div>
  )
}

export default App
