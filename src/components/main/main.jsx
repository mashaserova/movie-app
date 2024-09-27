import React from 'react';
import FilmList from './filmList';

const Main = ({
    movies,
    activeTab,
    currentPage,
    totalResults,
    rateMovie,
    ratedMovies,
}) => {
    const handleRateMovies = async (movieId, newRating) => {
        await rateMovie(movieId, newRating);
    };
    return (
        <main>
            <FilmList
                movies={movies}
                ratedMovies={ratedMovies}
                activeTab={activeTab}
                handleRateMovies={handleRateMovies}
                currentPage={currentPage}
                totalResults={totalResults}
            />
        </main>
    );
};
export default Main;
