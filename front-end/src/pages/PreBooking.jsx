import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const PreBooking = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
     const [category, setCategory] = useState([]);
     const [loading, setLoading] = useState(true);

     const fetchCategories = () => {
        setLoading(true);
        axios
            .get("http://192.168.0.115:8000/api/room-category")
            .then((response) => {
                setCategory(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };
    // Fetch categories on component load
        useEffect(() => {
            fetchCategories();
        }, []);

     const onSubmit = (data) => {
        console.log(data);
     }
    return (
        <div>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                        {/* Add Category Form */}
                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Pre Booking</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Room Number
                                                    </label>
                                                    <input
                                                        {...register("room_number", { required: true })}
                                                        name="room_number"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Room Number"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Room Name
                                                    </label>
                                                    <input
                                                        {...register("room_name", { required: true })}
                                                        name="room_name"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Room Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Select Room Category
                                                    </label>
                                                    <select
                                                        {...register("room_category_id", { required: true })}
                                                        className="form-control"
                                                        name="room_category_id"
                                                        id="">
                                                        <option value="">Select Room Category</option>
                                                        {
                                                            category.map(item => {
                                                                return (
                                                                    <>
                                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                                    </>
                                                                )
                                                            })
                                                        }

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Room Price / 2 Person
                                                    </label>
                                                    <input
                                                        {...register("price", { required: true })}
                                                        name="price"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Room Price"
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
                                                        {...register("company_name", { required: true })}
                                                        name="company_name"
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
                                                        {...register("mobile", { required: true })}
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
                                                        {...register("duration_of_stay", { required: true })}
                                                        name="duration_of_stay"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Duration of stay"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                    Check in Date & Time
                                                    </label>
                                                    <input
                                                        {...register("checkin_datetime", { required: true })}
                                                        name="checkin_datetime"
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
                                                    Booking by reference
                                                    </label>
                                                    <input
                                                        {...register("booking_by_reference", { required: true })}
                                                        name="booking_by_reference"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Booking by reference"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <input type="submit" className="btn btn-primary" />
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Categories Table */}
                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Pre Booking Details</h5>
                                </div>
                                <div className="card-body">
                                    Pre Booking Table
                                    {/* <div className="col-12">
                                        <div className="card mb-4">
                                            <div className="card-header d-flex justify-content-between align-items-center">
                                                <h5 className="mb-0">Room Details</h5>
                                            </div>
                                            <div className="card-body">
                                                {loading ? (
                                                    <p>Loading...</p>
                                                ) : (
                                                    <div className="table-responsive text-nowrap">
                                                        {
                                                            category.length == 0 ? <div className="alert alert-warning" role="alert">
                                                                No Data Found
                                                            </div> : <table className="table order-4">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Number</th>
                                                                        <th>Name</th>
                                                                        <th>Category</th>
                                                                        <th>Price</th>
                                                                        <th>Features</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody className="table-border-bottom-0">
                                                                    {room.map((item, index) => (
                                                                        <tr key={index}>
                                                                            <td>{item.room_number} </td>
                                                                            <td>{item.room_name} </td>
                                                                            <td>{item.category.name} </td>
                                                                            <td>{item.price} </td>
                                                                            <td>{item.feature} </td>
                                                                            <td>
                                                                                <button className="btn btn-success">Edit</button>
                                                                                <button onClick={()=>{deleteRoom(item.id)}} className="btn btn-danger ms-2">Delete</button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        }

                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div> */}
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

export default PreBooking;