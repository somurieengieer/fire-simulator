import React from 'react';
import {TableCell, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {theme} from "../materialui/theme";
import {PhaseClass, PhaseData} from "../../features/fire/Phase";
import {FirePattern, selectFirePatterns, selectPatternNumbers, updatePhases} from "../../features/fire/fireSlice";
import {useDispatch, useSelector} from "react-redux";
import {PhasesTemplate, phasesTemplates} from "../../features/fire/fireInitialData";
import {numberFromHalfWidthToFullWidth} from "../../features/utils/Utils";

export const usePatternTableStyles = makeStyles({
  table: {
    // width: 650,
  },
  tableCellLabel: {
    // minWidth: 120,
    width: 120,
    minWidth: 120,
    backgroundColor: theme.palette.secondary.light,
  },
  tableCell: {
    minWidth: 140,
  },
  tableHeadRow: {
    backgroundColor: theme.palette.secondary.main,
  },
  linkCell: {
    '&:hover': {
      cursor: 'pointer',
    },
  }
});

interface TablePatternHeaderSetProps {
  firePattern: FirePattern,
  colSpan: number,
}

export function TablePatternHeaderSet({firePattern, colSpan}: TablePatternHeaderSetProps) {
  const classes = usePatternTableStyles();

  const dispatch = useDispatch();
  const selectedPatternNumbers = useSelector(selectPatternNumbers)
  const selectedFirePatterns = useSelector(selectFirePatterns)

  const title = (): string => {
    return 'パターン' + numberFromHalfWidthToFullWidth(firePattern.patternNumber)
  }

  const copyPatternByPatternNumber = (patternNumber: number) => {
     const newPhases: PhaseData[] = JSON.parse(JSON.stringify(selectedFirePatterns[patternNumber - 1].phases))
     dispatch(updatePhases({
       patternNumber: firePattern.patternNumber,
       phases: newPhases,
     }))
  }

  const copyPatternByTemplateNumber = (templateIndex: number) => {
    // @ts-ignore // 0の場合はcreatePhaseDataがないが、その場合は↑でreturnする
    const phaseData = templateOptions()[templateIndex].createPhaseData()
    dispatch(updatePhases({
      patternNumber: firePattern.patternNumber,
      phases: phaseData,
    }))
  }

  const templateOptions = (): PhasesTemplate[] => {
    return [
      // @ts-ignore
      {label: '▼テンプレートを選択'},
      ...phasesTemplates
    ]
  }

  return (
    <TableHead>
      <TableRow className={classes.tableHeadRow}>
        <TableCell colSpan={colSpan}>{title()}&nbsp;
          <select onChange={v => copyPatternByTemplateNumber(Number(v.target.value))}
                  style={{height: '2em'}}>
            {templateOptions().map((o, i) => (
              <option value={i}>{o.label}</option>
            ))}
          </select>
          {selectedPatternNumbers?.filter((i: number) => i !== firePattern.patternNumber).map((i: number) => (
            <button onClick={() => copyPatternByPatternNumber(i)}>パターン{numberFromHalfWidthToFullWidth(i)}からコピー</button>
          ))}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export function SubHeaderRowSet({title, colSpan}
: {title: string, colSpan: number}) {
  const classes = usePatternTableStyles();
  return (
    <TableRow className={classes.tableHeadRow}>
      <TableCell colSpan={colSpan}>{title}</TableCell>
    </TableRow>
  )
}

export function TableRowSet({rowLabel, phaseClasses, valueCallback, onChange, disabledCallback, isTypeString}
: {rowLabel: string,
  phaseClasses: PhaseClass[],
  valueCallback(phaseClass: PhaseClass): string | number,
  onChange(newValue: string, index: number): void,
  disabledCallback?(phaseClass: PhaseClass): boolean,
  isTypeString?: boolean,
}) {

  const disabled = (phaseClass: PhaseClass) => disabledCallback && disabledCallback(phaseClass)

  const showValue = (phase: PhaseClass): string | number => {
    return disabled(phase) ? Number(valueCallback(phase))?.toFixed(0) : valueCallback(phase)
  }

  const classes = usePatternTableStyles();
  return (
    <TableRow>
      <TableCell className={classes.tableCellLabel} component="th" scope="row">
        {rowLabel}
      </TableCell>
      {phaseClasses.map((phase: PhaseClass, i: number) => (
        <TableCell className={classes.tableCell} align="center">
          <input value={showValue(phase)}
                 type={isTypeString ? 'string' : 'number'}
                 onChange={v => onChange(v.target.value, i)}
                 disabled={disabled(phase)}
                 style={{width: '140px'}}
          />
        </TableCell>
      ))}
    </TableRow>
  )
}
