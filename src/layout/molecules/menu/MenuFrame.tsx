import React from 'react'
import TopBarMenu from './TopBarMenu'

interface Props {
  children: React.ReactNode;
}

export default function MenuFrame ({ children }: Props) {
  return (
    <TopBarMenu>
      {children}
    </TopBarMenu>
  )
}
