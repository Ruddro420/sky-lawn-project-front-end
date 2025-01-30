import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import './Com.css'

const TopNav = () => {
  const [userData, setUserData] = useState(null);
  const [roomOpen, setRoomOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [details, setDetails] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    const getUserData = localStorage.getItem("userData");
    if (getUserData) {
      setUserData(JSON.parse(getUserData));
    } else {
      console.error("No user data found in localStorage.");
    }
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  const toggleDropdown = (setter) => {
    setter((prev) => !prev);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar">
        {/* Menu Icon */}
        <a
          className="nav-item nav-link px-0 me-xl-4 d-lg-none"
          onClick={() => setOpen(!open)}
        >
          <i className="bx bx-menu bx-sm"></i>
        </a>

        {/* Sidebar */}
        <div
          className={`slide-menu ${open ? "open" : ""}`}
          id="navbarNav"
        >
          {/* Close Button */}
          <div className="close-btn-container">
            <AiOutlineClose className="close-btn" onClick={() => setOpen(false)} />
          </div>

          {/* Sidebar Links */}
          <ul className="navbar-nav bg-navbar-theme p-3 me-auto mb-2 mb-lg-0 d-lg-none">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-primary" : "nav-link"
                }
              >
                Dashboard
              </NavLink>
            </li>
            {/* Hotel Room Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="roomDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={roomOpen}
                onClick={() => toggleDropdown(setRoomOpen)}
              >
                Hotel Room
              </a>
              <ul
                className={`dropdown-menu ${roomOpen ? "show" : ""}`}
                aria-labelledby="roomDropdown"
              >
                <li>
                  <NavLink to="/room-category" className="dropdown-item">
                    Category
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/room" className="dropdown-item">
                    Room
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Booking Details Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="detailsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={details}
                onClick={() => toggleDropdown(setDetails)}
              >
                Booking Details
              </a>
              <ul
                className={`dropdown-menu ${details ? "show" : ""}`}
                aria-labelledby="detailsDropdown"
              >
                <li>
                  <NavLink to="/pre-booking-details" className="dropdown-item">
                    Pre-Booking Details
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/main-booking-details" className="dropdown-item">
                    Main Booking Details
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Analytics Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="analyticsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={analytics}
                onClick={() => toggleDropdown(setAnalytics)}
              >
                Analytics
              </a>
              <ul
                className={`dropdown-menu ${analytics ? "show" : ""}`}
                aria-labelledby="analyticsDropdown"
              >
                <li>
                  <NavLink to="/overviews" className="dropdown-item">
                    Overviews
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/report" className="dropdown-item">
                    Report
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Static Links */}
            <li className="nav-item">
              <NavLink
                to="/pre-booking"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-primary" : "nav-link"
                }
              >
                Pre-Booking
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-primary" : "nav-link"
                }
              >
                Support
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
