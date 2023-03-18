import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { MenuBar, TableWrapper, LoginForm, Home } from './components/index'
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
            state.isUserActive ? <Home /> : <Navigate to='/login' replace />
          } />
          <Route path='/home' element={<Navigate to='/' replace />} />
          <Route path='/problems' element={
            state.isUserActive ? <TableWrapper /> : <Navigate to='/login' replace />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
