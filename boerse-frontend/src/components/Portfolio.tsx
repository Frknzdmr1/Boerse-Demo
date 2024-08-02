import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Button, Box, Text, Stack, Heading, Divider } from '@chakra-ui/react';

type Props = {
    userId: string
}
type Stock = {
    symbol: string,
    menge: number,
    durchschnittlicherKaufpreis: number
}

type Portfolio = {
    id: string,
    portfolioAktien: Stock[]
}

const Portfolio = ({ userId }: Props): React.ReactElement => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [newStockSymbol, setNewStockSymbol] = useState('');
    const [newStockQuantity, setNewStockQuantity] = useState(0);
    const [portfolio, setPortfolio] = useState<Portfolio>({
        id:"",
        portfolioAktien: []
    });

    const [actions, setActions] = useState<string[]>([]);

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

    const groupStocks = (stocks: Stock[]): Stock[] => {
        const grouped = stocks.reduce((acc: any, stock: Stock) => {
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
            setActions([...actions, `Added ${newStockQuantity} shares of ${newStockSymbol}`]);

            setNewStockSymbol('');
            setNewStockQuantity(0);
        } catch (err) {
            console.error('Error adding stock to portfolio', err);
        }
    };

    const removeStockFromPortfolio = async (symbol: string) => {
        try {
            // Implement the remove stock API call here
            // Example: await axios.post(`http://localhost:8080/portfolio/${portfolio.id}/remove-stock`, { symbol });

            const updatedPortfolio = await axios.get(`http://localhost:8080/portfolio/${userId}`);
            setPortfolio(updatedPortfolio.data);
            setStocks(groupStocks(updatedPortfolio.data.portfolioAktien));
            setActions([...actions, `Removed shares of ${symbol}`]);
        } catch (err) {
            console.error('Error removing stock from portfolio', err);
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
                    placeholder="Aktienticker"
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
                        <Button onClick={() => removeStockFromPortfolio(stock.symbol)} colorScheme="red" size="sm">Remove</Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Portfolio;