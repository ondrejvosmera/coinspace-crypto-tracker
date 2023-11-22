import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api.js';

const CoinInfo = () => {

    const { id } = useParams();
    const [coin, setCoin] = useState()
  
    const fetchCoin = async () => {
      try {
        const response = await fetch(SingleCoin(id));
        if (response.ok) {
          const data = await response.json();
          setCoin(data);
        } else {
          console.error('Failed to fetch ticker tape data');
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchCoin();
    }, []);

    if (!coin) {
      return <div>Loading...</div>;
    }

  return (
    <div className="coin-info-container">
      <div className="left-col">
        <img src={coin.image.large} alt={coin.name} />
        <h1 className='title'>{coin.name}</h1>
        <p>Rank: {coin.market_cap_rank}</p>
        <p>Price: ${coin.market_data.current_price.usd}</p>
        <p>Market cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
        <p>{coin.description.en}</p>
      </div>
    </div>
  )
}

export default CoinInfo;