import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {FirePattern, selectFirePatterns} from "../../features/fire/fireSlice";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {CompoundInterestByYear} from "../../features/compoundInterest/compoundInterest";
import {Box, Paper, Typography} from "@material-ui/core";
import {JustifyCenterBox} from "./JustifyCenterBox";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {theme} from "../materialui/theme";

const useStyles = makeStyles({
  paper: {
    width: '100%',
    marginBottom: 20,
  }
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
  const isPhoneMode = useMediaQuery(theme.breakpoints.down('xs'));


  const createData = (): ChartData[] => {
    const dataByPattern: ChartData[][] = selectedFirePatterns
      .map((pattern: FirePattern) => createChartData(pattern, `p${pattern.patternNumber}`))

    return mergeChartData(...dataByPattern)
  }

  const LineChartWithSize = ({width, height, children}: {width: number, height: number, children: React.ReactNode}) => {
    return (
      <LineChart
        width={width}
        height={height}
        data={createData()}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        {children}
      </LineChart>
    )
  }

  if (!createData()) return (<></>)
  return (
    <Box m={1}>
      <Paper className={classes.paper}>
        <JustifyCenterBox>
          <Typography>プラン1-3の比較</Typography>
        </JustifyCenterBox>
        <JustifyCenterBox>
          <LineChartWithSize width={isPhoneMode ? 340 : 500}
                             height={isPhoneMode ? 272 : 400}>
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
          </LineChartWithSize>
        </JustifyCenterBox>
      </Paper>
    </Box>
  );
}

