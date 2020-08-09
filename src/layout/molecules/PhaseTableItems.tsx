import React from 'react';
import {TableCell, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {theme} from "../materialui/theme";
import {PhaseClass} from "./Phase";
import {FirePattern, updatePhases} from "../../features/fire/fireSlice";
import {useDispatch} from "react-redux";
import {
  initialPhasesOfNormalSalaryMan,
  initialPhasesOfNormalSalaryMan3percent,
  initialPhasesOfSolidMan
} from "../../features/fire/fireInitialData";
import {numberFromHalfWidthToFullWidth} from "../../features/Utils";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
  tableCellLabel: {
    minWidth: 200,
    backgroundColor: theme.palette.secondary.light,
  },
  tableCell: {
    minWidth: 200,
  },
  tableHeadRow: {
    backgroundColor: theme.palette.secondary.main,
  }
});

interface TablePatternHeaderSetProps {
  firePattern: FirePattern,
  colSpan: number,
}

export function TablePatternHeaderSet({firePattern, colSpan}: TablePatternHeaderSetProps) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const title = (): string => {
    return 'パターン' + numberFromHalfWidthToFullWidth(firePattern.patternNumber)
  }

  const updateByTemplate = (optionsIndex: number) => {
    if (Number(optionsIndex) == -1) return
    const phaseData = options[optionsIndex].createPhaseData()
    dispatch(updatePhases({
      patternNumber: firePattern.patternNumber,
      phases: phaseData,
    }))
  }

  const options = [
    {label: '平均的サラリーマン', createPhaseData: initialPhasesOfNormalSalaryMan},
    {label: '平均的サラリーマン3%運用', createPhaseData: initialPhasesOfNormalSalaryMan3percent},
    {label: '堅実FIRE', createPhaseData: initialPhasesOfSolidMan},
  ]

  return (
    <TableHead>
      <TableRow className={classes.tableHeadRow}>
        <TableCell colSpan={colSpan}>{title()}
          <select onChange={v => updateByTemplate(Number(v.target.value))}
                  style={{height: '2em'}}>
            <option value='-1'>▼テンプレートを選択</option>
            {options.map((o, i) => (
              <option value={i}>{o.label}</option>
            ))}
          </select>
          {[1,2,3].filter(i => i !== firePattern.patternNumber).map(i => (
            <button>パターン{numberFromHalfWidthToFullWidth(i)}からコピー</button>
          ))}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export function SubHeaderRowSet({title, colSpan}
: {title: string, colSpan: number}) {
  const classes = useStyles();
  return (
    <TableRow className={classes.tableHeadRow}>
      <TableCell colSpan={colSpan}>{title}</TableCell>
    </TableRow>
  )
}

export function TableRowSet({rowLabel, phaseClasses, valueCallback, onChange, disabled, isTypeString}
: {rowLabel: string,
  phaseClasses: PhaseClass[],
  valueCallback(phaseClass: PhaseClass): string | number,
  onChange(newValue: string, index: number): void,
  disabled?(phaseClass: PhaseClass): boolean,
  isTypeString?: boolean,
}) {

  const showValue = (phase: PhaseClass): string | number => {
    return disabled ? Number(valueCallback(phase))?.toFixed(0) : valueCallback(phase)
  }

  const classes = useStyles();
  return (
    <TableRow>
      <TableCell className={classes.tableCellLabel} component="th" scope="row">
        {rowLabel}
      </TableCell>
      {phaseClasses.map((phase: PhaseClass, i: number) => (
        <TableCell className={classes.tableCell} align="right">
          <input value={showValue(phase)}
                 type={isTypeString ? 'string' : 'number'}
                 onChange={v => onChange(v.target.value, i)}
                 disabled={disabled && disabled(phase)}
          />
        </TableCell>
      ))}
    </TableRow>
  )
}
