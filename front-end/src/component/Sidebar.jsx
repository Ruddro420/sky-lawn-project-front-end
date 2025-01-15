import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [roomOpen, setRoomOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  const hangleToggleRoom =()=>{
    setRoomOpen((open)=> !open);
  };

  const handleToggleAnalytics= ()=>{
    setAnalytics((open)=> !open);
  }
    return (
        <div>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
            <div className="app-brand demo">
              <NavLink to='/' className="app-brand-link">
                <span className="app-brand-logo demo">
                  <img width="180px" src="https://skylawnhotel.com/wp-content/uploads/2024/06/logo-sky-1.jpg" alt="" srcSet="" />
                </span>
              </NavLink>

              <a className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                <i className="bx bx-chevron-left bx-sm align-middle"></i>
              </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">

              <li className="menu-item active">
                <NavLink to='/' className="menu-link">
                  <i className="menu-icon tf-icons bx bx-home-circle"></i>
                  <div data-i18n="Analytics">Dashboard</div>
                </NavLink>
              </li>
              <li className={`menu-item ${roomOpen ? "open": ""}`}>
              <NavLink to='#'  onClick={hangleToggleRoom}  className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Layouts">Hotel Room</div>
              </NavLink>

              <ul className="menu-sub">
                <li className="menu-item">
                  <NavLink to='/room-category' className="menu-link">
                    <div data-i18n="Without menu">Category</div>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink to='/room' className="menu-link">
                    <div data-i18n="Without navbar">Room</div>
                  </NavLink>
                </li>
              </ul>
            </li>
              <li className="menu-item">
                <NavLink to='/pre-booking'  className="menu-link">
                  <i className="menu-icon tf-icons bx bx-cart"></i>
                  <div data-i18n="Analytics">Pre-Booking</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to='/customer-register' className="menu-link">
                  <i className="menu-icon tf-icons bx bx-lock"></i>
                  <div data-i18n="Analytics">Customer Register</div>
                </NavLink>
              </li>



              <li className={`menu-item ${analytics ? "open" : ""}`}>
                <NavLink to='#' onClick={handleToggleAnalytics}  className="menu-link menu-toggle">
                  <i className="menu-icon tf-icons bx bx-abacus"></i>
                  <div data-i18n="Layouts">Analytics</div>
                </NavLink>

                <ul className="menu-sub">
                  <li className="menu-item">
                    <NavLink to="/overviews"  className="menu-link">
                      <div data-i18n="Without menu">Overviews</div>
                    </NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to='/report' className="menu-link">
                      <div data-i18n="Without menu">Report</div>
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="menu-item">
                <NavLink to='/account-settings' className="menu-link">
                  <i className="menu-icon tf-icons bx bx-sort-up"></i>
                  <div data-i18n="Analytics">Account Settings</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to='/settings' className="menu-link">
                  <i className="menu-icon tf-icons bx bx-chip"></i>
                  <div data-i18n="Analytics">Settings</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to='/user-register' className="menu-link">
                  <i className="menu-icon tf-icons bx bx-user-circle"></i>
                  <div data-i18n="Analytics">User Register</div>
                </NavLink>
              </li>




              <li className="menu-item">
                <NavLink to='/support'
                  
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bx-support"></i>
                  <div data-i18n="Support">Support</div>
                </NavLink>
              </li>
              {/* <!-- <li class="menu-item">
              <a
                href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                target="_blank"
                class="menu-link"
              >
                <i class="menu-icon tf-icons bx bx-file"></i>
                <div data-i18n="Documentation">Documentation</div>
              </a>
            </li> --{'>'} */}
            </ul>
          </aside> 
        </div>
    );
};

export default Sidebar;