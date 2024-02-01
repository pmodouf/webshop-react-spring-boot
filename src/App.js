import "./App.css";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Navbar } from './components/navbar';
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { ShopProvider } from "./context/shop-context";
function App(){
  return <div className="App">
    <ShopProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path = "/" element={<Shop />} />
        <Route path = "/cart" element={<Cart />}/>


      </Routes>

    </Router>
      </ShopProvider >
  </div>;
}
export default App;