import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

interface CardTemplateProps {
  titleIcon?: JSX.Element,
  title: string,
  content: JSX.Element,
  rightButtonLabel: string,
  rightButtonClickHandle: () => void,
  leftButtonLabel?: string,
  leftButtonClickHandle?: () => void,
}

export const CardTemplate = ({
  titleIcon,
  title,
  content,
  rightButtonLabel,
  rightButtonClickHandle,
  leftButtonLabel,
  leftButtonClickHandle
}: CardTemplateProps) => {
  return (
    <Card sx={{ ml: 2, mb: 2, minWidth: 340, minHeight: 200, boxShadow: 'rgba(0, 0, 0, 0.04) 0px 2px 6px, rgba(0, 0, 0, 0.02) 0px 4px 8px, rgba(0, 0, 0, 0.02) 0px 6px 12px' }}>
      <Typography sx={{ mt: 2, ml: 2, fontWeight: 600 }}>
        {titleIcon ? titleIcon : null}
        {title}
      </Typography>
      <CardContent>
        {content}
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: leftButtonLabel ? 'space-between' : 'flex-end'
        }}>
        {leftButtonLabel ? <Button
          variant="outlined"
          color='success'
          sx={{ m: 1 }}
          onClick={leftButtonClickHandle}>
          {leftButtonLabel}
        </Button> : null}
        {rightButtonLabel ? <Button
          variant="contained"
          color='primary'
          sx={{ m: 1 }}
          onClick={rightButtonClickHandle}>
          {rightButtonLabel}
        </Button> : null}
      </CardActions>
    </Card>
  )
}
