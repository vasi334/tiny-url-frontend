import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import MyUrls from "./components/myurls.component";

function App() {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const user = AuthService.getCurrentUser();

            if (user) {
                setCurrentUser(user);
                setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
                setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            }
        };
        fetchData();
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(null);
        setShowModeratorBoard(false);
        setShowAdminBoard(false);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-expand navbar-dark bg-dark fixed-top">
                <Link to={"/"} className="navbar-brand">
                    TinyURL
                </Link>
                <div className="navbar-nav mr-auto">
                    {/* <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li> */}

                    {showModeratorBoard && (
                        <li className="nav-item">
                            <Link to={"/mod"} className="nav-link">
                                Moderator Board
                            </Link>
                        </li>
                    )}

                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                                User
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                Your profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a
                                href="/myurls"
                                className="nav-link"
                                onClick={() => {}}
                            >
                                MyURLs
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="/login"
                                className="nav-link"
                                onClick={logOut}
                            >
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Sign In
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <nav className="navbar navbar-expand navbar-dark bg-dark fixed-bottom">
                <div className="navbar-nav mr-auto">
                    <li className="nav-link">Copyright &copy;</li>
                    <li className="nav-link">Terms</li>
                    <li className="nav-link">Privacy Policy</li>
                    <li className="nav-link">Accessibility</li>
                </div>
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/user" element={<BoardUser />} />
                    <Route path="/mod" element={<BoardModerator />} />
                    <Route path="/admin" element={<BoardAdmin />} />
                    <Route path="/myurls" element={<MyUrls />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
