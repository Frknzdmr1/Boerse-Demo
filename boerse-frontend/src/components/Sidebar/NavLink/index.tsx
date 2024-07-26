import { useLocation, Link, To } from "react-router-dom";
import Icon from "@/components/Icon";

type NavLinkProps = {
    title: string;
    icon: string;
    url?: To;
    onClick?: () => void;
    visible?: boolean;
};

const NavLink = ({ title, icon, url, onClick, visible }: NavLinkProps) => {
    const location = useLocation();
    const active = location.pathname === (typeof url === 'string' ? url : url?.pathname);
    const notification = (typeof url === 'string' ? url : url?.pathname) === "/notification";

    if (url) {
        return (
            <Link
                className={`group flex items-center h-12 rounded-full text-theme-secondary transition-colors hover:text-theme-primary ${
                    visible ? "px-4 md:px-5" : "px-3"
                } ${active ? "bg-theme-on-surface-2 !text-theme-primary" : ""}`}
                to={url}
            >
                {renderContent()}
            </Link>
        );
    } else {
        return (
            <button
                className={`group flex items-center h-12 rounded-full text-theme-secondary transition-colors hover:text-theme-primary ${
                    visible ? "px-4 md:px-5" : "px-3"
                } ${active ? "bg-theme-on-surface-2 !text-theme-primary" : ""}`}
                onClick={onClick}
            >
                {renderContent()}
            </button>
        );
    }

    function renderContent() {
        return (
            <>
                <div className="relative">
                    <Icon
                        className={`shrink-0 fill-theme-secondary transition-colors group-hover:fill-theme-primary ${
                            active ? "!fill-theme-primary" : ""
                        }`}
                        name={icon}
                    />
                    {notification && (
                        <div className="absolute top-0 right-0 w-3 h-3 border-2 border-theme-on-surface-1 bg-theme-red rounded-full"></div>
                    )}
                </div>
                <div className={`ml-4 text-base-1s ${visible ? "" : "hidden"}`}>
                    {title}
                </div>
                <Icon
                    className={`shrink-0 ml-auto fill-theme-primary opacity-0 transition-opacity ${
                        visible ? "" : "hidden"
                    } ${active ? "opacity-100" : ""}`}
                    name="arrow-next"
                />
            </>
        );
    }
};

export default NavLink;