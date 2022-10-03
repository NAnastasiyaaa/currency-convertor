import "./App.css";
import Convertor from "./CurrencyConverter/Convertor";

import RatesList from "./CurrencyConverter/RatesList";

function App() {
  return (
    <div className="App">
      <RatesList />
      <Convertor/>
    </div>
  );
}

export default App;
