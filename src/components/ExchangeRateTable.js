import React, { useState, useEffect } from "react";
import axios from "axios";

function ExchangeRateTable() {
  const [rates, setRates] = useState([]);
  const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        console.log("API Key:", apiKey); // Debugging: cek API key

        const response = await axios.get(`https://api.currencyfreaks.com/latest?apikey=${apiKey}`);
        console.log("API Response Data:", response.data); // Debugging: cek response dari API

        const data = response.data;

        const filteredRates = currencies.map((currency) => ({
          currency,
          buy: (parseFloat(data.rates[currency]) * 1.05).toFixed(4),
          exchangeRate: parseFloat(data.rates[currency]).toFixed(4),
          sell: (parseFloat(data.rates[currency]) * 0.95).toFixed(4),
        }));

        setRates(filteredRates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates();
  }, []);

  return (
    <div style={{ backgroundColor: "midnightblue", padding: "40px", color: "white", textAlign: "center" }}>
      <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", borderBottom: "1px solid white" }}>Currency</th>
            <th style={{ padding: "10px", borderBottom: "1px solid white" }}>We Buy</th>
            <th style={{ padding: "10px", borderBottom: "1px solid white" }}>Exchange Rate</th>
            <th style={{ padding: "10px", borderBottom: "1px solid white" }}>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.currency}>
              <td style={{ padding: "10px" }}>{rate.currency}</td>
              <td style={{ padding: "10px" }}>{rate.buy}</td>
              <td style={{ padding: "10px" }}>{rate.exchangeRate}</td>
              <td style={{ padding: "10px" }}>{rate.sell}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Rates are based from 1 USD. This application uses API from currencyfreaks.com.</p>
    </div>
  );
}

export default ExchangeRateTable;
