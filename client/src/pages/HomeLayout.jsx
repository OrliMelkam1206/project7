import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function HomeLayout() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  // useEffect(() => {
  //   (async () =>
  //     await fetchData(`users/${userId}`, "name", setUser, setError))();
  // }, []);

  return (
    <>
      <NavBar />
      {error != null && <p>{error}</p>}
      <h2>Hello {user.name}!</h2>
      <div className="home-body">
        <Outlet />
      </div>
    </>
  );
}