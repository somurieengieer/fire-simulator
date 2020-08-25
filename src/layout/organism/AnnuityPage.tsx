import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {JustifyCenterBox} from "../atoms/JustifyCenterBox";
import {AnnuitySet, selectAnnuity} from "../../features/annuity/annuitySlice";
import {AnnuityTable} from "../molecules/AnnuityTable";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});

export function AnnuityPage() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedAnnuity: AnnuitySet[] = useSelector(selectAnnuity)

  return (
    <>
      <JustifyCenterBox>
        {selectedAnnuity && selectedAnnuity.map((annuitySet: AnnuitySet) => (
          <AnnuityTable annuity={annuitySet} />
          ))}
      </JustifyCenterBox>
    </>
  );
}

