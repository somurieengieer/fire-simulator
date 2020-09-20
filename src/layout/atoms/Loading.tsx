import React from 'react'
import { JustifyCenterBox } from './JustifyCenterBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Typography } from '@material-ui/core'
import { AlignCenterBox } from './AlignCenterBox'

export function Loading () {
  return (
    <JustifyCenterBox>
      <AlignCenterBox height={400}>
        {/* <div>LoadingDiv</div> */}
        <Typography>Loading</Typography>
      </AlignCenterBox>
    </JustifyCenterBox>
    // ローディングアイコン
    //     {/* <FontAwesomeIcon className='fa-spin' style={{ padding: 10, fontSize: 50 }} icon={faSpinner} /> */}
  )
}
