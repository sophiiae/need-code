import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { ProblemModel } from '../../store/interfaces'
import { ProblemTable, LoadingCircle } from '../index'
import { AuthContext } from '../../context/authContext'
import { getData } from '../../firebase/useDatabase'

export interface TableWrapperProps {
  problems: ProblemModel[]
}

export const TableWrapper = () => {
  const [ data, setData ] = useState<ProblemModel[]>([])
  const { state } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async() => {
      const d = await getData(state.user.uid)
      setData(Object.values(d.problems))
    }
    if (!data.length) {
      fetchData()
    }
  }, [])
  
  return (
    <>
      {data.length
        ? <ProblemTable problems={data}/>
        : <LoadingCircle />}
    </>
  )
}
