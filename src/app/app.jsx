import React, { useEffect, useState, useCallback } from 'react';
import { Spin } from 'antd';
import { Alert } from 'antd';
import Header from '../components/header/header';
import Main from '../components/main/main';
import { debounce } from 'lodash';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [activeTab, setActiveTab] = useState('search');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentQuery, setCurrentQuery] = useState(''); //сохранение поискового запроса для пагинации
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isOffline, setIsOffline] = useState(false);
    const api = 'dc7a5a8df772eb4fd2c6c531749cda56';
    const baseUrl = 'https://api.themoviedb.org/3/';

    const fetchMovies = async (currentPage, currenQuery) => {
        const urlForMovieData = `${baseUrl}search/movie?api_key=${api}&query=${currenQuery}&page=${currentPage}`;
        const urlForGenresIds = `${baseUrl}genre/movie/list?api_key=${api}&language=en-US`;
        setIsLoading(true);
        try {
            const [responseMovies, responseGenres] = await Promise.all([
                fetch(urlForMovieData),
                fetch(urlForGenresIds),
            ]);
            const dataMovies = await responseMovies.json();
            const dataGenres = await responseGenres.json();
            if (dataMovies.results && dataMovies.results.length > 0) {
                for (let i = 0; i < dataMovies.results.length; i++) {
                    const movie = dataMovies.results[i];
                    const genreNames = [];
                    for (let j = 0; j < movie.genre_ids.length; j++) {
                        const genreId = movie.genre_ids[j]; //идем по id жанров в фильме
                        for (let k = 0; k < dataGenres.genres.length; k++) {
                            const genre = dataGenres.genres[k];
                            if (genre.id === genreId) {
                                genreNames.push(genre.name);
                                break;
                            }
                        }
                    }
                    setError(null);
                    movie.genre_names = genreNames;
                    delete movie.genre_ids;
                }
                setMovies(dataMovies.results);
                setTotalResults(dataMovies.total_results);
            } else {
                setError('TMDB did not found anyting');
                setMovies([]);
                setTotalResults(0);
            }
        } catch (error) {
            if (error.response && error.response.status >= 500) {
                setError(error.message);
            } else {
                setError('Error while load data');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const updateActiveTab = (newActiveTab) => {
        setActiveTab(newActiveTab);
    };

    const updateCurrentPage = (newCurrentPage) => {
        setCurrentPage(newCurrentPage);
        fetchMovies(newCurrentPage, currentQuery);
    };

    const handleSearchSubmit = (currentQuery) => {
        setCurrentQuery(currentQuery);
        setCurrentPage(1); //сброс страницы на первую при новом поисковом запросе
        if (currentPage) {
            fetchMovies(1, currentQuery);
        } else {
            setMovies([]);
            setTotalResults(0);
        }
    };
    const debouncedSearch = useCallback(
        debounce((currentQuery) => {
            handleSearchSubmit(currentQuery);
        }, 300),
        []
    );
    useEffect(() => {
        const handlePageStatus = () => {
            setIsOffline(!navigator.onLine);
        };
        window.addEventListener('online', handlePageStatus);
        window.addEventListener('offline', handlePageStatus);

        handlePageStatus();

        return () => {
            window.removeEventListener('online', handlePageStatus);
            window.removeEventListener('offline', handlePageStatus);
        };
    }, []);

    useEffect(() => {
        if (currentQuery) {
            fetchMovies(currentPage, currentQuery);
        }
    }, [currentPage, currentQuery]);

    return (
        <div className="container">
            <Header
                activeTab={activeTab}
                updateActiveTab={updateActiveTab}
                onSearchSubmit={debouncedSearch}
            />
            {error && activeTab === 'search' && (
                <div className="d">
                    <Alert
                        className="alert-container"
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setError(null)}
                    />
                </div>
            )}
            {isOffline && activeTab === 'search' && (
                <div className="alert-container">
                    <Alert
                        message="No internet connection"
                        description="Please, check your connection and try again"
                        type="warning"
                        showIcon
                    />
                </div>
            )}
            {isLoading ? (
                <div className="spinner-container">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Main
                        movies={movies}
                        activeTab={activeTab}
                        currentPage={currentPage}
                        updateCurrentPage={updateCurrentPage}
                        totalResults={totalResults}
                    />
                </>
            )}
        </div>
    );
};

export default App;
