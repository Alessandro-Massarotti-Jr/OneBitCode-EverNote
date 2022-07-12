import { BrowserRouter } from "react-router-dom";
import Header from "./components/Layout/Header";
import './index.css';
import Router from "./Router";


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  )
}
