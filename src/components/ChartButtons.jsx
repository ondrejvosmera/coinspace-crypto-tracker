import React from 'react'

const ChartButtons = ({children, selected, OnClick}) => {
  return (
    <span onClick={OnClick}>
        {children}
    </span>
  )
}

export default ChartButtons