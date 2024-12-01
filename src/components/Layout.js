import React from "react";
import Navbar from "./Navbar";
import "./../styles/Layout.css"; // 스타일 파일

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <aside className="layout-sidebar">
          <p>사이드바 (활용 가능 영역)</p>
          {/* 추가 콘텐츠를 여기 넣으세요 */}
        </aside>
        <main className="layout-main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
