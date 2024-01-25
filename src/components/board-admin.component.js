import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";

function BoardAdmin() {
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchBoardAdminContent = async () => {
            try {
                const response = await UserService.getAdminBoard();
                setContent(response.data);
            } catch (error) {
                setContent(
                    (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                );
            }
        };

        fetchBoardAdminContent();
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
}

export default BoardAdmin;
