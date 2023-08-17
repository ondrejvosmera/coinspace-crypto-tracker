import React, { useState, useEffect } from 'react';
import { Tape } from '../config/api.js';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TickerTape = () => {
  const [ticker, setTicker] = useState([]);

  const fetchTickerTape = async () => {
    try {
      const response = await fetch(Tape());
      if (response.ok) {
        const data = await response.json();
        setTicker(data);
      } else {
        console.error('Failed to fetch ticker tape data');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTickerTape();
  }, []);

  const handpickedCoinIds = ['bitcoin', 'ethereum', 'binancecoin', 'ripple', 'solana', 'cardano', 'dogecoin'];

  const handpickedCoins = ticker.filter(coin => handpickedCoinIds.includes(coin.id));

  const settings = {
    infinite: true,
    speed: 4000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="ticker-container">
      <Slider {...settings}>
        {handpickedCoins.map(coin => (
          <Link to={`/coins/${coin.id}`} key={coin.id} className="ticker-item">
          <div className='ticker-items'>
            <img src={coin?.image} alt={coin.name} />
            {coin.symbol}
            <div className={`positive-negative ${coin.price_change_percentage_24h < 0 ? 'negative' : 'positive'}`}>
            ${coin.current_price.toFixed(2)}
            <span className="price-change">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
            </div>
          </div>
        </Link>
        ))}
      </Slider>
    </div>
  );
};

export default TickerTape;
