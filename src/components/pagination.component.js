import React, { useState } from "react";
import "../themes/pagination.css";

function Pagination(props) {
    const pageNumbers = [];

    const [activePage, setActivePage] = useState(1);

    for (let i = 1; i <= Math.ceil(props.totalUrls / props.urlsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageClick = (pageNumber) => {
        setActivePage(pageNumber);
        props.paginate(pageNumber);
    };

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <button
                            onClick={() => handlePageClick(number)}
                            className={`page-link ${
                                activePage === number ? "active" : ""
                            }`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;
