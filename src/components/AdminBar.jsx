/**
 * AdminBar component
 * This component is responsible for rendering the admin navigation bar.
 * It contains links to different admin pages such as orders, edit menu, add to menu, reservations, users, and edit about.
 * It uses the NavLink component from react-router-dom to handle navigation.
 * The active link is highlighted using the "active-link" class.
 * Language support is provided through the useLanguage context.
 * * @param {string} props.lang - The function to get the translated text based on the provided key.
 * * @returns {JSX.Element} The rendered component.
 */

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
            to="/admin/editmenu"
            className={({isActive}) => (isActive ? "active-link" : "")}
          >
            {lang("admin_page.editmenu_page_link")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/addtomenu"
            className={({isActive}) => (isActive ? "active-link" : "")}
          >
            {lang("admin_page.addtomenu_page_link")}
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
      </ul>
    </div>
  );
};

export default AdminBar;
