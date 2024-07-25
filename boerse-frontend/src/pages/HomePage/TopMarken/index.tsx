import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import Card from "@/components/Card";
import Image from "@/components/Image";
import Percent from "@/components/Percent";

interface PreviousClose {
    ticker: string;
    queryCount: number;
    resultsCount: number;
    adjusted: boolean;
    results: {
        c: number;
        h: number;
        l: number;
        n: number;
        o: number;
        t: number;
        v: number;
        vw: number;
    }[];
    status: string;
    request_id: string;
    count: number;
}

interface Token {
    id: string;
    icon: string;
    currencyFull: string;
    currencyShort: string;
    itemsCharts: { name: string; price: number }[];
    price: number;
    percent: number;
}

interface ApiResponse {
    ticker: string;
    data?: PreviousClose;
    error?: any;
}

const TopTokens = () => {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const tickers = ['AAPL', 'GOOGL', 'MSFT']; // Example tickers
                const tokenPromises: Promise<ApiResponse>[] = tickers.map(ticker =>
                    axios.get(`http://localhost:8080/stock/${ticker}`)
                        .then(response => {
                            console.log('Full response for', ticker, ':', response.data);
                            return { ticker, data: response.data };
                        })
                        .catch(error => {
                            console.error('Error fetching', ticker, ':', error.response ? error.response.data : error.message);
                            return { ticker, error };
                        })
                );

                const results = await Promise.all(tokenPromises);
                const successfulResults = results.filter((result): result is ApiResponse & { data: PreviousClose } => !result.error && !!result.data);
                const formattedData = successfulResults
                    .map(({ ticker, data }) => formatData(data, ticker))
                    .filter((token): token is Token => token !== null);
                setTokens(formattedData);

                if (results.length !== successfulResults.length) {
                    console.warn('Some requests failed. Check the console for details.');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTokens();
    }, []);

    const formatData = (data: PreviousClose, ticker: string): Token | null => {
        if (!data || !Array.isArray(data.results) || data.results.length === 0) {
            console.error('Invalid data structure for ticker:', ticker, data);
            return null;
        }

        try {
            const result = data.results[0];
            const openPrice = result.o;
            const closePrice = result.c;
            const highPrice = result.h;
            const lowPrice = result.l;

            // Create a simple trend line with 5 points
            const itemsCharts = [
                { name: '1', price: openPrice },
                { name: '2', price: (openPrice + lowPrice) / 2 },
                { name: '3', price: (highPrice + lowPrice) / 2 },
                { name: '4', price: (closePrice + highPrice) / 2 },
                { name: '5', price: closePrice }
            ];

            return {
                id: ticker,
                icon: `path/to/${ticker.toLowerCase()}_icon.png`, // Replace with actual icon path
                currencyFull: ticker,
                currencyShort: ticker,
                itemsCharts: itemsCharts,
                price: closePrice,
                percent: ((closePrice - openPrice) / openPrice) * 100
            };
        } catch (error) {
            console.error('Error formatting data for ticker:', ticker, error);
            return null;
        }
    };

    const calculatePercentChange = (results: PreviousClose['results']): number => {
        if (results.length === 0) return 0;
        const firstPrice = results[0].o ?? 0;
        const lastPrice = results[0].c ?? 0;
        if (firstPrice === 0) return 0;
        return ((lastPrice - firstPrice) / firstPrice) * 100;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Card
            className="flex-1"
            title="Rangliste"
            tooltip="Tooltip top Tokens"
            seeAllUrl="/"
        >
            <div className="-mx-3 pt-6 space-y-1 md:-mx-2">
                {tokens.map((item) => (
                    <Link
                        className="flex items-center h-20 px-3 rounded-2xl border border-transparent transition-colors hover:border-theme-stroke md:px-2"
                        key={item.id}
                        to="/token"
                    >
                        <div className="mr-5 md:mr-2">
                            <Image
                                className="crypto-logo w-10 scale-[1.02]"
                                src={item.icon}
                                width={40}
                                height={40}
                                alt=""
                            />
                        </div>
                        <div className="min-w-[6rem]">
                            <div className="text-base-1s">
                                {item.currencyFull}
                            </div>
                            <div className="text-caption-2 text-theme-secondary opacity-75">
                                {item.currencyShort}
                            </div>
                        </div>
                        <div className="w-18 h-9 mx-auto md:w-16">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={300}
                                    height={100}
                                    data={item.itemsCharts}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <Line
                                        type="linear"
                                        dataKey="price"
                                        dot={false}
                                        stroke={
                                            item.percent > 0
                                                ? "#32AE60"
                                                : "#F04D1A"
                                        }
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="min-w-[5.5rem] -mb-1.5 text-right">
                            <div className="text-base-1s">{item.price.toFixed(2)}</div>
                            <Percent
                                className="text-base-2"
                                value={item.percent}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
};

export default TopTokens;