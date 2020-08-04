import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Phase, PhaseClass, PhaseData} from "../molecules/Phase";
import {useDispatch, useSelector} from "react-redux";
import {selectPhases, updatePhases} from "../../features/fire/fireSlice";

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

  const updatePhase = (index: number) =>
    (updatedPhase: PhaseData): void => {

      const newPhases = JSON.parse(JSON.stringify(selectedPhases))
      newPhases[index] = updatedPhase
      dispatch(updatePhases(newPhases))
    }

  return (
    <>
      {selectedPhases.map((phase: PhaseData, i: number) => (
        <Phase data={new PhaseClass(phase)}
               setData={updatePhase(i)}
        />
        ))}
    </>
  );
}

