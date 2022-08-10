import "./style.scss";
import AllRoute from "./Routes/AllRoute";
import { useState } from "react";
function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  return (
    <AllRoute shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
  );
}

export default App;
