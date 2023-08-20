import React from 'react'

const Coin = ({rank, image, name, symbol, change, price, mcap}) => {
  return (
    <div className="coin-row">
        <p>{rank}</p>
        <img src={image} alt={name} />
        <p>{name}{symbol}</p>
        <p>{price}</p>
        <p>{change}</p>
        <p>{mcap}</p>
    </div>
  )
}

export default Coin