import React, { useEffect, useState } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { useColorMode } from "@chakra-ui/color-mode";
import { Input, Button, Box, Text } from '@chakra-ui/react';
import Card from "@/components/Card";
import CurrencyFormat from "@/components/CurrencyFormat";
import Percent from "@/components/Percent";

const duration = [
    {
        id: "0",
        title: "All time",
    },
    {
        id: "1",
        title: "Month",
    },
    {
        id: "2",
        title: "Year",
    },
];

// Define the type for your chart data
type ChartData = {
    name: string;
    price: number;
};

// Use Recharts' TooltipProps with your custom data type
const CustomTooltip = ({
                           active,
                           payload,
                           label
                       }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload as ChartData;
        return (
            <div className="p-5 bg-theme-on-surface-1 border border-theme-stroke rounded-xl shadow-depth-1 md:p-3">
                <div className="mb-0.5 text-caption-2m text-theme-secondary opacity-75 dark:opacity-100">
                    {label}
                </div>
                <CurrencyFormat
                    className="text-h5 md:text-title-1s"
                    currency="€"
                    value={data.price}
                />
            </div>
        );
    }

    return null;
};

const Balance = ({ userId }) => {
    const [time, setTime] = useState(duration[0]);
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [portfolioValue, setPortfolioValue] = useState<number>(0);
    const [portfolioChange, setPortfolioChange] = useState<number>(0);

    const [newStockSymbol, setNewStockSymbol] = useState('');
    const [newStockQuantity, setNewStockQuantity] = useState(0);
    const [portfolio, setPortfolio] = useState<any[]>([]);

    useEffect(() => {
        // Fetch portfolio data
        const fetchPortfolio = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/portfolio/${userId}`, {
                    withCredentials: true // Ensure cookies are sent for authentication
                });
                const portfolio = response.data;

                if (portfolio && portfolio.portfolioAktien) {
                    // Transform portfolio data into chart data
                    const transformedData = portfolio.portfolioAktien.map((stock: any) => ({
                        name: stock.symbol,
                        price: stock.aktuellerPreis
                    }));

                    setChartData(transformedData);

                    // Calculate portfolio value and change
                    const totalValue = portfolio.portfolioAktien.reduce((acc: number, stock: any) => acc + (stock.menge * stock.aktuellerPreis), 0);
                    setPortfolioValue(totalValue);

                    // Assuming you have a way to calculate the percentage change
                    const totalInitialValue = portfolio.portfolioAktien.reduce((acc: number, stock: any) => acc + (stock.menge * stock.durchschnittlicherKaufpreis), 0);
                    const change = totalInitialValue ? ((totalValue - totalInitialValue) / totalInitialValue) * 100 : 0;
                    setPortfolioChange(change);

                    // Set portfolio state
                    setPortfolio(portfolio.portfolioAktien);
                } else {
                    console.error('Portfolio data is not in expected format', portfolio);
                }
            } catch (error) {
                console.error('Error fetching portfolio data', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                }
                if (error.request) {
                    console.error('Request data:', error.request);
                }
            }
        };

        fetchPortfolio();
    }, [userId]);

    // Function to add stock to portfolio
    const addStockToPortfolio = async () => {
        try {
            await axios.post(`http://localhost:8080/portfolio/${userId}/add-stock`, {
                symbol: newStockSymbol,
                menge: newStockQuantity,
                durchschnittlicherKaufpreis: 0 // Adjust as necessary
            });

            // Fetch the current price of the new stock
            const priceResponse = await axios.get(`http://localhost:8080/aktie/current-price/${newStockSymbol}`);
            const currentPrice = priceResponse.data;

            // Update chart data
            setChartData([...chartData, { name: newStockSymbol, price: currentPrice }]);

            // Update portfolio state
            const updatedPortfolio = [...portfolio,  { symbol: newStockSymbol, aktuellerPreis: currentPrice, menge: newStockQuantity }];
            setPortfolio(updatedPortfolio);

            // Recalculate the portfolio value and change
            const totalValue = updatedPortfolio.reduce((acc: number, stock: any) => acc + (stock.menge * stock.aktuellerPreis), 0);
            setPortfolioValue(totalValue);
            const totalInitialValue = updatedPortfolio.reduce((acc: number, stock: any) => acc + (stock.menge * stock.durchschnittlicherKaufpreis), 0);
            const change = totalInitialValue ? ((totalValue - totalInitialValue) / totalInitialValue) * 100 : 0;
            setPortfolioChange(change);

            setNewStockSymbol('');
            setNewStockQuantity(0);
        } catch (error) {
            console.error('Error adding stock to portfolio', error);
        }
    };

    return (
        <Card
            title="Wallet"
            arrowTitle
            option={time}
            setOption={setTime}
            options={duration}
        >
            <div className="flex items-end md:mt-4">
                <CurrencyFormat
                    className="text-h1 md:text-h3"
                    value={portfolioValue}
                    currency="€"
                />
                <Percent className="ml-1 text-title-1s" value={portfolioChange} />
            </div>
            <div className="h-[14rem] -mb-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={730}
                        height={250}
                        data={chartData}
                        margin={{ top: 0, right: 6, left: 6, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="color"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#9CC5FF"
                                    stopOpacity={0.13}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#B9D6FF"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            stroke={isDarkMode ? "#272B30" : "#EFEFEF"}
                            tick={{
                                fontSize: 12,
                                fontWeight: "500",
                                opacity: 0.75,
                                fill: "#6F767E",
                            }}
                            dy={4}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: isDarkMode ? "#272B30" : "#EFEFEF",
                                strokeWidth: 1,
                                fill: "transparent",
                            }}
                            wrapperStyle={{ outline: "none" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#0C68E9"
                            fillOpacity={1}
                            fill="url(#color)"
                            activeDot={{
                                r: 6,
                                stroke: isDarkMode ? "#1A1D1F" : "#FCFCFC",
                                strokeWidth: 3,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Form to add new stocks */}
            <Box mt={6}>
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
            </Box>

            {/* Display the portfolio */}
            <Box mt={6}>
                <Text fontSize="xl" mb={4}>Portfolio</Text>
                {portfolio.map((stock, index) => (
                    <Box key={index} mb={2}>
                        <Text>{stock.symbol}: {stock.menge} shares @ €{typeof stock.aktuellerPreis === 'number' ? stock.aktuellerPreis.toFixed(2) : stock.aktuellerPreis} each</Text>
                    </Box>
                ))}
            </Box>
        </Card>
    );
};

export default Balance;
