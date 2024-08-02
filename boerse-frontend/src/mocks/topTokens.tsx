
export const topTokens = [
    {
        id: "0",
        icon: "/images/apple.png",
        currencyFull: "Apple Inc",
        currencyShort: "AAPL",
        price: "€218.24 ",
        percent: calculatePercentChange([
            230.54, 234.4, 234.82, 228.88, 224.18, 224.31, 223.96, 225.01, 218.54, 217.49, 217.96, 218.24
        ]),
        itemsCharts: [
            { name: "1", price: 230.54 },
            { name: "2", price: 234.4 },
            { name: "3", price: 234.82 },
            { name: "4", price: 228.88 },
            { name: "5", price: 224.18 },
            { name: "6", price: 224.31 },
            { name: "7", price: 223.96 },
            { name: "8", price: 225.01 },
            { name: "9", price: 218.54 },
            { name: "10", price: 217.49 },
            { name: "11", price: 217.96 },
            { name: "12", price: 218.24 },
        ],
    },
    {
        id: "1",
        icon: "/images/tesla.png",
        currencyFull: "Tesla, Inc. Common Stock",
        currencyShort: "TSLA",
        price: "€232.1",
        percent: calculatePercentChange([
            248.23, 252.64, 256.56, 248.5, 249.23, 239.2, 251.51, 246.38, 215.99, 220.25, 219.8, 232.1
        ]),
        itemsCharts: [
            { name: "12.07.2024", price: 248.23 },
            { name: "15.07.2024", price: 252.64 },
            { name: "16.07.2024", price: 256.56 },
            { name: "17.07.2024", price: 248.5 },
            { name: "18.07.2024", price: 249.23 },
            { name: "19.07.2024", price: 239.2 },
            { name: "22.07.2024", price: 251.51 },
            { name: "23.07.2024", price: 246.38 },
            { name: "24.07.2024", price: 215.99 },
            { name: "25.07.2024", price: 220.25 },
            { name: "26.07.2024", price: 219.8 },
            { name: "29.07.2024", price: 232.1 },
        ],
    },
    {
        id: "2",
        icon: "/images/google.png",
        currencyFull: "Alphabet Inc. Class A Common Stock",
        currencyShort: "GOOGL",
        price: "€170.38",
        percent: calculatePercentChange([
            185.07, 186.53, 183.92, 181.02, 177.69, 177.66, 181.67, 181.79, 172.63, 167.28, 167.0, 169.53
        ]),
        itemsCharts: [
            { name: "12.07.2024", price: 185.07 },
            { name: "15.07.2024", price: 186.53 },
            { name: "16.07.2024", price: 183.92 },
            { name: "17.07.2024", price: 181.02 },
            { name: "18.07.2024", price: 177.69 },
            { name: "19.07.2024", price: 177.66 },
            { name: "22.07.2024", price: 181.67 },
            { name: "23.07.2024", price: 181.79 },
            { name: "24.07.2024", price: 172.63 },
            { name: "25.07.2024", price: 167.28 },
            { name: "26.07.2024", price: 167.0 },
            { name: "29.07.2024", price: 169.53 },
        ],
    },
];


function calculatePercentChange(prices) {
    const lastPrice = prices[prices.length - 1];
    const prevPrice = prices[prices.length - 2];
    const percentChange = ((lastPrice - prevPrice) / prevPrice) * 100;
    return percentChange.toFixed(2);
}
