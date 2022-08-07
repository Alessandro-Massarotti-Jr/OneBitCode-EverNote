
import Api from "./api";

interface RegisterProps{
    name:string,
    email:string,
    password:string
}

class UserService{
    register({name,email,password}:RegisterProps){
      Api.post('/users/register',{
        name:name,
        email:email,
        password:password
      })
    }
}

export default new UserService();