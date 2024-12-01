import React, { useEffect, useState } from "react";
import { useAxios } from "../context/AxiosContext";

const DashboardPage = () => {
  const axios = useAxios();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/users/info/");
        setData(response.data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchData();
  }, [axios]);

  return (
    <div>
      <h1>대시보드</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DashboardPage;
