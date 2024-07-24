import { useState } from "react";
import Icon from "@/components/Icon";
import Asset from "./Asset";
import Transaction from "./Transaction";

import { trendingAssets, recentTransactions } from "@/mocks/search";

type SearchProps = {};

const Search = ({}: SearchProps) => {
    const [search, setSearch] = useState("");

    return (
        <>
            <div className="relative">
                <input
                    className="w-full h-21 pl-22 pr-8 bg-transparent text-title-1m text-theme-primary outline-none placeholder:text-theme-tertiary md:h-16 md:pl-16 md:text-[1rem]"
                    type="text"
                    placeholder="Search for an asset, contacts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    required
                    data-autofocus
                />
                <div className="absolute top-1/2 left-8 flex justify-center items-center w-9 h-9 -translate-y-1/2 md:left-5">
                    <Icon className="fill-theme-tertiary" name="search" />
                </div>
            </div>


        </>
    );
};

export default Search;
