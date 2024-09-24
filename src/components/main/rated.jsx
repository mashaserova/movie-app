import React, { useState } from 'react';
import { Pagination } from 'antd';
import FilmCard from './filmCard';

const Rated = ({ ratedMovies, handleRateMovies }) => {
    const [currentRatedPage, setCurrentRatedPage] = useState(1);
    const handleRatedPageChange = (currentRatedPage) => {
        setCurrentRatedPage(currentRatedPage);
    };
    const pageSize = 20;
    const startIndex = (currentRatedPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const moviesToDisplay = ratedMovies.slice(startIndex, endIndex);
    return (
        <>
            <ul className="film-list" id="film-list">
                {moviesToDisplay.map((movie) => (
                    <FilmCard
                        key={movie.id}
                        movie={movie}
                        movieRating={movie.rating}
                        handleRateMovies={handleRateMovies}
                    />
                ))}
            </ul>
            {ratedMovies.length > 0 && (
                <Pagination
                    className="pagination-list"
                    current={currentRatedPage}
                    total={ratedMovies.length}
                    showSizeChanger={false}
                    pageSize={20}
                    onChange={handleRatedPageChange}
                />
            )}
        </>
    );
};

export default Rated;
