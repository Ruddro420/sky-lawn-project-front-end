import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const EditBookingDetails = () => {
    const { register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState({});
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Fetch booking details
    const fetchBooking = () => {
        axios
            .get(`${BASE_URL}/booking-data/show/${id}`)
            .then((response) => {
                setBooking(response.data.data);
                setLoading(false);

                // Set form values dynamically
                Object.keys(response.data.data).forEach((key) => {
                    setValue(key, response.data.data[key]);
                });
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchBooking();
    }, [id]);

    // Handle form submission
    const onSubmit = (data) => {
        // Prepare form data for file uploads
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key.endsWith("_doc") && data[key] instanceof FileList) {
                // Handle file uploads
                for (let i = 0; i < data[key].length; i++) {
                    formData.append(`${key}[]`, data[key][i]);
                }
            } else {
                formData.append(key, data[key]);
            }
        });

        // Send PUT request to update booking
        axios
            .post(`${BASE_URL}/booking/update/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("Booking updated successfully:", response.data);
                toast.success("Booking updated successfully!");
                navigate('/main-booking-details')
            })
            .catch((error) => {
                console.error("Error updating booking:", error);
                alert("Error updating booking. Please try again.");
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card-body card">
                    <h4 className="mb-2">Booking Details</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            {/* Check-in Date & Time */}
                            <div className="w-full">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="checking_date_time">
                                        Check-in Date & Time
                                    </label>
                                    <input
                                        {...register("checking_date_time")}
                                        type="datetime-local"
                                        className="form-control"
                                        id="checking_date_time"
                                    />
                                </div>
                            </div>

                            {/* Person Name */}
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="name">
                                        Person Name
                                    </label>
                                    <input
                                        {...register("name")}
                                        type="text"
                                        className="form-control"
                                        id="name"
                                    />
                                </div>
                            </div>

                            {/* Mobile */}
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="mobile">
                                        Mobile
                                    </label>
                                    <input
                                        {...register("mobile")}
                                        type="text"
                                        className="form-control"
                                        id="mobile"
                                    />
                                </div>
                            </div>

                            {/* Room Number */}
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="room_number">
                                        Room Number
                                    </label>
                                    <input
                                        {...register("room_number")}
                                        type="text"
                                        className="form-control"
                                        id="room_number"
                                    />
                                </div>
                            </div>

                            {/* Room Category */}
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="room_category">
                                        Room Category
                                    </label>
                                    <input
                                        {...register("room_category")}
                                        type="text"
                                        className="form-control"
                                        id="room_category"
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
                                    </label>
                                    <input
                                        {...register("mobile", { required: false })}
                                        name="mobile"
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

                            <div className="col-lg-6">
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
                                        placeholder="Price"
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
                                        placeholder="Father's Name"
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

                            {/* Document Uploads */}
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="nid_doc">
                                        NID Documents
                                    </label>
                                    <input
                                        {...register("nid_doc")}
                                        type="file"
                                        className="form-control"
                                        id="nid_doc"
                                        multiple
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="couple_doc">
                                        Couple Documents
                                    </label>
                                    <input
                                        {...register("couple_doc")}
                                        type="file"
                                        className="form-control"
                                        id="couple_doc"
                                        multiple
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="visa_doc">
                                        Visa Documents
                                    </label>
                                    <input
                                        {...register("visa_doc")}
                                        type="file"
                                        className="form-control"
                                        id="visa_doc"
                                        multiple
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="other_doc">
                                        Other Documents
                                    </label>
                                    <input
                                        {...register("other_doc")}
                                        type="file"
                                        className="form-control"
                                        id="other_doc"
                                        multiple
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="col-lg-12">
                                <button type="submit" className="btn btn-primary">
                                    Update Booking
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBookingDetails;