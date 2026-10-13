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

    function onStopTrailerClick() {
        setTrailerKey(null);
        setTrailerError(null);
    }

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) {
            removeFavorite(movie.id)
        } else {
            addFavorite(movie)
        }
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                {trailerKey ? (
                    // Trailer replaces the poster inside the card
                    <iframe
                        className="trailer-frame"
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                        title={`${movie.title} trailer`}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <div className="movie-overlay" />

                        {/* Always visible: centered in the lower third of the poster */}
                        <button
                            className="trailer-btn play-btn"
                            onClick={onPlayTrailerClick}
                            disabled={isLoadingTrailer}
                        >
                            {isLoadingTrailer ? "Loading..." : "▶ Play Trailer"}
                        </button>
                    </>
                )}

                <button
                    className={`favorite-btn ${favorite ? "active" : ""}`}
                    onClick={onFavoriteClick}
                >
                    ♥
                </button>
            </div>

            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>

                {trailerError && <p className="trailer-error">{trailerError}</p>}

                {/* Stop button: lower part of the card while the trailer plays */}
                {trailerKey && (
                    <button className="trailer-btn stop-btn" onClick={onStopTrailerClick}>
                        ■ Stop Trailer
                    </button>
                )}
            </div>
        </div>
    )
}

export default MovieCard