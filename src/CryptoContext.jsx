import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const Crypto = createContext(null);

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [sort, setSort] = useState("market_cap_desc");
  const [symbol, setSymbol] = useState("$");
  const [load, setLoad] = useState(false);
  const [hour, setHour] = useState("24h");

  useEffect(() => {
    switch (currency) {
      case "USD":
        setSymbol("$");
        break;
      case "EUR":
        setSymbol("€");
        break;
      case "GBP":
        setSymbol("£");
        break;
      case "AUD":
        setSymbol("$");
        break;
      default:
        setSymbol("$");
    }
  }, [currency]);

  return (
    <React.Fragment>
      <Crypto.Provider value={{ currency, symbol, setCurrency, sort, setSort, load, setLoad, hour, setHour }}>
          {children}  
      </Crypto.Provider>
    </React.Fragment>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
