import { useState, useEffect } from "react";
import "../css/About.css";
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import ErrorP from '../components/Error';

export default function About() {

  let navigate = useNavigate();
  let { menu } = useParams();

  const tabs = [
    { id: "unfold", title: "여정의 전개", subtitle: "UNFOLD THE FLOW" },
    { id: "vi", title: "비주얼 아이덴티티", subtitle: "Visual Identity" },
    { id: "dcmajor", title: "디지털콘텐츠 전공", subtitle: "Digital Contents Major" },
    { id: "precom", title: "졸업준비 위원회", subtitle: "Preparatory Committee" },
  ];

  // 버튼 액티브 상태변경
  let [tabMenu, setTabMenu] = useState(menu)
  useEffect(() => {
    setTabMenu(menu);
  }, [menu]);

  if (!tabs.map(tab => tab.id).includes(tabMenu)) {
    return <ErrorP/>
  }

  return (
    <div className="about-page">
      <nav className="mobile-back-nav" role="navigation" aria-label="뒤로가기 네비게이션">
        <button className="back-button" onClick={()=>navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
            <circle cx="20" cy="20" r="20" transform="matrix(-1 0 0 1 39.9922 0)" fill="#0009FF" />
            <path d="M23.2188 11.1719L13.5129 20.5836L23.2188 29.7013" stroke="#FFD000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="back-text">뒤로가기</span>
        </button>
      </nav>
      <div className="tab-container" role="tablist">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tab"
            aria-selected={tabMenu === tab.id}
            tabIndex={tabMenu === tab.id ? 0 : -1}
            className={`tab-item ${tabMenu === tab.id ? "active" : ""}`}
            onClick={()=>navigate(`/about/${tab.id}`)}
          >
            <div className="tab-title">{tab.title}</div>
            <div className="tab-subtitle">{tab.subtitle}</div>
          </div>
        ))}
      </div>
      <div className="ab-con-body"><Outlet context={menu}></Outlet></div>
    </div>
  );
}
