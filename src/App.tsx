import { useState, useEffect } from 'react'
import './App.css'

import happyGarlic from './assets/happy-garlic.webp'
import mehGarlic from './assets/meh-garlic.webp'
import cryingGarlic from './assets/crying-garlic.webp'

const getGarlicImage = (value: number): string => {
  if (value < 30) return happyGarlic
  if (value < 70) return mehGarlic
  return cryingGarlic
}

const getLabel = (value: number): string => {
  if (value < 30) return "ça vail bien"
  if (value < 70) return "aillé !"
  return "ail ail ail"
}

function App() {
  const [value, setValue] = useState<number>(() => {
    const saved = localStorage.getItem('garlicLevel')
    return saved ? parseInt(saved) : 50
  })

  const [ready, setReady] = useState<boolean>(false)

  const getSliderBackground = (value: number): string => {
    let color = '#6ec2a6' // vert par défaut
    if (value >= 70) color = '#e74c3c' // rouge
    else if (value >= 30) color = '#ffc857' // jaune
  
    return `linear-gradient(to right, ${color} ${value}%, #ccc ${value}%)`
  }
  

  useEffect(() => {
    localStorage.setItem('garlicLevel', value.toString())
  }, [value])

  return (
    <div className="container">
      <h1>l’aillomètre d’Antrain</h1>

      <img
        key={getGarlicImage(value)} // ← ceci force une transition entre images
        src={getGarlicImage(value)}
        alt="gousse d'ail expressive"
        className="garlic-image"
      />

      <div className="label">{getLabel(value)}</div>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="slider"
        style={{ background: getSliderBackground(value) }}
      />
      <button onClick={() => setReady(true)}>
        l’aillomètre est en place
      </button>

      {ready && (
        <div className="ready-message">
          L’aillomètre est actif ! 🌱
        </div>
      )}
    </div>
  )
}

export default App
