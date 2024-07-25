import axios, { AxiosRequestConfig } from 'axios';

export type Movie = {
  id: string;
  title: string;
  image: string;
  description: string;
};

const API_URL = 'https://api.themoviedb.org/3/movie';
export const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWM0ZjE3MmI1ZDBlZTI3YzMyOTYzNTRmNmIxNjM0MyIsIm5iZiI6MTcyMTc2MjY0My45MDU3MzEsInN1YiI6IjY2YTAwMGI5MTI3YzVjYTI1ZDZjZDZkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ckK58a6ORrOVuubuNp_HuYSjVIeThN29QdetAEgq87I";

export const getMoviesList = async (): Promise<Movie[]> => {
  const options: AxiosRequestConfig = {
    url: `${API_URL}/upcoming`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  try {
    const result = await axios.request(options);
    return result.data as Movie[];
  } catch (error: any) {
    console.error('Error fetching movies: ', error.message);
    return Promise.reject(error);
  }
};
