import React from 'react';
import { Pagination } from 'antd';
import FilmCard from './filmCard';

const Search = ({
    movies,
    ratedMovies,
    handleRateMovies,
    currentPage,
    handlePageChange,
    totalResults,
}) => {
    return (
        <>
            <ul className="film-list" id="film-list">
                {movies.map((movie) => {
                    const movieRating = ratedMovies.find(
                        (ratedMovie) => ratedMovie.id === movie.id
                    )?.rating;

                    return (
                        <FilmCard
                            key={movie.id}
                            movie={movie}
                            movieRating={movieRating}
                            handleRateMovies={handleRateMovies}
                        />
                    );
                })}
            </ul>
            {movies.length > 0 && (
                <Pagination
                    className="pagination-list"
                    current={currentPage}
                    onChange={handlePageChange}
                    total={totalResults}
                    showSizeChanger={false}
                    pageSize={20}
                />
            )}
        </>
    );
};

export default Search;
