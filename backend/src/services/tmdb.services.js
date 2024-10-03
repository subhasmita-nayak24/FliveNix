import dotenv from 'dotenv';
dotenv.config(); // Load .env file

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchFromTMDB = async (url) => {
  try {
    const response = await fetch(`${url}&api_key=${process.env.TMDB_API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from TMDB:", error);
    throw error; // Re-throw error to handle it in the controller
  }
};
