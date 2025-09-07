import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import designerData from "../data/profile.json";
import dcData from "../data/dc.json";
import dcsData from "../data/dcs.json";
import "../css/DesignerDetail.css";
import "../css/Designer.css";
import "../css/About.css";
import ErrorP from '../components/Error';

const THUMB_BASE = "https://injemm2025image.dothome.co.kr/thumbnail/";

// ✅ 썸네일 fallback 이미지 컴포넌트
function FallbackImage({ candidates = [], alt = "", className = "" }) {
  const [idx, setIdx] = useState(0);
  if (idx >= candidates.length) return null;

  return (
    <img
      className={className}
      src={candidates[idx]}
      alt={alt}
      loading="lazy"
      onError={() => setIdx((i) => i + 1)} // 로드 실패 → 다음 후보로
    />
  );
}

// ✅ 후보 썸네일 URL 생성 (소문자 + 공백 제거)
function makeCandidates(kr, en) {
  const enc = (s) =>
    encodeURIComponent(
      String(s || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "") // 공백 제거
    );
  return [`${THUMB_BASE}${enc(kr)}.webp`, `${THUMB_BASE}${enc(en)}.webp`];
}

export default function DesignerDetail() {
  const { profile } = useParams();
  const navigate = useNavigate();

  // URL 파라미터(profile)와 JSON 데이터 name_en 매칭
  const designer = designerData.find(
    (d) => d.name_en.replace(/\s+/g, "").toLowerCase() === profile.toLowerCase()
  );

  if (!designer) {
    return (
      <ErrorP/>
    );
  }

  // 작품 썸네일 후보
  const work1Thumbs = makeCandidates(designer.work1_kr, designer.work1_en);
  const work2Thumbs = makeCandidates(designer.work2_kr, designer.work2_en);

  // 작품 카드 클릭 → 해당 프로젝트 페이지로 이동
  const handleCardClick = (clickedValue) => {
    // dc.json 검색
    const dcMatch = dcData.find((item) => item.projectName === clickedValue);
    if (dcMatch) {
      navigate(`/project/dcdesign/${dcMatch.projectUrl}`);
      return;
    }
    // dcs.json 검색
    const dcsMatch = dcsData.find((item) => item.projectName === clickedValue);
    if (dcsMatch) {
      navigate(`/project/dcstudio/${dcsMatch.projectUrl}`);
      return;
    }
    alert("해당 프로젝트를 찾을 수 없습니다.");
  };

  return (
    <div className="designer-detail-page">
      <div className="p-d-back"></div>

      {/* 뒤로가기 버튼 */}
      <nav
        className="mobile-back-nav"
        role="navigation"
        aria-label="뒤로가기 네비게이션"
      >
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              cx="20"
              cy="20"
              r="20"
              transform="matrix(-1 0 0 1 39.9922 0)"
              fill="#0009FF"
            />
            <path
              d="M23.2188 11.1719L13.5129 20.5836L23.2188 29.7013"
              stroke="#FFD000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="back-text">뒤로가기</span>
        </button>
      </nav>

      {/* 디자이너 프로필 */}
      <header className="designer-header">
        <div className="detail-name-kr">{designer.name_kr}</div>
        <div className="detail-name-en">{designer.name_en}</div>
        <div className="detail-email">{designer.email}</div>
      </header>

      {/* 작품 리스트 */}
      <div className="works">
        {/* 첫 번째 작품 */}
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

        {/* 두 번째 작품 */}
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
