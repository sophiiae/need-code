import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

import { Order } from '../../store/tools'
import { ProblemModel } from '../../store/interfaces'

interface TableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ProblemModel) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface HeadCell {
  id: keyof ProblemModel
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    label: '#',
  },
  {
    id: 'title',
    numeric: true,
    label: 'Title',
  },
  {
    id: 'difficulty',
    numeric: true,
    label: 'Difficulty',
  },
  {
    id: 'paidOnly',
    numeric: true,
    label: 'Paid',
  },
  {
    id: 'lastSubmit',
    numeric: true,
    label: 'Last Submit',
  },
]

export const ProbTableHead = (props: TableHeadProps) => {
  const { order, orderBy, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof ProblemModel) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ paddingLeft: '30px' }}>Status</TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align='left'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box
                  component='span'
                  sx={visuallyHidden}
                >
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
