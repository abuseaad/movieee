const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response = await fetch (`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()
    return data.results

};

export const searchMovies = async (query) => {
    const response = await fetch (`${BASE_URL}/search/movie?api_key=${API_KEY} &query=${encodeURIComponent
        (query)
    }`);
    const data = await response.json()
    return data.results

};
export const getMovieTrailer = async (movieId) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`       
    );

    if (!response.ok) {
      throw new Error("Could not load trailer");
    }

    const data = await response.json();

    return data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
  };

