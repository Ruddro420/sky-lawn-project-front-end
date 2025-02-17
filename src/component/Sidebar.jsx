import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [roomOpen, setRoomOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [details, setDetails] = useState(false);

  const hangleToggleRoom = () => {
    setRoomOpen((open) => !open);
  };

  const handleToggleAnalytics = () => {
    setAnalytics((open) => !open);
  }
  const handleToggleDetails = () => {
    setDetails((open) => !open);
  }
  return (
    <div>
      <aside id="layout-menu"
        className="layout-menu menu-vertical bg-menu-theme position-fixed w-20 h-100"
      >
        <div className="app-brand demo">
          <NavLink to='/' className="app-brand-link">
            <span className="app-brand-logo demo py-3">
              <img width="180px" src="https://skylawnhotel.com/wp-content/uploads/2024/06/logo-sky-1.jpg" alt="" srcSet="" />
            </span>
          </NavLink>

          <a className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">

          <li className="menu-item">
            <NavLink to='/' className={({ isActive }) => {
              return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
            }}>
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div data-i18n="Analytics">Dashboard</div>
            </NavLink>
          </li>
          <li className={`menu-item ${roomOpen ? "open" : ""}`}>
            <NavLink to='#' onClick={hangleToggleRoom} className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Layouts">Hotel Room</div>
            </NavLink>

            <ul className="menu-sub">
              <li className="menu-item">
                <NavLink to='/room-category' className={({ isActive }) => {
                  return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
                }}>
                  <div data-i18n="Without menu">Category</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to='/room' className={({ isActive }) => {
                  return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
                }}>
                  <div data-i18n="Without navbar">Room</div>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <NavLink to='/pre-booking' className={({ isActive }) => {
              return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
            }}>
              <i className="menu-icon tf-icons bx bx-cart"></i>
              <div data-i18n="Analytics">Pre-Booking</div>
            </NavLink>
          </li>
          {/* <li className="menu-item">
            <NavLink to='/customer-register' className={({ isActive }) => {
              return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
            }}>
              <i className="menu-icon tf-icons bx bx-lock"></i>
              <div data-i18n="Analytics">Customer Booking</div>
            </NavLink>
          </li> */}
          <li className={`menu-item ${details ? "open" : ""}`}>
            <NavLink to='#' onClick={handleToggleDetails} className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Layouts">Check In Details</div>
            </NavLink>

            <ul className="menu-sub">
              <li className="menu-item">
                <NavLink to="/pre-booking-details" className={({ isActive }) => {
                  return isActive ? "menu-link active-link bg-body text-primary " : "menu-link";
                }}>
                  <div data-i18n="Without menu">Pre Booking Details</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to='/main-booking-details' className={({ isActive }) => {
                  return isActive ? "menu-link active-link bg-body text-primary " : "menu-link";
                }}>
                  <div data-i18n="Without menu">Check In Details</div>
                </NavLink>
              </li>
            </ul>
          </li>



          <li className={`menu-item ${analytics ? "open" : ""}`}>
            <NavLink to='#' onClick={handleToggleAnalytics} className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-abacus"></i>
              <div data-i18n="Layouts">Analytics</div>
            </NavLink>

            <ul className="menu-sub">
              <li className="menu-item">
                <NavLink to="/overviews" className={({ isActive }) => {
                  return isActive ? "menu-link active-link bg-body text-primary " : "menu-link";
                }}>
                  <div data-i18n="Without menu">Overviews</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to='/report' className={({ isActive }) => {
                  return isActive ? "menu-link active-link bg-body text-primary " : "menu-link";
                }}>
                  <div data-i18n="Without menu">Report</div>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <NavLink to='/user-register' className={({ isActive }) => {
              return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
            }}>
              <i className="menu-icon tf-icons bx bx-user-circle"></i>
              <div data-i18n="Analytics">User Register</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to='/support'

              className={({ isActive }) => {
                return isActive ? "menu-link bg-body active-link text-primary " : "menu-link";
              }}
            >
              <i className="menu-icon tf-icons bx bx-support"></i>
              <div data-i18n="Support">Support</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to='/account-settings' className={({ isActive }) => {
              return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
            }}>
              <i className="menu-icon tf-icons bx bx-sort-up"></i>
              <div data-i18n="Analytics">Account Settings</div>
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;