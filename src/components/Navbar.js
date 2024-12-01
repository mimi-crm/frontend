import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../styles/Navbar.css"; // 스타일 파일

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      alert("이미 로그아웃된 상태입니다.");
      navigate("/");
      return;
    }

    try {
      // 로그아웃 요청
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"}/api/v1/oauth/logout/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert(response.data.detail || "로그아웃되었습니다.");
        localStorage.removeItem("access_token");
        navigate("/");
      } else {
        alert("서버에서 로그아웃 처리 실패.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "네트워크 문제가 발생했습니다.";
      console.error("로그아웃 요청 실패:", errorMessage);
      alert(errorMessage);
    }
  };

  const handleNavigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h1>My App</h1>
      </div>
      <div className="navbar-menu">
        <button className="nav-button" onClick={() => handleNavigateTo("/customers")}>
          고객
        </button>
        <button className="nav-button" onClick={() => handleNavigateTo("/schedule")}>
          스케줄
        </button>
        <button className="nav-button" onClick={() => handleNavigateTo("/profile")}>
          내정보
        </button>
      </div>
      <div className="navbar-actions">
        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Navbar;
