import React, { useState } from 'react';
import { format } from 'date-fns';
import Search from './search';
import Rated from './rated';

const Main = ({ movies, activeTab }) => {
    const [movieRatings, setMovieRating] = useState({});
    const handleRateMovies = (movieId, newRating) => {
        setMovieRating((prevRatings) => ({
            ...prevRatings,
            [movieId]: newRating,
        }));
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

    return (
        <main>
            {activeTab === 'search' && (
                <Search
                    movies={movies}
                    movieRatings={movieRatings}
                    handleRateMovies={handleRateMovies}
                    formattedDate={formattedDate}
                    croppedText={croppedText}
                />
            )}
            {activeTab === 'rated' && (
                <Rated
                    movies={movies}
                    movieRatings={movieRatings}
                    handleRateMovies={handleRateMovies}
                    formattedDate={formattedDate}
                    croppedText={croppedText}
                />
            )}
        </main>
    );
};
export default Main;
