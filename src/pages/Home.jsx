import { useEffect } from "react";
import "../css/Home.css";

export default function Home() {
  useEffect(() => {
    // Home 페이지 들어왔을 때 스크롤 막기
    document.body.style.overflowY = "hidden";

    // 페이지 벗어날 때(언마운트) 원상복구
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="Home-page">
      {/* 상단-우측 고정 GIF */}
      <div className="top-right-video">
        <img
          src="/img/main_motion.gif"
          alt="Main Motion"
        />
      </div>

      <div className="hero-content">
        <p className="description">
          INJE University<br />
          Division of Multimedia Design<br />
          Digital Contents<br />
          2025 Graduation Exhibition
        </p>
      </div>

      <div className="Home-sub">
        <h2 className="sub-title">여정의 전개</h2>
      </div>
    </div>
  );
}
