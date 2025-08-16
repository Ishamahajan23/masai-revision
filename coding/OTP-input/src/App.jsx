import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OtpInput from './components/OtpInput'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <OtpInput/>
    </>
  )
}

export default App
