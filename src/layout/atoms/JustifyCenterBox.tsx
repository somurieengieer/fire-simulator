import React from 'react';
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    width: 650,
  },
});

interface Props {
  width: string,
  children: React.ReactNode;
}

// 複利計算ページ
export function JustifyCenterBox({width, children}: Props) {

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box style={{width: width}}>
          {children}
        </Box>
      </Box>
    </>
  );
}

