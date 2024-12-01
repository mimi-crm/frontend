import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../styles/SignupPage.css"; // CSS 파일 import

const SignupPage = () => {
  const [formData, setFormData] = useState({
    phone_number: "",
    name: "",
    gender: "Male",
    date_of_birth: "",
    address: "",
    password: "",
    key: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
         `${process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"}/api/v1/users/signup/`,
        formData
      );

      // 서버에서 201 상태 코드를 반환할 때 처리
      if (response.status === 201) {
        alert("회원가입에 성공했습니다!");
        navigate("/"); // 로그인 페이지로 이동
      }
    } catch (error) {
      console.error("회원가입 실패:", error.response?.data || error.message);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>전화번호:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>이름:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>성별:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="Male">남성</option>
            <option value="Female">여성</option>
          </select>
        </div>
        <div>
          <label>생년월일:</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>주소:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>인증 키:</label>
          <input
            type="text"
            name="key"
            value={formData.key}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default SignupPage;
