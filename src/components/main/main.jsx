import React, { useState, useEffect } from 'react';
import Search from './search';
import Rated from './rated';

const Main = ({
    movies,
    activeTab,
    currentPage,
    updateCurrentPage,
    totalResults,
}) => {
    const [movieRatings, setMovieRating] = useState([]);
    useEffect(() => {
        const storedRatings = localStorage.getItem('movieRatings');
        if (storedRatings) {
            setMovieRating(JSON.parse(storedRatings));
        }
    }, []);
    const handleRateMovies = (movieId, newRating) => {
        setMovieRating((prevRatings) => {
            const existingMovieIndex = prevRatings.findIndex(
                (movie) => movie.id === movieId
            );
            if (existingMovieIndex !== -1) {
                const updatedRatings = [...prevRatings];
                updatedRatings[existingMovieIndex] = {
                    ...updatedRatings[existingMovieIndex],
                    rating: newRating,
                };
                return updatedRatings;
            } else {
                const movie = movies.find((m) => m.id === movieId);
                return [...prevRatings, { ...movie, rating: newRating }];
            }
        });
    };
    useEffect(() => {
        localStorage.setItem('movieRatings', JSON.stringify(movieRatings));
    }, [movieRatings]);
    const handlePageChange = (currentPage) => {
        updateCurrentPage(currentPage);
    };

    return (
        <main>
            {activeTab === 'search' && (
                <Search
                    movies={movies}
                    movieRatings={movieRatings}
                    handleRateMovies={handleRateMovies}
                    currentPage={currentPage}
                    updateCurrentPage={updateCurrentPage}
                    totalResults={totalResults}
                    handlePageChange={handlePageChange}
                />
            )}
            {activeTab === 'rated' && (
                <Rated
                    movies={movies}
                    movieRatings={movieRatings}
                    handleRateMovies={handleRateMovies}
                />
            )}
        </main>
    );
};
export default Main;
