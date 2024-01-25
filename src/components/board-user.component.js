import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";

function BoardUser() {
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchBoardUserContent = async () => {
            try {
                const response = await UserService.getUserBoard();
                setContent(response.data);
            } catch (error) {
                setContent(
                    (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                );
            }
        };

        fetchBoardUserContent();
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
}

export default BoardUser;
