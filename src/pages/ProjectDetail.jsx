import "../css/ProjectDetail.css";
import "../css/about.css"
import dcsData from "../data/dcs.json"
import dcData from "../data/dc.json"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import YouTube from 'react-youtube';


export default function ProjectDetail() {

  let {menu, detail} = useParams();
  let navigate = useNavigate();

  let useData = menu === 'digitalcontentsstudio' ? dcsData : dcData;
  let filteredData = useData.filter(item => item.projectUrl === detail);
  let filteredDataIndex = useData.findIndex(item => item.projectUrl === detail);
  let imgPath = menu === 'digitalcontentsstudio' ? "Digital_Contents_Studio_Chon" : "Degree_Project_in_DC_Design_Ryou";

  let prevIndex = filteredDataIndex === 0 ? useData.length - 1 : filteredDataIndex - 1;
  let nextIndex = filteredDataIndex === useData.length - 1 ? 0 : filteredDataIndex + 1;

    


  const playerRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);


  // 이동 시 클릭 이벤트로 넘어온 경우
  // useEffect(()=>{
  //   if (location.state?.playVideo) {
  //     setMuted(false);
  //   }
  // }, [])
  

  // 여기에 뮤트랑 오토플레이 넣으면 되긴 하는데 그럼 소리는 막힘
  const onReady = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());

    //playerRef.current?.mute();
    //playerRef.current?.playVideo();
  };

  // 주기적으로 재생 위치 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playing) {
        const currentTime = playerRef.current.getCurrentTime();
        setProgress((currentTime / duration) * 100 || 0);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [playing, duration]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (playing) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (muted) playerRef.current.unMute();
    else playerRef.current.mute();
    setMuted(!muted);
  };

  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo((duration * newProgress) / 100, true);
    }
    setProgress(newProgress);
  };

  const toggleFullscreen = () => {
    const iframe = playerRef.current?.getIframe();
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      muted: 1,
      controls: 0,
      fs: 0,
      modestbranding: 1,
      rel: 0,
      disablekb: 1
    },
  };



  return (
    <div className="project-detail-page">

      <nav className="mobile-back-nav" role="navigation" aria-label="뒤로가기 네비게이션">
        <button className="back-button" onClick={() => {
          navigate(-1);
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }, 50);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
            <circle cx="20" cy="20" r="20" transform="matrix(-1 0 0 1 39.9922 0)" fill="#0009FF" />
            <path d="M23.2188 11.1719L13.5129 20.5836L23.2188 29.7013" stroke="#FFD000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="back-text">뒤로가기</span>
        </button>
      </nav>

      <div className='project-name name-upper'>{filteredData[0].projectName}</div>
      <div className='project-name name-lower'>{filteredData[0].projectNameKo}</div>
      <div className='desc-text-wrapper-detail'>
        <div className='description-project'>{filteredData[0].descriptionKo}</div>
        <div className='description-project'>{filteredData[0].descriptionEn}</div>
      </div>
      <div className='student-info'>
        {
          filteredData[0].nameKo.map((a, i)=>{
            return(
              <div key={i}>
                <div className='student-name-wrapper'>
                  <div className='student-name sn-upper'>{a}</div>
                  <div className='student-name sn-lower'>{filteredData[0].nameEn[i]}</div>
                </div>
                <div className='text-email'>{filteredData[0].email[i]}</div>
              </div>
            )
          })
        }
      </div>

      {/* <div className="youtube-wrapper">
        <iframe
          src={filteredData[0].youtubeLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div> */}

      <div className='youtube-wrapper'>
      <YouTube className='youtube-wrapper-iframe' videoId="dQw4w9WgXcQ" opts={opts} onReady={onReady}  />
      {/* 커스텀 컨트롤 */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          right: "10px",
          zIndex: 10,
          display: "flex",
          gap: "10px",
          alignItems: "center",
          background: "rgba(0,0,0,0.6)",
          padding: "8px 12px",
          borderRadius: "8px",
        }}
      >
        <button onClick={togglePlay} style={{ color: "white" }}>
          {playing ? "Pause" : "Play"}
        </button>

        <button onClick={toggleMute} style={{ color: "white" }}>
          {muted ? "Unmute" : "Mute"}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleSeek}
          style={{ flexGrow: 1 }}
        />

        <button onClick={toggleFullscreen} style={{ color: "white" }}>
          Fullscreen
        </button>
      </div>

      </div>



      {
        Array.from({ length: filteredData[0].imageLength }).map((a, i)=>{
          return (  
            <div key={i} className='img-wrapper'>
              {/* <img src={`https://injemm2025image.dothome.co.kr/${imgPath}/${filteredData[0].folderName}/${filteredData[0].projectUrl}_${i}`} className='img-content'/> 파일 수합하고 이걸로 바꾸기 */}
              <img src='/img/test1.png' className='img-content'/>
            </div>
          )
        })
      }

      <div className='btn-protopie-wrapper'>
        <a href={filteredData[0].protopieLink} target='blank'>
          <button className='btn-protopie'>프로토파이 연결 링크</button>
        </a>
      </div>

      <div className='btn-layout'>
        <div className='btn-prev-wrapper' onClick={()=>{
          navigate(`/project/${menu}/${useData[prevIndex].projectUrl}`);
          window.scrollTo({top: 0, behavior: 'auto'});
        }}>
          <div className='btn-prev'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69 69" fill="none">
              <circle cx="34.0462" cy="34.0422" r="34" fill="#0009FF"/>
              <path d="M39.3174 21.1873L23.8096 33.8419C23.438 34.1451 23.4388 34.7132 23.8113 35.0154L39.3174 47.5963" stroke="#FFD000" strokeWidth="5.29479" strokeLinecap="round"/>
            </svg>
          </div>
          <div className='btn-prev-text'>이전 작품</div>
        </div>
        <div className='btn-prev-wrapper' onClick={()=>{
          navigate(`/project/${menu}/${useData[nextIndex].projectUrl}`);
          window.scrollTo({top: 0, behavior: 'auto'});
        }}>
          <div className='btn-prev-text'>다음 작품</div>
          <div className='btn-next'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69 69" fill="none">
              <circle cx="34.0462" cy="34.0422" r="34" fill="#0009FF"/>
              <path d="M39.3174 21.1873L23.8096 33.8419C23.438 34.1451 23.4388 34.7132 23.8113 35.0154L39.3174 47.5963" stroke="#FFD000" strokeWidth="5.29479" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
}