import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api.js';

const CoinInfo = () => {

    const { id } = useParams();
    const [coin, setCoin] = useState()
  
    console.log(id);
  
    const fetchCoin = async () => {
      try {
        const response = await fetch(SingleCoin(id));
        if (response.ok) {
          const data = await response.json();
          setCoin(data);
          console.log(data);
        } else {
          console.error('Failed to fetch ticker tape data');
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };
  
    console.log(coin);
  
    useEffect(() => {
      fetchCoin();
    }, []);

  return (
    <div>CoinInfo</div>
  )
}

export default CoinInfo