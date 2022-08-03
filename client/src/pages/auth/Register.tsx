
import Logo from "../../assets/img/logo.png"
import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {
    return (
        <section className="min-h-screen flex md:flex-row flex-col justify-center items-center md:py-2 py-12 px-3 bg-gradient-to-tr from-custom-400 to-custom-600 text-white">
               <div className="bg-white p-5 flex flex-col justify-center items-center text-center">
                 <img className="w-50 " src={Logo} alt="logo" />
                 <p className="text-zinc-600 mt-3 text-xl">your notes on the cloud</p>
                 <RegisterForm/>
               </div>
        </section>
    );
}