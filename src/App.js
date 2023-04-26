import React from "react";  
import { useState, useEffect } from "react";

import MovieCard from "./MoviesCard";

import "./App.css";
import SearchIcon from "./search.svg"

// API key c0cb7886

const API_URL = 'http://www.omdbapi.com?apikey=c0cb7886';

const App = () => {
    
    const [movies, setMovies] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState('');
    
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        
        setMovies(data.Search);
    };
    
    useEffect(() => {
        searchMovies('');
    }, []);

const handleKeyDown = e => {
    if (e.key === 'Enter') {
        searchMovies(searchTerm);
        console.log('Enter key pressed ✅');
        console.log(e.target.value);
    }
  };
    
    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                placeholder="Search For Movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                tabIndex="0"
                />
                {/* <button type="button" className="search-btn"> */}
                    <img  
                        src={SearchIcon}
                        alt="search"
                        onClick={() => searchMovies(searchTerm)}
                        />
                {/* </button> */}
                
            </div>

            {movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                            ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            };
        </div>
    );
}

export default App;