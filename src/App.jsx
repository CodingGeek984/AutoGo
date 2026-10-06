import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/car-detail/:id" element={<CarDetail />} />
                <Route path="/booking/:id" element={<Booking />} />
                <Route path="/bookings" element={<Bookings />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;