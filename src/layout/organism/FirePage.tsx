import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Phase, PhaseClass, PhaseData} from "../molecules/Phase";
import {useDispatch, useSelector} from "react-redux";
import {selectCompoundInterestResult, selectPhases, updatePhases} from "../../features/fire/fireSlice";
import {Grid} from "@material-ui/core";
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

  const updatePhase = (index: number) =>
    (updatedPhase: PhaseData): void => {

      const newPhases = JSON.parse(JSON.stringify(selectedPhases))
      newPhases[index] = updatedPhase
      dispatch(updatePhases(newPhases))
    }


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
      {selectedPhases.map((phase: PhaseData, i: number) => (
        <Phase data={new PhaseClass(phase)}
               setData={updatePhase(i)}
        />
        ))}
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

