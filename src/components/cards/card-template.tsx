import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

interface CardTemplateProps {
  title: string,
  content: any,
  rightButtonLabel: string,
  rightButtonClickHandle: () => void,
  leftButtonLabel?: string,
  leftButtonClickHandle?: () => void,
}

export const CardTemplate = ({
  title,
  content,
  rightButtonLabel,
  rightButtonClickHandle,
  leftButtonLabel,
  leftButtonClickHandle
}: CardTemplateProps) => {
  return (
    <Card sx={{ ml: 2, minWidth: 340, minHeight: 200 }}>
      <Typography sx={{ mt: 2, ml: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      <CardContent>
        {content}
      </CardContent>
      <CardActions
        sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {leftButtonLabel ? <Button
          variant="outlined"
          color='success'
          sx={{ m: 1 }}
          onClick={leftButtonClickHandle}>
          {leftButtonLabel}
        </Button> : null}
        <Button
          variant="contained"
          color='primary'
          sx={{ m: 1 }}
          onClick={rightButtonClickHandle}>
          {rightButtonLabel}
        </Button>
      </CardActions>
    </Card>
  )
}