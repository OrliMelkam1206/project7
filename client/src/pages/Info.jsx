import React, { useEffect, useState } from "react";

export default function Info() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  return (
    <>
      <h1>Info</h1>
      <div className="info-container">
        <div className="info-detail">
          <label className="info-label"><strong>name:</strong></label>
          <br />
          <span>{userData?.name}</span>
          <br />
        </div><br/>
        <div className="info-detail">
          <label className="info-label"><strong>username:</strong></label>
          <br />
          <span>{userData?.username}</span>
          <br />
        </div><br/>
        <div className="info-detail">
          <label className="info-label"><strong>email:</strong></label>
          <br />
          <span>{userData?.email}</span>
          <br />
        </div>
      </div>
    </>
  );
}