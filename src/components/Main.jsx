import React, { useState, useEffect } from 'react';
import { CoinList } from '../config/api.js';
import { Link } from 'react-router-dom';
import Coin from './Coin.jsx';
import Footer from './Footer.jsx';
import ReactLoading from 'react-loading';

const Main = () => {
    const [coins, setCoins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const coinsPerPage = 10;

    useEffect(() => {
        const fetchAllCoins = async () => {
            try {
                const response = await fetch(CoinList());
                if (response.ok) {
                    const data = await response.json();
                    setCoins(data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        };

        fetchAllCoins();
    }, []);

    const filteredCoins = coins.filter((coin) => (
        coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
    ));

    const startIndex = (currentPage - 1) * coinsPerPage;
    const endIndex = startIndex + coinsPerPage;

    const displayedCoins = filteredCoins.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

    const toTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

    const paginationButtons = Array.from({ length: totalPages }, (_, index) => (
        <button
            key={index + 1}
            onClick={() => {
                setCurrentPage(index + 1);
                toTop();
            }}
            className={index + 1 === currentPage ? "active-pagination" : ""}
        >
            {index + 1}
        </button>
    ));

    return (
        <>
            <div className="main-container">
                <div className="search">
                    <h2>Search</h2>
                    <form>
                        <input
                            type="text"
                            className='coin-input'
                            onChange={(e) => setSearch(e.target.value)}
                        />
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
                    {(!coins.length) ? (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                            <p>Too many API calls... (ERROR 429)</p>
                            <ReactLoading type="bubbles" color="white" height={'100px'} width={'100px'} />
                        </div>
                    ) : (
                    <>
                    <div className="coin-row">
                        {displayedCoins.map(coin => (
                            <Link to={`${coin.id}`} key={coin.id}>
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
                        ))}
                    </div>
                    </>
                )}
                </div>
                <div className="pagination">
                    {paginationButtons}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Main;
