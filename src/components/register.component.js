import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../themes/register.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // check if username or password is empty
        if (!email || !password) {
            setError("Please enter both username and password.");
            return;
        }

        try {
            await AuthService.register(username, email, password).then(
                (response) => {
                    // check for token and user already exists with 200
                    //   console.log("Sign up successfully", response);
                    navigate("/home");
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                    setError(
                        "Username already exists. Please provide another username."
                    );
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
                    <form onSubmit={handleSignup} className="mt-5">
                        <h3 className="mb-4">Sign up</h3>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
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
                            Sign up
                        </button>
                        {error && (
                            <div
                                className="alert alert-danger alert-margin"
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

export default Signup;
