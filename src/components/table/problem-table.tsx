import { useState, MouseEvent } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { ProblemModel } from '../../store/interfaces'
import { getComparator, stableSort, Order } from '../../store/tools'
import { Modal, ProbTableHead } from '../index'
import { useAppDispatch } from '../../redux/hooks'
import { openModal } from '../../redux/features/modalSlice'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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

export interface TableProps {
  problems: ProblemModel[]
}

export const ProblemTable = ({ problems }: TableProps) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof ProblemModel>('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const dispatch = useAppDispatch()

  if (!problems) return <></>

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof ProblemModel) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - problems.length) : 0

  return (
    <Paper sx={{ m: 2, width: '100%', mt: 1 }}>
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
            rowCount={problems.length}
          />
          <TableBody>
            {stableSort(problems, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 50, 100]}
        component='div'
        count={problems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton showLastButton
      />
    </Paper>
  )
}