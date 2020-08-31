import React from 'react';
import {Box} from "@material-ui/core";

interface Props {
  width?: string,
  children: React.ReactNode;
}

// 複利計算ページ
export function JustifyCenterBox({width, children}: Props) {
  return (
    <Box display="flex" justifyContent="center">
      {width ? (
        <Box style={{width: width}}>
          {children}
        </Box>
      ) : (
        <>
          {children}
        </>
      )}
    </Box>
  );
}

