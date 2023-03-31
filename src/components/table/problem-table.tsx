import { useState, MouseEvent, ChangeEvent } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { ProblemModel } from '../../store/interfaces'
import { getComparator, stableSort, Order } from '../../store/tools'
import { Modal, ProbTableHead } from '../index'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { openModal } from '../../redux/features/modalSlice'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'

export const initDate = new Date('2001-01-1')

const Difficulty: any = {
  1: { label: 'Easy', color: '#6a994e' },
  2: { label: 'Medium', color: '#ffb703' },
  3: { label: 'Hard', color: '#bc4749' },
}

const getDifficultyText = (level: number) => {
  const { label, color } = Difficulty[level]
  return <span style={{ color: color }}>{label}</span>
}

interface rowsPerPageItemType {
  label: string,
  value: number
}

const rowsPerPageItems: rowsPerPageItemType[] = [
  { label: '20/page', value: 20 },
  { label: '50/page', value: 50 },
  { label: '100/page', value: 100 },
]

export const ProblemTable = () => {
  const { problems } = useAppSelector(state => state.table)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof ProblemModel>('id')
  const [page, setPage] = useState(1) // MUI pagination is 1-indexed
  const [rowsPerPage, setRowsPerPage] = useState<number>(50)
  const dispatch = useAppDispatch()
  const problemList: ProblemModel[] = Object.values(problems)

  if (!problems) return <></>

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof ProblemModel) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRows = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value))
    setPage(1)
  }

  return (
    <Paper sx={{ m: 2, width: '100%', mt: 1, boxShadow: 'none' }}>
      <Modal />
      <TableContainer>
        <Table
          sx={{ minWidth: 820 }}
          aria-labelledby='ProblemTable'
          size={'medium'}
        >
          <ProbTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={problemList.length}
          />
          <TableBody>
            {stableSort(problemList, getComparator(order, orderBy))
              .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    role='status'
                    tabIndex={-1}
                    key={row.id}
                    className='problemRow'
                  >
                    <TableCell
                      padding='none'
                      style={{
                        width: '40px',
                        textAlign: 'center',
                        border: 'none',
                      }}
                    >
                      {row.solved ? (
                        <TaskAltIcon style={{
                          paddingTop: '4px',
                          fontSize: '1.5em',
                          color: '#55a630'
                        }} />
                      ) : ''}
                    </TableCell>

                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      align='left'
                      style={{ width: '300px', border: 'none' }}
                    >
                      <Link
                        color='inherit'
                        underline='none'
                        onClick={() => dispatch(openModal(row))}
                        sx={{
                          ":hover": { color: '#219ebc' },
                          cursor: 'pointer'
                        }}
                      >
                        {row.id}. {row.title}
                      </Link>
                      {row.paidOnly ? <LockOutlinedIcon style={{ fontSize: '0.8rem', paddingTop: '2px', color: '#fb8500', marginLeft: '4px' }} /> : ''}
                    </TableCell>

                    <TableCell
                      align='left'
                      style={{ width: '60px', border: 'none' }}
                    >
                      {getDifficultyText(row.difficulty)}
                    </TableCell>

                    <TableCell
                      align='left'
                      style={{ width: '120px', border: 'none' }}
                    >
                      {new Date(row.lastSubmit) > initDate
                        ? row.lastSubmit
                        : ''}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Select
          size='small'
          value={rowsPerPage}
          onChange={(e: any) => handleChangeRows(e)}
          displayEmpty
          inputProps={{ 'aria-label': 'Change rows per page' }}
        >
          {rowsPerPageItems.map((item: rowsPerPageItemType) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        <Pagination
          page={page}
          count={Math.ceil(problemList.length / rowsPerPage)}
          onChange={handleChangePage}
          showFirstButton
          showLastButton />
      </Box>
    </Paper>
  )
}
