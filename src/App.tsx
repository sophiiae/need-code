import { useContext } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { MenuBar, ContentWrapper, LoginForm, Footer, NotFound, Port } from './components/index'
import { Routes, Route, Navigate } from "react-router-dom"

import './App.css'

import { AuthContext } from './context/authContext'

function App() {
  const { state } = useContext(AuthContext)

  return (
    <div className='App'>
      <MenuBar />
      <Box component="main" sx={{ p: 3, margin: 'auto' }}>
        <Toolbar />
        <Routes>
          <Route path='/' element={
            state.isUserActive ? <ContentWrapper state={state} /> : <Navigate to='/login' replace />
          } />
          <Route path='/login' element={<LoginForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/port' element={<Port />} />
        </Routes>
      </Box>
      <Footer />
    </div>
  )
}

export default App
