import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {PhasesTable} from "../molecules/Phase";
import {useDispatch, useSelector} from "react-redux";
import {selectCompoundInterestResult, selectHasError, selectPhases, updatePhases} from "../../features/fire/fireSlice";
import {Button, Grid, Typography} from "@material-ui/core";
import {CompoundInterestTableByAge} from "../molecules/CompoundInterestTable";
import {JustifyCenterBox} from "../atoms/JustifyCenterBox";
import {
  initialStateOfNormalSalaryMan,
  initialStateOfNormalSalaryMan3percent
} from "../../features/fire/fireInitialData";

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
          <Button variant="contained" color="primary"
                  onClick={() => {dispatch(updatePhases(initialStateOfNormalSalaryMan()))}}>
            テンプレート（平均的サラリーマン）
          </Button>
          <Button variant="contained" color="primary"
                  onClick={() => dispatch(updatePhases(initialStateOfNormalSalaryMan3percent()))}>
            テンプレート（平均的サラリーマン3%運用）
          </Button>
          {selectedHasError && (<Typography>エラーあり！</Typography>)}
          <PhasesTable />
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

