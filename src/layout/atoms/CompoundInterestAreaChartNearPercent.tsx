import React from 'react';
import {FirePattern} from "../../features/fire/fireSlice";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import {ChartData, createChartData, mergeChartData} from "./CompoundInterestChart";
import {PhaseData} from "../../features/fire/Phase";

interface Props {
  firePattern: FirePattern,
  nearPercent: number, // 変動リスク%
}

function addAnnualInterest(firePattern: FirePattern, addPercent: number, valueKey: string): ChartData[] {
  const copiedFirePattern = Object.assign(firePattern)
  copiedFirePattern.phases.forEach((p: PhaseData) => p.annualInterest = Number(p.annualInterest || 0) + addPercent )
  return createChartData(copiedFirePattern, valueKey) as ChartData[]
}

// 近辺%エリアチャート
export function CompoundInterestAreaChartNearPercent({firePattern, nearPercent}: Props) {

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

  return (
    <>
    {createData() && (
      <AreaChart
        width={500}
        height={400}
        data={createData()}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="minus" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="base" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="plus" stackId="1" stroke="#ffc658" fill="#ffc658" />
      </AreaChart>

      // <LineChart
      //   width={500}
      //   height={400}
      //   data={createData()}
      //   margin={{
      //     top: 5, right: 30, left: 20, bottom: 5,
      //   }}
      // >
      //   <CartesianGrid strokeDasharray="3 3" />
      //   <XAxis dataKey="name" tickFormatter={(tickItem) => `${tickItem}歳`} />
      //   <YAxis tickFormatter={(tickItem) => `${tickItem.toLocaleString()}万`} />
      //   <Tooltip labelFormatter={label => `${label}歳`}
      //   formatter={item => `${item.toLocaleString()}万`}/>
      //   <Legend />
      //   <Line type="monotone" dataKey="base" stroke="#8884d8" dot={{ r:2 }} activeDot={{ r: 7 }}
      //         name='プラン1' />
      //   <Line type="monotone" dataKey="p2" stroke="#82ca9d" dot={{ r:2 }} activeDot={{ r: 7 }}
      //         name='プラン2' />
      //   <Line type="monotone" dataKey="p3" stroke="#ca9d82" dot={{ r:2 }} activeDot={{ r: 7 }}
      //         name='プラン3' />
      // </LineChart>
      )}
    </>
  );
}

