import { Box } from '@mui/system'
import parse from 'html-react-parser'

export const Content = ({ data }: any) => {
  if (!data.content) return <></>

  return (
    <Box
      className='question-content'
      sx={{ p: 2, fontSize: '1rem' }}>
      {parse(data.content)}
    </Box>
  )
}
