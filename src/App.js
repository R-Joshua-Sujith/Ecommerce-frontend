import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Rent />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
