import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import InfinityScroll from "../components/InfinityScroll";
import Main from "../components/Main";
import Pagination from "../components/Pagination";

function AllRoute() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/infinity" element={<InfinityScroll />} />
          <Route path="/pagination" element={<Pagination />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AllRoute;
