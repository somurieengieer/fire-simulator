import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  table: {
    width: 650
  }
})

interface Props {
  children: React.ReactNode;
}

// 複利計算ページ
export function AlignCenterBox ({ children }: Props) {
  return (
    <Box display="flex" alignItems="center" style={{ height: '100%' }}>
      <Box>
        {children}
      </Box>
    </Box>
  )
}
