import React from 'react';
import FilmCard from './filmCard';

const FilmList = ({ movies, ratedMovies, activeTab, handleRateMovies }) => {
    const moviesToDisplay = activeTab === 'search' ? movies : ratedMovies;
    return (
        <>
            <ul className="film-list" id="film-list">
                {moviesToDisplay.map((movie) => {
                    const movieRating = ratedMovies.find(
                        (ratedMovie) => ratedMovie.id === movie.id
                    )?.rating;

                    return (
                        <FilmCard
                            key={movie.id}
                            movie={movie}
                            movieRating={
                                activeTab === 'search'
                                    ? movieRating
                                    : movie.rating // Устанавливаем рейтинг в зависимости от вкладки
                            }
                            handleRateMovies={handleRateMovies}
                        />
                    );
                })}
            </ul>
        </>
    );
};

export default FilmList;
