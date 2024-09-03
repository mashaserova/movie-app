import React from 'react';
import { format } from 'date-fns';

const Main = ( { movies }) => {
    const formattedDate = (unformattedDate) => {
        const date = new Date(unformattedDate)
        return format(date, 'MMMM dd, yyyy')
    }
    //!!!исправить обрезавние посередине слова!!!
    const croppedText = (uncropptedText) => {
        const maxLength = 30;
        const end = '...';

        if (uncropptedText.length <= maxLength) {
            return uncropptedText
        } else {
            return uncropptedText.substring(0, maxLength - end.length) + end
        }

    }
    return (
        <main>
            <ul className="film-list" id="film-list">
                {movies.map((movie) => (
                    <li className="film-list__item film-card">
                        <img
                            className="film-card__image"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <div className="film-card__content">
                            <h1 className="film-card__title">{movie.title}</h1>
                            <time className="film-card__release-date">{formattedDate(movie.release_date)}</time>
                            {movie.genre_names.map((genreName) => {
                                return <span className="film-card__genre">{genreName}</span>
                            })}
                            <p className="film-card__description">{croppedText(movie.overview)}</p>
                        </div>
                    </li>
                ))
                }
            </ul>
        </main>
    )
}
export default Main