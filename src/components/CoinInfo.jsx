import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { HistoricalChart, SingleCoin } from '../config/api.js';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { chartDays } from '../config/chartData.js';
import ChartButtons from './ChartButtons.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const CoinInfo = () => {

    const { id } = useParams();
    const [coin, setCoin] = useState()
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
  
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
    }, [days]);

    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(HistoricalChart(id, days));
        if (response.ok) {
          const data = await response.json();
          setHistoricalData(data.prices);
        } else {
          console.error('Failed to fetch Historical data');
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    useEffect(() => {
      fetchHistoricalData();
    }, [days]);

    if (!coin || !historicalData) {
      return <div>Loading...</div>;
    }

    const getBorderColor = (name) => {
      const colorMapping = {
        bitcoin: "#FFA500",
        ethereum: "#48CBD9",
        tether: "#26A17B",
        bnb: "#F3BA2F",
        xrp: "#FFFFFF",
        solana: "#00FFA3",
        cardano: "#0033AD",
        dogecoin: "#E1B303",
        tron: "#D1001F"
      };
    
      return colorMapping[name.toLowerCase()] || "#00BCE3";
    };

    function formatText(text) {
      // Remove HTML tags from the text
      const textWithoutHTML = text.replace(/<\/?[^>]+(>|$)/g, '');
    
      // Split the text into an array of sentences
      const sentences = textWithoutHTML.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
    
      // Take the first 5 sentences
      const limitedText = sentences.slice(0, 5).join(' ');
    
      return limitedText;
    }

  return (
    <>
    <Navbar />
    <div className="coin-info-container">
      <div className="left-col">
        <div className="coin-title">

          <img src={coin.image.large} alt={coin.name} />
          <h2 className='title'>{coin.name}</h2>
          <p className='coin-ticker'>{coin.symbol}</p>
        </div>
        <p className='coin-price'>${coin.market_data.current_price.usd.toLocaleString()}</p>
        <p className='coin-mcap'>Market cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
        <p>{formatText(coin.description.en)}</p>
      </div>
      <div className="right-col">
        {
          !historicalData ? (<p>Loading...</p>
          ) : (
          <>
          <div className='chart-buttons'>
            {chartDays.map((day) => (
              <ChartButtons key={day.value} onClick={() => setDays(day.value)} selected={day.value === days}>
                {day.label}
              </ChartButtons>
            ))}
          </div>
          <Line
          className='chart'
          data = {{
            labels: historicalData.map((coin) => {
              let date = new Date(coin[0]);
              let time = date.getHours() > 12
              ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
              : `${date.getHours()} : ${date.getMinutes()} AM`

              return days === 1 ? time : date.toLocaleDateString()
            }),

            datasets: [
              {
                data: historicalData.map((coin) => coin[1]),
                label: `Price (Past ${days} Days)`,
                borderColor: getBorderColor(coin.name),
                
              }
            ]
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              }
            }
          }}
          />
          </>
          )
        }
      </div>
    </div>
    <Footer />
    </>
  )
}

export default CoinInfo;