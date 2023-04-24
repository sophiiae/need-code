import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

interface CardTemplateProps {
  titleIcon?: JSX.Element,
  title: string,
  children: any
}

export const CardTemplate = ({
  titleIcon,
  title,
  children
}: CardTemplateProps) => {
  return (
    <Card sx={{ ml: 2, mb: 2, minWidth: 340, minHeight: 200, boxShadow: 'rgba(0, 0, 0, 0.04) 0px 2px 6px, rgba(0, 0, 0, 0.02) 0px 4px 8px, rgba(0, 0, 0, 0.02) 0px 6px 12px' }}>
      <Typography sx={{ mt: 2, ml: 2, fontWeight: 600 }}>
        {titleIcon ? titleIcon : null}
        {title}
      </Typography>
      {children}
    </Card>
  )
}
