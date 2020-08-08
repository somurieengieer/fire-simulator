import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {PhaseData, PhasesTable} from "./Phase";
import {useDispatch} from "react-redux";
import {FirePattern, updatePhases} from "../../features/fire/fireSlice";
import {Button, Grid, Typography} from "@material-ui/core";
import {CompoundInterestTableByAge} from "./CompoundInterestTable";
import {JustifyCenterBox} from "../atoms/JustifyCenterBox";
import {
  initialPhasesOfNormalSalaryMan,
  initialPhasesOfNormalSalaryMan3percent,
  initialPhasesOfSolidMan
} from "../../features/fire/fireInitialData";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});

interface FirePatternPaperProps {
  firePattern: FirePattern,
}

// 複利計算ページ
export function FirePatternPaper({firePattern}: FirePatternPaperProps) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const patternNumber = firePattern.patternNumber
  const phases = firePattern.phases
  const compoundInterestResult = firePattern.compoundInterestResult
  const hasError = firePattern.hasError

  const updateByTemplate = (phaseData: PhaseData[]) => (
    dispatch(updatePhases({
    patternNumber: firePattern.patternNumber,
    phases: phaseData,
    }))
  )

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Button variant="contained" color="primary"
                  onClick={() => {updateByTemplate(initialPhasesOfNormalSalaryMan())}}>
            テンプレート（平均的サラリーマン）
          </Button>
          <Button variant="contained" color="primary"
                  onClick={() => updateByTemplate(initialPhasesOfNormalSalaryMan3percent())}>
            テンプレート（平均的サラリーマン3%運用）
          </Button>
          <Button variant="contained" color="primary"
                  onClick={() => updateByTemplate(initialPhasesOfSolidMan())}>
            テンプレート（堅実FIRE）
          </Button>
          {hasError && (<Typography>エラーあり！</Typography>)}
          <PhasesTable firePattern={firePattern} />
        </Grid>
        <Grid item xs={3}>
          {compoundInterestResult && (
            <JustifyCenterBox width={'250px'}>
              <CompoundInterestTableByAge result={compoundInterestResult}
                                          startAge={phases[0].ageAtStart || 0}
              />
            </JustifyCenterBox>
          )}
        </Grid>
      </Grid>
    </>
  );
}

