
import Logo from "../../assets/img/logo.png"
import LoginForm from "../../components/auth/LoginForm";
import Container from "../../components/Layout/Container";


export default function Login() {
  return (
    <Container>
      <section className="min-h-screen flex md:flex-row flex-col justify-center items-center md:py-2 py-12 px-3 bg-gradient-to-tr from-custom-400 to-custom-600 text-white">
        <div className="relative bg-white p-5 flex flex-col justify-center items-center text-center">
          <img className="w-50 " src={Logo} alt="logo" />
          <p className="text-zinc-600 mt-3 text-xl">your notes on the cloud</p>
          <LoginForm />
        </div>
      </section>
    </Container>
  );
}