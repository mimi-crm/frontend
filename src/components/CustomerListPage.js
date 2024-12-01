import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // Axios 인스턴스 가져오기
import "./../styles/CustomerListPage.css"; // 스타일 파일

const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    gender: "Male",
    phone_number: "",
    address: "",
    key: "",
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Axios 인스턴스를 사용하여 데이터 가져오기
        const response = await axiosInstance.get("/api/v1/customers/");
        setCustomers(response.data); // 고객 데이터 저장
        setFilteredCustomers(response.data); // 필터링 데이터 초기화
      } catch (err) {
        console.error("데이터 로드 실패:", err);
        setError("데이터를 가져오는데 실패했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.phone_number.includes(query) ||
        customer.address.toLowerCase().includes(query)
    );
    setFilteredCustomers(filtered);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setNewCustomer({
        name: "",
        gender: "Male",
        phone_number: "",
        address: "",
        key: "",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/api/v1/customers/", newCustomer);
      setCustomers([...customers, response.data]);
      setFilteredCustomers([...customers, response.data]);
      toggleModal(); // 모달 닫기
    } catch (err) {
      console.error("고객 생성 실패:", err);
      setError("고객을 생성하는데 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="customer-list-container">
      <div className="header">
        <h1>고객 리스트</h1>
        <div className="actions">
          <input
            type="text"
            placeholder="검색..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="add-customer-button" onClick={toggleModal}>
            고객 추가
          </button>
        </div>
      </div>

      <table className="customer-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>성별</th>
            <th>전화번호</th>
            <th>주소</th>
            <th>키</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.gender}</td>
              <td>{customer.phone_number}</td>
              <td>{customer.address}</td>
              <td>{customer.key}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2>고객 추가</h2>
            <form onSubmit={handleFormSubmit}>
              <label>이름:</label>
              <input
                type="text"
                name="name"
                placeholder="이름 입력"
                value={newCustomer.name}
                onChange={handleInputChange}
                required
              />
              <label>성별:</label>
              <select
                name="gender"
                value={newCustomer.gender}
                onChange={handleInputChange}
              >
                <option value="Male">남성</option>
                <option value="Female">여성</option>
              </select>
              <label>전화번호:</label>
              <input
                type="text"
                name="phone_number"
                placeholder="전화번호 입력"
                value={newCustomer.phone_number}
                onChange={handleInputChange}
                required
              />
              <label>주소:</label>
              <input
                type="text"
                name="address"
                placeholder="주소 입력"
                value={newCustomer.address}
                onChange={handleInputChange}
                required
              />
              <label>키:</label>
              <input
                type="text"
                name="key"
                placeholder="키 입력"
                value={newCustomer.key}
                onChange={handleInputChange}
                required
              />
              <button type="submit">추가</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerListPage;
