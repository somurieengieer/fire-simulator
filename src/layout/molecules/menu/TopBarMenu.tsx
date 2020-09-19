import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useLocation } from 'react-router'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { theme } from '../../materialui/theme'
import classNames from 'classnames'
import MenuButtons from './MenuButtons'
import { rootUrlTitleByUrl } from '../../Urls'
import { NonDecoratedLink } from '../../atoms/NonDecoratedLink'
import { Box } from '@material-ui/core'
import topImage from '../../../image/top_image.jpg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      minWidth: 375,
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    },
    center: {
      textAlign: 'center'
    },
    imageBox: {
      position: 'relative',
      margin: 0,
      overflow: 'hidden',
      width: '100%',
      height: 300,
      backgroundImage: 'url("/image/top_image.jpg")',
      backgroundAttachment: 'fixed',
      backgroundSize: '100%'
    },
    image: {
      width: '100%'
    },
    imageText: {
      position: 'absolute',
      bottom: 0,
      left: 20,
      color: theme.palette.common.white,
      opacity: 0.8
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.5)
      }
    }
  })
)

interface Props {
  children: React.ReactNode;
}

export default function TopBarMenu ({ children }: Props) {
  const classes = useStyles()

  const location = useLocation()

  const title = () =>
    rootUrlTitleByUrl(location.pathname).title

  const rootUrl = () =>
    rootUrlTitleByUrl(location.pathname).rootUrl

  const isPhoneMode = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classNames(classes.title, { [classes.center]: isPhoneMode })}>
            <NonDecoratedLink to={rootUrl()}>
              堅実にFIREを実現する&nbsp;
              {isPhoneMode && (<br/>)}
              - {title()} -
            </NonDecoratedLink>
          </Typography>
          <MenuButtons/>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  )
}
