import React, { createContext, useState, useEffect } from 'react';

const GenreContext = createContext();

const GenreProvider = ({ children }) => {
    const [genres, setGenres] = useState({});
    useEffect(() => {
        const fetchGenres = async () => {
            const api = 'dc7a5a8df772eb4fd2c6c531749cda56';
            const baseUrl = 'https://api.themoviedb.org/3/';
            const urlForGenresIds = `${baseUrl}genre/movie/list?api_key=${api}&language=en-US`;

            try {
                const response = await fetch(urlForGenresIds);
                const data = await response.json();
                const genreMap = {};
                data.genres.forEach((genre) => {
                    genreMap[genre.id] = genre.name;
                });
                setGenres(genreMap);
            } catch (error) {
                console.error('Ошибка при загрузке жанров', error);
            }
        };
        fetchGenres();
    }, []);

    return (
        <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>
    );
};
export { GenreContext, GenreProvider };
