import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
            <div className="app-brand demo">
              <a href="index.html" className="app-brand-link">
                <span className="app-brand-logo demo">
                  <img width="180px" src="https://skylawnhotel.com/wp-content/uploads/2024/06/logo-sky-1.jpg" alt="" srcSet="" />
                </span>
              </a>

              <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
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
              <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Layouts">Hotel Room</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <NavLink to='/room-category' className="menu-link">
                    <div data-i18n="Without menu">Category</div>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <a href="layouts-without-navbar.html" className="menu-link">
                    <div data-i18n="Without navbar">Room</div>
                  </a>
                </li>
              </ul>
            </li>
              <li className="menu-item">
                <a href="index.html" className="menu-link">
                  <i className="menu-icon tf-icons bx bx-cart"></i>
                  <div data-i18n="Analytics">Pre-Booking</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="index.html" className="menu-link">
                  <i className="menu-icon tf-icons bx bx-lock"></i>
                  <div data-i18n="Analytics">Customer Register</div>
                </a>
              </li>



              <li className="menu-item">
                <a href="javascript:void(0);" className="menu-link menu-toggle">
                  <i className="menu-icon tf-icons bx bx-abacus"></i>
                  <div data-i18n="Layouts">Analytics</div>
                </a>

                <ul className="menu-sub">
                  <li className="menu-item">
                    <a href="layouts-without-menu.html" className="menu-link">
                      <div data-i18n="Without menu">Overviews</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="layouts-without-menu.html" className="menu-link">
                      <div data-i18n="Without menu">Report</div>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="menu-item">
                <a href="index.html" className="menu-link">
                  <i className="menu-icon tf-icons bx bx-sort-up"></i>
                  <div data-i18n="Analytics">Account Settings</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="index.html" className="menu-link">
                  <i className="menu-icon tf-icons bx bx-chip"></i>
                  <div data-i18n="Analytics">Settings</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="index.html" className="menu-link">
                  <i className="menu-icon tf-icons bx bx-user-circle"></i>
                  <div data-i18n="Analytics">User Register</div>
                </a>
              </li>




              <li className="menu-item">
                <a
                  href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                  target="_blank"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bx-support"></i>
                  <div data-i18n="Support">Support</div>
                </a>
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