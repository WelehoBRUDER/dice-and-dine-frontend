import Header from "../components/Header";
import {Outlet} from "react-router-dom";
import {LanguageProvider} from "../context/LanguageContext";
const Layout = () => {
  return (
    <LanguageProvider>
      <Header />
      <div className="layout">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Layout;
