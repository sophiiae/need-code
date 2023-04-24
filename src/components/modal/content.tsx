import { Box } from '@mui/system'
import parse from 'html-react-parser'

export const Content = ({ DOMString }: any) => {
  if (!DOMString) return <></>

  return (
    <Box
      className='question-content'
      sx={{ p: 2, fontSize: '1rem' }}>
      {parse(DOMString)}
    </Box>
  )
}
