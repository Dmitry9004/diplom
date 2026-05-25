import logo from './logo.svg';
import './App.css';
import {redirect, Route, Routes} from "react-router";
import {HomePage} from "./pages/main/HomePage.tsx";
import {LoginPage} from "./pages/main/LoginPage.tsx";
import {BrandPage} from "./pages/brands/BrandPage.tsx";
import {RegisterPage} from "./pages/main/RegisterPage.tsx";

async function authMiddleware({context}, next) {
    // window.location.href = "/login"
    // await next();
}

function App() {
  return (
      <Routes>
        <Route path={"/"} middleware={[authMiddleware]} element={<HomePage/>}/>
        <Route path={"/login"} element={<LoginPage/>}/>
        <Route path={"/register"} element={<RegisterPage/>}/>
        <Route path={"/brands"} middleware={authMiddleware} element={<BrandPage/>}/>
      </Routes>
  );
}

export default App;
