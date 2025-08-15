import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import designerData from "../data/profile.json";
import dcData from "../data/dc.json";
import dcsData from "../data/dcs.json";
import "../css/DesignerDetail.css";
import "../css/Designer.css";
import "../css/About.css";

const THUMB_BASE = "https://injemm2025image.dothome.co.kr/thumbnail/";

function FallbackImage({ candidates = [], alt = "", className = "" }) {
  const [idx, setIdx] = useState(0);
  if (idx >= candidates.length) return null;

  return (
    <img
      className={className}
      src={candidates[idx]}
      alt={alt}
      loading="lazy"
      onError={() => setIdx((i) => i + 1)}
    />
  );
}

// 이미지호스팅에 올라간 게 없어 아직 사진은 안 보임
function makeCandidates(kr, en) {
  const enc = (s) => encodeURIComponent(String(s || "").trim());
  return [`${THUMB_BASE}${enc(kr)}.webp`, `${THUMB_BASE}${enc(en)}.webp`];
}

export default function DesignerDetail() {
  const { profile } = useParams();
  const navigate = useNavigate();

  const designer = designerData.find(
    (d) => d.name_en.replace(/\s+/g, "") === profile
  );

  if (!designer) {
    return (
      <div className="designer-detail-page">
        <div className="not-found">디자이너를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const work1Thumbs = makeCandidates(designer.work1_kr, designer.work1_en);
  const work2Thumbs = makeCandidates(designer.work2_kr, designer.work2_en);

  // 카드 클릭 핸들러
  const handleCardClick = (clickedValue) => {
    // dc.json 검색
    const dcMatch = dcData.find((item) => item.projectName === clickedValue);
    if (dcMatch) {
      navigate(`/project/degreeprojectindcdesign/${dcMatch.projectUrl}`);
      return;
    }
    // dcs.json 검색
    const dcsMatch = dcsData.find((item) => item.projectName === clickedValue);
    if (dcsMatch) {
      navigate(`/project/digitalcontentsstudio/${dcsMatch.projectUrl}`);
      return;
    }
    alert("해당 프로젝트를 찾을 수 없습니다.");
  };

  return (
    <div className="designer-detail-page">
      <nav className="mobile-back-nav" role="navigation" aria-label="뒤로가기 네비게이션">
        <button className="back-button" onClick={()=>navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
            <circle cx="20" cy="20" r="20" transform="matrix(-1 0 0 1 39.9922 0)" fill="#0009FF" />
            <path d="M23.2188 11.1719L13.5129 20.5836L23.2188 29.7013" stroke="#FFD000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="back-text">뒤로가기</span>
        </button>
      </nav>
      <header className="designer-header">
        <div className="detail-name-kr">{designer.name_kr}</div>
        <div className="detail-name-en">{designer.name_en}</div>
        <div className="detail-email">
          {designer.email}
        </div>
      </header>

      <div className="works">
        <div
          className="work-card"
          onClick={() => handleCardClick(designer.work1_kr)}
          style={{ cursor: "pointer" }}
        >
          <div className="thumb-wrap">
            <FallbackImage
              className="thumb"
              candidates={work1Thumbs}
              alt={designer.work1_en || designer.work1_kr}
            />
          </div>
          <div className="work-meta">
            <p className="work-kr">{designer.work1_kr}</p>
            <p className="work-en">{designer.work1_en}</p>
          </div>
        </div>

        <div
          className="work-card"
          onClick={() => handleCardClick(designer.work2_kr)}
          style={{ cursor: "pointer" }}
        >
          <div className="thumb-wrap">
            <FallbackImage
              className="thumb"
              candidates={work2Thumbs}
              alt={designer.work2_en || designer.work2_kr}
            />
          </div>
          <div className="work-meta">
            <p className="work-kr">{designer.work2_kr}</p>
            <p className="work-en">{designer.work2_en}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
