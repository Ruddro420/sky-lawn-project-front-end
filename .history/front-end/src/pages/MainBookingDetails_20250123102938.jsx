import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainBookingDetails = () => {
    const [booking, setBooking] = useState([]);
    const [filteredBooking, setFilteredBooking] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [nameFilter, setNameFilter] = useState("");
    const [phoneFilter, setPhoneFilter] = useState("");
    const [roomFilter, setRoomFilter] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("");

    // env url
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Get Booking details
    const fetchRoom = () => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/booking-data`)
            .then((response) => {
                setBooking(response.data.data[0]);
                setFilteredBooking(response.data.data[0]); // Initialize with all data
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    // Fetch room booking fetch
    useEffect(() => {
        fetchRoom();
    }, []);

    // Filter logic
    useEffect(() => {
        const filtered = booking.filter((item) => {
            const nameMatch = nameFilter
                ? item.name.toLowerCase().includes(nameFilter.toLowerCase())
                : true;
            const phoneMatch = phoneFilter
                ? item.mobile.toLowerCase().includes(phoneFilter.toLowerCase())
                : true;
            const roomMatch = roomFilter
                ? item.room_number
                      .toString()
                      .toLowerCase()
                      .includes(roomFilter.toLowerCase())
                : true;
            const paymentMatch = paymentFilter
                ? item.payment_status
                      .toLowerCase()
                      .includes(paymentFilter.toLowerCase())
                : true;

            return nameMatch && phoneMatch && roomMatch && paymentMatch;
        });
        setFilteredBooking(filtered);
    }, [nameFilter, phoneFilter, roomFilter, paymentFilter, booking]);

    const navigate = useNavigate();

    // Booking data
    const details = (id) => {
        navigate(`/bookingDetails/${id}`);
    };

    // Get invoice
    const invoiceGenerate = (id) => {
        navigate(`/invoice/${id}`);
    };

    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                    {/* Add Category Form */}
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Main Booking Details</h5>
                                <h1>{filteredBooking.length}</h1>
                            </div>
                            <div className="card-body">
                                <div className="row mb-3">
                                    {/* Filter Inputs */}
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            placeholder="Filter by Name"
                                            className="form-control"
                                            value={nameFilter}
                                            onChange={(e) => setNameFilter(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            placeholder="Filter by Phone"
                                            className="form-control"
                                            value={phoneFilter}
                                            onChange={(e) => setPhoneFilter(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            placeholder="Filter by Room No"
                                            className="form-control"
                                            value={roomFilter}
                                            onChange={(e) => setRoomFilter(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            placeholder="Filter by Payment Status"
                                            className="form-control"
                                            value={paymentFilter}
                                            onChange={(e) => setPaymentFilter(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-12">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <div className="table-responsive text-nowrap">
                                            {filteredBooking.length === 0 ? (
                                                <div
                                                    className="alert alert-warning"
                                                    role="alert"
                                                >
                                                    No Data Found
                                                </div>
                                            ) : (
                                                <table className="table order-4 border">
                                                    <thead>
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Name</th>
                                                            <th>Phone</th>
                                                            <th>Address</th>
                                                            <th>Check In</th>
                                                            <th>Check Out</th>
                                                            <th>R.N</th>
                                                            <th>P.S</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="table-border-bottom-0">
                                                        {filteredBooking.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{index+1}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.mobile}</td>
                                                                <td>{item.address}</td>
                                                                <td>
                                                                    {new Date(
                                                                        item?.checking_date_time
                                                                    ).toLocaleString("en-bd", {
                                                                        dateStyle: "medium",
                                                                        timeStyle: "short",
                                                                    })}
                                                                </td>
                                                                <td>
                                                                    {new Date(
                                                                        item?.checkout_date_time
                                                                    ).toLocaleString("en-bd", {
                                                                        dateStyle: "medium",
                                                                        timeStyle: "short",
                                                                    })}
                                                                </td>
                                                                <td>{item.room_number}</td>
                                                                <td>{item.payment_status}</td>
                                                                <td>
                                                                    <button
                                                                        onClick={() =>
                                                                            invoiceGenerate(item.id)
                                                                        }
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Invoice
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            details(item.id);
                                                                        }}
                                                                        className="btn btn-info ms-2"
                                                                    >
                                                                        Details
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-backdrop fade"></div>
        </div>
    );
};

export default MainBookingDetails;
