import Layout from "@/components/Layout";
import Balance from "@/pages/HomePage/Balance";
import SingleToken from "@/pages/TokenPage/Token";
import Kauf from "@/pages/TokenPage/Kauf";
import Überblick from "@/pages/TokenPage/Überblick";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const TokenPage = () => {
    const { symbol } = useParams();
    const [tickerDetails, setTickerDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickerDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/aktie/ticker-details/${symbol}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch ticker details');
                }
                setTickerDetails(response.data.results);
                console.log(response.data.results)
            } catch (error) {
                console.error('Error fetching ticker details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickerDetails();
    }, [symbol]);

     if (loading) {
         return <div>Loading...</div>;
     }

     if (!tickerDetails) {
        return <div>Error: Hoppla, etwas ist schiefgegangen, bitte versuche nochmal</div>;
    }

    return (
        <Layout title="Dashboard">
            <div className="space-y-2">
                <Balance/>
                <SingleToken tickerDetails={tickerDetails}/>
                <Kauf/>
                <Überblick tickerDetails={tickerDetails}/>
            </div>
        </Layout>
    );
};

export default TokenPage;