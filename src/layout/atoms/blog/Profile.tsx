import React from 'react'
import { Avatar, Box, Card, CardContent, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { JustifyCenterBox } from '../JustifyCenterBox'
import ProfileImage from '../../../composedImages/profile.jpg'
import { AlignCenterBox } from '../AlignCenterBox'
import { SideBarContentGroup } from './SideBarContentGroup'

const useStyles = makeStyles(theme => createStyles({
  icon: {
    width: theme.spacing(17),
    height: theme.spacing(17)
  },
  description: {
    padding: theme.spacing(4)
  }
}))

export function Profile () {
  const classes = useStyles()
  return (
    <SideBarContentGroup>
      <Card>
        <CardContent >
          <JustifyCenterBox>
            <AlignCenterBox height={260}>
              <Avatar alt="Hot Spring" src={ProfileImage}
                className={classes.icon} />
              <a href='https://twitter.com/fire_somurie' style={{ textDecoration: 'none', color: '#000' }}>
                <Typography variant={'h6'} align={'center'}>@fire_somurie</Typography>
              </a>
            </AlignCenterBox>
          </JustifyCenterBox>
          <Box className={classes.description}>
            <Typography variant='body1'>
        堅実なFIREを実現するツールを作成しているフリーエンジニアです。個人事業主→法人化検討中。<br />
        安心・安全なFIREをサポートするためのFIREシミュレーター公開中です！
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </SideBarContentGroup>
  )
}
