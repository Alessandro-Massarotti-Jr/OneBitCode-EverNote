import Logo from "../../../assets/img/logo.png"

import { IoMenu, IoClose } from "react-icons/io5"
import { useState } from "react";

export default function Header() {

    const [navbar, setNavbar] = useState(false);

    function handlerNavbarOpen() {
        if (navbar) {
            setNavbar(false);
        } else {
            setNavbar(true);
        }
    }

    return (

        <header className=" flex flex-col md:flex-row px-2 py-1 items-center justify-between border-b border-black">
            <div className="flex min-w-full justify-between items-center md:min-w-0">
                <img className=" h-10" src={Logo} alt="Logo" />
                {navbar 
                        ?
                        <IoClose onClick={handlerNavbarOpen} className=" md:hidden w-7 h-7 cursor-pointer transition-colors hover:text-custom-400" />
                        :
                        <IoMenu onClick={handlerNavbarOpen} className=" md:hidden w-7 h-7 cursor-pointer transition-colors hover:text-custom-400" />
                }
            </div>

            <nav className={`${navbar ? 'flex' : 'hidden'} min-w-full md:min-w-0 md:flex `}>
                <ul className="flex flex-col items-start md:flex-row md:items-center">
                    <li className="mx-2 my-2 md:mt-0 transition-colors hover:text-custom-400">
                        <a href="">page 1</a>
                    </li>
                    <li className="mx-2 my-2 md:mt-0 transition-colors hover:text-custom-400">
                        <a href="">page 2</a>
                    </li>
                </ul>
            </nav>
        </header>

    );
}