import { useState } from "react";
import "../css/MovieCard.css";
import { useMovieContext } from "./contexts/MovieContext";
import { getMovieTrailer } from "../Services/api";

function MovieCard({ movie }) {
    const { addFavorite, removeFavorite, isFavorite } = useMovieContext()
    const favorite = isFavorite(movie.id)
    const [trailerKey, setTrailerKey] = useState(null);
    const [trailerError, setTrailerError] = useState(null);
    const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);

    async function onPlayTrailerClick() {
        if (trailerKey) {
            setTrailerKey(null);
            return;
        }

        setIsLoadingTrailer(true);
        setTrailerError(null);

        try {
            const trailer = await getMovieTrailer(movie.id);

            if (!trailer) {
                setTrailerError("No trailer is available for this movie.");
                return;
            }

            setTrailerKey(trailer.key);
        } catch (error) {
            console.error(error);
            setTrailerError("Could not load the trailer. Please try again.");
        } finally {
            setIsLoadingTrailer(false);
        }
    }

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) {
            removeFavorite(movie.id)
        } else {
            addFavorite(movie)
        }
    }

    return <div className="movie-card">
        {trailerKey && (
            <div className="trailer-player">
                <iframe
                    width="100%"
                    height="250"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                    title={`${movie.title} trailer`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                />
            </div>
        )}
        {trailerError && <p className="trailer-error">{trailerError}</p>}
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
                <button className="trailer-btn" onClick={onPlayTrailerClick} disabled={isLoadingTrailer}>
                    {isLoadingTrailer ? "Loading..." : "▶ Play Trailer"}
                </button>
                {trailerKey && (
                    <button className="trailer-btn" onClick={() => setTrailerKey(null)}>
                        Stop Trailer
                    </button>
                )}
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
}

export default MovieCard
