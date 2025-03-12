import axios from "axios";
// import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";


const BookingDetails = () => {
    const { register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState([]);

    const { id } = useParams();

    // fetch data
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // get Booking details
    const fetchRoom = () => {
        // setLoading(true);
        axios
            .get(`${BASE_URL}/booking-data/show/${id}`)
            .then((response) => {
                console.log(response);

                setBooking(response.data.data);

                setLoading(false);

                // Set form values dynamically
                setValue("checking_date_time", response.data.data.checking_date_time);
                setValue("name", response.data.data.name);
                setValue("room_number", response.data.data.room_number);
                setValue("room_category", response.data.data.room_category);
                setValue("nationality", response.data.data.nationality);
                setValue("company", response.data.data.company);
                setValue("mobile", response.data.data.mobile);
                setValue("person", response.data.data.person);
                setValue("duration_day", response.data.data.duration_day);
                setValue("room_price", response.data.data.room_price);
                setValue("booking_by", response.data.data.booking_by);
                setValue("payment_status", response.data.data.payment_status);
                setValue("payment_method", response.data.data.payment_method);
                setValue("total_price", response.data.data.total_price);
                setValue("advance", response.data.data.advance);
                setValue("fathers_name", response.data.data.fathers_name);
                setValue("mothers_name", response.data.data.mothers_name);
                setValue("profession", response.data.data.profession);
                setValue("address", response.data.data.address);
                setValue("comming_form", response.data.data.comming_form);
                setValue("purpose", response.data.data.purpose);
                setValue("checkout_date_time", response.data.data.checkout_date_time);
                setValue("nid_no", response.data.data.nid_no);
                setValue("passport_no", response.data.data.passport_no);
                setValue("visa_no", response.data.data.visa_no);
                // setValue("date_time", format(parseISO(response.data.data.date_time), 'yyyy-MM-dd\'T\'HH:mm'));
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    // Fetch room booking fetch
    useEffect(() => {
        fetchRoom();
    }, [id]);
    console.log(booking);

    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card-body card">
                    <h4 className="mb-2">Booking Details</h4>
                    <form  /* onSubmit={handleSubmit(onSubmit)} */ >
                        <div className="row">
                            <div className="w-full">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Check in Date & Time
                                    </label>
                                    <input
                                        {...register("checking_date_time", { required: true })}
                                        name="checking_date_time"
                                        type="datetime-local"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Booking by reference"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Person Name
                                    </label>
                                    <input
                                        {...register("name", { required: false })}
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Person Name"
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Room Number
                                    </label>
                                    <input
                                        {...register("room_number", { required: false })}
                                        type="text"
                                        name="room_number"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Room Number" disabled
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Select Room Category
                                    </label>
                                    <input
                                        {...register("room_category", { required: false })}
                                        type="text"
                                        name="room_category"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Room Category" disabled
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Nationality
                                    </label>
                                    <input
                                        {...register("nationality", { required: false })}
                                        name="nationality"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Nationality" disabled
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Company Name
                                    </label>
                                    <input
                                        {...register("company", { required: false })}
                                        name="company"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Company Name" disabled
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Mobile
                                    </label>
                                    <input
                                        {...register("mobile", { required: false })}
                                        name="mobile"
                                        type="number"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Mobile" disabled
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Person
                                    </label>
                                    <input
                                        {...register("person", { required: false })}
                                        name="person"
                                        type="number"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Person" disabled
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Duration Of Stay
                                    </label>
                                    <input
                                        {...register("duration_day", { required: false })}
                                        name="duration_day"
                                        type="number"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Duration of Stay" disabled
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Price ৳
                                    </label>
                                    <input
                                        {...register("room_price", { required: false })}
                                        name="room_price"
                                        type="number"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Price" disabled
                                    />
                                </div>
                            </div>
                            <hr />
                            <h5 className="mt-4">Personal Information</h5>
                            <hr />
                            <div className="col-lg-6">
                                <div className="mb-3 mt-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Father&apos;s Name
                                    </label>
                                    <input
                                        {...register("fathers_name", { required: false })}
                                        name="fathers_name"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Father's Name" disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3 mt-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Mother&apos;s Name
                                    </label>
                                    <input
                                        {...register("mothers_name", { required: false })}
                                        name="mothers_name"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Mother's Name" disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Address
                                    </label>
                                    <input
                                        {...register("address", { required: false })}
                                        name="address"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Address" disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Profession
                                    </label>
                                    <input
                                        {...register("profession", { required: false })}
                                        name="profession"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Profession" disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Comming Form
                                    </label>
                                    <input
                                        {...register("comming_form", { required: false })}
                                        name="comming_form"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Comming Form" disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Booking Purpose
                                    </label>
                                    <input
                                        {...register("purpose", { required: false })}
                                        name="purpose"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Booking Purpose" disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Check Out Date & Time
                                    </label>
                                    <input
                                        {...register("checkout_date_time", { required: false })}
                                        name="checkout_date_time"
                                        type="datetime-local"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Check Out" disabled
                                    />
                                </div>
                            </div>
                            <hr />
                            <h5 className="mt-3">Confidential Information</h5>
                            <hr />
                            <div className="col-lg-6">
                                <div className="mb-3 mt-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        NID No
                                    </label>
                                    <input
                                        {...register("nid_no", { required: false })}
                                        name="nid_no"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="NID No" disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3 mt-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Passport No
                                    </label>
                                    <input
                                        {...register("passport_no", { required: false })}
                                        name="passport_no"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Passport No" disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Visa No
                                    </label>
                                    <input
                                        {...register("visa_no", { required: false })}
                                        name="visa_no"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Visa No" disabled
                                    />
                                </div>
                            </div>
                            <hr />
                            <h5 className="mt-3">Payments</h5>
                            <hr />
                            <div className="col-lg-6">
                                <div className="mb-3 mt-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Payment Status
                                    </label>
                                    <input
                                        {...register("payment_status", { required: false })}
                                        name="payment_status"
                                        className="form-control"
                                        type="text" disabled
                                    >
                                        {/* <option value="">Select Payment Status</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Pending">Pending</option> */}
                                    </input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3 mt-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Payment Status
                                    </label>
                                    <input
                                        {...register("payment_method", { required: false })}
                                        name="payment_method"
                                        className="form-control"
                                        type="text" disabled
                                    >
                                        {/* <option value="">Select Payment Method</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Bkash">Bkash</option>
                                        <option value="Nagad">Nagad</option>
                                        <option value="Rocket">Rocket</option>
                                        <option value="Upay">Upay</option>
                                        <option value="Card">Card</option> */}
                                    </input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Total Payment
                                    </label>
                                    <input
                                        {...register("total_price", { required: false })}
                                        name="total_price"
                                        type="number"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Total Price" disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 bg-light">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Advanced Payment
                                    </label>
                                    <input
                                        {...register("advance", { required: false })}
                                        name="advance"
                                        type="number"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Total Price" disabled
                                    />
                                </div>
                            </div>
                            <hr />
                            <h5 className="mt-3">Documents</h5>
                            <hr />
                            {/* Documents Start */}

                            <div className="row mt-3">
                                {/* NID Documents */}
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">NID Documents</label>
                                        {booking && booking.nid_doc ? (
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>File Name</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {JSON.parse(booking.nid_doc).map((file, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{file}</td>
                                                            <td>
                                                                <a href={`https://hotel-management-system.webgive.net/nid_doc/doc/${file}`}
                                                                    download={file}
                                                                    className="btn btn-primary btn-sm">
                                                                    Download
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>No NID Document Available</p>
                                        )}
                                    </div>
                                </div>

                                {/* Couple Documents */}
                                <div className="col-lg-6">
                                    <div className="mb-3 ms-2">
                                        <label className="form-label">Couple Documents</label>
                                        {booking && booking.couple_doc ? (
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>File Name</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {JSON.parse(booking.couple_doc).map((file, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{file}</td>
                                                            <td>
                                                                <a href={`https://hotel-management-system.webgive.net/couple_doc/doc/${file}`}
                                                                    download={file}
                                                                    className="btn btn-primary btn-sm">
                                                                    Download
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>No Couple Document Available</p>
                                        )}
                                    </div>
                                </div>

                                {/* Passport Documents */}
                                {/* <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">Passport Documents</label>
                                        {booking && booking.passport_doc ? (
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>File Name</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {JSON.parse(booking.passport_doc).map((file, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{file}</td>
                                                            <td>
                                                                <a href={`https://hotel-management-system.webgive.net/passport_doc/doc/${file}`}
                                                                    download={file}
                                                                    className="btn btn-primary btn-sm">
                                                                    Download
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>No Passport Document Available</p>
                                        )}
                                    </div>
                                </div> */}

                                {/* Visa Documents */}
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">Visa Documents</label>
                                        {booking && booking.visa_doc ? (
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>File Name</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {JSON.parse(booking.visa_doc).map((file, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{file}</td>
                                                            <td>
                                                                <a href={`https://hotel-management-system.webgive.net/visa_doc/doc/${file}`}
                                                                    download={file}
                                                                    className="btn btn-primary btn-sm">
                                                                    Download
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>No Visa Document Available</p>
                                        )}
                                    </div>
                                </div>

                                {/* Other Documents */}
                                <div className="col-lg-6">
                                    <div className="mb-3 ms-2">
                                        <label className="form-label">Other Documents</label>
                                        {booking && booking.other_doc ? (
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>File Name</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {JSON.parse(booking.other_doc).map((file, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{file}</td>
                                                            <td>
                                                                <a href={`https://hotel-management-system.webgive.net/other_doc/doc/${file}`}
                                                                    download={file}
                                                                    className="btn btn-primary btn-sm">
                                                                    Download
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>No Other Document Available</p>
                                        )}
                                    </div>
                                </div>
                            </div>



                            {/* Documents END */}

                            {/* <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">
                                        Booked by
                                    </label>
                                    <input
                                        {...register("booking_by", { required: true })}
                                        name="booking_by"
                                        type="text"
                                        className="form-control"
                                        id="basic-default-fullname"
                                        placeholder="Booking by reference"
                                    />
                                </div>
                            </div>
                            */}

                            <div>
                                {/* <input type="submit" className="btn btn-primary" /> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default BookingDetails;