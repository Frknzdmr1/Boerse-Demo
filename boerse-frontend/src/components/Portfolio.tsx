import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Button, Box, Text, Stack, Heading, Divider } from '@chakra-ui/react';
import authentifizierungsUtils, {getUserId} from "@/pages/Login/AuthUtils/AuthentifizierungsUtils";

type Stock = {
    symbol: string,
    menge: number,
    durchschnittlicherKaufpreis: number
}

type Portfolio = {
    id: string,
    portfolioAktien: Stock[]
}

const Portfolio = (): React.ReactElement => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [newStockSymbol, setNewStockSymbol] = useState('');
    const [newStockQuantity, setNewStockQuantity] = useState(0);
    const [portfolio, setPortfolio] = useState<Portfolio>({
        id:"",
        portfolioAktien: []
    });


    const [actions, setActions] = useState<string[]>([]);
    const tokenResponse = authentifizierungsUtils.getAktuelleAuthResponse();

    useEffect(() => {
        const token = tokenResponse?.accessToken;
        if (!tokenResponse || !tokenResponse.accessToken) {
            throw new Error("No access token available. Please log in.");
        }
        const userId = getUserId();
        const fetchPortfolio = async () => {
            console.log("hallo")
            try {
                const response = await axios.get(`http://localhost:8080/portfolio/${userId}`,
                    {
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });
                const data = await response.data;
                console.log(data)
                setPortfolio(data);
                setStocks(groupStocks(data.portfolioAktien));
            } catch (error) {
                console.error('Error fetching portfolio', error);
            }
        };

        fetchPortfolio();
    }, []);

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
        const tokenResponse = authentifizierungsUtils.getAktuelleAuthResponse();
        const token = tokenResponse?.accessToken;
        if (!tokenResponse || !tokenResponse.accessToken) {
            throw new Error("No access token available. Please log in.");
        }
        const userId = getUserId();
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
        const tokenResponse = authentifizierungsUtils.getAktuelleAuthResponse();
        const token = tokenResponse?.accessToken;
        if (!tokenResponse || !tokenResponse.accessToken) {
            throw new Error("No access token available. Please log in.");
        }
        const userId = getUserId();
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
