import axios from 'axios';

// 기본 axios 인스턴스 설정
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // 환경 변수 사용
});

// 요청 인터셉터로 자동 인증 헤더 설정
api.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 응답 인터셉터로 자동 토큰 재발급 처리
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('토큰 재발급 후 요청 실패:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
