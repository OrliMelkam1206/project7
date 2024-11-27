import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { API_URL } from "../functions/API_URL";

export default function HomeLayout() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")))
    console.log('JSON.parse(localStorage.getItem("currentUser")): ', JSON.parse(localStorage.getItem("currentUser")));
  }, [])

  return (
    <>
      <NavBar />
      {error != null && <p>{error}</p>}
      <h2>Hello {user?.name}!</h2>
      <div className="home-body">
        <Outlet />
      </div>
    </>
  );
}