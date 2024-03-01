import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../themes/login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // check if username or password is empty
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        try {
            setError(null);
            await AuthService.login(username, password).then(
                () => {
                    navigate("/home");
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                    setError("Invalid credentials.");
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleLogin} className="mt-5">
                        <h3 className="mb-4">Sign In</h3>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                        >
                            Log in
                        </button>
                        {error && (
                            <div
                                class="alert alert-danger alert-margin"
                                role="alert"
                            >
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
