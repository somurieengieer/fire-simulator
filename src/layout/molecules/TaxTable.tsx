import React, { useState } from 'react'
import { Grid, Paper, Table, TableBody, TableContainer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { usePatternTableStyles } from './PhaseTableItems'
import { theme } from '../materialui/theme'
import { TaxHeaderRowSet, TaxSubHeaderRowSet, TaxTableRowSet } from './TaxTableItems'
import { Deduction, Income, TaxSet, updateTaxSet } from '../../features/tax/taxSlice'
import { useDispatch } from 'react-redux'
import { numberFromHalfWidthToFullWidth, sumAmount } from '../../features/utils/Utils'

const useStyles = makeStyles({
  root: {
    margin: 5,
    padding: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  }
})

interface PhasesTableProps {
  taxSet: TaxSet,
}

export function TaxTable ({ taxSet }: PhasesTableProps) {
  const classes = useStyles()
  const tableClasses = usePatternTableStyles()
  const dispatch = useDispatch()
  const [expandedSocialInsurance, setExpandedSocialInsurance] = useState<boolean>(false)
  const [expandedPersonalTax, setExpandedPersonalTax] = useState<boolean>(false)
  const [expandedRetirementTax, setExpandedRetirementTax] = useState<boolean>(false)

  const updateTaxSetValue = (updateValue: () => void): void => {
    updateValue()
    dispatch(updateTaxSet(taxSet))
  }

  return (
    <>
      <Grid className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={tableClasses.table} aria-label="simple table"
            size={'small'}
          >
            <TaxHeaderRowSet taxSet={taxSet}
              title={`パターン${numberFromHalfWidthToFullWidth(taxSet.setNumber)}`}/>
            <TableBody>
              <TaxSubHeaderRowSet title={'個人設定'}>
                <TaxTableRowSet rowLabel={'年齢'}
                  value={taxSet.personalInfo.age}
                  onChange={v => updateTaxSetValue(() => taxSet.personalInfo.age = Number(v))}
                />
                <TaxTableRowSet rowLabel={'家族人数（40歳未満）'}
                  value={taxSet.personalInfo.numberOfFamily}
                  onChange={v => updateTaxSetValue(() => taxSet.personalInfo.numberOfFamily = Number(v))}
                  toolTip={'国民健康保険料算出に使用します'}
                />
                <TaxTableRowSet rowLabel={'家族人数（40歳以上）'}
                  value={taxSet.personalInfo.numberOfFamilyOver40}
                  onChange={v => updateTaxSetValue(() => taxSet.personalInfo.numberOfFamilyOver40 = Number(v))}
                  toolTip={'国民健康保険料算出に使用します'}
                />
              </TaxSubHeaderRowSet>
              {taxSet.incomes.map((income: Income, incomeIndex: number) => (
                <TaxSubHeaderRowSet title={income.subHeaderTitle}
                  key={income.name}
                  amount={Math.max(income.amount - sumAmount(income.deductions), 0)}>
                  <TaxTableRowSet rowLabel={income.name}
                    value={income.amount || ''}
                    onChange={v => updateTaxSetValue(() => income.amount = Number(v))}
                  />
                  {income.deductions && income.deductions.map((deduction, i) => (
                    <TaxTableRowSet rowLabel={deduction.name}
                      key={i}
                      value={deduction.amount || ''}
                      onChange={v => updateTaxSetValue(() => deduction.amount = Number(v))}
                      disabled={!deduction.editable}
                    />
                  ))}
                </TaxSubHeaderRowSet>
              ))}
              <TaxSubHeaderRowSet title={'課税標準'} amount={taxSet.baseOfTaxation}/>
              <TaxSubHeaderRowSet title={'控除'} amount={sumAmount(taxSet.deductions)}>
                {taxSet.deductions.map((deduction: Deduction, deductionIndex: number) => (
                  <TaxTableRowSet rowLabel={deduction.name}
                    key={deductionIndex}
                    value={deduction.amount || ''}
                    onChange={v => updateTaxSetValue(() => deduction.amount = Number(v))}
                    availableCheckBox={deduction.availableCheckBox}
                    checkValue={deduction.checked}
                    onChangeCheck={v => updateTaxSetValue(() => deduction.checked = v)}
                    disabled={!deduction.editable}
                    toolTip={deduction.toolTip}
                  />
                ))}
              </TaxSubHeaderRowSet>
              <TaxSubHeaderRowSet title={'社会保険料'}
                amount={sumAmount(taxSet.socialInsurance.filter(s => s.name !== '報酬月額'))}
                expanded={expandedSocialInsurance} handleExpandClick={setExpandedSocialInsurance}
              >
                {taxSet.socialInsurance.map((socialInsurance) => (
                  <TaxTableRowSet rowLabel={socialInsurance.name}
                    key={socialInsurance.name}
                    value={socialInsurance.amount || ''}
                    disabled={true}
                  />
                ))}
              </TaxSubHeaderRowSet>
              <TaxSubHeaderRowSet title={'課税所得金額'} amount={taxSet.taxableIncomeAmount}/>
              <TaxSubHeaderRowSet title={'税金'} amount={sumAmount(taxSet.personalTax)}
                expanded={expandedPersonalTax} handleExpandClick={setExpandedPersonalTax}>
                {taxSet.personalTax.map((personalTax) => (
                  <TaxTableRowSet rowLabel={personalTax.name}
                                  key={personalTax.name}
                    value={personalTax.amount || ''}
                    disabled={true}
                  />
                ))}
              </TaxSubHeaderRowSet>
              <TaxSubHeaderRowSet title={'可処分所得'} amount={taxSet.disposableIncome}/>
              <TaxSubHeaderRowSet title={'退職金'} amount={taxSet.retirementTax.disposableIncome}
                expanded={expandedRetirementTax} handleExpandClick={setExpandedRetirementTax}>
                <TaxTableRowSet rowLabel={'労働年数'}
                  value={taxSet.retirementTax.workingYears}
                  onChange={v => updateTaxSetValue(() => taxSet.retirementTax.workingYears = Number(v))}
                />
                <TaxTableRowSet rowLabel={'退職金（会社支払）'}
                  value={taxSet.retirementTax.income}
                  onChange={v => updateTaxSetValue(() => taxSet.retirementTax.income = Number(v))}
                />
                <TaxTableRowSet rowLabel={'退職金（iDeco、小規模企業共済）'}
                  value={taxSet.retirementTax.incomeAutoCalculated}
                  disabled={true}
                />
                <TaxTableRowSet rowLabel={'税額（所得税・住民税）'}
                  value={taxSet.retirementTax.taxAmount}
                  disabled={true}
                />
                <TaxTableRowSet rowLabel={'退職金可処分所得'}
                  value={taxSet.retirementTax.disposableIncome}
                  disabled={true}
                />
              </TaxSubHeaderRowSet>
              <TaxSubHeaderRowSet title={'年金(40年労働概算)'} amount={Number(taxSet.retirementAnnuity.amount)}/>
              <TaxSubHeaderRowSet title={'ふるさと納税目安'} amount={Number(taxSet.furusato.amount)}/>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  )
}
