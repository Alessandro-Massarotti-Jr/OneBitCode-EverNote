import Logo from "../../../assets/img/logo.png"

export default function Header(){
    return(
        
        <header className=" flex px-2 py-1 items-center justify-between border-b border-black">
            <img className=" h-10" src={Logo} alt="Logo" />
             <nav className="hidden md:flex ">
                <ul className="flex">
                    <li>
                        <a href="">page 1</a>
                    </li>
                    <li>
                        <a href="">page 2</a>
                    </li>
                </ul>
             </nav>
        </header>

    );
}