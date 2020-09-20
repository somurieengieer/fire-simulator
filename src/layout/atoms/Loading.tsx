import React from 'react'
import { JustifyCenterBox } from './JustifyCenterBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Typography } from '@material-ui/core'
import { AlignCenterBox } from './AlignCenterBox'

export function Loading () {
  return (
    // ローディングアイコン
    <JustifyCenterBox>
      <AlignCenterBox height={400}>
        <FontAwesomeIcon className='fa-spin' style={{ padding: 10, fontSize: 50 }} icon={faSpinner} />
        <Typography>Loading</Typography>
      </AlignCenterBox>
    </JustifyCenterBox>
  )
}
