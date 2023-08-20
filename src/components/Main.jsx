import React, { useState, useEffect } from 'react';
import { CoinList } from '../config/api.js';
import Coin from './Coin.jsx';



const Main = () => {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    const fetchCoins = async () => {
        try {
        const response = await fetch(CoinList());
        if (response.ok) {
            const data = await response.json();
            setCoins(data);
        } else {
            console.error('Failed to fetch ticker tape data');
        }
        } catch (error) {
        console.error('An error occurred while fetching data:', error);
        }
    };

  useEffect(() => {
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter((coin) => (
    coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
))

  return (
    <div className="main-container">
        <div className="search">
            <h2>Search a coin</h2>
            <form>
                <input type="text" 
                placeholder='Search' 
                className='coin-input' 
                onChange={(e) => setSearch (e.target.value)} />
            </form>
        </div>
        <div className="coin-list">
            <div className="coin-header">
                <p>#</p>
                <p>Coin</p>
                <p>Price</p>
                <p>24h %</p>
                <p>24h <span>Volume</span></p>
                <p>Market cap</p>
            </div>
            <div className="coin-row">
                {filteredCoins.map(coin =>{
                    return (
                        <Coin 
                            key={coin.id}
                            image={coin.image}
                            name={coin.name}
                            symbol={coin.symbol}
                            change={coin.price_change_percentage_24h}
                            price={coin.current_price}
                            mcap={coin.market_cap}
                        />
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Main