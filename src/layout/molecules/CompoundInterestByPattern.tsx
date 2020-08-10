import React, {useState} from 'react';
import {FirePattern} from "../../features/fire/fireSlice";
import {CompoundInterestAreaChartNearPercent} from "../atoms/CompoundInterestAreaChartNearPercent";
import {Grid, Input, Slider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import OpenWithIcon from '@material-ui/icons/OpenWith';

const useStyles = makeStyles({
  root: {},
  sliderRoot: {
    width: 400,
  },
  input: {
    width: 60,
    // width: 42,
  },
});

interface Props {
  firePattern: FirePattern,
}

// 近辺%エリアチャート
export function CompoundInterestByPattern({firePattern}: Props) {

  const classes = useStyles()
  const [nearPercent, setNearPercent] = useState<number>(1.0)

  return (
    <>
      <CompoundInterestAreaChartNearPercent
        firePattern={firePattern}
        nearPercent={nearPercent} />

      <Grid container spacing={2} alignItems="center"
            className={classes.sliderRoot}
            component="span"
      >
        <Grid item component="span">
          <OpenWithIcon />
        </Grid>
        <Grid item component="span">
          変動リスク
        </Grid>
        <Grid item xs component="span">
          <Slider
            value={nearPercent}
            onChange={(e, newValue) => setNearPercent(newValue as number)}
            aria-labelledby="input-slider"
            color="secondary"
            min={0}
            max={5.0}
            step={0.1}
          />
        </Grid>
        <Grid item component="span">
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
              'aria-labelledby': 'input-slider',
            }}
            endAdornment={"％"}
          />
        </Grid>
      </Grid>
    </>
  );
}

