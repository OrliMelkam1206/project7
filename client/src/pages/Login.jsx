import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../functions/API_URL";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const user = { username: username, password: password };
        const result = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
            },
            body: JSON.stringify(user),
        });
        console.log(result.status);
        if (result.status === 400) {
            setError("username or password are incorrect");
        } else if (result.status === 404) {
            setError("something went wrong");
        } else {
            setError(null);
            localStorage.setItem("currentUser", JSON.stringify({id: result.id, name: result.name, username: result.username, email: result.email}))
            navigate(`/home/${user.username}`);
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="inside-form">Login</h1>
            <label className="inside-form">Username:</label><br/>
            <input
                className="inside-form"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label className="inside-form">Password:</label><br/>
            <input
                className="inside-form"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className="inside-form">Submit</button>
            <br />
            <Link className="inside-form" to="/register">
                Sign Up
            </Link>
            <p className="inside-form">{error}</p>
        </form>
    );
}