import React, {useState} from "react";
import axios from 'axios';
import Icon from "@/components/Icon";
import {Button, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const Search = () => {
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!symbol.trim()) {
            setError('Please enter a valid stock symbol');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/aktie/stock-price/${symbol}`);
            const lastIndex = response.data.results.length - 1;
            if (lastIndex >= 0) {
                setPrice(response.data.results[lastIndex].c);
            } else {
                setError('Keine Daten gefunden.'); // Optional: Handle case where results array is empty
            }
            setError(null);
        } catch (err) {
            setError('Fehler beim Abrufen des aktuellen Preises. Bitte versuchen Sie es später erneut.');
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
                    placeholder="Aktienticker"
                    required
                    autoFocus
                    aria-label="Stock Symbol Input"
                />
                <div
                    className="absolute top-1/2 left-8 flex justify-center items-center w-9 h-9 -translate-y-1/2 md:left-5">
                    <Icon className="fill-theme-tertiary" name="search"/>
                </div>
            </div>

            <div className="pt-3 pb-6 border-t border-theme-stroke">
                <div className="mb-3">
                    <div className="px-8 py-3 text-caption-1 text-theme-secondary text-lg md:px-4">
                        Aktueller Preis für
                        {symbol && (
                            <Link to={`http://localhost:5173/token/${symbol}`} className="hover:text-theme-primary">
                                <div>{symbol}: {price}</div>
                            </Link>
                        )}
                    </div>
                </div>
                {error && (
                    <Text fontSize="xl" marginLeft="2rem" color="red.500">{error}</Text>
                )}
            </div>
        </form>
    );
};

export default Search;
