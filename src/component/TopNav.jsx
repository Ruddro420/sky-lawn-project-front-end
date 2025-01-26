//  import { useEffect, useState } from "react";
//  import { AiOutlineClose } from "react-icons/ai";
//  import { NavLink } from "react-router-dom";

//  const TopNav = () => {

//    const [userData, setUserData] = useState(null);
//    const [roomOpen, setRoomOpen] = useState(false);
//    const [analytics, setAnalytics] = useState(false);
//    const [details, setDetails] = useState(false);
//    const [open, setOpen] = useState(false);

//    const handleLogout = () => {
//      localStorage.removeItem("isLoggedIn");
//    };

//    useEffect(() => {
//      const getUserData = localStorage.getItem("userData");
//      if (getUserData) {
//        setUserData(JSON.parse(getUserData));
//      } else {
//        console.error("No user data found in localStorage.");
//      }
//    }, []);

//    if (!userData) {
//      return <p>Loading...</p>;
//    };

//    const hangleToggleRoom = () => {
//      setRoomOpen((open) => !open);
//    };

//    const handleToggleAnalytics = () => {
//      setAnalytics((open) => !open);
//    }
//    const handleToggleDetails = () => {
//      setDetails((open) => !open);
//    }

//    const menuLinks = (
//      <>


//        <li className="menu-item">
//          <NavLink to='/' className={({ isActive }) => {
//            return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
//          }}>
//            <i className="menu-icon tf-icons bx bx-home-circle"></i>
//            <div data-i18n="Analytics">Dashboard</div>
//          </NavLink>
//        </li>
//        <li className={`menu-item ${roomOpen ? "open" : ""}`}>
//          <NavLink to='#' onClick={hangleToggleRoom} className="menu-link menu-toggle">
//            <i className="menu-icon tf-icons bx bx-layout"></i>
//            <div data-i18n="Layouts">Hotel Room</div>
//          </NavLink>

//          <ul className="menu-sub">
//            <li className="menu-item">
//              <NavLink to='/room-category' className={({ isActive }) => {
//                return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
//              }}>
//                <div data-i18n="Without menu">Category</div>
//              </NavLink>
//            </li>
//            <li className="menu-item">
//              <NavLink to='/room' className={({ isActive }) => {
//                return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
//              }}>
//                <div data-i18n="Without navbar">Room</div>
//              </NavLink>
//            </li>
//          </ul>
//        </li>
//        <li className="menu-item">
//          <NavLink to='/pre-booking' className={({ isActive }) => {
//            return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
//          }}>
//            <i className="menu-icon tf-icons bx bx-cart"></i>
//            <div data-i18n="Analytics">Pre-Booking</div>
//          </NavLink>
//        </li>

//        <li className={`menu-item ${details ? "open" : ""}`}>
//          <NavLink to='#' onClick={handleToggleDetails} className="menu-link menu-toggle">
//            <i className="menu-icon tf-icons bx bx-layout"></i>
//            <div data-i18n="Layouts">Booking Details</div>
//          </NavLink>

//          <ul className="menu-sub">
//            <li className="menu-item">
//              <NavLink to="/pre-booking-details" className={({ isActive }) => {
//                return isActive ? "menu-link active-link bg-body text-primary " : "menu-link";
//              }}>
//                <div data-i18n="Without menu">Pre Booking Details</div>
//              </NavLink>
//            </li>
//            <li className="menu-item">
//              <NavLink to='/main-booking-details' className={({ isActive }) => {
//                return isActive ? "menu-link active-link bg-body text-primary " : "menu-link";
//              }}>
//                <div data-i18n="Without menu">Booking Details</div>
//              </NavLink>
//            </li>
//          </ul>
//        </li>



//        <li className={`menu-item ${analytics ? "open" : ""}`}>
//          <NavLink to='#' onClick={handleToggleAnalytics} className="menu-link menu-toggle">
//            <i className="menu-icon tf-icons bx bx-abacus"></i>
//            <div data-i18n="Layouts">Analytics</div>
//          </NavLink>

//          <ul className="menu-sub">
//            <li className="menu-item">
//              <NavLink to="/overviews" className={({ isActive }) => {
//                return isActive ? "menu-link active-link bg-body text-primary " : "menu-link";
//              }}>
//                <div data-i18n="Without menu">Overviews</div>
//              </NavLink>
//            </li>
//            <li className="menu-item">
//              <NavLink to='/report' className={({ isActive }) => {
//                return isActive ? "menu-link active-link bg-body text-primary " : "menu-link";
//              }}>
//                <div data-i18n="Without menu">Report</div>
//              </NavLink>
//            </li>
//          </ul>
//        </li>
//        <li className="menu-item">
//          <NavLink to='/user-register' className={({ isActive }) => {
//            return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
//          }}>
//            <i className="menu-icon tf-icons bx bx-user-circle"></i>
//            <div data-i18n="Analytics">User Register</div>
//          </NavLink>
//        </li>
//        <li className="menu-item">
//          <NavLink to='/support'

//            className={({ isActive }) => {
//              return isActive ? "menu-link bg-body active-link text-primary " : "menu-link";
//            }}
//          >
//            <i className="menu-icon tf-icons bx bx-support"></i>
//            <div data-i18n="Support">Support</div>
//          </NavLink>
//        </li>
//        <li className="menu-item">
//          <NavLink to='/account-settings' className={({ isActive }) => {
//            return isActive ? "menu-link active-link text-primary bg-body " : "menu-link";
//          }}>
//            <i className="menu-icon tf-icons bx bx-sort-up"></i>
//            <div data-i18n="Analytics">Account Settings</div>
//          </NavLink>
//        </li>

//      </>
//    );
//    return (
//      <div>
//        <nav
//          className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
//          id="layout-navbar"
//        >
//          <div onClick={() => setOpen(!open)} className=" position-relative layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
//            <a className="nav-item nav-link px-0 me-xl-4">
//              {open === true ? (

//                <AiOutlineClose className="fs-3"></AiOutlineClose>
//              ) : (
//                <i className="bx bx-menu bx-sm"></i>
//              )}

//              <ul
//                className={` position-absolute ${open ? "  top-100 start-0 " : "d-none"
//                  } lg:d-none p-3 bg-navbar-theme text-black border `}
//              >
//                  {menuLinks}
//              </ul>

//            </a>
//          </div>


//          <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

//            <div className="navbar-nav align-items-center">
//              <div className="nav-item d-flex align-items-center">
//                <i className="bx bx-search fs-4 lh-0"></i>
//                <input
//                  type="text"
//                  className="form-control border-0 shadow-none"
//                  placeholder="Search..."
//                  aria-label="Search..."
//                />
//              </div>
//            </div>


//            <ul className="navbar-nav flex-row align-items-center ms-auto">

//              <li className="nav-item lh-1 me-3">
//                <a
//                  className="github-button"
//                  href="https:github.com/themeselection/sneat-html-admin-template-free"
//                   data-icon="octicon-star"
//                  data-size="large"
//                  data-show-count="true"
//                aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
//                >{userData?.name}</a
//                >
//              </li>


//              <li className="nav-item navbar-dropdown dropdown-user dropdown">
//                <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
//                  <div className="avatar avatar-online">
//                    <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
//                  </div>
//                </a>
//                <ul className="dropdown-menu dropdown-menu-end">
//                  <li>
//                    <a className="dropdown-item" href="#">
//                      <div className="d-flex">
//                        <div className="flex-shrink-0 me-3">
//                          <div className="avatar avatar-online">
//                            <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
//                          </div>
//                        </div>
//                        <div className="flex-grow-1">
//                          <span className="fw-semibold d-block">{userData?.name}</span>
//                          <small className="text-muted">{userData?.email}</small>
//                        </div>
//                      </div>
//                    </a>
//                  </li>
//                  {/* <li>
//                          <div className="dropdown-divider"></div>
//                        </li>
//                        <li>
//                          <a className="dropdown-item" href="#">
//                            <i className="bx bx-user me-2"></i>
//                            <span className="align-middle">My Profile</span>
//                          </a>
//                        </li>
//                        <li>
//                          <a className="dropdown-item" href="#">
//                            <i className="bx bx-cog me-2"></i>
//                            <span className="align-middle">Settings</span>
//                          </a>
//                        </li>
//                        <li>
//                          <a className="dropdown-item" href="#">
//                            <span className="d-flex align-items-center align-middle">
//                              <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
//                              <span className="flex-grow-1 align-middle">Billing</span>
//                              <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
//                            </span>
//                          </a>
//                        </li>
//                        <li>
//                          <div className="dropdown-divider"></div>
//                        </li> */}
//                  <li>
//                    <NavLink to="/login" className="dropdown-item">
//                      <i className="bx bx-power-off me-2"></i>
//                      <span onClick={handleLogout} className="align-middle">Log Out</span>
//                    </NavLink>
//                  </li>
//                </ul>
//              </li>

//            </ul>
//          </div>
//        </nav>
//      </div>
//    );
//  };

//  export default TopNav;


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
      <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme lg:d-none"
        id="layout-navbar">
        <a
          className="nav-item nav-link px-0 me-xl-4"
          onClick={() => setOpen(!open)}
        >
          {open === true ? (

            <AiOutlineClose className="fs-3"></AiOutlineClose>
          ) : (
            <i className="bx bx-menu bx-sm"></i>
          )}
        </a>

        {/* Navbar Links */}
        <div
          className={` bg-navbar-theme lg:d-none ${open ? "show bg-navbar-theme text-black position-absolute  start-0 top-100 w-100" : "d-none"}`}
          id="navbarNav"
        >
          <ul className="navbar-nav bg-navbar-theme p-3 me-auto mb-2 mb-lg-0 lg:d-none">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active text-primary"
                    : "nav-link"
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
                  isActive
                    ? "nav-link active text-primary"
                    : "nav-link"
                }
              >
                Pre-Booking
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active text-primary"
                    : "nav-link"
                }
              >
                Support
              </NavLink>
            </li>
          </ul>

        </div>
        <div className="navbar-nav-right ms-2 d-flex align-items-center" id="navbar-collapse">

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


          <ul className="navbar-nav flex-row align-items-center ms-auto">

            <li className="nav-item lh-1 me-3">
              <a
                className="github-button"
                href="https:github.com/themeselection/sneat-html-admin-template-free"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
              >{userData?.name}</a
              >
            </li>


            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                <div className="avatar avatar-online">
                  <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-semibold d-block">{userData?.name}</span>
                        <small className="text-muted">{userData?.email}</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <NavLink to="/login" className="dropdown-item">
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
