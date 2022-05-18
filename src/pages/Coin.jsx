import { makeStyles, Typography, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import CoinChart from '../components/CoinChart';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from "../components/Banner/Carousel"

const Coin = () => {

  const { id } = useParams()
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState()

  useEffect(() => {
    const getCoin = async () => {
      const { data } = await axios.get(SingleCoin(id))
      setCoin(data)
    }

    getCoin()
  }, [currency, id]);

  const useStyles = makeStyles((theme) => ({
     container: {
       display: "flex",
       [theme.breakpoints.down("md")]: {
         flexDirection: "column",
         alignItems: "center"
       },
       paddingTop:70
     },
     sidebar: {
       width: "30%",
       [theme.breakpoints.down("md")]: {
         width: "100%"
       },
       display: "flex",
       flexDirection: "column",
       alignItems:"center",
       marginTop: 25,
       borderRight:"2px solid grey",
     },
     heading: {
       fontWeight: "bold",
       fontFamily: "Montserrat",
       marginBottom:5
     },
     value: {
      fontWeight: "bold",
      fontFamily: "Montserrat",
      marginBottom:5,
      color:"darkgray"
    },
     description: {
       width:"100%",
       padding: 25,
       fontFamily: "Montserrat",
       paddingBottom: 15,
       paddingTop: 0,
       textAlign:"justify"
     },
     marketData: {
       alignSelf:"start",
       padding: 25,
       paddingTop: 10,
       width:"100%",
       [theme.breakpoints.down("md")]:{
         display:"flex",
         justifyContent:"space-around"
       },
       [theme.breakpoints.down("sm")]:{
        flexDirection:"column",
        alignItems:"center",
      },
      [theme.breakpoints.down("xs")]:{  
        alignItems:"start",
      }
     }
  }))

  const classes = useStyles()

  if (!coin) {
    return <LinearProgress style={{backgroundColor:"gold"}} />
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom: 20, borderRadius: 20}} />
          <Typography variant='h3' className={classes.heading}>{coin?.name}</Typography>
          <Typography variant="subtitle1" className={classes.description}>{ReactHtmlParser(coin?.description.en.split(". ")[0])}.</Typography>
          <div className={classes.marketData}>
             <span style={{ display: "flex" }}>
               <Typography variant='h6' className={classes.heading}>Rank:&nbsp;&nbsp;</Typography>
               <Typography variant='h6' className={classes.value}>{coin?.market_cap_rank}</Typography>
             </span>
             <span style={{ display: "flex" }}>
               <Typography variant='h6' className={classes.heading}>Current price:&nbsp;&nbsp;</Typography>
               <Typography variant='h6' className={classes.value}>{symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
             </span>
             <span style={{ display: "flex" }}>
               <Typography variant='h6' className={classes.heading}>Market cap:&nbsp;&nbsp;</Typography>
               <Typography variant='h6' className={classes.value}>{symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()])} M</Typography>
             </span>
          </div>
        </div>
        <CoinChart coin={coin} />
      </div>
    </React.Fragment>
  )
}

export default Coin