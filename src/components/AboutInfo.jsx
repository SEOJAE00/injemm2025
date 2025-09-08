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
  } else if(menu == "vi") {
    return (
      <>
        <div className="text-wrapper">{filteredData[0].menuKo}</div>
        <div className="text-wrapper-2">{filteredData[0].menuEn}</div>
        <div className="content-row-vi">
          <img src="/img/about1.png" alt="UNFOLD THE FLOW" className="visualid_img" />
          <div className="ab-right">
            <span className="text-wrapper-body-right vi-p" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {filteredData[0].descriptionKo.map((a, i)=>{
                return (
                  <div key={i}>
                    {a}
                  </div>
                )
              })
              }
            </span>
            <span className="text-wrapper-body-right vi-p2" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {filteredData[0].descriptionEn.map((a, i)=>{
                return (
                  <div key={i}>
                    {a}
                  </div>
                )
              })
              }
            </span>
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
          <span className="text-wrapper-body-left" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {
              filteredData[0].descriptionKo.map((a, i)=>{
                return (
                  <div key={i}>
                    {a}
                  </div>
                )
              })
            }
          </span>
          <span className="text-wrapper-body-right"style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {
              filteredData[0].descriptionEn.map((a, i)=>{
                return (
                  <div key={i}>
                    {a}
                  </div>
                )
              })
            }
          </span>
        </div>
      </>
    )
  } 
}

export default Aboutinfo;