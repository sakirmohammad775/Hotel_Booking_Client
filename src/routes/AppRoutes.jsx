
import { Route, Routes } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import SpecificHotelPage from "../components/Hotel/SpecificHotelPage";
import RoomDetailsPage from "../components/RoomDetails/RoomDetailsPage";
import Login from "../components/Home/Login";
import Register from "../components/Home/Register";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../pages/Dashboard";
import ActivateAccount from "../components/Registration/ActivateAccount";
import Profile from "../pages/Profile";
import DashboardLayout from "../layout/DashboardLayout";
import BookingCheckout from "../components/Booking/BookingCheckout";
import Bookings from "../components/Booking/Bookings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/hotel/:id" element={<SpecificHotelPage />} />
        <Route path="/room/:id" element={<RoomDetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />

        {/* 2. Add the Checkout Route here */}
        <Route path="/checkout" element={<BookingCheckout />} />
               
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout></DashboardLayout>
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard></Dashboard>}></Route>
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<Bookings />} />
      
        </Route>
        {/* Dynamic route for Django Djoser activation */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
