import React, { useEffect, useState } from "react";

import "../themes/home.css";

import UserService from "../services/user.service";

function Home() {
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchPublicContent = async () => {
            try {
                const response = await UserService.getPublicContent();
                setContent(response.data);
            } catch (error) {
                setContent(
                    (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                );
            }
        };

        fetchPublicContent();
    }, []);

    return (
        <>
            <div className="container bg-info rounded">
                <header className="jumbotron bg-info">
                    <h3 className="text-center">
                        Create shorter URLs with TinyURL.
                    </h3>
                </header>
            </div>
            <div className="container bg-info rounded">
                <header className="jumbotron bg-info">
                    <h3>What is a shortened URL?</h3>
                    <hr className="my-4"></hr>
                    <a
                        className="btn btn-primary btn-lg"
                        href="https://en.wikipedia.org/wiki/URL_shortening"
                        target="_blank"
                        role="button"
                    >
                        Learn more
                    </a>
                </header>
            </div>
        </>
    );
}

export default Home;
