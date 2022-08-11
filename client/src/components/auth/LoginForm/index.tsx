import { useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../../services/UserService";
import InputText from "../../Form/InputText";
import {useNavigate} from "react-router-dom"
import Loading from "../../Layout/Loading";

export default function LoginForm(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [isFormLoading,setIsFormLoading] = useState(false);

    const navigate = useNavigate();

   async function handleFormSubmit(event:React.SyntheticEvent){
      event.preventDefault();
      setIsFormLoading(true);
      try{
       await UserService.login({email:email,password:password});
        navigate('/notes',{replace:true})
      }catch(error){
       console.log(error);
       
      } 
      setIsFormLoading(false);
    }

    return(
        <form onSubmit={(event)=>{handleFormSubmit(event)}} className="flex flex-col items-center justify-center text-zinc-600" action="">
            {isFormLoading && <Loading/>}
            <InputText value={email} changeValue={setEmail} name="Email" type="email" required={true}/>
            <InputText value={password} changeValue={setPassword} name="Password" type="password" required={true}/>
           <div className="flex">
           <Link to="/register" className="text-custom-400 py-2 px-4 mx-2 my-2 md:mt-0 transition-colors hover:text-custom-600 font-bold"  replace={true}>Register</Link>
            <button className="text-custom-400 font-bold py-2 px-4 mx-2 my-2 md:mt-0 transition-colors border border-custom-400 rounded-md hover:bg-custom-400 hover:text-white cursor-pointer"  type="submit">Login</button>
           </div>
        </form>
    );
}