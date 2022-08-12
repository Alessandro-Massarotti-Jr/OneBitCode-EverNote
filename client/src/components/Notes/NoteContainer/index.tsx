import { useEffect, useState } from "react";
import NoteService from "../../../services/NoteService";
import NoteCard from "../NoteCard";

interface Note{
    id:string,
    title:string,
    body:string
}

export default function NoteContainer(){

    const [notes,setNotes]= useState<Note[]>([]);

   async function getNotes(){

        const userNotes = await NoteService.index();
          setNotes(userNotes);
          console.log(notes);
          
    }

    useEffect(()=>{
        getNotes();
    },[])

    return(
        <section className="flex items-center justify-center flex-wrap w-10/12 mx-auto">
            {notes.map((note)=>{
                return <NoteCard key={note.id} id={note.id} title={note.title} body={note.body}/>
            })}
        </section>
    )
}