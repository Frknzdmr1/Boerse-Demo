import Layout from "@/components/Layout";
import Balance from "@/pages/HomePage/Balance";
import SingleToken from "@/pages/TokenPage/Token";
import Kauf from "@/pages/TokenPage/Kauf";
import KaufenUndVerkaufen from "@/components/KaufenUndVerkaufen";


const TokenPage = () => {
    return (
        <Layout title="Dashboard">
            <div className="space-y-2">
                <Balance/>
                <SingleToken/>
                <KaufenUndVerkaufen/>
                <KaufenUndVerkaufen/>
            </div>
        </Layout>
    );
};

export default TokenPage;