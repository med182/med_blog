import axios from "axios";

const apiKey = "c268d87524b6070c325d573b5e0910d4";
const apiUrl = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: apiUrl,
  params: {
    api_key: apiKey,
    language: "en-US", // ou la langue de votre choix
  },
});

export const getUpcomingMovies = async () => {
  try {
    const response = await tmdbApi.get("/movie/upcoming", {
      params: {
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export default tmdbApi;
