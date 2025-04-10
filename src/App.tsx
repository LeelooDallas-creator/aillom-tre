import { useState, useEffect } from 'react'
import './App.css'
import happyGarlic from './assets/happy-garlic.webp'
import mehGarlic from './assets/meh-garlic.webp'
import cryingGarlic from './assets/crying-garlic.webp'

const getSliderClass = (value: number) => {
  if (value < 30) return 'low'
  if (value < 70) return 'mid'
  return 'high'
}


const getFaceImage = (value: number) => {
  if (value < 30) return happyGarlic
  if (value < 70) return mehGarlic
  return cryingGarlic
}

const getLabel = (value: number) => {
  if (value < 30) return 'ça vail bin'
  if (value < 70) return 'aillé !'
  return 'ail ail ail'
}

function App() {
  const [value, setValue] = useState<number>(() => {
    const saved = localStorage.getItem('garlicLevel')
    return saved ? parseInt(saved) : 50
  })

  const [ready, setReady] = useState(false)
  const [average, setAverage] = useState<number | null>(null)

  useEffect(() => {
    localStorage.setItem('garlicLevel', value.toString())
  }, [value])

  useEffect(() => {
    fetch('http://localhost:3001/average')
      .then((res) => res.json())
      .then((data) => {
        setAverage(data.average)
      })
      .catch(() => {
        console.error('Erreur lors de la récupération de la moyenne')
      })
  }, [ready])

  const handleSubmit = () => {
    fetch('http://localhost:3001/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    })
      .then((res) => res.json())
      .then(() => {
        setReady(true)
      })
      .catch(() => {
        console.error("Erreur lors de l'envoi de la valeur")
      })
  }

  return (
    <div className="container">
      <h1>l’aillomètrre d’Antrain</h1>

      <img src={getFaceImage(value)} className="garlic-face" alt="emoji d'ail" />

      <div className="label">{getLabel(value)}</div>

        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className={`slider ${getSliderClass(value)}`}
        />

      <button onClick={handleSubmit}>l’aillomètre est en place</button>

      {ready && (
        <div className="ready-message">
          L’aillomètre est actif ! 🌱<br />
          Moyenne actuelle : {average ?? '...'} / 100
        </div>
      )}
    </div>
  )
}

export default App
