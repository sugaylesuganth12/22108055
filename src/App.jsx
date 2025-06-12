import React, { useState, useEffect } from 'react';

function App() {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch("http://20.244.56.144/evaluation-service/stocks/NVDA?minutes=50", {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ5NzA5OTI5LCJpYXQiOjE3NDk3MDk2MjksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjIzNWFmNDUxLTZjZTMtNGZjNi1iNmQ0LTRmNDVhMDBlZWZmYSIsInN1YiI6InN1Z2F5bGVzdWdhbnRoMTJAZ21haWwuY29tIn0sImVtYWlsIjoic3VnYXlsZXN1Z2FudGgxMkBnbWFpbC5jb20iLCJuYW1lIjoic3VnYW50aCBhIiwicm9sbE5vIjoiMjIxMDgwNTUiLCJhY2Nlc3NDb2RlIjoiTVZHd0VGIiwiY2xpZW50SUQiOiIyMzVhZjQ1MS02Y2UzLTRmYzYtYjZkNC00ZjQ1YTAwZWVmZmEiLCJjbGllbnRTZWNyZXQiOiJwYlFjUmpzVGNTdUdha1B4In0.S4QKmJXiOjWspDArmDORGDi-wJ-9uPvCc9sIkIqf6fk",
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Unauthorized or Bad Request");
            }
            return res.json();
        })
        .then((data) => {
            console.log("API Data:", data);
            setStocks(Array.isArray(data) ? data : [data]);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Fetch Error:", err.message);
            setLoading(false);
        });
    }, []);

    return (
        <div className="App">
            <h1>Stock Dashboard</h1>
            <h2>All Stocks</h2>
            {loading ? (
                <div>Loading...</div>
            ) : stocks.length > 0 ? (
                <ul>
                    {stocks.map((stock, index) => (
                        <li key={index}>
                            Price: ${stock.price} — Updated At: {stock.lastUpdatedAt}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
}

export default App;