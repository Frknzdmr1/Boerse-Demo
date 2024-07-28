import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopTokens = () => {
    const [topTokens, setTopTokens] = useState([]);

    useEffect(() => {
        const fetchTopTokens = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/tokens/top?limit=10'); // Assuming your backend endpoint
                setTopTokens(response.data); // Set top tokens received from backend
            } catch (error) {
                console.error('Error fetching top tokens:', error);
            }
        };

        fetchTopTokens();
    }, []);

    return (
        <div>
            <h2>Top Tokens</h2>
            <ul>
                {topTokens.map(token => (
                    <li key={token.id}>
                        <strong>{token.name}</strong> - Price: {token.price}, Volume: {token.volume}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopTokens;
