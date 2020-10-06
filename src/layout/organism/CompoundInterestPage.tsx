import React, { useState } from 'react'
import { Button, TextField, Typography } from '@material-ui/core'
import {
  calcCompoundInterestResult,
  CompoundInterestProps,
  CompoundInterestResult
} from '../../features/compoundInterest/compoundInterest'
import { makeStyles } from '@material-ui/core/styles'
import { JustifyCenterBox } from '../atoms/JustifyCenterBox'
import { CompoundInterestTable } from '../molecules/CompoundInterestTable'

// 複利計算ページ
export function CompoundInterestPage () {
  const [interestProps, setInterestProps] = useState<CompoundInterestProps>(
    { presentAmount: 100, reserveAmount: 10, reserveYears: 10, annualInterest: 3 }
  )
  const [compoundInterestResult, setCompoundInterestResult] = useState<CompoundInterestResult | null>(null)

  const calc = () => {
    setCompoundInterestResult(calcCompoundInterestResult(interestProps))
  }

  return (
    <>
      <JustifyCenterBox maxWidth={'200'}>
        <Typography>複利計算ページ</Typography>
        <TextField label="現在の金額"
          defaultValue={interestProps.presentAmount}
          onChange={v => setInterestProps(Object.assign(interestProps, { presentAmount: v.target.value }))}
        />
        <TextField label="積立金額"
          defaultValue={interestProps.reserveAmount}
          onChange={v => setInterestProps(Object.assign(interestProps, { reserveAmount: v.target.value }))}
        />
        <TextField label="積立年数"
          defaultValue={interestProps.reserveYears}
          onChange={v => setInterestProps(Object.assign(interestProps, { reserveYears: v.target.value }))}
        />
        <TextField label="年利"
          defaultValue={interestProps.annualInterest}
          onChange={v => setInterestProps(Object.assign(interestProps, { annualInterest: v.target.value }))}
        />
        <Button variant="contained" color="primary"
          onClick={calc}
        >
          計算
        </Button>
      </JustifyCenterBox>

      {compoundInterestResult && (
        <JustifyCenterBox maxWidth={'250'}>
          <CompoundInterestTable result={compoundInterestResult}/>
        </JustifyCenterBox>
      )}
    </>
  )
}
