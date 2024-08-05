import CurrencyInput from "react-currency-input-field";
import Option from "@/components/Option";

const Kaufen = () => {
    return (
        <>
            <CurrencyInput
                className="input-caret-color w-full h-40 mb-6 bg-transparent text-center text-h1 outline-none placeholder:text-theme-primary md:h-30 md:text-h2"
                name="price"
                prefix="€"
                placeholder="€0.00"
                decimalsLimit={2}
                decimalSeparator="."
                groupSeparator=","
                onValueChange={(value, name, values) =>
                    console.log(value, name, values)
                }
            />
            <div className="space-y-1">
                <Option classTitle="2xl:!mr-3" title="Kaufen" stroke>
                    Ethereum
                    <span className="ml-2 text-theme-tertiary">ETH</span>
                </Option>
                <Option
                    classTitle="2xl:!mr-3"
                    image="/images/crypto-icon-2.png"
                    stroke
                >
                    <div className="text-theme-secondary">
                        Sie bekommen{" "}
                        <span className="text-theme-primary">0,014701 ETH</span>{" "}
                        <br></br>für{" "}
                        <span className="text-theme-primary">EUR€48.16</span>
                    </div>
                </Option>
                <Option
                    classTitle="2xl:!mr-3"
                    title="Zahlen Sie mit"
                    color="bg-theme-green"
                    stroke
                >
                    EUR Saldo
                </Option>
                <Option
                    classTitle="2xl:!mr-3"
                    title="ETH"
                    color="bg-[#FD8965]"
                    stroke
                >
                    3.99904874
                </Option>
            </div>
            <button className="btn-primary w-full mt-6">ETH kaufen</button>
        </>
    );
};

export default Kaufen;
