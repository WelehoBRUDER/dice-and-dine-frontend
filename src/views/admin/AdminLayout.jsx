/**
 * AdminLayout.jsx
 * @description This file contains the AdminLayout component, which is used for the admin section of the application.
 * It includes the Header and AdminBar components, and uses React Router's Outlet to render child routes.
 */

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
