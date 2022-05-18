import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Coin from './pages/Coin';
import { makeStyles } from '@material-ui/core';

function App() {

  const useStyles = makeStyles(() => ({
     App: {
        backgroundColor: "#14161a",
        color: "white",
        minHeight:"100vh"
     }
  }))

  const classes = useStyles()

  return (
     <React.Fragment>
        <BrowserRouter>
         <div className={classes.App}>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/coins/:id" component={Coin} />
         </div>
        </BrowserRouter>
     </React.Fragment>
  );
}

export default App;