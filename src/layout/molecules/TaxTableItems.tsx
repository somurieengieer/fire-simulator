import React from 'react';
import {IconButton, TableCell, TableHead, TableRow} from "@material-ui/core";
import {usePatternTableStyles} from "./PhaseTableItems";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

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

export function TaxSubHeaderRowSet({title, amount, expanded, handleExpandClick}
: {title: string, amount?: number, expanded?: boolean, handleExpandClick?: (v: boolean) => void}) {
  const classes = usePatternTableStyles();
  const createTitle = () => (
    <>
      {title}
      {handleExpandClick !== undefined && (
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={v => handleExpandClick(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
          size={"small"}
        >
          <ExpandMoreIcon />
        </IconButton>
      )}
    </>
  )

  return (
    <TableRow className={classes.tableHeadRow}>
      {amount !== undefined ? (
        <>
          <TableCell>
            {createTitle()}
          </TableCell>
          <TableCell className={classes.tableCell} align="center">
            <input value={amount}
                   type={'number'}
                   disabled={true} />
          </TableCell>
        </>
      ) : (
        <TableCell colSpan={2}>
          {createTitle()}
        </TableCell>
      )}
    </TableRow>
  )
}

export function TaxIncomeTableRowSet({rowLabel, value, onChange, availableCheckBox, checkValue, onChangeCheck, disabled}
: {rowLabel: string,
  value: string | number,
  onChange?(newValue: string): void,
  availableCheckBox?: boolean,
  checkValue?: boolean,
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
        {availableCheckBox && (
          <input type={'checkBox'}
                 checked={checkValue}
                 onChange={v => onChangeCheck && onChangeCheck(!checkValue)}
          />
        )}
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