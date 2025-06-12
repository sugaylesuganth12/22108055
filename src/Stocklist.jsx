import React, { useEffect, useState } from 'react';
import { fetchAllStocks, fetchStockPrices } from './api';

function StockList() {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const loadStocks = async () => {
      try {
        const stockData = await fetchAllStocks();
        setStocks(Object.entries(stockData)); // [["Apple", "AAPL"], ...]
      } catch (err) {
        console.error("Error loading stocks:", err);
      }
    };
    loadStocks();
  }, []);

  const handleStockClick = async (ticker) => {
    setSelectedStock(ticker);
    const priceData = await fetchStockPrices(ticker);
    setPrices(priceData);
  };

  return (
    <div>
      <h2>All Stocks</h2>
      <ul>
        {stocks.map(([name, ticker]) => (
          <li key={ticker} onClick={() => handleStockClick(ticker)}>
            {name} ({ticker})
          </li>
        ))}
      </ul>

      {selectedStock && (
        <>
          <h3>Prices for {selectedStock}</h3>
          <ul>
            {prices.map((p, idx) => (
              <li key={idx}>
                ₹{p.price} at {new Date(p.lastUpdatedAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default StockList;