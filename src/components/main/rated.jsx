import React, { useState } from 'react';
import { Rate, Pagination } from 'antd';

const Rated = ({
    movieRatings,
    handleRateMovies,
    formattedDate,
    croppedText,
    truncateToOneDecimal,
    getRatingColor,
}) => {
    const [currentRatedPage, setCurrentRatedPage] = useState(1);
    const handleRatedPageChange = (currentRatedPage) => {
        setCurrentRatedPage(currentRatedPage);
    };

    const pageSize = 20;
    const startIndex = (currentRatedPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const moviesToDisplay = movieRatings.slice(startIndex, endIndex);
    return (
        <>
            <ul className="film-list" id="film-list">
                {moviesToDisplay.map((movie) => (
                    <li key={movie.id} className="film-list__item film-card">
                        <img
                            className="film-card__image"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <div className="film-card__content">
                            <h1 className="film-card__title">{movie.title}</h1>
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
                                value={movie.rating}
                                onChange={(newRating) =>
                                    handleRateMovies(movie.id, newRating)
                                }
                            />
                        </div>
                    </li>
                ))}
            </ul>
            {movieRatings.length > 0 && (
                <Pagination
                    className="pagination-list"
                    current={currentRatedPage}
                    total={movieRatings.length}
                    showSizeChanger={false}
                    pageSize={20}
                    onChange={handleRatedPageChange}
                />
            )}
        </>
    );
};

export default Rated;
