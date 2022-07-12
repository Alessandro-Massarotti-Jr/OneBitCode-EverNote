import Presentation from "../assets/img/presentation.png"

export default function Home(){
    return(
        <section className="h-screen flex justify-around items-center py-2 px-3 bg-gradient-to-tr from-custom-400 to-custom-600 text-white">
            <div className="max-w-[50%] flex flex-col items-start justify-center">
                <h1 className="font-bold text-5xl">Create notes easily and access when you wants on the cloud</h1>
                <p className="mt-4 text-xl"> Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
                <p className="mt-4 text-xl"> Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
                <a href="" className="mt-4 text-center text-xl border-2 border-white py-2 px-4 hover:bg-white hover:text-custom-400 transition-colors rounded">Register for free now</a>
            </div>
            <div>
                <img src={Presentation} alt="presentation" />
            </div>
        </section>
    );
}