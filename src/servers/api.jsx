const api = 'dc7a5a8df772eb4fd2c6c531749cda56';
const baseUrl = 'https://api.themoviedb.org/3/';

const handleError = (error) => {
    let errorMessage = 'An unknown error occurred.';

    if (error.message && error.message.startsWith('NetworkError')) {
        errorMessage = 'Network problems. Please check your connection.';
    } else if (error.response) {
        switch (error.response.status) {
            case 404:
                errorMessage = 'Resource not found.';
                break;
            case 500:
                errorMessage = 'Server error. Please try again later.';
                break;
            default:
                errorMessage = 'Network request error.';
        }
    } else {
        errorMessage = 'An error occurred while processing the data.';
    }

    throw new Error(errorMessage);
};

const createGuestSession = async () => {
    try {
        const response = await fetch(
            `${baseUrl}authentication/guest_session/new?api_key=${api}`
        );
        const data = await response.json();
        if (data.success) {
            console.log('Guest session created:', data.guest_session_id);
            return data.guest_session_id;
        } else {
            throw new Error(
                'Failed to create a guest session. Please try again later.'
            );
        }
    } catch (error) {
        handleError(error);
    }
};

const rateMovie = async (movieId, rating, guestSessionId) => {
    try {
        const response = await fetch(
            `${baseUrl}movie/${movieId}/rating?api_key=${api}&guest_session_id=${guestSessionId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: rating }),
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        handleError(error);
    }
};

const fetchRatedMovies = async (sessionId) => {
    try {
        const response = await fetch(
            `${baseUrl}guest_session/${sessionId}/rated/movies?api_key=${api}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const ratedMovies = data.results;

        const detailedRatedMovies = await Promise.all(
            ratedMovies.map(async (movie) => {
                const movieDetails = await fetch(
                    `${baseUrl}movie/${movie.id}?api_key=${api}&language=en-US`
                );
                if (!movieDetails.ok) {
                    throw new Error(
                        `HTTP error! Status: ${movieDetails.status}`
                    );
                }
                const detailsData = await movieDetails.json();
                return { ...detailsData, rating: movie.rating };
            })
        );

        return detailedRatedMovies;
    } catch (error) {
        handleError(error);
    }
};

const fetchMovies = async (currentPage, currenQuery) => {
    const urlForMovieData = `${baseUrl}search/movie?api_key=${api}&query=${currenQuery}&page=${currentPage}`;
    try {
        const responseMovies = await fetch(urlForMovieData);
        if (!responseMovies.ok) {
            throw new Error(`HTTP error! Status: ${responseMovies.status}`);
        }
        const dataMovies = await responseMovies.json();
        if (dataMovies.results && dataMovies.results.length > 0) {
            return {
                movies: dataMovies.results,
                totalResults: dataMovies.total_results,
            };
        } else {
            throw new Error('TMDB did not found anyting');
        }
    } catch (error) {
        handleError(error);
    }
};

export { createGuestSession, rateMovie, fetchRatedMovies, fetchMovies };
