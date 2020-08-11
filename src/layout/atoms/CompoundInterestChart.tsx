import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {FirePattern, selectFirePatterns} from "../../features/fire/fireSlice";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {CompoundInterestByYear} from "../../features/compoundInterest/compoundInterest";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});

export interface ChartData {
  name: number,
  [key: string]: number | string;
}

export function createChartData(pattern: FirePattern, valueKey: string) {
  const startAge = Number(pattern.phases[0]?.ageAtStart)
  console.log('pattern is ', pattern)
  return pattern.compoundInterestResult?.rowByYear
    .map((r: CompoundInterestByYear) => {
      const row: ChartData = {name: r.year + startAge}
      row[valueKey] = r.amount.toFixed(0)
      return row
    })
}

export function mergeChartData(...dataAry: ChartData[][]): ChartData[] {
  return dataAry.reduce((accums: ChartData[], curs: ChartData[]) => {
    if (!curs || curs.length === 0) return accums
    const newKey = Object.keys(curs[0]).find(k => k !== 'name') as string
    let isAdded = false
    curs.forEach(cur => {
      const targetAccum = accums.find(a => a.name === cur.name)
      if (targetAccum) {
        targetAccum[newKey] = cur[newKey]
      } else {
        accums.push(cur)
        isAdded = true
      }
    })

    // sort
    if (isAdded) {
      accums.sort((a, b) => a.name - b.name)
    }

    return accums
  }).map(data => {
      // 数字に変換
      const newData: ChartData = {name: data.name}
      Object.keys(data).forEach(key => newData[key] = Number(data[key]))
      return newData as ChartData
    })
}

// 複利計算ページ
export function CompoundInterestChart() {

  const classes = useStyles();

  const selectedFirePatterns = useSelector(selectFirePatterns)

  const createData = (): ChartData[] => {
    const dataByPattern: ChartData[][] = selectedFirePatterns
      .map((pattern: FirePattern) => createChartData(pattern, `p${pattern.patternNumber}`))

    return mergeChartData(...dataByPattern)
  }

  return (
    <>
    {createData() && (
      <LineChart
        width={500}
        height={400}
        data={createData()}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickFormatter={(tickItem) => `${tickItem}歳`} />
        <YAxis tickFormatter={(tickItem) => `${tickItem.toLocaleString()}万`} />
        <Tooltip labelFormatter={label => `${label}歳`}
        formatter={item => `${item.toLocaleString()}万`}/>
        <Legend />
        <Line type="monotone" dataKey="p1" stroke="#8884d8" dot={{ r:2 }} activeDot={{ r: 7 }}
              name='プラン1' />
        <Line type="monotone" dataKey="p2" stroke="#82ca9d" dot={{ r:2 }} activeDot={{ r: 7 }}
              name='プラン2' />
        <Line type="monotone" dataKey="p3" stroke="#ca9d82" dot={{ r:2 }} activeDot={{ r: 7 }}
              name='プラン3' />
      </LineChart>
      )}
    </>
  );
}

