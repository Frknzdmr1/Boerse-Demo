import {LineChart, Line, ResponsiveContainer} from "recharts";
import {Link} from "react-router-dom";
import Card from "@/components/Card";
import Image from "@/components/Image";
import Percent from "@/components/Percent";

import {topTokens} from "@/mocks/topTokens";
import {useEffect, useState} from "react";
import axios from "axios";


interface StockData {
    ticker: string;
    queryCount: number;
    resultsCount: number;
    results: StockResult[];
}

interface StockResult {
    v: number;  // Volume
    vw: number; // Volume Weighted Average Price (VWAP)
    o: number;  // Open
    c: number;  // Close
    h: number;  // High
    l: number;  // Low
    t: number;  // Timestamp
    n: number;  // Number of Transactions
}


const Preise = () => {

    return (
        <Card
            className="flex-1"
            title="Preise"
            tooltip="Eine Liste mit allen Preisen"
            seeAllUrl="/"
        >
            <div className="-mx-3 pt-6 space-y-1 md:-mx-2">
                {topTokens.map((item) => (
                    <div
                        className="flex justify-between items-center h-20 px-3 rounded-2xl border border-transparent transition-all hover:border-theme-stroke hover:shadow-[0_0_0.875rem_-0.25rem_rgba(0,0,0,0.05),0_2rem_3rem_-0.5rem_rgba(0,0,0,0.05)] md:h-18 md:px-2"
                        key={item.id}
                    >
                        <div className="flex items-center w-44 md:w-auto md:grow">
                            <div className="mr-4">
                                <Image
                                    className="crypto-logo w-10 scale-[1.02]"
                                    src={item.icon}
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </div>
                            <div className="grow">
                                <div className="text-base-1s">
                                    {item.currencyFull}
                                </div>
                                <div className="text-caption-2 text-theme-secondary opacity-75 dark:opacity-100">
                                    {item.currencyShort}
                                </div>
                            </div>
                        </div>
                        <div className="shrink-0 w-20 h-9 mx-4 2xl:hidden lg:block md:hidden">
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
                        <div className="shrink-0 w-24 text-base-1s md:hidden">
                            {item.price}
                        </div>
                        <div className="shrink-0 w-24 md:hidden">
                            <Percent
                                className="text-base-2"
                                value={item.percent}
                            />
                        </div>
                        <div className="shrink-0">
                            <Link className="btn-gray h-10" to={`/token/${item.currencyShort}`}>
                                Kaufen
                            </Link>
                        </div>


                    </div>

                ))}

            </div>
        </Card>
    );
};

export default Preise;
