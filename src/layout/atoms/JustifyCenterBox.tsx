import React from 'react'
import { Box } from '@material-ui/core'

interface Props {
  maxWidth?: string,
  children: React.ReactNode;
}

// 複利計算ページ
export function JustifyCenterBox ({ maxWidth, children }: Props) {
  return (
    <Box display="flex" justifyContent="center">
      {maxWidth ? (
        <Box style={{ maxWidth: Number(maxWidth) }}>
          {children}
        </Box>
      ) : (
        <Box>
          {children}
        </Box>
      )}
    </Box>
  )
}
