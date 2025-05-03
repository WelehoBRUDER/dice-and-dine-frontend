import {NavLink} from "react-router-dom";
import {useLanguage} from "../context/LanguageContext";

const AdminBar = () => {
  const {lang} = useLanguage();

  return (
    <div className="adminbar">
      <ul>
        <li>
          <NavLink
            to="/admin/orders"
            className={({isActive}) => (isActive ? "active-link" : "")}
          >
            {lang("admin_page.orders_page_link")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({isActive}) => (isActive ? "active-link" : "")}
          >
            {lang("admin_page.users_page_link")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/editmenu"
            className={({isActive}) => (isActive ? "active-link" : "")}
          >
            {lang("admin_page.editmenu_page_link")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/reservations"
            className={({isActive}) => (isActive ? "active-link" : "")}
          >
            {lang("admin_page.reservations_page_link")}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/users"
            className={({isActive}) => (isActive ? "active-link" : "")}
          >
            {lang("admin_page.users_page_link")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/editabout"
            className={({isActive}) => (isActive ? "active-link" : "")}
          >
            {lang("admin_page.editabout_page_link")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/reviews"
            className={({isActive}) => (isActive ? "active-link" : "")}
          >
            {lang("admin_page.reviews_page_link")}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminBar;
