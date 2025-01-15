import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import RoomCategory from "../pages/RoomCategory";
import PreBooking from "../component/PreBooking";
import CustomerRegister from "../component/CustomerRegister";
import OverViews from "../component/OverViews";
import Report from "../component/Report";
import AccountSettings from "../component/AccountSettings";
import Settings from "../component/Settings";
import UserRegister from "../component/UserRegister";
import Support from "../component/Support";
import CreateRoom from "../pages/CreateRoom";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
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
                element: <OverViews/>
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
        ]
    },

])

export default Router;