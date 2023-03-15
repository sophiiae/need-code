import { useState } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { ProblemModel } from './store/interfaces'
import { MenuBar, TableWrapper, LoginForm } from './components/index'
import { useAppSelector } from './redux'
import { Routes, Route, Navigate } from "react-router-dom"

import './App.css'

import { problems } from './assets/problems'

function App() {
  const [data, setData] = useState<ProblemModel[]>(problems)
  const { linkTo } = useAppSelector(state => state.content)

  const handleClick = () => {
    // const map: any = {}
    // problems.forEach(prob => {
    //   const key = parseKeyToString(prob.id)
    //   map[key] = prob
    // })

    // console.log(Object.keys(map).length)
    console.log(linkTo)
  }

  return (
    <div className='App'>
      <MenuBar />
      <Box component="main" sx={{ p: 3, margin: 'auto' }}>
        <Toolbar />
        <Routes>
          <Route path='/' element={<div>top line</div>} />
          <Route path='/home' element={<Navigate to='/' replace />} />
          <Route path='/problems' element={<TableWrapper problems={data} />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
