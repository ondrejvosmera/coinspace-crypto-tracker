import React from 'react'

const ChartButtons = ({children, selected, OnClick}) => {
  return (
    <span onClick={OnClick} className='chart-button'>
        {children}
    </span>
  )
}

export default ChartButtons