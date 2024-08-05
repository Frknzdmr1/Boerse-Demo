import Layout from "@/components/Layout";
import Balance from "@/pages/HomePage/Balance";
import SingleToken from "@/pages/TokenPage/Token";
import Kauf from "@/pages/TokenPage/Kauf";
import Überblick from "@/pages/TokenPage/Überblick";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import BalanceToken from "@/pages/TokenPage/BalanceToken";
import Loading from "@/components/Loading";

const TokenPage = () => {
    const {symbol} = useParams();
    const [tickerDetails, setTickerDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [closingPrices, setClosingPrices] = useState([]);

    useEffect(() => {
        const fetchClosingPrices = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/aktie/stocks/${symbol}/prices`);
                setClosingPrices(response.data);
            } catch (error) {
                console.error('Error fetching closing prices:', error);
            }
        };

        fetchClosingPrices();
    }, []);

    useEffect(() => {
        const fetchTickerDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/aktie/ticker-details/${symbol}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch ticker details');
                }
                setTickerDetails(response.data.results);
            } catch (error) {
                console.error('Error fetching ticker details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickerDetails();
    }, [symbol]);

    if (loading) {
        return<Loading/>;
    }

    if (!tickerDetails) {
        return <div>Error: Hoppla, etwas ist schiefgegangen, bitte versuche nochmal</div>;
    }

    return (
        <Layout title="Dashboard">
            <div className="space-y-2">
                <BalanceToken tickerDetails={tickerDetails} closingPrices={closingPrices}/>
                <div className="flex flex-row">
                    <SingleToken tickerDetails={tickerDetails}/>
                    <div className=" flex flex-col gap-4">
                    
                        <Überblick tickerDetails={tickerDetails}/>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TokenPage;