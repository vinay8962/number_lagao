import React from 'react'
import Login from './pages/Auth/Login'
import NumberVarification from './pages/Auth/NumberVarification'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Auth/Register'
import MainDashboard from './pages/Dashboard/MainDashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/numbervarification' element={<NumberVarification />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<MainDashboard />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
