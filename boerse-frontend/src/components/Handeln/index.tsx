import { useState } from "react";
import TabsSame from "@/components/TabsSame";
import BuyAndSell from "./KaufenUndVerkaufen";
import SelectAsset from "./SelectAsset";
import Swap from "./Swap";
import PreviewSwap from "./PreviewSwap";
import PreviewKaufenUndVerkaufen from "./PreviewKaufenUndVerkaufen";
import KaufenUndVerkaufen from "@/components/KaufenUndVerkaufen";


const Handeln = () => {
    const [type, setType] = useState<string>("buy");
    const [selectAsset, setSelectAsset] = useState(false);
    const [previewBuy, setPreviewBuy] = useState(false);
    const [previewSell, setPreviewSell] = useState(false);
    const [previewSwap, setPreviewSwap] = useState(false);

    const typeTasks = [
        {
            title: "Kaufen",
            value: "kaufen",
        },
        {
            title: "Verkaufen",
            value: "verkaufen",
        },
        {
            title: "Swap",
            value: "swap",
        },
    ];

    return (
        <>
            {selectAsset ? (
                <SelectAsset onBack={() => setSelectAsset(false)} />
            ) : (
                <>
                    {!previewBuy && !previewSell && !previewSwap && (
                        <>
                            <div className="mb-6 text-title-1s">
                                Ethereum{" "}
                                <span className="text-theme-tertiary">ETH</span>
                            </div>
                            <TabsSame
                                className="mb-6"
                                items={typeTasks}
                                value={type}
                                setValue={setType}
                            />
                        </>
                    )}
                    {type === "kaufen" &&
                        (previewKaufen ? (
                            <PreviewKaufenUndVerkaufen
                                type="kaufen"
                                onBack={() => setPreviewKaufen(false)}
                            />
                        ) : (
                            <KaufenUndVerkaufen
                                type="kaufen"
                                onSelect={() => setSelectAsset(true)}
                                onContinue={() => setPreviewKaufen(true)}
                            />
                        ))}
                    {type === "verkaufen" &&
                        (previewVerkaufen ? (
                            <PreviewKaufenUndVerkaufen
                                type="verkaufen"
                                onBack={() => setPreviewVerkaufen(false)}
                            />
                        ) : (
                            <KaufenUndVerkaufen
                                type="verkaufen"
                                onSelect={() => setSelectAsset(true)}
                                onContinue={() => setPreviewVerkaufen(true)}
                            />
                        ))}
                    {type === "swap" &&
                        (previewSwap ? (
                            <PreviewSwap onBack={() => setPreviewSwap(false)} />
                        ) : (
                            <Swap
                                onSelect={() => setSelectAsset(true)}
                                onContinue={() => setPreviewSwap(true)}
                            />
                        ))}
                </>
            )}
        </>
    );
};

export default Handeln;
