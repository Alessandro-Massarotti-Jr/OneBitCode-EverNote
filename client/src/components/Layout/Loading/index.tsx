import { ImSpinner9 } from 'react-icons/im'

export default function Loading(){
    return(
        <div className="top-0 left-0 absolute w-full h-full flex items-center justify-center bg-darkFade-500">
            <div>
                <ImSpinner9 className='text-white w-10 h-10 animate-spin'/>
            </div>
        </div>
    );
}