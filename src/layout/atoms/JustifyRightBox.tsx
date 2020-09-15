import React from 'react'
import { Box } from '@material-ui/core'

interface Props {
  children: React.ReactNode;
}

// 複利計算ページ
export function JustifyRightBox ({ children }: Props) {
  return (
    <Box display="flex" flexDirection="row-reverse">
      <Box>
        {children}
      </Box>
    </Box>
  )
}
