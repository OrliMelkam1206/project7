import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeLayout from "./pages/HomeLayout";
import Posts from "./pages/Posts";
// import Todos from "./pages/Todos";
import Info from "./pages/Info";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="home/:id/" element={<HomeLayout />}>
              <Route path="posts" element={<Posts />} />
              {/* <Route path="todos" element={<Todos />} />*/}
              <Route path="info" element={<Info />} />  
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;