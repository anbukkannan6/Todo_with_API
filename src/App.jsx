import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoComp from './components/TodoComp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToDoComp />
    </>
  )
}

export default App
