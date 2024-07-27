import { useState, useEffect, ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface LayoutProps {
    title: string;
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
    const [visible, setVisible] = useState<boolean>(true);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const isDesktop = useMediaQuery({ query: '(max-width: 1259px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    useEffect(() => {
        setVisible(isMobile || !isDesktop);
    }, [isMobile, isDesktop]);

    return (
        <div id={"bodycontent"}
            className={`min-h-screen ${
                visible
                    ? "pl-[21.25rem] 2xl:pl-76 xl:pl-20 md:pl-0"
                    : "pl-20 md:pl-0"
            }`}
        >
            <Sidebar className={`md:transition-transform ${
                    showMenu ? "md:translate-x-0" : "md:-translate-x-full"
                }`}
                visible={visible}
                onClick={() => setVisible(!visible)}
            />
            <div className="">
                <div className="max-w-[80rem] mx-auto pt-24 px-10 pb-10 pt-40 lg:px-6 md:pt-20 md:px-4 md:pb-8">
                    <Header
                        visible={visible}
                        title={title}
                        onClickBurger={() => setShowMenu(!showMenu)}
                        showMenu={showMenu}
                    />
                    {title && (
                        <div
                            className="hidden md:flex items-center h-16 mb-2 px-4 bg-theme-on-surface-1 rounded-2xl text-h5">
                            {title}
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;