import React from 'react'
import { Box } from '@material-ui/core'

interface Props {
  height: number,
  children: React.ReactNode;
}

// 複利計算ページ
export function AlignCenterBox ({ height, children }: Props) {
  return (
    <Box display="flex" alignItems="center" style={{ height: height }}>
      <Box>
        {children}
      </Box>
    </Box>
  )
}
