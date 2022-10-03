import React from "react";

const CurrencyDropdown = ({ value, handleChange, name }) => {
  const currencies = ["USD", "UAH", "EUR"];

  return (
    <select
      name={name}
      value={value}
      onChange={e => handleChange(e)}
      className="form-control form-control-lg"
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default CurrencyDropdown;
