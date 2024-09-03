import React, { useState } from 'react'
import Header from './header'
import Main from './main'

const App = () => {
    const [movies, setMovies] = useState([]);
    const updateMovies = (newMovies) => {
        setMovies(newMovies);
    }
    return (
        <div className="container">
            <Header updateMovies={updateMovies}/>
            <Main movies={movies}/>
        </div>
    )
}

export default App