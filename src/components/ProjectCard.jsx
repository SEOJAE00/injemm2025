import { useNavigate, useOutletContext } from 'react-router-dom';
import dcData from '../data/dc.json'
import dcsData from '../data/dcs.json'
import "../css/Project.css"
import { useEffect, useState } from 'react';

function ProjectCard() {

  let navigate = useNavigate();
  let menu = useOutletContext();
  let useData = menu === 'dcstudio' ? dcsData : dcData;

  const [loaded, setLoaded] = useState(false);

  let aboutData = [
    { 
      subject: ["디지털컨텐츠스튜디오", "Digital Contents Studio"],
      prof: ["지도교수 전우정", "Prof. Woojeong Chon"],
      description: ["인간, 사회, 환경, 문화, 기술 등 다양한 분야의 주제를 발굴하여, 서비스디자인 관점에서 해당 문제를 깊이있게 탐색한 후, 어플리케이션 UX/UI 디자인 및 프로토타입 제작을 통해 해결안을 제안합니다.", "We explore topics across various fields including humanity, society, environment, culture, and technology. From a service design perspective, we conduct in-depth research into these issues, then propose solutions through application UX/UI design and prototype development."] 
    },
    { 
      subject: ["DC 졸업연구", "Degree Project in DC Design"],
      prof: ["지도교수 류안영", "Prof. Anyoung Ryou"],
      description: ["DC(Digital Contents) 졸업연구는 학생들이 4년간의 수업과 과제를 통해 성장한 결과물을 선보이는 모바일 앱 중심의 디지털 콘텐츠 프로젝트입니다. 미래지향적 기술과 차별화된 관점, 창의적인 아이디어를 담아 다양한 주제의 사용자 경험 디자인을 통해 참신한 디지털 경험을 제안합니다.", "DC (Digital Contents) Graduation Research is a digital content project focused on mobile applications, showcasing students' creative outcomes developed through four years of structured coursework and assignments. This project introduces fresh digital experiences through user experience (UX) design, incorporating innovative ideas, distinctive perspectives, and future-oriented technologies. By exploring diverse themes and creative approaches, students deliver the content that highlights the possibilities of digital media."] 
    }
  ];
  let useAboutData = menu === 'dcstudio' ? aboutData[0] : aboutData[1];


  return (
    <div className='project-grid'>
      
      <div className='text-wrapper-card'>
        <div className='subject subject-ko'>{useAboutData.subject[0]}</div>
        <div className='subject subject-en'>{useAboutData.subject[1]}</div>
        <div className='prof prof-ko'>{useAboutData.prof[0]}</div>
        <div className='prof prof-en'>{useAboutData.prof[1]}</div>
        <div className='desc-text-wrapper'>
          <div className='description-subject'>{useAboutData.description[0]}</div>
          <div className='description-subject'>{useAboutData.description[1]}</div>
        </div>
      </div>

      <div className='card-wrapper'>
        {
          // 작품 카드 컴포넌트 제작 공간
          useData.map((a, i)=>{
            return (
              <div key={i} onClick={()=>{
                navigate(`/project/${menu}/${a.projectUrl}`
                  //, {state:{playVideo:true}}
                );
                window.scrollTo({top: 0, behavior: 'auto'});
              }}>
                <div className='img-design'>
                  {!loaded && <div className="skeleton"></div>}
                  <div className='hover-content'>
                    <div className='hover-text htext1'>{a.projectName}</div>
                    <div className='hover-text htext2'>{a.projectNameKo}</div>
                  </div>
                  <img src={`https://injemm2025image.dothome.co.kr/thumbnail/${a.projectUrl}.webp`} style={{ display: loaded ? 'block' : 'none' }} onLoad={() => setLoaded(true)}/>
                </div>
                <div className='name-text ntext1'>{a.nameKo.join(', ')}</div>
                <div className='name-text ntext2'>{a.nameEn.join(', ')}</div>
              </div>
              )
            })
        }
      </div>
    </div>
  )
}

export default ProjectCard;