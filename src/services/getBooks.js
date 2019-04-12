import axios from 'axios';

export default async (searchParam) => {
  const apiKey = 'AIzaSyAKZ2ii9mXycVLSQO7KFw_sR-8zlS8E2Io';
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchParam}&maxResults=15&key=${apiKey}`;

  const response = await axios.get(url);
  return response;
};
