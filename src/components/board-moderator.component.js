import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";

function BoardModerator() {
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchBoardModeratorContent = async () => {
            try {
                const response = await UserService.getModeratorBoard();
                setContent(response.data);
            } catch (error) {
                setContent(
                    (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                );
            }
        };

        fetchBoardModeratorContent();
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
}

export default BoardModerator;
