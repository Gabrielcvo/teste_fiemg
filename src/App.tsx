import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { User } from "./Pages/User";

import "./Styles/global.scss";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/user" element={<User />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
