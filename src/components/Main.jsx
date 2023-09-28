import React, { useState, useEffect } from 'react';
import { CoinList } from '../config/api.js';
import { Link } from 'react-router-dom';
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
            <h2>Search</h2>
            <form>
                <input type="text" 
                className='coin-input' 
                onChange={(e) => setSearch (e.target.value)} />
            </form>
        </div>
        <div className="coin-list">
            <div className="coin-header">
                <div className="col1"><p>#</p></div>
                <div className="col2"><p>Coin</p></div>
                <div className="col3"><p>Price</p></div>
                <div className="col4"><p>24h %</p></div>
                <div className="col5"><p>Volume</p></div>
                <div className="col6"><p>Market cap</p></div>
            </div>
            <div className="coin-row">
                {filteredCoins.map(coin =>{
                    return (
                        <Link to={`/coins/${coin.id}`}>
                            <Coin 
                                key={coin.id}
                                rank={coin.market_cap_rank}
                                image={coin.image}
                                name={coin.name}
                                symbol={coin.symbol}
                                change={coin.price_change_percentage_24h}
                                volume={coin.total_volume}
                                price={coin.current_price}
                                mcap={coin.market_cap}
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Main