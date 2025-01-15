import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import TopNav from "../component/TopNav";
import FooterContent from "../component/FooterContent";

const MainLayout = () => {
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Sidebar />
                <div className="layout-page">
                    <TopNav />
                    <Outlet />
                    {/*   <MainContent /> */}
                    <FooterContent />
                </div>
            </div>
            <div className="layout-overlay layout-menu-toggle"></div>
        </div>
    );
};

export default MainLayout;