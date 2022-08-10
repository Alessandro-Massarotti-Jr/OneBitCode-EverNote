import { Link } from "react-router-dom";
import Presentation from "../assets/img/presentation.png"
import Container from "../components/Layout/Container";


export default function Home() {
    return (
        <Container>
            <section className="min-h-screen flex md:flex-row flex-col justify-around items-center md:py-2 py-12 px-3 bg-gradient-to-tr from-custom-400 to-custom-600 text-white">
                <div className="md:max-w-[50%] flex flex-col items-start justify-center">
                    <h1 className="font-bold text-3xl md:text-5xl">Create notes easily and access when you wants on the cloud</h1>
                    <p className="mt-4 text-sm md:text-xl"> Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
                    <p className="mt-4 text-sm md:text-xl"> Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
                    <Link to="/register" replace={true} className="mt-4 text-center text-xl border-2 border-white py-2 px-4 hover:bg-white hover:text-custom-400 transition-colors rounded">Register for free now</Link>
                </div>
                <div>
                    <img src={Presentation} alt="presentation" />
                </div>
            </section>
        </Container>
    );
}