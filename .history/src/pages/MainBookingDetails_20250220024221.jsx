import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { Tooltip } from 'bootstrap';


const MainBookingDetails = () => {
    const [booking, setBooking] = useState([]);
    const [filteredBooking, setFilteredBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { register, setValue, handleSubmit } = useForm();

    // Filter states
    const [nameFilter, setNameFilter] = useState("");
    const [phoneFilter, setPhoneFilter] = useState("");
    const [roomFilter, setRoomFilter] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("");
    const [paidDueFilter, setPaidDueFilter] = useState('');

    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    // [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));

    // env url
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Get Booking details
    const fetchRoom = () => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/booking-data`)
            .then((response) => {
                const data = response.data.data[0];
                setBooking(data);
                setFilteredBooking(data); // Initialize with all data
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
                ? (item.name || '').toLowerCase().includes(nameFilter.toLowerCase())
                : true;
            const phoneMatch = phoneFilter
                ? (item.mobile || '').toLowerCase().includes(phoneFilter.toLowerCase())
                : true;
            const roomMatch = roomFilter
                ? (item.room_number || '').toString().toLowerCase().includes(roomFilter.toLowerCase())
                : true;
            const paymentMatch = paymentFilter
                ? (item.payment_status || '').toLowerCase().includes(paymentFilter.toLowerCase())
                : true;
            const paidDueMatch = paidDueFilter
                ? (item.payment_status || '').toLowerCase() === paidDueFilter.toLowerCase()
                : true;
    
            return nameMatch && phoneMatch && roomMatch && paymentMatch && paidDueMatch;
        });
        setFilteredBooking(filtered);
    }, [nameFilter, phoneFilter, roomFilter, paymentFilter, paidDueFilter, booking]);

    const navigate = useNavigate();

    // Booking data
    const details = (id) => {
        navigate(`/bookingDetails/${id}`);
    };
    // Edit Booking data
    const editDetails = (id) => {
        navigate(`/editBookingDetails/${id}`);
    };

    // Get invoice
    const invoiceGenerate = (id) => {
        navigate(`/invoice/${id}`);
    };

    const [getIdForInvoice, setGetIdForInvoice] = useState()
    const [getDateForInvoice, setGetDateForInvoice] = useState()

    // check out date change

    const toggleModal = (id, checkOutDate) => {
        setShowModal(!showModal)
        setGetIdForInvoice(id)
        setGetDateForInvoice(checkOutDate)
        console.log(checkOutDate);

    };

    // set data
    setValue("checkout_date_time", getDateForInvoice);

    const onSubmit = (data) => {
        console.log(data);

        const formData = new FormData();
        //e.preventDefault();

        formData.append("checkout_date_time", data.checkout_date_time);
        formData.append("id", getIdForInvoice);

        // Axios POST request with FormData
        axios
            .post(`${BASE_URL}/book/checkout/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                toast.success("Set Check Out Date!");
                console.log(response);
            })
            .catch((error) => {
                console.error("Error:", error.response?.data || error.message);
                toast.error("Something Went Wrong!");
            });
        // Close modal after submission
        toggleModal();

        setTimeout(() => {
            navigate(`/invoice/${getIdForInvoice}`);
        }, 3000)
    };



    // Find the latest booking
    const latestBookingId =
        booking.length > 0
            ? Math.max(...booking.map((item) => new Date(item.created_at).getTime()))
            : null;

    // Delete a room
    const deleteRoom = (id) => {
        if (window.confirm("Are you sure you want to delete this ?")) {
            axios
                .get(`${BASE_URL}/booking/delete/${id}`)
                .then(() => {
                    toast.success("Deleted successfully!");
                    fetchRoom();
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Failed to delete !");
                });
        }
    };

    const handleDownload = (id) => {
        navigate(`/report/invoice/${id}`);
    };


    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                    {/* Add Category Form */}
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Main Check In Details</h5>
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
                                        <select
                                            className="form-control"
                                            value={paidDueFilter}
                                            onChange={(e) => setPaidDueFilter(e.target.value)}
                                        >
                                            <option value="">All Payment Status</option>
                                            <option value="Paid">Paid</option>
                                            <option value="Due">Due</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-12">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        // <div className="table-responsive text-nowrap">
                                        //     {filteredBooking.length === 0 ? (
                                        //         <div
                                        //             className="alert alert-warning"
                                        //             role="alert"
                                        //         >
                                        //             No Data Found
                                        //         </div>
                                        //     ) : (
                                        //         <table className="table order-4 border">
                                        //             <thead>
                                        //                 <tr>
                                        //                     <th>SL</th>
                                        //                     <th>Name</th>
                                        //                     <th>Phone</th>
                                        //                     <th>R.N</th>
                                        //                     <th>Address</th>
                                        //                     <th>Check In</th>
                                        //                     <th>Check Out</th>
                                        //                     <th>P.S</th>
                                        //                     <th>Actions</th>
                                        //                 </tr>
                                        //             </thead>
                                        //             <tbody className="table-border-bottom-0">
                                        //                 {filteredBooking.map((item, index) => {
                                        //                     const isLatest =
                                        //                         new Date(item.created_at).getTime() ==
                                        //                         latestBookingId;

                                        //                     return (
                                        //                         <tr
                                        //                             key={index}
                                        //                             style={{
                                        //                                 backgroundColor: isLatest
                                        //                                     ? "#d1f7c4" // Highlight with a light green background
                                        //                                     : "transparent",
                                        //                             }}
                                        //                         >
                                        //                             <td>{index + 1}</td>
                                        //                             <td>{item.name}</td>
                                        //                             <td>{item.mobile}</td>
                                        //                             <td>{item.room_number}</td>
                                        //                             <td>{item.address}</td>
                                        //                             <td>
                                        //                                 {new Date(
                                        //                                     item?.checking_date_time
                                        //                                 ).toLocaleString("en-bd", {
                                        //                                     dateStyle: "medium",
                                        //                                     timeStyle: "short",
                                        //                                 })}
                                        //                             </td>
                                        //                             <td>
                                        //                                 {
                                        //                                     item?.checkout_date_time == null ? 'Null' : new Date(
                                        //                                         item?.checkout_date_time
                                        //                                     ).toLocaleString("en-bd", {
                                        //                                         dateStyle: "medium",
                                        //                                         timeStyle: "short",
                                        //                                     })
                                        //                                 }

                                        //                             </td>

                                        //                             <td>{item.payment_status}</td>
                                        //                             <td>
                                        //                                 {item.check_status == 0 ? (
                                        //                                     <button
                                        //                                         disabled
                                        //                                         onClick={() =>
                                        //                                             invoiceGenerate(
                                        //                                                 item.id
                                        //                                             )
                                        //                                         }
                                        //                                         className="btn btn-danger"
                                        //                                     >
                                        //                                         Checkout
                                        //                                     </button>
                                        //                                 ) : (
                                        //                                     <button
                                        //                                         /*  onClick={() =>
                                        //                                              invoiceGenerate(
                                        //                                                  item.id
                                        //                                              )
                                        //                                          } */
                                        //                                         className="btn btn-primary"
                                        //                                         onClick={() => toggleModal(item.id, item.checkout_date_time)}
                                        //                                     >
                                        //                                         Invoice
                                        //                                     </button>
                                        //                                 )}

                                        //                                 <button
                                        //                                     onClick={() => {
                                        //                                         details(item.id);
                                        //                                     }}
                                        //                                     className="btn btn-info ms-2"
                                        //                                 >
                                        //                                     Details
                                        //                                 </button>
                                        //                                 <button
                                        //                                     onClick={() => { deleteRoom(item?.id) }}
                                        //                                     className="btn btn-dark ms-2"
                                        //                                 >
                                        //                                     Delete
                                        //                                 </button>
                                        //                             </td>
                                        //                         </tr>
                                        //                     );
                                        //                 })}
                                        //             </tbody>
                                        //         </table>
                                        //     )}
                                        // </div>
                                        <div className="table-responsive w-100">
                                            {filteredBooking.length === 0 ? (
                                                <div className="alert alert-warning text-center" role="alert">
                                                    No Data Found
                                                </div>
                                            ) : (
                                                <table className="table table-striped table-sm w-100 text-center" style={{ fontSize: "12px" }}>
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Name</th>
                                                            <th>Phone</th>
                                                            <th>R.N</th>
                                                            <th>Co.Name</th>
                                                            <th>Check In</th>
                                                            <th>Check Out</th>
                                                            <th>P.S</th>
                                                            <th className="text-center">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredBooking.map((item, index) => {
                                                            const isLatest = new Date(item.created_at).getTime() == latestBookingId;
                                                            return (
                                                                <tr
                                                                    key={index}
                                                                    className={isLatest ? "table-success" : ""}
                                                                >
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.mobile}</td>
                                                                    <td>{item.room_number}</td>
                                                                    <td>{item.company}</td>
                                                                    <td>
                                                                        {new Date(item?.checking_date_time).toLocaleString("en-bd", {
                                                                            dateStyle: "medium",
                                                                            timeStyle: "short",
                                                                        })}
                                                                    </td>
                                                                    <td>
                                                                        {item?.checkout_date_time == null
                                                                            ? "Null"
                                                                            : new Date(item?.checkout_date_time).toLocaleString("en-bd", {
                                                                                dateStyle: "medium",
                                                                                timeStyle: "short",
                                                                            })}
                                                                    </td>
                                                                    <td>{item.payment_status}</td>
                                                                    <td>
                                                                        <button onClick={() => handleDownload(item.invoice)} className="btn btn-success btn-sm me-1"><IoMdDownload className="fs-6" /></button>
                                                                        {item.check_status == 0 ? (
                                                                            <button
                                                                                disabled
                                                                                onClick={() => invoiceGenerate(item.id)}
                                                                                className="btn btn-danger btn-sm"
                                                                            >
                                                                                Checkout
                                                                            </button>
                                                                        ) : (
                                                                            <button
                                                                                className="btn btn-primary btn-sm "
                                                                                data-bs-toggle="tooltip"
                                                                                data-bs-placement="top"
                                                                                title="Invoice"
                                                                                onClick={() => toggleModal(item.id, item.checkout_date_time)}
                                                                            >
                                                                                <IoMdCheckboxOutline className="fs-6" />

                                                                            </button>
                                                                        )}
                                                                        <button
                                                                            onClick={() => details(item.id)}
                                                                            className="btn btn-info btn-sm ms-1"
                                                                        >
                                                                            Details
                                                                        </button>

                                                                        <button
                                                                            onClick={() => deleteRoom(item?.id)}
                                                                            className="btn btn-danger btn-sm ms-1"
                                                                        >
                                                                            <FaRegTrashAlt className="fs-6" />

                                                                        </button>
                                                                        <button
                                                                            onClick={() => editDetails(item.id)}
                                                                            className="btn btn-primary btn-sm ms-1"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
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
            {/*  <!-- Modal --> */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Set Checkout Date
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={toggleModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="basic-default-fullname">
                                            Check Out Date & Time <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            {...register("checkout_date_time", { required: true })}
                                            name="checkout_date_time"
                                            type="datetime-local"
                                            className="form-control"
                                            id="checkout_date_time"
                                            placeholder="Booking by reference"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={toggleModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainBookingDetails;
