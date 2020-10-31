import React, { useState } from 'react'
import { FirePattern } from '../../features/fire/fireSlice'
import { CompoundInterestAreaChartNearPercent } from '../atoms/CompoundInterestAreaChartNearPercent'
import { Box, Grid, Input, Slider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import { theme } from '../materialui/theme'

const useStyles = makeStyles({
  root: {
    width: 500,
    [theme.breakpoints.down('sm')]: {
      width: 340
    }
  },
  sliderRoot: {
    marginLeft: 40,
    width: 450,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: 340
    }
  },
  input: {
    width: 60
  }
})

interface Props {
  firePattern: FirePattern,
}

// 近辺%エリアチャート
export function CompoundInterestByPattern ({ firePattern }: Props) {
  const classes = useStyles()
  const [nearPercent, setNearPercent] = useState<number>(1.0)

  return (
    <Box className={classes.root}>
      <CompoundInterestAreaChartNearPercent
        firePattern={firePattern}
        nearPercent={nearPercent}/>

      <Grid container={true} spacing={2} alignItems="center"
        className={classes.sliderRoot}
        component="div"
      >
        <Grid item={true} component="span">
          <EqualizerIcon/>
        </Grid>
        <Grid item={true} component="span">
          利回り変動率
        </Grid>
        <Grid item={true} xs={true} component="span">
          <Slider
            value={nearPercent}
            onChange={(e, newValue) => setNearPercent(newValue as number)}
            aria-labelledby="input-slider"
            color="secondary"
            min={0}
            max={3.0}
            step={0.1}
          />
        </Grid>
        <Grid item={true} component="span">
          <Input
            className={classes.input}
            value={nearPercent.toFixed(1)}
            margin="dense"
            disabled={true}
            inputProps={{
              step: 0.1,
              min: 0,
              max: 5,
              type: 'number',
              'aria-labelledby': 'input-slider'
            }}
            endAdornment={'％'}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
