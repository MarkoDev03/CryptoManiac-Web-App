import { createTheme, ThemeProvider, CircularProgress, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));
const CoinChart = ({ coin }) => {


  const classes = useStyles()

  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1)

  const { currency } = CryptoState()

  useEffect(() => {
  const fetchhistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
   }
   fetchhistoricData()

   return () => {
     setHistoricData([])
   }
  }, [coin.id, days, currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark"
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          historicData.length === 0 ? (
            <CircularProgress style={{ color:"gold" }} size={250} thickness={1} />
          ) : (
           
            <>
               <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
              
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                    backgroundColor: "#14161a",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 3.5,
                    hoverBorderWidth: 10
                  },
                },
                interaction: {
                  intersect: false,
                  mode: 'index',
                  borderColor:"#fff"
                },
              }}
            /> 
            <div style={{ display:"flex", marginTop: 20, justifyContent:"space-around", flexDirection: "row", width:"100%" }}>
            {chartDays.map((day) => (
              <SelectButton key={day.value} onClick={() => setDays(day.value)} selected={day.value === days}>{day.label}</SelectButton>
            ))}
            </div>
        </>
          )
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinChart