import React, {useState} from "react";
import axios from 'axios';
import Icon from "@/components/Icon";
import {Button, Text} from "@chakra-ui/react";

//type SearchProps = {};
const Search = () => {
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

const handleSubmit = async (e) => {
    e.preventDefault();
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

const handleInputChange = (e) => {
    setSymbol(e.target.value.toUpperCase());
};

return (
    <form onSubmit={handleSubmit}>
        <div className="relative">
            <input
                className="w-full h-21 pl-22 pr-8 bg-transparent text-title-1m text-theme-primary outline-none placeholder:text-theme-tertiary md:h-16 md:pl-16 md:text-[1rem]"
                type="text"
                value={symbol}
                onChange={handleInputChange}
                placeholder="Enter stock symbol"
                required
                autoFocus
            />
            <div
                className="absolute top-1/2 left-8 flex justify-center items-center w-9 h-9 -translate-y-1/2 md:left-5">
                <Icon className="fill-theme-tertiary" name="search"/>
            </div>
        </div>

        <div className="pt-3 pb-6 border-t border-theme-stroke">
            <div className="mb-3">
                <div className="px-8 py-3 text-caption-1 text-theme-secondary md:px-4">
                    Current Price for all
                </div>
                <div className="px-4 md:px-2">
                    {price !== null && (
                        <Text fontSize="xl">Current Price for {symbol}: {price}</Text>
                    )}
                    {error && (
                        <Text fontSize="xl" color="red.500">{error}</Text>
                    )}
                </div>
            </div>
        </div>
    </form>
);
}
;

export default Search;