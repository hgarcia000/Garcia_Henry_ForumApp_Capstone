import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Signup from './components/SignUp'
import Login from './components/Login'
import Profile from './components/Profile'
import Post from './components/Post'
import { UserContext } from './UserContext.js'
import LogOut from './components/LogOut.jsx'
import CreatePost from './components/CreatePost.jsx'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user/:username' element={<Profile />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/logout' element={<LogOut />} />
        <Route path='/createPost' element={<CreatePost />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
