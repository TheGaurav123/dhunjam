import React from 'react'
import { LineWave } from 'react-loader-spinner'
import { BAR_COLOR } from '../../constants/BAR_CHART.constants'

const index = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <LineWave
        color={BAR_COLOR}
      />
    </div>
  )
}

export default index