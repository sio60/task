import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


  useEffect(() => {
    fetch('http://localhost:8080/api/count')
      .then(res => res.json())
      .then(data => setCount(data))
      .catch(err => console.error("초기 값 에러:", err))
  }, [])

  const increment = () => {
    fetch('http://localhost:8080/api/count/increment', { method: 'POST' })
      .then(res => res.json())
      .then(data => setCount(data))
      .catch(err => console.error("증가 에러:", err))
  }

  const decrement = () => {
    fetch('http://localhost:8080/api/count/decrement', { method: 'POST' })
      .then(res => res.json())
      .then(data => setCount(data))
      .catch(err => console.error("감소 에러:", err))
  }

  return (
    <div className="App">
      <div className="card">
        <button onClick={decrement}> - </button>
        <div>
          Count: <strong>{count}</strong>
        </div>
        <button onClick={increment}> + </button>
      </div>
    </div>
  )
}

export default App
