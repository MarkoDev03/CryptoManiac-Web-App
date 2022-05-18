import { AppBar, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { CryptoState } from '../CryptoContext'

const useStyles = makeStyles(() => ({
    title: {
      color: "gold",
      flex: 1,
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer"
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

  const { currency, setCurrency } = CryptoState()

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

  //#14161a
  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='fixed'>
            <div style={{backgroundColor:color, display:"flex", justifyContent:"center"}}>
              <Toolbar style={{width:"60%"}}>
                <Typography onClick={() => { history.push("/") }} className={classes.title} variant="h5">CryptoManiac</Typography>
                <Select variant="outlined" style={{
                  width: 100,
                  height: 40,
                  marginRight: 15
                }}
                 value={currency}
                 onChange={(e) => {setCurrency(e.target.value)}}
                >
                   <MenuItem value={"USD"}>USD</MenuItem>
                   <MenuItem value={"EUR"}>EUR</MenuItem>
                   <MenuItem value={"GBP"}>GBP</MenuItem>
                   <MenuItem value={"AUD"}>AUD</MenuItem>
                </Select>
              </Toolbar>
            </div>
        </AppBar>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Header