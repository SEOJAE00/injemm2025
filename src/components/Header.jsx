// Header.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../css/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null); // PC 메뉴 강조용

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 페이지 이동 시 스크롤 맨 위로 이동
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  }, [location.pathname]);

  // 새로고침, 모바일 메뉴 온오프시 버튼 액티브 업데이트 (PC 메뉴용)
  useEffect(() => {
    if (location.pathname.startsWith("/about")) {
      setActiveMenu("about");
    } else if (location.pathname === "/") {
      setActiveMenu("home");
    } else if (location.pathname.startsWith("/project")) {
      setActiveMenu("project");
    } else if (location.pathname.startsWith("/designer")) {
      setActiveMenu("designer");
    }
  }, [location.pathname, menuOpen]);

  // 윈도우 크기 변경 감지: 768px 이상 시 모바일 메뉴 자동 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
        setOpenSubMenu(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setOpenSubMenu(null);
  };

  // 모바일 상위 메뉴 클릭 처리
  const handleMenuClick = (menuName, hasSubMenu) => {
    if (hasSubMenu) {
      // 하위 메뉴 토글
      setOpenSubMenu((prev) => (prev === menuName ? null : menuName));
    } else {
      // 바로 페이지 이동 + 메뉴 닫기
      setOpenSubMenu(null);
      setMenuOpen(false);

      switch (menuName) {
        case "home":
          navigate("/");
          break;
        case "designer":
          navigate("/designer");
          break;
        default:
          break;
      }
    }
  };

  // 하위 메뉴 클릭 시 페이지 이동 + 메뉴 닫기
  const handleSubMenuClick = (path) => {
    setMenuOpen(false);
    setOpenSubMenu(null);
    navigate(path);
  };

  return (
    <>
      <header className="header">
        {/* 로고 */}
        <div className="logo">
          <NavLink to="/" className="logo" onClick={() => handleMenuClick("home", false)}>
            <img src="/img/logo.png" alt="UNFOLD THE FLOW" className="logo-img" />
          </NavLink>
        </div>

        {/* PC 네비게이션 */}
        <nav className="nav-links">
          <div className="nav-link-wrapper">
            <NavLink
              to="/about/unfold"
              className={`nav-link ${activeMenu === "about" ? "active" : ""}`}
              onClick={() => setActiveMenu("about")}
            >
              ABOUT
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink
              to="/project/dcstudio"
              className={`nav-link ${activeMenu === "project" ? "active" : ""}`}
              onClick={() => setActiveMenu("project")}
            >
              PROJECT
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink
              to="/designer"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setActiveMenu("designer")}
            >
              DESIGNER
            </NavLink>
          </div>
        </nav>

        {/* 버거 버튼 (모바일) */}
        <button className="burger-btn" aria-label="메뉴 열기" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
            <circle cx="17.4922" cy="17.5" r="17.5" fill="white" />
            <path d="M11.6602 12.834H23.3268" stroke="#0009FF" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M11.6602 17.5H23.3268" stroke="#0009FF" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M11.6602 22.166H18.9518" stroke="#0009FF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {/* 오버레이 */}
      {menuOpen && <div className="mobile-menu-overlay" onClick={toggleMenu}></div>}

      {/* 모바일 메뉴 */}
      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {/* 닫기 버튼 */}
        <button className="close-btn" aria-label="메뉴 닫기" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
            <circle cx="17.4922" cy="17.5" r="17.5" fill="white" />
            <path d="M13.3711 13.3828L21.6207 21.6324" stroke="#0009FF" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M13.3633 21.625L21.6129 13.3754" stroke="#0009FF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <ul className="main-menu-ul">
       <li>
  <button
    onClick={() => handleMenuClick("home", false)}
    className={`mobile-main-link ${
      !openSubMenu && activeMenu === "home" ? "active-menu" : ""
    }`}
  >
    HOME
  </button>
</li>

<li>
  <button
    onClick={() => handleMenuClick("about", true)}
    className={`mobile-main-link ${
      openSubMenu === "about"
        ? "open-submenu about-2"
        : !openSubMenu && activeMenu === "about"
        ? "active-menu"
        : ""
    }`}
  >
    ABOUT
  </button>
  {openSubMenu === "about" && (
    <ul className="sub-menu">
      <li onClick={() => handleSubMenuClick("/about/unfold")}>여정의 전개</li>
      <li onClick={() => handleSubMenuClick("/about/vi")}>비주얼 아이덴티티</li>
      <li onClick={() => handleSubMenuClick("/about/dcmajor")}>디지털콘텐츠 전공</li>
      <li onClick={() => handleSubMenuClick("/about/precom")}>졸업준비 위원회</li>
    </ul>
  )}
</li>

<li>
  <button
    onClick={() => handleMenuClick("project", true)}
    className={`mobile-main-link ${
      openSubMenu === "project"
        ? "open-submenu project-2"
        : !openSubMenu && activeMenu === "project"
        ? "active-menu"
        : ""
    }`}
  >
    PROJECT
  </button>
  {openSubMenu === "project" && (
    <ul className="sub-menu">
      <li onClick={() => handleSubMenuClick("/project/dcstudio")}>디지털컨텐츠스튜디오</li>
      <li onClick={() => handleSubMenuClick("/project/dcdesign")}>DC 졸업연구</li>
    </ul>
  )}
</li>

<li>
  <button
    onClick={() => handleMenuClick("designer", false)}
    className={`mobile-main-link ${
      !openSubMenu && activeMenu === "designer" ? "active-menu" : ""
    }`}
  >
    DESIGNER
  </button>
</li>


        </ul>

      </nav>
    </>
  );
};

export default Header;