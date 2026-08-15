const API_KEY = "AIzaSyAuk7Kz4O050vG1H9p6BDRrOCA7rjBTDbM";
const BASE_URL = "https://console.cloud.google.com/apis/credentials?project=medical-videos-505622"

export const getPopularMovies = async () => {
    const response = await fetch (`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()
    return data.results
};

export const searchMovies = async (query) => {
    const response = await fetch (`${BASE_URL}/search/movie?api_key=${API_KEY} $query=${encodeURIComponent
        (query)
    }`);
    const data = await response.json()
    return data.results
    
};