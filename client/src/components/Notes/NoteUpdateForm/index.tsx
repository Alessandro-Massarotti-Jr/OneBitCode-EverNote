import { useState } from "react";
import NoteService from "../../../services/NoteService";
import InputText from "../../Form/InputText";
import InputTextArea from "../../Form/InputTextArea";
import Loading from "../../Layout/Loading";

interface NoteUpdateFormProps{
    modalState:React.Dispatch<React.SetStateAction<boolean>>,
    id:string,
    title:string,
    body:string
}

export default function NoteUpdateForm({modalState,id,title,body}:NoteUpdateFormProps) {

    const [noteId,setNoteId] = useState(id);
    const [noteTitle,setNoteTitle] = useState(title);
    const [noteBody,setNoteBody] = useState(body);

    const [isFormLoading,setIsFormLoading]=useState(false);

    async function handleNoteSubmit(event:React.SyntheticEvent){
     event.preventDefault();
     setIsFormLoading(true);
     const userJson = localStorage.getItem('user');
     const authUser = JSON.parse(userJson as string);
     await NoteService.update({id:noteId,title:noteTitle,body:noteBody});
     modalState(false);
     setIsFormLoading(false);
    }

    async function deleteNote(){
        setIsFormLoading(true);
        await NoteService.delete({id:noteId});
        modalState(false);
        setIsFormLoading(false);
    }

    return (
        <div className="flex items-center justify-center fixed bg-darkFade-700 w-full h-full top-0 left-0">
           <form onSubmit={(event)=>{handleNoteSubmit(event)}} className="relative bg-white p-4 rounded flex flex-col">
              <h3 className="text-custom-600 font-bold text-2xl">Atualizar nota</h3>
              <InputText required={true} value={noteTitle} changeValue={setNoteTitle} name="titulo da nota" type="text"/>
              <InputTextArea required={true} value={noteBody} changeValue={setNoteBody} name="titulo da nota"/>
              <div className="mt-2 flex w-full justify-end items-center">
                <button onClick={()=>{modalState(false)}} className="cursor-pointer px-3 py-1 border-2 border-custom-600 rounded transition-colors hover:bg-custom-600  hover:text-white mx-1">Fechar</button>
                <button onClick={()=>{deleteNote()}} className="cursor-pointer px-3 py-1 border-2 bg-zinc-600 border-zinc-600 rounded transition-colors hover:bg-zinc-800   text-white mx-1">Deletar</button>
                <button type="submit" className="cursor-pointer px-3 py-1 border-2 border-custom-600 bg-custom-600 rounded transition-colors hover:bg-custom-400 hover:border-custom-400 text-white mx-1">Atualizar</button>
              </div>
              {isFormLoading && <Loading/>}
           </form>
        </div>
    )
}