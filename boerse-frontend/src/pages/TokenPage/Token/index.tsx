const SingleToken = ({tickerDetails}) => {


    return (
        <div className="card">
            {tickerDetails && (
                <div>
                    <h1 className="text-title-1m">Über {tickerDetails.name} ({tickerDetails.ticker})</h1>
                    <p>{tickerDetails.description}</p>
                </div>
            )}
        </div>
    );
};

export default SingleToken;

