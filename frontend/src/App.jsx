import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Card } from './Components/Card'
import { JournalInput } from './Components/JournalInput'
import { Dashboard } from './Components/Dashboard'
import { Navigate, Route, Routes } from 'react-router-dom'
import { FullEntry } from './Components/FullEntry'
import { EditEntry } from './Components/EditEntry'
import { Login } from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <main className='grow w-full'>
          <Routes>
            <Route 
              path='/' 
              element={ 
              token ? <Dashboard /> : <Navigate to={"/dashboard"} /> 
              } 
            />
            
            <Route 
            path='/login' 
            element={token ? <Navigate to="/" /> :  <Login /> } 
            />

            <Route 
            path='/register' 
            element={token ? <Navigate to="/" /> :  <Register /> } 
            />

            <Route path='/dashboard' element={ <Dashboard /> } />

            <Route path='/entry/:id' element={ <FullEntry /> } />

            <Route path='/entry/:id/edit' element={ <EditEntry />} />
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
