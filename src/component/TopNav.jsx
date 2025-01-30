import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";

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
          className={`d-lg-none slide-menu ${open ? "open" : "d-none"}`}
          id="navbarNav"
        >
          {/* Close Button */}
          <div className="close-btn-container">
            <AiOutlineClose className="close-btn" onClick={() => setOpen(false)} />
          </div>

          {/* Sidebar Links */}
          <ul className="navbar-nav bg-navbar-theme p-3 me-auto mb-2  mb-lg-0 d-lg-none">
            <li className="nav-menu">
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive ? "nav-link active text-primary" : "nav-link"
                }


              >
                Dashboard
              </NavLink>
            </li>
            {/* Hotel Room Dropdown */}
            <li className="nav-menu dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                id="roomDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={roomOpen}
                onClick={() => toggleDropdown(setRoomOpen)}
              >
                Hotel Room
              </NavLink>
              <ul
                className={`dropdown-menu shadow-none ${roomOpen ? "show" : ""}`}
                aria-labelledby="roomDropdown"
              >
                <li>
                  <NavLink onClick={() => setOpen(false)} to="/room-category" className="dropdown-item">
                    Category
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setOpen(false)} to="/room" className="dropdown-item">
                    Room
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-menu">
              <NavLink
                onClick={() => setOpen(false)}
                to="/pre-booking"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-primary" : "nav-link"
                }
              >
                Pre-Booking
              </NavLink>
            </li>
            {/* Booking Details Dropdown */}
            <li className="nav-menu dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                id="detailsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={details}
                onClick={() => toggleDropdown(setDetails)}
              >
                Booking Details
              </NavLink>
              <ul
                className={`dropdown-menu shadow-none ${details ? "show" : ""}`}
                aria-labelledby="detailsDropdown"
              >
                <li>
                  <NavLink onClick={() => setOpen(false)} to="/pre-booking-details" className="dropdown-item">
                    Pre-Booking Details
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setOpen(false)} to="/main-booking-details" className="dropdown-item">
                    Main Booking Details
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Analytics Dropdown */}
            <li className="nav-menu dropdown">
              <NavLink
                className="nav-link dropdown-toggle"

                id="analyticsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={analytics}
                onClick={() => toggleDropdown(setAnalytics)}
              >
                Analytics
              </NavLink>
              <ul
                className={`dropdown-menu shadow-none ${analytics ? "show" : ""}`}
                aria-labelledby="analyticsDropdown"
              >
                <li>
                  <NavLink onClick={() => setOpen(false)} to="/overviews" className="dropdown-item">
                    Overviews
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setOpen(false)} to="/report" className="dropdown-item">
                    Report
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Static Links */}
            <li className="nav-menu">
              <NavLink
                to="/support"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive ? "nav-link active text-primary" : "nav-link"
                }
              >
                Support
              </NavLink>
            </li>
          </ul>
        </div>

        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          {/* <!-- Search --> */}
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <i className="bx bx-search fs-4 lh-0"></i>
              <input
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Search..."
                aria-label="Search..."
              />
            </div>
          </div>
          {/* <!-- /Search --> */}

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            {/* <!-- Place this tag where you want the button to render. --> */}
            <li className="nav-item lh-1 me-1">
              <a
                className="button fs-6"


              // data-show-count="true"
              // aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
              >
                {userData?.name}
              </a>
            </li>

            {/* <!-- User --> */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                href="javascript:void(0);"
                data-bs-toggle="dropdown"
              >
                <div className="avatar avatar-online">
                  <img
                    src="../assets/img/avatars/1.png"
                    alt
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img
                            src="../assets/img/avatars/1.png"
                            alt
                            className="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-semibold d-block">{userData?.name}</span>
                        <small className="text-muted">{userData?.email}</small>
                      </div>
                    </div>
                  </a>
                </li>
                {/* <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-user me-2"></i>
                    <span className="align-middle">My Profile</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-cog me-2"></i>
                    <span className="align-middle">Settings</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <span className="d-flex align-items-center align-middle">
                      <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                      <span className="flex-grow-1 align-middle">Billing</span>
                      <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                        4
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li> */}
                <li>
                  <NavLink to="/login" className="dropdown-item" >
                    <i className="bx bx-power-off me-2"></i>
                    <span onClick={handleLogout} className="align-middle">Log Out</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
