import { useEffect, useState } from 'react'
import { MenuBar, TableWrapper } from './index'
import { problems } from '../assets/problems'
import { ProblemModel } from '../store/interfaces'

export const ContentWrapper = ({ linkTo }: any) => {
  const [data, setData] = useState<ProblemModel[]>(problems)

  return (
    <TableWrapper problems={data} />
  )
}
