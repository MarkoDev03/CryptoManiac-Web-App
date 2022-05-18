import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'

const useStyles = makeStyles(() => ({
     banner: {
        backgroundImage: `url(./banner.jpg)`,
        backgroundAttachment:"fixed"
     },
     bannerContainer: {
        height: 600,
        display: "flex",
        flexDirection: "column",
        paddingTop: 75,
        justifyContent: "space-around",
     },
     tagLine: {
       display: "flex",
       flexDirection: "column",
       justifyContent: "center",
       alignItems:"center",
       textAlign: "center",
       width: "100%"
     }
}))

const Banner = () => {

  const classes = useStyles()

  return (
        <div className={classes.banner}>
           <Container className={classes.bannerContainer}>
              <div className={classes.tagLine}>
                <Typography 
                variant='h2'
                style={{
                  fontWeight:"bold",
                  marginBottom: 10,
                  fontFamily: "Montserrat"
                }}>
                   CryptoManiac
                </Typography>
                <Typography 
                 variant="subtitle2"
                 style={{
                    color: "darkgray",
                    fontFamily: "Montserrat",
                    textTransform: "capitalize",
                    fontWeight: 700
                 }}
                >
                   Get All The Info Regarding Your Favorite Crypto Currency
                </Typography>
              </div> 
              <Carousel />
           </Container>
        </div>
  )
}

export default Banner