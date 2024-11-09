import axios from 'axios';

// 토큰 재발급 함수
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post("http://localhost:3000/auth/token/access", {}, {
      headers: { Authorization: `Bearer ${refreshToken}` }
    });
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    // 재발급 실패 시 로그인 페이지로 리다이렉트
    window.location.href = '/login';
    throw error;
  }
};

// 유저 정보 불러오기 함수
export const fetchUserInfo = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get("http://localhost:3000/user/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('유저 정보 불러오기 실패:', error);
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized 오류 시 토큰 재발급 시도
      try {
        const newAccessToken = await refreshAccessToken();
        // 재발급 받은 새로운 accessToken으로 유저 정보 요청 재시도
        const retryResponse = await axios.get("http://localhost:3000/user/me", {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        });
        return retryResponse.data;
      } catch (refreshError) {
        console.error('토큰 재발급 후 유저 정보 요청 실패:', refreshError);
        throw refreshError;
      }
    } else {
      throw error;
    }
  }
};
