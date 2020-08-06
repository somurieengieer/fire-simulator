import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {PhasesTable} from "../molecules/Phase";
import {useDispatch, useSelector} from "react-redux";
import {addPhase, selectCompoundInterestResult, selectHasError, selectPhases} from "../../features/fire/fireSlice";
import {Button, Grid, Typography} from "@material-ui/core";
import {CompoundInterestTableByAge} from "../molecules/CompoundInterestTable";
import {JustifyCenterBox} from "../atoms/JustifyCenterBox";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});



// 複利計算ページ
export function FirePage() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedPhases = useSelector(selectPhases)
  const selectedCompoundInterestResult= useSelector(selectCompoundInterestResult)
  const selectedHasError = useSelector(selectHasError)

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          {selectedHasError && (<Typography>エラーあり！</Typography>)}
          <PhasesTable />
          <Button variant="contained" color="primary" onClick={() => dispatch(addPhase())}>
            フェーズを追加
          </Button>
        </Grid>
        <Grid item xs={3}>
          {selectedCompoundInterestResult && (
            <JustifyCenterBox width={'250px'}>
              <CompoundInterestTableByAge result={selectedCompoundInterestResult}
                                          startAge={selectedPhases[0].ageAtStart}
              />
            </JustifyCenterBox>
          )}
        </Grid>
      </Grid>
    </>
  );
}

