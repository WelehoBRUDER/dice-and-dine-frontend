import {Outlet} from "react-router-dom";
import AdminBar from "../../components/AdminBar";
import Header from "../../components/Header";

const AdminLayout = () => {
  return (
    <>
      <Header />
      <AdminBar />
      <div className="layout">
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
