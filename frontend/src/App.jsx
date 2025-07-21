import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Signup from './components/SignUp'
import Login from './components/Login'
import Profile from './components/Profile'
import Post from './components/Post'
import { UserContext } from './UserContext.js'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/post/:id' element={<Post />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
