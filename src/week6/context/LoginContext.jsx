import { createContext, useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:3000/auth";

export const LoginContext = createContext();

// 회원가입 요청
export const signUp = async (data) => {
  return axios.post(`${API_URL}/register`, data);
};

export function LoginContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayEmail, setDisplayEmail] = useState("");

  const signUp = async (data) => {
    return axios.post(`${API_URL}/register`, data);
  };

  const login = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);

      // 로그인 성공 시 accessToken과 refreshToken을 반환
      const { accessToken, refreshToken } = response.data;

      // 예시: 토큰을 로컬 스토리지에 저장 (보안을 고려해 다른 방법을 사용할 수도 있음)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setIsLoggedIn(true);
      setDisplayEmail(data.email.split("@")[0]);
      console.log(data);
      return response.data; // 로그인 성공 후 accessToken, refreshToken 반환
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error; // 에러 처리
    }
  };
  const logout = () => {
    setIsLoggedIn(false);
    setDisplayEmail("");
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const refreshToken = async (refreshToken) => {
    try {
      const response = await axios.post(
        `${API_URL}/token/access`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      return response.data; // 새로운 accessToken 반환
    } catch (error) {
      console.error("리프레시 토큰 요청 실패:", error);
      throw error; // 에러 처리
    }
  };
  return (
    <LoginContext.Provider
      value={{ isLoggedIn, displayEmail, refreshToken, signUp, login, logout }}
    >
      {children}
    </LoginContext.Provider>
  );
}
