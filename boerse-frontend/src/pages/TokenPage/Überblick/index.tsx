import React from "react";

const Überblick = ({tickerDetails}) => {
    return (
        <div className="card-sidebar">
            <h2>Überblick</h2>
            {tickerDetails && (
                <div className="flex flex-col gap-2">
                    <div><h1><strong>{tickerDetails.market_cap}T</strong></h1>
                        <span className="text-caption-2 text-theme-secondary opacity-75">Marketcap</span></div>
                    <div><h1><strong>{tickerDetails.primary_exchange}</strong></h1>
                        <span className="text-caption-2 text-theme-secondary opacity-75">Primary Exchange</span></div>
                </div>
            )}
        </div>
    );
};

export default Überblick;