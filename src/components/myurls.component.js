import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import moment from "moment";

import UserService from "../services/user.service";

function MyUrls() {
    const [myUrls, setMyUrls] = useState([]);
    const [message, setMessage] = useState("");

    // state for item rendering modal
    const [show, setShow] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    // state for createUrlModal
    const [createUrlModal, setCreateUrlModal] = useState(false);

    useEffect(() => {
        const fetchMyUrls = async () => {
            try {
                const response = await UserService.getUserUrls();
                setMyUrls(response.data.data);
            } catch (error) {
                setMessage(
                    (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                );
            }
        };

        fetchMyUrls();
        console.log(myUrls);
    }, []);

    const handleShow = (item) => {
        setActiveItem(item); // Set the active item for the modal
        setShow(true); // Show the modal
    };

    const handleClose = () => {
        setShow(false); // Hide the modal
    };

    const handleCloseCreateUrlModal = () => {
        setCreateUrlModal(false); // Hide the modal
    };

    const generateNewURL = () => {
        // call for generating new url
        setCreateUrlModal(false);
    };

    // Function to format expiration date to a human-readable format
    const formatExpireDate = (expireDate) => {
        return moment(expireDate).format("MMMM Do YYYY, h:mm:ss a"); // Using Moment.js to format the date
    };

    return (
        <div>
            <div>
                <div className="row">
                    <h2 className="col-md-6">List of my urls</h2>
                    <div className="col-md-6 d-flex justify-content-end">
                        <button
                            onClick={() => setCreateUrlModal(true)}
                            type="button"
                            className="btn btn-primary"
                        >
                            Create new URL
                        </button>
                    </div>
                </div>
                <Modal
                    show={createUrlModal}
                    onHide={handleCloseCreateUrlModal}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <h3>New URL</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <label for="basic-url">Your original URL</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span
                                    className="input-group-text"
                                    id="basic-addon3"
                                >
                                    https://example.com/
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                id="basic-url"
                                aria-describedby="basic-addon3"
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleCloseCreateUrlModal}
                        >
                            Close
                        </Button>
                        <Button variant="primary" onClick={generateNewURL}>
                            Generate URL
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <hr></hr>

            {myUrls.length > 0 ? (
                <ul className="list-group">
                    {myUrls.map((url, i) => (
                        <button onClick={() => handleShow(url)} key={i}>
                            <li className="list-group-item">
                                {url.originalUrl}
                            </li>
                        </button>
                    ))}
                </ul>
            ) : (
                <div>
                    <p>No URLs found.</p>
                    {message && (
                        <div className="alert alert-danger">{message}</div>
                    )}
                </div>
            )}
            <Modal show={show} onHide={handleClose} size="lg">
                {activeItem && ( // Check if activeItem is not null before accessing its properties
                    <>
                        <Modal.Header closeButton>
                            <h3>Hash: {activeItem.hash}</h3>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                Expiration date:{" "}
                                {formatExpireDate(activeItem.expireDate)}
                            </p>{" "}
                            <p>
                                Shortened URL:{" "}
                                <a
                                    href={`${UserService.API_REDIRECT}${activeItem.hash}`}
                                    target="_blank"
                                >
                                    {UserService.API_REDIRECT}
                                    {activeItem.hash}
                                </a>
                            </p>
                            <p>Original URL: {activeItem.originalUrl}</p>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </div>
    );
}

export default MyUrls;