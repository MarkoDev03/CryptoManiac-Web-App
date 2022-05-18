import React, {  useState, useEffect } from 'react'
import { numberWithCommas } from './Carousel';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const CoinItem = ({ coin, currency, coinSymbol, classes, symbol }) => {
  
    const [price, setPrice] = useState(numberWithCommas(coin?.current_price));
    const [percentageDaily, setPercentageDaily] = useState(parseFloat(coin?.price_change_percentage_24h).toFixed(2));
    const [percentageDailyColor, setPercentageDailyColor] = useState(parseFloat(coin?.price_change_percentage_24h).toFixed(2) < 0 ? "#FA0A32": "#16c784");
    const [color, setColor] = useState("#fff");
    const [icon, setIcon] = useState(parseFloat(coin?.price_change_percentage_24h).toFixed(2) < 0 ? "▼" : "▲");
  
    useEffect(() => {

    let currencySymbol = currency === "USD" ? "usdt" : currency.toLowerCase();
    let webSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${coinSymbol}${currencySymbol}@ticker`);

     try {

        let lastPriceDef = null;
        let lastPercentage = null;

        webSocket.onclose = () => {
            webSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${coinSymbol}${currencySymbol}@ticker`);
        }

        webSocket.onerror = () => {
            webSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${coinSymbol}${currencySymbol}@ticker`);
        }

        webSocket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            let priceDef = data.a > 1000 ? parseFloat(data.a).toFixed(0) : data.a < 1000 ? parseFloat(data.a).toFixed(3) : parseFloat(data.a).toFixed(6);
            let percentage = parseFloat(data.P).toFixed(2);
            let priceColor = !lastPriceDef || lastPriceDef === priceDef ? "white" : lastPercentage > percentage ? "#FA0A32" : "#16c784" ;
            let percentageColor = lastPercentage > percentage ? "#FA0A32" : "#16c784"
  
            setPercentageDailyColor(percentageColor)
            setColor(priceColor)
            setPercentageDaily(percentage)
            setPrice(numberWithCommas(priceDef))
            setIcon(lastPercentage > percentage ? "▼" : "▲")
  
           if (priceColor !== "white") {
              setTimeout(() => {
                  setColor("white")
              }, 1000);
           }
      
            lastPriceDef = priceDef;
            lastPercentage = percentage;
          } 
     } catch(error) {
         console.log(error);
         webSocket = null
         webSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${coinSymbol}${currencySymbol}@ticker`);
     }

    return () => {
            setPrice(0);
            setPercentageDaily(0);
            setPercentageDailyColor(0);
            setColor("#fff");
            setIcon("▲");
            webSocket.close()
            //webSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${coinSymbol}${currencySymbol}@ticker`);
       }
    }, [coinSymbol, currency]);

     return (
         <Link
          key={coin.id}
          className={classes.carouselItem}
          to={`/coins/${coin.id}`}
         >
             <div style={{
                 paddingBlock: 6,
                 paddingInline: 6,
                 borderRadius: 10,
                 position: "absolute",
                 top: 0,
                 right: 10,
                 backgroundColor: "#292929"
             }}>
                 <Typography variant="subtitle2">
                    # {coin.market_cap_rank ? coin.market_cap_rank : "N/A"}
                 </Typography>
             </div>
             <img src={coin?.image} alt={coin?.name} height={80} style={{marginBottom: 10, borderRadius: 20, marginTop: 15}} />
             <span>
                 {coin?.symbol} &nbsp;
                 <span style={{
                     color: percentageDailyColor
                 }}>
                   {icon} {percentageDaily} %
                 </span>
             </span>
             <span style={{ fontSize: 22, fontWeight: 500, color: color }}>
                {symbol} {price}
             </span>
         </Link>
     )
}

export default CoinItem