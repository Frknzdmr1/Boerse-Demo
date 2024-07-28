import Layout from "@/components/Layout";
import Balance from "@/pages/HomePage/Balance";
import SingleToken from "@/pages/TokenPage/Token";
import Kauf from "@/pages/TokenPage/Kauf";
import KaufenUndVerkaufen from "@/components/KaufenUndVerkaufen";
import Überblick from "@/pages/TokenPage/Überblick";
import {useEffect, useState} from "react";
import axios from "axios";


const TokenPage = () => {
        const [tickerDetails, setTickerDetails] = useState(null);

   useEffect(() => {
    const fetchTickerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/aktie/ticker-details/AAPL`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch ticker details');
        }
        setTickerDetails(response.data.results);
        console.log(response.data.results)
      } catch (error) {
        console.error('Error fetching ticker details:', error);
      }
    };

    fetchTickerDetails();
  }, []);
    return (
        <Layout title="Dashboard">
            <div className="space-y-2">
                <Balance/>
                <SingleToken tickerDetails={tickerDetails}/>
                <Kauf/>
                <Überblick tickerDetails={tickerDetails} />
            </div>
        </Layout>
    );
};

export default TokenPage;