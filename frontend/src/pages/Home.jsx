import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import "../css/Home.css"
import {searchMovies, getPopularMovies} from "../Services/api.js"
function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading]= useState(true)


  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies()
        setMovies(popularMovies)
      } catch (error){
        console.log(error)
        setError("Failed to load movies...")
      }
      finally {

        setLoading(false)
      }
    }

    loadPopularMovies()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    const results = query ? await searchMovies(query) : await getPopularMovies()
    setMovies(results ?? [])
  }
  return (
      <div className='home'>
        <form onSubmit={handleSearch } className='search-form'>
          <input type="text" placeholder='Search for movies...' className='search-input' 
          value = {searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message"> {error}</div>}

        {loading ? (
          <div className="loading">Loading...</div> 
        ): (
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    )}
    </div>
  );
}

export default Home;
