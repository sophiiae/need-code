import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { closeModal } from '../redux/features/modalSlice'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import PanToolAltIcon from '@mui/icons-material/PanToolAlt'
import { updateProblem } from '../firebase/useDatabase'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { updateSingleProblem } from '../redux/features/tableSlice'

export interface DialogTitleProps {
  label: string
  children?: React.ReactNode
  onClose: () => void
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: '14px', fontSize: '1.1rem' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export const Modal = () => {
  const dispatch = useAppDispatch()
  const { open, data } = useAppSelector(state => state.modal)
  const { state } = useContext(AuthContext)
  const { problems } = useAppSelector(state => state.table)

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleSolved = () => {
    const pid = data.id
    dispatch(updateSingleProblem(pid))
    updateProblem(state.user.uid, pid, problems[pid])
    dispatch(closeModal())
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle label="customized-dialog-title" onClose={handleClose}>
        {data.id}. {data.title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Alert severity="warning">Make sure you have solved the problem before you click the button. Otherwise, it would affect the accuracy of review stack.</Alert>
        <Typography sx={{ p: 2, paddingBottom: 0 }} >
          <Link
            href={data.url}
            color='inherit'
            underline='none'
            target='_blank'
            rel='noopener'
          >
            <Button variant="text" color="secondary">
              Question
              <PanToolAltIcon />
            </Button>
          </Link>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant='contained' onClick={handleSolved}>
          Solved!
        </Button>
      </DialogActions>
    </Dialog>
  )
}
