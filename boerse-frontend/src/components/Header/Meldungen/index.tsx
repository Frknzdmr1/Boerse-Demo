import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import {Link} from "react-router-dom";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

import { meldungen } from "@/mocks/meldungen";

//type NotificationsProps = Record<string, never>;

const Meldungen = () => {
    return (
        <Menu className="relative md:static" as="div">
            <MenuButton className="relative group w-12 h-12 md:w-8 md:h-8">
                <Icon
                    className="fill-theme-secondary transition-colors group-hover:fill-theme-primary ui-open:fill-theme-primary"
                    name="meldungen"
                />
                <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-2 border-theme-n-8 bg-theme-red rounded-full md:top-0 md:right-1"></div>
            </MenuButton>
            <Transition
                enter="duration-200 ease-out"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="duration-300 ease-out"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
            >
                <MenuItems
                    className="absolute top-full -right-18 w-[21.25rem] mt-2 rounded-2xl border border-theme-stroke bg-theme-surface-pure shadow-depth-1 md:w-auto md:max-h-[calc(100vh-6.4375rem)] md:left-4 md:right-4 md:mt-0 md:overflow-auto md:scrollbar-none md:scroll-smooth"
                    modal={false}
                >
                    <div className="">
                        {meldungen.map((meldung) => (
                            <div
                                className="flex p-4 border-b border-theme-stroke last:border-0"
                                key={meldung.id}
                            >
                                <div
                                    className={`flex justify-center items-center shrink-0 w-12 h-12 rounded-full ${
                                        meldung.type === "alert"
                                            ? "bg-theme-red-100"
                                            : meldung.type === "update"
                                                ? "bg-theme-green-100"
                                                : "bg-theme-brand-100"
                                    }`}
                                >
                                    <Image
                                        className="w-5 opacity-100"
                                        src={
                                            meldung.type === "alert"
                                                ? "/images/bell-red.svg"
                                                : meldung.type === "update"
                                                    ? "/images/number-one.svg"
                                                    : "/images/bell-blue.svg"
                                        }
                                        width={20}
                                        height={20}
                                        alt=""
                                    />
                                </div>
                                <div className="grow pl-4">
                                    <div className="notification text-caption-1 text-theme-secondary">
                                        {meldungen.content}
                                    </div>
                                    <div className="mt-2 text-caption-2m text-theme-secondary">
                                        {meldungen.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4">
                        <Link
                            className="btn-secondary w-full"
                            to="/meldungen"
                        >
                            Alle Meldungen anzeigen
                        </Link>
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    );
};

export default Meldungen;
