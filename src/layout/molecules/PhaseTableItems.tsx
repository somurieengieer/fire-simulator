import React, {useState} from 'react';
import {TableCell, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {theme} from "../materialui/theme";
import {PhaseClass, PhaseData} from "../../features/fire/Phase";
import {FirePattern, selectFirePatterns, selectPatternNumbers, updatePhases} from "../../features/fire/fireSlice";
import {useDispatch, useSelector} from "react-redux";
import {
  initialPhasesOfNormalSalaryMan,
  initialPhasesOfNormalSalaryMan3percent,
  initialPhasesOfSolidMan
} from "../../features/fire/fireInitialData";
import {numberFromHalfWidthToFullWidth} from "../../features/utils/Utils";
import ConfirmDialog from "../../features/utils/ConfirmDialog";

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
  const selectedPatternNumbers = useSelector(selectPatternNumbers)
  const selectedFirePatterns = useSelector(selectFirePatterns)
  const [copiedPatternNumber, setCopiedPatternNumber] = useState<undefined | number>(undefined)
  const [copiedTemplateNumber, setCopiedTemplateNumber] = useState<undefined | number>(undefined)

  const title = (): string => {
    return 'パターン' + numberFromHalfWidthToFullWidth(firePattern.patternNumber)
  }

  // const updateByTemplate = (optionsIndex: number) => {
  //   if (Number(optionsIndex) == -1) return
  //   const phaseData = options[optionsIndex].createPhaseData()
  //   dispatch(updatePhases({
  //     patternNumber: firePattern.patternNumber,
  //     phases: phaseData,
  //   }))
  // }

  const execCopyByPattern = () => {
    if (copiedPatternNumber) {
      const newPhases: PhaseData[] = JSON.parse(JSON.stringify(selectedFirePatterns[copiedPatternNumber - 1].phases))
      dispatch(updatePhases({
        patternNumber: firePattern.patternNumber,
        phases: newPhases,
      }))
    }
  }

  const execCopyByTemplate = () => {
    if (!copiedTemplateNumber) return
    // @ts-ignore // 0の場合はcreatePhaseDataがないが、その場合は↑でreturnする
    const phaseData = options[copiedTemplateNumber].createPhaseData()
    dispatch(updatePhases({
      patternNumber: firePattern.patternNumber,
      phases: phaseData,
    }))
  }

  const options = [
    {label: '▼テンプレートを選択'},
    {label: '平均的サラリーマン', createPhaseData: initialPhasesOfNormalSalaryMan},
    {label: '平均的サラリーマン3%運用', createPhaseData: initialPhasesOfNormalSalaryMan3percent},
    {label: '堅実FIRE', createPhaseData: initialPhasesOfSolidMan},
  ]

  return (
    <TableHead>
      <TableRow className={classes.tableHeadRow}>
        <TableCell colSpan={colSpan}>{title()}&nbsp;
          <select onChange={v => setCopiedTemplateNumber(Number(v.target.value))}
                  value={copiedTemplateNumber}
                  style={{height: '2em'}}>
            {options.map((o, i) => (
              <option value={i}>{o.label}</option>
            ))}
          </select>
          {Boolean(copiedTemplateNumber) && (
            <ConfirmDialog message={'入力されている値が上書きされますがよろしいですか'}
                           openFlag={copiedTemplateNumber !== 0}
                           closeFlag={() => setCopiedTemplateNumber(undefined)}
                           callBackWhenYes={execCopyByTemplate}
                           callBackWhenNo={() => setCopiedTemplateNumber(0)}
            />
          )}
          {selectedPatternNumbers?.filter((i: number) => i !== firePattern.patternNumber).map((i: number) => (
            <button onClick={() => setCopiedPatternNumber(i)}>パターン{numberFromHalfWidthToFullWidth(i)}からコピー</button>
          ))}
          {copiedPatternNumber && (
            <ConfirmDialog message={'入力されている値が上書きされますがよろしいですか'}
                           openFlag={Boolean(copiedPatternNumber)}
                           closeFlag={() => setCopiedPatternNumber(undefined)}
                           callBackWhenYes={execCopyByPattern} />
          )}
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
