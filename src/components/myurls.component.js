import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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
                setMyUrls(response.data);
            } catch (error) {
                setMessage(
                    (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                );
            }
        };

        fetchMyUrls();
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
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span
                                    class="input-group-text"
                                    id="basic-addon3"
                                >
                                    https://example.com/
                                </span>
                            </div>
                            <input
                                type="text"
                                class="form-control"
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

            {myUrls.length > 0 ? (
                <ul className="list-group">
                    {myUrls.map((url, i) => (
                        <button onClick={() => handleShow(url)} key={i}>
                            {/* Pass complete item object here */}
                            <li className="list-group-item">{url}</li>
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
            <Modal show={show} onHide={handleClose}>
                {activeItem && ( // Check if activeItem is not null before accessing its properties
                    <>
                        <Modal.Header closeButton>
                            <h3>{activeItem.client}</h3>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{activeItem.description}</p>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </div>
    );
}

export default MyUrls;
