import { useEffect, useState } from 'react'
import { ProblemModel } from './store/interfaces'
import { MenuBar, TableWrapper } from './components/index'

import './App.css'

function App() {
  const [data, setData] = useState<ProblemModel[]>([])

  const handleClick = () => {
    // const map: any = {}
    // problems.forEach(prob => {
    //   const key = parseKeyToString(prob.id)
    //   map[key] = prob
    // })

    // console.log(Object.keys(map).length)
    console.log('home')
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
