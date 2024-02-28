import "./App.css";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Navbar } from './components/navbar';
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { ShopProvider } from "./context/shop-context";
import { RegisterPage } from "./pages/RegisterPage";
import {LoginPage} from "./pages/LoginPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import { AuthProvider} from "./context/AuthContext";

function App(){
  return <div className="App">
    <AuthProvider>
    <ShopProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path = "/" element={<Shop />} />
        <Route path = "/cart" element={<Cart />}/>
        <Route path = "/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />





      </Routes>

    </Router>
      </ShopProvider >
    </AuthProvider>
  </div>;
}
export default App;