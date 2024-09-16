import React from 'react';
import { Rate, Pagination } from 'antd';
import defaultImage from './default-image.jpg';

const Search = ({
    movies,
    movieRatings,
    handleRateMovies,
    formattedDate,
    croppedText,
    currentPage,
    handlePageChange,
    totalResults,
    truncateToOneDecimal,
    getRatingColor,
}) => {
    return (
        <>
            <ul className="film-list" id="film-list">
                {movies.map((movie) => {
                    // Находим рейтинг фильма в movieRatings
                    const movieRating = movieRatings.find(
                        (ratedMovie) => ratedMovie.id === movie.id
                    )?.rating;

                    return (
                        <li
                            key={movie.id}
                            className="film-list__item film-card"
                        >
                            <img
                                className="film-card__image"
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : defaultImage
                                }
                                alt={movie.title}
                            />
                            <div className="film-card__content">
                                <h1 className="film-card__title">
                                    {movie.title}
                                </h1>
                                <span
                                    className="film-card__vote-average"
                                    style={{
                                        border: `2px solid ${getRatingColor(
                                            movie.vote_average
                                        )}`,
                                        borderRadius: '50%',
                                    }}
                                >
                                    {truncateToOneDecimal(movie.vote_average)}
                                </span>
                                <time className="film-card__release-date">
                                    {formattedDate(movie.release_date)}
                                </time>
                                {movie.genre_names.map((genreName) => {
                                    return (
                                        <span
                                            key={genreName}
                                            className="film-card__genre"
                                        >
                                            {genreName}
                                        </span>
                                    );
                                })}
                                <p className="film-card__description">
                                    {croppedText(movie.overview)}
                                </p>
                                <Rate
                                    className="film-card__rating-stars"
                                    count={10}
                                    allowHalf
                                    value={movieRating || 0}
                                    onChange={(newRating) =>
                                        handleRateMovies(movie.id, newRating)
                                    }
                                />
                            </div>
                        </li>
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
