import { makeStyles, Typography, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import CoinChart from '../components/CoinChart';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from "../components/Banner/Carousel"
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Coin = () => {

  const { id } = useParams()
  const [coin, setCoin] = useState();
  const [supply, setSupply] = useState(0)
  const [supplyPercentage, setSupplyPercentage] = useState(0)

  const { currency, symbol } = CryptoState()


  useEffect(() => {
    const getCoin = async () => {
      const { data } = await axios.get(SingleCoin(id))
      setCoin(data)
    }

    getCoin()
  }, [currency, id]);

  useEffect(() => {
    if (coin) {
    setSupply(isNaN(coin.market_data.circulating_supply / coin.market_data.total_supply) ? 0 : coin.market_data.circulating_supply / coin.market_data.total_supply)
     setSupplyPercentage((supply * 100).toFixed(0));
    }
  }, [coin?.market_data?.circulating_supply, coin?.market_data?.total_supply, coin, supply]);

  const useStyles = makeStyles((theme) => ({
     container: {
       display: "flex",
       overflow:"hidden",
       height:"100vh",
       maxHeight:"100vh",
       [theme.breakpoints.down("md")]: {
         flexDirection: "column",
         alignItems: "center",
         overflow:"auto",
       },
       paddingTop:70
     },
     sidebar: {
       width: "30%",
       [theme.breakpoints.down("md")]: {
         width: "100%",
         maxHeight: "fit-content",
       },
       display: "flex",
       flexDirection: "column",
       alignItems:"center",
       marginTop: 25,
       overflowY:"auto",
       maxHeight: "100vh",
       paddingBottom: 25
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
     },
     atl: {
       backgroundColor:"#21252b",
       width:"95%",
       paddingBlock:15,
       borderRadius: 20,
       display:"flex",
       justifyContent:"space-between",
       alignItems:"center",
       flexDirection:"column",
       paddingInline: 15,
       paddingBottom: 25,
       boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
     },
     borderPrices: {
       width: "40%",
       paddingBlock: 10,
       display:"flex",
       justifyContent:"center",
       alignItems:"center",
       flexDirection:"column",
       color:"white",
       borderRadius: 20,
       boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
     },
     title: {
       fontSize: 20
     },
     valueBorder: {
       fontSize: 17,
       fontWeight: 500
     },
     prices: {
       width: "100%",
       display:"flex",
       justifyContent:"space-between",
       alignItems:"center",
       flexDirection:"row",
     },
     progress: {
       backgroundColor:"#14161a",
       borderRadius: "50%",
       padding: 25,
       marginTop: 30,
       width:"60%",
       boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
     },
     component: {
       width:"95%",
       display:"flex",
       justifyContent:"flex-start",
       alignItems:"flex-start",
       flexDirection:"column",
       marginTop: 15,
     },
     table: {
       display:"flex",
       justifyContent:"center",
       alignItems:"flex-start",
       flexDirection:"row",
       padding: 10,
       backgroundColor:"#21252b",
       width:"100%",
       borderRadius: 20,
       marginTop: 8,
       paddingBlock: 16,
       boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
     },
     block: {
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      flexDirection:"column",
      width:"15%"
     },
     devider: {
       width:"100%",
       height: 1,
       borderBottom:"3px solid #444",
       marginBlock: 10,
     },
     headline: {
       fontSize: 22,
       marginLeft: 10
     },
     blocks: {
      display:"flex",
      justifyContent:"flex-start",
      alignItems:"flex-start",
      flexDirection:"column",
      padding: 10,
      backgroundColor:"#21252b",
      width:"100%",
      borderRadius: 20,
      marginTop: 8,
      paddingBlock: 5,
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
     },
     item: {
       width:"100%",
       display:"flex",
       justifyContent:"space-between",
       alignItems: "center",
       flexDirection:"row",
       paddingBlock: 10
     },
     ranks: {
       width: 25,
       height: 25,
       textAlign:"center",
       backgroundColor:"#444",
       color:"white",
       borderRadius: "50%",
       boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
     },
     ranksTitle: {
       fontSize: 20
     },
     primary: {
       width:"100%",
       display:"flex",
       justifyContent:"flex-start",
       alignItems:"center",
       flexDirection:"row",
       padding: 0,
       marginBottom: 10
     },
     logoWrapper: {
        backgroundColor:"#21252b",
        padding: 20,
        borderRadius: 30,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        position:"relative",
        zIndex: 2
     },
     rankNum: {
       width: 40,
       height: 40,
       color:"#fff",
       backgroundColor:"#2d323b",
       borderRadius: "50%",
       boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;",
       position:"absolute",
       top: -15,
       right: -10,
       zIndex: 9,
       fontWeight: 500,
       display:"flex",
       justifyContent:"center",
       alignItems:"center",
       lineHeight: 40
     },
     names: {
       display:"flex",
       justifyContent:"space-between",
       alignItems:"flex-start",
       flexDirection:"column",
       height: 100,
       flexGrow: 1,
       padding: 10,
       marginLeft: 15
     },
     pricesWS: {
      display:"flex",
      justifyContent:"space-between",
      alignItems:"flex-end",
      flexDirection:"row",
      width:"100%"
     },
     wsPrice: {
       fontSize: 25,
       fontWeight: 700
     },
     waPercentage: {
       paddingInline: 12,
       paddingBlock: 7,
       borderRadius: 20,
       backgroundColor:"#FA0A32",
       boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;",
       fontSize: 17
     },
     name: {
       fontSize: 25,
       color:"#a8a8a8"
     },
     blckitm: {
       width:"48%",
       backgroundColor:"#21252b",
       borderRadius: 20,
       boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;",
       display:"flex",
       justifyContent:"space-between",
       alignItems:"center",
       flexDirection:"row",
       paddingBlock: 8,
       paddingInline: 20,
       fontSize: 23
     },
     border:{
       height: 65,
       borderRight:"2px solid #444",
       marginRight: 15
     },
     borderDiv: {
       marginInline:"auto",
       marginBottom: 30,
       width:"45%",
       height: 7,
       borderRadius: 20,
       backgroundColor:"#2d323b",
       boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;"
     }
  }))

  const classes = useStyles()

  if (!coin) {
    return <LinearProgress style={{backgroundColor:"gold"}} />
  }

  const BorderPrices = ({ backgroundColor, value, title }) => {
    return (
      <div className={classes.borderPrices} style={{ backgroundColor: backgroundColor }}>
          <b><p className={classes.title}>{title}</p></b>
          <p className={classes.valueBorder}>{symbol} {value}</p>
      </div>
    )
  }

  let change24h = coin?.market_data.price_change_percentage_24h ? coin?.market_data.price_change_percentage_24h.toFixed(1) : 0;
    let change7d = coin?.market_data.price_change_percentage_7d ? coin?.market_data.price_change_percentage_7d.toFixed(1) : 0;
    let chagne14d = coin?.market_data.price_change_percentage_14d ? coin?.market_data.price_change_percentage_14d.toFixed(1) : 0;
    let chagne30d = coin?.market_data.price_change_percentage_30d ? coin?.market_data.price_change_percentage_30d.toFixed(1) : 0;
    let chagne60d = coin?.market_data.price_change_percentage_60d ? coin?.market_data.price_change_percentage_60d.toFixed(1) : 0;
    let chagne200d = coin?.market_data.price_change_percentage_200d ? coin?.market_data.price_change_percentage_200d.toFixed(1) : 0;
    let chagne1y = coin?.market_data.price_change_percentage_1y ? coin?.market_data.price_change_percentage_1y.toFixed(1) : 0;
  
    const priceChanegData = [
      {title:"24h", value: change24h, color:change24h > 0 ? "#16c784" : "#FA0A32", arrow:change24h > 0 ? true : false },
      {title:"7d", value: change7d, color:change7d > 0 ? "#16c784" : "#FA0A32", arrow:change7d > 0 ? true : false },
      {title:"14d", value: chagne14d, color:chagne14d > 0 ? "#16c784" : "#FA0A32", arrow:chagne14d > 0 ? true : false },
      {title:"30d", value: chagne30d, color:chagne30d > 0 ? "#16c784" : "#FA0A32", arrow:chagne30d > 0 ? true : false },
      {title:"60d", value: chagne60d, color:chagne60d > 0 ? "#16c784" : "#FA0A32", arrow:chagne60d > 0 ? true : false },
      {title:"200d", value: chagne200d, color:chagne200d > 0 ? "#16c784" : "#FA0A32", arrow:chagne200d > 0 ? true : false },
      {title:"1y", value: chagne1y, color:chagne1y > 0 ? "#16c784" : "#FA0A32", arrow:chagne1y > 0 ? true : false },
    ]

    const ranks = [
      {title:"Market Cap rank", value: coin?.market_cap_rank ? coin?.market_cap_rank : "N/A", color:"white", border:true, isPercentage:false, isRank: true},
      {title:"Coingecko rank", value: coin?.coingecko_rank ? coin?.coingecko_rank : "N/A", color:"white", border:false, isPercentage:false, isRank: true},
    ]

  return (
    <React.Fragment>
      <div className={classes.container} >
        <div className={classes.sidebar}>

        <div className={classes.component}>
           <div className={classes.primary}>
               <div className={classes.logoWrapper}>
                    <img src={coin?.image?.large} alt={coin?.name} height="90" style={{borderRadius: "50%"}} />
                    <span className={classes.rankNum}>#{ranks[0].value}</span>
               </div>
               <div className={classes.names}>
                  <div className={classes.pricesWS}>
                  <div style={{display:"flex", justifyContent:"flex-start", alignItems:"flex-start", flexDirection:"column"}}>
                  <Typography variant='h6' className={classes.name}>{coin?.name} / {coin?.symbol}</Typography>
                  <Typography variant='h6' className={classes.wsPrice}>{symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
                  </div> 
                    <Typography variant='h6' className={classes.waPercentage}>▼ {(coin?.market_data?.price_change_percentage_24h).toFixed(2)}%</Typography>
                    </div>
               </div>
           </div>
        </div>
        <div className={classes.component}>
           <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", flexDirection:"row", width:"100%", marginBottom: 20}}>
              <div className={classes.blckitm}>
                   <span>1.00</span>
                  <div  style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                  <div className={classes.border}></div>
                  <img src={coin?.image.large} alt={coin?.name} height="45" style={{borderRadius: "50%"}} />
                  </div>
              </div>
              <div className={classes.blckitm}>
                   <span>{symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</span>
             <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
             <div className={classes.border}></div>
                  <span><b>{currency}</b></span>
             </div>
              </div>
           </div>
        </div>

        <div className={classes.component}>
        <div className={classes.borderDiv}></div>
        </div>
      
          <div className={classes.atl}>
              <div className={classes.prices}>
                <BorderPrices title="24h High" backgroundColor="#16c784" value={coin?.market_data.high_24h ? coin?.market_data.high_24h[currency.toLowerCase()] : "N/A"} />
                <BorderPrices title="24h Low" backgroundColor="#FA0A32" value={coin?.market_data.low_24h ? coin?.market_data.low_24h[currency.toLowerCase()] : "N/A"} />
              </div>
              <div className={classes.progress}>
                 <CircularProgressbarWithChildren  value={supply === Infinity ? 0 : (supply * 100)} maxValue={100} styles={buildStyles({
                
                    pathColor: `#16c784`,
                    textColor: '#fff',
                    trailColor: '#0f0f0f',
                    backgroundColor: '#0f0f0f',
                    
                  })}>
                     <h5 style={{fontSize: 48}}>{supplyPercentage === Infinity || supplyPercentage === "Infinity"? "N/A" : supplyPercentage + "%"}</h5>
                     <span style={{fontSize: 22}}>Supply</span>
                  </CircularProgressbarWithChildren>
              </div>
          </div>
          <div className={classes.component}>
            <span className={classes.headline}>Price change percentage</span>
            <div className={classes.table}>
               {
                 priceChanegData.map((data) => (
                   <div className={classes.block} key={data.title}>
                       <span style={{color:"white" , fontWeight: 700 }}>{data.title}</span>
                       <div className={classes.devider}></div>
                       <span style={{ color:data.color, fontWeight: 700 }}>{data.arrow === false ? "▼" : "▲"}</span>
                       <span style={{ color:data.color, fontWeight: 700 }}>{data.value}%</span>
                    </div>
                 ))
               }
            </div>
          </div>
          <div className={classes.component}>
            <span className={classes.headline}>Ranks</span>
            <div className={classes.blocks}>
               {
                 ranks.map((rank) => (
                  <div className={classes.item} key={rank.title} style={{borderBottom: rank.border === true? "2px solid #444" : "none" }}>
                     <span className={classes.ranksTitle}>{rank.title}</span>
                     <span className={classes.ranks}>{rank.value}</span>
                </div>
                 ))
               }
            </div>
          </div>
        </div>
        <CoinChart coin={coin} />
      </div>
    </React.Fragment>
  )
}

export default Coin