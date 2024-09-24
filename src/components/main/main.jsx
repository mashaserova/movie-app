import React from 'react';
import Search from './search';
import Rated from './rated';

const Main = ({
    movies,
    activeTab,
    currentPage,
    updateCurrentPage,
    totalResults,
    rateMovie,
    ratedMovies,
}) => {
    const handleRateMovies = async (movieId, newRating) => {
        await rateMovie(movieId, newRating);
    };
    const handlePageChange = (currentPage) => {
        updateCurrentPage(currentPage);
    };
    return (
        <main>
            {activeTab === 'search' && (
                <Search
                    movies={movies}
                    ratedMovies={ratedMovies}
                    handleRateMovies={handleRateMovies}
                    currentPage={currentPage}
                    updateCurrentPage={updateCurrentPage}
                    totalResults={totalResults}
                    handlePageChange={handlePageChange}
                />
            )}
            {activeTab === 'rated' && (
                <Rated
                    ratedMovies={ratedMovies}
                    handleRateMovies={handleRateMovies}
                />
            )}
        </main>
    );
};
export default Main;
