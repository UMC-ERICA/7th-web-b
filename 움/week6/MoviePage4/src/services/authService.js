import api from '../apis/axiosInstance';

// 토큰 재발급 함수
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post("/auth/token/access", {}, {
      headers: { Authorization: `Bearer ${refreshToken}` }
    });
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    throw error;
  }
};

// 유저 정보 불러오기 함수
export const fetchUserInfo = async () => {
  try {
    const response = await api.get("/user/me");
    return response.data;
  } catch (error) {
    console.error('유저 정보 불러오기 실패:', error);
    throw error;
  }
};
