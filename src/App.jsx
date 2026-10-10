import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [numero1, setNumero1] = useState(0)
  const [numero2, setNumero2] = useState(0)
  const [resultadoSuma, setResultadoSuma] = useState(0)

  function sumar() {
    setResultadoSuma(Number(numero1) + Number(numero2))
  }

  return (

  /*  <>
      <input type="number" onChange={(e) => setNumero2(e.target.value)} />
      <p>Número: {numero2}</p>
      <input type="number" onChange={(e) => setNumero1(e.target.value)} />
      <p>Número: {numero1}</p>
      <button onClick={() => setNumero3(parseInt(numero1) + parseInt(numero2))}>Sumar</button>
      <p>Resultado: {numero3}</p>

    </> */

    <>
      <input type="number" onChange={(e) => setNumero1(e.target.value)} />
      <input type="number" onChange={(e) => setNumero2(e.target.value)} />
      <button onClick={sumar}>Sumar</button>
      <p>Resultado: {resultadoSuma}</p>
    </>
  )
}

export default App
