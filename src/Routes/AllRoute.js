import { BrowserRouter, Route, Routes } from "react-router-dom";
import InfinityScroll from "../components/InfinityScroll";
import Main from "../components/Main";
import Pagination from "../components/Pagination";
import ShoppingCart from "../components/ShoppingCart";

function AllRoute({ shoppingCart, setShoppingCart }) {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />
            }
          />
          <Route
            path="/infinity"
            element={
              <InfinityScroll
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />
            }
          />
          <Route
            path="/pagination"
            element={
              <Pagination
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />
            }
          />
          <Route
            path="/shoppingCart"
            element={
              <ShoppingCart
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AllRoute;
