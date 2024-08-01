import { useState } from "react";
import TabsSame from "@/components/TabsSame";
import Kaufen from "./Kaufen";
import Verkaufen from "./Verkaufen";

//type BuyAndSellProps = {};

const KaufenUndVerkaufen = () => {
    const [type, setType] = useState<string>("buy");

    const typeTasks = [
        {
            title: "Kaufen",
            value: "kaufen",
        },
        {
            title: "Verkaufen",
            value: "verkaufen",
        },
    ];

    return (
        <div className="card-sidebar 2xl:w-[21.25rem] xl:w-80 lg:w-full">
            <TabsSame
                className="mb-6"
                items={typeTasks}
                value={type}
                setValue={setType}
            />
            {type === "kaufen" && <Kaufen />}
            {type === "verkaufen" && <Verkaufen />}
        </div>
    );
};

export default KaufenUndVerkaufen;
