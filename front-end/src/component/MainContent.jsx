import axios from "axios";
import { useEffect, useState } from "react";

const MainContent = () => {
//  const [data,setData] = useState();

//   // fetch data
//   const fetchData = () => {
   
//     axios
//       .get("http://192.168.0.115:8000/api/booking/report/monthly")
//       .then((response) => {
//         setData(response.data.data);
       
//       })
//       .catch((error) => {
//         console.log(error);
        
//       });
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

  return (
    <div>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className=" mb-4 order-0">

            </div>
            <div className="col-lg-12 col-md-4 order-1">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/chart-success.png"
                            alt="chart success"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt3"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                            <a className="dropdown-item" href="javascript:void(0);">View More</a>
                            <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Profit</span>
                      <h3 className="card-title mb-2">$12,628</h3>
                      <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +72.80%</small>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/wallet-info.png"
                            alt="Credit Card"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt6"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                            <a className="dropdown-item" href="javascript:void(0);">View More</a>
                            <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                          </div>
                        </div>
                      </div>
                      <span>Sales</span>
                      <h3 className="card-title text-nowrap mb-1">$4,679</h3>
                      <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +28.42%</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-4 order-1">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/chart-success.png"
                            alt="chart success"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt3"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                            <a className="dropdown-item" href="javascript:void(0);">View More</a>
                            <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Profit</span>
                      <h3 className="card-title mb-2">$12,628</h3>
                      <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +72.80%</small>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/wallet-info.png"
                            alt="Credit Card"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt6"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                            <a className="dropdown-item" href="javascript:void(0);">View More</a>
                            <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                          </div>
                        </div>
                      </div>
                      <span>Sales</span>
                      <h3 className="card-title text-nowrap mb-1">$4,679</h3>
                      <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +28.42%</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-4 order-1">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/chart-success.png"
                            alt="chart success"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt3"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                            <a className="dropdown-item" href="javascript:void(0);">View More</a>
                            <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Profit</span>
                      <h3 className="card-title mb-2">$12,628</h3>
                      <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +72.80%</small>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>

           

           
          </div>
          <div className="row">

            <div className="col-md-6 col-lg-6 col-xl-6 order-0 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex align-items-center justify-content-between pb-0">
                  <div className="card-title mb-0">
                    <h5 className="m-0 me-2">Order Statistics</h5>
                    <small className="text-muted">42.82k Total Sales</small>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn p-0"
                      type="button"
                      id="orederStatistics"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="orederStatistics">
                      <a className="dropdown-item" href="javascript:void(0);">Select All</a>
                      <a className="dropdown-item" href="javascript:void(0);">Refresh</a>
                      <a className="dropdown-item" href="javascript:void(0);">Share</a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex flex-column align-items-center gap-1">
                      <h2 className="mb-2">8,258 TK</h2>
                      <span>Total Orders</span>
                    </div>
                    <div id="orderStatisticsChart"></div>
                  </div>
                  <ul className="p-0 m-0">
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-primary"
                        ><i className="bx bx-mobile-alt"></i
                        ></span>
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Aparajita</h6>
                          <small className="text-muted">R.N: 401</small>
                        </div>
                        <div className="user-progress">
                          <small className="fw-semibold">82.5 Taka</small>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-success"><i className="bx bx-closet"></i></span>
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Rajnigandha</h6>
                          <small className="text-muted">R.N: 401</small>
                        </div>
                        <div className="user-progress">
                          <small className="fw-semibold">23.8k</small>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-info"><i className="bx bx-home-alt"></i></span>
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Ashok</h6>
                          <small className="text-muted">R.N: 501</small>
                        </div>
                        <div className="user-progress">
                          <small className="fw-semibold">849k</small>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex">
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-secondary"
                        ><i className="bx bx-football"></i
                        ></span>
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Dolonchapa</h6>
                          <small className="text-muted">R.N: 506</small>
                        </div>
                        <div className="user-progress">
                          <small className="fw-semibold">99</small>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-6 order-2 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="card-title m-0 me-2">Transactions</h5>
                  <div className="dropdown">
                    <button
                      className="btn p-0"
                      type="button"
                      id="transactionID"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="transactionID">
                      <a className="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
                      <a className="dropdown-item" href="javascript:void(0);">Last Month</a>
                      <a className="dropdown-item" href="javascript:void(0);">Last Year</a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="p-0 m-0">
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <img src="../assets/img/icons/unicons/paypal.png" alt="User" className="rounded" />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <small className="text-muted d-block mb-1">Paypal</small>
                          <h6 className="mb-0">Send money</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">+82.6</h6>
                          <span className="text-muted">USD</span>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <img src="../assets/img/icons/unicons/wallet.png" alt="User" className="rounded" />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <small className="text-muted d-block mb-1">Wallet</small>
                          <h6 className="mb-0">Mac&apos;D</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">+270.69</h6>
                          <span className="text-muted">USD</span>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <img src="../assets/img/icons/unicons/chart.png" alt="User" className="rounded" />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <small className="text-muted d-block mb-1">Transfer</small>
                          <h6 className="mb-0">Refund</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">+637.91</h6>
                          <span className="text-muted">USD</span>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <img src="../assets/img/icons/unicons/cc-success.png" alt="User" className="rounded" />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <small className="text-muted d-block mb-1">Credit Card</small>
                          <h6 className="mb-0">Ordered Food</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">-838.71</h6>
                          <span className="text-muted">USD</span>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <img src="../assets/img/icons/unicons/wallet.png" alt="User" className="rounded" />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <small className="text-muted d-block mb-1">Wallet</small>
                          <h6 className="mb-0">Starbucks</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">+203.33</h6>
                          <span className="text-muted">USD</span>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex">
                      <div className="avatar flex-shrink-0 me-3">
                        <img src="../assets/img/icons/unicons/cc-warning.png" alt="User" className="rounded" />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <small className="text-muted d-block mb-1">Mastercard</small>
                          <h6 className="mb-0">Ordered Food</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">-92.45</h6>
                          <span className="text-muted">USD</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>



        <footer className="content-footer footer bg-footer-theme">
          <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
            <div className="mb-2 mb-md-0">
              ©
              <script>
                document.write(new Date().getFullYear());
              </script>
              , made with  by
              <a href="https://themeselection.com" target="_blank" className="footer-link fw-bolder">Inspired Digital</a>
            </div>
            <div>
              <a href="https://themeselection.com/license/" className="footer-link me-4" target="_blank">License</a>

              <a
                href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                target="_blank"
                className="footer-link me-4"
              >Documentation</a
              >

              <a
                href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                target="_blank"
                className="footer-link me-4"
              >Support</a
              >
            </div>
          </div>
        </footer>


        <div className="content-backdrop fade"></div>
      </div>
    </div>
  );
};

export default MainContent;