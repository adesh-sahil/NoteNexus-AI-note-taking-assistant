import axios from 'axios';

export const fetchUnsplashImage = async (query: string) => {
  const response = await axios.get(`https://api.unsplash.com/photos/random`, {
    params: { query, client_id: process.env.UNSPLASH_ACCESS_KEY },
  });
  return response.data.urls.small;
};
