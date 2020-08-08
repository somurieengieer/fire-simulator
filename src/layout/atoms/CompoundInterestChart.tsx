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

interface ChartData {
  name: number,
  [key: string]: number | string;
}

// 複利計算ページ
export function CompoundInterestChart() {

  const classes = useStyles();

  const selectedFirePatterns = useSelector(selectFirePatterns)

  const createData = (): ChartData[] => {
    const dataByPattern: ChartData[][] = selectedFirePatterns.map((pattern: FirePattern) => {
      const startAge = Number(pattern.phases[0]?.ageAtStart)
      const valueKey = `p${pattern.patternNumber}`
      return pattern.compoundInterestResult?.rowByYear
        .map((r: CompoundInterestByYear) => {
          const row: ChartData = {name: r.year + startAge}
          row[valueKey] = r.amount.toFixed(0)
          return row
        })
    })
    return dataByPattern.reduce((accums: ChartData[], curs: ChartData[]) => {
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
    })
  }

  // const data = selectedCompoundInterestResult?.rowByYear
  //   .map((r: CompoundInterestByYear) => {
  //     return {name: r.year + selectedPhases?.[0].ageAtStart, p1: r.amount.toFixed(0)}
  //   })

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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="p1" stroke="#8884d8" dot={{ r:2 }} activeDot={{ r: 7 }}
              name='プラン1' />
        <Line type="monotone" dataKey="p2" stroke="#82ca9d" dot={{ r:2 }} activeDot={{ r: 7 }}
              name='プラン2' />
        <Line type="monotone" dataKey="p3" stroke="#ca9d82" dot={{ r:2 }} activeDot={{ r: 7 }}
              name='プラン3' />

        {/*<Area type="monotone" name='プラン1' dataKey="p1" stackId="1" stroke="#8884d8" fill="#8884d8" />*/}
        {/*<Area type="monotone" name='プラン2' dataKey="p2" stackId="1" stroke="#82ca9d" fill="#82ca9d" />*/}
        {/*<Area type="monotone" name='プラン3' dataKey="p3" stackId="1" stroke="#ffc658" fill="#ffc658" />*/}
      </LineChart>
      )}
    </>
  );
}

