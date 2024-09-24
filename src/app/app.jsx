import React, { useState, useEffect, useCallback } from 'react';
import { Spin } from 'antd';
import { Alert } from 'antd';
import Header from '../components/header/header';
import Main from '../components/main/main';
import { debounce } from 'lodash';
import * as api from '../servers/api';
const App = () => {
    const [movies, setMovies] = useState([]);
    const [activeTab, setActiveTab] = useState('search');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentQuery, setCurrentQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [guestSessionId, setGuestSessionId] = useState(null);
    const [ratedMovies, setRatedMovies] = useState([]);

    const handleError = (error) => {
        setError(error.message);
    };

    const createGuestSession = useCallback(async () => {
        try {
            const sessionId = await api.createGuestSession();
            setGuestSessionId(sessionId);
            localStorage.setItem('guestSessionId', sessionId);
            fetchRatedMovies(sessionId);
        } catch (error) {
            handleError(error);
        }
    }, []);

    const rateMovie = useCallback(
        async (movieId, rating) => {
            if (!guestSessionId) {
                await createGuestSession();
                return;
            }
            try {
                await api.rateMovie(movieId, rating, guestSessionId);
                setRatedMovies((prevRatedMovies) => {
                    const existingMovieIndex = prevRatedMovies.findIndex(
                        (movie) => movie.id === movieId
                    );
                    if (existingMovieIndex !== -1) {
                        const updatedMovies = [...prevRatedMovies];
                        updatedMovies[existingMovieIndex].rating = rating;
                        return updatedMovies;
                    } else {
                        const movie = movies.find((m) => m.id === movieId);
                        return [...prevRatedMovies, { ...movie, rating }];
                    }
                });
            } catch (error) {
                handleError(error);
            }
        },
        [guestSessionId]
    );

    const fetchRatedMovies = useCallback(async (sessionId) => {
        try {
            const ratedMoviesData = await api.fetchRatedMovies(sessionId);
            setRatedMovies(ratedMoviesData);
        } catch (error) {
            handleError(error);
        }
    }, []);

    useEffect(() => {
        const storedSessionId = localStorage.getItem('guestSessionId');
        if (storedSessionId) {
            setGuestSessionId(storedSessionId);
            fetchRatedMovies(storedSessionId);
        } else {
            createGuestSession();
        }
    }, []);

    const fetchMovies = useCallback(async (currentPage, currenQuery) => {
        setIsLoading(true);
        try {
            const { movies: fetchedMovies, totalResults } =
                await api.fetchMovies(currentPage, currenQuery);
            setMovies(fetchedMovies);
            setTotalResults(totalResults);
            setError(null);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateActiveTab = (newActiveTab) => {
        setActiveTab(newActiveTab);
    };

    const updateCurrentPage = (newCurrentPage) => {
        setCurrentPage(newCurrentPage);
        fetchMovies(newCurrentPage, currentQuery);
    };

    const handleSearchSubmit = (currentQuery) => {
        setCurrentQuery(currentQuery);
        setCurrentPage(1);
        fetchMovies(1, currentQuery);
    };

    const debouncedSearch = useCallback(
        debounce((currentQuery) => {
            handleSearchSubmit(currentQuery);
        }, 300),
        []
    );

    return (
        <div className="container">
            <Header
                activeTab={activeTab}
                updateActiveTab={updateActiveTab}
                onSearchSubmit={debouncedSearch}
            />
            {error ? (
                <div className="alert-container">
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setError(null)}
                    />
                </div>
            ) : (
                <>
                    {isLoading ? (
                        <div className="spinner-container">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <Main
                            movies={movies}
                            activeTab={activeTab}
                            currentPage={currentPage}
                            updateCurrentPage={updateCurrentPage}
                            totalResults={totalResults}
                            rateMovie={rateMovie}
                            ratedMovies={ratedMovies}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default App;
