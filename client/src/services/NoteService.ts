import { title } from "process";
import { IoBody } from "react-icons/io5";
import api from "./api";

interface NoteProps{
    title:string,
    body:string,
    authorId:string
}

interface NoteUpdateProps{
    id:string,
    title:string,
    body:string,
}

interface NoteDeleteProps{
    id:string,
}


class NoteService{

   async index(){
      const response = await api.get('/notes');
      return response.data.data;
    }

    async create({title,body,authorId}:NoteProps){
        const response = await api.post('/notes',{
            title:title,
            body:body,
            authorId:authorId
        });

      }     
      async update({id,title,body}:NoteUpdateProps){
           const response = await api.put(`/notes/${id}`,{
            title:title,
            body:body
           })
      }
      async delete({id}:NoteDeleteProps){
        const response = await api.delete(`/notes/${id}`)
      }
}

export default new NoteService();