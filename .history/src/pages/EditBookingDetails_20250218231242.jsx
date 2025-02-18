import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
                alert("Booking updated successfully!");
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

                            {/* Add all other fields similarly... */}

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