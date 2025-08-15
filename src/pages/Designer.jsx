import "../css/Designer.css";
import "../css/About.css";
import { useNavigate } from "react-router-dom";
import designerData from "../data/profile.json";

export default function Designer() {
  const navigate = useNavigate();

  const handleClick = (englishName) => {
    const urlName = englishName.replace(/\s+/g, "");
    navigate(`/designer/${urlName}`);
  };

  return (
    <div className="designer-page">
       <nav className="mobile-back-nav" role="navigation" aria-label="뒤로가기 네비게이션">
        <button className="back-button" onClick={()=>navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
            <circle cx="20" cy="20" r="20" transform="matrix(-1 0 0 1 39.9922 0)" fill="#0009FF" />
            <path d="M23.2188 11.1719L13.5129 20.5836L23.2188 29.7013" stroke="#FFD000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="back-text">뒤로가기</span>
        </button>
      </nav>
      <div className="designer-title">Designer</div>
      <div className="designer-grid">
        {designerData.map((designer, index) => (
          <div
            key={index}
            className="designer-card"
            onClick={() => handleClick(designer.name_en)}
          >
            <p className="name-kr">{designer.name_kr}</p>
            <p className="name-en">{designer.name_en}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
