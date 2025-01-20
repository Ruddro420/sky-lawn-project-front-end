/* eslint-disable react/no-unknown-property */
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { format, parseISO } from 'date-fns';

const Booking = () => {
    const [preBook, setPreBook] = useState({});
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, setValue } = useForm();
    const { data } = useParams();
    

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

    console.log(preBook);

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
                                    <form /* onSubmit={handleSubmit(onSubmit)} */>
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

                                            <div className="col-lg-6">
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
