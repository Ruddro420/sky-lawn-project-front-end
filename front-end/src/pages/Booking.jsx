import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  useParams } from "react-router-dom";
import { format ,parseISO } from 'date-fns';

const Booking = () => {
    const [preBook, setPreBook] = useState([])
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit } = useForm();
    
    const { data } = useParams();


    // get preBookdata details
    const fetchRoom = () => {
        axios
            .get(`http://192.168.0.115:8000/api/prebook-data/show/${data}`)
            .then((response) => {
                setPreBook(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Fetch room fetch
    useEffect(() => {
        fetchRoom();
    }, []);

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
                                                        value={preBook.date_time}
                                                    />
                                                </div>
                                            </div>
                                            <>
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
                                                            value={preBook.name}
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
                                                            id=""
                                                            value={preBook.room_number}
                                                            readOnly
                                                            placeholder="Room Cateogry"
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
                                                            id=""
                                                            value={preBook.room_category}
                                                            readOnly
                                                            placeholder="Room Cateogry"
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
                                                            value={preBook.nationality}
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
                                                            value={preBook.company}
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
                                                            value={preBook.phone}
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
                                                            /* onChange={(e) => {
                                                                setSelectPerson(e.target.value);
                                                            }} */
                                                            value={preBook.person}
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
                                                            placeholder="Duration of stay"
                                                            value={preBook.duration_day}
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
                                                            value={preBook.room_price}
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
                                            </>
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