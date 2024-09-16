import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
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
    useEffect(() => {
        console.log('Обновленное состояние movieRatings:', movieRatings);
    }, [movieRatings]);
    const handlePageChange = (currentPage) => {
        updateCurrentPage(currentPage);
    };
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

    const truncateToOneDecimal = (number) => {
        return Math.trunc(number * 10) / 10;
    };

    const getRatingColor = (number) => {
        const ratingNumber = truncateToOneDecimal(number);
        if (0 < ratingNumber && ratingNumber < 3) {
            return '#E90000';
        } else if (ratingNumber < 5) {
            return '#E97E00';
        } else if (ratingNumber < 7) {
            return '#E9D100';
        } else {
            return '#66E900';
        }
    };

    return (
        <main>
            {activeTab === 'search' && (
                <Search
                    movies={movies}
                    movieRatings={movieRatings}
                    handleRateMovies={handleRateMovies}
                    formattedDate={formattedDate}
                    croppedText={croppedText}
                    currentPage={currentPage}
                    updateCurrentPage={updateCurrentPage}
                    totalResults={totalResults}
                    handlePageChange={handlePageChange}
                    truncateToOneDecimal={truncateToOneDecimal}
                    getRatingColor={getRatingColor}
                />
            )}
            {activeTab === 'rated' && (
                <Rated
                    movies={movies}
                    movieRatings={movieRatings}
                    handleRateMovies={handleRateMovies}
                    formattedDate={formattedDate}
                    croppedText={croppedText}
                    truncateToOneDecimal={truncateToOneDecimal}
                    getRatingColor={getRatingColor}
                />
            )}
        </main>
    );
};
export default Main;
