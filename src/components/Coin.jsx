import React from 'react'

const Coin = ({rank, image, name, symbol, price, change, volume, mcap}) => {
  return (
    <div className="coin-cell">
      <div className="col1"><p>{rank}.</p></div>
      <div className="col2"><img src={image} alt={name} /><p className='coin-name'>{name}<span className='coin-symbol'>{symbol}</span></p></div>
        <div className="col3"><p>${price.toFixed(2).toLocaleString()}</p></div>
        <div className={`col4 coin-positive-negative ${change < 0 ? 'negative' : 'positive'}`}><p>{change.toFixed(2)}%</p></div>
        <div className='col5'><p>{volume.toLocaleString()}</p></div>
      <div className="col6"><p>${mcap.toLocaleString()}</p></div>
    </div>
  )
}

export default Coin