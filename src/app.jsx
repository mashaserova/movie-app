import React, { useState } from 'react'
import Header from './header'
import Main from './main/main'

const App = () => {
    const [movies, setMovies] = useState([]);
    const [activeTab, setActiveTab] = useState('search');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentQuery, setCurrentQuery] = useState(''); //сохранение поискового запроса для пагинации
    const api = '0d1df680d6649766863c6c9909fc939b';

    const fetchMovies = async (currentPage, query = '') => {
        const urlForMovieData = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${query}&page=${currentPage}`
        const urlForGenresIds = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api}&language=en-US`
        try {
            const [responseMovies, responseGenres] = await Promise.all([
                fetch(urlForMovieData),
                fetch(urlForGenresIds),
            ]);
            const dataMovies = await responseMovies.json();
            const dataGenres = await responseGenres.json();
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
            console.log('totalResults в fetchMovies:', totalResults); 
        } catch (error) {
            console.error("Ошибка", error)
        }
    }

    const updateActiveTab = (newActiveTab) => {
        setActiveTab(newActiveTab);
    }
    
    const updateCurrentPage = (newCurrentPage) => {
        setCurrentPage(newCurrentPage);
        fetchMovies(newCurrentPage, currentQuery);
    }

    const handleSearchSubmit = (currentQuery) => {
        setCurrentQuery(currentQuery);
        setCurrentPage(1); //сброс страницы на первую при новом поисковом запросе
        fetchMovies(1, currentQuery)
        console.log('submit', currentPage)
    }

    return (
        <div className="container">
            <Header
                updateActiveTab={updateActiveTab}
                currentPage={currentPage}
                updateCurrentPage={updateCurrentPage}
                onSearchSubmit={handleSearchSubmit}
                totalResults={totalResults}
            />
            <Main movies={movies} activeTab={activeTab} currentPage={currentPage}/>
        </div>
    )
}

export default App