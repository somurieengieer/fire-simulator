import React from 'react';
import {TableCell, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {theme} from "../materialui/theme";
import {PhaseClass} from "./Phase";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
  tableCellLabel: {
    minWidth: 200,
    backgroundColor: theme.palette.primary.main,
  },
  tableCell: {
    minWidth: 200,
  },
  tableHeadRow: {
    backgroundColor: theme.palette.secondary.main,
  }
});

export function TableHeaderSet({title, colSpan}
: {title: string, colSpan: number}) {
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow className={classes.tableHeadRow}>
        <TableCell colSpan={colSpan}>{title}</TableCell>
      </TableRow>
    </TableHead>
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
