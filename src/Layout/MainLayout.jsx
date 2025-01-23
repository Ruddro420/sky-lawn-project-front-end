import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import TopNav from "../component/TopNav";
import FooterContent from "../component/FooterContent";

const MainLayout = () => {
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <div
                    className="layout-menu bg-menu-theme h-100 overflow-auto"
                    style={{ width: "250px", minWidth: "250px", maxWidth: "250px" }}
                >
                    <Sidebar></Sidebar>
                </div>
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