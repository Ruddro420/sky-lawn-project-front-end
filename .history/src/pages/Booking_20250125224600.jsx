/* eslint-disable react/no-unknown-property */
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import toast from "react-hot-toast";

const Booking = () => {
    const [preBook, setPreBook] = useState({});
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, setValue } = useForm();
    const { data } = useParams();
    // fetch data
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
                setValue("date_time", format(parseISO(response.data.date_time), 'yyyy-MM-dd\'T\'HH:mm'));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Fetch room data on component mount
    useEffect(() => {
        fetchRoom();
    }, [data]);

    // add booking data

    const onSubmit = (dataArray) => {
        console.log(dataArray);
    
        // Create a FormData object
        const formData = new FormData();
    
        // Ensure that the incoming data is an array (handle multiple bookings)
        if (!Array.isArray(dataArray)) {
            dataArray = [dataArray];
        }
    
        // Loop through each booking data and append to FormData
        dataArray.forEach((data, index) => {
            // Append non-file fields to FormData
            formData.append(`bookings[${index}][name]`, data.name);
            formData.append(`bookings[${index}][mobile]`, data.phone);
            formData.append(`bookings[${index}][fathers_name]`, data.fathers_name);
            formData.append(`bookings[${index}][mothers_name]`, data.mothers_name);
            formData.append(`bookings[${index}][address]`, data.address);
            formData.append(`bookings[${index}][nationality]`, data.nationality);
            formData.append(`bookings[${index}][profession]`, data.profession);
            formData.append(`bookings[${index}][company]`, data.company);
            formData.append(`bookings[${index}][comming_form]`, data.comming_form);
            formData.append(`bookings[${index}][purpose]`, data.purpose);
            formData.append(`bookings[${index}][checking_date_time]`, data.date_time);
            formData.append(`bookings[${index}][checkout_date_time]`, data.checkout_date_time);
            formData.append(`bookings[${index}][room_category]`, data.room_category);
            formData.append(`bookings[${index}][room_number]`, data.room_number);
            formData.append(`bookings[${index}][room_price]`, data.room_price);
            formData.append(`bookings[${index}][person]`, data.person);
            formData.append(`bookings[${index}][duration_day]`, data.duration_day);
            formData.append(`bookings[${index}][total_price]`, data.total_price);
            formData.append(`bookings[${index}][nid_no]`, data.nid_no);
            formData.append(`bookings[${index}][advance]`, data.advance);
            formData.append(`bookings[${index}][passport_no]`, data.passport_no);
            formData.append(`bookings[${index}][visa_no]`, data.visa_no);
            formData.append(`bookings[${index}][payment_status]`, data.payment_status);
            formData.append(`bookings[${index}][payment_method]`, data.payment_method);
            formData.append(`bookings[${index}][booking_by]`, data.booking_by);
    
            // Append files to FormData if they exist
            if (data.nid_doc && data.nid_doc[0]) formData.append(`bookings[${index}][nid_doc]`, data.nid_doc[0]);
            if (data.couple_doc && data.couple_doc[0]) formData.append(`bookings[${index}][couple_doc]`, data.couple_doc[0]);
            if (data.passport_doc && data.passport_doc[0]) formData.append(`bookings[${index}][passport_doc]`, data.passport_doc[0]);
            if (data.visa_doc && data.visa_doc[0]) formData.append(`bookings[${index}][visa_doc]`, data.visa_doc[0]);
            if (data.other_doc && data.other_doc[0]) formData.append(`bookings[${index}][other_doc]`, data.other_doc[0]);
        });
    
        // Axios POST request with FormData
        axios
            .post(`${BASE_URL}/booking/add`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Set the correct content type for file uploads
                },
            })
            .then((response) => {
                toast.success("Booking(s) added successfully!");
                console.log(response);
    
                // Optionally fetch updated data (uncomment if needed)
                // fetchCategories();
                // fetchRoomNumber();
            })
            .catch((error) => {
                console.error("Error:", error.response?.data || error.message);
                toast.error("Failed to add booking(s)!");
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
                                                        Check in Date & Time
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
                                                    </label>
                                                    <input
                                                        {...register("name", { required: true })}
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
                                                    </label>
                                                    <input
                                                        {...register("room_number", { required: true })}
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
                                                    </label>
                                                    <input
                                                        {...register("room_category", { required: true })}
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
                                                    </label>
                                                    <input
                                                        {...register("nationality", { required: true })}
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
                                                    </label>
                                                    <input
                                                        {...register("company", { required: true })}
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
                                                    </label>
                                                    <input
                                                        {...register("phone", { required: true })}
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
                                                    </label>
                                                    <input
                                                        {...register("person", { required: true })}
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
                                                    </label>
                                                    <input
                                                        {...register("duration_day", { required: true })}
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
                                                    </label>
                                                    <input
                                                        {...register("room_price", { required: true })}
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
                                                    </label>
                                                    <input
                                                        {...register("checkout_date_time", { required: true })}
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
                                                        NID No
                                                    </label>
                                                    <input
                                                        {...register("nid_no", { required: false })}
                                                        name="nid_no"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="NID No"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mt-3">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Passport No
                                                    </label>
                                                    <input
                                                        {...register("passport_no", { required: false })}
                                                        name="passport_no"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Passport No"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mt-3">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Visa No
                                                    </label>
                                                    <input
                                                        {...register("visa_no", { required: false })}
                                                        name="visa_no"
                                                        type="number"
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
                                                    </label>
                                                    <select
                                                        {...register("payment_status", { required: true })}
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
                                                    </label>
                                                    <select
                                                        {...register("payment_method", { required: true })}
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
                                                    </label>
                                                    <input
                                                        {...register("total_price", { required: true })}
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
                                                    </label>
                                                    <input
                                                        {...register("advance", { required: true })}
                                                        name="advance"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Advance Payment"
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <h5>Documents</h5>
                                            <hr />
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        NID Doc
                                                    </label>
                                                    <input
                                                        {...register("nid_doc", { required: false })}
                                                        name="nid_doc"
                                                        multiple
                                                        type="file"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Select File"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Couple Doc
                                                    </label>
                                                    <input
                                                        {...register("couple_doc", { required: false })}
                                                        name="couple_doc[]"
                                                        multiple
                                                        type="file"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Select File"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Passport Doc
                                                    </label>
                                                    <input
                                                        {...register("passport_doc", { required: false })}
                                                        name="passport_doc[]"
                                                        multiple
                                                        type="file"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Select File"
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
                                                        name="visa_doc[]"
                                                        multiple
                                                        type="file"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Select File"
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
                                                        name="other_doc[]"
                                                        multiple
                                                        type="file"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Select File"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
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
