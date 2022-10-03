import React, { useState, useEffect } from "react";
import { Card } from "antd";
import axios from "axios";
import CurrencyDropdown from "./CurrencyDropdown.js";
import key from "./key.json";

const Convertor = (config) => {
  const [initialState, setState] = useState({
    base: "USD",
    convertTo: "EUR",
    result: "",
    date: "",
  });

  const [amount, setAmount] = useState("");
  const { base, convertTo, result, date } = initialState;

  useEffect(() => {
    if (amount === isNaN || amount === "") {
      return;
    } else {
      const getCurrencyconvertTo = async () => {
        const response = await axios.get(
          `https://api.apilayer.com/exchangerates_data/latest?base=${base}`,
          {
            headers: {
              apikey: key["currency_api_key"],
            },
          }
        );

        const date = response.data.date;
        const result = (response.data.rates[convertTo] * amount).toFixed(3);
        setState({
          ...initialState,
          result,
          date
        });
      };
      getCurrencyconvertTo();
    }
  }, [amount, base, convertTo]);

  const getConvertResult = () => {
    if (amount === "") return "0";

    return result === null ? "Calculating..." : result;
  };

  const onChangeInput = (e) => {
    setAmount(e.target.value);
    setState({
      ...initialState,
      result: null,
      date: null,
    });
  };
  const handleSelect = (e) => {
    setState({
      ...initialState,
      [e.target.name]: e.target.value,
      result: null,
    });
  };

  const handleSwap = (e) => {
    e.preventDefault();
    setState({
      ...initialState,
      convertTo: base,
      base: convertTo,
      result: null,
    });
  };

  return (
    <div className="container ml-5">
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "300px",
        }}
      >
         <h1>Currency Convertor</h1>
        <div
          style={{
            padding: "30px",
            background: "#ececec",
          }}
        >
        
          <Card
            bordered={false}
            style={{ width: 550, fontSize: "45px", color: "green" }}
          >
            
            {amount && (
              <h6>
                {amount} {base} = {getConvertResult()} {convertTo}
              </h6>
            )}
            {amount && date && (
              <p style={{ color: "green", fontSize: "18px" }}>Date: {date}</p>
            )}

            <div className="row">
              <div className="col-lg-10">
                <form className="form-inline mb-4">
                  <input
                    type="number"
                    value={amount}
                    onChange={onChangeInput}
                    className="form-control form-control-lg mx-5"
                  />
                  <CurrencyDropdown
                    name="base"
                    value={base}
                    handleChange={handleSelect}
                  />
                </form>
                <form className="form-inline mb-4">
                  <input
                    disabled={true}
                    value={
                      amount === ""
                        ? "0"
                        : result === null
                        ? "Calculating..."
                        : result
                    }
                    className="form-control form-control-lg mx-5"
                  />
                  <CurrencyDropdown
                    name="convertTo"
                    value={convertTo}
                    handleChange={handleSelect}
                  />
                </form>
              </div>
              <div className="col-lg-2 align-self-center">
                <h1 onClick={handleSwap} style={{ cursor: "pointer" }}>
                  &#8595;&#8593;
                </h1>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Convertor;
