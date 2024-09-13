import React from 'react';
import { Pagination } from 'antd';

const Footer = ({ currentPage, updateCurrentPage, totalResults }) => {
    const handlePageChange = (currentPage) => {
        updateCurrentPage(currentPage);
    };
    return (
        <footer>
            {totalResults > 0 && (
                <Pagination
                    className="pagination-list"
                    current={currentPage}
                    onChange={handlePageChange}
                    total={totalResults}
                    showSizeChanger={false}
                    pageSize={20}
                />
            )}
        </footer>
    );
};

export default Footer;
