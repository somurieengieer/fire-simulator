import React from 'react';
import {Box, IconButton, TableCell, TableHead, TableRow} from "@material-ui/core";
import {usePatternTableStyles} from "./PhaseTableItems";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import {numberFromHalfWidthToFullWidth} from "../../features/utils/Utils";
import {selectSetNumbers, selectTaxSet, TaxSet, updateTaxSet} from "../../features/tax/taxSlice";
import {useDispatch, useSelector} from "react-redux";

export function TaxHeaderRowSet({taxSet, title}
: {taxSet: TaxSet, title: string}) {

  const classes = usePatternTableStyles();
  const dispatch = useDispatch();
  const selectedSetNumbers = useSelector(selectSetNumbers)
  const selectedTaxSet: TaxSet[] = useSelector(selectTaxSet)

  const copyPatternByPatternNumber = (patternNumber: number) => {
    const newTaxSet: TaxSet = JSON.parse(JSON.stringify(selectedTaxSet[patternNumber - 1]))
    newTaxSet.setNumber = taxSet.setNumber
    dispatch(updateTaxSet(newTaxSet))
  }

  return (
    <TableHead>
      <TableRow className={classes.tableHeadRow}>
        <TableCell colSpan={2}>
          <Box
            display="flex"
            flexWrap="wrap"
            alignContent="flex-start"
          >
            <Box>
              {title}&nbsp;
            </Box>
            <Box>
              {selectedSetNumbers?.filter((i: number) => i !== taxSet.setNumber).map((i: number) => (
                <button onClick={() => copyPatternByPatternNumber(i)}>パターン{numberFromHalfWidthToFullWidth(i)}からコピー</button>
              ))}
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

interface TaxSubHeaderRowSetProps {
  title: string,
  amount?: number,
  expanded?: boolean,
  handleExpandClick?: (v: boolean) => void,
  children: React.ReactNode; // TaxTableRowSetが並ぶ感じ（ヘッダー行以降の行）
}
export function TaxSubHeaderRowSet({title, amount, expanded, handleExpandClick, children}: TaxSubHeaderRowSetProps) {
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
    <>
      <TableRow className={classes.tableHeadRow}>
        {amount !== undefined ? (
          <>
            <TableCell>
              {createTitle()}
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              <input value={amount}
                     type={'number'}
                     className={classes.input}
                     disabled={true} />
            </TableCell>
          </>
        ) : (
          <TableCell colSpan={2}>
            {createTitle()}
          </TableCell>
        )}
      </TableRow>
      {(handleExpandClick === undefined || expanded) && children}
    </>
  )
}

export function TaxTableRowSet({rowLabel, value, onChange, availableCheckBox, checkValue, onChangeCheck, disabled, noFixed}
: {rowLabel: string,
  value: string | number,
  onChange?(newValue: string): void,
  availableCheckBox?: boolean,
  checkValue?: boolean,
  onChangeCheck?(newValue: boolean): void,
  disabled?: boolean,
  noFixed?: boolean,
}) {

  const showValue = (): string | number =>
    disabled ? noFixed ?  Number(value) : Number(value)?.toFixed(0) : value

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
               className={classes.input}
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