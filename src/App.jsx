import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Layout from "./views/Layout";
import Home from "./views/Home";
import About from "./views/About";
import Forum from "./views/forum";
import Login from "./views/login";
import Register from "./views/Register";
import Reservation from "./views/Reservation";
import Review from "./views/Review";
import Reviews from "./views/Reviews";
import Games from "./views/Games";
import Menu from "./views/Menu";
import {CartProvider} from "./context/CartContext";
import CartPage from "./views/CartPage";
import {UserProvider} from "./context/UserContext";
import Logout from "./views/Logout";
import Profile from "./views/Profile";
import Admin from "./views/Admin";
import Users from "./views/admin/Users";
import EditMenu from "./views/admin/EditMenu";
import Reservations from "./views/admin/Reservations";
import EditAbout from "./views/admin/EditAbout";
import AdminReviews from "./views/admin/AdminReviews";
import Orders from "./views/admin/Orders";
import AdminLayout from "./views/admin/AdminLayout";
import {LanguageProvider} from "./context/LanguageContext";
import AdminRoute from "./components/AdminRoute";
import Unauthorized from "./views/Unauthorized";
import AddToMenu from "./views/admin/AddToMenu";

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <UserProvider>
          <CartProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/review" element={<Reviews />} />
                <Route path="/make-review" element={<Review />} />
                <Route path="/games" element={<Games />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
              </Route>

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<Admin />} />
                <Route path="orders" element={<Orders />} />
                <Route path="users" element={<Users />} />
                <Route path="editmenu" element={<EditMenu />} />
                <Route path="reservations" element={<Reservations />} />
                <Route path="editabout" element={<EditAbout />} />
                <Route path="adminreviews" element={<AdminReviews />} />
                <Route path="addtomenu" element={<AddToMenu />} />
              </Route>
            </Routes>
          </CartProvider>
        </UserProvider>
      </LanguageProvider>
    </Router>
  );
};

export default App;
