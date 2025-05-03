import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Layout from "./views/Layout";
import Home from "./views/Home";
import About from "./views/About";
import Forum from "./views/forum";
import Login from "./views/login";
import Register from "./views/Register";
import Reservation from "./views/Reservation";
import Review from "./views/Review";
import Games from "./views/Games";
import Menu from "./views/Menu";
import {CartProvider} from "./context/CartContext";
import CartPage from "./views/CartPage";
import {UserProvider} from "./context/UserContext";
import Logout from "./components/Logout";
import Profile from "./views/Profile";
import Admin from "./views/Admin";
import Users from "./views/adminviews/Users";
import EditMenu from "./views/adminviews/EditMenu";
import Reservations from "./views/adminviews/Reservations";
import EditAbout from "./views/adminviews/EditAbout";
import Reviews from "./views/adminviews/Reviews";
import Orders from "./views/adminviews/Orders";
import AdminLayout from "./views/adminviews/AdminLayout";
import {LanguageProvider} from "./context/LanguageContext";

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
                <Route path="/review" element={<Review />} />
                <Route path="/games" element={<Games />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/orders" element={<Admin />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/editmenu" element={<EditMenu />} />
                <Route path="/admin/reservations" element={<Reservations />} />
                <Route path="/admin/editabout" element={<EditAbout />} />
                <Route path="/admin/reviews" element={<Reviews />} />
              </Route>
            </Routes>
          </CartProvider>
        </UserProvider>
      </LanguageProvider>
    </Router>
  );
};

export default App;
