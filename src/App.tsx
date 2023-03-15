import { useEffect, useState } from 'react'
import { ProblemModel } from './store/interfaces'
import { MenuBar, TableWrapper } from './components/index'
import { useAppSelector } from './redux'

import './App.css'

function App() {
  const [data, setData] = useState<ProblemModel[]>([])
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
      <TableWrapper problems={data} />
      <button style={{ width: '80px' }} onClick={handleClick}>TEST</button>
    </div>
  );
}

export default App;
