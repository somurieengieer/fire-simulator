import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {selectCompoundInterestResult, selectPhases} from "../../features/fire/fireSlice";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import {CompoundInterestByYear} from "../../features/compoundInterest/compoundInterest";

const useStyles = makeStyles({
  table: {
    // width: 650,
  },
});



// 複利計算ページ
export function CompoundInterestChart() {

  const classes = useStyles();

  const selectedPhases = useSelector(selectPhases)
  const selectedCompoundInterestResult = useSelector(selectCompoundInterestResult)

  const data = selectedCompoundInterestResult?.rowByYear
    .map((r: CompoundInterestByYear) => {
      return {name: r.year + selectedPhases?.[0].ageAtStart, p1: r.amount.toFixed(0)}
    })

  return (
    <>
    {data && (
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" name='プラン1' dataKey="p1" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" name='プラン2' dataKey="p2" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" name='プラン3' dataKey="p3" stackId="1" stroke="#ffc658" fill="#ffc658" />
      </AreaChart>
      )}
    </>
  );
}

