import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../pages/Dashboard";
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

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
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