import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { ProblemModel } from '../../store/interfaces'
import { ProblemTable, LoadingCircle } from '../index'

export interface TableWrapperProps {
  problems: ProblemModel[]
}

export const TableWrapper = ({ problems }: TableWrapperProps) => {
  return (
    <>
      {problems.length
        ? <ProblemTable problems={problems} />
        : <LoadingCircle />}
    </>
  )
}