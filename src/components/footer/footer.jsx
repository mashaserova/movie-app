import React from 'react';
import { Pagination } from 'antd';

const Footer = ({
    activeTab,
    currentPage,
    updateCurrentPage,
    totalResults,
}) => {
    const handlePageChange = (currentPage) => {
        updateCurrentPage(currentPage);
    };
    return (
        <footer>
            {activeTab === 'search' && totalResults > 0 ? (
                <Pagination
                    className="pagination-list"
                    current={currentPage}
                    onChange={handlePageChange}
                    total={totalResults}
                    showSizeChanger={false}
                    pageSize={20}
                />
            ) : (
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
