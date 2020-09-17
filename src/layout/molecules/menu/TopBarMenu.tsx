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
import { myUrl } from '../../Urls'

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

  const title = () => {
    const startWith = (str: string): boolean => {
      return location.pathname.startsWith(str)
    }

    return [
      [myUrl.tax, '税金計算'],
      [myUrl.annuity, '年金計算'],
      [myUrl.blogList, 'ブログ'],
      [myUrl.top, 'FIREシミュレーター']
    ].find(ary => startWith(ary[0]))?.[1]
  }

  const isPhoneMode = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classNames(classes.title, { [classes.center]: isPhoneMode })}>
            堅実にFIREを実現する&nbsp;
            {isPhoneMode && (<br/>)}
            - {title()} -
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
