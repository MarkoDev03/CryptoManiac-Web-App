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

    let wsCurrency = currency === "USD" ? "usdt" : currency.toLowerCase();
    let wss = `wss://stream.binance.com:9443/ws/${coinSymbol}${wsCurrency}@ticker`;
    let ws = new WebSocket(wss)

     try {

        let wsPrice = null;
        let wsPercentage = null;

        ws.onclose = () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close()
            }
            ws = new WebSocket(wss);
        }

        ws.onerror = () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close()
            }
            ws = new WebSocket(wss);
        }

        ws.onopen = () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close()
            }
            ws = new WebSocket(wss);
        }

        ws.onmessage = (event) => {
            let data = JSON.parse(event.data);
            let priceDef = data.a > 1000 ? parseFloat(data.a).toFixed(0) : data.a < 1000 ? parseFloat(data.a).toFixed(3) : parseFloat(data.a).toFixed(6);
            let percentage = parseFloat(data.P).toFixed(2);
            let wsColor = !wsPrice || wsPrice === priceDef ? "white" : wsPercentage > percentage ? "#FA0A32" : "#16c784" ;
            let percentageColor = wsPercentage > percentage ? "#FA0A32" : "#16c784"

            setPercentageDailyColor(percentageColor)
            setColor(wsColor)
            setPercentageDaily(percentage)
            setPrice(numberWithCommas(priceDef))
            setIcon(wsPercentage > percentage ? "▼" : "▲")
  
           if (wsColor !== "white") {
              setTimeout(() => {
                  setColor("white")
              }, 1000);
            }
      
            wsPrice = priceDef;
            wsPercentage = percentage;
        } 

     } catch(error) {
         console.log(error);
        if (ws.readyState === WebSocket.OPEN) {
            ws.close()
        }
        setTimeout(() => {
            ws = new WebSocket(wss);
        }, 1500);
     }
     
    return () => {
            setPrice(0);
            setPercentageDaily(0);
            setPercentageDailyColor(0);
            setColor("#fff");
            setIcon("▲");
            if (ws.readyState === WebSocket.OPEN) {
                ws.close()
            }
            ws = new WebSocket(wss);
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
                 backgroundColor: "#292929",
                 borderTopLeftRadius: 0,
                 borderBottomRightRadius: 0
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