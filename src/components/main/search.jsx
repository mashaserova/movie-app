import React from 'react';
import { Rate } from 'antd';
import defaultImage from './default-image.jpg';

const Search = ({
    movies,
    movieRatings,
    handleRateMovies,
    formattedDate,
    croppedText,
}) => {
    return (
        <ul className="film-list" id="film-list">
            {movies.map((movie) => (
                <li key={movie.id} className="film-list__item film-card">
                    {console.log(
                        'Путь к постеру для ',
                        movie.title,
                        ':',
                        movie.poster_path
                    )}
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
                        <h1 className="film-card__title">{movie.title}</h1>
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
                            count={10}
                            allowHalf
                            value={movieRatings[movie.id] || 0}
                            onChange={(newRating) =>
                                handleRateMovies(movie.id, newRating)
                            }
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default Search;
