import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Box, Text } from '@chakra-ui/react';

const Aktien = () => {
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchCurrentPrice = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/aktie/current-price/${symbol}`);
            console.log(response.data);
            setPrice(response.data);
            setError(null);
        } catch (err) {
            setError('Error fetching current price');
            setPrice(null);
        }
    };

    return (
        <Box>
            <Input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="Enter stock symbol"
                mb={4}
            />
            <Button onClick={fetchCurrentPrice} colorScheme="teal" mb={4}>Fetch Current Price</Button>
            {price !== null && (
                <Text fontSize="xl">Current Price for {symbol}: {price}</Text>
            )}
            {error && (
                <Text fontSize="xl" color="red.500">{error}</Text>
            )}
        </Box>
    );
};

export default Aktien;
