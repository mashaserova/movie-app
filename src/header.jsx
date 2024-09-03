import React, {useState} from 'react'

const Header = ( {updateMovies} ) => {
    const api = '0d1df680d6649766863c6c9909fc939b';
    const [query, setQuery] = useState(''); //строка для инпута

    const handleSubmit = async (event) => {
        event.preventDefault();
        const urlForMovieData = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${query}`
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

            updateMovies(dataMovies.results)
            console.log(dataMovies.results);
        } catch (error) {
            console.error("Ошибка", error)
        }
    }
    return (
        <header>
            <div className="tabs-list">
                <div className="tabs-list__item">Search</div>
                <div className="tabs-list__item">Rated</div>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    className="search"
                    id="search"
                    placeholder="What movie are u looking for?"
                    onChange={(event) => {setQuery(event.target.value)}}
                />
            </form>
        </header>
    )
}

export default Header