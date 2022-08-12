import { useState } from "react";
import NoteService from "../../../services/NoteService";
import InputText from "../../Form/InputText";
import InputTextArea from "../../Form/InputTextArea";
import Loading from "../../Layout/Loading";

interface NoteFormProps{
    modalState:React.Dispatch<React.SetStateAction<boolean>>
}

export default function NoteForm({modalState}:NoteFormProps) {

    const [noteTitle,setNoteTitle] = useState('');
    const [noteBody,setNoteBody] = useState('');
    const [isFormLoading,setIsFormLoading]=useState(false);

    async function handleNoteSubmit(event:React.SyntheticEvent){
     event.preventDefault();
     setIsFormLoading(true);
     const userJson = localStorage.getItem('user');
     const authUser = JSON.parse(userJson as string);
     await NoteService.create({title:noteTitle,body:noteBody,authorId:authUser.id})
     modalState(false);
     setIsFormLoading(false);
    }

    return (
        <div className="flex items-center justify-center fixed bg-darkFade-700 w-full h-full top-0 left-0">
           <form onSubmit={(event)=>{handleNoteSubmit(event)}} className="relative bg-white p-4 rounded flex flex-col">
              <h3 className="text-custom-600 font-bold text-2xl">criar nova nota</h3>
              <InputText required={true} value={noteTitle} changeValue={setNoteTitle} name="titulo da nota" type="text"/>
              <InputTextArea required={true} value={noteBody} changeValue={setNoteBody} name="titulo da nota"/>
              <div className="mt-2 flex w-full justify-end items-center">
                <button onClick={()=>{modalState(false)}} className="cursor-pointer px-3 py-1 border-2 border-custom-600 rounded transition-colors hover:bg-custom-600  hover:text-white mx-1">Fechar</button>
                <button type="submit" className="cursor-pointer px-3 py-1 border-2 border-custom-600 bg-custom-600 rounded transition-colors hover:bg-custom-400 hover:border-custom-400 text-white mx-1">Salvar</button>
              </div>
              {isFormLoading && <Loading/>}
           </form>
        </div>
    )
}