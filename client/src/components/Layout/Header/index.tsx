import Logo from "../../../assets/img/logo.png"

import { IoMenu, IoClose } from "react-icons/io5"
import { useState } from "react";
import { Link } from "react-router-dom";

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

        <header className=" flex flex-col md:flex-row px-2 py-4 items-center justify-between border-b border-black">
            <div className="flex min-w-full justify-between items-center md:min-w-0">
                <Link to='/' replace={true}>
                <img className=" h-10" src={Logo} alt="Logo" />
                </Link>
  
                {navbar 
                        ?
                        <IoClose onClick={handlerNavbarOpen} className=" md:hidden w-7 h-7 cursor-pointer transition-colors hover:text-custom-400" />
                        :
                        <IoMenu onClick={handlerNavbarOpen} className=" md:hidden w-7 h-7 cursor-pointer transition-colors hover:text-custom-400" />
                }
            </div>

            <nav className={`${navbar ? 'flex' : 'hidden'} min-w-full md:min-w-0 md:flex `}>
                <ul className="py-2 flex flex-col items-start md:flex-row md:items-center">
                    <li className="w-full my-2">
                        <Link to="/register" className="text-custom-400 py-2 px-4 mx-2 my-2 md:mt-0 transition-colors hover:text-custom-600 transition-colors font-bold" replace={true}>Register</Link>
                    </li>
                    <li className="w-full my-2">
                        <Link to="/login" className="text-custom-400 font-bold py-2 px-4 mx-2 my-2 md:mt-0 transition-colors border border-custom-400 rounded-md hover:bg-custom-400 hover:text-white transition-colors cursor-pointer" replace={true}>Login</Link>
                    </li>
                </ul>
            </nav>
        </header>

    );
}