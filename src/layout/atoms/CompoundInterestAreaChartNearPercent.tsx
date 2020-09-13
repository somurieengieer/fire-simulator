import React from 'react'
import { FirePattern, updateFirePatternRelatedThings } from '../../features/fire/fireSlice'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartData, createChartData, mergeChartData } from './CompoundInterestChart'
import { PhaseData } from '../../features/fire/Phase'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { theme } from '../materialui/theme'

interface Props {
  firePattern: FirePattern,
  nearPercent: number, // 変動リスク%
}

function addAnnualInterest (firePattern: FirePattern, addPercent: number, valueKey: string): ChartData[] {
  const copiedFirePattern = JSON.parse(JSON.stringify(firePattern))
  copiedFirePattern.phases.forEach((p: PhaseData) => p.annualInterest = Number(p.annualInterest || 0) + addPercent)
  updateFirePatternRelatedThings(copiedFirePattern)
  return createChartData(copiedFirePattern, valueKey) as ChartData[]
}

// 近辺%エリアチャート
export function CompoundInterestAreaChartNearPercent ({ firePattern, nearPercent }: Props) {
  const createData = (): ChartData[] => {
    const data: ChartData[] | undefined = createChartData(firePattern, 'base')
    if (!data) return []

    const dataPlusAlpha: ChartData[] = addAnnualInterest(firePattern, Math.abs(nearPercent), 'plus')
    const dataMinusAlpha: ChartData[] = addAnnualInterest(firePattern, -Math.abs(nearPercent), 'minus')

    const resultData = mergeChartData(dataPlusAlpha, data, dataMinusAlpha)
    resultData.forEach(d => {
      // @ts-ignore
      d.plus = d.plus - d.base
      // @ts-ignore
      d.base = d.base - d.minus
    })
    return resultData
  }

  const existsData = () => firePattern.compoundInterestResult

  const AreaChartWithSize = ({ width, height, children }: { width: number, height: number, children: React.ReactNode }) => {
    return (
      <AreaChart
        width={width}
        height={height}
        data={createData()}
        margin={{
          top: 10, right: 30, left: 16, bottom: 0
        }}
      >
        {children}
      </AreaChart>
    )
  }

  const isPhoneMode = useMediaQuery(theme.breakpoints.down('xs'))

  if (!existsData()) return (<></>)
  return (
    <AreaChartWithSize width={isPhoneMode ? 340 : 500}
      height={isPhoneMode ? 272 : 400}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="name" tickFormatter={(tickItem) => `${tickItem}歳`}/>
      <YAxis tickFormatter={(tickItem) => `${tickItem.toLocaleString()}万`}/>
      <Tooltip labelFormatter={label => `${label}歳`}
        itemSorter={(a, b) => {
          let result = 2
          if (a.dataKey === 'plus') result = 0
          if (a.dataKey === 'base') result = 1
          return result
        }}
        formatter={((value, name, entry, index) => {
          let amount = value
          if (name.charAt(0) !== '-') amount += entry.payload.minus
          if (name.charAt(0) === '+') amount += entry.payload.base
          return `${Number(amount || 0).toLocaleString()}万`
        })}/>
      <Area type="monotone" name={`-${nearPercent}％運用`} dataKey="minus" stackId="1" stroke="#ff5858" fill="#FFFFFF"/>
      <Area type="monotone" name='想定通り運用' dataKey="base" stackId="1" stroke="#82ca9d" fill="#ff5858"/>
      <Area type="monotone" name={`+${nearPercent}％運用`} dataKey="plus" stackId="1" stroke="#8884d8" fill="#8884d8"/>
    </AreaChartWithSize>
  )
}
