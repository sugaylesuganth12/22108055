import axios from 'axios';

const url = 'http://20.244.56.144/evaluation-service/stocks';

export const fetchAllStocks = async () => {
  const response = await axios.get('${url}/stocks');
  return response.data.stocks;
};

export const fetchStockPrices = async (ticker, minutes = 30) => {
  const response = await axios.get('${url}/stocks/${ticker}?minutes=${minutes}');
  return response.data;
};