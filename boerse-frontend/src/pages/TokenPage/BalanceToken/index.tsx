import {useEffect, useState} from "react";
import {AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, TooltipProps} from "recharts";
import axios from "axios";
import moment from "moment";
import {useColorMode} from "@chakra-ui/color-mode";
import {Card} from "@chakra-ui/react";
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
    date: string;
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

const BalanceToken = ({tickerDetails, closingPrices}) => {
    const [time, setTime] = useState(duration[0]);
    const {colorMode} = useColorMode();
    const isDarkMode = colorMode === "dark";


    const today = moment();
    const chartData: ChartData[] = closingPrices.map((price, index) => ({
        date: today.clone().subtract(closingPrices.length - index - 1, 'days').format('YYYY-MM-DD'),
        price: price,
    }));

    return (
        <Card title="Wallet"
              arrowTitle
              option={time}
              setOption={setTime}
              options={duration} style={{padding: "40px"}}>
            <div className="flex items-end md:mt-4">
                <CurrencyFormat
                    className="text-h1 md:text-h3"
                    value={3200.8}
                    currency="€"
                />
                <Percent className="ml-1 text-title-1s" value={85.66}/>
            </div>
            <div className="h-[14rem] -mb-2">
                <h2 className="text-title-1m mt-2">{tickerDetails.name} {tickerDetails.ticker}</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{top: 10, right: 30, left: 0, bottom: 15}}
                    >
                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#9CC5FF" stopOpacity={0.13}/>
                                <stop offset="95%" stopColor="#B9D6FF" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
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
                            cursor={{stroke: isDarkMode ? "#272B30" : "#EFEFEF", strokeWidth: 1, fill: "transparent"}}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#0C68E9"
                            fillOpacity={1}
                            fill="url(#color)"
                            activeDot={{r: 6, stroke: isDarkMode ? "#1A1D1F" : "#FCFCFC", strokeWidth: 3}}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default BalanceToken;
