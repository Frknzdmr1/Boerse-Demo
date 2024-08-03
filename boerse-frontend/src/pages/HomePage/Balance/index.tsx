import React, {useEffect, useState} from "react";
import axios from "axios";
import {AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, TooltipProps} from "recharts";
import {useColorMode} from "@chakra-ui/color-mode";
import {Input, Button, Box, Text, Stack, Heading, Divider} from '@chakra-ui/react';
import Card from "@/components/Card";
import CurrencyFormat from "@/components/CurrencyFormat";
import Percent from "@/components/Percent";
import authentifizierungsUtils, {getUserId} from "@/pages/Login/AuthUtils/AuthentifizierungsUtils";

const duration = [
    {id: "0", title: "All time"},
    {id: "1", title: "Month"},
    {id: "2", title: "Year"},
];

type ChartData = {
    name: string;
    price: number;
};

const CustomTooltip = ({
                           active,
                           payload,
                           label
                       }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload as ChartData;
        return (
            <Box p={4} bg="gray.700" color="white" borderRadius="md">
                <Text fontSize="sm">{label}</Text>
                <CurrencyFormat
                    className="text-h5 md:text-title-1s"
                    currency="€"
                    value={data.price}
                />
            </Box>
        );
    }
    return null;
};

type BalanceProps = {
    userId: string;
    balance: number; // Assuming balance is of type number
};

const Balance: React.FC<BalanceProps> = ({userId, balance}) => {
    const [time, setTime] = useState(duration[0]);
    const {colorMode} = useColorMode();
    const isDarkMode = colorMode === "dark";

    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [portfolioValue, setPortfolioValue] = useState<number>(0);
    const [portfolioChange, setPortfolioChange] = useState<number>(0);

    const [newStockSymbol, setNewStockSymbol] = useState('');
    const [newStockQuantity, setNewStockQuantity] = useState("");
    const [portfolio, setPortfolio] = useState<any[]>([]);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const tokenResponse = authentifizierungsUtils.getAktuelleAuthResponse();
                const token = tokenResponse?.accessToken;
                if (!tokenResponse || !tokenResponse.accessToken) {
                    throw new Error("No access token available. Please log in.");
                }
                const userId = getUserId();
                const response = await axios.get(`http://localhost:8080/portfolio/${userId}`, {
                    //withCredentials: true, // Ensure cookies are sent for authentication
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                   }
                });
                const portfolio = response.data;

                if (portfolio && portfolio.portfolioAktien) {
                    const transformedData = portfolio.portfolioAktien.map((stock: any) => ({
                        name: stock.symbol,
                        price: stock.aktuellerPreis
                    }));

                    setChartData(transformedData);

                    const totalValue = portfolio.portfolioAktien.reduce((acc: number, stock: any) => acc + (stock.menge * stock.aktuellerPreis), 0);
                    setPortfolioValue(totalValue);

                    const totalInitialValue = portfolio.portfolioAktien.reduce((acc: number, stock: any) => acc + (stock.menge * stock.durchschnittlicherKaufpreis), 0);
                    const change = totalInitialValue ? ((totalValue - totalInitialValue) / totalInitialValue) * 100 : 0;
                    setPortfolioChange(change);

                    setPortfolio(portfolio.portfolioAktien);
                } else {
                    console.error('Portfolio data is not in expected format', portfolio);
                }
            } catch (error: any) {
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

    const addStockToPortfolio = async () => {
        try {
            await axios.post(`http://localhost:8080/portfolio/${userId}/add-stock`, {
                symbol: newStockSymbol,
                menge: newStockQuantity,
                durchschnittlicherKaufpreis: 0 // Adjust as necessary
            });

            const priceResponse = await axios.get(`http://localhost:8080/aktie/current-price/${newStockSymbol}`);
            const currentPrice = priceResponse.data;

            // Log the retrieved current price for debugging
            console.log(`Current price of ${newStockSymbol}: ${currentPrice}`);


            setChartData([...chartData, {name: newStockSymbol, price: currentPrice}]);

            const updatedPortfolio = [...portfolio, {
                symbol: newStockSymbol,
                aktuellerPreis: currentPrice,
                menge: newStockQuantity
            }];
            setPortfolio(updatedPortfolio);

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
            title="Portfoliowert"
            arrowTitle
            option={time}
            setOption={setTime}
            options={duration}
        >
            <Box>
                <Box className="flex items-end md:mt-4">
                    <CurrencyFormat
                        className="text-h1 md:text-h3"
                        value={portfolioValue}
                        currency="€"
                    />
                    <Percent className="ml-1 text-title-1s" value={portfolioChange}/>
                </Box>
                <Box className="h-[14rem] -mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            width={730}
                            height={250}
                            data={chartData}
                            margin={{top: 0, right: 6, left: 6, bottom: 0}}
                        >
                            <defs>
                                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#9CC5FF" stopOpacity={0.13}/>
                                    <stop offset="95%" stopColor="#B9D6FF" stopOpacity={0}/>
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
                                content={<CustomTooltip/>}
                                cursor={{
                                    stroke: isDarkMode ? "#272B30" : "#EFEFEF",
                                    strokeWidth: 1,
                                    fill: "transparent",
                                }}
                                wrapperStyle={{outline: "none"}}
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
                </Box>
            </Box>

            <Divider mt={6} mb={6}/>

            <Box mt={6}>
                <Stack spacing={4} alignItems="center" justifyContent="center">
                    <Input
                        type="text"
                        value={newStockSymbol}
                        onChange={(e) => setNewStockSymbol(e.target.value.toUpperCase())}
                        placeholder="Aktienticker"
                        variant="filled"
                        w="50%"
                    />
                    <Input
                        type="number"
                        value={newStockQuantity}
                        onChange={(e) => setNewStockQuantity(Number(e.target.value))}
                        placeholder="Menge"
                        variant="filled"
                        w="50%"
                    />
                    <Button onClick={addStockToPortfolio} colorScheme="teal">Anteile kaufen</Button>
                </Stack>
                <Box mt={8}>
                    <Heading as="h3" size="md" mb={4}>Guthaben: {balance - portfolioValue}€</Heading>
                    {portfolio.map((stock, index) => (
                        <Box key={index} mb={2} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                            <Text>{stock.symbol}: {stock.menge} shares @
                                €{typeof stock.aktuellerPreis === 'number' ? stock.aktuellerPreis.toFixed(2) : stock.aktuellerPreis} each</Text>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Card>
    );
};

export default Balance;
