import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.min.css";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";
import Typography from "@material-ui/core/Typography";
import CoinItem from "./CoinItem";
import SwiperCore, { Autoplay } from 'swiper';
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection:"column"
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    backgroundColor:"rgba(20, 22, 26, 0.9)",
    borderRadius: 10,
    marginInline: 10,
    paddingBlock: 15
  },
  icon: {
      marginTop: 20
  }
}));

export function numberWithCommas(x = 0) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  SwiperCore.use([Autoplay])

  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      setTrending([]);
      setLoading(true)
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
      setLoading(false)
    };

    fetchTrendingCoins();
  }, [currency]);

  return (
    <React.Fragment>
      <div className={classes.carousel}>
      <Typography 
                 variant="h6"
                 style={{
                    color: "gold",
                    fontFamily: "Montserrat",
                    textTransform: "capitalize",
                    fontWeight: 600,
                    marginBottom:10
                 }}
                >
                 Top Trading coins
        </Typography>
       {
         loading  ? (
           <LinearProgress style={{ backgroundColor: "gold", width:"0%" }} />
         ): (
          <Swiper
          slidesPerView={6}
          style={{
            width:"100%",
          }}
         >
         {trending.map((coin, index) => (
           <SwiperSlide key={index} virtualIndex={index}>
             <CoinItem coinSymbol={coin.symbol} symbol={symbol} classes={classes} coin={coin} currency={currency} />
           </SwiperSlide>
         ))}
         </Swiper>
         )
       }
      </div>
    </React.Fragment>
  );
};

export default Carousel;
