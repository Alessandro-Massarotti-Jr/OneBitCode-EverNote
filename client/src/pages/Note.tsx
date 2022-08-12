import { useState } from "react";
import Container from "../components/Layout/Container";
import NoteContainer from "../components/Notes/NoteContainer";
import NoteForm from "../components/Notes/NoteForm";

export default function Note(){
    const [isModalOpen,setIsModalOpen] = useState(false);
    return(
        <Container>
            <button onClick={()=>{setIsModalOpen(true)}} className="cursor-pointer px-3 py-1 border-2 border-custom-600 bg-custom-600 rounded transition-colors hover:bg-custom-400 hover:border-custom-400 text-white mx-1">Nova nota</button>
        <NoteContainer/>
        {isModalOpen &&  <NoteForm modalState={setIsModalOpen}/>}
        </Container>
    )
}