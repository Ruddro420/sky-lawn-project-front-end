import axios from "axios";
import { useEffect, useState } from "react";
//import BookingDetails from "../pages/BookingDetails";

const MainContent = () => {
  const [monthlyData, setMonthlyData] = useState();
  const [weeklyData, setWeeklyData] = useState();
  const [room, setRoom] = useState();
  const [booking, setBooking] = useState();
  const [loading, setLoading] = useState(true);

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
        setWeeklyData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(weeklyData);
  console.log(monthlyData);

  console.log(room);

  // get preBookdata details
  const fetchRoom = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/prebook-data`)
      .then((response) => {
        const filteredData = response.data.data.filter((item) => item.status == 0);
        setRoom(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // get booking details
  const bookingData = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/booking-data`)
      .then((response) => {
        setBooking(response.data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  // Fetch all data
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchRoom(), bookingData(), fetchMonthlyData(), fetchWeeklyData()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    
  }, []);

 

    return (
      <div>
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
              <div className="col-lg-12 col-md-12 order-1">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
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
                              <a className="dropdown-item" href="/overviews">View More</a>
                            </div>
                          </div>
                        </div>
                        <span className="fw-semibold d-block mb-1">Monthly Report (Booking) - This Month</span>
                        <h6 className="mt-3">Total Order: {monthlyData?.count}</h6>
                        <h3 className="card-title mb-2"><span className="h3">৳</span> {monthlyData?.total_price} TAKA</h3>
                        <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +72.80%</small>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-6 col-md-12 col-6 mb-4">
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
                            <a className="dropdown-item" href="/overviews">View More</a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Weekly Report</span>
                      <h6 className="mt-3">Count: {weeklyData?.count}</h6>
                      <h3 className="card-title mb-2"><span className="h3">৳</span> {weeklyData?.total_price} TAKA</h3>
                      <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +28.42%</small>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
            <div className="row">

              <div className="col-md-6 col-lg-6 col-xl-6 order-0 mb-4">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center justify-content-between pb-0">
                    <div className="card-title mb-0">
                      <h5 className="m-0 me-2 mb-3">Pre - Booking Statistics</h5>
                      {/* <small className="text-muted">Total Booking {room?.length}</small> */}
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
                        <a href="/pre-booking-details" className="dropdown-item" >Pre-Booking</a>
                        <a className="dropdown-item" href="/main-booking-details">Booking</a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex flex-column align-items-center gap-1">
                        {/* <h5 className="mb-2">8,258 TK</h5> */}
                        <h6 className="me-4">Last 5 Pre - Booking</h6>
                      </div>
                      <div id="orderStatisticsChart"></div>
                    </div>
                    <ul className="p-0 m-0">
                      {loading ? (
                        <p>Loading.....</p>
                      ) : room?.length == 0 ? (
                        <div className="alert alert-warning" role="alert">
                          No Data Found
                        </div>
                      ) : (
                        room?.slice(-5) // Get the last 3 items
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
                                    {item?.room_category} | {new Date(item?.date_time).toLocaleString("en-bd", {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    })}
                                  </p>
                                </div>
                                <div className="user-progress text-end">
                                  <small className="fw-semibold text-primary">
                                    ৳ {item?.room_price}
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
              {/* Booking Details Here */}

              <div className="col-md-6 col-lg-6 col-xl-6 order-0 mb-4">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center justify-content-between pb-0">
                    <div className="card-title mb-0">
                      <h5 className="m-0 me-2 mb-3">Booking Statistics</h5>
                      {/* <small className="text-muted">Total Booking {room?.length}</small> */}
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
                        <a href="/pre-booking-details" className="dropdown-item" >Pre-Booking</a>
                        <a className="dropdown-item" href="/main-booking-details">Booking</a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex flex-column align-items-center gap-1">
                        {/* <h5 className="mb-2">8,258 TK</h5> */}
                        <h6 className="me-4">Last 5 Booking</h6>
                      </div>
                      <div id="orderStatisticsChart"></div>
                    </div>
                    <ul className="p-0 m-0">
                      {loading ? (
                        <p>Loading.....</p>
                      ) : room?.length === 0 ? (
                        <div className="alert alert-warning" role="alert">
                          No Data Found
                        </div>
                      ) : (
                        booking?.slice(-5) // Get the last 3 items
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
                                    {item?.room_category} | {new Date(item?.checking_date_time).toLocaleString("en-bd", {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    })}
                                  </p>
                                </div>
                                <div className="user-progress text-end">
                                  <small className="fw-semibold text-primary">
                                    ৳ {item?.room_price}
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

            </div>
          </div>
          <div className="content-backdrop fade"></div>
        </div>
      </div>
    );
  };

  export default MainContent;