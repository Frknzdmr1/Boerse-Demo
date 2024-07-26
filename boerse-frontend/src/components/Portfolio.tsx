import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Button, Box, Text } from '@chakra-ui/react';

const Portfolio = () => {
    const [stocks, setStocks] = useState([]);
    const [newStockSymbol, setNewStockSymbol] = useState('');
    const [newStockQuantity, setNewStockQuantity] = useState(0);
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        // Fetch the portfolio for a specific user
        const fetchPortfolio = async () => {
            const response = await axios.get(`http://localhost:8080/portfolio/{userId}`);
            console.log(response.data);
            setPortfolio(response.data);
            setStocks(response.data.portfolioAktien);
        };

        fetchPortfolio();
    }, []);

    const addStockToPortfolio = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/portfolio/${portfolio.id}/add-stock`, {
                symbol: newStockSymbol,
                menge: newStockQuantity,
                durchschnittlicherKaufpreis: 0 // Adjust as necessary
            });
            setStocks([...stocks, response.data]);
            setNewStockSymbol('');
            setNewStockQuantity(0);
        } catch (err) {
            console.error('Error adding stock to portfolio', err);
        }
    };

    return (
        <Box>
            <Input
                type="text"
                value={newStockSymbol}
                onChange={(e) => setNewStockSymbol(e.target.value.toUpperCase())}
                placeholder="Enter stock symbol"
                mb={4}
            />
            <Input
                type="number"
                value={newStockQuantity}
                onChange={(e) => setNewStockQuantity(Number(e.target.value))}
                placeholder="Enter quantity"
                mb={4}
            />
            <Button onClick={addStockToPortfolio} colorScheme="teal" mb={4}>Add Stock to Portfolio</Button>
            <Box>
                {stocks.map((stock) => (
                    <Text key={stock.id}>{stock.symbol}: {stock.menge}</Text>
                ))}
            </Box>
        </Box>
    );
};

export default Portfolio;
