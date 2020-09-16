import React from 'react'
import { Avatar, Box, Card, CardContent, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { JustifyCenterBox } from '../JustifyCenterBox'
import ProfileImage from '../../../composedImages/profile.jpg'

const useStyles = makeStyles(theme => createStyles({
  root: {
    width: '100%',
    marginBottom: 10
  },
  icon: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}))

export function Profile () {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <JustifyCenterBox>
          <Avatar alt="Hot Spring" src={ProfileImage}
            className={classes.icon} />
        </JustifyCenterBox>
        <Box>
          <Typography variant='body1'>
        堅実なFIREを実現するツールを作成しているフリーエンジニアです。個人事業主→法人化検討中。<br />
        安心・安全なFIREをサポートするためのFIREシミュレーター公開中です！
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
