import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./app.css";


function AppLayout() {
  const location = useLocation();
  const showFooter = location.pathname !== "/";

  return (
    <>
      {/* 푸터가 바닥에 붙도록 수정함 8/14 1130 */}
      <div className='grid-web-contnets'> 
        <Header />
        <main className="app_jsx_top">
          <Outlet />
        </main>
        {showFooter && <Footer />}
      </div>
    </>
  );
}

import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import ProjectDetail from "./pages/ProjectDetail";
import Designer from "./pages/Designer";
import DesignerDetail from "./pages/DesignerDetail";
import Aboutinfo from './components/AboutInfo';
import ProjectCard from './components/ProjectCard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about/:menu" element={<About />}>
            <Route index element={<Aboutinfo />} />
          </Route>
          <Route path="project/:menu" element={<Project />}>
            <Route index element={<ProjectCard />} />
          </Route>
          <Route path="project/:menu/:detail" element={<ProjectDetail />} />
          <Route path="designer" element={<Designer />} />
          <Route path="designer/:profile" element={<DesignerDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}
