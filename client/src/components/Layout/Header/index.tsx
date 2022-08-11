import Logo from "../../../assets/img/logo.png"
import LogoBranca from "../../../assets/img/logo-white.png"

import { IoMenu, IoClose } from "react-icons/io5"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserService from "../../../services/UserService";

export default function Header() {

    const [navbar, setNavbar] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') as string);

    function handlerNavbarOpen() {
        if (navbar) {
            setNavbar(false);
        } else {
            setNavbar(true);
        }
    }

    function handleLogout() {
        UserService.logout();
        navigate('/', { replace: true })
    }

    return (<>

        {localStorage.getItem('access_token') ?

            <header className=" flex px-2 py-4 items-center justify-between border-b border-black bg-custom-400">
                <div className="flex justify-between items-center md:min-w-0">
                    <Link to='/notes' replace={true}>
                        <img className=" h-10" src={LogoBranca} alt="Logo" />
                    </Link>

                </div>

                <div className="relative">
                    <span onClick={handlerNavbarOpen} className="border border-white text-white p-2 rounded-sm cursor-pointer hover:bg-white hover:text-zinc-900 transition-colors">
                        {user.name}
                    </span>
                    <ul className={`${navbar ? '' : 'hidden'} absolute top-9 bg-white w-full border border-custom-400`}>
                        <li className="p-2 border-b-2 border-custom-400 text-custom-400">
                            <Link to='/user/edit' replace={true}>User edit</Link>
                        </li>
                        <li className="p-2 text-custom-400">
                            <button className="cursor-pointer" onClick={() => { handleLogout() }}>Logout</button>
                        </li>
                    </ul>

                </div>
            </header>

            :

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
                            <Link to="/register" className="text-custom-400 py-2 px-4 mx-2 my-2 md:mt-0 transition-colors hover:text-custom-600 font-bold" replace={true}>Register</Link>
                        </li>
                        <li className="w-full my-2">
                            <Link to="/login" className="text-custom-400 font-bold py-2 px-4 mx-2 my-2 md:mt-0 transition-colors border border-custom-400 rounded-md hover:bg-custom-400 hover:text-white cursor-pointer" replace={true}>Login</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        }

    </>);
}