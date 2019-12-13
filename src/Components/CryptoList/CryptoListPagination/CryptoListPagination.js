import React from 'react';
import './CryptoListPagination.css';

const CryptoListPagination = (props) => {
    let { page, totalPages, handlePaginationClick} = props;
    return (
        <div className="Pagination">
            <button className="Pagination-button"
                    onClick={() => handlePaginationClick("next")}
                    disabled={page === 1}>
                &larr;
            </button>
            <span className="Pagination-info">{page} of {totalPages}</span>
            <button className="Pagination-button"
                    onClick={() => handlePaginationClick("prev")}
                    disabled={totalPages === page}>
                &rarr;
            </button>
        </div>
    )
};

export default CryptoListPagination;