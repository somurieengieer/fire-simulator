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

export function TaxSubHeaderRowSet({title, amount}
: {title: string, amount?: number}) {
  const classes = usePatternTableStyles();
  return (
    <TableRow className={classes.tableHeadRow}>
      {amount !== undefined ? (
        <>
          <TableCell>
            {title}
          </TableCell>
          <TableCell className={classes.tableCell} align="center">
            <input value={amount}
                   type={'number'}
                   disabled={true} />
          </TableCell>
        </>
      ) : (
        <TableCell colSpan={2}>
          {title}
        </TableCell>
      )}
    </TableRow>
  )
}

export function TaxIncomeTableRowSet({rowLabel, value, onChange, onChangeCheck, disabled}
: {rowLabel: string,
  value: string | number,
  onChange?(newValue: string): void,
  onChangeCheck?(newValue: boolean): void,
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
               onChange={v => onChange && onChange(v.target.value)}
               disabled={disabled}
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