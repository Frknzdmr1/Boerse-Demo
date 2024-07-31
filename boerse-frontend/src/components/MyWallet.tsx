import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Heading, Spinner } from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummyPortfolio = [
    { symbol: 'AAPL', menge: 5 },
    { symbol: 'COKE', menge: 4 },
    { symbol: 'IBM', menge: 3 }
    //{ symbol: 'NVDA', menge: 6 }

];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4560'];

const MyWallet = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStockPrices = async () => {
            try {
                const portfolioWithPrices = await Promise.all(
                    dummyPortfolio.map(async stock => {
                        const response = await axios.get(`http://localhost:8080/aktie/current-price/${stock.symbol}`);
                        //console.log(`Fetched price for ${stock.symbol}:`, response.data);
                        return { ...stock, durchschnittlicherKaufpreis: Number(response.data) };
                    })
                );
                setPortfolio({ portfolioAktien: portfolioWithPrices });
            } catch (error) {
                console.error('Error fetching stock prices', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStockPrices();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (!portfolio || !portfolio.portfolioAktien) {
        return <Text>No portfolio data available.</Text>;
    }

    return (
        <Box p={8} maxW="container.md" mx="auto">
            <Heading as="h2" size="lg" mb={4}>My Wallet</Heading>
            <Box>
                {portfolio.portfolioAktien.map((stock, index) => (
                    <Box key={index} mb={2} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                        <Text>{stock.symbol}: {stock.menge} shares @ €{stock.durchschnittlicherKaufpreis.toFixed(2)} each</Text>
                    </Box>
                ))}
            </Box>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={portfolio.portfolioAktien}
                        dataKey="menge"
                        nameKey="symbol"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                    >
                        {portfolio.portfolioAktien.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default MyWallet;
