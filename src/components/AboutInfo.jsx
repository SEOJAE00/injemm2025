import "../css/About.css";
import aboutData from "../data/about.json";
import { useOutletContext } from 'react-router-dom';

function Aboutinfo() {

  // 컴포넌트 간 url데이터 전송
  let menu = useOutletContext()
  let filteredData = aboutData.filter(item => item.path === menu);

  if(menu == "precom"){
    return (
      <>
        <div className="text-wrapper">{filteredData[0].menuKo}</div>
        <div className="text-wrapper-2">{filteredData[0].menuEn}</div>
        <div className="content-row">
          <div className="committee-table">
            {filteredData[0].teams.map((team, index) => (
              <div className="committee-row" key={index}>
                <div className="team-name">{team.name}</div>
                <div className="team-members">{team.members.join(", ")}</div>
              </div>
            ))}
          </div>

          <div className="ab-right">
            <p className="text-wrapper-body-right vi-rec">
              {filteredData[0].descriptionKo}
            </p>
            <p className="text-wrapper-body-right vi-rec2">
              {filteredData[0].descriptionEn}
            </p>
          </div>
        </div>
      </>
    )
  } else if(menu == "vi") {
    return (
      <>
        <div className="text-wrapper">{filteredData[0].menuKo}</div>
        <div className="text-wrapper-2">{filteredData[0].menuEn}</div>
        <div className="content-row-vi">
          <div className="ab-card-img">
           <img src="/img/about2.png" alt="UNFOLD THE FLOW" className="visualid_img2" />
            <img src="/img/about3.png" alt="UNFOLD THE FLOW 2" className="visualid_img2" />
            </div>
          <div className="ab-right vi-vi">
            <p className="text-wrapper-body-right vi-p">
              {filteredData[0].descriptionKo}
            </p>
            <p className="text-wrapper-body-right vi-p2">
              {filteredData[0].descriptionEn}
            </p>
          </div>
        </div>
      </>
    )
  } else {
    return(
      <>
        <div className="text-wrapper">{filteredData[0].menuKo}</div>
        <div className="text-wrapper-2">{filteredData[0].menuEn}</div>
        <div className="content-row-3">
          <p className="text-wrapper-body-left">
            {filteredData[0].descriptionKo}
          </p>
          <p className="text-wrapper-body-right">
            {filteredData[0].descriptionEn}
          </p>
        </div>
      </>
    )
  } 
}

export default Aboutinfo;