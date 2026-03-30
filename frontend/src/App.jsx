import { useState } from 'react'
import './App.css'
import { Header } from './Components/Header'
import { Footer } from './Components/Footer'
import { Card } from './Components/Card'
import { JournalInput } from './Components/JournalInput'
import { Dashboard } from './Components/Dashboard'
import { Navigate, Route, Routes } from 'react-router-dom'
import { FullEntry } from './Components/FullEntry'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <main className='grow w-full'>
          <Routes>
            <Route path='/' element={ <Navigate to={"/dashboard"} /> } />

            <Route path='/dashboard' element={ <Dashboard /> } />

            <Route path='/entry/:id' element={ <FullEntry /> } />
          </Routes>
        </main>
      </div>
      <Footer />

      {/* <div className='min-h-screen flex flex-col justify-center items-center'>
        
        <main className='grow w-full'>
          <Dashboard />
        </main>
        
      </div> */}
    </>
  )
}

export default App
