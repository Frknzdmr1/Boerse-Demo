import React, {useState, useEffect} from "react";
import axios from "axios";

const SingleToken = () => {
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
        <div>
            {tickerDetails && (
                <div>
                    <h1>Über {tickerDetails.name} ({tickerDetails.ticker})</h1>
                    <p><strong>Description:</strong> {tickerDetails.description}</p>
          
                </div>
            )}
        </div>
    );
};

export default SingleToken;

