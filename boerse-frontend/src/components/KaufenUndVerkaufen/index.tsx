import { useState } from "react";
import TabsSame from "@/components/TabsSame";
import Buy from "./Kaufen";
import Sell from "./Verkaufen";

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
            {type === "kaufen" && <Buy />}
            {type === "verkaufen" && <Sell />}
        </div>
    );
};

export default KaufenUndVerkaufen;
