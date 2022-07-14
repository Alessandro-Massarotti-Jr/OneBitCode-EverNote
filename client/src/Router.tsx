import { Routes, Route } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from "./pages/Home"
import UserEdit from './pages/UserEdit';


export default function Router() {
    return (
       
            <Routes>
                <Route path="/" element={ <Home />}></Route>
                <Route path="/register" element={ <Register />}></Route>
                <Route path="/login" element={ <Login />}></Route>
                <Route path="/user/edit" element={ <UserEdit />}></Route>
            </Routes>
   
    );
}