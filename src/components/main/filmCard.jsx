import React, { useContext } from 'react';
import { Rate } from 'antd';
import { format } from 'date-fns';
import defaultImage from '../../assets/images/default-image.jpg';
import { GenreContext } from '../../context/genreContext';

const FilmCard = ({ movie, movieRating, handleRateMovies }) => {
    const genres = useContext(GenreContext);
    const formattedDate = (unformattedDate) => {
        if (!unformattedDate) {
            return 'Invalid date format';
        }
        const date = new Date(unformattedDate);
        if (isNaN(date.getTime())) {
            return 'Invalid date format';
        } else {
            return format(date, 'MMMM dd, yyyy');
        }
    };

    const croppedText = (uncropptedText) => {
        const maxLength = 150;
        const ellipsis = '...';

        if (uncropptedText.length <= maxLength) {
            return uncropptedText;
        } else {
            const lastSpaceIndex = uncropptedText.lastIndexOf(' ', maxLength);
            if (lastSpaceIndex !== -1) {
                return uncropptedText.substring(0, lastSpaceIndex) + ellipsis;
            } else {
                return (
                    uncropptedText.substring(0, maxLength - ellipsis.length) +
                    ellipsis
                );
            }
        }
    };
    const getRatingColor = (number) => {
        const ratingNumber = truncateToOneDecimal(number);
        if (0 < ratingNumber && ratingNumber < 3) {
            return 'vote-average__awfull';
        } else if (ratingNumber < 5) {
            return 'vote-average__bad';
        } else if (ratingNumber < 7) {
            return 'vote-average__fine';
        } else {
            return 'vote-average__good';
        }
    };

    const truncateToOneDecimal = (number) => {
        return Math.trunc(number * 10) / 10;
    };
    return (
        <li key={movie.id} className="film-list__item film-card">
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
                <span
                    className={`film-card__vote-average ${getRatingColor(movie.vote_average)}`}
                >
                    {truncateToOneDecimal(movie.vote_average)}
                </span>
                <time className="film-card__release-date">
                    {formattedDate(movie.release_date)}
                </time>
                {movie.genre_ids &&
                    movie.genre_ids.map((genreId) => (
                        <span key={genreId} className="film-card__genre">
                            {genres[genreId]}
                        </span>
                    ))}
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
};
export default FilmCard;
