
import api from "./api";

interface RegisterProps {
    name: string,
    email: string,
    password: string
}

interface LoginProps {
    email: string,
    password: string
}


class UserService {
    async register({ name, email, password }: RegisterProps) {
        await api.post('/users/register', {
            name: name,
            email: email,
            password: password
        })
    }
    async login({ email, password }: LoginProps) {
        const response = await api.post('/users/login', {
            email: email,
            password: password
        })   
        localStorage.setItem("access_token",response.data.data.token)
    }
}

export default new UserService();