import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className="inje-footer">
      <div className="inje-footer-group">
        <p className="inje-footer-group-p-left">
          인제대학교 멀티미디어학부
          <br />50834 경상남도 김해시 인제로 197 인제대학교 신어관(C동) 504호
          <br />mm.inje.ac.kr
        </p>
        <p className="inje-footer-group-p-right">
          Division of Multimedia Design, Inje University
          <br />50834 Shinseogwan(C-504), <br className="f-p-390"/>197, Inje-ro, Gimhae-si,
          Gyeongsangnam-do, South Korea
          <br />© 2025. INJE MULTIMEDIA ALL Rights Reserved.
        </p>
      </div>

      <div className="inje-footer-group-390">
        <p className="inje-footer-group-p-left">
          인제대학교 멀티미디어학부
          <br />50834 경상남도 김해시 인제로 197<br className="f-p-390"/> 인제대학교 신어관(C동) 504호
        </p>

        <p className="inje-footer-group-p-right">
          Inje University Division of Multimedia Design
          <br />50834 Shinseogwan(C-504),<br className="f-p-390"/>197, Inje-ro, Gimhae-si,
          Gyeongsangnam-do, South Korea
        </p>

        <p className="inje-footer-group-p-right">
          mm.inje.ac.kr<br />
          © 2025. INJE MULTIMEDIA ALL Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
