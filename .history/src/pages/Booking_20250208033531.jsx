/* eslint-disable react/no-unknown-property */
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import toast from "react-hot-toast";

const Booking = () => {
    const [preBook, setPreBook] = useState({});
    const [loading, setLoading] = useState(true);
    const [nidDocs, setNidDocs] = useState([]);
    const [otherDocs, setOtherDocs] = useState([]);
    const [coupleDocs, setCoupleDocs] = useState([]);
    const [visaDocs, setVisaDocs] = useState([]);



    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate()
    //const [data,setData] = useState()
    const { data } = useParams();
    // fetch data
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

     // Function to format date as YYYY-MM-DD
     const formatDateTime = (dateTimeString) => {
        console.log("Input dateTimeString:", dateTimeString); // Debugging line
    
        // Fallback for invalid or missing input
        if (!dateTimeString || typeof dateTimeString !== "string") {
            console.error("Invalid dateTimeString:", dateTimeString);
            return "Invalid Date";
        }
    
        // Ensure the input is in the correct format
        let isoString;
        if (dateTimeString.includes("T")) {
            // If the input is already in ISO format (e.g., "2025-02-08T18:57:00Z")
            isoString = dateTimeString.endsWith("Z") ? dateTimeString : dateTimeString + "Z";
        } else {
            // If the input is in "YYYY-MM-DD HH:mm:ss" format
            isoString = dateTimeString.replace(" ", "T") + "Z";
        }
    
        const date = new Date(isoString);
        console.log("Parsed Date object:", date); // Debugging line
    
        if (isNaN(date.getTime())) {
            console.error("Invalid Date object created from:", dateTimeString);
            return "Invalid Date";
        }
    
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");
        const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    
        // return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`; // Format as "DD-MM-YYYY HH:mm:ss"
        `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;; // Format as "DD-MM-YYYY HH:mm:ss"
    };


    // Fetch preBooking data from API
    const fetchRoom = () => {
        axios
            .get(`${BASE_URL}/prebook-data/show/${data}`)
            .then((response) => {
                setPreBook(response.data);
                // Set form values dynamically
                setValue("date_time", response.data.date_time);
                setValue("name", response.data.name);
                setValue("room_number", response.data.room_number);
                setValue("room_category", response.data.room_category);
                setValue("nationality", response.data.nationality);
                setValue("company", response.data.company);
                setValue("phone", response.data.phone);
                setValue("person", response.data.person);
                setValue("duration_day", response.data.duration_day);
                setValue("room_price", response.data.room_price);
                setValue("total_price", response.data.room_price);
                setValue("booking_by", response.data.booking_by);
                setValue("date_time", formatDateTime(response.data.date_time));
                
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Fetch room data on component mount
    useEffect(() => {
        fetchRoom();
    }, [data]);


    // file handel nid
    const handleFileChange = (e) => { const files = Array.from(e.target.files); setNidDocs(files); };
    const handleFileChangeVisa = (e) => { const files = Array.from(e.target.files); setVisaDocs(files); };
    const handleFileChangeCouple = (e) => { const files = Array.from(e.target.files); setCoupleDocs(files); };
    const handleFileChangeOthers = (e) => { const files = Array.from(e.target.files); setOtherDocs(files); };

    const onSubmit = (data) => {
        console.log(data);

        // Create FormData object for file uploads
        const formData = new FormData();

        // Append each file to FormData
        nidDocs.forEach((file, index) => { formData.append(`nid_doc[${index}]`, file); });
        otherDocs.forEach((file, index) => { formData.append(`other_doc[${index}]`, file); });
        coupleDocs.forEach((file, index) => { formData.append(`couple_doc[${index}]`, file); });
        visaDocs.forEach((file, index) => { formData.append(`visa_doc[${index}]`, file); });

        // Append all fields to FormData
        formData.append("name", data.name);
        formData.append("mobile", data.phone);
        formData.append("fathers_name", data.fathers_name);
        formData.append("mothers_name", data.mothers_name);
        formData.append("address", data.address);
        formData.append("nationality", data.nationality);
        formData.append("profession", data.profession);
        formData.append("company", data.company);
        formData.append("comming_form", data.comming_form);
        formData.append("purpose", data.purpose);
        formData.append("checking_date_time", data.date_time);
        formData.append("checkout_date_time", data.checkout_date_time);
        formData.append("room_category", data.room_category);
        formData.append("room_number", data.room_number);
        formData.append("room_price", data.room_price);
        formData.append("person", data.person);
        formData.append("duration_day", data.duration_day);
        formData.append("total_price", data.total_price);
        formData.append("nid_no", data.nid_no);
        formData.append("advance", data.advance);
        // testing
        //formData.append("nid_doc", nid);
        formData.append("passport_no", data.passport_no);
        formData.append("visa_no", data.visa_no);
        formData.append("payment_status", data.payment_status);
        formData.append("payment_method", data.payment_method);
        formData.append("booking_by", data.booking_by);

        // Axios POST request with FormData
        axios
            .post(`${BASE_URL}/booking/add`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                toast.success("Booking added successfully!");
                console.log(response);
                navigate('/main-booking-details')

                // Optionally fetch updated data
                /* fetchCategories();
                fetchRoomNumber(); */
            })
            .catch((error) => {
                console.error("Error:", error.response?.data || error.message);
                toast.error("Already booking this date!");
            });
    };



    return (
        <div>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Booking Details</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="w-full">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Check in Date & Time <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        {...register("date_time", { required: true })}
                                                        name="date_time"
                                                        type="datetime-local"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Booking by reference"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Person Name
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("name", { required: false })}
                                                        name="name"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Person Name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Room Number
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("room_number", { required: false })}
                                                        type="text"
                                                        name="room_number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Room Number"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Select Room Category
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("room_category", { required: false })}
                                                        type="text"
                                                        name="room_category"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Room Category"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Nationality
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("nationality", { required: false })}
                                                        name="nationality"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Nationality"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Company Name
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("company", { required: false })}
                                                        name="company"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Company Name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Mobile
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("phone", { required: false })}
                                                        name="phone"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Mobile"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Person
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("person", { required: false })}
                                                        name="person"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Person"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Duration Of Stay
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("duration_day", { required: false })}
                                                        name="duration_day"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Duration of Stay"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Price ৳
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("room_price", { required: false })}
                                                        name="room_price"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Price"
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <h5 className="mt-4">Personal Information</h5>
                                            <hr />
                                            <div className="col-lg-6 mt-3">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Father&apos;s Name
                                                    </label>
                                                    <input
                                                        {...register("fathers_name", { required: false })}
                                                        name="fathers_name"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Father's Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Mother&apos;s Name
                                                    </label>
                                                    <input
                                                        {...register("mothers_name", { required: false })}
                                                        name="mothers_name"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Mother's Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Address
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("address", { required: false })}
                                                        name="address"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Address"
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
                                                        placeholder="Profession"
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
                                                        placeholder="Comming Form"
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
                                                        placeholder="Booking Purpose"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Check Out Date & Time
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("checkout_date_time", { required: false })}
                                                        name="checkout_date_time"
                                                        type="datetime-local"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Check Out"
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <h5 className="mt-4">Confidential Information</h5>
                                            <hr />
                                            <div className="col-lg-4 mt-3">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        NID No <span className="text-danger">(Sepereate With Comma)</span>
                                                    </label>
                                                    <input
                                                        {...register("nid_no", { required: false })}
                                                        name="nid_no"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="NID No"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mt-3">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Passport No <span className="text-danger">(Sepereate With Comma)</span>
                                                    </label>
                                                    <input
                                                        {...register("passport_no", { required: false })}
                                                        name="passport_no"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Passport No"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mt-3">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Visa No <span className="text-danger">(Sepereate With Comma)</span>
                                                    </label>
                                                    <input
                                                        {...register("visa_no", { required: false })}
                                                        name="visa_no"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Visa No"
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <h5 className="mt-3">Payments</h5>
                                            <hr />
                                            <div className="col-lg-6 mt-3">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Payment Status
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <select
                                                        {...register("payment_status", { required: false })}
                                                        name="payment_status"
                                                        className="form-control"
                                                    >
                                                        <option value="">Select Payment Status</option>
                                                        <option value="Paid">Paid</option>
                                                        <option value="Pending">Pending</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Payment Status
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <select
                                                        {...register("payment_method", { required: false })}
                                                        name="payment_method"
                                                        className="form-control"
                                                    >
                                                        <option value="">Select Payment Method</option>
                                                        <option value="Cash">Cash</option>
                                                        <option value="Bkash">Bkash</option>
                                                        <option value="Nagad">Nagad</option>
                                                        <option value="Rocket">Rocket</option>
                                                        <option value="Upay">Upay</option>
                                                        <option value="Card">Card</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Total Payment
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("total_price", { required: false })}
                                                        name="total_price"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Total Price"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Advanced Payment
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("advance", { required: false })}
                                                        name="advance"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Advance Payment"
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <h5 className="mt-3">Documents</h5>
                                            <hr />
                                            <div className="col-lg-6 mt-3">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        NID Doc
                                                    </label>
                                                    <input
                                                        type="file"
                                                        name="nid_doc"
                                                        multiple // Allows multiple file selection
                                                        className="form-control"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Couple Doc
                                                    </label>
                                                    <input
                                                        {...register("couple_doc", { required: false })}
                                                        name="couple_doc"
                                                        multiple
                                                        type="file"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Select File"
                                                        onChange={handleFileChangeCouple}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Visa Doc
                                                    </label>
                                                    <input
                                                        {...register("visa_doc", { required: false })}
                                                        name="visa_doc"
                                                        multiple
                                                        type="file"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Select File"
                                                        onChange={handleFileChangeVisa}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Others Doc
                                                    </label>
                                                    <input
                                                        {...register("other_doc", { required: false })}
                                                        name="other_doc"
                                                        multiple
                                                        type="file"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Select File"
                                                        onChange={handleFileChangeOthers}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Booked by
                                                        {/* <span className="text-danger">*</span> */}
                                                    </label>
                                                    <input
                                                        {...register("booking_by", { required: false })}
                                                        name="booking_by"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Booking by reference"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <input type="submit" className="btn btn-primary" />
                                            </div>
                                        </div>
                                    </form>
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

export default Booking;
