import { useState, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import LockIcon from '@mui/icons-material/Lock'
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
import { ProbTableHead } from '../index'

export const initDate = new Date('2000-01-16')

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
    <Paper sx={{ width: '70%', mb: 2, margin: 'auto' }}>
      <TableContainer>
        <Table
          sx={{ minWidth: 920 }}
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
                      <span style={{ color: '#55a630', lineHeight: 1.43 }}>
                        {row.solved ? (
                          <TaskAltIcon style={{ paddingTop: '4px', width: '20px' }} />
                        ) : (
                          ''
                        )}
                      </span>
                    </TableCell>

                    <TableCell
                      align='left'
                      style={{ width: '40px', border: 'none' }}
                    >
                      {row.id}
                    </TableCell>

                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      align='left'
                      style={{ width: '280px', border: 'none' }}
                    >
                      <Link
                        href={row.url}
                        color='inherit'
                        underline='none'
                        target='_blank'
                        rel='noopener'
                      >
                        {row.title}
                      </Link>
                    </TableCell>

                    <TableCell
                      align='left'
                      style={{ width: '60px', border: 'none' }}
                    >
                      {getDifficultyText(row.difficulty)}
                    </TableCell>

                    <TableCell
                      padding='none'
                      align='center'
                      style={{ width: '20px', border: 'none' }}
                    >
                      <span
                        style={{
                          color: '#ffb703',
                          lineHeight: 1.43,
                          paddingRight: '30px',
                        }}
                      >
                        {row.paidOnly ? (
                          <LockIcon style={{ paddingTop: '4px', width: '20px' }} />
                        ) : (
                          ''
                        )}
                      </span>
                    </TableCell>

                    <TableCell
                      align='left'
                      style={{ width: '120px', border: 'none' }}
                    >
                      {row.lastSubmit > initDate
                        ? row.lastSubmit.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        })
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
      />
    </Paper>
  )
}