import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

import RoomCategory from "../pages/RoomCategory";

import CustomerRegister from "../pages/CustomerRegister";
import OverViews from "../pages/OverViews";
import Report from "../pages/Report";
import AccountSettings from "../pages/AccountSettings";
import Settings from "../pages/Settings";
import UserRegister from "../pages/UserRegister";
import Support from "../pages/Support";
import CreateRoom from "../pages/CreateRoom";
import PreBooking from "../pages/PreBooking";
import MainContent from "../component/MainContent";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";
import PreBookingDetails from "../pages/PreBookingDetails";
import Booking from "../pages/Booking";
import BookingDetails from "../pages/BookingDetails";
import MainBookingDetails from "../pages/MainBookingDetails";
import Invoice from "../pages/Invoice";

const Router = createBrowserRouter([
    {
        path: '/',
        element:
            <PrivateRoutes><MainLayout /></PrivateRoutes>
        ,
        children: [
            {
                path: '/',
                element: <MainContent />
            },
            {
                path: '/room-category',
                element: <RoomCategory />
            },
            {
                path: '/room',
                element: <CreateRoom />
            },
            {
                path: '/pre-booking',
                element: <PreBooking />
            },
            {
                path: '/customer-register',
                element: <CustomerRegister />
            },
            {
                path: '/overviews',
                element: <OverViews />
            },
            {
                path: '/report',
                element: <Report />
            },
            {
                path: '/account-settings',
                element: <AccountSettings />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/user-register',
                element: <UserRegister />
            },
            {
                path: '/support',
                element: <Support />
            },
            {
                path: '/pre-booking-details',
                element: <PreBookingDetails />
            },
            {
                path: '/booking/:data',
                element: <Booking />
            },
            {
                path: '/main-booking-details',
                element: <MainBookingDetails />
            },
            {
                path: '/bookingDetails/:id',
                element: <BookingDetails />
            },
            {
                path: '/invoice',
                element: <Invoice></Invoice>
            },
            
        ]
    },
    {
        path: '/login',
        element: <Login />,
    }

])

export default Router;