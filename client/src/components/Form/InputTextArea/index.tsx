import { Dispatch, SetStateAction } from "react";

interface InputTextAreaProps{
    name:string;
    required:boolean;
    value:string;
    changeValue: Dispatch<SetStateAction<string>>;
}

export default function InputTextArea({name,required,value,changeValue}:InputTextAreaProps){
    return(
        <div className="flex flex-col justify-start items-start my-2">
            <label className="font-bold" htmlFor={name}>{name}</label>
            <textarea value={value} onChange={(event)=>{changeValue(event.target.value)}} className="min-w-[240px] min-h-[200px] w-full mt-1 py-2 px-3 border-2 border-zinc-600 bg-transparent rounded-md focus:border-zinc-900 focus:ring-zinc-900 focus:ring-1 focus:outline-none" name={name} id={name} required={required} />
        </div>
    );
}