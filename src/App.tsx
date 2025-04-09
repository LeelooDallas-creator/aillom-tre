import { useState, useEffect, ChangeEvent } from 'react'
import './App.css'

const getFace = (value: number): string => {
  if (value < 30) return "😊"
  if (value < 70) return "😐"
  return "😭"
}

const getLabel = (value: number): string => {
  if (value < 30) return "ça vail bien"
  if (value < 70) return "c'aillé !"
  return "ail ail ail"
}

const getColor = (value: number): string => {
  if (value < 30) return '#4da6ff' // bleu
  if (value < 70) return '#ffc107' // jaune
  return '#ff4d4d' // rouge
}

function App() {
  const [value, setValue] = useState<number>(() => {
    const saved = localStorage.getItem('garlicLevel')
    return saved ? parseInt(saved) : 50
  })

  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    localStorage.setItem('garlicLevel', value.toString())

    const percent = value
    const color = getColor(value)
    const gradient = `linear-gradient(to right, ${color} ${percent}%, #e0e0e0 ${percent}%)`

    // Mise à jour dynamique du style de la jauge
    document.documentElement.style.setProperty('--garlic-color', color)
    document.documentElement.style.setProperty('--slider-bg', gradient)
  }, [value])

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }

  return (
    <div className="container">
      <h1>l’aillomètre d’Antrain</h1>

      <div className="gauge-container">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleSliderChange}
          className="horizontal-slider"
        />

        <div className="face">{getFace(value)}</div>

        <div className="label">{getLabel(value)}</div>
      </div>

      <button onClick={() => setReady(true)}>l’aillomètre est en place</button>

      {ready && <div className="ready-message">L’aillomètre est actif ! 🌱</div>}
    </div>
  )
}

export default App
