import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Trade from "@/components/Handeln";
import User from "@/components/User";
import Image from "@/components/Image";
import Meldungen from "./Meldungen";
import Search from "./Search";
import LoginButton from "@/components/LoginButton";

type HeaderProps = {
    title: string;
    visible?: boolean;
    showMenu?: boolean;
    onClickBurger?: () => void;
};

const Header = ({ title, visible, showMenu, onClickBurger }: HeaderProps) => {
    const navigate = useNavigate();
    const [visibleModalSearch, setVisibleModalSearch] = useState<boolean>(false);
    const [visibleModalTrade, setVisibleModalTrade] = useState<boolean>(false);
    const { colorMode } = useColorMode();

    return (
        <>
            <div
                className={`fixed bg-theme-on-surface-1 top-0 right-0 z-10 md:z-30 md:px-4 md:py-2 md:transition-colors ${
                    visible
                        ? "left-[21.25rem] 2xl:left-76 xl:left-20 md:left-0"
                        : "left-20 md:left-0"
                } ${showMenu ? "md:!bg-theme-on-surface-1" : ""}`}
            >
                <div
                    className={`flex items-center h-24 max-w-[80rem] mx-auto px-10 lg:px-6 md:h-16 md:px-4 md:bg-theme-on-surface-1 md:rounded-2xl md:transition-shadow ${
                        showMenu
                            ? "shadow-depth-1 dark:shadow-[inset_0_0_0_0.125rem_#272B30]"
                            : ""
                    }`}
                >
                    <Link className="hidden md:block mr-auto" to="/">
                        <Image
                            className="w-9 opacity-100"
                            src={
                                colorMode === "light"
                                    ? "/images/logo-dark.svg"
                                    : "/images/logo-light.svg"
                            }
                            width={36}
                            height={36}
                            alt=""
                        />
                    </Link>
                    <button
                        className="group inline-flex items-center mr-auto text-h5 md:hidden"
                        onClick={() => navigate(-1)}
                    >
                        <div className="flex justify-center items-center w-10 h-10 mr-3.5 lg:mr-1">
                            <Icon
                                className="fill-theme-primary transition-transform group-hover:-translate-x-0.5"
                                name="arrow-left"
                            />
                        </div>
                        {title}
                    </button>
                    <div className="flex items-center ml-auto space-x-6">
                        <LoginButton />
                        <button
                            className="btn-primary md:hidden"
                            onClick={() => setVisibleModalTrade(true)}
                        >
                            Kaufen
                        </button>
                        <button
                            className="group w-12 h-12 outline-none md:w-8 md:h-8"
                            onClick={() => setVisibleModalSearch(true)}
                        >
                            <Icon
                                className="fill-theme-secondary transition-colors group-hover:fill-theme-primary"
                                name="search"
                            />
                        </button>
                        <Meldungen />
                        <button
                            className={`hidden rounded-full transition-shadow md:block ${
                                showMenu
                                    ? "shadow-[0_0_0_0.125rem_#0C68E9]"
                                    : ""
                            }`}
                            onClick={onClickBurger}
                        >
                            <Image
                                className="w-8 h-8 object-cover rounded-full opacity-100 border border-b-brand-950"
                                src="/images/avatar.png"
                                width={32}
                                height={32}
                                alt=""
                            />
                        </button>
                        <User className="md:hidden border border-b-brand-950 rounded-full w-12 h-12" />
                    </div>
                </div>
            </div>
            <Modal
                classWrap="max-w-[40rem] !p-0 rounded-3xl overflow-hidden"
                visible={visibleModalSearch}
                onClose={() => setVisibleModalSearch(false)}
            >
                <Search />
            </Modal>
            <Modal
                classWrap="p-8 md:!px-4 md:!py-6"
                visible={visibleModalTrade}
                onClose={() => setVisibleModalTrade(false)}
            >
                <Trade />
            </Modal>
        </>
    );
};

export default Header;
