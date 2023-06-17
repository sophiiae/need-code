import TextField from '@mui/material/TextField/TextField'
import { ErrorText } from '../index'

export interface TextInputFieldProp {
  label: string,
  handleChange: (v: string) => void,
  error?: string
}

export const TextInputField = ({ label, handleChange, error }: TextInputFieldProp) => {
  return (
    <div>
      <TextField
        required
        id={label.toLowerCase()}
        key={label}
        label={label}
        variant='outlined'
        type='text'
        fullWidth
        onChange={e => handleChange(e.target.value)}
      />
      <ErrorText message={error ? error: ''} />
    </div>
  )
}