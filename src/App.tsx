import { useEffect, useState } from 'react'
import { ProblemModel } from './store/interfaces'
import { MenuBar, TableWrapper } from './components/index'
import { useAppSelector } from './redux'
import { Routes, Route, Outlet, Link } from "react-router-dom"

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
      <Routes>
        <Route path='/' element={<>home</>} />
        <Route path='/problems' element={<TableWrapper problems={data} />} />

      </Routes>
      <button style={{ width: '80px' }} onClick={handleClick}>TEST</button>
      {linkTo}
    </div>
  );
}

export default App;
