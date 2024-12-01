import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/LoginPage.css"; // 스타일 파일 import

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // 로딩 상태 활성화
    setErrorMessage(""); // 에러 메시지 초기화

    // 입력 값 유효성 검사
    if (!phoneNumber || !password) {
      setErrorMessage("전화번호와 비밀번호를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"}/api/v1/oauth/login/`,
        {
          phone_number: phoneNumber,
          password: password,
        }
      );

      // 성공적으로 로그인
      if (response.status === 200) {
        const { access_token } = response.data;

        // Access Token 저장
        localStorage.setItem("access_token", access_token);

        alert("로그인에 성공했습니다!");
        navigate("/dashboard"); // 대시보드 페이지로 이동
      }
    } catch (error) {
      console.error("로그인 실패:", error.response || error.message);
      const errorMsg =
        error.response?.data?.detail || "로그인에 실패했습니다. 다시 시도해주세요.";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false); // 로딩 상태 비활성화
    }
  };

  const handleSignup = () => {
    navigate("/signup"); // 회원가입 페이지로 이동
  };

  return (
    <div className="login-container">
      <h1>로그인</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>전화번호:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="전화번호를 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>
      <button className="signup-button" onClick={handleSignup}>
        회원가입
      </button>
    </div>
  );
};

export default LoginPage;
