import axios from "axios";
import { useEffect, useState } from "react";
import BookingDetails from "../pages/BookingDetails";

const MainContent = () => {
  const [monthlyData, setMonthlyData] = useState();
  const [weeklyData, setweeklyData] = useState();
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);

  //  console.log(monthlyData);
  //  console.log(weeklyData);

  console.log(room);

  // fetch monthly data
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const fetchMonthlyData = () => {

    axios
      .get(`${BASE_URL}/booking/report/monthly`)
      .then((response) => {
        setMonthlyData(response.data.data);

      })
      .catch((error) => {
        console.log(error);

      });
  };

  // fetch monthly data
  const fetchWeeklyData = () => {

    axios
      .get(`${BASE_URL}/booking/report/weekly`)
      .then((response) => {
        setweeklyData(response.data.data);

      })
      .catch((error) => {
        console.log(error);

      });
  };

  // get preBookdata details
  const fetchRoom = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/prebook-data`)
      .then((response) => {
        setRoom(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // Fetch room fetch
  useEffect(() => {
    fetchRoom();
  }, []);

  useEffect(() => {
    fetchMonthlyData();
    fetchWeeklyData();

  }, []);

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
                      <span className="fw-semibold d-block mb-1">Monthly Report</span>
                      <h3 className="">Count: {monthlyData?.count}</h3>
                      <h3 className="card-title mb-2"><span className="h3">৳</span> {monthlyData?.total_price}</h3>
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
                      <span className="fw-semibold d-block mb-1">Weekly Report</span>
                      <h3 className="">Count: {weeklyData?.count}</h3>
                      <h3 className="card-title mb-2"><span className="h3">৳</span> {weeklyData?.total_price}</h3>
                      <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +28.42%</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-12 col-md-4 order-1">
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
            </div> */}




          </div>
          <div className="row">

            <div className="col-md-6 col-lg-6 col-xl-6 order-0 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex align-items-center justify-content-between pb-0">
                  <div className="card-title mb-0">
                    <h5 className="m-0 me-2">Booking Statistics</h5>
                    <small className="text-muted">Total Booking {room?.length}</small>
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
                      <h6 className="me-4">Last 3 Booking</h6>
                    </div>
                    <div id="orderStatisticsChart"></div>
                  </div>
                  {/* <ul className="p-0 m-0">
                    {loading ? (
                      <p>Loading.....</p>
                    ) :  ( 
                      room.slice(-3).reverse().map((item) => (
                        <li key={item?.id} className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-success">
                              <i className="bx bx-user"></i>
                            </span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">{item?.name}</h6>
                              <small className="text-muted">Room: {item?.room_number}</small>
                              <p className="text-muted mb-0">
                                {item?.nationality} | {item?.date_time}
                              </p>
                            </div>
                            <div className="user-progress text-end">
                              <small className="fw-semibold text-primary">
                                {item?.room_price}
                              </small>
                              <br />
                              <small className="text-muted">{item?.duration_day} Day(s)</small>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul> */}

                  <ul className="p-0 m-0">
                    {loading ? (
                      <p>Loading.....</p>
                    ) : room.length === 0 ? (
                      <div className="alert alert-warning" role="alert">
                        No Data Found
                      </div>
                    ) : (
                      room
                        .slice(-3) // Get the last 3 items
                        .reverse() // Reverse the order
                        .map((item) => (
                          <li key={item?.id} className="d-flex mb-4 pb-1">
                            <div className="avatar flex-shrink-0 me-3">
                              <span className="avatar-initial rounded bg-label-success">
                                <i className="bx bx-user"></i>
                              </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <h6 className="mb-0">{item?.name}</h6>
                                <small className="text-muted">Room: {item?.room_number}</small>
                                <p className="text-muted mb-0">
                                  {item?.nationality} | {new Date(item?.date_time).toLocaleString("en-bd", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })}
                                </p>
                              </div>
                              <div className="user-progress text-end">
                                <small className="fw-semibold text-primary">
                                  ${item?.room_price}
                                </small>
                                <br />
                                <small className="text-muted">{item?.duration_day} Day(s)</small>
                              </div>
                            </div>
                          </li>
                        ))
                    )}
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


        <div className="content-backdrop fade"></div>
      </div>
    </div>
  );
};

export default MainContent;