import { BrowserRouter, Route, Routes } from "react-router-dom";
import InfinityScroll from "../components/InfinityScroll";
import Main from "../components/Main";
import Pagination from "../components/Pagination";
import ShoppingCart from "../components/ShoppingCart";
function AllRoute() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/infinity" element={<InfinityScroll />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AllRoute;
