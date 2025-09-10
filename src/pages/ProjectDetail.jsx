import "../css/ProjectDetail.css";
import "../css/about.css"
import dcsData from "../data/dcs.json"
import dcData from "../data/dc.json"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import ErrorP from '../components/Error';

export default function ProjectDetail() {

  let {menu, detail} = useParams();
  let navigate = useNavigate();

  let useData = menu === 'dcstudio' ? dcsData : dcData;
  let filteredData = useData.filter(item => item.projectUrl === detail);
  let filteredDataIndex = useData.findIndex(item => item.projectUrl === detail);
  let imgPath = menu === 'dcstudio' ? "Digital_Contents_Studio_Chon" : "Degree_Project_in_DC_Design_Ryou";

  let prevIndex = filteredDataIndex === 0 ? useData.length - 1 : filteredDataIndex - 1;
  let nextIndex = filteredDataIndex === useData.length - 1 ? 0 : filteredDataIndex + 1;


  //url저장해서 다음 이전 작품보기 눌러도 뒤로가기 하면 프로젝트 메뉴로 나가도록
  let [backBtn, setBackBtn] = useState('');

  useEffect(()=>{
    if(menu === 'dcstudio'){
      setBackBtn("/project/dcstudio")
    } else if(menu === "dcdesign"){
      setBackBtn("/project/dcdesign")
    }
  }, [])

  let horizontalProject = ["uniko", "agronix", "recomos"];

  if (filteredData.length === 0 || filteredDataIndex === -1) {
    return <ErrorP/>
  }

  return (
    <div className="project-detail-page">

      <nav className="mobile-back-nav" role="navigation" aria-label="뒤로가기 네비게이션">
        <button className="back-button" onClick={() => {
          navigate(backBtn);
          setTimeout(() => {
            //스무스로 할까
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

      <div className="youtube-wrapper">
      <iframe
        src={filteredData[0].youtubeLink}
        title="YouTube video player"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className='youtube-wrapper-iframe'
      />
    </div>

      {
        Array.from({ length: filteredData[0].imageLength }).map((a, i)=>{
          return (  
            <div key={i} className='img-wrapper'>
              <img src={`https://injemm2025image.dothome.co.kr/${imgPath}/${filteredData[0].folderName}/${filteredData[0].projectUrl}_${i}.webp`} className='img-content'/>
        
            </div>
          )
        })
      }

      <div className='text-interaction'>
        모바일앱 인터랙션
      </div>

      {/* 프로토파이 동영상 */}
      <div className={
          horizontalProject.includes(filteredData[0].projectUrl) 
            ? "youtube-wrapper" 
            : "youtube-wrapper-vertical"
        }
      >
        <iframe
          src={filteredData[0].protopieYoutubeLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className='youtube-wrapper-iframe'
        />
      </div>

      <div className='btn-protopie-wrapper'>
        <a href={filteredData[0].protopieLink} target='blank'>
          <button className='btn-protopie'>인터랙션 체험하기</button>
        </a>
      </div>

      <div className='btn-layout'>
        <div className='btn-prev-wrapper' onClick={()=>{
          navigate(`/project/${menu}/${useData[prevIndex].projectUrl}`);
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 50); // 50~150ms 정도면 충분
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
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 50); // 50~150ms 정도면 충분
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