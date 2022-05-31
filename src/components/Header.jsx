import { AppBar, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography, ButtonBase } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Link } from "react-router-dom"
import { CryptoState } from '../CryptoContext'

const useStyles = makeStyles(() => ({
    title: {
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
      padding: 0,
      margin: 0,
      width:"fit-content",
      marginRight: 25
    },
    link: {
      color:"white",
      marginInline: 7,
      fontSize: 16
    },
    login: {
      color:"white",
      fontSize: 16,
      paddingBlock: 10,
      paddingInline: 20,
      border:"1px solid white",
      backgroundColor:"transparent",
      borderRadius: 5,
      textTransform:"uppercase",
      fontWeight: 500,
      marginLeft: 20,
      marginRight: 5
    },
    register: {
      color:"#14161a",
      marginInline: 5,
      fontSize: 16,
      paddingBlock: 10,
      paddingInline: 20,
      border:"1px solid gold",
      backgroundColor:"gold",
      borderRadius: 5,
      textTransform:"uppercase",
      fontWeight: 500
    }
}))

const Header = () => {

  const [color, setColor] = useState("transparent")

  useEffect(() => {
     window.addEventListener('scroll', () => {
      if (window.scrollY) {
        setColor("#14161a")
      } else {
        setColor("transparent")
      }
     })
  }, []);

  
  const { search } = useLocation()

  const { currency, setCurrency, sort, setSort, load, hour, setHour } = CryptoState()

  const classes = useStyles()
  const history = useHistory()
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark"
    }
  })

  const setCurrencyRoute = (value) => {
    setCurrency(value)

    let q = new URLSearchParams()
    let g = new URLSearchParams(search)

    q.set("sort_by", g.get("sort_by") === null ? "market_cap_desc" : g.get("sort_by"))
    q.set("number", g.get("number") === null ? 1 : g.get("number"))
    q.set("currency", value)
    q.set("time_period", g.get("time_period") === null ? "24h" : g.get("time_period"))

    if (load === false) {
    history.push({
         pathname:"/page",
         search:"?" + q
    })
  }
  }

  const setSortRoute = (value) => {
    setSort(value)

    let q = new URLSearchParams()
    let g = new URLSearchParams(search)

    q.set("sort_by", value)
    q.set("number", g.get("number") === null ? 1 : g.get("number"))
    q.set("currency", g.get("currency") === null ? "USD" : g.get("currency"))
    q.set("time_period", g.get("time_period") === null ? "24h" : g.get("time_period"))

    if (load === false) {
    history.push({
         pathname:"/page",
         search:"?" + q
    })
  }
  }

  const setHourRoute = (value) => {
    setHour(value)

    let q = new URLSearchParams()
    let g = new URLSearchParams(search)

    q.set("sort_by", g.get("sort_by") === null ? "market_cap_desc" : g.get("sort_by"))
    q.set("number", g.get("number") === null ? 1 : g.get("number"))
    q.set("currency", g.get("currency") === null ? "USD" : g.get("currency"))
    q.set("time_period", value)

    if (load === false) {
    history.push({
         pathname:"/page",
         search:"?" + q
    })
  }
  }

  useEffect(() => {
    let g = new URLSearchParams(search)

    if (g.get("currency") != null) {
      let currencies = ["USD", "AUD", "EUR", "GBP"]
      
      if (currencies.includes(g.get("currency"))) {
          setCurrency(g.get("currency"))
      }
    }
  }, [search, setCurrency]);

  //#14161a
  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='fixed'>
            <div style={{backgroundColor:color, display:"flex", justifyContent:"center"}}>
              <Toolbar style={{width:"98%"}}>
                <div style={{ flex:1, display:"flex", justifyContent:"flex-start", alignItems:"center" }}>
                <Typography onClick={() => { history.goBack() }} className={classes.title} variant="h5">CryptoManiac</Typography>
                  <Link to="/" className={classes.link}>Home</Link>
                  <Link to="/" className={classes.link}>Tickers</Link>
                  <Link to="/" className={classes.link}>Favourites</Link>
                  <Link to="/" className={classes.link}>Coins</Link>
                  <ButtonBase className={classes.login}>Log In</ButtonBase>
                  <ButtonBase className={classes.register}>Register</ButtonBase>
                </div>
                <div style={{ display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row" }}>
                <Select variant="outlined" style={{
                  width: 100,
                  height: 40,
                  marginRight: 10
                }}
                 value={currency}
                 onChange={(e) => {setCurrencyRoute(e.target.value)}}
                >
                   <MenuItem value={"USD"}>USD</MenuItem>
                   <MenuItem value={"EUR"}>EUR</MenuItem>
                   <MenuItem value={"GBP"}>GBP</MenuItem>
                   <MenuItem value={"AUD"}>AUD</MenuItem>
                </Select>
                <Select variant="outlined" style={{
                  width: 180,
                  height: 40,
                  marginRight: 10
                }}
                 value={sort}
                 onChange={(e) => {setSortRoute(e.target.value)}}
                >
                   <MenuItem value={"market_cap_asc"}>Market Cap ASC</MenuItem>
                   <MenuItem value={"market_cap_desc"}>Market Cap Desc</MenuItem>
                   <MenuItem value={"volume_asc"}>Volume ASC</MenuItem>
                   <MenuItem value={"volume_desc"}>Volume DESC</MenuItem>
                   <MenuItem value={"geckoasc"}>Gecko ASC</MenuItem>
                   <MenuItem value={"geckodesc"}>Gecko DESC</MenuItem>
                </Select>
                <Select variant="outlined" style={{
                  width: 100,
                  height: 40,
                  marginRight: 10
                }}
                 value={hour.toString()}
                 onChange={(e) => {setHourRoute(e.target.value)}}
                >
                   <MenuItem value={"1h"}>1H</MenuItem>
                   <MenuItem value={"24h"}>24H</MenuItem>
                   <MenuItem value={"7d"}>7D</MenuItem>
                   <MenuItem value={"14d"}>14D</MenuItem>
                   <MenuItem value={"30d"}>30D</MenuItem>
                   <MenuItem value={"60d"}>60D</MenuItem>
                   <MenuItem value={"200d"}>200D</MenuItem>
                   <MenuItem value={"1y"}>1Y</MenuItem>
                </Select>
                </div>
              </Toolbar>
            </div>
        </AppBar>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Header