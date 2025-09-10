import { useEffect } from "react";
import "../css/Home.css";

export default function Home() {
  
  useEffect(() => {
    // 기존 값 저장 (페이지 나갈 때 복원할 수 있도록)
    const prevOverflow = document.body.style.overflowY;
    const prevOverscroll = document.body.style.overscrollBehaviorY;
    const prevBg = document.body.style.backgroundColor;

    // Home 페이지 들어왔을 때 적용
    document.body.style.overflowY = "hidden";          // 스크롤 차단
    //document.body.style.overscrollBehaviorY = "none";  // iOS 바운스 방지
    //document.body.style.backgroundColor = "#ffd603";      // 바운스 시 흰색 대신 검정

    // 페이지 벗어날 때(언마운트) 원상복구
    return () => {
      document.body.style.overflowY = prevOverflow;
    //  document.body.style.overscrollBehaviorY = prevOverscroll;
    //  document.body.style.backgroundColor = prevBg;
    };
  }, []);

  return (
    <div className="Home-page">
      {/* 상단-우측 고정 GIF */}
      {/*<div className="top-right-video">
          <video
          src="/img/main_motion4.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          controlsList="nodownload noplaybackrate nofullscreen"
          disablePictureInPicture
        /> </div> */}
      <div className="top-right-video">
        <img
          src="/img/main_motion2.gif"
          alt="Main Motion"
        />
      </div>

      <div className="hero-content">
        <p className="description">
          인제대학교<br />
          멀티미디어학부<br />
          디지털 콘텐츠 전공<br />
          2025 졸업전시회
        </p>
      </div>
      {/* <div className="hero-content">
        <p className="description">
          INJE University<br />
          Division of Multimedia Design<br />
          Digital Contents<br />
          2025 Graduation Exhibition
        </p>
      </div> */}

      {/* <div className="Home-sub">
        <h2 className="sub-title">여정의 전개</h2>
      </div> */}
    </div>
  );
}
