import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import moment from "moment";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../themes/myurls.css";

import UserService from "../services/user.service";
import Pagination from "../components/pagination.component";

function MyUrls() {
    const [myUrls, setMyUrls] = useState([]);
    const [message, setMessage] = useState("");

    // state for item rendering modal
    const [activeItem, setActiveItem] = useState(null);
    // state for viewUrlModal
    const [viewUrlModal, setViewUrlModal] = useState(false);

    // state for createUrlModal
    const [createUrlModal, setCreateUrlModal] = useState(false);

    // boolean state for rerendering every time generateNewUrl is called
    const [rerender, setRerender] = useState(false);

    // state for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [urlsPerPage] = useState(6);

    const indexOfLastUrl = currentPage * urlsPerPage;
    const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
    const [currentUrls, setCurrentUrls] = useState([]);

    const handleShow = (item) => {
        setActiveItem(item); // Set the active item for the modal
        setViewUrlModal(true); // Show the modal
    };

    const handleCloseCreateUrlModal = () => {
        setCreateUrlModal(false); // Hide the modal
    };

    const handleViewUrlModal = () => {
        setViewUrlModal(false); // Hide the modal
    };

    const generateNewURL = () => {
        const original = document.getElementById("basic-url").value;

        const postNewUrl = async () => {
            try {
                await UserService.postNewUrl(original);
                fetchMyUrls();
            } catch (error) {
                setMessage(
                    (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                );
            }
        };

        postNewUrl();
        setRerender(true);
        setCreateUrlModal(false);
    };

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

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        setRerender(false);
        fetchMyUrls();
    }, [rerender]);

    useEffect(() => {
        setCurrentUrls(
            [...myUrls].reverse().slice(indexOfFirstUrl, indexOfLastUrl)
        );
    }, [myUrls, currentPage, urlsPerPage]);

    const showNewestUrls = () => {
        setCurrentUrls(
            [...myUrls].reverse().slice(indexOfFirstUrl, indexOfLastUrl)
        );
    };

    const showOldestUrls = () => {
        setCurrentUrls([...myUrls].slice(indexOfFirstUrl, indexOfLastUrl));
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
                        <label htmlFor="basic-url">Your original URL</label>
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
                <div>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Filter by"
                        className="dropdown-margin"
                    >
                        <Dropdown.Item
                            href="#/filter-newest"
                            onClick={showNewestUrls}
                        >
                            Newest
                        </Dropdown.Item>
                        <Dropdown.Item
                            href="#/filter-oldest"
                            onClick={showOldestUrls}
                        >
                            Oldest
                        </Dropdown.Item>
                    </DropdownButton>
                    <ul className="list-group">
                        {currentUrls.map((url, i) => (
                            <button onClick={() => handleShow(url)} key={i}>
                                <li className="list-group-item">
                                    {url.originalUrl}
                                </li>
                            </button>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <p>No URLs found.</p>
                    {message && (
                        <div className="alert alert-danger">{message}</div>
                    )}
                </div>
            )}
            <Modal show={viewUrlModal} onHide={handleViewUrlModal} size="lg">
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
                                    rel="noreferrer"
                                >
                                    {UserService.API_REDIRECT}
                                    {activeItem.hash}
                                </a>
                            </p>
                            <p>Original URL: {activeItem.originalUrl}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={handleViewUrlModal}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
            <Pagination
                urlsPerPage={urlsPerPage}
                totalUrls={myUrls.length}
                paginate={paginate}
            />
        </div>
    );
}

export default MyUrls;
