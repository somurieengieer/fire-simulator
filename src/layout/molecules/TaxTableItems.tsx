import React from 'react';
import {TableCell, TableHead, TableRow} from "@material-ui/core";
import {usePatternTableStyles} from "./PhaseTableItems";

export function TaxHeaderRowSet({title}
: {title: string}) {
  const classes = usePatternTableStyles();
  return (
    <TableHead>
      <TableRow className={classes.tableHeadRow}>
        <TableCell colSpan={2}>
          {title}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export function TaxSubHeaderRowSet({title}
: {title: string}) {
  const classes = usePatternTableStyles();
  return (
    <TableRow className={classes.tableHeadRow}>
      <TableCell colSpan={2}>
        {title}
      </TableCell>
    </TableRow>
  )
}

export function TaxIncomeTableRowSet({rowLabel, value, onChange, onChangeCheck, disabled}
: {rowLabel: string,
  value: string | number,
  onChange(newValue: string): void,
  onChangeCheck(newValue: boolean): void,
  disabled?: boolean,
}) {

  const showValue = (): string | number =>
    disabled ? Number(value)?.toFixed(0) : value

  const classes = usePatternTableStyles();
  return (
    <TableRow>
      <TableCell className={classes.tableCellLabel} component="th" scope="row">
        {rowLabel}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        <input value={showValue()}
               type={'number'}
               onChange={v => onChange(v.target.value)}
               disabled={disabled}
               style={{width: '140px'}}
        />
      </TableCell>
    </TableRow>
  )
}

export function EmptyTableCell() {
  return (
    <TableCell width={10}>
    </TableCell>
  )
}