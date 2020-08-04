import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Phase, PhaseProps} from "../molecules/Phase";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});



// 複利計算ページ
export function FirePage() {

  const classes = useStyles();

  const [phaseOverviewData, setPhaseOverviewData] = useState<PhaseProps>(
    {
      ageAtStart: 32,
      ageAtEnd: 60,
      assetAtStart: 300,
      ageAtStartEditable: true,
      assetAtStartEditable: true,
    }
  )

  return (
    <>
        <Phase ageAtStart={32} ageAtEnd={60} assetAtStart={600}
               ageAtStartEditable={true}
               assetAtStartEditable={true}
        />
    </>
  );
}

