import axios from "axios";
import { useNavigate } from "react-router-dom";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api/v1", // .env 파일에서 API URL 가져오기
  timeout: 5000, // 요청 타임아웃 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 최신 Access Token 가져오기
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const navigate = useNavigate(); // useNavigate로 페이지 이동 처리

    // 401 에러 처리
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 중복 요청 방지 플래그 설정

      try {
        // Refresh Token으로 새로운 Access Token 요청
        const refreshResponse = await axios.post(
          `${process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"}/api/v1/oauth/refresh/`
        );

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.access_token;

          // 새 Access Token 저장
          localStorage.setItem("access_token", newAccessToken);

          // 헤더에 새 Access Token 추가 후 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh Token도 유효하지 않은 경우
        if (refreshError.response && refreshError.response.status === 401) {
          alert("로그인 기간이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.removeItem("access_token"); // 토큰 제거
          navigate("/"); // 로그인 페이지로 이동
        }
      }
    }

    return Promise.reject(error); // 다른 에러는 그대로 반환
  }
);

export default axiosInstance;
