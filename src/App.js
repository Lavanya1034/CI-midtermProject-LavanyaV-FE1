import IndProductDetail from "./components/categories/IndProductDetail";
import AllProducts from "./components/categories/AllProducts";
import CartItems from "./components/Pages/CartItems";
import WishItems from "./components/Pages/WishItems";
import LoginPage from "./components/Pages/LoginPage";
import ErrorPage from "./components/Pages/ErrorPage";
import SignUpPage from "./components/Pages/SignUpPage";
import LayOut from "./components/Pages/LayOut";
import NavBar from "./components/Pages/NavBar";
import FooterForAll from "./components/Pages/FooterForAll";
import Category from "./components/categories/Category";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <LayOut />
      <NavBar />
      <Routes>
        <Route path="/" element={<AllProducts />}></Route>
        <Route path="/products/:id" element={<IndProductDetail />}></Route>
        <Route path="/all" element={<AllProducts />}></Route>
        <Route path="/search/:key" element={<AllProducts />}></Route>
        <Route path="/category/:categories" element={<Category />}></Route>
        <Route path="/cart" element={<CartItems />}></Route>
        <Route path="/wish" element={<WishItems />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <FooterForAll />
    </div>
  );
}

export default App;
