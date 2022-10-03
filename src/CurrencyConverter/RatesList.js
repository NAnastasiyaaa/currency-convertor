import React, { useEffect, useState } from "react";
import axios from "axios";
import key from "./key.json";
import flagImg from './images/flag.png';

function RatesList() {
  const [ratesList, setRatesList] = useState([]);

  useEffect(() => {
    const initUahRates = async () => {
      let usdRates = await getRates("USD");
      let eurRates = await getRates("EUR");

      setRatesList([
        { rate: usdRates["UAH"], symbol: "USD" },
        { rate: eurRates["UAH"], symbol: "EUR" },
      ]);
    };

    initUahRates();
  }, []);

  const getRates = async (base) => {
    const res = await axios.get(
      `https://api.apilayer.com/exchangerates_data/latest?base=${base}`,
      {
        headers: {
          apikey: key["currency_api_key"],
        },
      }
    );

    return res.data.rates;
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor:'#f3f3f3',
        border: '1px solid #e7e7e7',
        marginBottom:'20px',
        color:"#666"
      }}
    >
      <ul className="list-group">
        {ratesList.map((d) => (
          <li className="list-group-item" key={d.symbol}>
          {d.symbol} - {d.rate}<img src={flagImg} alt="" style={{width:'20px', height:'20px', marginLeft:'10px', marginTop:'3px'}}></img>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RatesList;
