import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Pie, PieChart, Tooltip} from "recharts";
import {Box, Paper} from "@material-ui/core";
import {JustifyCenterBox} from "./JustifyCenterBox";
import {TaxSet} from "../../features/tax/taxSlice";
import {sum, sumAmount} from "../../features/utils/Utils";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {theme} from "../materialui/theme";

const useStyles = makeStyles({
  paper: {
    width: '100%',
    marginBottom: 20,
  }
});

interface Props {
  taxSet: TaxSet,
}

export function TaxPieChart({taxSet}: Props) {

  const data01 = [
    { name: '手取り', value: taxSet.disposableIncome },
    { name: '社会保険料', value: sumAmount(taxSet.socialInsurance)},
    { name: '税金', value: sumAmount(taxSet.personalTax)},
  ];

  const percentage = (value: number) =>
    (Number(value) / sum(data01.map(d => d.value)) * 100).toFixed(0)

  const classes = useStyles();

  const isPhoneMode = useMediaQuery(theme.breakpoints.down('xs'));
  const chartSize = isPhoneMode ? 320 : 400

  if (!taxSet) return (<></>)

  return (
    <Box m={1}>
      <Paper className={classes.paper}>
        <JustifyCenterBox>
          <PieChart width={chartSize} height={chartSize}>
            <Pie dataKey="value" isAnimationActive={false} data={data01}
                 startAngle={90} endAngle={-270}
                 cx={chartSize / 2} cy={chartSize / 2} outerRadius={chartSize / 3.2} fill="#8884d8"
                 label={props => `${props.name} ${percentage(props.value)}%`} />
            <Tooltip formatter={value => `${value}万`}/>
          </PieChart>
        </JustifyCenterBox>
      </Paper>
    </Box>
  );
}

