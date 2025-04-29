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

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
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
          </Routes>
        </CartProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
