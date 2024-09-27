import React, { useState } from 'react';
import { Pagination } from 'antd';

const Footer = ({
    movies,
    ratedMovies,
    activeTab,
    currentPage,
    updateCurrentPage,
    totalResults,
}) => {
    const [currentRatedPage, setCurrentRatedPage] = useState(1);
    const handleRatedPageChange = (page) => {
        setCurrentRatedPage(page);
    };
    const handlePageChange = (currentPage) => {
        updateCurrentPage(currentPage);
    };
    const moviesToDisplay = activeTab === 'search' ? movies : ratedMovies;
    const totalItems =
        activeTab === 'search' ? totalResults : ratedMovies.length;
    const current = activeTab === 'search' ? currentPage : currentRatedPage;
    const onChange =
        activeTab === 'search' ? handlePageChange : handleRatedPageChange;
    return (
        <footer>
            {moviesToDisplay.length > 0 && (
                <Pagination
                    className="pagination-list"
                    current={current} // Используем переменную current
                    onChange={onChange} // Используем переменную onChange
                    total={totalItems} // Используем переменную totalItems
                    showSizeChanger={false}
                />
            )}
        </footer>
    );
};

export default Footer;
