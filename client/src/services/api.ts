import axios from 'axios';

const ApiClient = () => {
  const instance = axios.create({
      baseURL: process.env.VITE_API_URL,
      headers: {
          accept: '*/*',
          'Content-Type': 'application/json'
      }
  })

  return instance;
};

export default ApiClient();