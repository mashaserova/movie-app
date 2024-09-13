import React, { useEffect, useState, useCallback } from 'react';
import { Spin } from 'antd';
import { Alert } from 'antd';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
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
    const api = '0d1df680d6649766863c6c9909fc939b';

    const fetchMovies = async (currentPage, query = '') => {
        const urlForMovieData = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${query}&page=${currentPage}`;
        const urlForGenresIds = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api}&language=en-US`;
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
                        const genreId = movie.genre_ids[j]; //id одного из жанров одного фильма
                        for (let k = 0; k < dataGenres.genres.length; k++) {
                            const genre = dataGenres.genres[k];
                            if (genre.id === genreId) {
                                genreNames.push(genre.name);
                                break;
                            }
                        }
                    }
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
            setError(error.message);
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
        fetchMovies(1, currentQuery);
    };
    const debouncedSearch = useCallback(
        debounce((currentQuery) => {
            handleSearchSubmit(currentQuery);
        }, 300),
        []
    );
    useEffect(() => {
        fetchMovies(currentPage, currentQuery);
    }, [currentPage, currentQuery]);

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

    return (
        <div className="container">
            <Header
                updateActiveTab={updateActiveTab}
                onSearchSubmit={debouncedSearch}
            />
            {error && (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    closable
                    onClose={() => setError(null)}
                />
            )}
            {isOffline && (
                <Alert
                    message="No internet connection"
                    description="Please, check your connection and try again"
                    type="warning"
                    showIcon
                />
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
                    />
                    <Footer
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
