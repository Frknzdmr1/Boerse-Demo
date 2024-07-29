import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Button, Box, Text, Stack, Heading, Divider } from '@chakra-ui/react';

const Portfolio = ({ userId }) => {
    const [stocks, setStocks] = useState([]);
    const [newStockSymbol, setNewStockSymbol] = useState('');
    const [newStockQuantity, setNewStockQuantity] = useState(0);
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/portfolio/${userId}`);
                console.log("Fetched portfolio:", response.data);
                setPortfolio(response.data);
                setStocks(groupStocks(response.data.portfolioAktien));
            } catch (error) {
                console.error('Error fetching portfolio', error);
            }
        };

        fetchPortfolio();
    }, [userId]);

    const groupStocks = (stocks) => {
        const grouped = stocks.reduce((acc, stock) => {
            if (acc[stock.symbol]) {
                acc[stock.symbol].menge += stock.menge;
            } else {
                acc[stock.symbol] = { ...stock };
            }
            return acc;
        }, {});
        return Object.values(grouped);
    };

    const addStockToPortfolio = async () => {
        try {
            await axios.post(`http://localhost:8080/portfolio/${portfolio.id}/add-stock`, {
                symbol: newStockSymbol,
                menge: newStockQuantity,
                durchschnittlicherKaufpreis: 0 // Adjust as necessary
            });

            const updatedPortfolio = await axios.get(`http://localhost:8080/portfolio/${userId}`);
            setPortfolio(updatedPortfolio.data);
            setStocks(groupStocks(updatedPortfolio.data.portfolioAktien));

            setNewStockSymbol('');
            setNewStockQuantity(0);
        } catch (err) {
            console.error('Error adding stock to portfolio', err);
        }
    };

    return (
        <Box p={4} maxW="container.md" mx="auto">
            <Heading as="h2" size="lg" mb={4}>Portfolio Management</Heading>
            <Stack spacing={4} mb={8}>
                <Input
                    type="text"
                    value={newStockSymbol}
                    onChange={(e) => setNewStockSymbol(e.target.value.toUpperCase())}
                    placeholder="Enter stock symbol"
                    variant="filled"
                />
                <Input
                    type="number"
                    value={newStockQuantity}
                    onChange={(e) => setNewStockQuantity(Number(e.target.value))}
                    placeholder="Enter quantity"
                    variant="filled"
                />
                <Button onClick={addStockToPortfolio} colorScheme="teal">Add Stock to Portfolio</Button>
            </Stack>
            <Divider mb={8} />
            <Box>
                <Heading as="h3" size="md" mb={4}>Portfolio</Heading>
                {stocks.map((stock, index) => (
                    <Box key={index} mb={2} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                        <Text>{stock.symbol}: {stock.menge} shares @ €{stock.durchschnittlicherKaufpreis.toFixed(2)} each</Text>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Portfolio;