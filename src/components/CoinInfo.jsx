import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api.js';
import debounce from 'lodash.debounce';

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
        } else {
          console.error('Failed to fetch ticker tape data');
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    const fetchCoinDebounced = debounce(fetchCoin, 1000);
  
    useEffect(() => {
      fetchCoinDebounced();
    }, []);

  return (
    <h1 style={{ color: 'white' }}>{id}</h1>
  )
}

export default CoinInfo;