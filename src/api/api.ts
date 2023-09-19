import axios from 'axios';

export const axiosInstance = axios.create({
  //TODO Setting up axios instance
  baseURL: 'https://some-base-url.com/',
  headers: {},
});
