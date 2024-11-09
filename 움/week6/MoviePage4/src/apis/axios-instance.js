import axios from 'axios';

console.log('API URL:', import.meta.env.VITE_MOVIE_API_URL); // URL 확인
console.log('API Key:', import.meta.env.VITE_API_KEY); // API 키 확인

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_MOVIE_API_URL,
    params: {
        api_key: import.meta.env.VITE_API_KEY // API 키를 쿼리 매개변수로 추가
    }
});

export { axiosInstance };
