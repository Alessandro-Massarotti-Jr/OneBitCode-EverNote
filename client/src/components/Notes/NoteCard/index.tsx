import { useState } from "react"
import NoteUpdateForm from "../NoteUpdateForm"

interface NoteCardProps {
    id: string,
    title: string,
    body: string
}

export default function NoteCard({ id, title, body }: NoteCardProps) {
    const [updateModal,setUpdateModal] = useState(false)
    return (
        <>
            <div onClick={()=>{setUpdateModal(true)}} className="group w-60 h-60 shadow-md shadow-black m-3 flex items-center justify-center border-2 rounded border-custom-600 transition-colors cursor-pointer hover:bg-custom-600">
                <h3 className=" text-center flex group-hover:hidden text-xl">{title}</h3>
                <p className=" text-center hidden group-hover:flex text-white text-base">{body}</p>
            </div>
            {updateModal && <NoteUpdateForm id={id} title={title} body={body} modalState={setUpdateModal} />}
        </>
    )
}